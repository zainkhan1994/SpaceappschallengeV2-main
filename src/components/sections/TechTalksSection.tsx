import React, { useRef, useState } from 'react';
import '../tech-talks/techTalks.css';
import { useScrollProgress } from '../tech-talks/useScrollProgress';
import { ScrollReveal } from '../ui/ScrollReveal';
import { TechTalk, techTalks2023, techTalks2024, techTalks2025, techTalks2026 } from '../../data/techTalksData';
import { techTalkCards } from '../../data/techTalkCards';

// Imagery: hero/story layers, Ion atrium and event photo supplied by Space Apps Houston;
// nebula = NASA/ESA/CSA/STScI Webb "Cosmic Cliffs" in the Carina Nebula (images.nasa.gov: carina_nebula).

const REGISTER_URL = 'https://www.spaceappschallenge.org/2026/local-events/houston/';
const ION_MAP_URL = 'https://www.google.com/maps/search/?api=1&query=The+Ion+4201+Main+St+Houston+TX';

type VarStyle = React.CSSProperties & Record<`--${string}`, string | number>;

/* ---------------------------------------------------------------- shared art */

const NeonRibbons: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
    <defs>
      <filter id="tt-glow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="9" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#tt-glow)" fill="none" strokeLinecap="round">
      <path d="M-60 830 C 300 700, 500 470, 540 -60" stroke="#EAFE07" strokeWidth="5" />
      <path d="M140 840 C 480 690, 650 430, 700 -60" stroke="#2E96F5" strokeWidth="6" />
      <path d="M330 850 C 720 690, 880 420, 930 -60" stroke="#E43700" strokeWidth="5" />
    </g>
  </svg>
);

const WireGlobe: React.FC<{ className?: string; spin?: number; strokeWidth?: number }> = ({
  className,
  spin = 28,
  strokeWidth = 0.6
}) => (
  <svg viewBox="-104 -104 208 208" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} aria-hidden="true">
    <g transform="rotate(-18)">
      <circle r="100" />
      {[-60, -30, 0, 30, 60].map((lat) => {
        const rx = 100 * Math.cos((lat * Math.PI) / 180);
        return <ellipse key={lat} cy={100 * Math.sin((lat * Math.PI) / 180)} rx={rx} ry={rx * 0.24} />;
      })}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <ellipse key={i} rx="100" ry="100">
          <animate
            attributeName="rx"
            values="100;0;100"
            keyTimes="0;0.5;1"
            calcMode="spline"
            keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
            dur={`${spin}s`}
            begin={`${(-i * spin) / 6}s`}
            repeatCount="indefinite"
          />
        </ellipse>
      ))}
    </g>
  </svg>
);

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

/* ---------------------------------------------------------------- 1. hero */

