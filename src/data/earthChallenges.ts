import { Challenge } from '../types/Challenge';

export const earthChallenges: Challenge[] = [
  {
    id: 'terra-data',
    title: 'Animation Celebration of Terra Data',
    difficulty: 'Intermediate',
    description: 'Use 25 years of data from NASA\'s Terra satellite to create an animated story showing how Earth has transformed.',
    shortDescription: 'Create animated Earth stories using Terra satellite data',
    category: 'Earth & Climate',
    constellation: 'earth',
    datasets: ['MODIS', 'MISR', 'CERES'],
    apis: ['NASA Earthdata API'],
    position: [0, 0, 0], // Fixed: proper 3-element tuple
    color: '#22C55E',
    glowColor: '#16A34A',
    nasaDatasets: ['MODIS Terra', 'MISR', 'CERES'] // Fixed: added required property
  },
  {
    id: 'bloomwatch',
    title: 'BloomWatch',
    difficulty: 'Intermediate',
    description: 'Monitor harmful algal blooms using satellite imagery and develop early warning systems.',
    shortDescription: 'Track algal blooms with satellite imagery',
    category: 'Earth & Climate',
    constellation: 'earth',
    datasets: ['Ocean Color Data', 'MODIS Aqua'],
    apis: ['Ocean Color API', 'MODIS Web Service'],
    position: [-5, 0, 5], // Fixed: proper 3-element tuple
    color: '#22C55E',
    glowColor: '#16A34A',
    nasaDatasets: ['Ocean Color Data', 'MODIS Aqua'] // Fixed: added required property
  },
  {
    id: 'healthy-cities',
    title: 'Healthy Cities',
    difficulty: 'Beginner',
    description: 'Use satellite data to assess urban health indicators and promote sustainable city development.',
    shortDescription: 'Assess urban health with satellite data',
    category: 'Earth & Climate',
    constellation: 'earth',
    datasets: ['Landsat Urban Studies', 'VIIRS Nighttime Lights'],
    apis: ['NASA Socioeconomic Data API', 'Urban Studies API'],
    position: [0, -5, 3], // Fixed: proper 3-element tuple
    color: '#22C55E',
    glowColor: '#16A34A',
    nasaDatasets: ['Landsat Urban Studies', 'VIIRS Nighttime Lights'] // Fixed: added required property
  }
];