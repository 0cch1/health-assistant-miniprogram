const cloud = require('wx-server-sdk');
const tencentcloud = require('tencentcloud-sdk-nodejs');

const { extractMetricsFromText } = require('./ocrExtractor');
const { analyzeUserProfile } = require('./analysisEngine');

let localConfig = {};
try {
  // eslint-disable-next-line import/no-unresolved, global-require
  localConfig = require('../../local-config.js');
} catch (error) {
  // 忽略本地配置缺失
}

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const OcrClient = tencentcloud?.ocr?.v20181119?.Client;

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  const {
    fileIDs = [],
    formData = {},
    ocrText = '',
    debug = false
  } = event || {};

  try {
    const ocrResult = await obtainOcrMetrics({
      fileIDs,
      providedText: ocrText,
      debug
    });

    const mergedLabs = Object.assign({}, ocrResult.labs || {}, formData.labs || {});
    const mergedDemographics = Object.assign({}, ocrResult.demographics || {}, formData.demographics || {});

    const analysisInput = {
      labs: mergedLabs,
      demographics: mergedDemographics,
      history: formData.history || [],
      lifestyle: formData.lifestyle || {},
      symptoms: formData.symptoms || [],
      tcmQuiz: formData.tcmQuiz || {}
    };

    const analysis = analyzeUserProfile(analysisInput);

    return {
      success: true,
      openId: OPENID,
      fileCount: fileIDs.length,
      data: Object.assign({}, analysis, {
        extractedLabs: ocrResult.labs,
        extractedDemographics: ocrResult.demographics,
        ocrNotes: ocrResult.notes,
        debugMessages: ocrResult.debugMessages
      })
    };
  } catch (error) {
    console.error('分析失败', error);
    return {
      success: false,
      error: error.message || '分析失败，请稍后重试',
      stack: debug ? error.stack : undefined
    };
  }
};

async function obtainOcrMetrics({ fileIDs, providedText, debug }) {
  const notes = [];
  const debugMessages = [];

  if (providedText && providedText.trim()) {
    const parsed = extractMetricsFromText(providedText);
    return Object.assign({}, parsed, { debugMessages });
  }

  if (!fileIDs || !fileIDs.length) {
    return { labs: {}, demographics: {}, notes: ['未提供体检报告图片，仅使用手工输入数据。'], debugMessages };
  }

  if (!OcrClient) {
    notes.push('当前环境未安装 OCR 客户端依赖，已跳过自动识别。');
    return { labs: {}, demographics: {}, notes, debugMessages };
  }

  const downloaded = await Promise.all(
    fileIDs.map(async (fileID) => {
      const result = await cloud.downloadFile({ fileID });
      return {
        fileID,
        content: result.fileContent
      };
    })
  );

  const images = downloaded.filter(item => item.content);
  if (!images.length) {
    notes.push('未能下载到有效的体检报告文件，请检查文件权限。');
    return { labs: {}, demographics: {}, notes, debugMessages };
  }

  const credentials = getTencentCredentials();
  if (!credentials.secretId || !credentials.secretKey) {
    notes.push('缺少腾讯云 OCR 凭证，已跳过自动识别。');
    return { labs: {}, demographics: {}, notes, debugMessages };
  }

  const client = new OcrClient({
    credential: credentials,
    region: credentials.region || 'ap-guangzhou',
    profile: { httpProfile: { endpoint: 'ocr.tencentcloudapi.com' } }
  });

  let combinedText = '';
  for (let i = 0; i < images.length; i += 1) {
    const image = images[i];
    try {
      const response = await client.GeneralBasicOCR({
        ImageBase64: image.content.toString('base64')
      });
      const text = (response.TextDetections || [])
        .map(item => item.DetectedText)
        .join('\n');
      combinedText += `${text}\n`;
      debugMessages.push(`OCR成功：${image.fileID}`);
    } catch (error) {
      debugMessages.push(`OCR失败：${image.fileID} - ${error.message}`);
    }
  }

  if (!combinedText.trim()) {
    notes.push('OCR 未识别出任何文本，请确认图像清晰度。');
    return { labs: {}, demographics: {}, notes, debugMessages };
  }

  const parsed = extractMetricsFromText(combinedText);
  if (!Object.keys(parsed.labs).length) {
    notes.push('OCR 未提取到关键指标，请手工填写。');
  }

  if (debug) {
    debugMessages.push(combinedText);
  }

  return Object.assign({}, parsed, { debugMessages });
}

function getTencentCredentials() {
  return {
    secretId: localConfig.TENCENT_SECRET_ID || process.env.TENCENT_SECRET_ID,
    secretKey: localConfig.TENCENT_SECRET_KEY || process.env.TENCENT_SECRET_KEY,
    region: localConfig.TENCENT_REGION || process.env.TENCENT_REGION
  };
}