const Hero: React.FC = () => {
  const ref = useScrollProgress<HTMLElement>('pin');

  return (
    <section ref={ref} className="tt-hero" aria-labelledby="tt-title">
      <div className="tt-stick">
        <div className="tt-h-moon" aria-hidden="true" />
        <div className="tt-stars" aria-hidden="true" />
        <img className="tt-h-earth" src="/tech-talks/story/earth.webp" alt="" />
        <img className="tt-h-stage" src="/tech-talks/story/stage.webp" alt="" />
        <div className="tt-h-copy">
          <span className="tt-h-rule" aria-hidden="true" />
          <h1 id="tt-title" className="tt-body m-0">
            Every 4th Thursday of the month, at NASA Tech Talks you heard directly from
          </h1>
          <span className="tt-h-arrow" aria-hidden="true">
            ↓
          </span>
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 2. stacked words */

const Words: React.FC = () => {
  const ref = useScrollProgress<HTMLElement>('pin');
  const words = [
    { text: 'NASA', className: '' },
    { text: 'meets', className: 'tt-outline' },
    { text: 'Houston', className: 'text-[#EAFE07]' }
  ];
  return (
    <section ref={ref} className="tt-words">
      <div className="tt-stick flex items-center justify-center">
        {/* Earth and the astronaut follow you down from the hero */}
        <img
          className="tt-sec-earth left-[-8vw] top-[10%] w-[clamp(130px,19vw,280px)]"
          style={{ '--sp': '30vh' } as VarStyle}
          src="/tech-talks/story/earth.webp"
          alt=""
        />
        <img
          className="tt-sec-astro bottom-[12%] right-[8vw] h-[clamp(70px,11svh,130px)]"
          style={{ '--sp': '-20vh' } as VarStyle}
          src="/tech-talks/astronaut-cutout.webp"
          alt=""
        />
        <h2
          className="tt-display m-0 text-center text-[clamp(52px,10vw,148px)] leading-[1.18]"
          style={{ transform: 'translateY(calc(var(--p, 0) * -10svh))' }}
        >
          {words.map((w, i) => (
            <span
              key={w.text}
              className={`tt-q tt-word ${w.className}`}
              style={{ '--s': 0.06 + i * 0.2, '--k': 4 } as VarStyle}
            >
              {w.text}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 3. globes */

const Globes: React.FC = () => {
  const ref = useScrollProgress<HTMLElement>('pass');
  return (
    <section ref={ref} className="tt-globes" aria-label="One Thursday every month">
      <img className="tt-sec-photo" src="/tech-talks/story/event.jpg" alt="" />
      <div className="tt-globe left-[-8vw] top-[30%] w-[38vw] min-w-[220px]" style={{ '--sp': '50vh' } as VarStyle}>
        <WireGlobe spin={34} />
      </div>
      <div className="tt-globe right-[-6vw] top-[26%] w-[26vw] min-w-[160px]" style={{ '--sp': '-30vh' } as VarStyle}>
        <WireGlobe spin={22} strokeWidth={0.8} />
      </div>
      <div className="tt-globe left-[52%] top-[58%] w-[12vw] min-w-[90px]" style={{ '--sp': '70vh' } as VarStyle}>
        <WireGlobe spin={16} strokeWidth={1} />
      </div>
      <img
        className="tt-sec-earth right-[6vw] top-[12%] w-[clamp(110px,16vw,240px)]"
        style={{ '--sp': '-26vh' } as VarStyle}
        src="/tech-talks/story/earth.webp"
        alt=""
      />
      <img
        className="tt-sec-astro bottom-[14%] left-[9vw] h-[clamp(64px,10svh,120px)]"
        style={{ '--sp': '34vh' } as VarStyle}
        src="/tech-talks/astronaut-cutout.webp"
        alt=""
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p className="tt-mono m-0 mb-7 text-[12px] text-[#2E96F5]">January 2025 → today</p>
        <p className="tt-display m-0 text-[clamp(38px,6.2vw,92px)]">
          One Thursday
          <br />
          every month
        </p>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 4. the series + rocket of speakers */

const byMonth = (talks: TechTalk[], month: string) => talks.find((t) => t.month === month) as TechTalk;

/** Each rocket stage is one talk, nose to tail in the order they happened. */
const stages: { who: string; year: string; talk: TechTalk }[] = [
  { who: 'John Graf', year: '2025', talk: byMonth(techTalks2025, 'SEP') },
  { who: 'Meganne Christian / David Alexander', year: '2026', talk: byMonth(techTalks2026, 'JAN') },
  { who: 'Montgomery Goforth', year: '2026', talk: byMonth(techTalks2026, 'FEB') },
  { who: 'Paula Gothreaux', year: '2026', talk: byMonth(techTalks2026, 'MAR') },
  { who: 'Molly Bannon', year: '2026', talk: byMonth(techTalks2026, 'APR') },
  { who: 'Texas-France cohort', year: '2026', talk: byMonth(techTalks2026, 'MAY') },
  { who: 'Dynae Fullwood / Jennifer Scott Williams / Glenn Johnson', year: '2026', talk: byMonth(techTalks2026, 'JUN') },
  { who: 'Scott Wood', year: '2026', talk: byMonth(techTalks2026, 'JUL') }
];

const parts: { w: number; o: number; y: number; r: number; dark?: boolean; windows?: boolean; clip?: string }[] = [
  { w: 7, o: -36, y: 26, r: -14, dark: true, clip: 'polygon(0 0, 100% 24%, 100% 76%, 0 100%)' },
  { w: 10, o: -26, y: -18, r: 9, dark: true, clip: 'polygon(0 0, 34% 0, 100% 25%, 100% 75%, 34% 100%, 0 100%)' },
  { w: 13, o: -17, y: 14, r: -5 },
  { w: 13, o: -8, y: -12, r: 4 },
  { w: 13, o: 2, y: 18, r: -6, windows: true },
  { w: 13, o: 11, y: -20, r: 8 },
  { w: 13, o: 21, y: 12, r: -9 },
  { w: 14, o: 32, y: -14, r: 11, clip: 'polygon(0 0, 42% 4%, 78% 24%, 100% 50%, 78% 76%, 42% 96%, 0 100%)' }
];

const roles = ['NASA technologists', 'astronauts', 'engineers', 'physicians', 'professors'];

const Series: React.FC = () => {
  const ref = useScrollProgress<HTMLElement>('pin');
  const [active, setActive] = useState<number | null>(null);
  const stage = active === null ? null : stages[active];

  return (
    <section ref={ref} className="tt-series">
      <div className="tt-stick">
        <div className="mx-auto max-w-[1320px] px-[max(20px,4vw)] pt-[calc(env(safe-area-inset-top,0px)+9svh)]">
          <LabelRow label="The series" />
          <ol className="tt-roles m-0 mt-[4svh] list-none p-0" aria-label="You heard directly from">
            {roles.map((r, i) => (
              <li key={r} className="tt-q tt-role tt-display-lite" style={{ '--s': 0.02 + i * 0.09, '--k': 7 } as VarStyle}>
                {i > 0 && (
                  <span className="tt-role-arrow" aria-hidden="true">
                    ↓
                  </span>
                )}
                {r}
              </li>
            ))}
          </ol>
        </div>

        <div className="tt-card" aria-live="polite">
          {stage ? (
            <>
              <p className="tt-mono m-0 text-[11px] text-[#EAFE07]">
                {stage.talk.month} {stage.talk.day}, {stage.year} · NASA Tech Talks
              </p>
              <h3 className="tt-display-lite m-0 mt-3 text-[clamp(19px,2.2vw,28px)]">{stage.talk.title}</h3>
              <p className="tt-mono m-0 mt-3 text-[10px] leading-[1.7] text-white/60">
                {stage.who}
                {stage.talk.role ? ` · ${stage.talk.role}` : ''}
              </p>
              <p className="tt-body m-0 mt-4 text-[15px] leading-[1.65] text-white/80">{stage.talk.desc}</p>
              {stage.talk.url && (
                <a
                  href={stage.talk.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tt-mono mt-5 inline-block text-[10px] text-[#EAFE07] underline underline-offset-4"
                >
                  View on Ion District ↗
                </a>
              )}
            </>
          ) : (
            <>
              <p className="tt-mono m-0 text-[11px] text-[#2E96F5]">Eight of the talks so far</p>
              <p className="tt-body m-0 mt-3 text-[15px] leading-[1.65] text-white/75">
                Every stage of this rocket is a talk that already happened. Hover or tap one to see who spoke,
                when, and what they talked about — then click again to open the event page.
              </p>
            </>
          )}
        </div>

        <div className="tt-rocket" onMouseLeave={() => setActive(null)} onBlur={() => setActive(null)}>
          {parts.map((part, i) => {
            const s = stages[i];
            const up = i % 2 === 0;
            return (
              <button
                key={i}
                type="button"
                className="tt-part"
                data-active={active === i}
                style={{ width: `${part.w}%`, '--o': `${part.o}vw`, '--y': `${part.y}px`, '--r': `${part.r}deg` } as VarStyle}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => {
                  // first click (or hover) selects the stage; clicking the selected one opens its event page
                  if (active === i && s.talk.url) window.open(s.talk.url, '_blank', 'noopener,noreferrer');
                  else setActive(i);
                }}
              >
                <span className={`tt-hull${part.dark ? ' is-dark' : ''}`} style={part.clip ? { clipPath: part.clip } : undefined} aria-hidden="true">
                  {part.windows && (
                    <span
                      className="absolute inset-x-[10%] top-[32%] bottom-[32%]"
                      style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.55) 0 2px, transparent 2px 16px)' }}
                    />
                  )}
                </span>
                <span className={`tt-stage-tag tt-mono ${up ? 'is-up' : 'is-down'}`} aria-hidden="true">
                  <span>{s.who}</span>
                  <i />
                </span>
                <span className="sr-only">
                  {s.who} — {s.talk.title}, {s.talk.month} {s.talk.day}, {s.year}
                </span>
              </button>
            );
          })}
        </div>

        <p className="tt-mono absolute inset-x-0 bottom-[5svh] m-0 px-6 text-center text-[10px] text-white/45 md:hidden">
          Tap a stage
        </p>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 4b. from the talks to the challenge */

const flowSteps = [
  'and they have laid out the operational bottlenecks',
  'Sustained presence on the Moon and Mars requires software, mission planning, and hardware solutions NASA can’t build alone.',
  'Take what you have learned, form a team, and prove your solution in 48 hours at the NASA International Space Apps Challenge.'
];

const Flow: React.FC = () => {
  const ref = useScrollProgress<HTMLElement>('pin');

  return (
    <section ref={ref} className="tt-flow" aria-label="From the talks to the challenge">
      <div className="tt-stick">
        <div className="tt-flow-moon" aria-hidden="true" />
        <img className="tt-h-earth" src="/tech-talks/story/earth.webp" alt="" />
        <ol className="tt-flow-steps m-0 list-none">
          {flowSteps.map((text, i) => (
            <li key={text} className={`tt-q tt-flow-step is-${i}`} style={{ '--s': 0.04 + i * 0.22, '--k': 5 } as VarStyle}>
              {i > 0 && (
                <span className="tt-flow-arrow" aria-hidden="true">
                  ↓
                </span>
              )}
              <p className="tt-body m-0">{text}</p>
            </li>
          ))}
          <li className="tt-q tt-flow-step is-cta" style={{ '--s': 0.7, '--k': 5 } as VarStyle}>
            <span className="tt-flow-arrow" aria-hidden="true">
              ↓
            </span>
            <a href="#/" className="tt-pill tt-pill-solid tt-mono">
              Join NASA Space Apps Houston <span aria-hidden="true">→</span>
            </a>
          </li>
        </ol>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 5. what happens */

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

/* ---------------------------------------------------------------- 8. horizontal statement */

const Horizon: React.FC = () => {
  const ref = useScrollProgress<HTMLElement>('pin');
  return (
    <section ref={ref} className="tt-horizon" aria-label="See you at The Ion">
      <div className="tt-stick">
        <img className="tt-sec-photo" src="/tech-talks/story/ion.jpg" alt="" />
        <WireGlobe className="tt-glow-globe absolute left-1/2 top-1/2 w-[min(58vw,56svh)] min-w-[240px] -translate-x-1/2 -translate-y-1/2" spin={30} strokeWidth={0.9} />
        <p className="tt-display tt-sweep m-0" aria-hidden="true">
          See you at The Ion
        </p>
        <p className="tt-mono absolute inset-x-0 bottom-[8svh] m-0 px-6 text-center text-[11px] text-white/70">
          4201 Main Street · Midtown Houston
        </p>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 9. constellation */

const constellation: { label: string; sub: string; next?: boolean; hack?: boolean }[] = [
  ...techTalks2026.slice(-5).map((t) => ({
    label: `${t.month} ${t.day}`,
    sub: t.status === 'upcoming' ? 'Speaker TBA' : t.short,
    next: t.status === 'upcoming'
  })),
  { label: 'NOV 14–15', sub: 'Hack weekend', hack: true }
];
const desktopPts = [
  [7, 72], [23, 46], [39, 66], [57, 34], [74, 56], [91, 26]
];
const mobilePts = [
  [22, 6], [72, 22], [26, 39], [74, 56], [28, 73], [70, 91]
];

const Stars: React.FC<{ pts: number[][]; vertical?: boolean; className: string }> = ({ pts, vertical, className }) => (
  <div className={`relative ${className}`}>
    <svg className={`absolute inset-0 h-full w-full ${vertical ? 'tt-trace-v' : 'tt-trace'}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <polyline
        points={pts.map((p) => p.join(',')).join(' ')}
        fill="none"
        stroke="#EAFE07"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="0.1 9"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
    <ol className="m-0 list-none p-0">
      {constellation.map((c, i) => (
        <li key={c.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${pts[i][0]}%`, top: `${pts[i][1]}%` }}>
          <span
            className={`mx-auto block rounded-full ${
              c.next ? 'tt-star-next h-3.5 w-3.5 bg-[#EAFE07]' : c.hack ? 'h-5 w-5 border-2 border-[#E43700]' : 'h-2 w-2 bg-white/80'
            }`}
            aria-hidden="true"
          />
          <span className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap text-center">
            <span className={`tt-mono block text-[11px] ${c.next ? 'text-[#EAFE07]' : c.hack ? 'text-[#FF6A3D]' : 'text-white/75'}`}>{c.label}</span>
            <span className="tt-body mt-1 block text-[12px] text-white/60">{c.sub}</span>
          </span>
        </li>
      ))}
    </ol>
  </div>
);

const Constellation: React.FC = () => {
  const ref = useScrollProgress<HTMLElement>('pass');
  return (
    <section id="tt-upcoming" ref={ref} className="tt-nebula relative overflow-hidden">
      <img src="/tech-talks/nebula.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#04070f_0%,rgba(4,7,15,0.55)_22%,rgba(4,7,15,0.6)_70%,#04070f_100%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1320px] px-[max(20px,4vw)] pb-[22vh] pt-[26vh]">
        <h2 className="tt-display m-0 text-[clamp(40px,7vw,104px)]">
          Next on
          <br />
          the map
        </h2>
        <p className="tt-body m-0 mt-7 max-w-[640px] text-[clamp(16px,1.5vw,20px)] leading-[1.7] text-white/85">
          Thursday · 6:00 – 7:00 PM CDT · The Ion. Speakers and topics are announced ahead of each talk.
        </p>
        <Stars pts={desktopPts} className="mt-14 hidden h-[clamp(380px,52svh,560px)] md:block" />
        <Stars pts={mobilePts} vertical className="mt-12 h-[760px] md:hidden" />
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 10. archive */

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

/* ---------------------------------------------------------------- 11. blur-to-focus */

const Focus: React.FC = () => {
  const ref = useScrollProgress<HTMLElement>('pin');
  const lines = ['Bring a question.', 'Bring a friend.', 'What will you ask?'];
  return (
    <section ref={ref} className="tt-focus">
      <div className="tt-stick flex flex-col items-center justify-center px-5 text-center">
        <h2 className="tt-display m-0 text-[clamp(34px,6.4vw,96px)] leading-[1.12]" style={{ transform: 'translateY(calc(var(--p, 0) * -8svh))' }}>
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
        <a href={ION_MAP_URL} target="_blank" rel="noopener noreferrer" className="tt-pill tt-mono mt-[9svh]">
          <span aria-hidden="true">✦</span> Directions to The Ion
        </a>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 12. final */

const Final: React.FC = () => (
  <section className="relative overflow-hidden bg-black px-[max(20px,4vw)] py-[clamp(90px,12vw,160px)]">
    <NeonRibbons className="pointer-events-none absolute inset-0 opacity-40" />
    <div className="relative mx-auto max-w-[1320px]">
      <h2 className="tt-display m-0 text-[clamp(40px,7vw,104px)]">
        Space Apps
        <br />
        Houston 2026
      </h2>
      <p className="tt-body m-0 mt-8 max-w-[820px] text-[clamp(16px,1.5vw,20px)] leading-[1.7] text-white/80">
        Tech Talks run all year. The hackathon is one weekend — November 14–15, 2026. Bring what you learned,
        or{' '}
        <a href="#/" className="text-white underline underline-offset-4 hover:text-[#EAFE07]">
          find your place
        </a>{' '}
        on the team.
      </p>
      <div className="mt-[clamp(60px,9vw,110px)]">
        <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="tt-orb">
          <span className="tt-display text-[clamp(20px,2.2vw,30px)]">Register</span>
        </a>
      </div>
      <div className="tt-mono mt-[clamp(60px,8vw,100px)] flex flex-wrap gap-x-10 gap-y-4 text-[11px]">
        <a href="#/get-involved" className="text-white/80 hover:text-[#EAFE07]">
          ← Get involved with NASA
        </a>
        <a href="#/opportunities" className="text-white/80 hover:text-[#EAFE07]">
          NASA opportunities →
        </a>
      </div>
    </div>
  </section>
);

/* ---------------------------------------------------------------- page */

export const TechTalksSection: React.FC = () => (
  <div className="tt">
    <a href="#/" className="tt-back tt-mono">
      <span aria-hidden="true">←</span> Space Apps Houston
    </a>
    <Hero />
    <Series />
    <Flow />
    <Words />
    <Globes />
    <WhatHappens />
    <Horizon />
    <Constellation />
    <Archive />
    <Focus />
    <Final />
  </div>
);

export default TechTalksSection;
