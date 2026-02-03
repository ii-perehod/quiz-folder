import React, { useState } from 'react';

interface FlashCardProps {
  question: string;
  answer: string;
}

const FlashCard: React.FC<FlashCardProps> = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="perspective-1000 w-full h-64 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-3xl shadow-lg border border-slate-100 flex items-center justify-center p-6">
          <h2 className="text-3xl font-bold text-slate-800 italic">{question}</h2>
        </div>
        
        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-indigo-600 rounded-3xl shadow-lg flex items-center justify-center p-6">
          <h2 className="text-3xl font-bold text-white">{answer}</h2>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
