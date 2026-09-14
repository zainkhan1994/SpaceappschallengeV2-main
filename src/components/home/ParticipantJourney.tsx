import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { journey } from '../../data/homeData';

export const ParticipantJourney: React.FC = () => {
  return (
    <section data-screen-label="Journey" className="max-w-[1320px] mx-auto py-[clamp(64px,8vw,120px)] px-6">
      <ScrollReveal>
        <h2 className="m-0 mb-3.5 font-['Overpass',sans-serif] font-black text-[clamp(30px,4.2vw,54px)] uppercase leading-tight text-white">
          The participant <span className="text-[#2E96F5]">journey</span>
        </h2>
        <p className="m-0 mb-12 max-w-[680px] text-[19px] leading-relaxed text-white/78 font-light">
          Seven steps from signing up to submitting. You can track your progress on the official Space Apps website.
        </p>
      </ScrollReveal>

      <div className="relative">
        <svg
          aria-hidden="true"
          viewBox="0 0 54 1000"
          preserveAspectRatio="none"
          className="absolute left-0 top-7 w-[54px] h-[calc(100%-64px)] pointer-events-none"
        >
          <path
            d="M27 0 C4 150, 50 320, 27 480 C4 640, 50 820, 27 1000"
            fill="none"
            stroke="rgba(46,150,245,.55)"
            strokeWidth="14"
            opacity=".2"
            style={{ filter: 'blur(6px)' }}
          />
          <path
            d="M27 0 C4 150, 50 320, 27 480 C4 640, 50 820, 27 1000"
            fill="none"
            stroke="rgba(46,150,245,.7)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="6 9"
          />
        </svg>

        <ol className="list-none m-0 p-0 grid gap-[clamp(20px,2.6vw,34px)] relative">
          {journey.map((s, i) => (
            <ScrollReveal key={i}>
              <li className="relative flex gap-[clamp(16px,2.4vw,28px)] items-start">
                <span className="relative flex-none w-[54px] h-[54px] grid place-items-center rounded-full border border-[rgba(46,150,245,0.6)] bg-[radial-gradient(circle,rgba(46,150,245,0.3),rgba(3,8,20,0.96))] shadow-[0_0_0_7px_#050A1C,0_0_30px_rgba(46,150,245,0.4)]">
                  <span className="font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[19px] text-[#EAFE07] tabular-nums">
                    {s.num}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute -inset-2.5 rounded-full border border-dashed border-[rgba(234,254,7,0.3)] animate-[spin_24s_linear_infinite]"
                  >
                    <span className="absolute -top-0.75 left-1/2 w-1.5 h-1.5 -ml-0.75 rounded-full bg-[#EAFE07]" />
                  </span>
                </span>
                <div className="flex-1 min-w-0 pb-[clamp(16px,2vw,24px)] border-b border-white/10">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-2">
                    <span className="text-[clamp(19px,2.2vw,26px)] font-extrabold leading-tight text-white">{s.title}</span>
                    <span className="font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-bold tracking-widest uppercase text-[#EAFE07]">
                      {s.when}
                    </span>
                  </div>
                  <div className="text-[17px] leading-relaxed text-white/76 max-w-[720px]">{s.desc}</div>
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>

      <ScrollReveal className="mt-8">
        <a href="#/schedule" className="text-[18px] font-bold text-[#2E96F5] hover:text-[#EAFE07]">
          See the full 2026 timeline →
        </a>
      </ScrollReveal>
    </section>
  );
};

export default ParticipantJourney;
