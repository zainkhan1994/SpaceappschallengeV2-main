import React, { useEffect, useRef, useState } from 'react';
import '../tech-talks/techTalks.css';
import { REDUCED_MOTION, useScrollProgress } from '../tech-talks/useScrollProgress';
import { ScrollReveal } from '../ui/ScrollReveal';
import { TechTalk, techTalks2023, techTalks2024, techTalks2025, techTalks2026 } from '../../data/techTalksData';
import { challengePosters } from '../../data/challengePosters';
import { techTalkCards } from '../../data/techTalkCards';

// Imagery: stage, staircase, lunar horizon and Earth (hero) supplied by Space Apps Houston.
// NASA, public domain (images.nasa.gov): Moon GSFC_20171208_Archive_e001861 (LRO) · Mars PIA00407 (Viking) ·
// SLS Block 1B illustration B1B_Crew_OML · software jsc2022e090102 · mission planning jsc2026e019242 ·
// Artemis II crew patch jsc2025e034457 · spacewalk iss038e020234 (join art).
// Software: NASA Artemis II Real-time Orbit Website (AROW) · Mission planning: NASA/JSC Artemis II mission map (SVS 20412).
// Hardware: Orion jsc2022e046362, Gateway KSC-20240716-PH-NAS01_0001, NASA Moon Base renderings (fission surface power, habitat).
// Moon and Mars videos rendered from NASA SVS CGI Moon Kit (LROC color + LOLA elevation) and the Viking MDIM2.1 color mosaic (NASA Mars Trek).
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

/** Muted, looping planet render: plays only while on screen, never for reduced motion. */
const LoopVideo: React.FC<{ name: string; className: string; large?: boolean; style?: VarStyle }> = ({ name, className, large, style }) => {
  const video = useRef<HTMLVideoElement>(null);
  const [still] = useState(() => typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION).matches);

  useEffect(() => {
    const v = video.current;
    if (!v || still) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => undefined);
        else v.pause();
      },
      { rootMargin: '200px 0px' }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [still]);

  return (
    <video
      ref={video}
      className={className}
      style={style}
      muted
      loop
      playsInline
      preload={still ? 'none' : 'metadata'}
      poster={`${STORY}/${name}-poster.jpg`}
      aria-hidden="true"
    >
      {large && <source src={`${STORY}/${name}-900.mp4`} type="video/mp4" media="(min-width: 900px)" />}
      <source src={`${STORY}/${name}-${large ? 720 : 600}.mp4`} type="video/mp4" />
    </video>
  );
};

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
  { text: 'NASA can’t build alone.', s: 0.72, accent: true }
];

