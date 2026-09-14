import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { frontDoor } from '../../data/homeData';

export const FrontDoorToNASA: React.FC = () => {
  return (
    <section
      data-screen-label="Front Door to NASA"
      className="relative overflow-hidden py-[clamp(76px,9vw,140px)] px-6 bg-gradient-to-b from-[#02060F] via-[#08193A] to-[#02060F]"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 620"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full opacity-55 pointer-events-none"
      >
        <g fill="none">
          <ellipse cx="600" cy="640" rx="820" ry="470" stroke="rgba(46,150,245,.3)" strokeWidth="1" />
          <ellipse cx="600" cy="700" rx="620" ry="420" stroke="rgba(46,150,245,.18)" strokeWidth="1" />
          <ellipse cx="600" cy="760" rx="420" ry="380" stroke="rgba(234,254,7,.14)" strokeWidth="1" />
          <path d="M0 96 H1200" stroke="rgba(255,255,255,.06)" />
          <path d="M0 524 H1200" stroke="rgba(255,255,255,.06)" />
        </g>
      </svg>

      <div className="relative max-w-[1320px] mx-auto">
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-5 font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-bold tracking-widest uppercase">
          <span className="text-[#EAFE07]">Houston vision</span>
          <span className="w-13 h-px bg-[rgba(234,254,7,0.5)]" />
          <span className="text-white/55 tabular-nums">HOU · 29.5502° N 95.0972° W</span>
        </div>

        <ScrollReveal>
          <h2 className="m-0 max-w-[1000px] font-['Overpass',sans-serif] font-black text-[clamp(34px,5.6vw,78px)] leading-none uppercase text-white">
            The front door to <span className="text-[#2E96F5]">NASA</span>
          </h2>
          <p className="mt-6 m-0 max-w-[760px] text-[clamp(18px,1.8vw,22px)] leading-relaxed text-white/84 font-light">
            Space Apps Houston should be more than a weekend hackathon. Houston is the home of Johnson Space Center and human spaceflight, and this event is meant to be the door participants walk through to reach it — exposure to NASA and JSC, to internships and fellowships, to aerospace careers, and to the people already building in the local space ecosystem.
          </p>
        </ScrollReveal>

        <div className="mt-[clamp(40px,5vw,64px)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t border-b border-[rgba(46,150,245,0.4)]">
          {frontDoor.map((d, i) => (
            <ScrollReveal key={i}>
              <div className="h-full p-[clamp(24px,2.6vw,34px)_clamp(18px,2vw,28px)] border-l border-[rgba(46,150,245,0.22)] transition-colors duration-350 hover:bg-[rgba(46,150,245,0.1)]">
                <div className="font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[13px] tracking-widest text-white/40 mb-3.5 tabular-nums">
                  {d.num}
                </div>
                <h3 className="m-0 mb-2.5 font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[clamp(19px,2vw,24px)] uppercase tracking-wide" style={{ color: d.accent }}>
                  {d.title}
                </h3>
                <p className="m-0 text-[16px] leading-relaxed text-white/78">{d.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrontDoorToNASA;
