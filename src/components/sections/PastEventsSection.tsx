import React, { useEffect, useRef } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { pastStats, videos } from '../../data/pastEventsData';
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
          Celebrating Houston's space innovators, event videos, and historical achievements.
        </p>
      </section>

      {/* Video Showcase Section (SavetheDate.mp4 & SACHoustonIntro.mp4) */}
      <section className="max-w-[1320px] mx-auto px-6 pb-[clamp(56px,7vw,96px)]">
        <ScrollReveal>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <div className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-extrabold tracking-widest uppercase text-[#EAFE07] mb-1">
                Featured Videos
              </div>
              <h2 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(24px,3vw,38px)] uppercase text-white">
                Space Apps Houston Event Teaser &amp; Highlights
              </h2>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden border border-[#2E96F5]/40 bg-[#050A1C] shadow-2xl group">
              <div className="relative aspect-video w-full bg-black">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster="/Pictures/StudentCenterNorth.jpg"
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/SavetheDate.mp4" type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>
              </div>
              <div className="p-5 bg-white/[0.03]">
                <h3 className="font-['Overpass',sans-serif] font-bold text-white text-[18px] m-0 mb-1">
                  Save The Date Teaser
                </h3>
                <p className="text-[14px] text-white/70 m-0 font-light">
                  Official Space Apps Challenge Announcement &amp; Event Teaser.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden border border-[#EAFE07]/40 bg-[#050A1C] shadow-2xl group">
              <div className="relative aspect-video w-full bg-black">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster="/Pictures/Student Center South.jpg"
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/SACHoustonIntro.mp4" type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>
              </div>
              <div className="p-5 bg-white/[0.03]">
                <h3 className="font-['Overpass',sans-serif] font-bold text-white text-[18px] m-0 mb-1">
                  Houston Event Intro &amp; Community Showcase
                </h3>
                <p className="text-[14px] text-white/70 m-0 font-light">
                  Space Apps Houston Hackathon Experience &amp; Community Introduction.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
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
    </div>
  );
};

export default PastEventsSection;
