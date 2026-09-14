import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { basics } from '../../data/homeData';

export const WhatIsSpaceApps: React.FC = () => {
  return (
    <section data-screen-label="What is Space Apps" className="max-w-[1320px] mx-auto py-[clamp(64px,8vw,120px)] px-6">
      <ScrollReveal>
        <h2 className="m-0 mb-3.5 font-['Overpass',sans-serif] font-black text-[clamp(30px,4.2vw,54px)] leading-tight uppercase text-white">
          What is the
          <br />
          <span className="text-[#2E96F5]">Space Apps Challenge?</span>
        </h2>
        <p className="m-0 mb-12 max-w-[680px] text-[19px] leading-relaxed text-white/78 font-light">
          The largest annual global hackathon — engaging NASA and Space Agency Partners' free and open data to address real-world challenges on Earth and in space. Houston is one of hundreds of Local Events happening the same weekend worldwide.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {basics.map((b, i) => (
          <ScrollReveal key={i}>
            <div className="h-full border border-[rgba(46,150,245,0.3)] rounded-2xl p-7 bg-gradient-to-br from-[rgba(46,150,245,0.12)] to-[rgba(7,23,63,0.45)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2E96F5]">
              <div className="font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[20px] tracking-widest text-[#EAFE07] mb-3.5 text-center">
                {b.k}
              </div>
              <p className="m-0 text-[17px] leading-relaxed text-white/85">{b.v}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default WhatIsSpaceApps;
