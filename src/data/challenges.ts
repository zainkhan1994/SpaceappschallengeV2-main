import { Challenge } from '../types/Challenge';
import { Constellation } from '../types/constellation'; // keeping lowercase based on your folder structure
import { challenges } from './challengeData';

export const challenges: Challenge[] = [
  // AI & Big Data Constellation
  {
    id: 'world-away',
    title: 'A World Away',
    difficulty: 'Advanced',
    category: 'AI & Big Data',
    description: 'Develop AI models to predict exoplanet habitability using NASA\'s extensive database of confirmed exoplanets.',
    shortDescription: 'AI models for exoplanet habitability prediction',
    nasaDatasets: ['NASA Exoplanet Archive', 'Kepler Mission Data'],
    apis: ['NASA Exoplanet Archive API', 'TESS Data API'],
    position: [8, 2, -5],
    color: '#00D4FF',
    glowColor: '#0099CC',
    constellation: 'ai',
    datasets: ['NASA Exoplanet Archive', 'Kepler Mission Data']
  },
  {
    id: 'space-biology-engine',
    title: 'Space Biology Engine',
    difficulty: 'Intermediate',
    category: 'AI & Big Data',
    description: 'Create machine learning tools to analyze biological experiments conducted in microgravity environments.',
    shortDescription: 'ML tools for space biology research',
    nasaDatasets: ['Space Biology Research', 'ISS Experiment Data'],
    apis: ['NASA Life Sciences API', 'Biological Data API'],
    position: [12, -1, -8],
    color: '#00D4FF',
    glowColor: '#0099CC',
    constellation: 'ai',
    datasets: ['Space Biology Research', 'ISS Experiment Data']
  },
  {
    id: 'embiggen-eyes',
    title: 'Embiggen Your Eyes',
    difficulty: 'Intermediate',
    category: 'AI & Big Data',
    description: 'Develop computer vision algorithms to enhance and analyze astronomical images from various NASA missions.',
    shortDescription: 'Computer vision for astronomical imagery',
    nasaDatasets: ['Hubble Space Telescope', 'James Webb Space Telescope'],
    apis: ['NASA Image and Video Library', 'Astronomical API'],
    position: [10, 4, -3],
    color: '#00D4FF',
    glowColor: '#0099CC',
    constellation: 'ai',
    datasets: ['Hubble Space Telescope', 'James Webb Space Telescope']
  },
  {
    id: 'radar-looking-glass',
    title: 'Radar Looking Glass',
    difficulty: 'Advanced',
    category: 'AI & Big Data',
    description: 'Build AI systems to interpret synthetic aperture radar data for Earth observation and planetary exploration.',
    shortDescription: 'AI interpretation of SAR radar data',
    nasaDatasets: ['SAR Radar Data', 'Planetary Radar Observations'],
    apis: ['Alaska SAR Facility API', 'Planetary Radar API'],
    position: [6, 0, -10],
    color: '#00D4FF',
    glowColor: '#0099CC',
    constellation: 'ai',
    datasets: ['SAR Radar Data', 'Planetary Radar Observations']
  },

  // Earth & Climate Constellation
  {
    id: 'terra-data',
    title: 'Terra Data',
    difficulty: 'Beginner',
    category: 'Earth & Climate',
    description: 'Analyze Earth observation data to understand climate patterns and environmental changes over time.',
    shortDescription: 'Earth observation climate analysis',
    nasaDatasets: ['MODIS Terra', 'Landsat', 'AIRS'],
    apis: ['NASA Earth Data API', 'Climate Data Online'],
    position: [-8, 3, 5],
    color: '#22C55E',
    glowColor: '#16A34A',
    constellation: 'earth',
    datasets: ['MODIS Terra', 'Landsat', 'AIRS']
  },
  {
    id: 'bloom-watch',
    title: 'BloomWatch',
    difficulty: 'Intermediate',
    category: 'Earth & Climate',
    description: 'Monitor harmful algal blooms using satellite imagery and develop early warning systems.',
    shortDescription: 'Satellite monitoring of algal blooms',
    nasaDatasets: ['Ocean Color Data', 'MODIS Aqua'],
    apis: ['Ocean Color API', 'MODIS Web Service'],
    position: [-12, 1, 8],
    color: '#22C55E',
    glowColor: '#16A34A',
    constellation: 'earth',
    datasets: ['Ocean Color Data', 'MODIS Aqua']
  },
  {
    id: 'air-quality',
    title: 'Air Quality',
    difficulty: 'Intermediate',
    category: 'Earth & Climate',
    description: 'Create tools to visualize and predict air quality using NASA\'s atmospheric monitoring data.',
    shortDescription: 'Air quality visualization and prediction',
    nasaDatasets: ['TEMPO Mission', 'OMI', 'AIRS'],
    apis: ['NASA Air Quality API', 'TEMPO Data Service'],
    position: [-6, -2, 3],
    color: '#22C55E',
    glowColor: '#16A34A',
    constellation: 'earth',
    datasets: ['TEMPO Mission', 'OMI', 'AIRS']
  },
  {
    id: 'healthy-cities',
    title: 'Healthy Cities',
    difficulty: 'Beginner',
    category: 'Earth & Climate',
    description: 'Use satellite data to assess urban health indicators and promote sustainable city development.',
    shortDescription: 'Urban health assessment via satellite',
    nasaDatasets: ['Landsat Urban Studies', 'VIIRS Nighttime Lights'],
    apis: ['NASA Socioeconomic Data API', 'Urban Studies API'],
    position: [-10, 5, 2],
    color: '#22C55E',
    glowColor: '#16A34A',
    constellation: 'earth',
    datasets: ['Landsat Urban Studies', 'VIIRS Nighttime Lights']
  },
  {
    id: 'farm-navigators',
    title: 'Farm Navigators',
    difficulty: 'Intermediate',
    category: 'Earth & Climate',
    description: 'Develop precision agriculture tools using satellite imagery and climate data to optimize farming practices.',
    shortDescription: 'Precision agriculture satellite tools',
    nasaDatasets: ['MODIS Agriculture', 'SMAP Soil Moisture'],
    apis: ['NASA Agriculture API', 'SMAP Data Service'],
    position: [-4, 1, 7],
    color: '#22C55E',
    glowColor: '#16A34A',
    constellation: 'earth',
    datasets: ['MODIS Agriculture', 'SMAP Soil Moisture']
  },

  // Space & Habitats Constellation
  {
    id: 'iss-anniversary',
    title: 'ISS Anniversary',
    difficulty: 'Beginner',
    category: 'Space & Habitats',
    description: 'Celebrate 25+ years of the International Space Station with interactive visualizations of its achievements.',
    shortDescription: 'ISS 25th anniversary celebration',
    nasaDatasets: ['ISS Mission Data', 'Astronaut Activities'],
    apis: ['ISS Current Location API', 'ISS Research API'],
    position: [0, 8, -15],
    color: '#8B5CF6',
    glowColor: '#7C3AED',
    constellation: 'space',
    datasets: ['ISS Mission Data', 'Astronaut Activities']
  },
  {
    id: 'leo-business',
    title: 'LEO Business',
    difficulty: 'Advanced',
    category: 'Space & Habitats',
    description: 'Design sustainable business models for low Earth orbit commercial activities and space economy.',
    shortDescription: 'LEO commercial business models',
    nasaDatasets: ['Commercial Space Data', 'Orbital Mechanics'],
    apis: ['SpaceX API', 'Commercial Space API'],
    position: [4, 6, -12],
    color: '#8B5CF6',
    glowColor: '#7C3AED',
    constellation: 'space',
    datasets: ['Commercial Space Data', 'Orbital Mechanics']
  },
  {
    id: 'habitat-creator',
    title: 'Habitat Creator',
    difficulty: 'Advanced',
    category: 'Space & Habitats',
    description: 'Design innovative space habitats for long-duration missions to Mars and beyond.',
    shortDescription: 'Space habitat design and simulation',
    nasaDatasets: ['Mars Mission Planning', 'Life Support Systems'],
    apis: ['NASA Mars API', 'Habitat Design API'],
    position: [-2, 10, -18],
    color: '#8B5CF6',
    glowColor: '#7C3AED',
    constellation: 'space',
    datasets: ['Mars Mission Planning', 'Life Support Systems']
  },
  {
    id: 'space-trash-hack',
    title: 'SpaceTrash Hack',
    difficulty: 'Intermediate',
    category: 'Space & Habitats',
    description: 'Develop solutions to track and mitigate space debris threatening satellites and space missions.',
    shortDescription: 'Space debris tracking and mitigation',
    nasaDatasets: ['Orbital Debris Catalog', 'Satellite Tracking'],
    apis: ['Space Track API', 'Debris Monitoring API'],
    position: [6, 4, -20],
    color: '#8B5CF6',
    glowColor: '#7C3AED',
    constellation: 'space',
    datasets: ['Orbital Debris Catalog', 'Satellite Tracking']
  },
  {
    id: 'meteor-madness',
    title: 'Meteor Madness',
    difficulty: 'Beginner',
    category: 'Space & Habitats',
    description: 'Create tools to predict and visualize meteor showers and asteroid impacts for public safety.',
    shortDescription: 'Meteor and asteroid impact prediction',
    nasaDatasets: ['Near-Earth Object Program', 'Meteor Observations'],
    apis: ['NASA NEO API', 'Meteor Shower API'],
    position: [2, 12, -14],
    color: '#8B5CF6',
    glowColor: '#7C3AED',
    constellation: 'space',
    datasets: ['Near-Earth Object Program', 'Meteor Observations']
  },

  // Oceans & Ecosystems Constellation
  {
    id: 'sharks-from-space',
    title: 'Sharks from Space',
    difficulty: 'Intermediate',
    category: 'Oceans & Ecosystems',
    description: 'Use satellite technology to track marine life migration patterns and protect ocean ecosystems.',
    shortDescription: 'Marine life tracking via satellite',
    nasaDatasets: ['Ocean Biology', 'Sea Surface Temperature'],
    apis: ['Ocean Color API', 'Marine Life API'],
    position: [-15, -5, 10],
    color: '#0EA5E9',
    glowColor: '#0284C7',
    constellation: 'oceans',
    datasets: ['Ocean Biology', 'Sea Surface Temperature']
  },
  {
    id: 'deep-dive',
    title: 'Deep Dive',
    difficulty: 'Advanced',
    category: 'Oceans & Ecosystems',
    description: 'Explore the ocean depths using NASA\'s underwater research technologies and data visualization.',
    shortDescription: 'Deep ocean exploration and visualization',
    nasaDatasets: ['Ocean Depth Data', 'Underwater Research'],
    apis: ['Ocean Depth API', 'Marine Research API'],
    position: [-18, -8, 15],
    color: '#0EA5E9',
    glowColor: '#0284C7',
    constellation: 'oceans',
    datasets: ['Ocean Depth Data', 'Underwater Research']
  },

  // Storytelling & Education Constellation
  {
    id: 'stellar-stories',
    title: 'Stellar Stories',
    difficulty: 'Beginner',
    category: 'Storytelling & Education',
    description: 'Create compelling narratives that make space science accessible and inspiring for all audiences.',
    shortDescription: 'Space science storytelling platform',
    nasaDatasets: ['Mission Archives', 'Educational Resources'],
    apis: ['NASA Educational API', 'Story Content API'],
    position: [15, -3, 12],
    color: '#F59E0B',
    glowColor: '#D97706',
    constellation: 'storytelling',
    datasets: ['Mission Archives', 'Educational Resources']
  },
  {
    id: 'animation-celebration',
    title: 'Animation Celebration',
    difficulty: 'Intermediate',
    category: 'Storytelling & Education',
    description: 'Develop animated experiences that bring space missions and discoveries to life for educational purposes.',
    shortDescription: 'Educational space animations',
    nasaDatasets: ['Mission Imagery', 'Animation Assets'],
    apis: ['NASA Media API', 'Educational Content API'],
    position: [18, 0, 8],
    color: '#F59E0B',
    glowColor: '#D97706',
    constellation: 'storytelling',
    datasets: ['Mission Imagery', 'Animation Assets']
  }
];

