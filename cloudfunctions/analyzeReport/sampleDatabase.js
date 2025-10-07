// 体检报告样本数据库
// 包含20个不同类型的体检报告样本，用于最近邻匹配

const sampleReports = [
  // 健康型样本 (5个)
  {
    id: "healthy_001",
    type: "健康型",
    keyMetrics: [
      { name: "血压", value: 118, unit: "mmHg", category: "blood_pressure" },
      { name: "血糖", value: 5.2, unit: "mmol/L", category: "blood_sugar" },
      { name: "总胆固醇", value: 4.1, unit: "mmol/L", category: "cholesterol" },
      { name: "高密度脂蛋白", value: 1.8, unit: "mmol/L", category: "hdl" },
      { name: "低密度脂蛋白", value: 2.3, unit: "mmol/L", category: "ldl" },
      { name: "甘油三酯", value: 1.2, unit: "mmol/L", category: "triglycerides" },
      { name: "尿酸", value: 350, unit: "μmol/L", category: "uric_acid" }
    ],
    abnormalItems: [],
    summary: "恭喜！您的体检报告显示各项指标均在正常范围内，身体状况良好。建议继续保持健康的生活方式，包括均衡饮食、规律运动和充足睡眠。"
  },
  {
    id: "healthy_002",
    type: "健康型",
    keyMetrics: [
      { name: "血压", value: 120, unit: "mmHg", category: "blood_pressure" },
      { name: "血糖", value: 4.8, unit: "mmol/L", category: "blood_sugar" },
      { name: "总胆固醇", value: 3.9, unit: "mmol/L", category: "cholesterol" },
      { name: "高密度脂蛋白", value: 1.9, unit: "mmol/L", category: "hdl" },
      { name: "低密度脂蛋白", value: 2.1, unit: "mmol/L", category: "ldl" },
      { name: "甘油三酯", value: 1.0, unit: "mmol/L", category: "triglycerides" },
      { name: "尿酸", value: 320, unit: "μmol/L", category: "uric_acid" }
    ],
    abnormalItems: [],
    summary: "优秀！您的体检报告显示各项指标均在理想范围内，身体状况非常健康。继续保持良好的生活习惯，定期体检。"
  },
  {
    id: "healthy_003",
    type: "健康型",
    keyMetrics: [
      { name: "血压", value: 115, unit: "mmHg", category: "blood_pressure" },
      { name: "血糖", value: 5.0, unit: "mmol/L", category: "blood_sugar" },
      { name: "总胆固醇", value: 4.3, unit: "mmol/L", category: "cholesterol" },
      { name: "高密度脂蛋白", value: 1.7, unit: "mmol/L", category: "hdl" },
      { name: "低密度脂蛋白", value: 2.4, unit: "mmol/L", category: "ldl" },
      { name: "甘油三酯", value: 1.3, unit: "mmol/L", category: "triglycerides" },
      { name: "尿酸", value: 380, unit: "μmol/L", category: "uric_acid" }
    ],
    abnormalItems: [],
    summary: "您的体检报告显示各项指标均在正常范围内，身体状况良好。建议继续保持健康的生活方式。"
  },
  {
    id: "healthy_004",
    type: "健康型",
    keyMetrics: [
      { name: "血压", value: 125, unit: "mmHg", category: "blood_pressure" },
      { name: "血糖", value: 5.5, unit: "mmol/L", category: "blood_sugar" },
      { name: "总胆固醇", value: 4.5, unit: "mmol/L", category: "cholesterol" },
      { name: "高密度脂蛋白", value: 1.6, unit: "mmol/L", category: "hdl" },
      { name: "低密度脂蛋白", value: 2.6, unit: "mmol/L", category: "ldl" },
      { name: "甘油三酯", value: 1.4, unit: "mmol/L", category: "triglycerides" },
      { name: "尿酸", value: 360, unit: "μmol/L", category: "uric_acid" }
    ],
    abnormalItems: [],
    summary: "您的体检报告显示各项指标均在正常范围内，身体状况良好。建议继续保持健康的生活方式。"
  },
  {
    id: "healthy_005",
    type: "健康型",
    keyMetrics: [
      { name: "血压", value: 110, unit: "mmHg", category: "blood_pressure" },
      { name: "血糖", value: 4.5, unit: "mmol/L", category: "blood_sugar" },
      { name: "总胆固醇", value: 3.8, unit: "mmol/L", category: "cholesterol" },
      { name: "高密度脂蛋白", value: 2.0, unit: "mmol/L", category: "hdl" },
      { name: "低密度脂蛋白", value: 1.9, unit: "mmol/L", category: "ldl" },
      { name: "甘油三酯", value: 0.9, unit: "mmol/L", category: "triglycerides" },
      { name: "尿酸", value: 300, unit: "μmol/L", category: "uric_acid" }
    ],
    abnormalItems: [],
    summary: "优秀！您的体检报告显示各项指标均在理想范围内，身体状况非常健康。继续保持良好的生活习惯。"
  },

  // 轻微异常型样本 (5个)
  {
    id: "mild_001",
    type: "轻微异常型",
    keyMetrics: [
      { name: "血压", value: 135, unit: "mmHg", category: "blood_pressure" },
      { name: "血糖", value: 6.8, unit: "mmol/L", category: "blood_sugar" },
      { name: "总胆固醇", value: 5.8, unit: "mmol/L", category: "cholesterol" },
      { name: "高密度脂蛋白", value: 1.2, unit: "mmol/L", category: "hdl" },
      { name: "低密度脂蛋白", value: 3.8, unit: "mmol/L", category: "ldl" },
      { name: "甘油三酯", value: 2.2, unit: "mmol/L", category: "triglycerides" },
      { name: "尿酸", value: 420, unit: "μmol/L", category: "uric_acid" }
    ],
    abnormalItems: [
      { name: "血糖", value: 6.8, unit: "mmol/L", status: "偏高", referenceRange: "3.9-6.1 mmol/L", note: "建议控制糖分摄入，增加运动" },
      { name: "甘油三酯", value: 2.2, unit: "mmol/L", status: "偏高", referenceRange: "<1.7 mmol/L", note: "建议减少高脂肪食物，增加有氧运动" }
    ],
    summary: "您的体检报告显示部分指标略高于正常范围，但整体情况可控。建议调整饮食结构，减少高糖高脂食物，增加运动量，定期复查。"
  },
  {
    id: "mild_002",
    type: "轻微异常型",
    keyMetrics: [
      { name: "血压", value: 142, unit: "mmHg", category: "blood_pressure" },
      { name: "血糖", value: 6.2, unit: "mmol/L", category: "blood_sugar" },
      { name: "总胆固醇", value: 5.5, unit: "mmol/L", category: "cholesterol" },
      { name: "高密度脂蛋白", value: 1.1, unit: "mmol/L", category: "hdl" },
      { name: "低密度脂蛋白", value: 3.6, unit: "mmol/L", category: "ldl" },
      { name: "甘油三酯", value: 2.0, unit: "mmol/L", category: "triglycerides" },
      { name: "尿酸", value: 450, unit: "μmol/L", category: "uric_acid" }
    ],
    abnormalItems: [
      { name: "血压", value: 142, unit: "mmHg", status: "偏高", referenceRange: "90-140 mmHg", note: "建议低盐饮食，控制体重" },
      { name: "甘油三酯", value: 2.0, unit: "mmol/L", status: "偏高", referenceRange: "<1.7 mmol/L", note: "建议减少高脂肪食物" }
    ],
    summary: "您的体检报告显示部分指标略高于正常范围，但整体情况可控。建议调整饮食结构，增加运动量，定期复查。"
  },
  {
    id: "mild_003",
    type: "轻微异常型",
    keyMetrics: [
      { name: "血压", value: 138, unit: "mmHg", category: "blood_pressure" },
      { name: "血糖", value: 6.5, unit: "mmol/L", category: "blood_sugar" },
      { name: "总胆固醇", value: 5.2, unit: "mmol/L", category: "cholesterol" },
      { name: "高密度脂蛋白", value: 1.0, unit: "mmol/L", category: "hdl" },
      { name: "低密度脂蛋白", value: 3.4, unit: "mmol/L", category: "ldl" },
      { name: "甘油三酯", value: 1.9, unit: "mmol/L", category: "triglycerides" },
      { name: "尿酸", value: 400, unit: "μmol/L", category: "uric_acid" }
    ],
    abnormalItems: [
      { name: "血糖", value: 6.5, unit: "mmol/L", status: "偏高", referenceRange: "3.9-6.1 mmol/L", note: "建议控制糖分摄入，增加运动" }
    ],
    summary: "您的体检报告显示部分指标略高于正常范围，但整体情况可控。建议调整饮食结构，增加运动量。"
  },
  {
    id: "mild_004",
    type: "轻微异常型",
    keyMetrics: [
      { name: "血压", value: 140, unit: "mmHg", category: "blood_pressure" },
      { name: "血糖", value: 6.0, unit: "mmol/L", category: "blood_sugar" },
      { name: "总胆固醇", value: 5.6, unit: "mmol/L", category: "cholesterol" },
      { name: "高密度脂蛋白", value: 1.3, unit: "mmol/L", category: "hdl" },
      { name: "低密度脂蛋白", value: 3.7, unit: "mmol/L", category: "ldl" },
      { name: "甘油三酯", value: 2.1, unit: "mmol/L", category: "triglycerides" },
      { name: "尿酸", value: 430, unit: "μmol/L", category: "uric_acid" }
    ],
    abnormalItems: [
      { name: "总胆固醇", value: 5.6, unit: "mmol/L", status: "偏高", referenceRange: "<5.2 mmol/L", note: "建议低脂饮食，增加运动" },
      { name: "甘油三酯", value: 2.1, unit: "mmol/L", status: "偏高", referenceRange: "<1.7 mmol/L", note: "建议减少高脂肪食物" }
    ],
    summary: "您的体检报告显示部分指标略高于正常范围，但整体情况可控。建议调整饮食结构，增加运动量。"
  },
  {
    id: "mild_005",
    type: "轻微异常型",
    keyMetrics: [
      { name: "血压", value: 132, unit: "mmHg", category: "blood_pressure" },
      { name: "血糖", value: 6.3, unit: "mmol/L", category: "blood_sugar" },
      { name: "总胆固醇", value: 5.4, unit: "mmol/L", category: "cholesterol" },
      { name: "高密度脂蛋白", value: 1.4, unit: "mmol/L", category: "hdl" },
      { name: "低密度脂蛋白", value: 3.5, unit: "mmol/L", category: "ldl" },
      { name: "甘油三酯", value: 1.8, unit: "mmol/L", category: "triglycerides" },
      { name: "尿酸", value: 410, unit: "μmol/L", category: "uric_acid" }
    ],
    abnormalItems: [
      { name: "血糖", value: 6.3, unit: "mmol/L", status: "偏高", referenceRange: "3.9-6.1 mmol/L", note: "建议控制糖分摄入" }
    ],
    summary: "您的体检报告显示部分指标略高于正常范围，但整体情况可控。建议调整饮食结构，增加运动量。"
  },

  // 需要关注型样本 (5个)
  {
    id: "serious_001",
    type: "需要关注型",
    keyMetrics: [
      { name: "血压", value: 145, unit: "mmHg", category: "blood_pressure" },
      { name: "血糖", value: 7.5, unit: "mmol/L", category: "blood_sugar" },
      { name: "总胆固醇", value: 6.2, unit: "mmol/L", category: "cholesterol" },
      { name: "高密度脂蛋白", value: 0.9, unit: "mmol/L", category: "hdl" },
      { name: "低密度脂蛋白", value: 4.2, unit: "mmol/L", category: "ldl" },
      { name: "甘油三酯", value: 3.1, unit: "mmol/L", category: "triglycerides" },
      { name: "尿酸", value: 480, unit: "μmol/L", category: "uric_acid" }
    ],
    abnormalItems: [
      { name: "血压", value: 145, unit: "mmHg", status: "偏高", referenceRange: "90-140 mmHg", note: "建议低盐饮食，控制体重，必要时咨询医生" },
      { name: "血糖", value: 7.5, unit: "mmol/L", status: "偏高", referenceRange: "3.9-6.1 mmol/L", note: "建议严格控制饮食，增加运动，定期监测" },
      { name: "总胆固醇", value: 6.2, unit: "mmol/L", status: "偏高", referenceRange: "<5.2 mmol/L", note: "建议低脂饮食，增加运动，考虑药物治疗" }
    ],
    summary: "您的体检报告显示多项指标超出正常范围，需要重点关注。建议尽快咨询专业医生，制定个性化的治疗方案，同时调整生活方式。"
  },
  {
    id: "serious_002",
    type: "需要关注型",
    keyMetrics: [
      { name: "血压", value: 150, unit: "mmHg", category: "blood_pressure" },
      { name: "血糖", value: 8.0, unit: "mmol/L", category: "blood_sugar" },
      { name: "总胆固醇", value: 6.5, unit: "mmol/L", category: "cholesterol" },
      { name: "高密度脂蛋白", value: 0.8, unit: "mmol/L", category: "hdl" },
      { name: "低密度脂蛋白", value: 4.5, unit: "mmol/L", category: "ldl" },
      { name: "甘油三酯", value: 3.5, unit: "mmol/L", category: "triglycerides" },
      { name: "尿酸", value: 520, unit: "μmol/L", category: "uric_acid" }
    ],
    abnormalItems: [
      { name: "血压", value: 150, unit: "mmHg", status: "偏高", referenceRange: "90-140 mmHg", note: "建议立即咨询医生，可能需要药物治疗" },
      { name: "血糖", value: 8.0, unit: "mmol/L", status: "偏高", referenceRange: "3.9-6.1 mmol/L", note: "建议立即咨询医生，可能需要药物治疗" },
      { name: "总胆固醇", value: 6.5, unit: "mmol/L", status: "偏高", referenceRange: "<5.2 mmol/L", note: "建议立即咨询医生，可能需要药物治疗" }
    ],
    summary: "您的体检报告显示多项指标严重超出正常范围，需要立即关注。建议尽快咨询专业医生，制定个性化的治疗方案。"
  },
  {
    id: "serious_003",
    type: "需要关注型",
    keyMetrics: [
      { name: "血压", value: 148, unit: "mmHg", category: "blood_pressure" },
      { name: "血糖", value: 7.8, unit: "mmol/L", category: "blood_sugar" },
      { name: "总胆固醇", value: 6.0, unit: "mmol/L", category: "cholesterol" },
      { name: "高密度脂蛋白", value: 0.7, unit: "mmol/L", category: "hdl" },
      { name: "低密度脂蛋白", value: 4.0, unit: "mmol/L", category: "ldl" },
      { name: "甘油三酯", value: 2.9, unit: "mmol/L", category: "triglycerides" },
      { name: "尿酸", value: 500, unit: "μmol/L", category: "uric_acid" }
    ],
    abnormalItems: [
      { name: "血压", value: 148, unit: "mmHg", status: "偏高", referenceRange: "90-140 mmHg", note: "建议低盐饮食，控制体重，必要时咨询医生" },
      { name: "血糖", value: 7.8, unit: "mmol/L", status: "偏高", referenceRange: "3.9-6.1 mmol/L", note: "建议严格控制饮食，增加运动，定期监测" },
      { name: "高密度脂蛋白", value: 0.7, unit: "mmol/L", status: "偏低", referenceRange: ">1.0 mmol/L", note: "建议增加有氧运动，改善饮食结构" }
    ],
    summary: "您的体检报告显示多项指标超出正常范围，需要重点关注。建议尽快咨询专业医生，制定个性化的治疗方案。"
  },
  {
    id: "serious_004",
    type: "需要关注型",
    keyMetrics: [
      { name: "血压", value: 155, unit: "mmHg", category: "blood_pressure" },
      { name: "血糖", value: 7.2, unit: "mmol/L", category: "blood_sugar" },
      { name: "总胆固醇", value: 6.8, unit: "mmol/L", category: "cholesterol" },
      { name: "高密度脂蛋白", value: 0.6, unit: "mmol/L", category: "hdl" },
      { name: "低密度脂蛋白", value: 4.8, unit: "mmol/L", category: "ldl" },
      { name: "甘油三酯", value: 3.8, unit: "mmol/L", category: "triglycerides" },
      { name: "尿酸", value: 550, unit: "μmol/L", category: "uric_acid" }
    ],
    abnormalItems: [
      { name: "血压", value: 155, unit: "mmHg", status: "偏高", referenceRange: "90-140 mmHg", note: "建议立即咨询医生，可能需要药物治疗" },
      { name: "血糖", value: 7.2, unit: "mmol/L", status: "偏高", referenceRange: "3.9-6.1 mmol/L", note: "建议严格控制饮食，增加运动，定期监测" },
      { name: "总胆固醇", value: 6.8, unit: "mmol/L", status: "偏高", referenceRange: "<5.2 mmol/L", note: "建议立即咨询医生，可能需要药物治疗" }
    ],
    summary: "您的体检报告显示多项指标严重超出正常范围，需要立即关注。建议尽快咨询专业医生，制定个性化的治疗方案。"
  },
  {
    id: "serious_005",
    type: "需要关注型",
    keyMetrics: [
      { name: "血压", value: 152, unit: "mmHg", category: "blood_pressure" },
      { name: "血糖", value: 7.0, unit: "mmol/L", category: "blood_sugar" },
      { name: "总胆固醇", value: 6.3, unit: "mmol/L", category: "cholesterol" },
      { name: "高密度脂蛋白", value: 0.8, unit: "mmol/L", category: "hdl" },
      { name: "低密度脂蛋白", value: 4.3, unit: "mmol/L", category: "ldl" },
      { name: "甘油三酯", value: 3.2, unit: "mmol/L", category: "triglycerides" },
      { name: "尿酸", value: 480, unit: "μmol/L", category: "uric_acid" }
    ],
    abnormalItems: [
      { name: "血压", value: 152, unit: "mmHg", status: "偏高", referenceRange: "90-140 mmHg", note: "建议低盐饮食，控制体重，必要时咨询医生" },
      { name: "血糖", value: 7.0, unit: "mmol/L", status: "偏高", referenceRange: "3.9-6.1 mmol/L", note: "建议严格控制饮食，增加运动，定期监测" },
      { name: "总胆固醇", value: 6.3, unit: "mmol/L", status: "偏高", referenceRange: "<5.2 mmol/L", note: "建议低脂饮食，增加运动，考虑药物治疗" }
    ],
    summary: "您的体检报告显示多项指标超出正常范围，需要重点关注。建议尽快咨询专业医生，制定个性化的治疗方案。"
  },

  // 老年健康型样本 (5个)
  {
    id: "elderly_001",
    type: "老年健康型",
    keyMetrics: [
      { name: "血压", value: 128, unit: "mmHg", category: "blood_pressure" },
      { name: "血糖", value: 5.8, unit: "mmol/L", category: "blood_sugar" },
      { name: "总胆固醇", value: 4.8, unit: "mmol/L", category: "cholesterol" },
      { name: "高密度脂蛋白", value: 1.5, unit: "mmol/L", category: "hdl" },
      { name: "低密度脂蛋白", value: 2.8, unit: "mmol/L", category: "ldl" },
      { name: "甘油三酯", value: 1.6, unit: "mmol/L", category: "triglycerides" },
      { name: "尿酸", value: 380, unit: "μmol/L", category: "uric_acid" },
      { name: "骨密度", value: -1.2, unit: "T值", category: "bone_density" },
      { name: "维生素D", value: 28, unit: "ng/mL", category: "vitamin_d" }
    ],
    abnormalItems: [
      { name: "骨密度", value: -1.2, unit: "T值", status: "偏低", referenceRange: ">-1.0", note: "建议补充钙质和维生素D，增加户外活动" },
      { name: "维生素D", value: 28, unit: "ng/mL", status: "偏低", referenceRange: "30-100 ng/mL", note: "建议多晒太阳，适当补充维生素D" }
    ],
    summary: "您的体检报告整体情况良好，符合该年龄段的正常水平。建议注意骨骼健康，适当补充营养，保持适度运动。"
  },
  {
    id: "elderly_002",
    type: "老年健康型",
    keyMetrics: [
      { name: "血压", value: 132, unit: "mmHg", category: "blood_pressure" },
      { name: "血糖", value: 6.0, unit: "mmol/L", category: "blood_sugar" },
      { name: "总胆固醇", value: 5.0, unit: "mmol/L", category: "cholesterol" },
      { name: "高密度脂蛋白", value: 1.4, unit: "mmol/L", category: "hdl" },
      { name: "低密度脂蛋白", value: 3.0, unit: "mmol/L", category: "ldl" },
      { name: "甘油三酯", value: 1.7, unit: "mmol/L", category: "triglycerides" },
      { name: "尿酸", value: 400, unit: "μmol/L", category: "uric_acid" },
      { name: "骨密度", value: -0.8, unit: "T值", category: "bone_density" },
      { name: "维生素D", value: 32, unit: "ng/mL", category: "vitamin_d" }
    ],
    abnormalItems: [],
    summary: "您的体检报告整体情况良好，符合该年龄段的正常水平。建议继续保持健康的生活方式。"
  },
  {
    id: "elderly_003",
    type: "老年健康型",
    keyMetrics: [
      { name: "血压", value: 125, unit: "mmHg", category: "blood_pressure" },
      { name: "血糖", value: 5.5, unit: "mmol/L", category: "blood_sugar" },
      { name: "总胆固醇", value: 4.6, unit: "mmol/L", category: "cholesterol" },
      { name: "高密度脂蛋白", value: 1.6, unit: "mmol/L", category: "hdl" },
      { name: "低密度脂蛋白", value: 2.6, unit: "mmol/L", category: "ldl" },
      { name: "甘油三酯", value: 1.4, unit: "mmol/L", category: "triglycerides" },
      { name: "尿酸", value: 360, unit: "μmol/L", category: "uric_acid" },
      { name: "骨密度", value: -1.0, unit: "T值", category: "bone_density" },
      { name: "维生素D", value: 35, unit: "ng/mL", category: "vitamin_d" }
    ],
    abnormalItems: [],
    summary: "您的体检报告整体情况良好，符合该年龄段的正常水平。建议继续保持健康的生活方式。"
  },
  {
    id: "elderly_004",
    type: "老年健康型",
    keyMetrics: [
      { name: "血压", value: 135, unit: "mmHg", category: "blood_pressure" },
      { name: "血糖", value: 6.2, unit: "mmol/L", category: "blood_sugar" },
      { name: "总胆固醇", value: 5.2, unit: "mmol/L", category: "cholesterol" },
      { name: "高密度脂蛋白", value: 1.3, unit: "mmol/L", category: "hdl" },
      { name: "低密度脂蛋白", value: 3.2, unit: "mmol/L", category: "ldl" },
      { name: "甘油三酯", value: 1.8, unit: "mmol/L", category: "triglycerides" },
      { name: "尿酸", value: 420, unit: "μmol/L", category: "uric_acid" },
      { name: "骨密度", value: -1.5, unit: "T值", category: "bone_density" },
      { name: "维生素D", value: 25, unit: "ng/mL", category: "vitamin_d" }
    ],
    abnormalItems: [
      { name: "骨密度", value: -1.5, unit: "T值", status: "偏低", referenceRange: ">-1.0", note: "建议补充钙质和维生素D，增加户外活动" },
      { name: "维生素D", value: 25, unit: "ng/mL", status: "偏低", referenceRange: "30-100 ng/mL", note: "建议多晒太阳，适当补充维生素D" }
    ],
    summary: "您的体检报告整体情况良好，符合该年龄段的正常水平。建议注意骨骼健康，适当补充营养。"
  },
  {
    id: "elderly_005",
    type: "老年健康型",
    keyMetrics: [
      { name: "血压", value: 130, unit: "mmHg", category: "blood_pressure" },
      { name: "血糖", value: 5.9, unit: "mmol/L", category: "blood_sugar" },
      { name: "总胆固醇", value: 4.9, unit: "mmol/L", category: "cholesterol" },
      { name: "高密度脂蛋白", value: 1.5, unit: "mmol/L", category: "hdl" },
      { name: "低密度脂蛋白", value: 2.9, unit: "mmol/L", category: "ldl" },
      { name: "甘油三酯", value: 1.5, unit: "mmol/L", category: "triglycerides" },
      { name: "尿酸", value: 390, unit: "μmol/L", category: "uric_acid" },
      { name: "骨密度", value: -0.5, unit: "T值", category: "bone_density" },
      { name: "维生素D", value: 38, unit: "ng/mL", category: "vitamin_d" }
    ],
    abnormalItems: [],
    summary: "您的体检报告整体情况良好，符合该年龄段的正常水平。建议继续保持健康的生活方式。"
  }
];

module.exports = {
  sampleReports,
  // 获取所有样本
  getAllSamples: () => sampleReports,
  // 根据类型获取样本
  getSamplesByType: (type) => sampleReports.filter(sample => sample.type === type),
  // 获取样本数量
  getSampleCount: () => sampleReports.length
};

