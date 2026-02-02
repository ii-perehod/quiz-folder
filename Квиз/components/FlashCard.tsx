
import React, { useState } from 'react';

interface FlashCardProps {
  question: string;
  answer: string;
}

const FlashCard: React.FC<FlashCardProps> = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-64 perspective-1000 cursor-pointer mb-6"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front */}
        <div className="absolute inset-0 flex items-center justify-center p-6 text-3xl font-bold text-slate-800 bg-white border-2 border-indigo-100 rounded-2xl shadow-sm backface-hidden">
          <div className="text-center">
            <p className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-widest">Формула</p>
            <div className="math-font">{question}</div>
          </div>
        </div>
        
        {/* Back */}
        <div className="absolute inset-0 flex items-center justify-center p-6 text-3xl font-bold text-white bg-indigo-600 rounded-2xl shadow-lg backface-hidden rotate-y-180">
          <div className="text-center">
            <p className="text-sm font-medium text-indigo-200 mb-2 uppercase tracking-widest">Ответ</p>
            <div className="math-font">{answer}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
