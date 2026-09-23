import React, { useEffect, useRef } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { pastStats } from '../../data/pastEventsData';
import HoustonWinners from '../home/HoustonWinners';

export const PastEventsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const counters = section.querySelectorAll<HTMLElement>('[data-count]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = +(el.dataset.count || '0');
            const t0 = performance.now();
            const dur = reduce ? 1 : 1900;

            const step = (now: number) => {
              const p = Math.min(1, (now - t0) / dur);
              const e = 1 - Math.pow(1 - p, 4);
              el.textContent = Math.round(target * e).toLocaleString('en-US');
              if (p < 1) requestAnimationFrame(step);
            };

            requestAnimationFrame(step);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((c) => observer.observe(c));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      <section data-screen-label="Past events hero" className="max-w-[1320px] mx-auto pt-[clamp(48px,6vw,88px)] px-6 pb-[clamp(32px,4vw,48px)]">
        <p className="m-0 mb-3.5 font-['Fira_Sans_Condensed',sans-serif] font-bold text-[14px] tracking-widest uppercase text-[#EAFE07]">
          Archive &amp; Highlights
        </p>
        <h1 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(38px,6.4vw,86px)] leading-none uppercase text-white">
          Past events
          <br />
          <span className="text-[#2E96F5]">&amp; winners</span>
        </h1>
        <p className="mt-[1.625rem] m-0 max-w-[720px] text-[20px] leading-relaxed text-white/80 font-light">
          Houston's Global Nominees, and how the global program has grown.
        </p>
      </section>

      {/* Official Houston 2024 Winners (Global Nominees) */}
      <HoustonWinners />

      {/* 2024 Global Stats */}
      <section className="max-w-[1320px] mx-auto px-6 pb-[clamp(56px,7vw,96px)]">
        <ScrollReveal>
          <h2 className="m-0 mb-2.5 font-['Overpass',sans-serif] font-black text-[clamp(24px,3vw,38px)] uppercase text-white">
            2024 global participation
          </h2>
          <p className="m-0 mb-11 text-[17px] text-white/65">
            The highest participation numbers since the program's founding in 2012.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1.125rem]">
          {pastStats.map((s, i) => (
            <ScrollReveal key={i}>
              <div className="border border-white/13 rounded-2xl p-[1.625rem] bg-white/[0.03]">
                <div className="font-['Overpass',sans-serif] font-black text-[clamp(30px,3.4vw,44px)] leading-none text-[#2E96F5] tabular-nums">
                  <span data-count={s.n}>0</span>
                </div>
                <div className="mt-2.5 text-[14px] font-semibold tracking-wider uppercase text-white/65">{s.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-11">
          <figure className="m-0">
            <img
              src="/Pictures/TheGrowthofNASASpaceApps.png"
              alt="Chart showing the growth of NASA Space Apps participation over time"
              className="w-full h-auto rounded-2xl border border-white/16 block"
            />
            <figcaption className="mt-3 text-[14px] text-white/55">
              The growth of NASA Space Apps — published by the global program.
            </figcaption>
          </figure>
        </ScrollReveal>
      </section>

    </div>
  );
};

export default PastEventsSection;
