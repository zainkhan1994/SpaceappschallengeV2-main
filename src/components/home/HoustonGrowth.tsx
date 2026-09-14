import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { growth } from '../../data/homeData';

export const HoustonGrowth: React.FC = () => {
  return (
    <section data-screen-label="Houston growth" className="relative overflow-hidden py-[clamp(70px,8vw,124px)] px-6">
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[clamp(34px,5vw,72px)] items-center">
        <div>
          <div className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-extrabold tracking-widest uppercase text-[#EAFE07] mb-4.5">
            Community growth
          </div>
          <ScrollReveal>
            <h2 className="m-0 mb-5 font-['Overpass',sans-serif] font-black text-[clamp(30px,4.2vw,56px)] leading-tight uppercase text-white">
              12 builders to <span className="text-[#2E96F5]">80</span>
            </h2>
            <p className="m-0 mb-8.5 max-w-[560px] text-[19px] leading-relaxed text-white/80 font-light">
              Houston has roughly tripled and then doubled again, growing from about 12 participants to 48 and then 80 — with teams travelling in from Katy, Sugar Land, Kingwood and across greater Houston.
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
          <div className="relative">
            <svg viewBox="0 0 460 460" role="img" aria-label="Schematic map of greater Houston showing the 610 loop, radial freeways, and communities the event draws from" className="w-full h-auto block">
              <g fill="none" strokeLinecap="round">
                <circle cx="230" cy="230" r="208" stroke="rgba(46,150,245,.14)" />
                <circle cx="230" cy="230" r="150" stroke="rgba(46,150,245,.2)" strokeDasharray="3 7" />
                <path d="M230 46 L230 414 M46 230 L414 230" stroke="rgba(255,255,255,.05)" />
                <path d="M120 96 L340 96 M120 364 L340 364" stroke="rgba(255,255,255,.04)" />
                <path d="M230 20 L230 106 M230 354 L230 440 M20 230 L106 230 M354 230 L440 230 M96 96 L156 156 M364 364 L304 304 M364 96 L304 156 M96 364 L156 304" stroke="rgba(46,150,245,.45)" strokeWidth="2" />
                <rect x="178" y="178" width="104" height="104" rx="34" stroke="#2E96F5" strokeWidth="3" />
                <rect x="178" y="178" width="104" height="104" rx="34" stroke="#2E96F5" strokeWidth="10" opacity=".18" style={{ filter: 'blur(6px)' }} />
              </g>
              <g fill="#EAFE07">
                <circle cx="230" cy="230" r="5" />
                <circle cx="60" cy="214" r="4" />
                <circle cx="152" cy="392" r="4" />
                <circle cx="344" cy="66" r="4" />
              </g>
              <g fill="rgba(255,255,255,.72)" fontFamily="Fira Sans Condensed, sans-serif" fontSize="15" fontWeight="700" letterSpacing="1.4">
                <text x="230" y="212" textAnchor="middle" fill="#EAFE07">HOU</text>
                <text x="60" y="200" textAnchor="middle">KATY</text>
                <text x="152" y="414" textAnchor="middle">SUGAR LAND</text>
                <text x="344" y="52" textAnchor="middle">KINGWOOD</text>
              </g>
            </svg>
            <div className="mt-3.5 font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-bold tracking-widest uppercase text-white/45 text-center sm:text-left">
              Greater Houston — schematic, not to scale
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HoustonGrowth;
