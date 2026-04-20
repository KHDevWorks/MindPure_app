/**
 * トップ画面：解析モード選択
 * @param {{ onStart: (mode: number) => void }} props
 */
export default function LandingView({ onStart }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-4 text-[#00e5ff] font-bold tracking-[0.4em] text-xs uppercase">
        Scientific Assessment Tool
      </div>

      <h1 className="text-7xl font-bold mb-8 tracking-tighter">MindPure</h1>

      <p className="text-slate-400 mb-16 max-w-md leading-relaxed text-lg mx-auto">
        心理統計学に基づき、あなたの性格構造を多層的に可視化。
        解析オプションを選択して開始してください。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        {/* Quick module */}
        <button
          onClick={() => onStart(20)}
          className="p-10 glass-panel rounded-[40px] text-left relative group"
        >
          <div className="text-[#00e5ff] text-xs font-bold mb-4 tracking-widest">
            01. QUICK MODULE
          </div>
          <div className="text-3xl font-bold mb-4">クイック解析</div>
          <p className="text-slate-500">
            基本的な20の設問から、主要な特性を素早く抽出。
          </p>
        </button>

        {/* Precision module */}
        <button
          onClick={() => onStart(50)}
          className="p-10 glass-panel rounded-[40px] text-left relative group"
        >
          <div className="text-[#00e5ff] text-xs font-bold mb-4 tracking-widest">
            02. PRECISION MODULE
          </div>
          <div className="text-3xl font-bold mb-4">完全精密解析</div>
          <p className="text-slate-500">
            全50設問を通じて、深層心理に迫る精密な解析。
          </p>
        </button>
      </div>
    </div>
  );
}
