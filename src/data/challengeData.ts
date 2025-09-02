import { Challenge } from '../types/challenge';

export const challenges: Challenge[] = [
  {
    id: 'challenge-1',
    title: 'Climate Monitoring Systems',
    category: 'Earth & Climate',
    description: 'Design a system to monitor climate changes using NASA data.',
    position: [2, 1, 3] as [number, number, number], // Ensuring proper typing
    // other properties...
  },
  // Additional challenges would be here
  // ...
];