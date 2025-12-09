import React from 'react';
import { BrainIcon } from './Icons';

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = "Contemplating..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-stone-600 animate-pulse">
      <div className="relative">
        <div className="absolute inset-0 bg-amber-200 blur-xl opacity-20 rounded-full"></div>
        <BrainIcon className="w-16 h-16 text-amber-700 mb-4 relative z-10 animate-bounce" />
      </div>
      <p className="text-xl font-serif italic text-stone-500">{message}</p>
    </div>
  );
};
