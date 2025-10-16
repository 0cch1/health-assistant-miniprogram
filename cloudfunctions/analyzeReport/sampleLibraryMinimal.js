/**
 * 最小化样本库 - 只包含核心样本数据
 * 完整数据存储在云存储中，按需加载
 */

const SAMPLE_LIBRARY_MINIMAL = [
  // 降血压样本
  {
    id: "sample_001",
    meta: { gender: "male", age: 45 },
    demographics: { height: 170, weight: 75 },
    history: ["hypertension"],
    lifestyle: { smoking: "never", alcohol: "rare", exercise: "moderate", sleep: "adequate" },
    symptoms: ["appeal_lower_bp"],
    tcmQuiz: { qi_deficiency: 3, blood_deficiency: 2, yang_deficiency: 2, yin_deficiency: 2, damp_heat: 2, phlegm_damp: 2, blood_stasis: 2, qi_stagnation: 2 },
    herbal_plan: {
      customHerbs: [
        { name: "天麻", amount: 10, unit: "g", effect: "平肝息风" },
        { name: "钩藤", amount: 15, unit: "g", effect: "清热平肝" },
        { name: "夏枯草", amount: 12, unit: "g", effect: "清肝明目" }
      ]
    }
  },
  // 调理肝功能样本
  {
    id: "sample_002", 
    meta: { gender: "male", age: 38 },
    demographics: { height: 175, weight: 80 },
    history: ["fatty_liver"],
    lifestyle: { smoking: "current", alcohol: "weekly", exercise: "low", sleep: "late" },
    symptoms: ["appeal_liver"],
    tcmQuiz: { qi_deficiency: 2, blood_deficiency: 2, yang_deficiency: 2, yin_deficiency: 3, damp_heat: 4, phlegm_damp: 3, blood_stasis: 2, qi_stagnation: 3 },
    herbal_plan: {
      customHerbs: [
        { name: "柴胡", amount: 12, unit: "g", effect: "疏肝解郁" },
        { name: "黄芩", amount: 10, unit: "g", effect: "清热燥湿" },
        { name: "茵陈", amount: 15, unit: "g", effect: "清热利湿" }
      ]
    }
  },
  // 辅助心脏健康样本
  {
    id: "sample_003",
    meta: { gender: "female", age: 52 },
    demographics: { height: 160, weight: 65 },
    history: ["hypertension"],
    lifestyle: { smoking: "never", alcohol: "none", exercise: "moderate", sleep: "adequate" },
    symptoms: ["appeal_heart"],
    tcmQuiz: { qi_deficiency: 3, blood_deficiency: 2, yang_deficiency: 2, yin_deficiency: 2, damp_heat: 2, phlegm_damp: 2, blood_stasis: 3, qi_stagnation: 2 },
    herbal_plan: {
      customHerbs: [
        { name: "丹参", amount: 15, unit: "g", effect: "活血化瘀" },
        { name: "川芎", amount: 10, unit: "g", effect: "活血行气" },
        { name: "红花", amount: 6, unit: "g", effect: "活血通经" }
      ]
    }
  },
  // 增强记忆力样本
  {
    id: "sample_004",
    meta: { gender: "female", age: 28 },
    demographics: { height: 165, weight: 55 },
    history: [],
    lifestyle: { smoking: "never", alcohol: "rare", exercise: "moderate", sleep: "fragmented" },
    symptoms: ["appeal_memory"],
    tcmQuiz: { qi_deficiency: 2, blood_deficiency: 3, yang_deficiency: 2, yin_deficiency: 2, damp_heat: 2, phlegm_damp: 2, blood_stasis: 2, qi_stagnation: 2 },
    herbal_plan: {
      customHerbs: [
        { name: "远志", amount: 10, unit: "g", effect: "安神益智" },
        { name: "石菖蒲", amount: 12, unit: "g", effect: "开窍醒神" },
        { name: "酸枣仁", amount: 15, unit: "g", effect: "养心安神" }
      ]
    }
  },
  // 改善睡眠样本
  {
    id: "sample_005",
    meta: { gender: "male", age: 35 },
    demographics: { height: 172, weight: 70 },
    history: [],
    lifestyle: { smoking: "never", alcohol: "rare", exercise: "regular", sleep: "insomnia" },
    symptoms: ["appeal_sleep"],
    tcmQuiz: { qi_deficiency: 2, blood_deficiency: 3, yang_deficiency: 2, yin_deficiency: 3, damp_heat: 2, phlegm_damp: 2, blood_stasis: 2, qi_stagnation: 3 },
    herbal_plan: {
      customHerbs: [
        { name: "龙骨", amount: 20, unit: "g", effect: "镇惊安神" },
        { name: "牡蛎", amount: 20, unit: "g", effect: "重镇安神" },
        { name: "夜交藤", amount: 15, unit: "g", effect: "养心安神" }
      ]
    }
  }
];

module.exports = { SAMPLE_LIBRARY_MINIMAL };
