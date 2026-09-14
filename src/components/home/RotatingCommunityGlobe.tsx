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
    id: 'ggpen',
    name: 'National Space Programme Management Office',
    country: 'Angola',
    abbr: 'GGPEN',
    coordinates: [-11.2027, 17.8739],
    logo: '/ggpen-logo.png',
    description: 'Operates ANGOSAT-2 satellite connecting communities across Southern Africa.',
    url: 'https://www.spaceappschallenge.org/2026/space-agency-partners/'
  },
  {
    id: 'conae',
    name: 'National Commission on Space Activities',
    country: 'Argentina',
    abbr: 'CONAE',
    coordinates: [-38.4161, -63.6167],
    logo: '/conae-logo.png',
    description: 'Implements Argentina’s national space program across scientific & educational sectors.',
    url: 'https://www.argentina.gob.ar/conae'
  },
  {
    id: 'bsa',
    name: 'Bahrain Space Agency',
    country: 'Bahrain',
    abbr: 'BSA',
    coordinates: [25.9304, 50.6378],
    logo: '/bahrain-space-agency-logo.png',
    description: 'Positions Bahrain as a global player in space science to support sustainable development.',
    url: 'https://www.nssa.gov.bh/'
  },
  {
    id: 'aeb',
    name: 'Brazilian Space Agency',
    country: 'Brazil',
    abbr: 'AEB',
    coordinates: [-14.2350, -51.9253],
    logo: '/aeb-logo.png',
    description: 'Promotes space activities that drive scientific advancement and innovation.',
    url: 'https://www.gov.br/aeb/'
  },
  {
    id: 'csa',
    name: 'Canadian Space Agency',
    country: 'Canada',
    abbr: 'CSA',
    coordinates: [56.1304, -106.3468],
    logo: '/canadian-space-agency-logo.png',
    description: 'Promotes peaceful use and development of space through exploration and open data.',
    url: 'https://www.asc-csa.gc.ca/'
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
    id: 'asi',
    name: 'Italian Space Agency',
    country: 'Italy',
    abbr: 'ASI',
    coordinates: [41.8719, 12.5674],
    logo: '/asi-italy-logo.png',
    description: 'Coordinates scientific research, Earth observation and space exploration.',
    url: 'https://www.asi.it/'
  },
  {
    id: 'jaxa',
    name: 'Japan Aerospace Exploration Agency',
    country: 'Japan',
    abbr: 'JAXA',
    coordinates: [36.2048, 138.2529],
    logo: '/jaxa-logo.png',
    description: 'Advances Earth observation, data analysis and application research.',
    url: 'https://global.jaxa.jp/'
  },
  {
    id: 'kasa',
    name: 'Korea AeroSpace Administration',
    country: 'Republic of Korea',
    abbr: 'KASA',
    coordinates: [35.9078, 127.7669],
    logo: '/kasa-logo.png',
    description: 'Control tower for Korea’s space, exploration, and aeronautics endeavors.',
    url: 'https://www.spaceappschallenge.org/2026/space-agency-partners/'
  },
  {
    id: 'nasrda',
    name: 'National Space Research & Development Agency',
    country: 'Nigeria',
    abbr: 'NASRDA',
    coordinates: [9.0820, 8.6753],
    logo: '/nasrda-logo.png',
    description: 'Utilizes space science and technology for sustainable national development.',
    url: 'https://nasrda.gov.ng/'
  },
  {
    id: 'aep',
    name: 'Paraguayan Space Agency',
    country: 'Paraguay',
    abbr: 'AEP',
    coordinates: [-23.4425, -58.4438],
    logo: '/paraguay-space-agency-logo.png',
    description: 'Champions youth participation, open innovation and international space collaboration.',
    url: 'https://www.aep.gov.py/'
  },
  {
    id: 'ases',
    name: 'Senegalese Space Studies Agency',
    country: 'Senegal',
    abbr: 'ASES',
    coordinates: [14.4974, -14.4524],
    logo: '/ases-logo.png',
    description: 'Responsible for Senegal’s national strategy for space activities and research.',
    url: 'https://www.spaceappschallenge.org/2026/space-agency-partners/'
  },
  {
    id: 'aee',
    name: 'Spanish Space Agency',
    country: 'Spain',
    abbr: 'AEE',
    coordinates: [40.4168, -3.7038],
    logo: '/spanish-space-agency-logo.png',
    description: 'Promotes research, supports innovation, and encourages young minds to explore.',
    url: 'https://www.aee.gob.es/'
  },
  {
    id: 'tua',
    name: 'Turkish Space Agency',
    country: 'Türkiye',
    abbr: 'TUA',
    coordinates: [38.9637, 35.2433],
    logo: '/turkish-space-agency-logo.png',
    description: 'Supports the development & dissemination of space and aeronautics sciences.',
    url: 'https://www.tua.gov.tr/'
  },
  {
    id: 'mbrsc',
    name: 'Mohammed Bin Rashid Space Centre',
    country: 'UAE',
    abbr: 'MBRSC',
    coordinates: [23.4241, 53.8478],
    logo: '/mbrsc-logo.png',
    description: 'Leading hub for scientific innovation and space exploration in the UAE.',
    url: 'https://www.mbrsc.ae/'
  },
  {
    id: 'uksa',
    name: 'UK Space Agency',
    country: 'United Kingdom',
    abbr: 'UKSA',
    coordinates: [55.3781, -3.4360],
    logo: '/uksa-logo.png',
    description: 'Catalyses investment, delivers missions and capabilities, and champions space.',
    url: 'https://www.gov.uk/government/organisations/uk-space-agency'
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
        <sphereGeometry args={[0.016, 12, 12]} />
        <meshBasicMaterial color={isActive || hovered ? "#EAFE07" : "#2E96F5"} />
      </mesh>

      {/* Sleek compact HTML Pin Drop displaying Space Agency Logo */}
      <Html
        center
        distanceFactor={7.5}
        position={[0, 0.025, 0]}
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
            hovered || isActive ? 'scale-125 z-50' : 'scale-80 opacity-90 hover:opacity-100'
          }`}
        >
          {/* Teardrop Pin Container with Agency Logo inside */}
          <div className="relative flex flex-col items-center">
            {/* Circular Logo Frame - Compact 24px/28px */}
            <div
              className={`w-6 h-6 md:w-7 md:h-7 rounded-full p-[2px] bg-white flex items-center justify-center transition-all duration-300 shadow-md ${
                hovered || isActive
                  ? 'ring-3 ring-[#EAFE07] shadow-[0_0_14px_#EAFE07]'
                  : 'ring-1.5 ring-[#2E96F5]'
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
            <div className={`w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[5.5px] -mt-[1px] ${
              hovered || isActive ? 'border-t-[#EAFE07]' : 'border-t-[#2E96F5]'
            }`} />
          </div>

          {/* Hover Tooltip with Agency Abbr & Country */}
          {hovered && !isActive && (
            <div className="absolute -top-6 bg-[#050A1C]/95 text-white border border-[#EAFE07]/50 px-1.5 py-0.5 rounded text-[9px] font-['Fira_Sans_Condensed',sans-serif] font-bold uppercase tracking-wider whitespace-nowrap shadow-lg">
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
            <div className="w-10 h-10 rounded-full p-1 bg-white flex items-center justify-center flex-none border-2 border-[#EAFE07] shadow-sm">
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
    </div>
  );
};

export default RotatingCommunityGlobe;
