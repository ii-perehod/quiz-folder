
import React, { useState } from 'react';
import { Category, Mode, ViewState, Formula } from './types';
import { DERIVATIVES, ANTIDERIVATIVES } from './data';
import Home from './components/Home';
import ModeSelect from './components/ModeSelect';
import LearnView from './components/LearnView';
import QuizView from './components/QuizView';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>({ type: 'HOME' });
  const [result, setResult] = useState<{ score: number; total: number; missed: Formula[] } | null>(null);
  const [isReviewingMissed, setIsReviewingMissed] = useState(false);
  const [activeFormulaSet, setActiveFormulaSet] = useState<Formula[] | null>(null);

  const navigateToHome = () => {
    setViewState({ type: 'HOME' });
    setResult(null);
    setIsReviewingMissed(false);
    setActiveFormulaSet(null);
  };

  const navigateToModeSelect = (category: Category) => {
    setViewState({ type: 'MODE_SELECT', category });
    setResult(null);
    setIsReviewingMissed(false);
    setActiveFormulaSet(null);
  };

  const handleStart = (category: Category, mode: Mode) => {
    const data = category === Category.Derivatives ? DERIVATIVES : ANTIDERIVATIVES;
    setActiveFormulaSet(data);
    setViewState({ type: 'QUIZ', category, mode });
    setResult(null);
    setIsReviewingMissed(false);
  };

  const handleQuizComplete = (score: number, total: number, missed: Formula[]) => {
    setResult({ score, total, missed });
    if (missed.length > 0) {
      setActiveFormulaSet(missed);
    } else {
      setActiveFormulaSet(null);
    }
  };

  const handleReviewMissed = () => {
    setIsReviewingMissed(true);
  };

  const finishReviewingMissed = () => {
    setIsReviewingMissed(false);
    setResult(null);
    if (viewState.type === 'QUIZ') {
      setViewState({ ...viewState, mode: Mode.Testing });
    }
  };

  const renderContent = () => {
    if (isReviewingMissed && activeFormulaSet) {
      return (
        <LearnView 
          data={activeFormulaSet} 
          onBack={finishReviewingMissed}
          backButtonText="К тесту"
          title="Повторение ошибок"
        />
      );
    }

    if (result) {
      const isPerfect = result.score === result.total;
      const percentage = Math.round((result.score / result.total) * 100);
      
      return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-in fade-in zoom-in duration-300">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg ${isPerfect ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
            {isPerfect ? (
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
          </div>
          
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
            {isPerfect ? 'Блестяще!' : 'Есть ошибки'}
          </h2>
          <p className="text-slate-500 mb-8 text-base">
            {isPerfect ? 'Все формулы изучены!' : `Результат: ${result.score} из ${result.total} (${percentage}%)`}
          </p>
          
          <div className="flex flex-col gap-3 w-full max-w-xs">
            {!isPerfect ? (
              <>
                <button 
                  onClick={handleReviewMissed}
                  className="w-full py-5 bg-indigo-600 text-white rounded-3xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all text-lg"
                >
                  Заучить ошибки ({result.missed.length})
                </button>
                <button 
                  onClick={navigateToHome}
                  className="w-full py-3 text-slate-400 font-semibold hover:text-slate-600 transition-colors text-sm"
                >
                  Выйти
                </button>
              </>
            ) : (
              <button 
                onClick={navigateToHome}
                className="w-full py-5 bg-green-600 text-white rounded-3xl font-bold shadow-xl shadow-green-100 hover:bg-green-700 active:scale-95 text-lg"
              >
                На главную
              </button>
            )}
          </div>
        </div>
      );
    }

    if (viewState.type === 'HOME') {
      return <Home onSelectCategory={navigateToModeSelect} />;
    }

    if (viewState.type === 'MODE_SELECT') {
      return (
        <ModeSelect 
          category={viewState.category} 
          onSelectMode={(mode) => handleStart(viewState.category, mode)}
          onBack={navigateToHome}
        />
      );
    }

    if (viewState.type === 'QUIZ') {
      const fallbackData = viewState.category === Category.Derivatives ? DERIVATIVES : ANTIDERIVATIVES;
      const dataToUse = activeFormulaSet || fallbackData;
      
      if (viewState.mode === Mode.Learning) {
        return (
          <LearnView 
            data={dataToUse} 
            onBack={() => navigateToModeSelect(viewState.category)} 
          />
        );
      } else {
        return (
          <QuizView 
            data={dataToUse} 
            onComplete={handleQuizComplete} 
            onExit={() => navigateToModeSelect(viewState.category)}
          />
        );
      }
    }

    return <Home onSelectCategory={navigateToModeSelect} />;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-lg mx-auto overflow-x-hidden selection:bg-indigo-100">
      <header className="p-4 flex items-center justify-between border-b border-slate-100 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center space-x-2" onClick={navigateToHome} style={{ cursor: 'pointer' }}>
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-100">Σ</div>
          <span className="font-extrabold text-lg text-slate-800 tracking-tight">MathQuiz</span>
        </div>
      </header>
      
      <main className="flex-1 px-3 py-4 pb-12">
        {renderContent()}
      </main>

      <footer className="p-4 text-center text-slate-400 text-[10px] uppercase tracking-widest font-bold">
        MathQuiz &bull; 2024
      </footer>
    </div>
  );
};

export default App;
