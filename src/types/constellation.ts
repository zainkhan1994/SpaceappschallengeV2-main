export interface Constellation {
  id: string;
  name: string;
  position: [number, number, number]; // Using proper tuple type
  challenges: string[]; // Array of challenge IDs
  glowColor?: string; // Making this required since we're adding it to all constellations
}

export interface Challenge {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  shortDescription: string;
  category: string;
  constellation: string;
  datasets: string[];
  apis: string[];
  position: [number, number, number];
  color: string;
  glowColor: string;
  nasaDatasets: string[];
}