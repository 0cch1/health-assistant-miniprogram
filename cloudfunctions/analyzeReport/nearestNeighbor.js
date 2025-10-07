// 最近邻匹配算法
// 根据提取的指标找到最相似的样本报告

const { sampleReports } = require('./sampleDatabase');

/**
 * 计算两个指标向量之间的欧几里得距离
 * @param {Array} vector1 - 第一个指标向量
 * @param {Array} vector2 - 第二个指标向量
 * @returns {number} 距离值
 */
function calculateEuclideanDistance(vector1, vector2) {
  if (vector1.length !== vector2.length) {
    throw new Error('向量长度不匹配');
  }
  
  let sum = 0;
  for (let i = 0; i < vector1.length; i++) {
    const diff = vector1[i] - vector2[i];
    sum += diff * diff;
  }
  
  return Math.sqrt(sum);
}

/**
 * 标准化数值（将不同量纲的指标标准化到0-1范围）
 * @param {number} value - 原始值
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} 标准化后的值
 */
function normalizeValue(value, min, max) {
  if (max === min) return 0.5; // 避免除零
  return (value - min) / (max - min);
}

/**
 * 将指标数组转换为标准化向量
 * @param {Array} metrics - 指标数组
 * @returns {Array} 标准化向量
 */
function metricsToVector(metrics) {
  // 定义所有可能的指标类别和它们的数值范围
  const metricRanges = {
    blood_pressure: { min: 80, max: 200 }, // 收缩压范围
    blood_sugar: { min: 3.0, max: 10.0 },
    cholesterol: { min: 2.0, max: 8.0 },
    hdl: { min: 0.5, max: 3.0 },
    ldl: { min: 1.0, max: 6.0 },
    triglycerides: { min: 0.5, max: 5.0 },
    uric_acid: { min: 100, max: 600 },
    bone_density: { min: -3.0, max: 2.0 },
    vitamin_d: { min: 10, max: 80 }
  };
  
  const vector = [];
  const categoryOrder = Object.keys(metricRanges);
  
  // 为每个类别创建向量元素
  categoryOrder.forEach(category => {
    const metric = metrics.find(m => m.category === category);
    if (metric) {
      let value = metric.value;
      
      // 特殊处理血压（取收缩压）
      if (category === 'blood_pressure' && typeof value === 'string') {
        value = parseFloat(value.split('/')[0]);
      } else {
        value = parseFloat(value);
      }
      
      if (!isNaN(value)) {
        const range = metricRanges[category];
        const normalizedValue = normalizeValue(value, range.min, range.max);
        vector.push(normalizedValue);
      } else {
        vector.push(0.5); // 默认中值
      }
    } else {
      vector.push(0.5); // 缺失值用中值代替
    }
  });
  
  return vector;
}

/**
 * 找到最相似的样本
 * @param {Array} extractedMetrics - 提取的指标数组
 * @returns {Object} 最相似的样本和相似度信息
 */
function findNearestNeighbor(extractedMetrics) {
  if (!extractedMetrics || extractedMetrics.length === 0) {
    throw new Error('没有提取到有效的指标');
  }
  
  // 将提取的指标转换为向量
  const queryVector = metricsToVector(extractedMetrics);
  
  let minDistance = Infinity;
  let nearestSample = null;
  let similarity = 0;
  
  // 遍历所有样本，找到最相似的
  sampleReports.forEach(sample => {
    try {
      const sampleVector = metricsToVector(sample.keyMetrics);
      const distance = calculateEuclideanDistance(queryVector, sampleVector);
      
      if (distance < minDistance) {
        minDistance = distance;
        nearestSample = sample;
        // 将距离转换为相似度（0-1，1表示完全相似）
        similarity = Math.max(0, 1 - distance / Math.sqrt(queryVector.length));
      }
    } catch (error) {
      console.warn(`处理样本 ${sample.id} 时出错:`, error.message);
    }
  });
  
  if (!nearestSample) {
    throw new Error('无法找到匹配的样本');
  }
  
  return {
    sample: nearestSample,
    distance: minDistance,
    similarity: similarity,
    confidence: similarity > 0.7 ? 'high' : similarity > 0.5 ? 'medium' : 'low'
  };
}

/**
 * 基于最近邻样本生成分析结果
 * @param {Array} extractedMetrics - 提取的指标数组
 * @param {Object} nearestMatch - 最近邻匹配结果
 * @returns {Object} 分析结果
 */
function generateAnalysisFromNearestNeighbor(extractedMetrics, nearestMatch) {
  const { sample, similarity, confidence } = nearestMatch;
  
  // 使用提取的指标作为关键指标
  const keyMetrics = extractedMetrics.map(metric => ({
    name: metric.name,
    value: metric.value,
    unit: metric.unit,
    referenceRange: metric.referenceRange
  }));
  
  // 基于提取的指标生成异常项
  const abnormalItems = [];
  extractedMetrics.forEach(metric => {
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
  
  // 基于相似样本和异常项生成总结
  let summary = sample.summary;
  
  // 根据相似度调整总结
  if (similarity < 0.5) {
    summary = "基于您的体检指标，建议咨询专业医生进行详细评估。本分析结果仅供参考。";
  } else if (similarity < 0.7) {
    summary = "基于相似案例的分析：" + summary;
  }
  
  // 添加置信度说明
  const confidenceText = {
    high: "（高置信度匹配）",
    medium: "（中等置信度匹配）",
    low: "（低置信度匹配，建议咨询医生）"
  };
  
  summary += ` ${confidenceText[confidence]}`;
  
  return {
    keyMetrics,
    abnormalItems,
    summary,
    analysisType: `基于样本匹配分析 ${confidenceText[confidence]}`,
    matchedSample: {
      id: sample.id,
      type: sample.type,
      similarity: Math.round(similarity * 100) + '%'
    }
  };
}

/**
 * 检查指标是否异常（从ocrExtractor复制过来，避免循环依赖）
 */
function checkAbnormal(metric) {
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

module.exports = {
  findNearestNeighbor,
  generateAnalysisFromNearestNeighbor,
  calculateEuclideanDistance,
  metricsToVector
};

