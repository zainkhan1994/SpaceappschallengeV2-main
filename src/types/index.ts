export * from './Challenge';
import type { Challenge } from './Challenge';

export interface AppData {
  searchQuery: string;
  difficultyFilter: string;
  categoryFilter: string;
  setFilteredChallenges: (challenges: Challenge[]) => void;
}

export interface CastUnknownRules {
  [key: string]: any;
}

// Re-export Challenge and Constellation types for convenience
export type { Challenge } from './Challenge';
// Constellation type definition
export interface Constellation {
  id: string;
  name: string;
  description?: string;
  stars: number;
}