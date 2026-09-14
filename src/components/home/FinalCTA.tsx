import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';

export const FinalCTA: React.FC = () => {
  return (
    <section data-screen-label="Final CTA" className="relative overflow-hidden py-[clamp(72px,9vw,140px)] px-6 text-center">
      <div className="absolute left-1/2 top-1/2 w-[min(120vw,1000px)] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(46,150,245,0.2),transparent_62%)] pointer-events-none" />

      <div className="relative max-w-[860px] mx-auto">
        <ScrollReveal>
          <h2 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(36px,6.2vw,84px)] leading-none uppercase bg-gradient-to-r from-[#2E96F5] via-[#EAFE07] to-[#2E96F5] bg-[length:200%_auto] bg-clip-text text-transparent animate-[pulse_7s_linear_infinite]">
            Build with us
          </h2>
          <p className="mt-6 mx-auto mb-0 max-w-[600px] text-[20px] leading-relaxed text-white/82 font-light">
            November 14–15, 2026 in Houston. Free to attend, teams of 1–6, all skill levels.
          </p>
          <div className="mt-8.5 flex flex-wrap gap-4 justify-center">
            <a
              href="https://www.spaceappschallenge.org/2026/local-events/houston/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-11 py-4.5 rounded-xl bg-[#2E96F5] text-[#04122F] font-extrabold text-[20px] shadow-[0_10px_40px_rgba(46,150,245,0.4)] transition-all hover:bg-[#5FB4FF] hover:-translate-y-0.5"
            >
              Register
            </a>
            <a
              href="mailto:zain@nasaspaceappschallenge.org"
              className="px-8 py-4.5 rounded-xl border border-white/35 text-white font-bold text-[20px] transition-all hover:border-[#EAFE07] hover:text-[#EAFE07]"
            >
              Email the Houston team
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FinalCTA;
