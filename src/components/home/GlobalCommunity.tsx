import React, { useEffect, useRef } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { stats } from '../../data/homeData';

export const GlobalCommunity: React.FC = () => {
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
    <section
      ref={sectionRef}
      data-screen-label="Global community"
      className="py-[clamp(64px,8vw,112px)] px-6 bg-gradient-to-b from-transparent via-[rgba(0,66,166,0.2)] to-transparent"
    >
      <div className="max-w-[1180px] mx-auto">
        <ScrollReveal>
          <h2 className="m-0 mb-2.5 text-center font-['Overpass',sans-serif] font-black text-[clamp(26px,3.4vw,44px)] uppercase text-white">
            The global community
          </h2>
          <p className="mt-0 mx-auto mb-14.5 max-w-[620px] text-center text-[17px] text-white/65 font-light">
            Figures from the 2024 challenge — the most recent published totals.{' '}
            <span className="text-[#EAFE07]">Pending verification against NASA's current published numbers.</span>
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-[clamp(30px,6vw,70px)] text-center">
          {stats.map((s, i) => (
            <ScrollReveal key={i}>
              <div>
                <div
                  className="font-['Overpass',sans-serif] font-black text-[clamp(44px,7vw,92px)] leading-none tabular-nums"
                  style={{ color: s.color }}
                >
                  <span data-count={s.n}>0</span>
                </div>
                <div className="mt-3 text-[13px] font-semibold tracking-widest uppercase text-white/60">
                  {s.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-11 text-center">
          <a href="#/past-events" className="text-[18px] font-bold text-[#2E96F5] hover:text-[#EAFE07]">
            Past events, winners &amp; videos →
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default GlobalCommunity;
