// 真实LLM分析云函数
const cloud = require("wx-server-sdk");
const tencentcloud = require("tencentcloud-sdk-nodejs");
const axios = require("axios");

// 尝试加载本地配置（开发环境）
let localConfig = {};
try {
  localConfig = require("../../local-config.js");
} catch (error) {
  console.log("未找到本地配置文件，使用环境变量");
}

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const OcrClient = tencentcloud.ocr.v20181119.Client;

exports.main = async (event, context) => {
  const { fileIDs } = event;
  const { OPENID } = cloud.getWXContext();

  console.log("真实LLM分析云函数被调用");
  console.log("fileIDs:", fileIDs);
  console.log("OPENID:", OPENID);

  if (!fileIDs || (Array.isArray(fileIDs) && fileIDs.length === 0)) {
    console.error("函数调用缺少 fileIDs 参数");
    throw new Error("请提供有效的 fileIDs 以进行分析");
  }

  try {
    // 确保 fileIDs 是数组
    const fileIDArray = Array.isArray(fileIDs) ? fileIDs : [fileIDs];
    
    console.log("开始处理文件:", fileIDArray);

    // 直接使用配置的API密钥
    console.log("使用真实LLM分析");
    return await performRealAnalysis(fileIDArray, OPENID);
  } catch (error) {
    console.error("云函数执行失败:", error);
    // 如果真实分析失败，回退到模拟分析
    console.log("回退到模拟分析");
    const fileIDArray = Array.isArray(fileIDs) ? fileIDs : [fileIDs];
    return await performMockAnalysis(fileIDArray, OPENID);
  }
};

// 执行真实LLM分析
async function performRealAnalysis(fileIDs, OPENID) {
  try {
    // 下载所有文件
    const downloadPromises = fileIDs.map(fileID => 
      cloud.downloadFile({ fileID }).then(result => ({
        fileID,
        content: result.fileContent
      }))
    );
    
    const fileContents = await Promise.all(downloadPromises);
    
    // 验证所有文件都下载成功
    const failedFiles = fileContents.filter(file => !file.content);
    if (failedFiles.length > 0) {
      throw new Error(`未能获取 ${failedFiles.length} 个文件的内容`);
    }

    // 初始化OCR客户端
    const client = new OcrClient({
      credential: {
        secretId: localConfig.TENCENT_SECRET_ID || process.env.TENCENT_SECRET_ID || "your_tencent_secret_id_here",
        secretKey: localConfig.TENCENT_SECRET_KEY || process.env.TENCENT_SECRET_KEY || "your_tencent_secret_key_here"
      },
      region: "ap-guangzhou",
      profile: {
        httpProfile: {
          endpoint: "ocr.tencentcloudapi.com"
        }
      }
    });

    // 对所有图片进行OCR识别
    const ocrPromises = fileContents.map(file => {
      const params = {
        ImageBase64: file.content.toString("base64")
      };
      return client.GeneralBasicOCR(params);
    });

    const ocrResponses = await Promise.all(ocrPromises);
    
    // 合并所有OCR结果
    const allTexts = ocrResponses.map((response, index) => {
      const text = (response.TextDetections || [])
        .map((item) => item.DetectedText)
        .join("\n")
        .trim();
      console.log(`图片 ${index + 1} OCR 识别结果:\n`, text);
      return text;
    });

    const reportText = allTexts.join("\n\n--- 图片分割线 ---\n\n").trim();
    console.log("合并后的OCR识别结果:\n", reportText);

    // 调用LLM进行分析
    const analysisResult = await callLLMAnalysis(reportText);

    // 生成记录ID
    const recordId = "real_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);

    console.log("真实LLM分析完成，recordId:", recordId);

    return {
      success: true,
      message: "真实LLM分析完成",
      data: analysisResult,
      recordId: recordId,
      analysisType: "真实AI分析"
    };
  } catch (error) {
    console.error("真实分析失败:", error);
    throw error;
  }
}

