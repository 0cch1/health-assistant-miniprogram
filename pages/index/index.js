const DEFAULT_FORM = {
  demographics: {
    gender: '',
    age: '',
    height: '',
    weight: ''
  },
  history: [],
  lifestyle: {
    smoking: 'never',
    alcohol: 'rare',
    exercise: 'moderate',
    sleep: 'adequate'
  },
  symptoms: [],
  tcmQuiz: {
    qi_deficiency: 2,
    blood_deficiency: 2,
    yang_deficiency: 2,
    yin_deficiency: 2,
    damp_heat: 2,
    phlegm_damp: 2,
    blood_stasis: 2,
    qi_stagnation: 2
  }
};

const SYMPTOM_OPTIONS = [
  { value: '降血压', label: '降血压（控制血压、预防心血管疾病）' },
  { value: '调理肝功能', label: '调理肝功能（护肝养肝、改善肝功能）' },
  { value: '辅助心脏健康', label: '辅助心脏健康（强心护心、改善心血管功能）' },
  { value: '强健骨骼关节', label: '强健骨骼关节（补钙强骨、缓解关节疼痛）' },
  { value: '缓解疲劳、提神', label: '缓解疲劳、提神（增强体力、改善精神状态）' },
  { value: '增强记忆力', label: '增强记忆力（改善认知功能、提升专注力）' },
  { value: '改善前列腺健康', label: '改善前列腺健康（男性健康、泌尿系统调理）' },
  { value: '提高免疫力', label: '提高免疫力（增强抵抗力、预防疾病）' },
  { value: '降血糖', label: '降血糖（控制血糖、预防糖尿病）' },
  { value: '增肌健体', label: '增肌健体（增强肌肉、改善体质）' },
  { value: '改善睡眠', label: '改善睡眠（安神助眠、提高睡眠质量）' },
  { value: '防止骨质疏松', label: '防止骨质疏松（补钙强骨、预防骨折）' },
  { value: '调理月经不调', label: '调理月经不调（女性健康、内分泌调理）' },
  { value: '缓解焦虑', label: '缓解焦虑（舒缓情绪、改善心理状态）' },
  { value: '减肥塑形', label: '减肥塑形（控制体重、改善体型）' },
  { value: '调节内分泌', label: '调节内分泌（平衡激素、改善内分泌失调）' },
  { value: '缓解更年期症状', label: '缓解更年期症状（女性更年期调理）' },
  { value: '改善皮肤状态', label: '改善皮肤状态（美容养颜、改善肌肤）' },
  { value: '美白养颜', label: '美白养颜（美容护肤、改善肤色）' },
  { value: '缓解痛经', label: '缓解痛经（女性经期调理、缓解疼痛）' }
];

// Key-based symptom options for stable matching
const SYMPTOM_OPTIONS_KEYS = [
  { value: 'appeal_lower_bp', label: '降血压（控制血压、预防心血管疾病）' },
  { value: 'appeal_liver', label: '调理肝功能（护肝养肝、改善肝功能）' },
  { value: 'appeal_heart', label: '辅助心脏健康（强心护心、改善心血管功能）' },
  { value: 'appeal_joint_bone', label: '强健骨骼关节（补肾强骨、缓解关节疼痛）' },
  { value: 'appeal_anti_fatigue', label: '缓解疲劳、提神（增强体力、改善精神状态）' },
  { value: 'appeal_memory', label: '增强记忆力（改善认知功能、提升专注力）' },
  { value: 'appeal_prostate', label: '改善前列腺健康（男性健康、泌尿系统调理）' },
  { value: 'appeal_immunity', label: '提高免疫力（增强抵抗力、预防疾病）' },
  { value: 'appeal_lower_glucose', label: '降血糖（控制血糖、预防糖尿病）' },
  { value: 'appeal_muscle', label: '增肌健体（增强肌肉、改善体质）' },
  { value: 'appeal_sleep', label: '改善睡眠（安神助眠、提高睡眠质量）' },
  { value: 'appeal_anti_osteoporosis', label: '防止骨质疏松（补钙强骨、预防骨折）' },
  { value: 'appeal_menses', label: '调理月经不调（女性健康、内分泌调理）' },
  { value: 'appeal_skin', label: '改善皮肤状态（美容养颜、改善肌肤）' },
  { value: 'appeal_weight_loss', label: '减肥塑形（控制体重、改善体型）' }
];

