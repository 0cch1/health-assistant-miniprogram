/**
 * 中药及方剂资料库
 * 提供方剂组成、用法、禁忌等信息，供智能分析与安全校验使用
 */

const PRESCRIPTIONS = {
  tianma_gouteng: {
    id: 'tianma_gouteng',
    name: '天麻钩藤汤',
    category: '平肝息风',
    herbs: [
      { name: '天麻', amount: 10, unit: 'g' },
      { name: '钩藤', amount: 12, unit: 'g' },
      { name: '石决明', amount: 20, unit: 'g' },
      { name: '黄芩', amount: 9, unit: 'g' },
      { name: '栀子', amount: 9, unit: 'g' },
      { name: '桑寄生', amount: 12, unit: 'g' },
      { name: '牛膝', amount: 9, unit: 'g' },
      { name: '杜仲', amount: 9, unit: 'g' },
      { name: '益母草', amount: 12, unit: 'g' }
    ],
    dosage: '每日1剂，水煎400ml分早晚温服',
    duration: '14天为一疗程，根据血压调整',
    precautions: [
      '低血压或服用降压药需监测血压防止偏低',
      '伴有明显胃寒者需酌情加减'
    ],
    contraindications: [
      '孕期慎用',
      '收缩压<100mmHg者暂缓'
    ]
  },
  yu_quan: {
    id: 'yu_quan',
    name: '玉泉丸加减',
    category: '清热生津',
    herbs: [
      { name: '天花粉', amount: 15, unit: 'g' },
      { name: '生地黄', amount: 15, unit: 'g' },
      { name: '麦冬', amount: 12, unit: 'g' },
      { name: '知母', amount: 9, unit: 'g' },
      { name: '黄芪', amount: 18, unit: 'g' },
      { name: '五味子', amount: 6, unit: 'g' }
    ],
    dosage: '每日1剂，水煎300ml分早晚温服',
    duration: '21天为一疗程',
    precautions: [
      '脾虚便溏者慎用，可配陈皮3g以和胃',
      '血糖控制不佳者需配合西药治疗'
    ],
    contraindications: [
      '孕妇及哺乳期妇女使用前咨询医师'
    ]
  },
  fangfeng_tongsheng: {
    id: 'fangfeng_tongsheng',
    name: '防风通圣散加减',
    category: '清热解表、泻火通便',
    herbs: [
      { name: '防风', amount: 10, unit: 'g' },
      { name: '荆芥', amount: 10, unit: 'g' },
      { name: '薄荷', amount: 6, unit: 'g' },
      { name: '石膏', amount: 20, unit: 'g' },
      { name: '黄芩', amount: 9, unit: 'g' },
      { name: '栀子', amount: 9, unit: 'g' },
      { name: '麻黄', amount: 6, unit: 'g' },
      { name: '滑石', amount: 15, unit: 'g' },
      { name: '甘草', amount: 6, unit: 'g' }
    ],
    dosage: '每日1剂，水煎300ml分二次服用',
    duration: '7-14天，根据症状调整',
    precautions: [
      '体虚多汗者慎用',
      '高血压患者使用时注意监测'
    ],
    contraindications: [
      '孕妇禁用',
      '体质虚寒或脾胃虚弱者不宜'
    ]
  },
  zhi_bo_di_huang: {
    id: 'zhi_bo_di_huang',
    name: '知柏地黄丸加减',
    category: '滋阴降火',
    herbs: [
      { name: '熟地黄', amount: 15, unit: 'g' },
      { name: '山茱萸', amount: 12, unit: 'g' },
      { name: '山药', amount: 12, unit: 'g' },
      { name: '泽泻', amount: 9, unit: 'g' },
      { name: '牡丹皮', amount: 9, unit: 'g' },
      { name: '茯苓', amount: 9, unit: 'g' },
      { name: '知母', amount: 9, unit: 'g' },
      { name: '黄柏', amount: 9, unit: 'g' }
    ],
    dosage: '每日1剂，水煎350ml分早晚服用',
    duration: '21-30天',
    precautions: [
      '脾胃虚寒、大便溏薄者需酌情加减',
      '用药期间注意清淡饮食'
    ],
    contraindications: [
      '孕妇慎用',
      '胃寒食少者不宜长期服用'
    ]
  },
  huangqi_guizhi_wuwu: {
    id: 'huangqi_guizhi_wuwu',
    name: '黄芪桂枝五物汤',
    category: '益气温经',
    herbs: [
      { name: '黄芪', amount: 18, unit: 'g' },
      { name: '桂枝', amount: 9, unit: 'g' },
      { name: '白芍', amount: 12, unit: 'g' },
      { name: '生姜', amount: 6, unit: 'g' },
      { name: '大枣', amount: 4, unit: '枚' }
    ],
    dosage: '每日1剂，水煎300ml分二次服用',
    duration: '14-21天',
    precautions: [
      '感冒发热期间暂停使用',
      '糖尿病患者需配合血糖监测'
    ],
    contraindications: [
      '阴虚火旺者慎用'
    ]
  },
  jia_wei_xiao_yao: {
    id: 'jia_wei_xiao_yao',
    name: '加味逍遥散',
    category: '疏肝解郁',
    herbs: [
      { name: '柴胡', amount: 10, unit: 'g' },
      { name: '当归', amount: 10, unit: 'g' },
      { name: '白芍', amount: 12, unit: 'g' },
      { name: '白术', amount: 12, unit: 'g' },
      { name: '茯苓', amount: 12, unit: 'g' },
      { name: '薄荷', amount: 6, unit: 'g' },
      { name: '炙甘草', amount: 6, unit: 'g' },
      { name: '牡丹皮', amount: 9, unit: 'g' },
      { name: '栀子', amount: 9, unit: 'g' }
    ],
    dosage: '每日1剂，水煎320ml分两次服用',
    duration: '21天',
    precautions: [
      '长期服用需监测肝功能',
      '阴虚火旺者需谨慎'
    ],
    contraindications: [
      '孕妇慎用'
    ]
  },
  er_chen: {
    id: 'er_chen',
    name: '二陈汤',
    category: '燥湿化痰',
    herbs: [
      { name: '半夏', amount: 9, unit: 'g' },
      { name: '陈皮', amount: 9, unit: 'g' },
      { name: '茯苓', amount: 12, unit: 'g' },
      { name: '甘草', amount: 6, unit: 'g' },
      { name: '生姜', amount: 6, unit: 'g' },
      { name: '乌梅', amount: 3, unit: 'g' }
    ],
    dosage: '每日1剂，水煎300ml分早晚服用',
    duration: '14天',
    precautions: [
      '阴虚燥咳者慎用',
      '孕妇使用需咨询医师'
    ],
    contraindications: [
      '燥热痰少者不宜'
    ]
  },
  shen_ling_bai_zhu: {
    id: 'shen_ling_bai_zhu',
    name: '参苓白术散',
    category: '健脾益气',
    herbs: [
      { name: '党参', amount: 12, unit: 'g' },
      { name: '白术', amount: 12, unit: 'g' },
      { name: '茯苓', amount: 12, unit: 'g' },
      { name: '扁豆', amount: 12, unit: 'g' },
      { name: '莲子', amount: 10, unit: 'g' },
      { name: '山药', amount: 12, unit: 'g' },
      { name: '薏苡仁', amount: 15, unit: 'g' },
      { name: '陈皮', amount: 6, unit: 'g' },
      { name: '砂仁', amount: 6, unit: 'g' },
      { name: '甘草', amount: 6, unit: 'g' }
    ],
    dosage: '每日1剂，水煎320ml分两次服用',
    duration: '21天',
    precautions: [
      '糖尿病患者监测血糖',
      '湿热偏重者需加减'
    ],
    contraindications: [
      '阴虚火旺者慎用'
    ]
  },
  xue_fu_zhu_yu: {
    id: 'xue_fu_zhu_yu',
    name: '血府逐瘀汤',
    category: '活血化瘀',
    herbs: [
      { name: '当归', amount: 10, unit: 'g' },
      { name: '川芎', amount: 6, unit: 'g' },
      { name: '赤芍', amount: 9, unit: 'g' },
      { name: '桃仁', amount: 9, unit: 'g' },
      { name: '红花', amount: 6, unit: 'g' },
      { name: '牛膝', amount: 9, unit: 'g' },
      { name: '生地黄', amount: 12, unit: 'g' },
      { name: '柴胡', amount: 6, unit: 'g' },
      { name: '枳壳', amount: 9, unit: 'g' },
      { name: '桔梗', amount: 6, unit: 'g' },
      { name: '甘草', amount: 6, unit: 'g' }
    ],
    dosage: '每日1剂，水煎350ml分早晚服用',
    duration: '21-30天',
    precautions: [
      '月经期调整剂量或暂停',
      '手术前后暂停使用'
    ],
    contraindications: [
      '孕妇禁用',
      '出血倾向者慎用'
    ]
  },
  chai_hu_shu_gan: {
    id: 'chai_hu_shu_gan',
    name: '柴胡疏肝散',
    category: '疏肝理气',
    herbs: [
      { name: '柴胡', amount: 10, unit: 'g' },
      { name: '陈皮', amount: 9, unit: 'g' },
      { name: '香附', amount: 9, unit: 'g' },
      { name: '川芎', amount: 6, unit: 'g' },
      { name: '白芍', amount: 12, unit: 'g' },
      { name: '枳壳', amount: 9, unit: 'g' },
      { name: '甘草', amount: 6, unit: 'g' }
    ],
    dosage: '每日1剂，水煎300ml分两次服用',
    duration: '21天',
    precautions: [
      '阴虚火旺者慎用',
      '胃酸过多者注意'
    ],
    contraindications: [
      '孕妇慎用'
    ]
  },
  long_dan_xie_gan: {
    id: 'long_dan_xie_gan',
    name: '龙胆泻肝汤',
    category: '清肝泻火',
    herbs: [
      { name: '龙胆草', amount: 6, unit: 'g' },
      { name: '黄芩', amount: 9, unit: 'g' },
      { name: '栀子', amount: 9, unit: 'g' },
      { name: '柴胡', amount: 6, unit: 'g' },
      { name: '木通', amount: 6, unit: 'g' },
      { name: '泽泻', amount: 12, unit: 'g' },
      { name: '车前子', amount: 12, unit: 'g' },
      { name: '当归', amount: 9, unit: 'g' },
      { name: '生地黄', amount: 12, unit: 'g' },
      { name: '甘草', amount: 6, unit: 'g' }
    ],
    dosage: '每日1剂，水煎350ml分两次服用',
    duration: '10-14天',
    precautions: [
      '长期服用需随访肝肾功能',
      '脾胃虚寒者慎用'
    ],
    contraindications: [
      '孕妇禁用',
      '体质虚寒者不宜'
    ]
  },
  liu_wei_di_huang: {
    id: 'liu_wei_di_huang',
    name: '六味地黄丸',
    category: '滋阴补肾',
    herbs: [
      { name: '熟地黄', amount: 15, unit: 'g' },
      { name: '山茱萸', amount: 12, unit: 'g' },
      { name: '山药', amount: 12, unit: 'g' },
      { name: '泽泻', amount: 9, unit: 'g' },
      { name: '牡丹皮', amount: 9, unit: 'g' },
      { name: '茯苓', amount: 9, unit: 'g' }
    ],
    dosage: '每日1剂，水煎320ml分两次服用或制丸分服',
    duration: '30天',
    precautions: [
      '脾虚湿盛者慎用',
      '服药期间忌辛辣燥热之品'
    ],
    contraindications: [
      '腹泻便溏者暂停'
    ]
  },
  jin_gui_shen_qi: {
    id: 'jin_gui_shen_qi',
    name: '金匮肾气丸',
    category: '温补肾阳',
    herbs: [
      { name: '熟地黄', amount: 15, unit: 'g' },
      { name: '山茱萸', amount: 12, unit: 'g' },
      { name: '山药', amount: 12, unit: 'g' },
      { name: '泽泻', amount: 9, unit: 'g' },
      { name: '牡丹皮', amount: 9, unit: 'g' },
      { name: '茯苓', amount: 9, unit: 'g' },
      { name: '桂枝', amount: 6, unit: 'g' },
      { name: '附子', amount: 6, unit: 'g' }
    ],
    dosage: '每日1剂，水煎320ml分两次服用或制丸分服',
    duration: '30天',
    precautions: [
      '高血压患者用药需监测血压',
      '阴虚火旺者慎用'
    ],
    contraindications: [
      '孕妇慎用',
      '实热内盛者禁用'
    ]
  },
  shen_qi_wan_plus: {
    id: 'shen_qi_wan_plus',
    name: '肾气丸加减',
    category: '补肾扶阳利水',
    herbs: [
      { name: '熟地黄', amount: 15, unit: 'g' },
      { name: '山药', amount: 12, unit: 'g' },
      { name: '山茱萸', amount: 12, unit: 'g' },
      { name: '泽泻', amount: 9, unit: 'g' },
      { name: '茯苓', amount: 9, unit: 'g' },
      { name: '牡丹皮', amount: 9, unit: 'g' },
      { name: '桂枝', amount: 6, unit: 'g' },
      { name: '附子', amount: 6, unit: 'g' },
      { name: '黄芪', amount: 15, unit: 'g' },
      { name: '车前子', amount: 12, unit: 'g' }
    ],
    dosage: '每日1剂，水煎340ml分两次服用',
    duration: '30天',
    precautions: [
      '浮肿明显者需配合利尿监测',
      '血压偏高时注意监测'
    ],
    contraindications: [
      '孕妇慎用',
      '阴虚火旺者慎用'
    ]
  },
  you_gui_wan: {
    id: 'you_gui_wan',
    name: '右归丸',
    category: '温补肾阳',
    herbs: [
      { name: '熟地黄', amount: 15, unit: 'g' },
      { name: '山茱萸', amount: 12, unit: 'g' },
      { name: '山药', amount: 12, unit: 'g' },
      { name: '鹿角胶', amount: 6, unit: 'g' },
      { name: '枸杞子', amount: 12, unit: 'g' },
      { name: '菟丝子', amount: 12, unit: 'g' },
      { name: '杜仲', amount: 9, unit: 'g' },
      { name: '当归', amount: 9, unit: 'g' },
      { name: '肉桂', amount: 6, unit: 'g' },
      { name: '附子', amount: 6, unit: 'g' }
    ],
    dosage: '每日1剂，水煎320ml分两次服用或制丸分服',
    duration: '30天',
    precautions: [
      '血压偏高者需监测',
      '阴虚火旺及口干者慎用'
    ],
    contraindications: [
      '孕妇禁用',
      '实热内盛者禁用'
    ]
  }
};