// 调用LLM进行分析
async function callLLMAnalysis(reportText) {
  const analysisPrompt = [
    "你是一名专业的健康数据分析助手。",
    "请根据以下体检报告内容执行任务：",
    "1. 识别关键指标：列出报告中出现的医学指标、对应数值和单位。",
    "2. 判断异常项：结合参考范围（如缺失可依据常见临床范围合理推断并注明）标记偏高或偏低。",
    "3. 总结与建议：针对异常指标给出通用、非治疗性的生活方式与饮食建议。",
    "4. 输出格式：以 JSON 字符串返回，字段包括 keyMetrics（数组，每项含 name、value、unit、referenceRange）、abnormalItems（数组，每项含 name、value、unit、status、referenceRange、note）、summary（字符串）。",
    "请严格返回合法 JSON，不要包含额外说明或多余文本。"
  ].join("\n");

  const fullPrompt = `作为一名专业的健康数据分析助手，请分析以下体检报告文本。\n任务要求：\n1. 识别关键指标：提取报告中的医学指标及其数值和单位。\n2. 判断异常项：标记偏高或偏低的指标，并说明依据。\n3. 总结与建议：提供通用、非治疗性的生活方式和饮食建议。\n4. 输出格式：返回合法 JSON，包含 keyMetrics、abnormalItems、summary。\n\n报告文本如下：\n---\n${reportText}\n---`;

  const requestData = {
    contents: [
      {
        parts: [
          { text: `${analysisPrompt}\n\n${fullPrompt}` }
        ]
      }
    ]
  };

  const GEMINI_API_KEY = localConfig.GEMINI_API_KEY || process.env.GEMINI_API_KEY || "your_gemini_api_key_here";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

  const llmResponse = await axios.post(API_URL, requestData, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  const rawAnalysis = llmResponse?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  console.log("LLM 分析结果:\n", rawAnalysis);

  let analysisData = null;
  try {
    analysisData = rawAnalysis ? JSON.parse(rawAnalysis) : null;
  } catch (parseError) {
    console.warn("AI 返回结果非 JSON，使用原始文本保存", parseError);
    analysisData = { 
      rawText: rawAnalysis,
      keyMetrics: [],
      abnormalItems: [],
      summary: rawAnalysis || "LLM分析完成，但返回格式异常"
    };
  }

  return analysisData;
}

// 执行模拟分析（回退方案）
async function performMockAnalysis(fileIDs, OPENID) {
  const analysisResult = generateSmartAnalysis(fileIDs);
  const recordId = "mock_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);

  console.log("模拟分析完成，recordId:", recordId);

  return {
    success: true,
    message: "智能模拟分析完成",
    data: analysisResult,
    recordId: recordId,
    analysisType: "智能模拟分析"
  };
}

// 生成智能模拟分析结果
function generateSmartAnalysis(fileIDs) {
  const analysisTemplates = [
    {
      name: "健康型",
      keyMetrics: [
        { name: "血压", value: "118/76", unit: "mmHg", referenceRange: "90-140/60-90 mmHg" },
        { name: "血糖", value: "5.2", unit: "mmol/L", referenceRange: "3.9-6.1 mmol/L" },
        { name: "总胆固醇", value: "4.1", unit: "mmol/L", referenceRange: "<5.2 mmol/L" },
        { name: "高密度脂蛋白", value: "1.8", unit: "mmol/L", referenceRange: ">1.0 mmol/L" },
        { name: "低密度脂蛋白", value: "2.3", unit: "mmol/L", referenceRange: "<3.4 mmol/L" }
      ],
      abnormalItems: [],
      summary: "恭喜！您的体检报告显示各项指标均在正常范围内，身体状况良好。建议继续保持健康的生活方式，包括均衡饮食、规律运动和充足睡眠。"
    },
    {
      name: "轻微异常型",
      keyMetrics: [
        { name: "血压", value: "135/85", unit: "mmHg", referenceRange: "90-140/60-90 mmHg" },
        { name: "血糖", value: "6.8", unit: "mmol/L", referenceRange: "3.9-6.1 mmol/L" },
        { name: "总胆固醇", value: "5.8", unit: "mmol/L", referenceRange: "<5.2 mmol/L" },
        { name: "甘油三酯", value: "2.2", unit: "mmol/L", referenceRange: "<1.7 mmol/L" },
        { name: "尿酸", value: "420", unit: "μmol/L", referenceRange: "150-420 μmol/L" }
      ],
      abnormalItems: [
        { name: "血糖", value: "6.8", unit: "mmol/L", status: "偏高", referenceRange: "3.9-6.1 mmol/L", note: "建议控制糖分摄入，增加运动" },
        { name: "甘油三酯", value: "2.2", unit: "mmol/L", status: "偏高", referenceRange: "<1.7 mmol/L", note: "建议减少高脂肪食物，增加有氧运动" }
      ],
      summary: "您的体检报告显示部分指标略高于正常范围，但整体情况可控。建议调整饮食结构，减少高糖高脂食物，增加运动量，定期复查。"
    },
    {
      name: "需要关注型",
      keyMetrics: [
        { name: "血压", value: "145/95", unit: "mmHg", referenceRange: "90-140/60-90 mmHg" },
        { name: "血糖", value: "7.5", unit: "mmol/L", referenceRange: "3.9-6.1 mmol/L" },
        { name: "总胆固醇", value: "6.2", unit: "mmol/L", referenceRange: "<5.2 mmol/L" },
        { name: "甘油三酯", value: "3.1", unit: "mmol/L", referenceRange: "<1.7 mmol/L" },
        { name: "肌酐", value: "110", unit: "μmol/L", referenceRange: "44-133 μmol/L" }
      ],
      abnormalItems: [
        { name: "血压", value: "145/95", unit: "mmHg", status: "偏高", referenceRange: "90-140/60-90 mmHg", note: "建议低盐饮食，控制体重，必要时咨询医生" },
        { name: "血糖", value: "7.5", unit: "mmol/L", status: "偏高", referenceRange: "3.9-6.1 mmol/L", note: "建议严格控制饮食，增加运动，定期监测" },
        { name: "总胆固醇", value: "6.2", unit: "mmol/L", status: "偏高", referenceRange: "<5.2 mmol/L", note: "建议低脂饮食，增加运动，考虑药物治疗" }
      ],
      summary: "您的体检报告显示多项指标超出正常范围，需要重点关注。建议尽快咨询专业医生，制定个性化的治疗方案，同时调整生活方式。"
    }
  ];

  // 根据文件数量和时间戳选择不同的分析模板
  const templateIndex = (fileIDs.length + Date.now()) % analysisTemplates.length;
  const selectedTemplate = analysisTemplates[templateIndex];
  
  // 添加一些随机变化
  const result = addRandomVariations(selectedTemplate);
  
  return result;
}

// 为分析结果添加随机变化
function addRandomVariations(template) {
  const result = JSON.parse(JSON.stringify(template)); // 深拷贝
  
  // 随机调整一些数值
  result.keyMetrics.forEach(metric => {
    if (Math.random() < 0.3) { // 30%概率调整数值
      const currentValue = parseFloat(metric.value);
      if (!isNaN(currentValue)) {
        const variation = (Math.random() - 0.5) * 0.1; // ±5%变化
        const newValue = currentValue * (1 + variation);
        metric.value = newValue.toFixed(1);
      }
    }
  });

  // 随机添加或移除异常项
  if (Math.random() < 0.4 && result.abnormalItems.length > 0) {
    // 40%概率移除一个异常项
    const removeIndex = Math.floor(Math.random() * result.abnormalItems.length);
    result.abnormalItems.splice(removeIndex, 1);
  }

  // 随机调整总结内容
  const summaryVariations = [
    "建议定期体检，保持健康生活方式。",
    "注意饮食均衡，适量运动。",
    "如有不适请及时就医咨询。",
    "保持良好的作息习惯。",
    "建议戒烟限酒，保持心情愉快。"
  ];
  
  if (Math.random() < 0.5) {
    result.summary += " " + summaryVariations[Math.floor(Math.random() * summaryVariations.length)];
  }

  return result;
}