const HISTORY_OPTIONS = [
  { value: 'hypertension', label: '高血压' },
  { value: 'type2_diabetes', label: '2 型糖尿病' },
  { value: 'dyslipidemia', label: '血脂异常' },
  { value: 'fatty_liver', label: '脂肪肝' },
  { value: 'gout', label: '高尿酸 / 痛风' },
  { value: 'chronic_kidney_disease', label: '慢性肾病' },
  { value: 'pregnancy', label: '妊娠期' },
  { value: 'breastfeeding', label: '哺乳期' },
  { value: 'allergy_herbs', label: '对部分中药材过敏' }
];

const LIFESTYLE_GROUPS = [
  {
    key: 'smoking',
    title: '吸烟情况',
    options: [
      { value: 'never', label: '从不吸烟' },
      { value: 'former', label: '已戒烟' },
      { value: 'occasional', label: '偶尔吸烟' },
      { value: 'current', label: '目前吸烟' }
    ]
  },
  {
    key: 'alcohol',
    title: '饮酒情况',
    options: [
      { value: 'none', label: '不饮酒' },
      { value: 'rare', label: '偶尔小酌' },
      { value: 'weekly', label: '每周饮酒' },
      { value: 'daily', label: '几乎每天饮酒' }
    ]
  },
  {
    key: 'exercise',
    title: '运动频率',
    options: [
      { value: 'low', label: '运动不足' },
      { value: 'moderate', label: '每周 2-3 次' },
      { value: 'regular', label: '每周 4 次及以上' }
    ]
  },
  {
    key: 'sleep',
    title: '睡眠状况',
    options: [
      { value: 'adequate', label: '睡眠充足' },
      { value: 'fragmented', label: '睡眠易醒' },
      { value: 'late', label: '常熬夜' },
      { value: 'insomnia', label: '失眠 / 睡眠差' }
    ]
  }
];

const TCM_DIMENSIONS = [
  { key: 'qi_deficiency', label: '气虚', description: '乏力、气短、易感冒' },
  { key: 'blood_deficiency', label: '血虚', description: '面色苍白、头晕心悸' },
  { key: 'yang_deficiency', label: '阳虚', description: '怕冷、四肢发凉' },
  { key: 'yin_deficiency', label: '阴虚', description: '潮热盗汗、口干口燥' },
  { key: 'damp_heat', label: '湿热', description: '口苦口黏、大便黏滞' },
  { key: 'phlegm_damp', label: '痰湿', description: '体重上升、胸闷困倦' },
  { key: 'blood_stasis', label: '血瘀', description: '刺痛、肤色晦暗' },
  { key: 'qi_stagnation', label: '气郁', description: '情绪低落、胸闷叹息' }
];

