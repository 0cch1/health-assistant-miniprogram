// 简化版云函数，用于测试基本功能
const cloud = require("wx-server-sdk");
const axios = require("axios");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
  const { fileIDs } = event;
  const { OPENID } = cloud.getWXContext();

  console.log("云函数被调用，fileIDs:", fileIDs);
  console.log("OPENID:", OPENID);

  if (!fileIDs || (Array.isArray(fileIDs) && fileIDs.length === 0)) {
    console.error("函数调用缺少 fileIDs 参数");
    throw new Error("请提供有效的 fileIDs 以进行分析");
  }

  try {
    // 确保 fileIDs 是数组
    const fileIDArray = Array.isArray(fileIDs) ? fileIDs : [fileIDs];
    
    console.log("开始处理文件:", fileIDArray);

    // 模拟分析结果（用于测试）
    const mockAnalysisResult = {
      keyMetrics: [
        {
          name: "血压",
          value: "120/80",
          unit: "mmHg",
          referenceRange: "90-140/60-90 mmHg"
        },
        {
          name: "血糖",
          value: "5.6",
          unit: "mmol/L",
          referenceRange: "3.9-6.1 mmol/L"
        },
        {
          name: "总胆固醇",
          value: "4.2",
          unit: "mmol/L",
          referenceRange: "<5.2 mmol/L"
        }
      ],
      abnormalItems: [
        {
          name: "甘油三酯",
          value: "2.1",
          unit: "mmol/L",
          status: "偏高",
          referenceRange: "<1.7 mmol/L",
          note: "建议控制饮食，减少高脂肪食物摄入"
        }
      ],
      summary: "您的体检报告整体情况良好，大部分指标在正常范围内。建议注意饮食控制，适量运动，定期复查。如有疑问请咨询专业医生。"
    };

    // 保存分析记录到数据库
    const recordPayload = {
      _openid: OPENID,
      fileIDs: fileIDArray,
      reportText: "模拟报告文本 - 用于测试云函数功能",
      analysisResult: mockAnalysisResult,
      createdAt: db.serverDate()
    };

    const addRes = await db.collection("analysis_records").add({
      data: recordPayload
    });

    console.log("分析记录已保存，recordId:", addRes._id);

    return {
      fileIDs: fileIDArray,
      reportText: "模拟报告文本",
      analysis: mockAnalysisResult,
      recordId: addRes._id
    };
  } catch (error) {
    console.error("云函数执行失败:", error);
    throw error;
  }
};
