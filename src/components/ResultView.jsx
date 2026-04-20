import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from 'recharts';

/**
 * 解析結果画面
 * @param {{
 *   resultData: Array,
 *   mode: number,
 *   onBack: () => void,
 * }} props
 */
export default function ResultView({ resultData, mode, onBack }) {
  return (
    <div className="flex-1 p-6 max-w-6xl mx-auto py-16">
      {/* Header */}
      <div className="flex justify-between items-end mb-16">
        <div>
          <h1 className="text-5xl font-bold mb-4">解析結果リポート</h1>
          <p className="text-slate-400 text-lg uppercase tracking-wider">
            {mode}問の設問に基づく多角的特性解析
          </p>
        </div>
        <button
          onClick={onBack}
          className="py-4 px-10 glass-panel rounded-2xl hover:bg-slate-700 transition"
        >
          トップに戻る
        </button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Radar chart */}
        <div className="h-[550px] glass-panel rounded-[40px] p-12">
          <ResponsiveContainer>
            <RadarChart data={resultData}>
              <PolarGrid stroke="#475569" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#94a3b8', fontSize: 16 }}
              />
              <Radar
                dataKey="value"
                stroke="#00e5ff"
                fill="#00e5ff"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Bar list */}
        <div className="space-y-6">
          {resultData.map((d) => (
            <div key={d.subject} className="glass-panel p-8 rounded-3xl">
              <div className="flex justify-between items-center mb-6">
                <div className="font-bold text-2xl">{d.subject}</div>
                <div className="text-3xl font-bold text-[#00e5ff]">
                  {d.value}%
                </div>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-[#00e5ff] rounded-full progress-fill"
                  style={{ width: `${d.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