Page({
  data: {
    uploadFiles: [],
    uploadStatus: '',
    isSubmitting: false,
    analysisResult: null,
    ocrNotes: [],
    similarityText: '',
    form: JSON.parse(JSON.stringify(DEFAULT_FORM)),
    symptomOptions: SYMPTOM_OPTIONS_KEYS,
    historyOptions: HISTORY_OPTIONS,
    lifestyleGroups: LIFESTYLE_GROUPS,
    tcmDimensions: TCM_DIMENSIONS
  },

  onLoad() {
    // 初始化勾选状态
    this.updateCheckedStates();
  },

  handleUpload() {
    wx.chooseMedia({
      count: 6,
      mediaType: ['image'],
      success: (res) => {
        const files = (res.tempFiles || []).filter(Boolean);
        if (!files.length) {
          wx.showToast({ title: '未选择图片', icon: 'none' });
          return;
        }

        const existing = Array.isArray(this.data.uploadFiles) ? this.data.uploadFiles : [];
        const appended = files.map(item => ({
          tempFilePath: item.tempFilePath,
          size: item.size,
          uploadTime: Date.now()
        }));
        const merged = existing.concat(appended).slice(0, 6);

        this.setData({
          uploadFiles: merged,
          uploadStatus: `已选择 ${merged.length} 张图片`,
          analysisResult: null,
          similarityText: '',
          ocrNotes: []
        });
      },
      fail: () => {
        wx.showToast({ title: '选择图片失败', icon: 'none' });
      }
    });
  },

  removeUploaded(event) {
    const { index } = event.currentTarget.dataset;
    const files = Array.isArray(this.data.uploadFiles) ? this.data.uploadFiles.slice() : [];
    files.splice(index, 1);
    this.setData({
      uploadFiles: files,
      uploadStatus: files.length ? `已选择 ${files.length} 张图片` : ''
    });
  },

  onInputChange(event) {
    const { path } = event.currentTarget.dataset;
    if (!path) return;
    this.setData({ [path]: event.detail.value });
  },

  onRadioChange(event) {
    const { section, key } = event.currentTarget.dataset;
    if (!section || !key) return;
    this.setData({ [`form.${section}.${key}`]: event.detail.value });
  },

  onTcmSliderChange(event) {
    const { key } = event.currentTarget.dataset;
    const value = Number(event.detail.value || 0);
    this.setData({ [`form.tcmQuiz.${key}`]: value });
  },

  toggleOption(event) {
    const { section, value } = event.currentTarget.dataset;
    if (!section || !value) return;
    const current = Array.isArray(this.data.form[section]) ? this.data.form[section] : [];
    const index = current.indexOf(value);
    const updated = index >= 0
      ? current.filter(item => item !== value)
      : current.concat(value);
    this.setData({ [`form.${section}`]: updated });
    
    // 更新勾选状态显示
    this.updateCheckedStates();
  },

  updateCheckedStates() {
    // 更新病史勾选状态
    const historyChecked = {};
    if (this.data.historyOptions && this.data.form.history) {
      this.data.historyOptions.forEach(option => {
        historyChecked[option.value] = this.data.form.history.indexOf(option.value) !== -1;
      });
    }
    
    // 更新症状勾选状态
    const symptomsChecked = {};
    if (this.data.symptomOptions && this.data.form.symptoms) {
      this.data.symptomOptions.forEach(option => {
        symptomsChecked[option.value] = this.data.form.symptoms.indexOf(option.value) !== -1;
      });
    }
    
    this.setData({
      'form.historyChecked': historyChecked,
      'form.symptomsChecked': symptomsChecked
    });
  },

  async submitAnalysis() {
    if (this.data.isSubmitting) return;
    if (!this.validateForm()) return;

    this.setData({
      isSubmitting: true,
      uploadStatus: '正在上传并分析，请稍候...',
      analysisResult: null,
      similarityText: '',
      ocrNotes: []
    });

    try {
      const fileIDs = await this.uploadAllFiles();
      const payload = this.buildPayload();
      const res = await wx.cloud.callFunction({
        name: 'analyzeReport',
        data: {
          fileIDs,
          formData: payload
        }
      });

      if (!res || !res.result || !res.result.success) {
        throw new Error((res && res.result && res.result.error) || '分析失败');
      }

      const rawData = res.result.data || {};
      const normalized = normalizeAnalysisResult(rawData);

      this.setData({
        analysisResult: normalized,
        similarityText: formatSimilarity(rawData.similarity),
        ocrNotes: rawData.ocrNotes || [],
        uploadStatus: '分析完成'
      });
      wx.showToast({ title: '分析完成', icon: 'success' });
    } catch (error) {
      console.error('分析失败', error);
      wx.showToast({ title: error.message || '分析失败', icon: 'none' });
      this.setData({ uploadStatus: '分析失败，请稍后重试' });
    } finally {
      this.setData({ isSubmitting: false });
    }
  },

  async uploadAllFiles() {
    const files = Array.isArray(this.data.uploadFiles) ? this.data.uploadFiles : [];
    if (!files.length) return [];

    const uploaded = [];
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      if (file.fileID) {
        uploaded.push(file.fileID);
        continue;
      }

      const cloudPath = `reports/${Date.now()}_${i}.jpg`;
      const res = await wx.cloud.uploadFile({
        cloudPath,
        filePath: file.tempFilePath
      });
      uploaded.push(res.fileID);
      this.setData({ [`uploadFiles[${i}].fileID`]: res.fileID });
    }
    return uploaded;
  },

  buildPayload() {
    const form = this.data.form || {};
    return {
      demographics: {
        gender: form.demographics.gender,
        age: toNumber(form.demographics.age),
        height: toNumber(form.demographics.height),
        weight: toNumber(form.demographics.weight)
      },
      history: form.history || [],
      lifestyle: form.lifestyle || {},
      symptoms: form.symptoms || [],
      tcmQuiz: form.tcmQuiz || {}
    };
  },

  validateForm() {
    const { demographics, symptoms } = this.data.form;
    if (!demographics.age) {
      wx.showToast({ title: '请填写年龄', icon: 'none' });
      return false;
    }
    if (!symptoms || !symptoms.length) {
      wx.showToast({ title: '请选择至少一个主要症状', icon: 'none' });
      return false;
    }
    return true;
  },

  resetForm() {
    this.setData({
      form: JSON.parse(JSON.stringify(DEFAULT_FORM)),
      uploadFiles: [],
      uploadStatus: '',
      analysisResult: null,
      similarityText: '',
      ocrNotes: []
    });
    // 重新初始化勾选状态
    this.updateCheckedStates();
  },

  goToPurchase() {
    // 获取当前分析结果中的推荐中药信息
    const analysisResult = this.data.analysisResult;
    if (!analysisResult || !analysisResult.topCustomHerbs) {
      wx.showToast({ title: '暂无推荐中药', icon: 'none' });
      return;
    }

    // 构建购买页面所需的参数
    const purchaseData = {
      prescription: analysisResult.topSampleTitle || '推荐中药配方',
      herbs: analysisResult.topCustomHerbs || [],
      constitution: analysisResult.constitution || '',
      pattern: analysisResult.tcmPattern || '',
      safety: analysisResult.safety || {}
    };

    // 将数据存储到本地，供购买页面使用
    try {
      wx.setStorageSync('purchaseData', purchaseData);
      
      // 跳转到购买页面（这里假设购买页面路径为 pages/purchase/purchase）
      wx.navigateTo({
        url: '/pages/purchase/purchase',
        success: () => {
          console.log('跳转到购买页面成功');
        },
        fail: (error) => {
          console.error('跳转失败:', error);
          // 如果购买页面不存在，显示提示信息
          wx.showModal({
            title: '功能开发中',
            content: '购买功能正在开发中，请稍后再试。您可以将推荐的中药配方截图保存，到药店购买。',
            showCancel: false,
            confirmText: '我知道了'
          });
        }
      });
    } catch (error) {
      console.error('存储购买数据失败:', error);
      wx.showToast({ title: '操作失败，请重试', icon: 'none' });
    }
  }
});

