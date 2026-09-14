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

// Exact 2024 event photos & key local/global locations
const pinsData: LocationPin[] = [
  {
    id: 'houston',
    name: 'Houston, Texas',
    locationLabel: 'Space Apps Houston Lead',
    coordinates: [29.7604, -95.3698],
    photo: '/Pictures/ZainProfilePicture.JPG',
    description: 'Houston Event Hub — 80+ Builders & Innovators'
  },
  {
    id: 'chicago',
    name: 'Chicago, Illinois',
    locationLabel: 'Chicago Local Event 2024',
    coordinates: [41.8781, -87.6298],
    photo: '/Pictures/17.png',
    description: 'Space Apps 2024 Participant Team at Work'
  },
  {
    id: 'katy',
    name: 'Katy, Texas',
    locationLabel: 'Katy Hackathon Team',
    coordinates: [29.7858, -95.8244],
    photo: '/Pictures/18.png',
    description: 'Greater Houston 2024 Hackathon Builders'
  },
  {
    id: 'sugarland',
    name: 'Sugar Land, Texas',
    locationLabel: 'FarmVis Team',
    coordinates: [29.6197, -95.6349],
    photo: '/Pictures/Farmvis.png',
    description: 'FarmVis Agricultural Data Innovation'
  },
  {
    id: 'woodlands',
    name: 'The Woodlands, Texas',
    locationLabel: 'Woodlands Community',
    coordinates: [30.1658, -95.4613],
    photo: '/Pictures/0E27520C-5137-4126-8FCC-2EFCA60A9E28_1_105_c.jpeg',
    description: 'Greater Houston Community Participants'
  },
  {
    id: 'london',
    name: 'London, UK',
    locationLabel: 'London Global Hub',
    coordinates: [51.5074, -0.1278],
    photo: '/Pictures/3E68B75C-2753-41C0-B656-F094FF86537F_1_105_c.jpeg',
    description: 'European Partner Community'
  },
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    locationLabel: 'Tokyo Global Hub',
    coordinates: [35.6762, 139.6503],
    photo: '/Pictures/6DDF95C2-C266-4423-9E35-CA7797CFB6AC_1_105_c.jpeg',
    description: 'Asia-Pacific Space Apps Collaborators'
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

interface PhotoPinProps {
  pin: LocationPin;
  isActive: boolean;
  onSelect: (pin: LocationPin) => void;
}

function PhotoPinMarker({ pin, isActive, onSelect }: PhotoPinProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);

  const localPos = useMemo(
    () => latLngToVector3(pin.coordinates[0], pin.coordinates[1], 1.27),
    [pin.coordinates]
  );

  const tempVec = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.getWorldPosition(tempVec);
      // Occlusion check: hide pins behind globe horizon
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

      {/* HTML Teardrop Photo Pin Drop without text labels */}
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
            onSelect(pin);
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`flex flex-col items-center group transition-transform duration-200 ${
            hovered || isActive ? 'scale-125 z-50' : 'scale-90 opacity-90 hover:opacity-100'
          }`}
        >
          {/* Yellow Teardrop Photo Pin Drop */}
          <div className="relative flex flex-col items-center">
            {/* Circular Photo Frame */}
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full p-[2px] transition-all duration-300 shadow-md ${
                hovered || isActive
                  ? 'bg-[#EAFE07] ring-4 ring-[#EAFE07]/40 shadow-[0_0_18px_#EAFE07]'
                  : 'bg-[#EAFE07]'
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

            {/* Downward Yellow Pin Point Teardrop Tip */}
            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-[#EAFE07] -mt-[1px]" />
          </div>

          {/* Clean Hover Tooltip */}
          {hovered && !isActive && (
            <div className="absolute -top-7 bg-[#050A1C]/95 text-white border border-[#EAFE07]/50 px-2 py-0.5 rounded text-[10px] font-['Fira_Sans_Condensed',sans-serif] font-bold uppercase tracking-wider whitespace-nowrap shadow-lg">
              {pin.name}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

function GlobeContent({
  activePinId,
  onSelectPin
}: {
  activePinId: string | null;
  onSelectPin: (pin: LocationPin) => void;
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

      {/* Main Globe Sphere - Zoomed Out Proportionately */}
      <Sphere args={[1.25, 64, 64]}>
        <meshStandardMaterial
          color="#081A38"
          emissive="#040D21"
          roughness={0.7}
          metalness={0.3}
        />
      </Sphere>

      {/* Latitude / Longitude Grid Wireframe */}
      <Sphere args={[1.254, 32, 24]}>
        <meshBasicMaterial color="#2E96F5" wireframe transparent opacity={0.16} />
      </Sphere>

      {/* Equatorial Highlight Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.256, 1.262, 64]} />
        <meshBasicMaterial color="#EAFE07" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Pin Markers */}
      {pinsData.map((pin) => (
        <PhotoPinMarker
          key={pin.id}
          pin={pin}
          isActive={activePinId === pin.id}
          onSelect={onSelectPin}
        />
      ))}
    </group>
  );
}

export const RotatingCommunityGlobe: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<LocationPin | null>(pinsData[0]);

  return (
    <div className="relative w-full h-[460px] md:h-[520px] lg:h-[560px] rounded-2xl overflow-hidden bg-[radial-gradient(ellipse_at_center,#0A1C3E_0%,#050A1C_85%)] border border-[#2E96F5]/30 shadow-[0_0_40px_rgba(46,150,245,0.12)]">
      {/* 3D Canvas - Camera set to distance 7.0 (Zoomed OUT) */}
      <Canvas camera={{ position: [0, 0, 7.0], fov: 38 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 8]} intensity={1.3} color="#ffffff" />
        <pointLight position={[-10, -8, -6]} intensity={0.5} color="#2E96F5" />

        <GlobeContent
          activePinId={selectedPin?.id || null}
          onSelectPin={(pin) => setSelectedPin(pin)}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Selected Location Details Card Overlay */}
      {selectedPin && (
        <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-[320px] bg-[#050A1C]/92 backdrop-blur-md border border-[#EAFE07]/40 rounded-xl p-3 shadow-2xl z-20 transition-all duration-300">
          <div className="flex items-center gap-3">
            <img
              src={selectedPin.photo}
              alt={selectedPin.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#EAFE07] flex-none"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/sac-logo-houston-transparent.png';
              }}
            />
            <div>
              <div className="font-['Fira_Sans_Condensed',sans-serif] text-[10px] font-bold tracking-widest text-[#EAFE07] uppercase">
                {selectedPin.locationLabel}
              </div>
              <h4 className="font-['Overpass',sans-serif] font-black text-white text-[15px] m-0">
                {selectedPin.name}
              </h4>
              <p className="text-[12px] text-white/80 m-0 font-light mt-0.5 leading-tight">
                {selectedPin.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Interaction Tag */}
      <div className="absolute top-4 left-4 bg-[#050A1C]/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#2E96F5]/30 text-[11px] font-['Fira_Sans_Condensed',sans-serif] font-bold tracking-wider text-[#2E96F5] uppercase">
        🌍 Drag to rotate globe · Click photo pins to explore
      </div>
    </div>
  );
};

export default RotatingCommunityGlobe;
