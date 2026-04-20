import { NORM_DATA } from '../data/norms';

/**
 * 回答データからBig Fiveスコアを計算し、パーセンタイルを返す
 * @param {Object} answers - { questionId: value }
 * @param {Array}  questions - 使用した設問リスト
 * @returns {Array} - RadarChart用データ配列
 */
export function calculateResults(answers, questions) {
  const scores = { O: 0, C: 0, E: 0, A: 0, N: 0 };
  const counts = { O: 0, C: 0, E: 0, A: 0, N: 0 };

  questions.forEach((q) => {
    let val = answers[q.id];
    if (q.reverse) val = 6 - val;
    scores[q.factor] += val;
    counts[q.factor]++;
  });

  return Object.keys(scores).map((key) => {
    const avg = scores[key] / (counts[key] || 1);
    const z = (avg - NORM_DATA[key].mean) / NORM_DATA[key].sd;
    const percentile = Math.round((0.5 * (1 + Math.tanh(0.85 * z))) * 100);
    return {
      subject: NORM_DATA[key].label,
      value: Math.min(100, Math.max(0, percentile)),
      zScore: z.toFixed(2),
    };
  });
}
