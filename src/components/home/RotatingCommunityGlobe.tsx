import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export interface AgencyPin {
  id: string;
  name: string;
  country: string;
  abbr: string;
  coordinates: [number, number]; // [lat, lng]
  logo: string;
  description: string;
  url: string;
}

const spaceAgenciesData: AgencyPin[] = [
  {
    id: 'nasa',
    name: 'National Aeronautics and Space Administration',
    country: 'United States',
    abbr: 'NASA',
    coordinates: [37.0902, -95.7129],
    logo: '/nasa-logo.png',
    description: 'Lead agency for NASA Space Apps Challenge globally.',
    url: 'https://www.nasa.gov/'
  },
  {
    id: 'esa',
    name: 'European Space Agency',
    country: 'Europe',
    abbr: 'ESA',
    coordinates: [46.8182, 8.2275],
    logo: '/esa-logo.png',
    description: 'Europe’s gateway to space and open Earth observation data.',
    url: 'https://www.esa.int/'
  },
  {
    id: 'jaxa',
    name: 'Japan Aerospace Exploration Agency',
    country: 'Japan',
    abbr: 'JAXA',
    coordinates: [36.2048, 138.2529],
    logo: '/jaxa-logo.png',
    description: 'Advances Earth observation and space exploration missions.',
    url: 'https://global.jaxa.jp/'
  },
  {
    id: 'isro',
    name: 'Indian Space Research Organisation',
    country: 'India',
    abbr: 'ISRO',
    coordinates: [20.5937, 78.9629],
    logo: '/isro-logo.png',
    description: 'Harvesting benefits of outer space for India and humankind.',
    url: 'https://www.isro.gov.in/'
  },
  {
    id: 'uksa',
    name: 'UK Space Agency',
    country: 'United Kingdom',
    abbr: 'UKSA',
    coordinates: [55.3781, -3.4360],
    logo: '/uksa-logo.png',
    description: 'Catalyses investment and champions space science & innovation.',
    url: 'https://www.gov.uk/government/organisations/uk-space-agency'
  },
  {
    id: 'mbrsc',
    name: 'Mohammed Bin Rashid Space Centre',
    country: 'UAE',
    abbr: 'MBRSC',
    coordinates: [23.4241, 53.8478],
    logo: '/mbrsc-logo.png',
    description: 'Leading hub for space exploration and Earth observation in UAE.',
    url: 'https://www.mbrsc.ae/'
  },
  {
    id: 'aeb',
    name: 'Brazilian Space Agency',
    country: 'Brazil',
    abbr: 'AEB',
    coordinates: [-14.2350, -51.9253],
    logo: '/aeb-logo.png',
    description: 'Promotes technological innovation and space science in Latin America.',
    url: 'https://www.gov.br/aeb/'
  },
  {
    id: 'csa',
    name: 'Canadian Space Agency',
    country: 'Canada',
    abbr: 'CSA',
    coordinates: [56.1304, -106.3468],
    logo: '/canadian-space-agency-logo.png',
    description: 'Promotes space exploration, innovation and open data.',
    url: 'https://www.asc-csa.gc.ca/'
  },
  {
    id: 'asi',
    name: 'Italian Space Agency',
    country: 'Italy',
    abbr: 'ASI',
    coordinates: [41.8719, 12.5674],
    logo: '/asi-italy-logo.png',
    description: 'Coordinates scientific research, Earth observation and innovation.',
    url: 'https://www.asi.it/'
  },
  {
    id: 'nssa',
    name: 'National Space Science Agency',
    country: 'Bahrain',
    abbr: 'BSA',
    coordinates: [25.9304, 50.6378],
    logo: '/bahrain-space-agency-logo.png',
    description: 'Promotes space technologies for national growth and research.',
    url: 'https://www.nssa.gov.bh/'
  },
  {
    id: 'aep',
    name: 'Paraguayan Space Agency',
    country: 'Paraguay',
    abbr: 'AEP',
    coordinates: [-23.4425, -58.4438],
    logo: '/paraguay-space-agency-logo.png',
    description: 'Champions open innovation and international space collaboration.',
    url: 'https://www.aep.gov.py/'
  },
  {
    id: 'sansa',
    name: 'South African National Space Agency',
    country: 'South Africa',
    abbr: 'SANSA',
    coordinates: [-30.5595, 22.9375],
    logo: '/sansa-logo.png',
    description: 'Drives space science, Earth observation and technological advancement.',
    url: 'https://www.sansa.org.za/'
  },
  {
    id: 'tua',
    name: 'Turkish Space Agency',
    country: 'Türkiye',
    abbr: 'TUA',
    coordinates: [38.9637, 35.2433],
    logo: '/turkish-space-agency-logo.png',
    description: 'Supports development and dissemination of space science and tech.',
    url: 'https://www.tua.gov.tr/'
  }
];

// Convert lat/lng to 3D Cartesian coordinates on sphere surface
function latLngToVector3(lat: number, lng: number, radius: number = 1.27): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

interface AgencyPinMarkerProps {
  agency: AgencyPin;
  isActive: boolean;
  onSelect: (agency: AgencyPin) => void;
}