function toNumber(value) {
  const trimmed = String(value || '').trim();
  if (trimmed === '') return undefined;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function mapObjectValues(obj, mapper) {
  const result = {};
  Object.keys(obj || {}).forEach(key => {
    const mapped = mapper(obj[key], key);
    if (mapped !== undefined && mapped !== null && mapped !== '') {
      result[key] = mapped;
    }
  });
  return result;
}

function formatSimilarity(value) {
  if (value === undefined || value === null) return '';
  const pct = Math.round(value * 100);
  if (pct >= 80) return `匹配度 ${pct}%（高度符合样本）`;
  if (pct >= 60) return `匹配度 ${pct}%（较高相似度）`;
  if (pct >= 40) return `匹配度 ${pct}%（参考使用）`;
  return `匹配度 ${pct}%（建议面诊确认）`;
}

function normalizeAnalysisResult(raw) {
  const source = raw && typeof raw === 'object' ? raw : {};
  const severity = typeof source.severity === 'string' ? source.severity : '';
  const summary = typeof source.summary === 'string' ? source.summary : '';
  const severityClass = getSeverityClass(severity);

  const matches = (Array.isArray(source.matches) ? source.matches : [])
    .filter(item => item && typeof item === 'object')
    .map((match, index) => {
      const similarity = typeof match.similarity === 'number' ? match.similarity : 0;
      const sample = match.sample && typeof match.sample === 'object' ? match.sample : {};
      return Object.assign({}, match, {
        id: sample.id || `sample_${index}`,
        sample,
        displaySimilarity: `${Math.round(similarity * 100)}%`
      });
    });

  // derive nearest-neighbor sample herbs for direct display
  const topMatch = matches[0] || null;
  const topSample = topMatch && topMatch.sample ? topMatch.sample : null;
  const topCustomHerbs = (topSample && topSample.herbal_plan && Array.isArray(topSample.herbal_plan.customHerbs))
    ? topSample.herbal_plan.customHerbs
    : [];
  const topSampleTitle = (() => {
    if (!topSample) return '';
    const sym = Array.isArray(topSample.symptoms) && topSample.symptoms[0] ? topSample.symptoms[0] : '';
    const dict = {
      appeal_lower_bp: '降血压',
      appeal_liver: '调理肝功能',
      appeal_heart: '辅助心脏健康',
      appeal_joint_bone: '强健骨骼关节',
      appeal_anti_fatigue: '缓解疲劳、提神',
      appeal_memory: '增强记忆力',
      appeal_prostate: '改善前列腺健康',
      appeal_immunity: '提高免疫力',
      appeal_lower_glucose: '降血糖',
      appeal_muscle: '增肌健体',
      appeal_sleep: '改善睡眠',
      appeal_anti_osteoporosis: '防止骨质疏松',
      appeal_menses: '调理月经不调',
      appeal_skin: '改善皮肤状态',
      appeal_weight_loss: '减肥塑形',
      appeal_general: '综合调理'
    };
    const label = dict[sym] || sym;
    return label ? `样本药方 - ${label}` : `样本药方 - ${topSample.id || ''}`;
  })();

  const herbalPlanSource = source.herbalPlan && typeof source.herbalPlan === 'object'
    ? source.herbalPlan
    : null;
  const herbalPlan = herbalPlanSource
    ? {
        id: herbalPlanSource.id,
        name: herbalPlanSource.name,
        category: herbalPlanSource.category,
        herbs: Array.isArray(herbalPlanSource.herbs) ? herbalPlanSource.herbs : [],
        dosage: herbalPlanSource.dosage,
        duration: herbalPlanSource.duration,
        adjustments: Array.isArray(herbalPlanSource.adjustments) ? herbalPlanSource.adjustments : [],
        precautions: Array.isArray(herbalPlanSource.precautions) ? herbalPlanSource.precautions : [],
        contraindications: Array.isArray(herbalPlanSource.contraindications) ? herbalPlanSource.contraindications : []
      }
    : null;

  const safetySource = source.safety && typeof source.safety === 'object' ? source.safety : null;
  const safety = safetySource
    ? {
        riskLevel: safetySource.riskLevel,
        riskLevelClass: safetySource.riskLevelClass,
        alerts: Array.isArray(safetySource.alerts) ? safetySource.alerts : [],
        disclaimers: Array.isArray(safetySource.disclaimers) ? safetySource.disclaimers : [],
        isSafe: Boolean(safetySource.isSafe)
      }
    : null;

  const lifestyleAdvice = Array.isArray(source.lifestyleAdvice)
    ? source.lifestyleAdvice.filter(Boolean)
    : [];

  const base = Object.assign({}, source, {
    summary,
    severity
  });
  delete base.matches;
  delete base.herbalPlan;
  delete base.safety;
  delete base.lifestyleAdvice;

  return Object.assign(base, {
    severityClass,
    matches,
    herbalPlan,
    topMatch,
    topCustomHerbs,
    topSampleTitle,
    lifestyleAdvice,
    safety
  });
}

function getSeverityClass(label) {
  switch (label) {
    case '严重':
      return 'danger';
    case '中等':
    case '需关注':
      return 'warning';
    case '轻度':
      return 'mild';
    case '正常':
    case '安全':
      return 'good';
    default:
      return 'neutral';
  }
}