export const challengeData = [
  {
    id: 'terra-data',
    title: 'Animation Celebration of Terra Data',
    difficulty: 'Intermediate',
    description: 'Use 25 years of data from NASA\'s Terra satellite to create an animated story showing how Earth has transformed.',
    shortDescription: 'Create animated Earth stories using Terra satellite data',
    category: 'Earth & Climate',
    datasets: ['MODIS', 'MISR', 'CERES'],
    apis: ['NASA Earthdata API'],
    position: [0, 0, 0] as [number, number, number],
  },
  {
    id: 'bloomwatch',
    title: 'BloomWatch',
    difficulty: 'Intermediate',
    description: 'Monitor harmful algal blooms using satellite imagery and develop early warning systems.',
    shortDescription: 'Track algal blooms with satellite imagery',
    category: 'Earth & Climate',
    datasets: ['Ocean Color Data', 'MODIS Aqua'],
    apis: ['Ocean Color API', 'MODIS Web Service'],
    position: [-5, 0, 5] as [number, number, number],
  }
];

export const constellations: Constellation[] = [
  {
    id: 'earth-climate',
    name: 'Earth & Climate',
    position: [0, 0, 0] as [number, number, number],
    challenges: challenges.filter(c => c.category === 'Earth & Climate').map(c => c.id),
    glowColor: '#3b82f6' // Adding glowColor for consistency
  },
  {
    id: 'space-habitats',
    name: 'Space & Habitats',
    position: [8, 5, -5] as [number, number, number],
    challenges: challenges.filter(c => c.category === 'Space & Habitats').map(c => c.id), // Fixed: added .map()
    glowColor: '#10b981' // Adding glowColor for consistency
  },
  {
    id: 'oceans-ecosystems',
    name: 'Oceans & Ecosystems',
    position: [-12, -3, 6] as [number, number, number],
    challenges: challenges.filter(c => c.category === 'Oceans & Ecosystems').map(c => c.id), // Fixed: added .map()
    glowColor: '#0ea5e9' // Adding glowColor for consistency
  },
  {
    id: 'storytelling-education',
    name: 'Storytelling & Education',
    position: [16, -2, 10] as [number, number, number], // Fixed: added type assertion
    challenges: challenges.filter(c => c.category === 'Storytelling & Education').map(c => c.id), // Fixed: added .map()
    glowColor: '#8b5cf6' // Adding glowColor for consistency
  },
  // Removing duplicate 'earth' constellation as it appears redundant with 'earth-climate'
  // If this was intentionally different, let me know and I'll restore it with proper structure
];