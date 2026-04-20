import { ANSWER_OPTIONS } from '../data/questions';

/**
 * 設問画面
 * @param {{
 *   questions: Array,
 *   currentIdx: number,
 *   mode: number,
 *   onAnswer: (value: number) => void,
 * }} props
 */
export default function QuizView({ questions, currentIdx, mode, onAnswer }) {
  const question = questions[currentIdx];
  const progress  = ((currentIdx + 1) / questions.length) * 100;

  return (
    <div className="flex-1 p-6 max-w-3xl mx-auto flex flex-col justify-center">
      {/* Progress */}
      <div className="mb-16">
        <div className="flex justify-between items-end mb-4">
          <span className="text-sm text-blue-400 font-bold uppercase tracking-widest">
            Module: {mode} Items
          </span>
          <span className="text-sm text-slate-500 font-medium">
            {currentIdx + 1} / {questions.length}
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question text */}
      <h2 className="text-4xl mb-20 font-medium leading-snug">
        {question.text}
      </h2>

      {/* Answer buttons */}
      <div className="space-y-4">
        {ANSWER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onAnswer(opt.value)}
            className="w-full p-8 glass-panel btn-option rounded-2xl text-left text-xl"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
