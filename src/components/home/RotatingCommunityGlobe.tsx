import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export interface LocationPin {
  id: string;
  name: string;
  locationLabel: string;
  coordinates: [number, number]; // [lat, lng]
  photo: string;
  description: string;
}

const pinsData: LocationPin[] = [
  {
    id: 'houston',
    name: 'Houston, Texas',
    locationLabel: 'HOUSTON, TEXAS LOCAL EVENT',
    coordinates: [29.7604, -95.3698],
    photo: '/Pictures/ZainProfilePicture.JPG',
    description: 'Home of Space Apps Houston — 80+ Builders & Innovators'
  },
  {
    id: 'katy',
    name: 'Katy, Texas',
    locationLabel: 'KATY, TX LOCAL EVENT',
    coordinates: [29.7858, -95.8244],
    photo: '/Pictures/KATY.png',
    description: 'Greater Houston Hackathon Team'
  },
  {
    id: 'sugarland',
    name: 'Sugar Land, Texas',
    locationLabel: 'SUGAR LAND, TX LOCAL EVENT',
    coordinates: [29.6197, -95.6349],
    photo: '/Pictures/Farmvis.png',
    description: 'FarmVis Agricultural Innovation Team'
  },
  {
    id: 'chicago',
    name: 'Chicago, Illinois',
    locationLabel: 'CHICAGO, ILLINOIS LOCAL EVENT',
    coordinates: [41.8781, -87.6298],
    photo: '/Pictures/17.png',
    description: 'Midwest Regional Space Apps Team'
  },
  {
    id: 'san-jose',
    name: 'San Jose, California',
    locationLabel: 'BAY AREA, CA LOCAL EVENT',
    coordinates: [37.3382, -121.8863],
    photo: '/Pictures/18.png',
    description: 'West Coast Developer Community'
  },
  {
    id: 'london',
    name: 'London, UK',
    locationLabel: 'LONDON, UK LOCAL EVENT',
    coordinates: [51.5074, -0.1278],
    photo: '/Pictures/5 Posts.png',
    description: 'European Space Apps Challenge Community'
  },
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    locationLabel: 'TOKYO, JAPAN LOCAL EVENT',
    coordinates: [35.6762, 139.6503],
    photo: '/Pictures/Savethedate.jpeg',
    description: 'JAXA & Space Apps Tokyo Collaborators'
  },
  {
    id: 'sao-paulo',
    name: 'São Paulo, Brazil',
    locationLabel: 'SÃO PAULO, BRAZIL LOCAL EVENT',
    coordinates: [-23.5505, -46.6333],
    photo: '/Pictures/Partner.jpeg',
    description: 'Latin America Space Innovation Hub'
  }
];