function AgencyPinMarker({ agency, isActive, onSelect }: AgencyPinMarkerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);

  const localPos = useMemo(
    () => latLngToVector3(agency.coordinates[0], agency.coordinates[1], 1.27),
    [agency.coordinates]
  );

  const tempVec = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.getWorldPosition(tempVec);
      // Hide pins on back of sphere horizon
      const dot = tempVec.dot(camera.position);
      const isFront = dot > 0.35;
      if (isFront !== visible) {
        setVisible(isFront);
      }
    }
  });

  if (!visible) return <group ref={groupRef} position={localPos} />;

  return (
    <group ref={groupRef} position={localPos}>
      {/* Surface dot */}
      <mesh>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshBasicMaterial color={isActive || hovered ? "#EAFE07" : "#2E96F5"} />
      </mesh>

      {/* HTML Pin Drop displaying Space Agency Logo */}
      <Html
        center
        distanceFactor={6.5}
        position={[0, 0.03, 0]}
        style={{
          pointerEvents: 'auto',
          cursor: 'pointer',
          zIndex: isActive || hovered ? 100 : 10,
          transition: 'transform 0.2s ease'
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect(agency);
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`flex flex-col items-center group transition-transform duration-200 ${
            hovered || isActive ? 'scale-125 z-50' : 'scale-90 opacity-90 hover:opacity-100'
          }`}
        >
          {/* Teardrop Pin Container with Agency Logo inside */}
          <div className="relative flex flex-col items-center">
            {/* Circular Logo Frame */}
            <div
              className={`w-9 h-9 md:w-10 md:h-10 rounded-full p-[3px] bg-white flex items-center justify-center transition-all duration-300 shadow-md ${
                hovered || isActive
                  ? 'ring-4 ring-[#EAFE07] shadow-[0_0_20px_#EAFE07]'
                  : 'ring-2 ring-[#2E96F5]'
              }`}
            >
              <img
                src={agency.logo}
                alt={agency.name}
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/sac-logo-houston-transparent.png';
                }}
              />
            </div>

            {/* Downward Pointer Tip */}
            <div className={`w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] -mt-[1px] ${
              hovered || isActive ? 'border-t-[#EAFE07]' : 'border-t-[#2E96F5]'
            }`} />
          </div>

          {/* Hover Tooltip with Agency Abbr & Country */}
          {hovered && !isActive && (
            <div className="absolute -top-7 bg-[#050A1C]/95 text-white border border-[#EAFE07]/50 px-2 py-0.5 rounded text-[10px] font-['Fira_Sans_Condensed',sans-serif] font-bold uppercase tracking-wider whitespace-nowrap shadow-lg">
              {agency.abbr} ({agency.country})
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

function GlobeContent({
  activeAgencyId,
  onSelectAgency
}: {
  activeAgencyId: string | null;
  onSelectAgency: (agency: AgencyPin) => void;
}) {
  const globeGroupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={globeGroupRef}>
      {/* Outer Atmosphere Glow */}
      <Sphere args={[1.34, 48, 48]}>
        <meshBasicMaterial color="#2E96F5" transparent opacity={0.08} side={THREE.BackSide} />
      </Sphere>

      {/* Globe Sphere */}
      <Sphere args={[1.25, 64, 64]}>
        <meshStandardMaterial
          color="#081A38"
          emissive="#040D21"
          roughness={0.7}
          metalness={0.3}
        />
      </Sphere>

      {/* Grid Wireframe */}
      <Sphere args={[1.254, 32, 24]}>
        <meshBasicMaterial color="#2E96F5" wireframe transparent opacity={0.16} />
      </Sphere>

      {/* Equatorial Highlight Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.256, 1.262, 64]} />
        <meshBasicMaterial color="#EAFE07" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Space Agency Pins */}
      {spaceAgenciesData.map((agency) => (
        <AgencyPinMarker
          key={agency.id}
          agency={agency}
          isActive={activeAgencyId === agency.id}
          onSelect={onSelectAgency}
        />
      ))}
    </group>
  );
}

export const RotatingCommunityGlobe: React.FC = () => {
  const [selectedAgency, setSelectedAgency] = useState<AgencyPin | null>(spaceAgenciesData[0]);

  return (
    <div className="relative w-full h-[460px] md:h-[520px] lg:h-[560px] rounded-2xl overflow-hidden bg-[radial-gradient(ellipse_at_center,#0A1C3E_0%,#050A1C_85%)] border border-[#2E96F5]/30 shadow-[0_0_40px_rgba(46,150,245,0.12)]">
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 7.0], fov: 38 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 8]} intensity={1.3} color="#ffffff" />
        <pointLight position={[-10, -8, -6]} intensity={0.5} color="#2E96F5" />

        <GlobeContent
          activeAgencyId={selectedAgency?.id || null}
          onSelectAgency={(agency) => setSelectedAgency(agency)}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Selected Space Agency Info Card Overlay */}
      {selectedAgency && (
        <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-[340px] bg-[#050A1C]/92 backdrop-blur-md border border-[#EAFE07]/40 rounded-xl p-3.5 shadow-2xl z-20 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full p-1 bg-white flex items-center justify-center flex-none border-2 border-[#EAFE07] shadow-sm">
              <img
                src={selectedAgency.logo}
                alt={selectedAgency.name}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/sac-logo-houston-transparent.png';
                }}
              />
            </div>
            <div>
              <div className="font-['Fira_Sans_Condensed',sans-serif] text-[10px] font-bold tracking-widest text-[#EAFE07] uppercase">
                {selectedAgency.abbr} · {selectedAgency.country}
              </div>
              <h4 className="font-['Overpass',sans-serif] font-black text-white text-[14px] leading-snug m-0">
                {selectedAgency.name}
              </h4>
              <p className="text-[12px] text-white/80 m-0 font-light mt-0.5 leading-tight">
                {selectedAgency.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Interaction Tag */}
      <div className="absolute top-4 left-4 bg-[#050A1C]/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#2E96F5]/30 text-[11px] font-['Fira_Sans_Condensed',sans-serif] font-bold tracking-wider text-[#2E96F5] uppercase">
        🌍 Drag globe · Click space agency logos to explore
      </div>
    </div>
  );
};

export default RotatingCommunityGlobe;
