const { SAMPLE_LIBRARY } = require('./sampleLibrary');
const { PRESCRIPTIONS, HERB_INFO } = require('./herbalKnowledge');

const FEATURE_RANGES = {
  age: { min: 18, max: 85 },
  bmi: { min: 16, max: 38 },
  systolic: { min: 90, max: 190 },
  diastolic: { min: 50, max: 120 },
  fasting_glucose: { min: 3.5, max: 12 },
  hba1c: { min: 4.5, max: 10 },
  total_cholesterol: { min: 3, max: 8.5 },
  hdl: { min: 0.6, max: 2.2 },
  ldl: { min: 1.5, max: 5.5 },
  triglycerides: { min: 0.5, max: 5 },
  uric_acid: { min: 200, max: 600 },
  alt: { min: 5, max: 200 },
  egfr: { min: 30, max: 120 }
};

const DEFAULT_MATCH_OPTIONS = {
  k: 3,
  numericWeight: 0.7,
  categoricalWeight: 0.3,
  similarityThreshold: 0.35
};

function analyzeUserProfile(userProfile, options = {}) {
  const matchOptions = Object.assign({}, DEFAULT_MATCH_OPTIONS, options || {});
  const enrichedProfile = enrichUserProfile(userProfile);

  const matches = findTopMatches(enrichedProfile, matchOptions);
  const best = matches[0];
  const similarity = best ? similarityScore(best.distance) : 0;

  const aggregated = aggregateMatchResults(matches);
  const prescription = aggregated.prescription
    ? buildPrescriptionPlan(aggregated.prescription, aggregated.sampleAdjustment)
    : null;

  const lifestyleAdvice = aggregated.lifestyleAdvice;
  const summary = composeSummary(enrichedProfile, matches, aggregated, similarity);

  let safety = evaluateSafety({
    prescription,
    labs: enrichedProfile.labs,
    history: enrichedProfile.history,
    lifestyle: enrichedProfile.lifestyle,
    similarity
  });

  let finalPrescription = prescription;

  if (similarity < matchOptions.similarityThreshold) {
    finalPrescription = null;
    safety = {
      riskLevel: '信息不足',
      riskLevelClass: 'unknown',
      alerts: [
        '当前相似度较低，仅建议遵循生活方式调整建议。',
        '请携带完整体检资料，咨询执业中医师后再使用中药处方。'
      ],
      disclaimers: buildDisclaimers(true),
      isSafe: false
    };
  } else if (!prescription) {
    safety = {
      riskLevel: '信息不足',
      riskLevelClass: 'unknown',
      alerts: ['未找到合适的中药处方，请咨询专业医师。'],
      disclaimers: buildDisclaimers(false),
      isSafe: false
    };
  }

  return {
    similarity,
    matches,
    tcmPattern: aggregated.tcmPattern,
    constitution: aggregated.constitution,
    severity: aggregated.severity,
    herbalPlan: finalPrescription,
    lifestyleAdvice,
    summary,
    safety
  };
}

function enrichUserProfile(profile) {
  const labs = profile.labs || {};
  const demographics = profile.demographics || {};
  const history = Array.isArray(profile.history) ? profile.history : [];
  const lifestyle = profile.lifestyle || {};
  const symptoms = Array.isArray(profile.symptoms) ? profile.symptoms : [];

  let bmi = labs.bmi || profile.bmi;
  if (!bmi && demographics.height && demographics.weight) {
    const h = parseFloat(demographics.height) / 100;
    const w = parseFloat(demographics.weight);
    if (h && w) {
      bmi = +(w / (h * h)).toFixed(1);
    }
  }

  return {
    labs: Object.assign({}, labs || {}, { bmi }),
    demographics,
    history,
    lifestyle,
    symptoms,
    tcmQuiz: profile.tcmQuiz || {}
  };
}