const HERB_INFO = {
  天麻: {
    category: '平肝息风',
    contraindications: ['孕期慎用', '对菊科过敏者慎用'],
    interactions: [],
    notes: '长时间大剂量可引起头晕'
  },
  钩藤: {
    category: '平肝息风',
    contraindications: ['低血压者慎用'],
    interactions: [],
    notes: '煎煮时间不宜过长'
  },
  石决明: {
    category: '平肝息风',
    contraindications: ['脾胃虚寒者慎用'],
    interactions: [],
    notes: '需先煎'
  },
  黄芪: {
    category: '补气',
    contraindications: ['表实邪盛者慎用'],
    interactions: ['免疫抑制剂'],
    notes: '可升高血压，注意监测'
  },
  黄芩: {
    category: '清热燥湿',
    contraindications: ['脾胃虚寒者慎用'],
    interactions: ['抗凝药物'],
    notes: '可能加重肝肾负担'
  },
  决明子: {
    category: '清热明目',
    contraindications: ['低血压者慎用'],
    interactions: [],
    notes: '过量可致腹泻'
  },
  夜交藤: {
    category: '养心安神',
    contraindications: [],
    interactions: [],
    notes: '助眠但可能引起嗜睡'
  },
  菊花: {
    category: '疏风清热',
    contraindications: ['脾胃虚寒者慎用'],
    interactions: [],
    notes: '过敏体质慎用'
  },
  夏枯草: {
    category: '清热泻火',
    contraindications: ['脾胃虚寒者慎用'],
    interactions: [],
    notes: '可能降低血压'
  },
  白芍: {
    category: '养血柔肝',
    contraindications: [],
    interactions: [],
    notes: '与利血平同用需监测血压'
  },
  知母: {
    category: '滋阴降火',
    contraindications: ['脾胃虚寒便溏者慎用'],
    interactions: [],
    notes: ''
  },
  黄柏: {
    category: '清热燥湿',
    contraindications: ['脾胃虚寒者慎用'],
    interactions: [],
    notes: ''
  },
  麦冬: {
    category: '养阴生津',
    contraindications: ['脾胃虚寒者慎用'],
    interactions: [],
    notes: ''
  },
  女贞子: {
    category: '滋补肝肾',
    contraindications: ['脾虚便溏者慎用'],
    interactions: [],
    notes: ''
  },
  枸杞子: {
    category: '滋补肝肾',
    contraindications: ['感冒发热者慎用'],
    interactions: ['抗凝药物'],
    notes: ''
  },
  桂枝: {
    category: '辛温解表',
    contraindications: ['阴虚火旺者慎用'],
    interactions: [],
    notes: '可与降压药交互'
  },
  附子: {
    category: '温阳',
    contraindications: ['孕妇禁用', '阴虚火旺者禁用'],
    interactions: ['强心药'],
    notes: '需久煎，剂量严格控制'
  },
  当归: {
    category: '补血活血',
    contraindications: ['湿盛中满者慎用'],
    interactions: ['抗凝药物'],
    notes: ''
  },
  川芎: {
    category: '活血行气',
    contraindications: ['阴虚火旺者慎用'],
    interactions: ['抗凝药物'],
    notes: ''
  },
  红花: {
    category: '活血化瘀',
    contraindications: ['孕妇禁用'],
    interactions: ['抗凝药物'],
    notes: ''
  },
  桃仁: {
    category: '活血祛瘀',
    contraindications: ['孕妇慎用'],
    interactions: ['抗凝药物'],
    notes: ''
  },
  龙胆草: {
    category: '清热燥湿',
    contraindications: ['脾胃虚寒者慎用'],
    interactions: [],
    notes: '长期使用注意肝功能'
  },
  泽泻: {
    category: '利水渗湿',
    contraindications: ['肾功能不全慎用'],
    interactions: [],
    notes: '注意水电解质平衡'
  },
  车前子: {
    category: '利尿通淋',
    contraindications: ['肾功能严重不全慎用'],
    interactions: [],
    notes: '需包煎'
  },
  鹿角胶: {
    category: '补肾阳',
    contraindications: ['实热者忌用'],
    interactions: [],
    notes: ''
  },
  菟丝子: {
    category: '补肾益精',
    contraindications: ['实热积滞者慎用'],
    interactions: [],
    notes: ''
  },
  肉桂: {
    category: '补火助阳',
    contraindications: ['阴虚火旺者禁用'],
    interactions: ['抗凝药物'],
    notes: '可能提升血压'
  }
};

module.exports = {
  PRESCRIPTIONS,
  HERB_INFO
};
