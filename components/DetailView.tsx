import React, { useEffect, useState } from 'react';
import { PhilosopherSummary, PhilosopherDetail, GenerationState } from '../types';
import { fetchPhilosopherDetail } from '../services/geminiService';
import { Loading } from './Loading';
import { ArrowLeftIcon, QuoteIcon, BookIcon, FeatherIcon } from './Icons';

interface DetailViewProps {
  summary: PhilosopherSummary;
  onBack: () => void;
}

export const DetailView: React.FC<DetailViewProps> = ({ summary, onBack }) => {
  const [state, setState] = useState<GenerationState<PhilosopherDetail>>({
    status: 'loading',
    data: null
  });

  useEffect(() => {
    let mounted = true;
    const loadDetails = async () => {
      try {
        const data = await fetchPhilosopherDetail(summary);
        if (mounted) {
          setState({ status: 'success', data });
        }
      } catch (error) {
        if (mounted) {
          setState({ status: 'error', data: null, error: "Failed to commune with the spirits of wisdom." });
        }
      }
    };

    loadDetails();
    return () => { mounted = false; };
  }, [summary]);

  const seed = encodeURIComponent(summary.name);
  const imageUrl = `https://picsum.photos/seed/${seed}/800/600`;

  if (state.status === 'loading') {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <Loading message={`Consulting the archives for ${summary.name}...`} />
      </div>
    );
  }

  if (state.status === 'error' || !state.data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 text-stone-800 p-6">
        <p className="text-xl mb-4 font-serif">{state.error}</p>
        <button 
          onClick={onBack}
          className="px-6 py-2 bg-stone-800 text-stone-100 rounded-full hover:bg-stone-700 transition-colors"
        >
          Return to List
        </button>
      </div>
    );
  }

  const detail = state.data;

  return (
    <div className="min-h-screen bg-stone-50 animate-fade-in">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={detail.name} 
          className="h-full w-full object-cover filter brightness-75 sepia-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-900/20 to-stone-50"></div>
        
        {/* Navigation - Absolute Top Left */}
        <div className="absolute top-6 left-6 z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 rounded-full bg-stone-900/20 px-4 py-2 text-stone-100 backdrop-blur-md transition-all hover:bg-stone-900/40 hover:pr-6"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="font-medium">All Philosophers</span>
          </button>
        </div>

        {/* Name Title Block */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 max-w-5xl mx-auto">
           <div className="inline-block px-3 py-1 mb-4 rounded-full bg-amber-500/90 text-stone-900 text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
            {detail.school}
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 mb-2 drop-shadow-sm">
            {detail.name}
          </h1>
          <p className="text-xl md:text-2xl text-stone-700 font-light italic max-w-2xl">
            {detail.tagline}
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Left Column: Bio & Facts */}
        <div className="md:col-span-7 space-y-12">
          
          <section>
            <div className="flex items-center gap-3 mb-6">
              <FeatherIcon className="text-amber-600 h-6 w-6" />
              <h2 className="text-2xl font-serif font-bold text-stone-800">Biography</h2>
            </div>
            <div className="prose prose-stone prose-lg text-stone-600 leading-relaxed font-light">
              {detail.bio.split('\n').map((para, i) => (
                <p key={i} className="mb-4">{para}</p>
              ))}
            </div>
          </section>

           <section>
            <div className="flex items-center gap-3 mb-6">
              <BookIcon className="text-amber-600 h-6 w-6" />
              <h2 className="text-2xl font-serif font-bold text-stone-800">Famous Works</h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {detail.famousWorks.map((work, idx) => (
                <li key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-stone-200 hover:border-amber-300 transition-colors">
                  <span className="font-serif text-lg font-medium text-stone-800 italic">{work}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
             <h3 className="text-lg font-serif font-bold text-stone-800 mb-4">Core Ideas</h3>
             <div className="flex flex-wrap gap-2">
               {detail.coreIdeas.map((idea, idx) => (
                 <span key={idx} className="px-4 py-2 bg-stone-200 text-stone-700 rounded-lg text-sm font-medium">
                   {idea}
                 </span>
               ))}
             </div>
          </section>
        </div>

        {/* Right Column: Quotes Sticky */}
        <div className="md:col-span-5 relative">
          <div className="sticky top-8">
            <div className="bg-stone-900 text-stone-200 rounded-2xl p-8 shadow-xl relative overflow-hidden">
               {/* Decorative Quote Icon BG */}
               <QuoteIcon className="absolute top-4 right-4 text-stone-800 h-32 w-32 opacity-20 transform rotate-12" />
               
               <h2 className="text-2xl font-serif font-bold text-amber-500 mb-8 relative z-10 flex items-center gap-2">
                 <QuoteIcon className="h-6 w-6" /> Wisdom
               </h2>

               <div className="space-y-8 relative z-10">
                 {detail.quotes.map((quote, idx) => (
                   <figure key={idx} className="block">
                     <blockquote className="font-serif text-lg leading-relaxed italic text-stone-300 border-l-2 border-amber-700 pl-4">
                       "{quote}"
                     </blockquote>
                   </figure>
                 ))}
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
