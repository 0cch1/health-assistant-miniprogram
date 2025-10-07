// OCR提取关键指标功能
// 从OCR识别文本中提取体检报告的关键指标

const { sampleReports } = require('./sampleDatabase');

// 常见体检指标的正则表达式模式
const metricPatterns = {
  // 血压相关
  blood_pressure: [
    /血压[：:\s]*(\d+)\s*\/\s*(\d+)\s*mmHg/i,
    /BP[：:\s]*(\d+)\s*\/\s*(\d+)\s*mmHg/i,
    /(\d+)\s*\/\s*(\d+)\s*mmHg/i
  ],
  
  // 血糖相关
  blood_sugar: [
    /血糖[：:\s]*(\d+\.?\d*)\s*mmol\/L/i,
    /GLU[：:\s]*(\d+\.?\d*)\s*mmol\/L/i,
    /葡萄糖[：:\s]*(\d+\.?\d*)\s*mmol\/L/i,
    /(\d+\.?\d*)\s*mmol\/L.*血糖/i
  ],
  
  // 胆固醇相关
  cholesterol: [
    /总胆固醇[：:\s]*(\d+\.?\d*)\s*mmol\/L/i,
    /TC[：:\s]*(\d+\.?\d*)\s*mmol\/L/i,
    /CHOL[：:\s]*(\d+\.?\d*)\s*mmol\/L/i,
    /胆固醇[：:\s]*(\d+\.?\d*)\s*mmol\/L/i
  ],
  
  // 高密度脂蛋白
  hdl: [
    /高密度脂蛋白[：:\s]*(\d+\.?\d*)\s*mmol\/L/i,
    /HDL[：:\s]*(\d+\.?\d*)\s*mmol\/L/i,
    /HDL-C[：:\s]*(\d+\.?\d*)\s*mmol\/L/i
  ],
  
  // 低密度脂蛋白
  ldl: [
    /低密度脂蛋白[：:\s]*(\d+\.?\d*)\s*mmol\/L/i,
    /LDL[：:\s]*(\d+\.?\d*)\s*mmol\/L/i,
    /LDL-C[：:\s]*(\d+\.?\d*)\s*mmol\/L/i
  ],
  
  // 甘油三酯
  triglycerides: [
    /甘油三酯[：:\s]*(\d+\.?\d*)\s*mmol\/L/i,
    /TG[：:\s]*(\d+\.?\d*)\s*mmol\/L/i,
    /TRIG[：:\s]*(\d+\.?\d*)\s*mmol\/L/i
  ],
  
  // 尿酸
  uric_acid: [
    /尿酸[：:\s]*(\d+\.?\d*)\s*μmol\/L/i,
    /UA[：:\s]*(\d+\.?\d*)\s*μmol\/L/i,
    /URIC[：:\s]*(\d+\.?\d*)\s*μmol\/L/i
  ],
  
  // 骨密度
  bone_density: [
    /骨密度[：:\s]*(-?\d+\.?\d*)\s*T值/i,
    /BMD[：:\s]*(-?\d+\.?\d*)\s*T值/i,
    /T值[：:\s]*(-?\d+\.?\d*)/i
  ],
  
  // 维生素D
  vitamin_d: [
    /维生素D[：:\s]*(\d+\.?\d*)\s*ng\/mL/i,
    /VitD[：:\s]*(\d+\.?\d*)\s*ng\/mL/i,
    /25OHD[：:\s]*(\d+\.?\d*)\s*ng\/mL/i
  ]
};

// 参考范围定义
const referenceRanges = {
  blood_pressure: { normal: [90, 140], unit: "mmHg" },
  blood_sugar: { normal: [3.9, 6.1], unit: "mmol/L" },
  cholesterol: { normal: [0, 5.2], unit: "mmol/L" },
  hdl: { normal: [1.0, 999], unit: "mmol/L" },
  ldl: { normal: [0, 3.4], unit: "mmol/L" },
  triglycerides: { normal: [0, 1.7], unit: "mmol/L" },
  uric_acid: { normal: [150, 420], unit: "μmol/L" },
  bone_density: { normal: [-1.0, 999], unit: "T值" },
  vitamin_d: { normal: [30, 100], unit: "ng/mL" }
};

/**
 * 从OCR文本中提取关键指标
 * @param {string} ocrText - OCR识别的文本
 * @returns {Array} 提取的关键指标数组
 */
function extractKeyMetrics(ocrText) {
  const extractedMetrics = [];
  
  // 遍历所有指标模式
  Object.keys(metricPatterns).forEach(category => {
    const patterns = metricPatterns[category];
    const referenceRange = referenceRanges[category];
    
    for (const pattern of patterns) {
      const match = ocrText.match(pattern);
      if (match) {
        let value, unit;
        
        // 特殊处理血压（包含两个数值）
        if (category === 'blood_pressure') {
          const systolic = parseFloat(match[1]);
          const diastolic = parseFloat(match[2]);
          value = `${systolic}/${diastolic}`;
          unit = referenceRange.unit;
        } else {
          value = parseFloat(match[1]);
          unit = referenceRange.unit;
        }
        
        // 检查是否已经提取过该指标
        const existingMetric = extractedMetrics.find(m => m.category === category);
        if (!existingMetric) {
          extractedMetrics.push({
            name: getMetricDisplayName(category),
            value: value,
            unit: unit,
            category: category,
            referenceRange: getReferenceRangeText(referenceRange)
          });
        }
        break; // 找到匹配就跳出循环
      }
    }
  });
  
  return extractedMetrics;
}