// Convert lat/lng to 3D Cartesian coordinates on sphere surface
function latLngToVector3(lat: number, lng: number, radius: number = 1.8): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// 3D Rotating Globe mesh with wireframe and inner core
function GlobeMesh() {
  const globeGroupRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={globeGroupRef}>
      {/* Outer Atmosphere Glow */}
      <Sphere ref={atmosphereRef} args={[1.86, 48, 48]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#2E96F5"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Main Globe Sphere */}
      <Sphere args={[1.8, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#091E42"
          emissive="#061229"
          roughness={0.6}
          metalness={0.4}
        />
      </Sphere>

      {/* Latitude / Longitude Wireframe Grid */}
      <Sphere args={[1.805, 32, 24]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#2E96F5"
          wireframe
          transparent
          opacity={0.22}
        />
      </Sphere>

      {/* Equatorial Highlight Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.808, 1.815, 64]} />
        <meshBasicMaterial color="#EAFE07" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

interface PhotoPinMarkerProps {
  pin: LocationPin;
  activePinId: string | null;
  onSelect: (pin: LocationPin) => void;
}

function PhotoPinMarker({ pin, activePinId, onSelect }: PhotoPinMarkerProps) {
  const [hovered, setHovered] = useState(false);
  const isActive = activePinId === pin.id;

  const position = useMemo(
    () => latLngToVector3(pin.coordinates[0], pin.coordinates[1], 1.82),
    [pin.coordinates]
  );

  return (
    <group position={position}>
      {/* Surface marker dot */}
      <mesh>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="#EAFE07" />
      </mesh>

      {/* HTML Teardrop Pin Drop (matching media_1789426410614.jpg) */}
      <Html
        distanceFactor={6}
        position={[0, 0.05, 0]}
        center
        style={{
          transition: 'all 0.3s ease',
          pointerEvents: 'auto',
          cursor: 'pointer',
          zIndex: isActive || hovered ? 100 : 10
        }}
      >
        <div
          onClick={() => onSelect(pin)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`flex flex-col items-center group transition-transform duration-300 ${
            hovered || isActive ? 'scale-125 z-50' : 'scale-90 hover:scale-105'
          }`}
        >
          {/* Pin Drop Teardrop Container */}
          <div className="relative flex flex-col items-center">
            {/* Top Photo Head Circle */}
            <div
              className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full p-[3px] bg-[#EAFE07] shadow-[0_0_18px_rgba(234,254,7,0.75)] transition-all duration-300 ${
                hovered || isActive ? 'ring-4 ring-[#EAFE07]/50 shadow-[0_0_30px_#EAFE07]' : ''
              }`}
            >
              <img
                src={pin.photo}
                alt={pin.name}
                className="w-full h-full object-cover rounded-full bg-[#050A1C]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/sac-logo-houston-transparent.png';
                }}
              />
            </div>

            {/* Downward Yellow Pin Point Triangle */}
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-[#EAFE07] -mt-[2px]" />

            {/* Location Badge Card inside pin base */}
            <div className="bg-[#EAFE07] text-[#050A1C] px-2.5 py-1 rounded-md shadow-md mt-1 font-['Fira_Sans_Condensed',sans-serif] font-black text-[10px] md:text-[11px] tracking-wide uppercase whitespace-nowrap text-center max-w-[170px] truncate">
              {pin.locationLabel}
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

export const RotatingCommunityGlobe: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<LocationPin | null>(pinsData[0]);

  return (
    <div className="relative w-full h-[480px] md:h-[560px] lg:h-[620px] rounded-2xl overflow-hidden bg-[radial-gradient(ellipse_at_center,#0A1C3E_0%,#050A1C_75%)] border border-[#2E96F5]/30 shadow-[0_0_50px_rgba(46,150,245,0.15)]">
      {/* Three.js Canvas */}
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 8]} intensity={1.4} color="#ffffff" />
        <pointLight position={[-10, -8, -6]} intensity={0.6} color="#2E96F5" />

        <GlobeMesh />

        {pinsData.map((pin) => (
          <PhotoPinMarker
            key={pin.id}
            pin={pin}
            activePinId={selectedPin?.id || null}
            onSelect={(p) => setSelectedPin(p)}
          />
        ))}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>

      {/* Selected Location Details Card Overlay */}
      {selectedPin && (
        <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-[340px] bg-[#050A1C]/90 backdrop-blur-md border border-[#EAFE07]/40 rounded-xl p-4 shadow-xl z-20 transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={selectedPin.photo}
              alt={selectedPin.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#EAFE07]"
            />
            <div>
              <div className="font-['Fira_Sans_Condensed',sans-serif] text-[11px] font-bold tracking-widest text-[#EAFE07] uppercase">
                {selectedPin.locationLabel}
              </div>
              <h4 className="font-['Overpass',sans-serif] font-black text-white text-[16px] m-0">
                {selectedPin.name}
              </h4>
            </div>
          </div>
          <p className="text-[13px] text-white/80 m-0 font-light leading-snug">
            {selectedPin.description}
          </p>
        </div>
      )}

      {/* Canvas Instruction Tag */}
      <div className="absolute top-4 left-4 bg-[#050A1C]/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#2E96F5]/30 text-[11px] font-['Fira_Sans_Condensed',sans-serif] font-bold tracking-wider text-[#2E96F5] uppercase">
        🌍 Drag to rotate globe · Click pins to explore
      </div>
    </div>
  );
};

export default RotatingCommunityGlobe;
