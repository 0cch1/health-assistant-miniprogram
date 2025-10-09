/**
 * 样本库数据
 * 结构遵循《中药智能分析与推荐系统_开发监督规范》要求：
 * { id, meta, labs, tcm_pattern, herbal_plan, contra, notes }
 */

const SAMPLE_LIBRARY = [
  {
    id: 'hypertension_01',
    meta: { gender: 'male', age: 45, bmi: 27.3 },
    labs: {
      systolic: 152,
      diastolic: 96,
      fasting_glucose: 5.9,
      total_cholesterol: 5.8,
      hdl: 1.02,
      ldl: 3.9,
      triglycerides: 2.4,
      uric_acid: 420,
      alt: 38,
      egfr: 90
    },
    history: ['family_hypertension'],
    lifestyle: { smoking: 'former', alcohol: 'occasional', exercise: 'low', sleep: 'late' },
    symptoms: ['肝阳上亢', '头晕', '耳鸣', '烦躁'],
    tcm_pattern: '肝阳上亢',
    constitution: '阴虚阳亢体质',
    herbal_plan: {
      prescriptionId: 'tianma_gouteng',
      adjustments: ['加决明子12g'],
      lifestyle: [
        '控制盐摄入不超过5g/日',
        '保证每晚7小时睡眠'
      ],
      explanations: [
        '平肝息风以缓解头晕耳鸣',
        '兼顾降压与安神，减轻烦躁'
      ]
    },
    contra: ['孕期慎用', '血压偏低者不宜长服'],
    notes: '适用于血压偏高伴头晕耳鸣、肝阳亢盛表现。'
  },
  {
    id: 'hypertension_02',
    meta: { gender: 'female', age: 52, bmi: 25.1 },
    labs: {
      systolic: 146,
      diastolic: 92,
      fasting_glucose: 5.7,
      total_cholesterol: 5.4,
      hdl: 1.18,
      ldl: 3.5,
      triglycerides: 1.9,
      uric_acid: 398,
      alt: 42,
      egfr: 86
    },
    history: ['peri_menopause'],
    lifestyle: { smoking: 'never', alcohol: 'rare', exercise: 'regular', sleep: 'fragmented' },
    symptoms: ['肝阳上亢', '眩晕', '口干', '失眠'],
    tcm_pattern: '肝阳化风',
    constitution: '阴虚阳亢体质',
    herbal_plan: {
      prescriptionId: 'tianma_gouteng',
      adjustments: ['加夜交藤15g', '去杜仲'],
      lifestyle: [
        '晚间避免咖啡因，建立固定作息',
        '结合颈部放松训练，缓解血管紧张'
      ],
      explanations: [
        '肝阳上亢兼阴虚，强化滋阴潜阳',
        '改善更年期相关的眩晕与睡眠问题'
      ]
    },
    contra: ['低血压人群慎用'],
    notes: '针对更年期血压波动，偏于肝阳化风兼阴虚。'
  },
  {
    id: 'hypertension_03',
    meta: { gender: 'male', age: 60, bmi: 26.5 },
    labs: {
      systolic: 160,
      diastolic: 98,
      fasting_glucose: 6.2,
      total_cholesterol: 5.9,
      hdl: 1.05,
      ldl: 3.7,
      triglycerides: 2.1,
      uric_acid: 440,
      alt: 36,
      egfr: 78
    },
    history: ['hypertension', 'cervical_spondylosis'],
    lifestyle: { smoking: 'former', alcohol: 'weekly', exercise: 'low', sleep: 'short' },
    symptoms: ['肝阳上亢', '头胀', '肩颈紧张', '易怒'],
    tcm_pattern: '肝阳亢盛兼痰湿',
    constitution: '痰湿体质',
    herbal_plan: {
      prescriptionId: 'tianma_gouteng',
      adjustments: ['加石决明20g', '加菊花12g'],
      lifestyle: [
        '每日热敷或理疗颈部，配合颈项操',
        '减少油炸食物摄入，控制体重'
      ],
      explanations: [
        '肝阳上亢兼痰湿内阻，需平肝化痰并通络',
        '放松肩颈有助于改善血压波动'
      ]
    },
    contra: ['孕妇慎用'],
    notes: '偏于肝阳亢盛兼痰湿壅阻，常见于颈椎病伴发血压波动。'
  },
  {
    id: 'hypertension_04',
    meta: { gender: 'female', age: 38, bmi: 23.4 },
    labs: {
      systolic: 140,
      diastolic: 88,
      fasting_glucose: 5.5,
      total_cholesterol: 5.1,
      hdl: 1.32,
      ldl: 3.1,
      triglycerides: 1.7,
      uric_acid: 360,
      alt: 28,
      egfr: 102
    },
    history: ['migraine'],
    lifestyle: { smoking: 'never', alcohol: 'rare', exercise: 'moderate', sleep: 'irregular' },
    symptoms: ['肝阳上亢', '偏头痛', '目赤', '情绪紧张'],
    tcm_pattern: '肝阳上扰',
    constitution: '气郁体质',
    herbal_plan: {
      prescriptionId: 'tianma_gouteng',
      adjustments: ['加夏枯草12g', '加白芍12g'],
      lifestyle: [
        '维持情绪稳定，练习呼吸放松',
        '减少电子屏幕使用，避免熬夜'
      ],
      explanations: [
        '侧重平肝潜阳兼疏肝理气',
        '缓解偏头痛与目赤症状'
      ]
    },
    contra: ['低血压倾向者慎用'],
    notes: '偏肝阳上扰兼气郁，常伴偏头痛及情绪波动。'
  },
  {
    id: 'hypertension_05',
    meta: { gender: 'male', age: 55, bmi: 28.4 },
    labs: {
      systolic: 165,
      diastolic: 100,
      fasting_glucose: 6.3,
      total_cholesterol: 6.1,
      hdl: 0.98,
      ldl: 4.0,
      triglycerides: 2.5,
      uric_acid: 450,
      alt: 46,
      egfr: 74
    },
    history: ['hypertension', 'fatty_liver'],
    lifestyle: { smoking: 'current', alcohol: 'weekly', exercise: 'low', sleep: 'late' },
    symptoms: ['肝阳上亢', '头目眩晕', '口苦', '胸闷'],
    tcm_pattern: '肝火上炎',
    constitution: '湿热体质',
    herbal_plan: {
      prescriptionId: 'tianma_gouteng',
      adjustments: ['加黄芩9g', '加决明子12g', '去夜交藤'],
      lifestyle: [
        '戒烟限酒，尽量每周三次快走30分钟',
        '清淡饮食，减少油腻辛辣'
      ],
      explanations: [
        '肝火偏旺需清肝泻火兼降压',
        '配伍清热药物以减轻上火表现'
      ]
    },
    contra: ['低血压人群慎用'],
    notes: '肝火旺盛兼血脂偏高，重点清肝降压与化湿。'
  },
  {
    id: 'hyperglycemia_01',
    meta: { gender: 'female', age: 50, bmi: 26.8 },
    labs: {
      fasting_glucose: 7.4,
      hba1c: 6.8,
      total_cholesterol: 5.6,
      hdl: 1.15,
      ldl: 3.4,
      triglycerides: 2.0,
      uric_acid: 410,
      alt: 42,
      egfr: 88,
      systolic: 138,
      diastolic: 86
    },
    history: ['pre_diabetes', 'family_diabetes'],
    lifestyle: { smoking: 'never', alcohol: 'rare', exercise: 'low', sleep: 'fragmented' },
    symptoms: ['气阴两虚', '口干多饮', '乏力', '盗汗'],
    tcm_pattern: '气阴两虚',
    constitution: '阴虚体质',
    herbal_plan: {
      prescriptionId: 'yu_quan',
      adjustments: ['加西洋参6g'],
      lifestyle: [
        '主食控制在6两以内，减少甜饮',
        '每周3次快走配合八段锦'
      ],
      explanations: [
        '益气养阴，改善三多症状',
        '兼顾糖代谢与体力恢复'
      ]
    },
    contra: ['脾胃虚寒慎用'],
    notes: '针对口干多饮、乏力盗汗的气阴两虚型高血糖。'
  },
  {
    id: 'hyperglycemia_02',
    meta: { gender: 'male', age: 58, bmi: 29.2 },
    labs: {
      fasting_glucose: 8.1,
      hba1c: 7.2,
      total_cholesterol: 6.0,
      hdl: 0.95,
      ldl: 3.8,
      triglycerides: 2.6,
      uric_acid: 470,
      alt: 58,
      egfr: 82,
      systolic: 142,
      diastolic: 90
    },
    history: ['type2_diabetes', 'fatty_liver'],
    lifestyle: { smoking: 'former', alcohol: 'weekly', exercise: 'low', sleep: 'late' },
    symptoms: ['痰湿内盛', '困倦', '口黏', '肢麻'],
    tcm_pattern: '痰湿内阻',
    constitution: '痰湿体质',
    herbal_plan: {
      prescriptionId: 'fangfeng_tongsheng',
      adjustments: ['加葛根15g', '去薄荷'],
      lifestyle: [
        '控制体重，每日记录血糖',
        '戒烟限酒，早睡不晚于23点'
      ],
      explanations: [
        '健脾化湿并兼顾降糖',
        '缓解痰湿困阻导致的倦怠'
      ]
    },
    contra: ['肝功能异常慎用辛温药物'],
    notes: '以痰湿内阻为主的2型糖尿病伴脂代谢异常。'
  },
  {
    id: 'hyperglycemia_03',
    meta: { gender: 'female', age: 42, bmi: 24.5 },
    labs: {
      fasting_glucose: 6.8,
      hba1c: 6.5,
      total_cholesterol: 5.2,
      hdl: 1.32,
      ldl: 3.0,
      triglycerides: 1.8,
      uric_acid: 360,
      alt: 30,
      egfr: 104,
      systolic: 128,
      diastolic: 82
    },
    history: ['gestational_diabetes'],
    lifestyle: { smoking: 'never', alcohol: 'rare', exercise: 'moderate', sleep: 'adequate' },
    symptoms: ['阴虚燥热', '口干舌燥', '心烦', '夜寐不安'],
    tcm_pattern: '阴虚内热',
    constitution: '阴虚体质',
    herbal_plan: {
      prescriptionId: 'zhi_bo_di_huang',
      adjustments: ['加知母9g', '加麦冬12g'],
      lifestyle: [
        '保持低GI饮食，多吃绿叶蔬菜',
        '每日21点后避免进食'
      ],
      explanations: [
        '滋阴降火，改善口干心烦',
        '调理内分泌波动，预防血糖上升'
      ]
    },
    contra: ['脾虚便溏者慎用'],
    notes: '阴虚内热型血糖偏高，兼顾滋阴与降火。'
  },
  {
    id: 'hyperglycemia_04',
    meta: { gender: 'male', age: 63, bmi: 23.8 },
    labs: {
      fasting_glucose: 7.0,
      hba1c: 6.9,
      total_cholesterol: 5.4,
      hdl: 1.25,
      ldl: 3.2,
      triglycerides: 1.7,
      uric_acid: 400,
      alt: 34,
      egfr: 92,
      systolic: 136,
      diastolic: 84
    },
    history: ['type2_diabetes', 'mild_neuropathy'],
    lifestyle: { smoking: 'never', alcohol: 'occasional', exercise: 'regular', sleep: 'fragmented' },
    symptoms: ['气阴两虚', '下肢麻木', '筋脉拘急'],
    tcm_pattern: '气阴不足',
    constitution: '气虚体质',
    herbal_plan: {
      prescriptionId: 'huangqi_guizhi_wuwu',
      adjustments: ['加鸡血藤15g'],
      lifestyle: [
        '坚持温水泡脚并进行足部体操',
        '保持三餐定时，晚餐不晚于19点'
      ],
      explanations: [
        '益气养血以通络止麻',
        '改善末梢循环，辅助血糖管理'
      ]
    },
    contra: ['感冒发热期间停用'],
    notes: '常用于糖尿病周围神经病变伴气阴不足。'
  },
  {
    id: 'hyperglycemia_05',
    meta: { gender: 'female', age: 47, bmi: 30.1 },
    labs: {
      fasting_glucose: 7.8,
      hba1c: 7.5,
      total_cholesterol: 6.3,
      hdl: 0.9,
      ldl: 4.0,
      triglycerides: 2.8,
      uric_acid: 480,
      alt: 60,
      egfr: 80,
      systolic: 142,
      diastolic: 88
    },
    history: ['type2_diabetes', 'pcos'],
    lifestyle: { smoking: 'never', alcohol: 'rare', exercise: 'low', sleep: 'late' },
    symptoms: ['痰湿内盛', '月经不调', '体重增长'],
    tcm_pattern: '痰湿阻滞',
    constitution: '痰湿体质',
    herbal_plan: {
      prescriptionId: 'jia_wei_xiao_yao',
      adjustments: ['加苍术10g', '加泽泻12g'],
      lifestyle: [
        '控制油脂与甜食，增加豆类摄入',
        '每周4次有氧+力量联合训练'
      ],
      explanations: [
        '疏肝解郁并化痰湿，调理月经',
        '兼顾血糖与体重管理'
      ]
    },
    contra: ['孕期慎用'],
    notes: '痰湿与肝郁并见，伴代谢性问题和月经失调。'
  },
  {
    id: 'lipid_01',
    meta: { gender: 'male', age: 48, bmi: 28.5 },
    labs: {
      total_cholesterol: 6.4,
      hdl: 0.88,
      ldl: 4.1,
      triglycerides: 2.6,
      uric_acid: 430,
      fasting_glucose: 5.8,
      alt: 45,
      egfr: 96,
      systolic: 136,
      diastolic: 86
    },
    history: ['dyslipidemia'],
    lifestyle: { smoking: 'current', alcohol: 'weekly', exercise: 'low', sleep: 'late' },
    symptoms: ['痰湿内盛', '胸闷', '体倦', '口黏'],
    tcm_pattern: '痰湿阻络',
    constitution: '痰湿体质',
    herbal_plan: {
      prescriptionId: 'er_chen',
      adjustments: ['加山楂15g', '加决明子12g'],
      lifestyle: [
        '减少油炸加工食品，晚餐七分饱',
        '每周至少150分钟中等强度运动'
      ],
      explanations: [
        '化痰除湿并行气化浊',
        '重点调理血脂异常'
      ]
    },
    contra: ['胃酸过多慎用山楂'],
    notes: '血脂异常伴痰湿壅滞，重点化痰行气。'
  },
  {
    id: 'lipid_02',
    meta: { gender: 'female', age: 56, bmi: 26.2 },
    labs: {
      total_cholesterol: 6.0,
      hdl: 1.1,
      ldl: 3.6,
      triglycerides: 2.3,
      uric_acid: 390,
      fasting_glucose: 5.6,
      alt: 32,
      egfr: 88,
      systolic: 132,
      diastolic: 82
    },
    history: ['hyperlipidemia', 'fatty_liver'],
    lifestyle: { smoking: 'never', alcohol: 'rare', exercise: 'moderate', sleep: 'adequate' },
    symptoms: ['痰湿内盛', '纳呆', '脘胀', '大便黏滞'],
    tcm_pattern: '痰湿困脾',
    constitution: '脾虚体质',
    herbal_plan: {
      prescriptionId: 'shen_ling_bai_zhu',
      adjustments: ['加佩兰10g', '加莱菔子12g'],
      lifestyle: [
        '每日摄入25g膳食纤维，增加粗粮',
        '睡前3小时避免进食'
      ],
      explanations: [
        '健脾化湿，改善食欲不振',
        '降低血脂并保护肝脾'
      ]
    },
    contra: ['阴虚燥热者慎用'],
    notes: '以脾虚痰湿为主的血脂异常。'
  },
  {
    id: 'lipid_03',
    meta: { gender: 'male', age: 53, bmi: 27.1 },
    labs: {
      total_cholesterol: 6.8,
      hdl: 0.92,
      ldl: 4.3,
      triglycerides: 2.9,
      uric_acid: 460,
      fasting_glucose: 6.0,
      alt: 52,
      egfr: 90,
      systolic: 140,
      diastolic: 88
    },
    history: ['hyperlipidemia', 'fatty_liver', 'hypertension'],
    lifestyle: { smoking: 'former', alcohol: 'weekly', exercise: 'low', sleep: 'fragmented' },
    symptoms: ['痰湿内盛', '胸闷', '乏力', '口渴不欲饮'],
    tcm_pattern: '痰湿瘀阻',
    constitution: '痰湿体质',
    herbal_plan: {
      prescriptionId: 'xue_fu_zhu_yu',
      adjustments: ['加丹参15g', '加泽泻12g'],
      lifestyle: [
        '每周记录血压血脂，保持规律作息',
        '坚持地中海式饮食'
      ],
      explanations: [
        '化痰行瘀并改善血液循环',
        '有助于改善脂肪肝与高血压'
      ]
    },
    contra: ['孕期及出血倾向者慎用'],
    notes: '痰湿瘀阻并发血压血脂异常，偏重活血化瘀。'
  },
  {
    id: 'lipid_04',
    meta: { gender: 'female', age: 61, bmi: 24.9 },
    labs: {
      total_cholesterol: 6.2,
      hdl: 1.2,
      ldl: 3.7,
      triglycerides: 2.1,
      uric_acid: 410,
      fasting_glucose: 5.7,
      alt: 36,
      egfr: 92,
      systolic: 134,
      diastolic: 84
    },
    history: ['hyperlipidemia', 'menopause'],
    lifestyle: { smoking: 'never', alcohol: 'rare', exercise: 'regular', sleep: 'light' },
    symptoms: ['气滞血瘀', '胸闷', '情绪波动', '口苦'],
    tcm_pattern: '肝郁气滞',
    constitution: '气郁体质',
    herbal_plan: {
      prescriptionId: 'chai_hu_shu_gan',
      adjustments: ['加郁金9g', '加山楂15g'],
      lifestyle: [
        '进行呼吸冥想训练调整情绪',
        '保持低脂饮食并多食豆类'
      ],
      explanations: [
        '疏肝理气并活血，缓解情绪与胸闷',
        '辅助改善血脂与内分泌'
      ]
    },
    contra: ['肝火旺盛者慎用'],
    notes: '更年期血脂异常伴情绪波动，侧重疏肝理气。'
  },
  {
    id: 'lipid_05',
    meta: { gender: 'male', age: 59, bmi: 30.2 },
    labs: {
      total_cholesterol: 6.9,
      hdl: 0.85,
      ldl: 4.5,
      triglycerides: 3.1,
      uric_acid: 500,
      fasting_glucose: 6.2,
      alt: 58,
      egfr: 76,
      systolic: 142,
      diastolic: 90
    },
    history: ['hyperlipidemia', 'hyperuricemia', 'hypertension'],
    lifestyle: { smoking: 'current', alcohol: 'weekly', exercise: 'low', sleep: 'late' },
    symptoms: ['痰湿内盛', '肢体沉重', '关节疼痛'],
    tcm_pattern: '湿热痹阻',
    constitution: '湿热体质',
    herbal_plan: {
      prescriptionId: 'long_dan_xie_gan',
      adjustments: ['加薏苡仁30g', '去木通'],
      lifestyle: [
        '限制高嘌呤食物，增加饮水至2L/日',
        '戒烟限酒，控制体重'
      ],
      explanations: [
        '清肝利湿，缓解关节不适',
        '兼顾高尿酸与高血脂'
      ]
    },
    contra: ['脾胃虚寒慎用'],
    notes: '湿热偏盛伴高尿酸，需清利湿热并化浊。'
  },
  {
    id: 'kidney_deficiency_01',
    meta: { gender: 'male', age: 62, bmi: 23.6 },
    labs: {
      fasting_glucose: 5.4,
      total_cholesterol: 5.5,
      hdl: 1.3,
      ldl: 3.1,
      triglycerides: 1.6,
      uric_acid: 390,
      alt: 30,
      egfr: 82,
      systolic: 128,
      diastolic: 78
    },
    history: ['hypertension'],
    lifestyle: { smoking: 'former', alcohol: 'rare', exercise: 'moderate', sleep: 'adequate' },
    symptoms: ['肾阴虚', '腰膝酸软', '头晕耳鸣'],
    tcm_pattern: '肾阴亏虚',
    constitution: '肾阴虚体质',
    herbal_plan: {
      prescriptionId: 'liu_wei_di_huang',
      adjustments: ['加枸杞12g'],
      lifestyle: [
        '每周两次太极拳或八段锦',
        '保持足够睡眠，避免熬夜'
      ],
      explanations: [
        '滋阴补肾，改善头晕耳鸣',
        '兼顾高血压早期肾脏保护'
      ]
    },
    contra: ['脾胃虚寒慎用'],
    notes: '肾阴不足兼血压偏高的亚健康状态。'
  },
  {
    id: 'kidney_deficiency_02',
    meta: { gender: 'female', age: 58, bmi: 22.8 },
    labs: {
      fasting_glucose: 5.2,
      total_cholesterol: 5.1,
      hdl: 1.4,
      ldl: 3.0,
      triglycerides: 1.4,
      uric_acid: 360,
      alt: 28,
      egfr: 90,
      systolic: 124,
      diastolic: 76
    },
    history: ['osteopenia'],
    lifestyle: { smoking: 'never', alcohol: 'rare', exercise: 'moderate', sleep: 'adequate' },
    symptoms: ['肾阴虚', '潮热盗汗', '口干咽燥'],
    tcm_pattern: '肾阴不足',
    constitution: '阴虚体质',
    herbal_plan: {
      prescriptionId: 'zhi_bo_di_huang',
      adjustments: ['加女贞子12g', '加旱莲草12g'],
      lifestyle: [
        '补充钙与维生素D，晨练晒太阳',
        '保持情绪平稳，避免过度劳累'
      ],
      explanations: [
        '滋阴降火并补肝肾，缓解潮热',
        '维护骨骼代谢，适合更年期'
      ]
    },
    contra: ['脾虚大便溏薄慎用'],
    notes: '更年期肾阴不足伴骨量下降。'
  },
  {
    id: 'kidney_deficiency_03',
    meta: { gender: 'male', age: 65, bmi: 25.2 },
    labs: {
      fasting_glucose: 5.6,
      total_cholesterol: 5.7,
      hdl: 1.1,
      ldl: 3.4,
      triglycerides: 1.9,
      uric_acid: 420,
      alt: 34,
      egfr: 68,
      systolic: 136,
      diastolic: 82
    },
    history: ['hypertension', 'chronic_kidney_disease_stage2'],
    lifestyle: { smoking: 'former', alcohol: 'occasional', exercise: 'moderate', sleep: 'adequate' },
    symptoms: ['肾阳虚', '畏寒肢冷', '夜尿频多'],
    tcm_pattern: '肾阳不足',
    constitution: '阳虚体质',
    herbal_plan: {
      prescriptionId: 'jin_gui_shen_qi',
      adjustments: ['加巴戟天12g', '加益智仁9g'],
      lifestyle: [
        '保暖护腰，避免久坐',
        '控制盐摄入，监测血压与肾功能'
      ],
      explanations: [
        '温补肾阳，改善夜尿与畏寒',
        '兼顾早期肾功能保护'
      ]
    },
    contra: ['阴虚火旺慎用'],
    notes: '肾阳不足伴早期肾功能下降。'
  },
  {
    id: 'kidney_deficiency_04',
    meta: { gender: 'female', age: 64, bmi: 24.1 },
    labs: {
      fasting_glucose: 5.3,
      total_cholesterol: 5.4,
      hdl: 1.2,
      ldl: 3.1,
      triglycerides: 1.6,
      uric_acid: 380,
      alt: 32,
      egfr: 70,
      systolic: 132,
      diastolic: 80
    },
    history: ['hypertension', 'chronic_kidney_disease_stage2'],
    lifestyle: { smoking: 'never', alcohol: 'rare', exercise: 'light', sleep: 'adequate' },
    symptoms: ['肾阴阳两虚', '疲乏', '小腿浮肿'],
    tcm_pattern: '肾阴阳两虚',
    constitution: '虚弱体质',
    herbal_plan: {
      prescriptionId: 'shen_qi_wan_plus',
      adjustments: ['加黄芪15g', '加车前子12g'],
      lifestyle: [
        '限制钠摄入，监测体重与浮肿情况',
        '每日踝泵运动促进下肢血液循环'
      ],
      explanations: [
        '补肾扶正并利水，缓解浮肿',
        '兼顾心肾功能，适合老年人调理'
      ]
    },
    contra: ['孕期慎用'],
    notes: '肾阴阳两虚兼水湿偏盛的老年人群。'
  },
  {
    id: 'kidney_deficiency_05',
    meta: { gender: 'male', age: 68, bmi: 26.0 },
    labs: {
      fasting_glucose: 5.7,
      total_cholesterol: 5.9,
      hdl: 1.05,
      ldl: 3.5,
      triglycerides: 1.8,
      uric_acid: 440,
      alt: 36,
      egfr: 62,
      systolic: 138,
      diastolic: 82
    },
    history: ['hypertension', 'benign_prostate_hyperplasia'],
    lifestyle: { smoking: 'former', alcohol: 'occasional', exercise: 'light', sleep: 'fragmented' },
    symptoms: ['肾阳虚', '腰膝酸软', '夜尿频', '乏力'],
    tcm_pattern: '肾阳不足',
    constitution: '阳虚体质',
    herbal_plan: {
      prescriptionId: 'you_gui_wan',
      adjustments: ['加锁阳12g', '加菟丝子12g'],
      lifestyle: [
        '睡前减少饮水，避免寒凉刺激',
        '坚持骨盆底肌训练'
      ],
      explanations: [
        '温肾助阳并固摄下元',
        '改善夜尿与腰膝酸软'
      ]
    },
    contra: ['阴虚火旺慎用', '高尿酸发作期暂停'],
    notes: '老年肾阳虚兼前列腺肥大，重点温阳固摄。'
  }
];

module.exports = {
  SAMPLE_LIBRARY
};
