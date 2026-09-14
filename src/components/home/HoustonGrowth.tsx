import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import RotatingCommunityGlobe from './RotatingCommunityGlobe';

export const HoustonGrowth: React.FC = () => {
  return (
    <section data-screen-label="Houston growth" className="relative overflow-hidden py-[clamp(70px,8vw,124px)] px-6">
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[clamp(34px,5vw,72px)] items-center">
        <div>
          <div className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-extrabold tracking-widest uppercase text-[#EAFE07] mb-4.5">
            Community Growth &amp; Global Footprint
          </div>
          <ScrollReveal>
            <h2 className="m-0 mb-5 font-['Overpass',sans-serif] font-black text-[clamp(30px,4.2vw,56px)] leading-tight uppercase text-white">
              Global Space <span className="text-[#2E96F5]">Agencies</span>
            </h2>
            <p className="m-0 mb-6 max-w-[560px] text-[19px] leading-relaxed text-white/80 font-light">
              NASA Space Apps is led by NASA in collaboration with space agencies worldwide. Together, international space agencies contribute open scientific data, host local events, and join the global judging process.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="relative w-full">
            <RotatingCommunityGlobe />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HoustonGrowth;
