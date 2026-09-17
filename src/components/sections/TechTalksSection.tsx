import React, { useEffect, useRef, useState } from 'react';
import { Globe, Lightbulb, PenTool, Users } from 'lucide-react';
import '../tech-talks/techTalks.css';
import { REDUCED_MOTION, useScrollProgress } from '../tech-talks/useScrollProgress';
import { ScrollReveal } from '../ui/ScrollReveal';
import { TechTalk, techTalks2023, techTalks2024, techTalks2025, techTalks2026 } from '../../data/techTalksData';
import { challengePosters } from '../../data/challengePosters';

// Imagery: stage, staircase, lunar horizon and Earth (hero) supplied by Space Apps Houston.
// NASA, public domain (images.nasa.gov): Moon GSFC_20171208_Archive_e001861 (LRO) · Mars PIA00407 (Viking) ·
// SLS Block 1B illustration B1B_Crew_OML · software jsc2022e090102 · mission planning jsc2026e019242 ·
// hardware KSC-20260721-PH-JBS01_0014 · Artemis II crew patch jsc2025e034457 · spacewalk iss038e020234 (join art).
// Rotating globe rendered from NASA Visible Earth: Blue Marble Next Generation, Black Marble 2016, cloud_combined.
// Houston skyline (join art): Carol M. Highsmith Archive, Library of Congress (no known restrictions).
// Neon arcs, Space Apps Houston logo and challenge posters supplied by Space Apps Houston.

type VarStyle = React.CSSProperties & Record<`--${string}`, string | number>;

const STORY = '/tech-talks/story';

/* ---------------------------------------------------------------- shared */

const LabelRow: React.FC<{ label: string; className?: string }> = ({ label, className = '' }) => (
  <div className={`flex items-center gap-5 ${className}`}>
    <span className="tt-mono whitespace-nowrap text-[12px] text-white/80">{label}</span>
    <span className="h-px flex-1 bg-white/25" />
    <span className="flex items-center gap-2" aria-hidden="true">
      <i className="block h-2 w-2 rounded-full bg-[#EAFE07]" />
      <i className="block h-2 w-2 rounded-full bg-[#2E96F5]" />
      <i className="block h-2 w-2 rounded-full bg-[#E43700]" />
    </span>
  </div>
);

/* ---------------------------------------------------------------- 1. hero: the people you heard from */

const ROLES = ['Technologists', 'Astronauts', 'Engineers', 'Physicians', 'Professors'];
/** SLS slices, nose to engines; heights in px so the stages stack flush. One stage lands per role, bottom first. */
const ROCKET = [360, 414, 210, 456, 436];
const ROLE_START = 0.22;
const ROLE_STEP = 0.14;

