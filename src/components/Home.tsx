import React from 'react';
import { Category } from '../types';

interface HomeProps {
  onSelectCategory: (category: Category) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectCategory }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 px-4">
      <div className="text-center mb-4">
        <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-4xl shadow-xl shadow-indigo-200 mx-auto mb-6">
          Σ
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">MathQuiz</h1>
        <p className="text-slate-500">Выберите тему для изучения</p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={() => onSelectCategory(Category.Derivatives)}
          className="w-full flex items-center p-6 bg-white border-2 border-indigo-50 rounded-2xl shadow-sm hover:border-indigo-200 transition-all group active:scale-[0.98]"
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-lg">
            <span className="text-white font-bold text-xl">f'</span>
          </div>
          <div className="text-left">
            <span className="block font-bold text-slate-800 text-lg">Производные</span>
            <span className="block text-slate-400 text-sm">20 формул для изучения</span>
          </div>
        </button>

        <button
          onClick={() => onSelectCategory(Category.Antiderivatives)}
          className="w-full flex items-center p-6 bg-white border-2 border-indigo-50 rounded-2xl shadow-sm hover:border-indigo-200 transition-all group active:scale-[0.98]"
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-lg">
            <span className="text-white font-bold text-xl">∫</span>
          </div>
          <div className="text-left">
            <span className="block font-bold text-slate-800 text-lg">Первообразные</span>
            <span className="block text-slate-400 text-sm">20 формул для изучения</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Home;
