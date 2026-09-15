import React, { useEffect, useRef, useState } from 'react';
import '../tech-talks/techTalks.css';
import { REDUCED_MOTION, useScrollProgress } from '../tech-talks/useScrollProgress';
import { ScrollReveal } from '../ui/ScrollReveal';
import { TechTalk, techTalks2025, techTalks2026 } from '../../data/techTalksData';

// Imagery: astronaut illustration supplied by Space Apps Houston;
// nebula = NASA/ESA/CSA/STScI Webb "Cosmic Cliffs" in the Carina Nebula (images.nasa.gov: carina_nebula).

const REGISTER_URL = 'https://www.spaceappschallenge.org/2026/local-events/houston/';
const ION_MAP_URL = 'https://www.google.com/maps/search/?api=1&query=The+Ion+4201+Main+St+Houston+TX';

type VarStyle = React.CSSProperties & Record<`--${string}`, string | number>;

/* ---------------------------------------------------------------- shared art */

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

const MoonPhases: React.FC = () => (
  <svg viewBox="0 0 92 20" width="92" height="20" aria-hidden="true" className="flex-none">
    <defs>
      {[0.28, 0.5, 0.74, 1].map((f, i) => (
        <mask key={f} id={`tt-moon-${i}`}>
          <rect x="-4" y="-4" width="30" height="30" fill="#fff" />
          <circle cx={10 - 17 * f} cy="10" r="8" fill="#000" />
        </mask>
      ))}
    </defs>
    {[0, 1, 2, 3].map((i) => (
      <circle key={i} cx="10" cy="10" r="8" fill="currentColor" mask={`url(#tt-moon-${i})`} transform={`translate(${i * 24} 0)`} />
    ))}
  </svg>
);

const LabelRow: React.FC<{ label: string; className?: string }> = ({ label, className = '' }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <span className="tt-mono text-[13px] whitespace-nowrap">{label}</span>
    <span className="h-px flex-1 bg-current opacity-70" />
    <MoonPhases />
  </div>
);

const Sparkle: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="-50 -50 100 100" className={`tt-sparkle ${className ?? ''}`} aria-hidden="true">
    {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((a, i) => (
      <path key={a} d={`M0 ${i % 2 ? -30 : -48} L3 0 L0 ${i % 2 ? 30 : 48} L-3 0Z`} fill="#DFFF4F" transform={`rotate(${a})`} />
    ))}
  </svg>
);

/* faceted crystal asteroid */
const rim = [
  [0, 88], [31, 74], [66, 94], [97, 70], [131, 86], [160, 96], [196, 72], [228, 88], [262, 78], [297, 92], [330, 70]
].map(([deg, r]) => [100 + r * Math.cos((deg * Math.PI) / 180), 100 + r * Math.sin((deg * Math.PI) / 180)]);
const core = [92, 96];
const shades = ['#f6f6f6', '#8e8e8e', '#d3d3d3', '#4b4b4b', '#ececec', '#6c6c6c', '#bdbdbd', '#2c2c2c', '#fbfbfb', '#9a9a9a', '#cfcfcf'];
const facets = rim.flatMap((p, i) => {
  const q = rim[(i + 1) % rim.length];
  const m = [core[0] + 0.58 * ((p[0] + q[0]) / 2 - core[0]), core[1] + 0.58 * ((p[1] + q[1]) / 2 - core[1])];
  const pts = (a: number[][]) => a.map((v) => v.join(',')).join(' ');
  return [
    { d: pts([core, p, m]), fill: shades[i % shades.length] },
    { d: pts([m, p, q]), fill: shades[(i + 4) % shades.length] },
    { d: pts([core, m, q]), fill: shades[(i + 7) % shades.length] }
  ];
});

const Asteroid: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
    {facets.map((f, i) => (
      <polygon key={i} points={f.d} fill={f.fill} stroke="rgba(255,255,255,0.45)" strokeWidth="0.5" strokeLinejoin="round" />
    ))}
  </svg>
);

/* ---------------------------------------------------------------- 1. hero */

