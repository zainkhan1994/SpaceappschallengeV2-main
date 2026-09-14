import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { pathways } from '../../data/homeData';

export const GetInvolved: React.FC = () => {
  return (
    <section
      data-screen-label="Get Involved"
      className="relative py-[clamp(70px,8vw,124px)] px-6 bg-gradient-to-b from-transparent via-[rgba(228,55,0,0.08)] to-transparent"
    >
      <div className="max-w-[1180px] mx-auto">
        <div className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-extrabold tracking-widest uppercase text-[#EAFE07] mb-4.5">
          Five ways in
        </div>
        <ScrollReveal>
          <h2 className="m-0 mb-4 font-['Overpass',sans-serif] font-black text-[clamp(30px,4.2vw,56px)] leading-tight uppercase text-white">
            Get <span className="text-[#2E96F5]">involved</span>
          </h2>
          <p className="m-0 mb-[clamp(34px,4vw,52px)] max-w-[680px] text-[19px] leading-relaxed text-white/80 font-light">
            Open one to see what the role involves.
          </p>
        </ScrollReveal>

        <div className="grid gap-0 border-t border-white/14">
          {pathways.map((p, i) => (
            <ScrollReveal key={i}>
              <details className="group border-b border-white/14 py-[clamp(20px,2.4vw,30px)] px-1 transition-colors duration-300 hover:bg-[rgba(46,150,245,0.06)]">
                <summary className="cursor-pointer list-none flex items-center gap-[clamp(16px,2.4vw,30px)] select-none">
                  <span className="flex-none font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[clamp(15px,1.5vw,18px)] tracking-wider text-white/35 tabular-nums">
                    {p.num}
                  </span>
                  <span
                    className="flex-1 min-w-0 font-['Overpass',sans-serif] font-black text-[clamp(24px,3.4vw,44px)] leading-tight uppercase"
                    style={{ color: p.accent }}
                  >
                    {p.title}
                  </span>
                  <span className="flex-none text-[15px] font-semibold text-white/50">{p.tag}</span>
                </summary>
                <div className="pt-4 pb-1 pl-[clamp(38px,5vw,66px)] max-w-[820px]">
                  <p className="m-0 text-[18px] leading-relaxed text-white/84">{p.desc}</p>
                  <p className="mt-3 m-0 text-[17px] leading-relaxed font-semibold" style={{ color: p.accent }}>
                    {p.goal}
                  </p>
                  <a
                    href={p.href}
                    target={p.href.startsWith('http') || p.href.startsWith('mailto') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="mt-4.5 inline-block text-[17px] font-bold text-[#2E96F5] hover:text-[#EAFE07]"
                  >
                    {p.cta} →
                  </a>
                </div>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