/** NASA Moon to Mars architecture elements, one render per hexagon (after NASA's architecture board). */
const HARDWARE = [
  { src: 'hw-orion.jpg', label: 'Orion' },
  { src: 'hw-gateway.jpg', label: 'Gateway' },
  { src: 'hw-fission.jpg', label: 'Fission surface power' },
  { src: 'hw-habitat.jpg', label: 'Surface habitat' }
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
          <LoopVideo name="moon" className="tt-fx tt-fx-moon" style={{ '--s': 0.1 } as VarStyle} />
          <LoopVideo name="mars" className="tt-fx tt-fx-mars" style={{ '--s': 0.18 } as VarStyle} />
          <figure className="tt-fx tt-fx-stage" style={{ '--s': 0.34, '--e': 0.43 } as VarStyle} aria-hidden="true">
            <img className="tt-fx-media" src={`${STORY}/software-arow.jpg`} alt="" loading="lazy" />
            <figcaption className="tt-mono">Software · NASA Artemis II real-time tracker</figcaption>
          </figure>
          <figure className="tt-fx tt-fx-stage" style={{ '--s': 0.45, '--e': 0.53 } as VarStyle} aria-hidden="true">
            <LoopVideo name="mission-map" className="tt-fx-media" />
            <figcaption className="tt-mono">Mission planning · Artemis II trajectory</figcaption>
          </figure>
          <div className="tt-fx-hexes" aria-hidden="true">
            {HARDWARE.map((h, i) => (
              <figure key={h.label} className={`tt-fx tt-fx-hex is-${i}`} style={{ '--s': 0.55 + i * 0.02, '--e': 0.71 } as VarStyle}>
                <img src={`${STORY}/${h.src}`} alt="" loading="lazy" />
                <figcaption className="tt-mono">{h.label}</figcaption>
              </figure>
            ))}
          </div>
          <div className="tt-fx-partners">
            <div className="tt-fx-lead">
              <img className="tt-fx-item tt-fx-nasa" src="/nasa-logo.png" alt="NASA" style={{ '--s': 0.75 } as VarStyle} />
              <img
                className="tt-fx-item tt-fx-patch"
                src={`${STORY}/artemis-ii-patch.webp`}
                alt="Artemis II crew patch"
                loading="lazy"
                style={{ '--s': 0.79 } as VarStyle}
              />
            </div>
            <p className="tt-fx-item tt-mono m-0 text-[10px] text-white/55" style={{ '--s': 0.81 } as VarStyle}>
              With Artemis partners
            </p>
            <div className="tt-fx-row">
              {PARTNERS.map((p, i) => (
                <img key={p.name} className="tt-fx-item tt-fx-partner" src={p.src} alt={p.name} loading="lazy" style={{ '--s': 0.83 + i * 0.022 } as VarStyle} />
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

/* the three neon tubes of the join key art, carried up into this frame. x and width are shares of the
   art's width (the same in the desktop and mobile art); each tube rises until it meets the message or the globe */
const TUBES = [
  { color: 'yellow', x: 0.30996, w: 0.07344, s: 0.66 },
  { color: 'blue', x: 0.49707, w: 0.07422, s: 0.7 },
  { color: 'red', x: 0.6834, w: 0.07656, s: 0.74 }
];
const TUBE_CORE = 0.0547; // lit glass without the glow
const GLOBE_DISK = 0.39; // globe video: the Earth's radius as a share of the frame
const TIP = 20; // px a tube runs past the contact point, so its feathered tip meets the edge solid

const Learned: React.FC = () => {
  const ref = useScrollProgress<HTMLElement>('pin');

  useEffect(() => {
    const section = ref.current;
    const stick = section?.firstElementChild as HTMLElement | null;
    const join = section?.nextElementSibling?.firstElementChild as HTMLElement | null;
    const globe = section?.querySelector<HTMLElement>('.tt-learn-globe');
    if (!section || !stick) return;
    const lines = Array.from(section.querySelectorAll<HTMLElement>('.tt-learn-line'));
    const tubes = Array.from(section.querySelectorAll<HTMLElement>('.tt-tube'));
    const wide = window.matchMedia('(min-width: 900px)');

    const measure = () => {
      // the join art is object-fit: cover in the next frame, so its width is set by that frame's box
      const artW = join ? Math.max(join.clientWidth, join.clientHeight * (wide.matches ? 16 / 9 : 9 / 16)) : stick.clientWidth;
      stick.style.setProperty('--art', `${artW}px`);
      const box = stick.getBoundingClientRect();
      const rects = lines.flatMap((l) => Array.from(l.getClientRects()));
      const g = globe?.getBoundingClientRect();
      TUBES.forEach((t, i) => {
        const x = box.left + box.width / 2 + (t.x - 0.5) * artW;
        const half = (TUBE_CORE * artW) / 2;
        let top = box.top; // nothing in the way: run out of the top of the frame
        for (const r of rects) if (r.width && r.left < x + half && r.right > x - half) top = Math.max(top, r.bottom - TIP);
        if (g && globe) {
          const radius = globe.offsetWidth * GLOBE_DISK;
          const dx = x - (g.left + g.width / 2);
          if (Math.abs(dx) < radius * 0.9) top = Math.max(top, g.top + g.height / 2 + Math.sqrt(radius * radius - dx * dx) - radius * 0.03 - TIP);
        }
        tubes[i]?.style.setProperty('--len', `${Math.max(0, box.bottom - top)}px`);
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stick);
    if (join) ro.observe(join);
    const text = section.querySelector('.tt-learn-text');
    if (text) ro.observe(text); // re-wraps when the web font arrives
    wide.addEventListener('change', measure);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => {
      ro.disconnect();
      wide.removeEventListener('change', measure);
    };
  }, [ref]);

  return (
    <section ref={ref} className="tt-learn" aria-labelledby="tt-learn-title">
      <div className="tt-stick">
        <div className="tt-stars" aria-hidden="true" />
        <LoopVideo name="globe" className="tt-learn-globe" large />
        <div className="tt-tubes" aria-hidden="true">
          {TUBES.map((t) => (
            <span key={t.color} className={`tt-tube is-${t.color}`} style={{ '--x': t.x, '--w': t.w, '--s': t.s } as VarStyle}>
              <i className="tt-tube-body" />
              <i className="tt-tube-hit" />
            </span>
          ))}
        </div>
        <h2 id="tt-learn-title" className="tt-learn-text m-0">
          {LEARNED.map((line, i) => (
            <span
              key={line}
              className={`tt-q tt-learn-line${i === LEARNED.length - 1 ? ' is-accent' : ''}`}
              style={{ '--s': 0.04 + i * 0.14, '--k': 6 } as VarStyle}
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
        <div className="tt-join-frame is-1" aria-hidden="true">
          <p className="tt-join-title m-0">
            {['Join the NASA', 'Space Apps', 'Challenge'].map((line, i) => (
              <span key={line} className="tt-q tt-join-line" style={{ '--s': 0.02 + i * 0.08, '--k': 6, '--dir': i % 2 ? -1 : 1 } as VarStyle}>
                {line}
              </span>
            ))}
          </p>
          <span className="tt-q tt-join-arrow" style={{ '--s': 0.26, '--k': 8 } as VarStyle}>
            →
          </span>
        </div>
        <div className="tt-join-frame is-2">
          <img className="tt-join-logo" src="/sac-logo-houston-transparent.png" alt="NASA Space Apps Houston" />
          <p className="tt-join-meta tt-mono m-0">November 14–15, 2026 · 48 hours · Houston</p>
          <a href="#/" className="tt-join-btn tt-mono">
            Sign up <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 6. the Space Apps challenges */

const Challenges: React.FC = () => {
  const deck = useRef<HTMLDivElement>(null);

  const nudge = (dir: number) => {
    const el = deck.current;
    if (!el) return;
    const card = el.querySelector('.tt-card-item') as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 360) + 24), behavior: 'smooth' });
  };

  return (
    <section className="tt-dark" aria-labelledby="tt-challenges">
      <div className="mx-auto max-w-[1320px] px-[max(20px,4vw)] pt-[clamp(90px,14vw,180px)]">
        <ScrollReveal>
          <h2 id="tt-challenges" className="tt-display m-0 text-[clamp(40px,7vw,104px)]">
            The Space Apps
            <br />
            challenges
          </h2>
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

      <div className="relative mt-8 pb-[clamp(40px,6vw,80px)]">
        <div className="tt-grid absolute inset-0" aria-hidden="true" />
        <div ref={deck} className="tt-deck relative">
          {challengePosters.map((c) => (
            <figure key={c.slug} className="tt-card-item is-poster m-0">
              <img src={`/tech-talks/challenges/${c.slug}.webp`} alt={c.title} width={1122} height={1402} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 7. what happens at a talk */

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
            7:00 PM the floor is yours.
          </p>
        </ScrollReveal>

        <div className="mt-12 flex items-center justify-between gap-6">
          <p className="tt-mono m-0 text-[11px] text-white/60">Swipe through the talks</p>
          <div className="tt-deck-nav">
            <button type="button" onClick={() => nudge(-1)} aria-label="Previous talk">
              ←
            </button>
            <button type="button" onClick={() => nudge(1)} aria-label="Next talk">
              →
            </button>
          </div>
        </div>
      </div>

      <div className="relative mt-8">
        <div className="tt-grid absolute inset-0" aria-hidden="true" />
        <div ref={deck} className="tt-deck relative">
          {techTalkCards.map((c) => {
            const Tag = c.url ? 'a' : 'div';
            return (
              <Tag
                key={c.slug}
                className={`tt-card-item${c.art ? '' : ' is-type'}`}
                {...(c.url ? { href: c.url, target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {c.art && <img src={`/tech-talks/cards/${c.slug}.jpg`} alt="" loading="lazy" />}
                <div className="tt-card-body">
                  <div className="tt-card-top tt-mono">
                    <span>
                      NASA Tech Talks
                      <br />
                      Houston
                    </span>
                    <span>
                      {c.month} {c.year}
                    </span>
                  </div>
                  <p className="tt-card-kicker tt-mono">{c.kicker}</p>
                  <h3 className="tt-card-title tt-display-lite normal-case">
                    {c.top}
                    <br />
                    <span>{c.accent}</span>
                    {c.end && (
                      <>
                        <br />
                        {c.end}
                      </>
                    )}
                  </h3>
                  <p className="tt-card-desc tt-body">{c.desc}</p>
                  {c.url && (
                    <div className="tt-card-cta tt-mono">
                      <i aria-hidden="true">→</i> View talk
                    </div>
                  )}
                  <span className="tt-card-note tt-mono" aria-hidden="true">
                    Same curiosity.
                    <br />
                    Bigger tomorrows.
                  </span>
                </div>
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 8. archive */

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
    <Challenges />
    <WhatHappens />
    <Archive />
  </div>
);

export default TechTalksSection;
