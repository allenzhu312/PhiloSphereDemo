import React, { useState, useEffect } from 'react';
import { fetchPhilosophers } from './services/geminiService';
import { PhilosopherSummary, GenerationState } from './types';
import { PhilosopherCard } from './components/PhilosopherCard';
import { DetailView } from './components/DetailView';
import { Loading } from './components/Loading';
import { BrainIcon } from './components/Icons';

function App() {
  const [philosophersState, setPhilosophersState] = useState<GenerationState<PhilosopherSummary[]>>({
    status: 'idle',
    data: null,
  });

  const [selectedPhilosopher, setSelectedPhilosopher] = useState<PhilosopherSummary | null>(null);

  useEffect(() => {
    // Initial data load
    const loadData = async () => {
      setPhilosophersState({ status: 'loading', data: null });
      try {
        const data = await fetchPhilosophers();
        setPhilosophersState({ status: 'success', data });
      } catch (error) {
        setPhilosophersState({ 
          status: 'error', 
          data: null, 
          error: "Failed to load the great minds. Please try again later." 
        });
      }
    };

    loadData();
  }, []);

  // View: Loading List
  if (philosophersState.status === 'loading') {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <Loading message="Gathering the great minds of history..." />
      </div>
    );
  }

  // View: Error
  if (philosophersState.status === 'error') {
    return (
      <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center text-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md">
           <h2 className="text-2xl font-bold text-red-800 mb-4 font-serif">A Philosophical Paradox</h2>
           <p className="text-stone-600 mb-6">{philosophersState.error}</p>
           <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-stone-800 text-stone-100 rounded-lg hover:bg-stone-700 transition"
           >
             Reload Application
           </button>
        </div>
      </div>
    );
  }

  // View: Detail
  if (selectedPhilosopher) {
    return (
      <DetailView 
        summary={selectedPhilosopher} 
        onBack={() => setSelectedPhilosopher(null)} 
      />
    );
  }

  // View: List (Landing)
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-stone-800 font-sans selection:bg-amber-200 selection:text-amber-900">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FDFCF8]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="bg-stone-900 p-2 rounded-lg">
                <BrainIcon className="h-6 w-6 text-amber-500" />
             </div>
             <div>
               <h1 className="text-2xl font-serif font-bold text-stone-900 leading-none tracking-tight">PhiloSphere</h1>
               <p className="text-xs text-stone-500 font-medium tracking-wide uppercase">Wisdom of the Ages</p>
             </div>
          </div>
          <a 
            href="#"
            className="hidden sm:block text-sm font-semibold text-stone-500 hover:text-stone-900 transition-colors"
          >
            About
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
            Meet the Thinkers
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            Explore the lives and ideas of history's most influential philosophers. 
            Click on a card to delve deeper into their biographies, famous works, and timeless quotes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {philosophersState.data?.map((philosopher) => (
            <PhilosopherCard 
              key={philosopher.id} 
              philosopher={philosopher} 
              onClick={setSelectedPhilosopher} 
            />
          ))}
        </div>
      </main>

      <footer className="bg-stone-900 text-stone-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-serif italic mb-4">"The only true wisdom is in knowing you know nothing."</p>
          <p className="text-sm opacity-60">&copy; {new Date().getFullYear()} PhiloSphere. Powered by Gemini.</p>
        </div>
      </footer>

    </div>
  );
}

export default App;
