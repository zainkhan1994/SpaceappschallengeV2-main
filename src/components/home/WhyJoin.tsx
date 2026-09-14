import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { benefits } from '../../data/homeData';

export const WhyJoin: React.FC = () => {
  return (
    <section data-screen-label="Why Join" className="py-[clamp(64px,8vw,120px)] px-6 bg-gradient-to-b from-transparent via-[rgba(0,66,166,0.22)] to-transparent">
      <div className="max-w-[1320px] mx-auto">
        <ScrollReveal>
          <h2 className="m-0 mb-3.5 font-['Overpass',sans-serif] font-black text-[clamp(30px,4.2vw,54px)] uppercase leading-tight text-white">
            Why join Space Apps <span className="text-[#EAFE07]">Houston?</span>
          </h2>
          <p className="m-0 mb-12 max-w-[680px] text-[19px] leading-relaxed text-white/78 font-light">
            Discover the benefits and opportunities that await you at Houston's premier space hackathon.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
          {benefits.map((b, i) => (
            <ScrollReveal key={i}>
              <div className="relative overflow-hidden border border-white/14 rounded-2xl p-7 bg-white/[0.03] transition-all duration-400 hover:-translate-y-1.5 hover:bg-[rgba(46,150,245,0.09)] hover:border-[rgba(46,150,245,0.5)]">
                <div className="absolute -top-8.5 -right-8.5 w-[110px] h-[110px] rounded-full border border-dashed border-[rgba(46,150,245,0.3)] animate-[spin_26s_linear_infinite]">
                  <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full" style={{ backgroundColor: b.dot }} />
                </div>
                <h3 className="m-0 mb-3 font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[22px] uppercase tracking-wide" style={{ color: b.dot }}>
                  {b.title}
                </h3>
                <p className="m-0 text-[16px] leading-relaxed text-white/80">{b.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;