const Hero: React.FC = () => {
  const ref = useScrollProgress<HTMLElement>('pin');

  return (
    <section ref={ref} className="tt-hero" aria-labelledby="tt-title">
      <div className="tt-stick">
        <div className="tt-h-moon" aria-hidden="true" />
        <div className="tt-stars" aria-hidden="true" />
        <img className="tt-h-earth" src={`${STORY}/earth.webp`} alt="" />
        <img className="tt-h-stair" src={`${STORY}/staircase.webp`} alt="" />
        <img className="tt-h-stage" src={`${STORY}/stage.webp`} alt="" />
        <p className="tt-h-cue tt-mono m-0" aria-hidden="true">
          NASA Tech Talks <span className="tt-h-arrow">↓</span>
        </p>
        <div className="tt-h-copy">
          <h1 id="tt-title" className="tt-h-title m-0">
            Every 4th Thursday of the month, at NASA Tech Talks you heard directly from
          </h1>
        </div>
        <div className="tt-crew">
          <ol className="tt-crew-roles m-0 list-none p-0">
            {ROLES.map((role, i) => (
              <li key={role} className="tt-q tt-crew-role" style={{ '--s': ROLE_START + i * ROLE_STEP, '--k': 9 } as VarStyle}>
                {role}
              </li>
            ))}
          </ol>
          <div className="tt-crew-rocket" aria-hidden="true">
            {ROCKET.map((h, i) => (
              <img
                key={h}
                className="tt-q tt-crew-stage"
                src={`${STORY}/rocket-${i + 1}.webp`}
                width={302}
                height={h}
                alt=""
                style={{ '--s': ROLE_START + (ROCKET.length - 1 - i) * ROLE_STEP, '--k': 9 } as VarStyle}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 2. the bottlenecks, blur to focus */

const BlurLines: React.FC<{ lines: string[] }> = ({ lines }) => {
  const ref = useScrollProgress<HTMLElement>('pin');
  return (
    <section ref={ref} className="tt-focus">
      <div className="tt-stick flex flex-col items-center justify-center px-5 text-center">
        <div className="tt-stars" aria-hidden="true" />
        <h2 className="tt-display relative m-0 text-[clamp(34px,6.6vw,104px)] leading-[1.04]">
          {lines.map((l, i) => (
            <span
              key={l}
              className={`tt-q tt-focus-line${i === lines.length - 1 ? ' is-last text-[#EAFE07]' : ''}`}
              style={{ '--s': 0.05 + i * 0.22, '--k': 4 } as VarStyle}
            >
              {l}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 3. sustained presence */

const SUSTAIN: { text: string; s: number; accent?: boolean }[] = [
  { text: 'Sustained presence', s: 0.02 },
  { text: 'on the Moon', s: 0.1 },
  { text: 'and Mars', s: 0.18 },
  { text: 'requires software,', s: 0.34 },
  { text: 'mission planning,', s: 0.44 },
  { text: 'and hardware solutions', s: 0.54 },
  { text: 'NASA can’t build alone.', s: 0.68, accent: true }
];

const ELEMENTS = [
  { src: 'el-software.jpg', label: 'Software', s: 0.36 },
  { src: 'el-planning.jpg', label: 'Mission planning', s: 0.46 },
  { src: 'el-hardware.jpg', label: 'Hardware', s: 0.56 }
];

/** International partners building Artemis hardware alongside NASA (Orion, Gateway, lunar surface habitation). */
const PARTNERS = [
  { src: '/esa-logo.png', name: 'European Space Agency' },
  { src: '/jaxa-logo.png', name: 'Japan Aerospace Exploration Agency' },
  { src: '/canadian-space-agency-logo.png', name: 'Canadian Space Agency' },
  { src: '/mbrsc-logo.png', name: 'Mohammed Bin Rashid Space Centre' },
  { src: '/asi-italy-logo.png', name: 'Italian Space Agency' }
];

const Sustain: React.FC = () => {
  const ref = useScrollProgress<HTMLElement>('pin');

  return (
    <section ref={ref} className="tt-sus" aria-labelledby="tt-sus-title">
      <div className="tt-stick">
        <div className="tt-stars" aria-hidden="true" />
        <div className="tt-sus-visual">
          <img className="tt-fx tt-fx-moon" src={`${STORY}/moon-disk.webp`} alt="" style={{ '--s': 0.1, '--e': 0.32 } as VarStyle} />
          <img className="tt-fx tt-fx-mars" src={`${STORY}/mars-disk.webp`} alt="" style={{ '--s': 0.18, '--e': 0.32 } as VarStyle} />
          {ELEMENTS.map((el, i) => (
            <figure key={el.label} className={`tt-fx tt-fx-el is-${i}`} style={{ '--s': el.s, '--e': 0.64 } as VarStyle} aria-hidden="true">
              <img src={`${STORY}/${el.src}`} alt="" loading="lazy" />
              <figcaption className="tt-mono">{el.label}</figcaption>
            </figure>
          ))}
          <div className="tt-fx-partners">
            <div className="tt-fx-lead">
              <img className="tt-fx-item tt-fx-nasa" src="/nasa-logo.png" alt="NASA" style={{ '--s': 0.72 } as VarStyle} />
              <img
                className="tt-fx-item tt-fx-patch"
                src={`${STORY}/artemis-ii-patch.webp`}
                alt="Artemis II crew patch"
                loading="lazy"
                style={{ '--s': 0.77 } as VarStyle}
              />
            </div>
            <p className="tt-fx-item tt-mono m-0 text-[10px] text-white/55" style={{ '--s': 0.8 } as VarStyle}>
              With Artemis partners
            </p>
            <div className="tt-fx-row">
              {PARTNERS.map((p, i) => (
                <img key={p.name} className="tt-fx-item tt-fx-partner" src={p.src} alt={p.name} loading="lazy" style={{ '--s': 0.82 + i * 0.025 } as VarStyle} />
              ))}
            </div>
          </div>
        </div>
        <h2 id="tt-sus-title" className="tt-sus-text m-0">
          {SUSTAIN.map((line, i) => (
            <span
              key={line.text}
              className={`tt-q tt-sus-line${line.accent ? ' is-accent' : ''}`}
              style={{ '--s': line.s, '--k': 8, '--n': SUSTAIN[i + 1]?.s ?? 2 } as VarStyle}
            >
              <span>{line.text} </span>
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 4. take what you have learned */

const LEARNED = [
  'Take what you have learned,',
  'form a team,',
  'and prove your solution in 48 hours',
  'at the NASA International Space Apps Challenge.'
];

const Learned: React.FC = () => {
  const ref = useScrollProgress<HTMLElement>('pin');
  const video = useRef<HTMLVideoElement>(null);
  const [still] = useState(() => typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION).matches);

  // play only while the section is on screen; browsers can leave an off-screen autoplay video paused
  useEffect(() => {
    const el = ref.current;
    const v = video.current;
    if (!el || !v || still) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) v.play().catch(() => undefined);
      else v.pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, still]);

  return (
    <section ref={ref} className="tt-learn" aria-labelledby="tt-learn-title">
      <div className="tt-stick">
        <div className="tt-stars" aria-hidden="true" />
        <video
          ref={video}
          className="tt-learn-globe"
          autoPlay={!still}
          muted
          loop
          playsInline
          preload={still ? 'none' : 'metadata'}
          poster={`${STORY}/globe-poster.jpg`}
          aria-hidden="true"
        >
          <source src={`${STORY}/globe-900.mp4`} type="video/mp4" media="(min-width: 900px)" />
          <source src={`${STORY}/globe-720.mp4`} type="video/mp4" />
        </video>
        <h2 id="tt-learn-title" className="tt-learn-text m-0">
          {LEARNED.map((line, i) => (
            <span
              key={line}
              className={`tt-q tt-learn-line${i === LEARNED.length - 1 ? ' is-accent' : ''}`}
              style={{ '--s': 0.04 + i * 0.16, '--k': 6 } as VarStyle}
            >
              {line}{' '}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 5. join Space Apps (two frames) */

const JOIN_VERBS = [
  { Icon: Users, label: 'Collaborate' },
  { Icon: Lightbulb, label: 'Innovate' },
  { Icon: Globe, label: 'Solve' },
  { Icon: PenTool, label: 'Create' }
];

const Join: React.FC = () => {
  const ref = useScrollProgress<HTMLElement>('pin');

  // the second frame takes clicks once it is on screen (it stays in the tab order for keyboard users)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const sync = () => {
      raf = 0;
      el.classList.toggle('is-second', parseFloat(el.style.getPropertyValue('--p') || '0') >= 0.5);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(sync);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      cancelAnimationFrame(raf);
    };
  }, [ref]);

  return (
    <section ref={ref} className="tt-join" aria-labelledby="tt-join-title">
      <div className="tt-stick">
        <picture>
          <source media="(min-width: 900px)" srcSet={`${STORY}/cta-desktop.jpg`} />
          <img className="tt-join-bg" src={`${STORY}/cta-mobile.jpg`} alt="" />
        </picture>
        <h2 id="tt-join-title" className="sr-only">
          Join the NASA Space Apps Challenge
        </h2>
        <ul className="tt-join-list is-left tt-mono" aria-hidden="true">
          <li>People</li>
          <li>Ideas</li>
          <li>Data</li>
          <li>Community</li>
        </ul>
        <ul className="tt-join-list is-right tt-mono" aria-hidden="true">
          <li>Local</li>
          <li>Solutions</li>
          <li>Global</li>
          <li>Impact</li>
        </ul>
        <div className="tt-join-frame is-1" aria-hidden="true">
          <p className="tt-join-title m-0">
            Join the NASA
            <br />
            Space Apps
            <br />
            Challenge
          </p>
          <span className="tt-join-arrow">→</span>
        </div>
        <div className="tt-join-frame is-2">
          <img className="tt-join-logo" src="/sac-logo-houston-transparent.png" alt="NASA Space Apps Houston" />
          <p className="tt-join-meta tt-mono m-0">November 14–15, 2026 · 48 hours · Houston</p>
          <a href="#/" className="tt-join-btn tt-mono">
            Be part of it <span aria-hidden="true">→</span>
          </a>
        </div>
        <ul className="tt-join-verbs m-0 list-none p-0">
          {JOIN_VERBS.map(({ Icon, label }) => (
            <li key={label}>
              <Icon aria-hidden="true" strokeWidth={1.25} />
              <span className="tt-mono">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 6. what happens */

const WhatHappens: React.FC = () => {
  const deck = useRef<HTMLDivElement>(null);

  const nudge = (dir: number) => {
    const el = deck.current;
    if (!el) return;
    const card = el.querySelector('.tt-card-item') as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 360) + 24), behavior: 'smooth' });
  };

  return (
    <section className="tt-dark">
      <div className="mx-auto max-w-[1320px] px-[max(20px,4vw)] pt-[clamp(90px,14vw,180px)]">
        <ScrollReveal>
          <h2 className="tt-display m-0 text-[clamp(40px,7vw,104px)]">
            What happens
            <br />
            at a talk
          </h2>
          <p className="tt-body m-0 mt-8 max-w-[860px] text-[clamp(16px,1.5vw,20px)] leading-[1.7] text-white/80">
            At 6:00 PM on a Thursday, someone who does the work — an engineer, a scientist, a founder — takes
            the stage at The Ion. You hear the story behind a real NASA problem, straight from the source. By
            7:00 PM the floor is yours, and problems like these become Space Apps challenges for a team to take on.
          </p>
        </ScrollReveal>

        <div className="mt-12 flex items-center justify-between gap-6">
          <p className="tt-mono m-0 text-[11px] text-white/60">Swipe through the challenges</p>
          <div className="tt-deck-nav">
            <button type="button" onClick={() => nudge(-1)} aria-label="Previous challenge">
              ←
            </button>
            <button type="button" onClick={() => nudge(1)} aria-label="Next challenge">
              →
            </button>
          </div>
        </div>
      </div>

      <div className="relative mt-8">
        <div className="tt-grid absolute inset-0" aria-hidden="true" />
        <div ref={deck} className="tt-deck relative">
          {challengePosters.map((c) => (
            <figure key={c.slug} className="tt-card-item m-0">
              <img src={`/tech-talks/challenges/${c.slug}.webp`} alt={c.title} width={1122} height={1402} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 7. archive */

const years: { year: string; talks: TechTalk[] }[] = [
  { year: '2026', talks: techTalks2026 },
  { year: '2025', talks: techTalks2025 },
  { year: '2024', talks: techTalks2024 },
  { year: '2023', talks: techTalks2023 }
];

const Archive: React.FC = () => {
  const [year, setYear] = useState('2026');
  const talks = [...(years.find((y) => y.year === year)?.talks ?? [])].reverse();

  return (
    <section id="tt-archive-top" className="bg-[#050a1c] px-[max(20px,4vw)] py-[clamp(80px,10vw,150px)]" aria-labelledby="tt-archive">
      <div className="mx-auto max-w-[1320px]">
        <LabelRow label="Every talk so far" />
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <h2 id="tt-archive" className="tt-display m-0 text-[clamp(40px,7vw,104px)]">
            The archive
          </h2>
          <div role="tablist" aria-label="Year" className="flex gap-2">
            {years.map((y) => (
              <button
                key={y.year}
                type="button"
                role="tab"
                aria-selected={year === y.year}
                onClick={() => setYear(y.year)}
                className="tt-tab tt-mono cursor-pointer rounded-full border border-white/40 bg-transparent px-6 py-2.5 text-[12px] text-white transition-colors"
              >
                {y.year}
              </button>
            ))}
          </div>
        </div>

        <ol className="m-0 mt-12 list-none border-b border-white/10 p-0">
          {talks.map((t) => {
            const canceled = t.status === 'canceled';
            const next = t.status === 'upcoming';
            const who = [t.speaker, t.role].filter(Boolean).join(' — ') || (t.venue ? `At ${t.venue}` : '');
            return (
              <li
                key={`${year}-${t.month}`}
                className="tt-row relative grid gap-x-8 gap-y-2 border-t border-white/10 px-2 py-6 md:grid-cols-[130px_minmax(0,1fr)_minmax(0,34%)] md:px-4"
              >
                <p className="tt-mono m-0 flex items-center gap-2.5 text-[12px] text-white/85">
                  {next && <span className="h-2.5 w-2.5 rounded-full bg-[#EAFE07] shadow-[0_0_10px_rgba(234,254,7,0.9)]" aria-hidden="true" />}
                  {t.month} {t.day}
                </p>
                <div className={canceled ? 'opacity-45' : ''}>
                  <h3 className="tt-display-lite m-0 text-[clamp(19px,2.1vw,28px)]">{canceled ? 'Canceled' : t.title}</h3>
                  {(who || next) && (
                    <p className="tt-mono m-0 mt-2.5 text-[10px] leading-[1.8] text-white/55">
                      {next ? 'Upcoming · Speaker TBA' : who}
                    </p>
                  )}
                </div>
                <div>
                  <p className="tt-body m-0 text-[15px] leading-[1.7] text-white/65">
                    {next ? `${t.time} · ${t.venue}. Topic to be announced.` : t.desc ?? ''}
                  </p>
                  {t.url && (
                    <span className="tt-mono mt-3 inline-block text-[10px] text-[#2E96F5]" aria-hidden="true">
                      Ion District ↗
                    </span>
                  )}
                </div>
                {t.url && (
                  /* the whole row is the link to that talk's Ion District page */
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EAFE07]"
                  >
                    <span className="sr-only">
                      {t.title} — {t.month} {t.day}, {year}. Opens the Ion District event page.
                    </span>
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- page */

export const TechTalksSection: React.FC = () => (
  <div className="tt">
    <a href="#/" className="tt-back tt-mono">
      <span aria-hidden="true">←</span> Space Apps Houston
    </a>
    <Hero />
    <BlurLines lines={['and they have laid out', 'the operational', 'bottlenecks.']} />
    <Sustain />
    <Learned />
    <Join />
    <WhatHappens />
    <Archive />
  </div>
);

export default TechTalksSection;
