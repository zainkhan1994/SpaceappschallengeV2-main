import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

interface SpaceAgency {
  name: string;
  country: string;
  logo: string;
  url: string;
  description: string;
  coordinates: [number, number]; // [longitude, latitude]
}

const spaceAgencies: SpaceAgency[] = [
  {
    name: 'NASA',
    country: 'United States',
    logo: '/nasa-logo.png',
    url: 'https://www.nasa.gov/',
    description: 'National Aeronautics and Space Administration',
    coordinates: [-95.7129, 37.0902], // USA center
  },
  {
    name: 'ESA',
    country: 'Europe',
    logo: '/esa-logo.png',
    url: 'https://www.esa.int/',
    description: 'European Space Agency',
    coordinates: [8.2275, 46.8182], // Europe center
  },
  {
    name: 'JAXA',
    country: 'Japan',
    logo: '/jaxa-logo.png',
    url: 'https://global.jaxa.jp/',
    description: 'Japan Aerospace Exploration Agency',
    coordinates: [138.2529, 36.2048], // Japan
  },
  {
    name: 'ISRO',
    country: 'India',
    logo: '/isro-logo.png',
    url: 'https://www.isro.gov.in/',
    description: 'Indian Space Research Organisation',
    coordinates: [78.9629, 20.5937], // India
  },
  {
    name: 'UK Space Agency',
    country: 'United Kingdom',
    logo: '/uksa-logo.png',
    url: 'https://www.gov.uk/government/organisations/uk-space-agency',
    description: 'UK Space Agency',
    coordinates: [-3.4360, 55.3781], // UK
  },
  {
    name: 'MBRSC',
    country: 'UAE',
    logo: '/mbrsc-logo.png',
    url: 'https://www.mbrsc.ae/',
    description: 'Mohammed Bin Rashid Space Centre',
    coordinates: [53.8478, 23.4241], // UAE
  },
  {
    name: 'Brazilian Space Agency',
    country: 'Brazil',
    logo: '/aeb-logo.png',
    url: 'https://www.gov.br/aeb/',
    description: 'Brazilian Space Agency',
    coordinates: [-51.9253, -14.2350], // Brazil
  },
  {
    name: 'Canadian Space Agency',
    country: 'Canada',
    logo: '/canadian-space-agency-logo.png',
    url: 'https://www.asc-csa.gc.ca/',
    description: 'Canadian Space Agency',
    coordinates: [-106.3468, 56.1304], // Canada
  },
  {
    name: 'ASI Italy',
    country: 'Italy',
    logo: '/asi-italy-logo.png',
    url: 'https://www.asi.it/',
    description: 'Italian Space Agency',
    coordinates: [12.5674, 41.8719], // Italy
  },
  {
    name: 'Bahrain Space Agency',
    country: 'Bahrain',
    logo: '/bahrain-space-agency-logo.png',
    url: 'https://www.nssa.gov.bh/',
    description: 'Bahrain Space Agency',
    coordinates: [50.6378, 25.9304], // Bahrain
  },
];

// Convert lat/lng to 3D coordinates on sphere
function latLngToVector3(lat: number, lng: number, radius: number = 1.01): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#1e3a8a"
        transparent
        opacity={0.8}
        roughness={0.7}
        metalness={0.3}
      />
    </Sphere>
  );
}

function AgencyMarker({ agency, onAgencyClick }: { agency: SpaceAgency; onAgencyClick: (agency: SpaceAgency) => void }) {
  const [hovered, setHovered] = useState(false);
  const position = useMemo(() => latLngToVector3(agency.coordinates[1], agency.coordinates[0]), [agency.coordinates]);
  
  return (
    <group position={position}>
      {/* Pulsing marker */}
      <mesh
        onClick={() => onAgencyClick(agency)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial
          color={hovered ? "#ffd700" : "#ff6b6b"}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial
          color={hovered ? "#ffd700" : "#ff6b6b"}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Country label */}
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-slate-800/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-blue-500/30 shadow-lg">
            <div className="text-sm font-bold">{agency.country}</div>
            <div className="text-xs text-blue-300">{agency.name}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

function InteractiveGlobe() {
  const [selectedAgency, setSelectedAgency] = useState<SpaceAgency | null>(null);
  const [isGlobeVisible, setIsGlobeVisible] = useState(true);

  const handleAgencyClick = (agency: SpaceAgency) => {
    setSelectedAgency(agency);
    setIsGlobeVisible(false);
  };

  const handleBackToGlobe = () => {
    setSelectedAgency(null);
    setIsGlobeVisible(true);
  };

  if (!isGlobeVisible && selectedAgency) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-2xl mx-auto p-8">
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20">
            <button
              onClick={handleBackToGlobe}
              className="mb-6 text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
            >
              ← Back to Globe
            </button>
            
            <div className="text-center">
              <img
                src={selectedAgency.logo}
                alt={`${selectedAgency.name} logo`}
                className="h-20 w-auto mx-auto mb-6 filter brightness-110"
              />
              
              <h2 className="text-3xl font-bold text-white mb-4">
                {selectedAgency.name}
              </h2>
              
              <p className="text-blue-300 text-lg mb-4">
                {selectedAgency.country}
              </p>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {selectedAgency.description}
              </p>
              
              <a
                href={selectedAgency.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Visit Website
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4a90e2" />
        
        <Globe />
        
        {spaceAgencies.map((agency) => (
          <AgencyMarker
            key={agency.name}
            agency={agency}
            onAgencyClick={handleAgencyClick}
          />
        ))}
      </Canvas>
      
      {/* Instructions overlay */}
      <div className="absolute top-4 left-4 bg-slate-800/60 backdrop-blur-sm text-white p-4 rounded-lg border border-blue-500/20">
        <h3 className="text-lg font-bold mb-2">🌍 Interactive Space Agencies</h3>
        <p className="text-sm text-gray-300">
          Click on the glowing markers to explore space agencies around the world!
        </p>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-slate-800/60 backdrop-blur-sm text-white p-4 rounded-lg border border-blue-500/20">
        <h4 className="text-sm font-bold mb-2">Space Agencies</h4>
        <div className="text-xs text-gray-300 space-y-1">
          <div>🔴 {spaceAgencies.length} Agencies</div>
          <div>🌍 Click markers to explore</div>
        </div>
      </div>
    </div>
  );
}

export default InteractiveGlobe;
