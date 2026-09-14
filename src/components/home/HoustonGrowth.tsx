import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { growth } from '../../data/homeData';
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
              12 builders to <span className="text-[#2E96F5]">80</span>
            </h2>
            <p className="m-0 mb-8.5 max-w-[560px] text-[19px] leading-relaxed text-white/80 font-light">
              Houston has roughly tripled and then doubled again, growing from about 12 participants to 48 and then 80 — with teams travelling in from Katy, Sugar Land, Kingwood and across greater Houston, connecting with a global community of innovators.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative grid grid-cols-3 gap-[clamp(12px,2vw,24px)] items-end pt-12">
              {growth.map((g, i) => (
                <div key={i} className="relative flex flex-col justify-end gap-3.5 h-[150px] border-b border-white/18">
                  <div className="font-['Overpass',sans-serif] font-black text-[clamp(34px,4.6vw,62px)] leading-none tabular-nums" style={{ color: g.accent }}>
                    {g.n}
                  </div>
                  <div className="rounded-t-md opacity-50" style={{ height: g.bar, background: `linear-gradient(180deg, ${g.accent}, rgba(2,6,15,0))` }} />
                  <div className="absolute left-0 right-0 -bottom-8 font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-bold tracking-widest uppercase text-white/55 whitespace-nowrap">
                    {g.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <p className="mt-14 text-[15px] text-white/50">Approximate participant counts from previous Houston events.</p>
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
