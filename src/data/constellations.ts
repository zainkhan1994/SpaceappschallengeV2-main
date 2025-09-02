import { Challenge } from '../types'; // Import Challenge type

export interface Constellation {
  id: string;
  name: string;
  description: string;
  position: [number, number, number];
  color: string;
  glowColor: string;
  challenges: Challenge[]; // Added property to match usage in constellations.ts
}

import { earthChallenges } from './earthChallenges';

export const constellations: Constellation[] = [
  {
    id: 'earth',
    name: 'Earth & Climate',
    description: 'Challenges focused on Earth observation and climate science',
    challenges: earthChallenges, // Fixed: use actual Challenge objects, not strings
    position: [0, 0, 0],
    color: '#4A90E2',
    glowColor: '#7BB3F0'
  }
];