function findTopMatches(userProfile, options) {
  return SAMPLE_LIBRARY
    .map(sample => {
      const distance = hybridDistance(userProfile, sample, options);
      return {
        sample,
        distance,
        similarity: similarityScore(distance)
      };
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, options.k);
}

function hybridDistance(userProfile, sample, options) {
  const numericUser = buildNumericVector(userProfile);
  const numericSample = buildNumericVector(sample);

  const numericDistance = euclideanDistance(numericUser, numericSample);

  const categoricalDistance = jaccardDistance(
    buildCategoricalSet(userProfile),
    buildCategoricalSet(sample)
  );

  return (options.numericWeight * numericDistance) +
    (options.categoricalWeight * categoricalDistance);
}

function buildNumericVector(entity) {
  const vector = [];
  const labs = entity.labs || {};
  const demographics = entity.meta || entity.demographics || {};

  appendNormalized(vector, demographics.age, FEATURE_RANGES.age);
  appendNormalized(vector, labs.bmi, FEATURE_RANGES.bmi);
  appendNormalized(vector, labs.systolic, FEATURE_RANGES.systolic);
  appendNormalized(vector, labs.diastolic, FEATURE_RANGES.diastolic);
  appendNormalized(vector, labs.fasting_glucose, FEATURE_RANGES.fasting_glucose);
  appendNormalized(vector, labs.hba1c, FEATURE_RANGES.hba1c);
  appendNormalized(vector, labs.total_cholesterol, FEATURE_RANGES.total_cholesterol);
  appendNormalized(vector, labs.hdl, FEATURE_RANGES.hdl, true);
  appendNormalized(vector, labs.ldl, FEATURE_RANGES.ldl);
  appendNormalized(vector, labs.triglycerides, FEATURE_RANGES.triglycerides);
  appendNormalized(vector, labs.uric_acid, FEATURE_RANGES.uric_acid);
  appendNormalized(vector, labs.alt, FEATURE_RANGES.alt);
  appendNormalized(vector, labs.egfr, FEATURE_RANGES.egfr, true);

  return vector;
}

function appendNormalized(vector, value, range, reverse = false) {
  if (value === undefined || value === null || isNaN(value)) {
    vector.push(0.5);
    return;
  }
  const clamped = Math.min(range.max, Math.max(range.min, Number(value)));
  const normalized = (clamped - range.min) / (range.max - range.min);
  vector.push(reverse ? 1 - normalized : normalized);
}

function buildCategoricalSet(entity) {
  const symptoms = entity.symptoms || [];
  const history = entity.history || [];
  const lifestyle = entity.lifestyle || {};

  const lifestyleSet = Object.entries(lifestyle).map(([key, value]) => `${key}:${value}`);

  var allItems = [];
  if (Array.isArray(symptoms)) {
    allItems = allItems.concat(symptoms);
  }
  if (Array.isArray(history)) {
    allItems = allItems.concat(history);
  }
  lifestyleSet.forEach(function(item) {
    allItems.push(item);
  });
  return new Set(allItems);
}

function euclideanDistance(v1, v2) {
  let sum = 0;
  for (let i = 0; i < Math.min(v1.length, v2.length); i += 1) {
    const diff = (v1[i] ?? 0.5) - (v2[i] ?? 0.5);
    sum += diff * diff;
  }
  return Math.sqrt(sum / (v1.length || 1));
}

function jaccardDistance(setA, setB) {
  const a = Array.from(setA);
  const b = Array.from(setB);

  if (!a.length && !b.length) return 0;

  const intersection = a.filter(item => setB.has(item));
  var unionArray = [];
  a.forEach(function(item) { unionArray.push(item); });
  b.forEach(function(item) { unionArray.push(item); });
  const union = new Set(unionArray);

  return 1 - (intersection.length / union.size);
}

function similarityScore(distance) {
  return 1 / (1 + distance);
}

function aggregateMatchResults(matches) {
  if (!matches.length) {
    return {
      tcmPattern: null,
      constitution: null,
      severity: '未知',
      prescription: null,
      sampleAdjustment: null,
      lifestyleAdvice: [],
      supportingSamples: []
    };
  }

  const weightSum = matches.reduce((sum, item) => sum + matchWeight(item.distance), 0);
  const weighted = {
    patterns: {},
    constitutions: {},
    severity: 0,
    lifestyle: new Set(),
    prescriptions: {},
    adjustments: []
  };

  matches.forEach(item => {
    const w = matchWeight(item.distance) / (weightSum || 1);
    const { sample } = item;

    weighted.patterns[sample.tcm_pattern] = (weighted.patterns[sample.tcm_pattern] || 0) + w;
    weighted.constitutions[sample.constitution] = (weighted.constitutions[sample.constitution] || 0) + w;

    collectLifestyleAdvice(weighted.lifestyle, sample.herbal_plan?.lifestyle);

    if (sample.herbal_plan?.prescriptionId) {
      weighted.prescriptions[sample.herbal_plan.prescriptionId] =
        (weighted.prescriptions[sample.herbal_plan.prescriptionId] || 0) + w;
    }
    if (sample.herbal_plan?.adjustments) {
      weighted.adjustments.push({ weight: w, adjustments: sample.herbal_plan.adjustments });
    }
  });

  const topPattern = topKey(weighted.patterns);
  const topConstitution = topKey(weighted.constitutions);
  const topPrescriptionId = topKey(weighted.prescriptions);

  return {
    tcmPattern: topPattern,
    constitution: topConstitution,
    severity: estimateSeverity(matches),
    prescription: topPrescriptionId,
    sampleAdjustment: weighted.adjustments,
    lifestyleAdvice: (function() {
      var result = [];
      weighted.lifestyle.forEach(function(item) {
        result.push(item);
      });
      return result;
    })(),
    supportingSamples: matches.map(item => item.sample.id)
  };
}

function collectLifestyleAdvice(targetSet, list) {
  if (!Array.isArray(list)) return;
  list.forEach(item => targetSet.add(item));
}

function matchWeight(distance) {
  return 1 / (distance + 1e-3);
}

function topKey(weightMap) {
  return Object.entries(weightMap).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
}

function estimateSeverity(matches) {
  const best = matches[0];
  if (!best) return '未知';
  if (best.distance < 0.2) return '轻度';
  if (best.distance < 0.35) return '中等';
  return '需关注';
}

function buildPrescriptionPlan(prescriptionId, adjustments) {
  if (!prescriptionId) return null;
  const base = PRESCRIPTIONS[prescriptionId];
  if (!base) return null;

  const mergedAdjustments = mergeAdjustments(adjustments);

  return {
    id: base.id,
    name: base.name,
    category: base.category,
    herbs: base.herbs,
    dosage: base.dosage,
    duration: base.duration,
    precautions: base.precautions || [],
    contraindications: base.contraindications || [],
    adjustments: mergedAdjustments
  };
}

function mergeAdjustments(adjustmentsList) {
  if (!Array.isArray(adjustmentsList) || !adjustmentsList.length) return [];
  const aggregate = new Map();
  adjustmentsList.forEach(entry => {
    if (!Array.isArray(entry.adjustments)) return;
    entry.adjustments.forEach(adjustment => {
      aggregate.set(adjustment, (aggregate.get(adjustment) || 0) + entry.weight);
    });
  });
  return Array.from(aggregate.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([text]) => text);
}

function composeSummary(profile, matches, aggregated, similarity) {
  if (!matches.length) {
    return '未能匹配到相似案例，请完善资料后重试或咨询专业医师。';
  }

  const pattern = aggregated.tcmPattern || '体质待判定';
  const constitution = aggregated.constitution || '平和体质';

  const severityText = (() => {
    if (similarity >= 0.75) return '整体状况与经典案例高度吻合。';
    if (similarity >= 0.55) return '与样本库存在较高相似度。';
    if (similarity >= 0.4) return '与样本库存在一定相似度，请结合实际调整。';
    return '与样本库相似度较低，仅供参考。';
  })();

  const keyLabs = extractKeyLabHighlights(profile.labs || {});

  return [
    `根据近邻样本综合判断，当前体质倾向于「${constitution}」，证候表现可归属「${pattern}」。`,
    severityText,
    keyLabs.length ? `重点关注指标：${keyLabs.join('、')}。` : '',
    '请结合个体病史，由执业中医师辨证论治。'
  ].filter(Boolean).join('\n');
}

function extractKeyLabHighlights(labs) {
  const alerts = [];
  if (labs.systolic && labs.systolic >= 140) alerts.push(`收缩压${labs.systolic}mmHg`);
  if (labs.fasting_glucose && labs.fasting_glucose >= 7) alerts.push(`空腹血糖${labs.fasting_glucose}mmol/L`);
  if (labs.hba1c && labs.hba1c >= 6.5) alerts.push(`糖化${labs.hba1c}%`);
  if (labs.total_cholesterol && labs.total_cholesterol >= 5.7) alerts.push(`总胆固醇${labs.total_cholesterol}mmol/L`);
  if (labs.triglycerides && labs.triglycerides >= 2.3) alerts.push(`甘油三酯${labs.triglycerides}mmol/L`);
  if (labs.uric_acid && labs.uric_acid >= 420) alerts.push(`尿酸${labs.uric_acid}μmol/L`);
  if (labs.alt && labs.alt >= 60) alerts.push(`ALT ${labs.alt}U/L`);
  if (labs.egfr && labs.egfr <= 60) alerts.push(`eGFR ${labs.egfr}ml/min`);
  return alerts;
}

function evaluateSafety({ prescription, labs, history, lifestyle, similarity }) {
  const alerts = [];
  const mediumAlerts = [];

  if (labs.alt && labs.alt > 120) {
    alerts.push('ALT超过3倍上限（>120U/L），建议立即就医评估肝功能。');
  }
  if (labs.egfr && labs.egfr < 60) {
    alerts.push('eGFR < 60 ml/min，存在肾功能不全风险，请在医师指导下用药。');
  }

  const historySet = new Set(history || []);
  if (historySet.has('pregnancy') || historySet.has('pregnant')) {
    alerts.push('孕期人群禁用多数活血攻下类药物，请在医师指导下调整。');
  }
  if (historySet.has('breastfeeding')) {
    mediumAlerts.push('哺乳期用药需评估母乳安全性，请咨询医师。');
  }

  if (prescription) {
    const base = PRESCRIPTIONS[prescription.id];
    if (base?.contraindications?.length) {
      base.contraindications.forEach(item => mediumAlerts.push(item));
    }
    const herbs = prescription.herbs || [];
    herbs.forEach(herb => {
      const info = HERB_INFO[herb.name];
      if (!info) return;
      if (info.contraindications?.length) {
        info.contraindications.forEach(text => mediumAlerts.push(`${herb.name}：${text}`));
      }
      if (info.interactions?.length) {
        info.interactions.forEach(text => mediumAlerts.push(`${herb.name}：可能与${text}产生交互`));
      }
    });
  }

  const uniqueAlerts = Array.from(new Set(alerts));
  const uniqueMedium = Array.from(new Set(mediumAlerts));

  const riskLevel = (() => {
    if (uniqueAlerts.length) return '高风险';
    if (uniqueMedium.length >= 2) return '中等风险';
    if (uniqueMedium.length) return '低风险';
    return '安全';
  })();

  const riskLevelClass = (() => {
    switch (riskLevel) {
      case '高风险':
        return 'high';
      case '中等风险':
        return 'medium';
      case '低风险':
        return 'low';
      case '安全':
        return 'safe';
      default:
        return 'unknown';
    }
  })();

  return {
    riskLevel,
    riskLevelClass,
    alerts: uniqueAlerts.concat(uniqueMedium),
    disclaimers: buildDisclaimers(similarity < 0.55),
    isSafe: riskLevel === '安全'
  };
}

function buildDisclaimers(isLowSimilarity) {
  const disclaimers = [
    '本系统仅用于健康管理与中医调理参考，不可替代专业诊疗。',
    '最终用药与调整需由具有处方权的执业中医师判断。',
    '如出现不适或症状加重，请立即就医。'
  ];
  if (isLowSimilarity) {
    disclaimers.unshift('当前匹配度有限，请结合医生面诊综合评估。');
  }
  return disclaimers;
}

module.exports = {
  analyzeUserProfile
};