/**
 * 获取指标的显示名称
 * @param {string} category - 指标类别
 * @returns {string} 显示名称
 */
function getMetricDisplayName(category) {
  const displayNames = {
    blood_pressure: "血压",
    blood_sugar: "血糖",
    cholesterol: "总胆固醇",
    hdl: "高密度脂蛋白",
    ldl: "低密度脂蛋白",
    triglycerides: "甘油三酯",
    uric_acid: "尿酸",
    bone_density: "骨密度",
    vitamin_d: "维生素D"
  };
  return displayNames[category] || category;
}

/**
 * 获取参考范围文本
 * @param {Object} referenceRange - 参考范围对象
 * @returns {string} 参考范围文本
 */
function getReferenceRangeText(referenceRange) {
  if (referenceRange.normal[1] === 999) {
    return `>${referenceRange.normal[0]} ${referenceRange.unit}`;
  } else if (referenceRange.normal[0] === 0) {
    return `<${referenceRange.normal[1]} ${referenceRange.unit}`;
  } else {
    return `${referenceRange.normal[0]}-${referenceRange.normal[1]} ${referenceRange.unit}`;
  }
}

/**
 * 判断指标是否异常
 * @param {Object} metric - 指标对象
 * @returns {Object} 异常状态对象
 */
function checkAbnormal(metric) {
  const referenceRange = referenceRanges[metric.category];
  if (!referenceRange) return { isAbnormal: false };
  
  let value = metric.value;
  
  // 特殊处理血压
  if (metric.category === 'blood_pressure') {
    const [systolic, diastolic] = value.split('/').map(v => parseFloat(v));
    const isHigh = systolic > referenceRange.normal[1] || diastolic > 90;
    return {
      isAbnormal: isHigh,
      status: isHigh ? "偏高" : "正常",
      note: isHigh ? "建议低盐饮食，控制体重，必要时咨询医生" : ""
    };
  }
  
  // 处理其他数值指标
  value = parseFloat(value);
  if (isNaN(value)) return { isAbnormal: false };
  
  const [min, max] = referenceRange.normal;
  let isAbnormal = false;
  let status = "正常";
  let note = "";
  
  if (max === 999) {
    // 大于某个值才正常（如高密度脂蛋白）
    isAbnormal = value < min;
    status = isAbnormal ? "偏低" : "正常";
    note = isAbnormal ? "建议增加有氧运动，改善饮食结构" : "";
  } else if (min === 0) {
    // 小于某个值才正常（如胆固醇、甘油三酯）
    isAbnormal = value > max;
    status = isAbnormal ? "偏高" : "正常";
    note = isAbnormal ? "建议低脂饮食，增加运动" : "";
  } else {
    // 在某个范围内正常
    isAbnormal = value < min || value > max;
    if (value < min) {
      status = "偏低";
      note = "建议咨询医生，检查相关指标";
    } else if (value > max) {
      status = "偏高";
      note = "建议控制饮食，增加运动，定期监测";
    }
  }
  
  return {
    isAbnormal,
    status,
    note
  };
}

/**
 * 生成异常项列表
 * @param {Array} metrics - 关键指标数组
 * @returns {Array} 异常项数组
 */
function generateAbnormalItems(metrics) {
  const abnormalItems = [];
  
  metrics.forEach(metric => {
    const abnormalCheck = checkAbnormal(metric);
    if (abnormalCheck.isAbnormal) {
      abnormalItems.push({
        name: metric.name,
        value: metric.value,
        unit: metric.unit,
        status: abnormalCheck.status,
        referenceRange: metric.referenceRange,
        note: abnormalCheck.note
      });
    }
  });
  
  return abnormalItems;
}

/**
 * 生成综合建议
 * @param {Array} abnormalItems - 异常项数组
 * @param {Array} metrics - 关键指标数组
 * @returns {string} 综合建议文本
 */
function generateSummary(abnormalItems, metrics) {
  if (abnormalItems.length === 0) {
    return "恭喜！您的体检报告显示各项指标均在正常范围内，身体状况良好。建议继续保持健康的生活方式，包括均衡饮食、规律运动和充足睡眠。";
  } else if (abnormalItems.length <= 2) {
    return "您的体检报告显示部分指标略高于正常范围，但整体情况可控。建议调整饮食结构，减少高糖高脂食物，增加运动量，定期复查。";
  } else {
    return "您的体检报告显示多项指标超出正常范围，需要重点关注。建议尽快咨询专业医生，制定个性化的治疗方案，同时调整生活方式。";
  }
}

module.exports = {
  extractKeyMetrics,
  checkAbnormal,
  generateAbnormalItems,
  generateSummary
};

