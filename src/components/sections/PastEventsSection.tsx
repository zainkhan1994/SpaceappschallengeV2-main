import React, { useEffect, useRef } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { pastStats, videos } from '../../data/pastEventsData';

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
          Archive
        </p>
        <h1 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(38px,6.4vw,86px)] leading-none uppercase text-white">
          Past events
          <br />
          <span className="text-[#2E96F5]">&amp; results</span>
        </h1>
        <p className="mt-6.5 m-0 max-w-[720px] text-[20px] leading-relaxed text-white/80 font-light">
          Everything on this page is historical and labelled by year. For current information, see{' '}
          <a href="#/" className="text-[#2E96F5] hover:text-[#EAFE07]">
            the 2026 homepage
          </a>
          .
        </p>
      </section>

      {/* 2024 Global Stats */}
      <section className="max-w-[1320px] mx-auto px-6 pb-[clamp(56px,7vw,96px)]">
        <ScrollReveal className="flex flex-wrap gap-3 mb-11">
          <span className="border border-white/20 rounded-full px-5.5 py-2.5 text-[16px] font-semibold text-white/75">
            2025 · October 4–5
          </span>
          <span className="border border-white/20 rounded-full px-5.5 py-2.5 text-[16px] font-semibold text-white/75">
            2024 · global figures below
          </span>
        </ScrollReveal>

        <ScrollReveal>
          <h2 className="m-0 mb-2.5 font-['Overpass',sans-serif] font-black text-[clamp(24px,3vw,38px)] uppercase text-white">
            2024 global participation
          </h2>
          <p className="m-0 mb-11 text-[17px] text-white/65">
            The highest participation numbers since the program's founding in 2012.{' '}
            <span className="text-[#EAFE07]">These figures are pending verification against NASA's published totals.</span>
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4.5">
          {pastStats.map((s, i) => (
            <ScrollReveal key={i}>
              <div className="border border-white/13 rounded-2xl p-6.5 bg-white/[0.03]">
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

      {/* 2024 Highlight Videos */}
      <section className="py-[clamp(56px,7vw,104px)] px-6 bg-gradient-to-b from-transparent via-[rgba(0,66,166,0.2)] to-transparent">
        <div className="max-w-[1320px] mx-auto">
          <ScrollReveal>
            <h2 className="m-0 mb-2.5 font-['Overpass',sans-serif] font-black text-[clamp(24px,3vw,38px)] uppercase text-white">
              2024 highlight videos
            </h2>
            <p className="m-0 mb-9 text-[17px] text-white/65">Published by the global NASA Space Apps program.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {videos.map((v, i) => (
              <ScrollReveal key={i}>
                <div className="aspect-video rounded-2xl overflow-hidden border border-white/16 bg-black">
                  <iframe
                    src={v}
                    title="NASA Space Apps 2024 highlight video"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full border-0 block"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Houston Winners Placeholder */}
      <section className="max-w-[1320px] mx-auto py-[clamp(56px,7vw,104px)] px-6">
        <ScrollReveal>
          <h2 className="m-0 mb-2.5 font-['Overpass',sans-serif] font-black text-[clamp(24px,3vw,38px)] uppercase text-white">
            Houston winners
          </h2>
          <div className="border-2 dashed border-white/24 rounded-2xl p-[clamp(28px,4vw,40px)] bg-white/[0.03]">
            <div className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-extrabold tracking-widest uppercase text-white/60 mb-3">
              Coming soon
            </div>
            <p className="m-0 max-w-[680px] text-[18px] leading-relaxed text-white/80">
              A verified list of past Houston winning teams and their projects is being assembled from the official Space Apps project archive. We'd rather leave this blank than publish something unconfirmed.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default PastEventsSection;
