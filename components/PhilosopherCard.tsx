import React from 'react';
import { PhilosopherSummary } from '../types';

interface PhilosopherCardProps {
  philosopher: PhilosopherSummary;
  onClick: (philosopher: PhilosopherSummary) => void;
}

export const PhilosopherCard: React.FC<PhilosopherCardProps> = ({ philosopher, onClick }) => {
  // Use a seeded image from picsum based on the name to ensure consistency
  const seed = encodeURIComponent(philosopher.name);
  const imageUrl = `https://picsum.photos/seed/${seed}/400/500`;

  return (
    <div 
      onClick={() => onClick(philosopher)}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-stone-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-400/50"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={philosopher.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 filter sepia-[0.2] group-hover:sepia-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-stone-100">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-amber-400 opacity-90">{philosopher.era}</p>
          <h3 className="mb-1 font-serif text-2xl font-bold leading-tight">{philosopher.name}</h3>
          <p className="line-clamp-2 text-sm text-stone-300 font-light">{philosopher.tagline}</p>
        </div>
      </div>
      
      <div className="absolute top-4 right-4 translate-x-10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
         <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-stone-900">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
           </svg>
         </span>
      </div>
    </div>
  );
};