const clouds = [
  { l: -14, b: -8, w: 46, h: 38 },
  { l: 26, b: -12, w: 50, h: 42 },
  { l: 64, b: -10, w: 48, h: 38 },
  { l: 4, b: 16, w: 26, h: 24, shade: true },
  { l: 72, b: 18, w: 26, h: 22, shade: true },
  { l: 38, b: 20, w: 22, h: 18 },
  { l: -6, b: 26, w: 20, h: 18 },
  { l: 84, b: 6, w: 28, h: 28 },
  { l: 16, b: 4, w: 26, h: 22, shade: true },
  { l: 52, b: 6, w: 24, h: 22, shade: true }
];

const Hero: React.FC = () => {
  const ref = useScrollProgress<HTMLElement>('pin');
  const toUpcoming = () => document.getElementById('tt-upcoming')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={ref} className="tt-hero" aria-labelledby="tt-title">
      <div className="tt-stick">
        <div className="tt-hero-copy">
          <h1 id="tt-title" className="tt-display m-0 text-[clamp(58px,9.4vw,138px)]">
            NASA
            <br />
            Tech
            <br />
            Talks
          </h1>
          <p className="tt-mono m-0 mt-[4svh] max-w-[860px] text-[clamp(14px,1.7vw,24px)] leading-[1.55] tracking-[0.06em]">
            Monthly conversations with the people building NASA’s future — live at The Ion, Houston.
          </p>
          <button type="button" onClick={toUpcoming} className="tt-pill tt-mono mt-[5svh]">
            <span aria-hidden="true">✦</span> Next talk · Thu Sep 24
          </button>
        </div>

        <img className="tt-hero-astro" src="/tech-talks/astronaut-cutout.webp" alt="" />

        <div className="tt-clouds" aria-hidden="true">
          {clouds.map((c, i) => (
            <span
              key={i}
              className={`tt-cloud${c.shade ? ' is-shade' : ''}`}
              style={{
                left: `${c.l}%`,
                bottom: `${c.b}%`,
                width: `calc(${c.w}% + 140px)`,
                height: `${c.h}%`,
                animationDelay: `${-i * 2.3}s`
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 2. stacked words */

const Words: React.FC = () => {
  const ref = useScrollProgress<HTMLElement>('pin');
  const words = ['NASA', 'meets', 'Houston'];
  return (
    <section ref={ref} className="tt-words">
      <div className="tt-stick flex items-center justify-center">
        <h2
          className="tt-display m-0 text-center text-[clamp(56px,10vw,150px)] leading-[1.35]"
          style={{ transform: 'translateY(calc(var(--p, 0) * -10svh))' }}
        >
          {words.map((w, i) => (
            <span key={w} className="tt-q tt-word" style={{ '--s': 0.06 + i * 0.2, '--k': 4 } as VarStyle}>
              {w}
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
      <div className="tt-globe left-[-8vw] top-[30%] w-[38vw] min-w-[220px]" style={{ '--sp': '50vh' } as VarStyle}>
        <WireGlobe spin={34} />
      </div>
      <div className="tt-globe right-[-6vw] top-[26%] w-[26vw] min-w-[160px]" style={{ '--sp': '-30vh' } as VarStyle}>
        <WireGlobe spin={22} strokeWidth={0.8} />
      </div>
      <div className="tt-globe left-[52%] top-[58%] w-[12vw] min-w-[90px]" style={{ '--sp': '70vh' } as VarStyle}>
        <WireGlobe spin={16} strokeWidth={1} />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
        <p className="tt-mono m-0 mb-6 text-[13px] text-white/70">January 2025 → today</p>
        <p className="tt-display m-0 text-[clamp(40px,6.4vw,96px)]">
          One Thursday
          <br />
          every month
        </p>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 4. the series + rocket */

const rocket: { w: number; o: number; y: number; r: number; className: string; style?: React.CSSProperties; windows?: boolean }[] = [
  { w: 7, o: -34, y: 26, r: -14, className: 'tt-metal-dark tt-ring', style: { clipPath: 'polygon(0 0, 100% 24%, 100% 76%, 0 100%)' } },
  { w: 11, o: -22, y: -18, r: 8, className: 'tt-metal-dark', style: { clipPath: 'polygon(0 0, 34% 0, 100% 25%, 100% 75%, 34% 100%, 0 100%)' } },
  { w: 17, o: -11, y: 14, r: -5, className: 'tt-metal tt-ring', style: { height: '52%', borderRadius: 3 } },
  { w: 23, o: 0, y: -10, r: 3, className: 'tt-metal tt-ring', style: { height: '52%', borderRadius: 3 } },
  { w: 13, o: 11, y: 20, r: -7, className: 'tt-metal tt-ring', style: { height: '52%', borderRadius: 3 }, windows: true },
  { w: 12, o: 22, y: -22, r: 10, className: 'tt-metal tt-ring', style: { height: '52%', borderRadius: 3 } },
  { w: 14, o: 34, y: 12, r: -12, className: 'tt-metal', style: { height: '52%', clipPath: 'polygon(0 0, 42% 4%, 78% 24%, 100% 50%, 78% 76%, 42% 96%, 0 100%)' } }
];

const Series: React.FC = () => {
  const ref = useScrollProgress<HTMLElement>('pin');
  return (
    <section ref={ref} className="tt-series">
      <div className="tt-stick">
        <div className="mx-auto max-w-[1320px] px-[max(20px,4vw)] pt-[calc(env(safe-area-inset-top,0px)+9svh)]">
          <LabelRow label="The series" />
          <p className="tt-display m-0 mt-[6svh] max-w-[1100px] text-[clamp(28px,4.3vw,64px)] leading-[1.12]">
            To put the people building NASA’s future in a room in Houston — and let anyone walk in
            and ask them a question.
          </p>
        </div>

        <div className="tt-rocket" aria-hidden="true">
          {rocket.map((part, i) => (
            <div
              key={i}
              className={`tt-part ${part.className}`}
              style={{ width: `${part.w}%`, '--o': `${part.o}vw`, '--y': `${part.y}px`, '--r': `${part.r}deg`, ...part.style } as VarStyle}
            >
              {part.windows && (
                <span
                  className="absolute inset-x-[10%] top-[32%] bottom-[32%]"
                  style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.55) 0 2px, transparent 2px 16px)' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 5. what happens */

// x/y/a = desktop placement; xm/ym/am = phone placement (labels always point right so they stay on screen)
const spheres = [
  { label: 'Listen', x: 18, y: 30, a: '-32deg', xm: 24, ym: 12, am: '-24deg', size: 'clamp(100px,15vw,210px)', sp: '18vh' },
  { label: 'Ask', x: 64, y: 22, a: '-24deg', xm: 34, ym: 38, am: '22deg', size: 'clamp(80px,10vw,150px)', sp: '-14vh' },
  { label: 'Meet', x: 40, y: 64, a: '28deg', xm: 26, ym: 63, am: '-20deg', size: 'clamp(110px,17vw,240px)', sp: '26vh' },
  { label: 'Build', x: 78, y: 74, a: '-40deg', xm: 42, ym: 87, am: '18deg', size: 'clamp(60px,7vw,104px)', sp: '-22vh' }
];

const WhatHappens: React.FC = () => {
  const ref = useScrollProgress<HTMLDivElement>('pass');
  return (
    <section className="tt-dark">
      <div className="mx-auto max-w-[1320px] px-[max(20px,4vw)] pt-[clamp(90px,14vw,180px)]">
        <ScrollReveal>
          <h2 className="tt-display m-0 text-[clamp(44px,7.4vw,112px)]">
            What happens
            <br />
            at a talk
          </h2>
          <p className="tt-mono m-0 mt-10 max-w-[900px] text-[clamp(12px,1.2vw,15px)] leading-[2] text-white/90">
            At 6:00 PM on a Thursday, someone who does the work — an engineer, a scientist, a founder —
            takes the stage at The Ion. You hear the story behind a real NASA problem, straight from the
            source. By 7:00 PM the floor is yours.
          </p>
        </ScrollReveal>
      </div>

      <div ref={ref} className="relative mt-16 h-[clamp(620px,110svh,980px)]">
        <div className="tt-grid absolute inset-0" aria-hidden="true" />
        {spheres.map((s) => (
          <div
            key={s.label}
            className="tt-sphere-wrap"
            style={
              {
                '--x': `${s.x}%`,
                '--y': `${s.y}%`,
                '--ad': s.a,
                '--xm': `${s.xm}%`,
                '--ym': `${s.ym}%`,
                '--am': s.am,
                '--size': s.size,
                '--sp': s.sp
              } as VarStyle
            }
          >
            <span className="tt-chrome" aria-hidden="true" />
            <span className="tt-leader">
              <span className="tt-tag">
                <span className="tt-dot" aria-hidden="true" />
                <span className="tt-mono text-[clamp(14px,1.5vw,20px)] tracking-[0.12em]">{s.label}</span>
              </span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 6. deep dives */

const DeepDives: React.FC = () => {
  const ref = useScrollProgress<HTMLElement>('pass');
  const boxes = [
    'Every talk is led by the people doing the work — engineers, scientists, clinicians and space entrepreneurs from across Houston’s space community.',
    'Topics have ranged from Artemis and lunar spacesuits to space food, AI medical agents and manufacturing in microgravity.',
    'Thursday evening, Midtown Houston, done by 7 PM. The story so far goes something like this…'
  ];
  return (
    <section ref={ref} className="bg-black px-[max(20px,4vw)] py-[clamp(90px,12vw,170px)] text-white">
      <div className="relative mx-auto max-w-[1180px]">
        <h2 className="tt-display relative z-0 m-0 whitespace-nowrap text-center text-[clamp(52px,12vw,190px)]">Deep dives</h2>
        <div className="absolute left-1/2 top-1/2 z-10 w-[clamp(110px,17vw,250px)] -translate-x-1/2 -translate-y-[46%]">
          <Asteroid className="tt-asteroid block w-full drop-shadow-[0_20px_40px_rgba(255,255,255,0.12)]" />
        </div>
      </div>

      <div className="mx-auto mt-[clamp(60px,9vw,120px)] max-w-[960px]">
        {boxes.map((b, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div className="tt-link-line" aria-hidden="true" />}
            <ScrollReveal>
              <p className="tt-box tt-mono m-0 px-[clamp(18px,3vw,32px)] py-[clamp(20px,3vw,30px)] text-[clamp(12px,1.25vw,15px)] leading-[1.9]">
                {b}
              </p>
            </ScrollReveal>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- 7. counters */

const heldCount =
  techTalks2025.filter((t) => t.status === 'normal').length + techTalks2026.filter((t) => t.status === 'normal').length;
const upcoming2026 = techTalks2026.filter((t) => t.status === 'upcoming');

const Counter: React.FC<{ value: number; caption: string; align: 'left' | 'right' }> = ({ value, caption, align }) => {
  const box = useRef<HTMLDivElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const [shown, setShown] = useState(value);
  const [vb, setVb] = useState<[number, number, number, number]>([0, 0, String(value).length * 210 + 20, 330]);

  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready.then(() => {
      const t = textRef.current;
      if (!t || cancelled) return;
      const b = t.getBBox();
      setVb([b.x - 8, b.y + b.height * 0.2, b.width + 16, b.height * 0.8]);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia(REDUCED_MOTION).matches) return;
    setShown(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const k = Math.min(1, (now - start) / 1600);
          setShown(Math.round(value * (1 - Math.pow(1 - k, 3))));
          if (k < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  const right = align === 'right';
  return (
    <div ref={box} className={`flex min-h-[78svh] flex-col justify-center ${right ? 'items-end text-right' : 'items-start'}`}>
      <svg
        viewBox={vb.join(' ')}
        className="block h-[clamp(150px,27vw,400px)] w-auto max-w-full overflow-visible"
        style={{ aspectRatio: `${vb[2]} / ${vb[3]}` }}
        role="img"
        aria-label={String(value)}
      >
        {/* invisible final value, used only to size the viewBox */}
        <text ref={textRef} x="0" y="300" fontSize="380" fontFamily="'Poiret One', sans-serif" strokeWidth="9" visibility="hidden">
          {value}
        </text>
        <text
          x={right ? vb[0] + vb[2] - 8 : vb[0] + 8}
          y="300"
          textAnchor={right ? 'end' : 'start'}
          fontSize="380"
          fontFamily="'Poiret One', sans-serif"
          fill="url(#tt-tex)"
          stroke="url(#tt-tex)"
          strokeWidth="9"
        >
          {shown}
        </text>
      </svg>
      <p className="tt-mono m-0 mt-6 max-w-[560px] text-[clamp(12px,1.3vw,16px)] leading-[1.8]">{caption}</p>
    </div>
  );
};

const Counters: React.FC = () => (
  <section className="tt-counters relative overflow-hidden px-[max(20px,4vw)] pb-[8vh] pt-[18vh]">
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <pattern id="tt-tex" patternUnits="userSpaceOnUse" width="1200" height="700">
          <image href="/tech-talks/nebula-dark.jpg" width="1200" height="700" preserveAspectRatio="xMidYMid slice" />
        </pattern>
      </defs>
    </svg>
    <div className="relative mx-auto max-w-[1320px]">
      <Counter
        value={heldCount}
        align="left"
        caption={`Talks held at The Ion since January 2025 — ${techTalks2025.filter((t) => t.status === 'normal').length} last year, ${techTalks2026.filter((t) => t.status === 'normal').length} so far this year.`}
      />
      <div className="relative">
        <Sparkle className="absolute right-[4%] top-[8%] w-[clamp(44px,6vw,84px)]" />
        <svg className="pointer-events-none absolute right-[2%] top-[14%] hidden h-[70%] w-[22%] md:block" viewBox="0 0 100 300" preserveAspectRatio="none" aria-hidden="true">
          <path d="M20 0 C 90 60, 110 180, 60 300" fill="none" stroke="#0e0e0e" strokeWidth="1" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
        </svg>
        <Counter value={60} align="right" caption="Minutes, Thursday evening, 6:00 to 7:00 PM CDT. Long enough to go deep, short enough to make it after work." />
      </div>
      <Counter
        value={upcoming2026.length}
        align="left"
        caption={`Talks left on the 2026 calendar: ${upcoming2026.map((t) => `${t.month} ${t.day}`).join(' and ')}. Then it’s hack weekend.`}
      />
    </div>
  </section>
);

/* ---------------------------------------------------------------- 8. horizontal statement */

const Horizon: React.FC = () => {
  const ref = useScrollProgress<HTMLElement>('pin');
  return (
    <section ref={ref} className="tt-horizon" aria-label="See you at The Ion">
      <div className="tt-stick">
        <WireGlobe className="tt-glow-globe absolute left-1/2 top-1/2 w-[min(58vw,56svh)] min-w-[240px] -translate-x-1/2 -translate-y-1/2" spin={30} strokeWidth={0.9} />
        <p className="tt-display tt-sweep m-0" aria-hidden="true">
          See you at The Ion
        </p>
        <p className="tt-mono absolute inset-x-0 bottom-[8svh] m-0 px-6 text-center text-[13px]">
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
        stroke="#DFFF4F"
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
              c.next ? 'tt-star-next h-3.5 w-3.5 bg-[#DFFF4F]' : c.hack ? 'h-5 w-5 border-2 border-[#DFFF4F]' : 'h-2 w-2 bg-white/80'
            }`}
            aria-hidden="true"
          />
          <span className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap text-center">
            <span className={`tt-mono block text-[13px] ${c.next || c.hack ? 'text-[#DFFF4F]' : 'text-white/75'}`}>{c.label}</span>
            <span className="tt-mono mt-1 block text-[11px] text-white/60">{c.sub}</span>
          </span>
        </li>
      ))}
    </ol>
  </div>
);

const Constellation: React.FC = () => {
  const ref = useScrollProgress<HTMLElement>('pass');
  return (
    <section id="tt-upcoming" ref={ref} className="tt-nebula relative overflow-hidden scroll-mt-0">
      <img src="/tech-talks/nebula.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#e4def8_0%,rgba(10,8,20,0.35)_22%,rgba(5,4,10,0.55)_70%,#f5f4f3_100%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1320px] px-[max(20px,4vw)] pb-[22vh] pt-[26vh]">
        <h2 className="tt-display m-0 text-[clamp(44px,7.4vw,112px)]">
          Next on
          <br />
          the map
        </h2>
        <p className="tt-mono m-0 mt-8 max-w-[640px] text-[clamp(12px,1.2vw,15px)] leading-[1.9] text-white/90">
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
  { year: '2025', talks: techTalks2025 }
];

const Archive: React.FC = () => {
  const [year, setYear] = useState('2026');
  const talks = [...(years.find((y) => y.year === year)?.talks ?? [])].reverse();

  return (
    <section className="bg-[#f5f4f3] px-[max(20px,4vw)] py-[clamp(80px,10vw,150px)]" aria-labelledby="tt-archive">
      <div className="mx-auto max-w-[1320px]">
        <LabelRow label="Every talk so far" />
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <h2 id="tt-archive" className="tt-display m-0 text-[clamp(44px,7.4vw,112px)]">
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
                className="tt-tab tt-mono cursor-pointer rounded-full border border-[#0e0e0e] bg-transparent px-5 py-2.5 text-[13px] text-[#0e0e0e]"
              >
                {y.year}
              </button>
            ))}
          </div>
        </div>

        <ol className="m-0 mt-12 list-none border-b border-black/15 p-0">
          {talks.map((t) => {
            const canceled = t.status === 'canceled';
            const next = t.status === 'upcoming';
            const who = [t.speaker, t.role].filter(Boolean).join(' — ') || (t.venue ? `At ${t.venue}` : '');
            return (
              <li
                key={`${year}-${t.month}`}
                className="tt-row grid gap-x-8 gap-y-2 border-t border-black/15 px-2 py-6 md:grid-cols-[130px_minmax(0,1fr)_minmax(0,34%)] md:px-4"
              >
                <p className="tt-mono m-0 flex items-center gap-2.5 text-[14px]">
                  {next && <span className="h-2.5 w-2.5 rounded-full bg-[#b9d80f] shadow-[0_0_10px_rgba(185,216,15,0.9)]" aria-hidden="true" />}
                  {t.month} {t.day}
                </p>
                <div className={canceled ? 'opacity-45' : ''}>
                  <h3 className="tt-display m-0 text-[clamp(22px,2.4vw,34px)] leading-[1.1]">{canceled ? 'Canceled' : t.title}</h3>
                  {(who || next) && (
                    <p className="tt-mono m-0 mt-2 text-[12px] leading-[1.7] text-[#555]">{next ? 'Upcoming · Speaker TBA' : who}</p>
                  )}
                </div>
                <p className="m-0 text-[13px] leading-[1.75] text-[#444]">
                  {next ? `${t.time} · ${t.venue}. Topic to be announced.` : t.desc ?? ''}
                </p>
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
        <h2 className="tt-display m-0 text-[clamp(40px,7vw,104px)] leading-[1.08]" style={{ transform: 'translateY(calc(var(--p, 0) * -8svh))' }}>
          {lines.map((l, i) => (
            <span
              key={l}
              className={`tt-q tt-focus-line${i === lines.length - 1 ? ' is-last' : ''}`}
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
  <section className="bg-black px-[max(20px,4vw)] pb-[clamp(90px,12vw,160px)] pt-[clamp(90px,12vw,160px)] text-white">
    <div className="mx-auto max-w-[1320px]">
      <h2 className="tt-display m-0 text-[clamp(44px,7.4vw,112px)]">
        Space Apps
        <br />
        Houston 2026
      </h2>
      <p className="tt-mono m-0 mt-8 max-w-[860px] text-[clamp(12px,1.2vw,15px)] leading-[1.9]">
        Tech Talks run all year. The hackathon is one weekend — November 14–15, 2026. Bring what you
        learned, or{' '}
        <a href="#/" className="text-white underline underline-offset-4 hover:text-[#DFFF4F]">
          find your place
        </a>{' '}
        on the team.
      </p>
      <div className="mt-[clamp(60px,9vw,110px)]">
        <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="tt-orb">
          <span className="font-['Fira_Sans',sans-serif] text-[clamp(18px,2vw,26px)] font-medium uppercase tracking-[0.02em]">
            Register now
          </span>
        </a>
      </div>
      <div className="tt-mono mt-[clamp(60px,8vw,100px)] flex flex-wrap gap-x-10 gap-y-4 text-[13px]">
        <a href="#/get-involved" className="text-white/80 hover:text-[#DFFF4F]">
          ← Get involved with NASA
        </a>
        <a href="#/opportunities" className="text-white/80 hover:text-[#DFFF4F]">
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
    <Words />
    <Globes />
    <Series />
    <WhatHappens />
    <DeepDives />
    <Counters />
    <Horizon />
    <Constellation />
    <Archive />
    <Focus />
    <Final />
  </div>
);

export default TechTalksSection;
