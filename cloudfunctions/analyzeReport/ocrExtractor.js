/**
 * OCR text parser: convert raw report text into structured metrics.
 * Uses unicode escapes to keep file ASCII-safe while matching Chinese labels.
 */

const BLOOD_PRESSURE_REGEX = /(\u6536\u7f29\u538b|\u8840\u538b)[^\d]{0,6}(\d{2,3})[^\d]{0,6}(\d{2,3})/i;

const LAB_PATTERNS = [
  { key: 'fasting_glucose', labels: ['\u7a7a\u8179\u8840\u7cd6', 'FPG', 'GLU'], unit: 'mmol/L' },
  { key: 'hba1c', labels: ['\u7cd6\u5316\u8840\u7ea2\u86cb\u767d', 'HbA1c'], unit: '%' },
  { key: 'total_cholesterol', labels: ['\u603b\u80c6\u56fa\u9187', 'TC'], unit: 'mmol/L' },
  { key: 'hdl', labels: ['\u9ad8\u5bc6\u5ea6\u8102\u86cb\u767d', 'HDL'], unit: 'mmol/L' },
  { key: 'ldl', labels: ['\u4f4e\u5bc6\u5ea6\u8102\u86cb\u767d', 'LDL'], unit: 'mmol/L' },
  { key: 'triglycerides', labels: ['\u7518\u6cb9\u4e09\u916f', 'TG'], unit: 'mmol/L' },
  { key: 'uric_acid', labels: ['\u5c3f\u9178', 'UA'], unit: '\u00b5mol/L' },
  { key: 'alt', labels: ['\u4e19\u6c28\u9178\u6c28\u57fa\u8f6c\u79fb\u9176', 'ALT'], unit: 'U/L' },
  { key: 'ast', labels: ['\u5929\u95f0\u51ac\u6c28\u9178\u6c28\u57fa\u8f6c\u79fb\u9176', 'AST'], unit: 'U/L' },
  { key: 'egfr', labels: ['eGFR', '\u80be\u5c0f\u7403\u6ee4\u8fc7\u7387'], unit: 'ml/min' },
  { key: 'bmi', labels: ['BMI', '\u4f53\u91cd\u6307\u6570'], unit: null },
  { key: 'weight', labels: ['\u4f53\u91cd'], unit: 'kg' },
  { key: 'height', labels: ['\u8eab\u9ad8'], unit: 'cm' }
];

const CHRONIC_RISK_REGEX = /(\u7cd6\u5c3f\u75c5|\u9ad8\u8840\u538b|\u9ad8\u8102\u8840\u75c5)/;

function extractMetricsFromText(text = '') {
  if (!text.trim()) {
    return basicResult();
  }

  const normalized = text.replace(/\r\n/g, '\n');
  const labs = {};
  const demographics = {};
  const notes = [];

  const bpMatch = normalized.match(BLOOD_PRESSURE_REGEX);
  if (bpMatch) {
    labs.systolic = toNumber(bpMatch[2]);
    labs.diastolic = toNumber(bpMatch[3]);
  }

  LAB_PATTERNS.forEach(pattern => {
    const regex = buildPatternRegex(pattern.labels);
    const match = normalized.match(regex);
    if (!match) return;

    const value = toNumber(match[1]);
    if (value === null) return;

    if (pattern.key === 'height') {
      demographics.height = normalizeHeight(value);
    } else if (pattern.key === 'weight') {
      demographics.weight = normalizeWeight(value);
    } else {
      labs[pattern.key] = normalizeUnit(value, pattern.unit);
    }
  });

  if (!labs.bmi && demographics.height && demographics.weight) {
    const h = demographics.height / 100;
    labs.bmi = +(demographics.weight / (h * h)).toFixed(1);
  }

  if (CHRONIC_RISK_REGEX.test(normalized)) {
    notes.push('\u62a5\u544a\u63d0\u53ca\u6162\u6027\u75be\u75c5\u98ce\u9669\uff0c\u4f7f\u7528\u524d\u8bf7\u5173\u8054\u4e13\u4e1a\u533b\u5e08\u786e\u8ba4\u3002');
  }

  return { labs, demographics, notes };
}

function basicResult() {
  return { labs: {}, demographics: {}, notes: [] };
}

function buildPatternRegex(labels) {
  const escaped = labels.map(label => label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  return new RegExp(`(?:${escaped})[^0-9\\-]{0,10}(-?\\d+(?:\\.\\d+)?)`, 'i');
}

function toNumber(value) {
  if (value === undefined || value === null) return null;
  const numeric = Number(String(value).replace(/[^0-9\\.-]/g, ''));
  return Number.isFinite(numeric) ? numeric : null;
}

function normalizeUnit(value, unit) {
  if (unit === '\u00b5mol/L' && value < 100) {
    return value * 10;
  }
  if (unit === 'ml/min' && value <= 1) {
    return Math.round(value * 100);
  }
  return value;
}

function normalizeHeight(value) {
  if (value > 3 && value < 3.5) {
    return Math.round(value * 100);
  }
  if (value <= 3) {
    return Math.round(value * 100);
  }
  if (value > 100 && value < 260) {
    return value;
  }
  return null;
}

function normalizeWeight(value) {
  if (value < 3) {
    return Math.round(value * 100);
  }
  if (value > 300) {
    return Math.round(value / 10);
  }
  return value;
}

module.exports = {
  extractMetricsFromText
};
