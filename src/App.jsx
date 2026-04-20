import { useState, useMemo } from 'react';
import SplashScreen  from './components/SplashScreen';
import LandingView   from './components/LandingView';
import QuizView      from './components/QuizView';
import ResultView    from './components/ResultView';
import { ALL_QUESTIONS } from './data/questions';
import { calculateResults } from './utils/scoring';

/**
 * アプリ全体の状態管理とルーティング
 * view: 'splash' | 'landing' | 'quiz' | 'result'
 */
export default function App() {
  const [view,       setView]       = useState('splash');
  const [mode,       setMode]       = useState(20);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers,    setAnswers]    = useState({});
  const [resultData, setResultData] = useState(null);

  // 選択されたモード数だけ設問を使う
  const activeQuestions = useMemo(
    () => ALL_QUESTIONS.slice(0, mode),
    [mode],
  );

  const handleStart = (selectedMode) => {
    setMode(selectedMode);
    setCurrentIdx(0);
    setAnswers({});
    setView('quiz');
  };

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [activeQuestions[currentIdx].id]: value };
    setAnswers(newAnswers);

    if (currentIdx < activeQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // 全設問完了 → 集計
      const data = calculateResults(newAnswers, activeQuestions);
      setResultData(data);
      setView('result');
    }
  };

  if (view === 'splash') {
    return <SplashScreen onComplete={() => setView('landing')} />;
  }

  return (
    <div className="app-content min-h-screen flex flex-col">
      {view === 'landing' && (
        <LandingView onStart={handleStart} />
      )}
      {view === 'quiz' && (
        <QuizView
          questions={activeQuestions}
          currentIdx={currentIdx}
          mode={mode}
          onAnswer={handleAnswer}
        />
      )}
      {view === 'result' && (
        <ResultView
          resultData={resultData}
          mode={mode}
          onBack={() => setView('landing')}
        />
      )}
    </div>
  );
}
