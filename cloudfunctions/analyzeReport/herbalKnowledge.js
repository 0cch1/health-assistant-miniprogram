/**
 * Herbal knowledge generated at runtime from SAMPLE_LIBRARY (yaofang-based)
 * This replaces static prescriptions to use the real case formulas.
 */

const { SAMPLE_LIBRARY } = require('./sampleLibrary');

function appealNameFromSample(sample) {
  const s = Array.isArray(sample.symptoms) && sample.symptoms[0] ? String(sample.symptoms[0]) : '';
  return s || sample.id || 'Case Formula';
}

function buildFromSamples() {
  const dict = {};
  (SAMPLE_LIBRARY || []).forEach((s, idx) => {
    const herbs = (s.herbal_plan && Array.isArray(s.herbal_plan.customHerbs))
      ? s.herbal_plan.customHerbs.map(h => ({
          name: h.name,
          amount: h.amount,
          unit: h.unit,
          effect: h.effect
        }))
      : [];
    if (!herbs.length) return;

    const id = s.id || `yaofang_${idx + 1}`;
    dict[id] = {
      id,
      name: `Case Formula - ${appealNameFromSample(s)}`,
      category: '案例药方',
      herbs,
      dosage: '每日1剂，水煎300-400ml分早晚服',
      duration: '14天为一疗程，根据效果调整',
      precautions: [
        '参考使用，请在执业中医师指导下辨证加减'
      ],
      contraindications: [
        '孕期/哺乳期慎用，使用前遵医嘱'
      ]
    };
  });
  return dict;
}

const PRESCRIPTIONS = buildFromSamples();

// Keep herb info map optional for safety checks; empty by default
const HERB_INFO = {};

module.exports = { PRESCRIPTIONS, HERB_INFO };

