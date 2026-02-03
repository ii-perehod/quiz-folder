import React from 'react';
import { Category, Mode } from '../types';

interface ModeSelectProps {
  category: Category;
  onSelectMode: (mode: Mode) => void;
  onBack: () => void;
}

const ModeSelect: React.FC<ModeSelectProps> = ({ category, onSelectMode, onBack }) => {
  const categoryTitle = category === Category.Derivatives ? 'Производные' : 'Первообразные';
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 px-4">
      <div className="w-full max-w-sm">
        <button 
          onClick={onBack}
          className="flex items-center text-slate-400 font-medium mb-8 hover:text-slate-600 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Назад
        </button>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{categoryTitle}</h1>
          <p className="text-slate-500">Выберите режим</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => onSelectMode(Mode.Learning)}
            className="flex items-center p-6 bg-white border-2 border-indigo-50 rounded-2xl shadow-sm hover:border-indigo-200 transition-all group active:scale-[0.98]"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="text-left">
              <span className="block font-bold text-slate-800 text-lg">Заучивание</span>
              <span className="block text-slate-400 text-sm">Карточки с ответами</span>
            </div>
          </button>

          <button
            onClick={() => onSelectMode(Mode.Testing)}
            className="flex items-center p-6 bg-white border-2 border-indigo-50 rounded-2xl shadow-sm hover:border-indigo-200 transition-all group active:scale-[0.98]"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-left">
              <span className="block font-bold text-slate-800 text-lg">Проверка</span>
              <span className="block text-slate-400 text-sm">Тест на время</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModeSelect;
