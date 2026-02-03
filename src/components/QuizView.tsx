import React, { useState, useMemo } from 'react';
import { Formula } from '../types';
import { DERIVATIVES, ANTIDERIVATIVES } from '../data';

interface QuizViewProps {
  data: Formula[];
  onComplete: (score: number, total: number, missed: Formula[]) => void;
  onExit: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ data, onComplete, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [missedFormulas, setMissedFormulas] = useState<Formula[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const quizData = useMemo(() => {
    return [...data].sort(() => Math.random() - 0.5);
  }, [data]);

  const currentQuestion = quizData[currentIndex];

  const options = useMemo(() => {
    if (!currentQuestion) return [];
    
    const isDerivative = currentQuestion.id.startsWith('d');
    const fullPool = isDerivative ? DERIVATIVES : ANTIDERIVATIVES;

    const otherAnswers = fullPool
      .filter(item => item.id !== currentQuestion.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(item => item.answer);
    
    return [...otherAnswers, currentQuestion.answer].sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  const handleOptionClick = (option: string) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(option);
    const correct = option === currentQuestion.answer;
    setIsCorrect(correct);
    
    let updatedMissed = missedFormulas;
    if (correct) {
      setScore(s => s + 1);
    } else {
      updatedMissed = [...missedFormulas, currentQuestion];
      setMissedFormulas(updatedMissed);
    }

    setTimeout(() => {
      if (currentIndex < quizData.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        onComplete(score + (correct ? 1 : 0), quizData.length, updatedMissed);
      }
    }, 800);
  };

  const progress = ((currentIndex + 1) / quizData.length) * 100;

  return (
    <div className="w-full max-w-md mx-auto space-y-4 px-1">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Вопрос {currentIndex + 1} из {quizData.length}</span>
        <button 
          onClick={onExit}
          className="text-xs font-bold text-red-400 uppercase tracking-wider hover:text-red-500"
        >
          Прервать
        </button>
      </div>

      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
        <div 
          className="bg-indigo-600 h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center min-h-[120px] flex items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800 leading-relaxed italic">{currentQuestion.question}</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {options.map((option, idx) => {
          let buttonClass = "w-full p-4 text-center rounded-2xl border-2 transition-all text-base font-bold flex items-center justify-center min-h-[70px] ";
          if (selectedOption === option) {
            buttonClass += isCorrect ? "border-green-500 bg-green-50 text-green-700" : "border-red-500 bg-red-50 text-red-700";
          } else if (selectedOption !== null && option === currentQuestion.answer) {
            buttonClass += "border-green-500 bg-green-50 text-green-700";
          } else {
            buttonClass += "border-slate-100 bg-white text-slate-700 hover:border-indigo-200 active:bg-slate-50";
          }

          return (
            <button
              key={idx}
              disabled={selectedOption !== null}
              onClick={() => handleOptionClick(option)}
              className={buttonClass}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizView;
