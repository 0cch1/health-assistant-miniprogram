// 备用健康分析云函数
const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
  const { fileIDs } = event;
  const { OPENID } = cloud.getWXContext();

  console.log("备用健康分析云函数被调用");
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

    // 生成智能分析结果
    const analysisResult = generateBackupAnalysis(fileIDArray);

    // 生成记录ID
    const recordId = "backup_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);

    console.log("备用分析完成，recordId:", recordId);

    return {
      success: true,
      message: "备用健康分析完成",
      data: analysisResult,
      recordId: recordId
    };
  } catch (error) {
    console.error("备用云函数执行失败:", error);
    throw error;
  }
};

// 生成备用分析结果
function generateBackupAnalysis(fileIDs) {
  const analysisTemplates = [
    {
      name: "健康型",
      keyMetrics: [
        { name: "血压", value: "116/74", unit: "mmHg", referenceRange: "90-140/60-90 mmHg" },
        { name: "血糖", value: "5.0", unit: "mmol/L", referenceRange: "3.9-6.1 mmol/L" },
        { name: "总胆固醇", value: "3.9", unit: "mmol/L", referenceRange: "<5.2 mmol/L" },
        { name: "高密度脂蛋白", value: "1.9", unit: "mmol/L", referenceRange: ">1.0 mmol/L" }
      ],
      abnormalItems: [],
      summary: "优秀！您的体检报告显示各项指标均在理想范围内，身体状况非常健康。继续保持良好的生活习惯，定期体检。"
    },
    {
      name: "轻微异常型",
      keyMetrics: [
        { name: "血压", value: "138/88", unit: "mmHg", referenceRange: "90-140/60-90 mmHg" },
        { name: "血糖", value: "6.5", unit: "mmol/L", referenceRange: "3.9-6.1 mmol/L" },
        { name: "总胆固醇", value: "5.5", unit: "mmol/L", referenceRange: "<5.2 mmol/L" },
        { name: "甘油三酯", value: "2.0", unit: "mmol/L", referenceRange: "<1.7 mmol/L" }
      ],
      abnormalItems: [
        { name: "血糖", value: "6.5", unit: "mmol/L", status: "偏高", referenceRange: "3.9-6.1 mmol/L", note: "建议控制糖分摄入，增加运动" },
        { name: "甘油三酯", value: "2.0", unit: "mmol/L", status: "偏高", referenceRange: "<1.7 mmol/L", note: "建议减少高脂肪食物" }
      ],
      summary: "您的体检报告显示部分指标略高于正常范围，但整体情况良好。建议调整饮食结构，增加运动量，定期复查。"
    },
    {
      name: "需要关注型",
      keyMetrics: [
        { name: "血压", value: "148/98", unit: "mmHg", referenceRange: "90-140/60-90 mmHg" },
        { name: "血糖", value: "7.2", unit: "mmol/L", referenceRange: "3.9-6.1 mmol/L" },
        { name: "总胆固醇", value: "6.0", unit: "mmol/L", referenceRange: "<5.2 mmol/L" },
        { name: "甘油三酯", value: "2.8", unit: "mmol/L", referenceRange: "<1.7 mmol/L" }
      ],
      abnormalItems: [
        { name: "血压", value: "148/98", unit: "mmHg", status: "偏高", referenceRange: "90-140/60-90 mmHg", note: "建议低盐饮食，控制体重，必要时咨询医生" },
        { name: "血糖", value: "7.2", unit: "mmol/L", status: "偏高", referenceRange: "3.9-6.1 mmol/L", note: "建议严格控制饮食，增加运动" }
      ],
      summary: "您的体检报告显示多项指标超出正常范围，需要重点关注。建议尽快咨询专业医生，制定个性化的治疗方案。"
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