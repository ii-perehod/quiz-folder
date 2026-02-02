
import React from 'react';
import { Category } from '../types';

interface HomeProps {
  onSelectCategory: (category: Category) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectCategory }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 px-4">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Математика</h1>
        <p className="text-slate-500 font-medium uppercase tracking-widest text-sm">Выберите раздел</p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={() => onSelectCategory(Category.Derivatives)}
          className="w-full p-8 bg-indigo-600 text-white rounded-3xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-between group"
        >
          <div className="text-left">
            <span className="block text-2xl font-bold italic tracking-tight group-hover:translate-x-1 transition-transform">(f)'</span>
            <span className="block text-indigo-200 text-sm font-bold uppercase mt-1">Производные</span>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        <button
          onClick={() => onSelectCategory(Category.Antiderivatives)}
          className="w-full p-8 bg-white border-2 border-indigo-50 text-slate-800 rounded-3xl shadow-sm hover:border-indigo-200 active:scale-95 transition-all flex items-center justify-between group"
        >
          <div className="text-left">
            <span className="block text-2xl font-bold italic tracking-tight group-hover:translate-x-1 transition-transform">∫ f dx</span>
            <span className="block text-slate-400 text-sm font-bold uppercase mt-1">Первообразные</span>
          </div>
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Home;
