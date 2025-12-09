export interface PhilosopherSummary {
  id: string;
  name: string;
  tagline: string;
  era: string;
  school: string;
}

export interface PhilosopherDetail extends PhilosopherSummary {
  bio: string;
  famousWorks: string[];
  quotes: string[];
  coreIdeas: string[];
}

export interface GenerationState<T> {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: T | null;
  error?: string;
}
