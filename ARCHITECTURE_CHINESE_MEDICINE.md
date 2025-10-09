# 中药配方推荐系统架构

## 🎯 系统概述

基于体检报告的智能中药配方推荐系统，通过OCR识别体检指标，结合中医理论，为用户推荐个性化的中药配方。

## 🏗️ 系统架构

```
用户上传体检报告 → OCR识别 → 症状分析 → 体质判断 → 配方匹配 → 推荐结果
```

### 核心流程
1. **体检报告上传** - 用户上传体检报告图片
2. **OCR文字识别** - 提取体检指标数据
3. **症状映射分析** - 将西医指标转换为中医症状
4. **体质类型判断** - 基于症状和指标判断体质
5. **配方智能匹配** - 根据症状+体质匹配中药配方
6. **个性化推荐** - 生成剂量、煎服方法等建议

## 📊 数据架构

### 体检指标 → 中医症状映射
```javascript
const symptomMapping = {
  "血压偏高": {
    symptoms: ["肝阳上亢", "肝火旺盛"],
    constitution: ["阴虚阳亢", "肝郁化火"],
    severity: "moderate"
  },
  "血糖偏高": {
    symptoms: ["阴虚燥热", "气阴两虚"],
    constitution: ["阴虚体质", "痰湿体质"],
    severity: "moderate"
  }
};
```

### 中药配方数据库
```javascript
const prescriptionDatabase = {
  prescriptions: [
    {
      id: "qi_blood_tonic",
      name: "气血双补汤",
      symptoms: ["气血不足", "乏力", "面色苍白"],
      constitution: ["气虚体质", "血虚体质"],
      herbs: [
        { name: "黄芪", ratio: 3, effects: ["补气", "升阳"] },
        { name: "当归", ratio: 2, effects: ["补血", "调经"] },
        { name: "党参", ratio: 2, effects: ["补气", "健脾"] }
      ],
      dosage: "每日1剂，分2次服用",
      method: "水煎服用",
      contraindications: ["湿热体质", "孕妇"]
    }
  ]
};
```

## 🔧 技术模块

### 1. 症状分析模块 (`symptomAnalyzer.js`)
- 体检指标 → 中医症状转换
- 症状严重程度评估
- 体质类型判断

### 2. 配方匹配模块 (`prescriptionMatcher.js`)
- 基于症状和体质的智能匹配
- 配伍禁忌检查
- 个性化剂量调整

### 3. 中药数据库 (`herbalDatabase.js`)
- 中药信息管理
- 配伍规则存储
- 禁忌关系维护

### 4. 推荐引擎 (`recommendationEngine.js`)
- 综合推荐算法
- 安全性检查
- 个性化调整

## 🛡️ 安全机制

### 1. 医疗安全
- 配伍禁忌自动检查
- 剂量安全范围限制
- 过敏原提醒机制

### 2. 法律合规
- 医疗免责声明
- 执业医师建议提示
- 风险提示机制

### 3. 数据安全
- 用户隐私保护
- 敏感信息加密
- 访问权限控制

## 📱 用户界面

### 推荐结果展示
```javascript
{
  // 体检指标分析
  keyMetrics: [...],
  
  // 中医症状分析
  symptoms: ["肝阳上亢", "阴虚燥热"],
  constitution: "阴虚阳亢体质",
  
  // 推荐配方
  prescription: {
    name: "天麻钩藤饮加减",
    herbs: ["天麻", "钩藤", "石决明", "黄芩"],
    ratios: [3, 3, 4, 2],
    dosage: "每日1剂，分2次服用",
    method: "水煎服用，饭前温服",
    duration: "连续服用7-14天"
  },
  
  // 注意事项
  precautions: [
    "孕妇慎用",
    "脾胃虚寒者减量",
    "服药期间忌食辛辣"
  ],
  
  // 购买建议
  purchaseInfo: {
    estimatedCost: "约50-80元/周",
    pharmacyRecommendations: ["同仁堂", "华润三九"]
  }
}
```

## 🎯 核心算法

### 1. 症状映射算法
```javascript
function mapSymptomsToTCM(keyMetrics) {
  // 基于体检指标推断中医症状
  // 考虑指标数值范围和组合
  // 返回症状列表和严重程度
}
```

### 2. 体质判断算法
```javascript
function determineConstitution(symptoms, metrics) {
  // 综合分析症状和指标
  // 判断主要体质类型
  // 考虑复合体质情况
}
```

### 3. 配方匹配算法
```javascript
function matchPrescription(symptoms, constitution) {
  // 多维度匹配算法
  // 症状匹配度 + 体质适配度
  // 配伍禁忌检查
  // 返回最佳配方组合
}
```

## 📈 扩展性设计

### 1. 数据扩展
- 支持添加新的中药信息
- 支持新的症状类型
- 支持新的配伍规则

### 2. 算法扩展
- 机器学习模型集成
- 用户反馈优化
- 个性化学习

### 3. 功能扩展
- 复诊建议
- 效果跟踪
- 药材购买
- 中医师咨询

## 🔄 部署架构

### 云函数结构
```
cloudfunctions/
└── chineseMedicineAnalysis/
    ├── index.js                    # 主入口
    ├── symptomAnalyzer.js          # 症状分析
    ├── prescriptionMatcher.js      # 配方匹配
    ├── herbalDatabase.js           # 中药数据库
    ├── recommendationEngine.js     # 推荐引擎
    ├── safetyChecker.js           # 安全检查
    └── ocrExtractor.js            # OCR提取（复用）
```

### 数据库设计
- **症状映射表**：西医指标 → 中医症状
- **中药信息表**：中药基本信息、功效、禁忌
- **配方数据库**：经典方剂和现代配伍
- **用户记录表**：用户分析历史和反馈

## 📊 性能指标

### 准确性指标
- 症状识别准确率 > 85%
- 体质判断准确率 > 80%
- 配方匹配满意度 > 75%

### 性能指标
- 分析响应时间 < 3秒
- 系统可用性 > 99%
- 并发处理能力 > 100/秒

## 🚀 实施计划

### 第一阶段：基础功能（2-3周）
- [ ] 建立症状映射数据库
- [ ] 实现基础配方匹配
- [ ] 完成核心算法开发

### 第二阶段：智能推荐（2-3周）
- [ ] 添加体质判断功能
- [ ] 实现配伍禁忌检查
- [ ] 完善个性化推荐

### 第三阶段：完善功能（2-3周）
- [ ] 添加安全机制
- [ ] 优化用户界面
- [ ] 完成测试验证
