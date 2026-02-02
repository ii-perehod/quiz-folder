
import React, { useState } from 'react';
import { Formula } from '../types';
import FlashCard from './FlashCard';

interface LearnViewProps {
  data: Formula[];
  onBack: () => void;
  backButtonText?: string;
  title?: string;
}

const LearnView: React.FC<LearnViewProps> = ({ 
  data, 
  onBack, 
  backButtonText = "Выход", 
  title 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const isAtEnd = currentIndex === data.length - 1;

  return (
    <div className="w-full max-w-md mx-auto h-full flex flex-col px-2 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center bg-indigo-50 px-4 py-2 rounded-2xl transition-all active:scale-95"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
          {backButtonText}
        </button>
        <div className="text-right">
          {title && <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">{title}</div>}
          <span className="text-sm font-bold text-slate-500 tabular-nums">
            {currentIndex + 1} из {data.length}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center py-4">
        <FlashCard 
          key={data[currentIndex].id}
          question={data[currentIndex].question}
          answer={data[currentIndex].answer}
        />
        
        <p className="text-center text-slate-400 text-sm mb-10 flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          Нажмите на карточку, чтобы увидеть ответ
        </p>

        <div className="flex gap-4">
          <button
            onClick={prevCard}
            disabled={currentIndex === 0}
            className={`flex-1 py-5 rounded-2xl font-bold transition-all ${
              currentIndex === 0 
              ? 'bg-slate-100 text-slate-300 opacity-50' 
              : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-indigo-200 hover:text-indigo-600 active:scale-95'
            }`}
          >
            Назад
          </button>
          
          {isAtEnd ? (
            <button
              onClick={onBack}
              className="flex-1 py-5 rounded-2xl font-bold bg-indigo-600 text-white shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 animate-pulse transition-all"
            >
              Я всё выучил!
            </button>
          ) : (
            <button
              onClick={nextCard}
              className="flex-1 py-5 rounded-2xl font-bold bg-indigo-600 text-white shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
            >
              Вперед
            </button>
          )}
        </div>
      </div>
      
      {/* No list here as per request */}
      <div className="mt-8"></div>
    </div>
  );
};

export default LearnView;
