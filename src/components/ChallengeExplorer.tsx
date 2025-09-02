import React, { useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';

// Updated Challenge interface with proper URLs
interface Challenge {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  description: string;
  datasets: string[];
  fullDescription: string;
  ctaButtonURL?: string;  // URL for "Start Challenge" button
  learnMoreURL?: string;  // URL for "Learn More" button
}

// Updated challenge data with comprehensive NASA Space Apps Challenge information
const challenges: Challenge[] = [
  // Earth & Climate Challenges
  {
    id: 'animation-terra',
    title: 'Animation Celebration of Terra Data',
    category: 'Earth & Climate',
    difficulty: 'Intermediate',
    description: 'Create animated Earth stories using Terra satellite data',
    datasets: [
      'MODIS (Moderate Resolution Imaging Spectroradiometer)',
      'MISR (Multi-angle Imaging SpectroRadiometer)',
      'CERES (Clouds and Earth\'s Radiant Energy System)'
    ],
    fullDescription: 'Use 25 years of data from NASA\'s Terra satellite to create an animated story showing how Earth has transformed over time and why it matters for our planet.',
    ctaButtonURL: 'https://www.spaceappschallenge.org/2025/challenges/animation-celebration-of-terra-data/?tab=teams',
    learnMoreURL: 'https://www.spaceappschallenge.org/2025/challenges/animation-celebration-of-terra-data/'
  },
  {
    id: 'bloomwatch',
    title: 'BloomWatch',
    category: 'Earth & Climate',
    difficulty: 'Intermediate',
    description: 'Track global plant blooming events with satellite data',
    datasets: [
      'MODIS Vegetation Indices (NDVI)',
      'Landsat Surface Reflectance',
      'VIIRS Vegetation Phenology'
    ],
    fullDescription: 'Create an interactive tool using NASA satellite observations to track global plant blooming events, predict future changes, and visualize vegetation cycles.'
  },
  {
    id: 'healthy-cities',
    title: 'Data Pathways to Healthy Cities',
    category: 'Earth & Climate',
    difficulty: 'Intermediate',
    description: 'Urban health assessment via satellite',
    datasets: [
      'Landsat Urban Studies',
      'VIIRS Nighttime Lights'
    ],
    fullDescription: 'Use NASA\'s satellite data to design smarter, healthier cities by mapping pollution, green spaces, and resource distribution for sustainable urban growth.'
  },
  {
    id: 'farm-navigators',
    title: 'NASA Farm Navigators',
    category: 'Earth & Climate',
    difficulty: 'Intermediate',
    description: 'Precision agriculture satellite tools',
    datasets: [
      'SMAP (Soil Moisture Active Passive)',
      'MODIS Crop Data',
      'Landsat Evapotranspiration Estimates'
    ],
    fullDescription: 'Design an educational game that uses NASA\'s real-time satellite imagery to simulate farming decisions — planting, irrigation, and livestock — while teaching sustainable agriculture.'
  },
  {
    id: 'air-quality',
    title: 'From EarthData to Action',
    category: 'Earth & Climate',
    difficulty: 'Intermediate',
    description: 'Air quality visualization and prediction',
    datasets: [
      'TEMPO (Tropospheric Emissions: Monitoring Pollution)',
      'GEOS-CF Atmospheric Composition'
    ],
    fullDescription: 'Develop a web-based app that uses NASA\'s TEMPO mission data to predict real-time air quality, notify users of unsafe conditions, and support better health decisions.'
  },
  {
    id: 'through-radar',
    title: 'Through the Radar Looking Glass',
    category: 'Earth & Climate',
    difficulty: 'Intermediate',
    description: 'Revealing Earth processes with SAR',
    datasets: [
      'Sentinel-1 SAR',
      'NASA UAVSAR',
      'JPL SRTM Elevation Models'
    ],
    fullDescription: 'Use NASA\'s synthetic aperture radar (SAR) data to reveal hidden Earth changes like volcano activity, ice melt, floods, and wildfire damage.'
  },
  {
    id: 'rain-parade',
    title: 'Will It Rain On My Parade?',
    category: 'Earth & Climate',
    difficulty: 'Intermediate',
    description: 'Personalized weather forecasting app',
    datasets: [
      'GPM (Global Precipitation Measurement)',
      'MERRA-2 Atmospheric Reanalysis'
    ],
    fullDescription: 'Create a personalized weather app using NASA\'s open weather datasets that tells users if their events, hikes, or trips will be impacted by extreme heat, cold, or storms.'
  },

  // Space & Habitats Challenges
  {
    id: 'exoplanet-ai',
    title: 'A World Away: Hunting for Exoplanets with AI',
    category: 'Space & Habitats',
    difficulty: 'Advanced',
    description: 'AI-powered exoplanet detection and analysis',
    datasets: [
      'Kepler Mission Dataset',
      'TESS Exoplanet Observations',
      'NASA Exoplanet Archive'
    ],
    fullDescription: 'Train an AI model using NASA\'s open-source exoplanet datasets to automatically detect new planets beyond our solar system.'
  },
  {
    id: 'space-biology',
    title: 'Build a Space Biology Knowledge Engine',
    category: 'Space & Habitats',
    difficulty: 'Intermediate',
    description: 'Interactive space biology experiment database',
    datasets: [
      'NASA GeneLab',
      'Space Biology Experiment Data Archive',
      'Human Research Program Open Science Data'
    ],
    fullDescription: 'Use AI and data visualization to summarize NASA\'s space biology experiments into an interactive dashboard for exploring the effects of space on life.'
  },
  {
    id: 'habitat-creator',
    title: 'Your Home in Space: The Habitat Layout Creator',
    category: 'Space & Habitats',
    difficulty: 'Intermediate',
    description: 'Space habitat design and simulation',
    datasets: [
      'NASA Habitat Studies Archive',
      'ISS Environmental Control Data'
    ],
    fullDescription: 'Design a habitat layout tool where users can plan astronaut living spaces — from food prep and exercise zones to sleeping pods and medical facilities.'
  },
  {
    id: 'embiggen',
    title: 'Embiggen Your Eyes!',
    category: 'Space & Habitats',
    difficulty: 'Intermediate',
    description: 'Ultra-HD space imagery exploration',
    datasets: [
      'NASA Planetary Data System',
      'Earth Observing System Image Archive',
      'HiRISE High-Resolution Imagery'
    ],
    fullDescription: 'Build an app that lets users zoom into NASA\'s massive ultra-HD images, explore planetary features, and uncover patterns hidden in trillions of pixels.'
  },
  {
    id: 'iss-anniversary',
    title: 'International Space Station 25th Anniversary Apps',
    category: 'Space & Habitats',
    difficulty: 'Intermediate',
    description: 'ISS 25th anniversary celebration',
    datasets: [
      'ISS Daily Log Data',
      'NASA Astronaut Training Records',
      'Cupola Earth Observation Imagery'
    ],
    fullDescription: 'Create an app, game, or interactive tool to showcase astronaut experiences aboard the ISS — from floating in zero gravity to gazing at Earth from orbit.'
  },
  {
    id: 'leo-business',
    title: 'Commercializing Low Earth Orbit (LEO)',
    category: 'Space & Habitats',
    difficulty: 'Advanced',
    description: 'LEO commercial business models',
    datasets: [
      'LEO Economic Analysis Reports',
      'Satellite Operations Data'
    ],
    fullDescription: 'Develop a sustainable business model or prototype for companies operating in low Earth orbit, focusing on safety, scalability, and environmental responsibility.'
  },
  {
    id: 'spacetrash-hack',
    title: 'SpaceTrash Hack: Revolutionizing Recycling on Mars',
    category: 'Space & Habitats',
    difficulty: 'Intermediate',
    description: 'Space debris monitoring and cleanup',
    datasets: [
      'Mars Habitat Resource Studies',
      'NASA Mission Logistics Data'
    ],
    fullDescription: 'Design a recycling and waste management system for astronauts on long-duration Mars missions, solving resource challenges without resupply from Earth.'
  },
  {
    id: 'meteor-madness',
    title: 'Meteor Madness',
    category: 'Space & Habitats',
    difficulty: 'Beginner',
    description: 'Meteor shower visualization and prediction',
    datasets: [
      'Near-Earth Object Observations',
      'Planetary Defense Coordination Office Data'
    ],
    fullDescription: 'Build an interactive simulator where users can model asteroid impact scenarios, visualize damage, and explore mitigation strategies using NASA data.'
  },
  {
    id: 'stellar-stories',
    title: 'Stellar Stories: Space Weather Through the Eyes of Earthlings',
    category: 'Space & Habitats',
    difficulty: 'Beginner',
    description: 'Children\'s space weather education',
    datasets: [
      'NASA Heliophysics Data Portal',
      'Solar Dynamics Observatory Imagery'
    ],
    fullDescription: 'Create a children\'s digital storybook or animation that explains how solar flares, storms, and space weather impact life on Earth and technology systems.'
  },

  // Oceans & Ecosystems Challenges
  {
    id: 'sharks-from-space',
    title: 'Sharks from Space',
    category: 'Oceans & Ecosystems',
    difficulty: 'Advanced',
    description: 'Satellite tracking of marine predators',
    datasets: [
      'Aqua MODIS Ocean Color',
      'VIIRS Chlorophyll Concentration Maps'
    ],
    fullDescription: 'Use NASA\'s satellite data to track shark movements from space, predict hunting zones, and design smarter animal-tracking systems for ocean conservation.'
  },
  {
    id: 'deep-dive',
    title: 'Deep Dive: Immersive Ocean Data',
    category: 'Oceans & Ecosystems',
    difficulty: 'Intermediate',
    description: 'VR ocean exploration with NASA data',
    datasets: [
      'SeaWiFS Ocean Color Data',
      'VIIRS Sea Surface Temperature',
      'Aquarius Salinity Data'
    ],
    fullDescription: 'Build a virtual reality experience that brings NASA\'s ocean datasets to life, showing users the hidden stories of coral reefs, fish migration, and pollution impacts.'
  }
];

interface ChallengeExplorerProps {
  onBackToLanding: () => void;
}

const ChallengeExplorer: React.FC<ChallengeExplorerProps> = ({ onBackToLanding }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [viewMode, setViewMode] = useState<'galaxy' | 'constellation'>('galaxy');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-400/20 text-green-400 border-green-400/50';
      case 'Intermediate': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/50';
      case 'Advanced': return 'bg-red-400/20 text-red-400 border-red-400/50';
      default: return 'bg-gray-400/20 text-gray-400 border-gray-400/50';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Earth & Climate': return 'text-blue-400';
      case 'Space & Habitats': return 'text-green-400';
      case 'Oceans & Ecosystems': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={onBackToLanding}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Main Site</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SA</span>
            </div>
            <span className="text-white font-bold text-lg">CHALLENGE EXPLORER</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-300 text-sm">Mode: {viewMode}</span>
            <button
              onClick={() => setViewMode(viewMode === 'galaxy' ? 'constellation' : 'galaxy')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Toggle View
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full min-h-screen pt-16">
        {/* 3D Scene Background */}
        <div className="fixed inset-0 pt-16 z-0">
          <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
            {/* Animated stars */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(100)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    opacity: Math.random() * 0.8 + 0.2
                  }}
                />
              ))}
            </div>
            
            {/* Central constellation - only in galaxy mode */}
            {viewMode === 'galaxy' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-32 h-32 border-2 border-blue-400/30 rounded-full animate-spin-slow">
                    <div className="absolute inset-4 border border-purple-400/20 rounded-full">
                      <div className="absolute inset-2 bg-blue-400/10 rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Constellation view */}
            {viewMode === 'constellation' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-white mb-4">Constellation View</h1>
                  <p className="text-gray-300">Detailed challenge constellation would appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Challenge Grid - Galaxy mode only, FULL HEIGHT SCROLL AREA */}
        {viewMode === 'galaxy' && (
          <div className="relative z-10 mt-8 pb-20">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Available Challenges
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
              {challenges.map((challenge) => (
                <div 
                  key={challenge.id}
                  onClick={() => setSelectedChallenge(challenge)}
                  className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-5 hover:border-blue-400 transition-all duration-300 cursor-pointer hover:scale-105 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm ${getCategoryColor(challenge.category)}`}>
                      {challenge.category}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs border ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <h3 className="text-white font-bold mb-2 text-xl">{challenge.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{challenge.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {challenge.datasets.slice(0, 2).map((dataset, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-900/40 text-blue-300 rounded text-xs">
                        {dataset.split(' ')[0]}
                      </span>
                    ))}
                    {challenge.datasets.length > 2 && (
                      <span className="px-2 py-1 bg-blue-900/40 text-blue-300 rounded text-xs">
                        +{challenge.datasets.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Challenge Detail Modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
          <div className="bg-gray-900 rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`text-sm ${getCategoryColor(selectedChallenge.category)}`}>
                    {selectedChallenge.category}
                  </span>
                  <span className={`px-3 py-1 rounded text-sm border ${getDifficultyColor(selectedChallenge.difficulty)}`}>
                    {selectedChallenge.difficulty}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white">{selectedChallenge.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedChallenge(null)}
                className="text-gray-400 hover:text-white text-2xl font-bold p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Challenge Description</h3>
                <p className="text-gray-300 leading-relaxed">{selectedChallenge.fullDescription}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Available Datasets</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedChallenge.datasets.map((dataset, index) => (
                    <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                      <span className="text-blue-300 font-medium">{dataset}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                {selectedChallenge.ctaButtonURL ? (
                  <a 
                    href={selectedChallenge.ctaButtonURL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Start Challenge
                  </a>
                ) : (
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg opacity-50 cursor-not-allowed">
                    Start Challenge
                  </button>
                )}
                
                {selectedChallenge.learnMoreURL ? (
                  <a 
                    href={selectedChallenge.learnMoreURL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                  >
                    Learn More
                  </a>
                ) : (
                  <button className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg opacity-50 cursor-not-allowed">
                    Learn More
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeExplorer;