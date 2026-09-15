import React from 'react';
import { Users, Globe, Settings, BarChart3, Database, FileText, Code2, Rocket } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { PortalRow, PortalItem, rgba } from '../ui/PortalRow';

const YELLOW = '#EAFE07';
const BLUE = '#2E96F5';
const RED = '#E43700';

/* ---------- Portal artwork ---------- */

const PhotoGrade: React.FC = () => <div className="absolute inset-0 bg-[rgba(4,12,40,0.5)] mix-blend-multiply" />;

const WhoArt: React.FC = () => {
  const ribbons = [
    { c: YELLOW, d: 'M-20 330 C 110 270, 210 400, 310 330 S 500 270, 640 320' },
    { c: BLUE, d: 'M-20 372 C 130 320, 250 430, 350 368 S 530 330, 640 368' },
    { c: RED, d: 'M-20 410 C 100 390, 230 460, 370 412 S 550 380, 640 420' }
  ];
  return (
    <>
      <img
        src="/Pictures/53CB2172-6F73-4480-B48A-C71E36145036_1_105_c.jpeg"
        alt=""
        className="wp-photo absolute inset-0 w-full h-full object-cover object-[50%_45%]"
      />
      <PhotoGrade />
      <svg viewBox="0 0 600 520" preserveAspectRatio="xMidYMid slice" className="wp-overlay absolute inset-0 w-full h-full">
        <defs>
          <filter id="wp-who-glow" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        {ribbons.map((r, i) => (
          <g key={i}>
            <path d={r.d} fill="none" stroke={r.c} strokeWidth="7" opacity="0.45" filter="url(#wp-who-glow)" />
            <path d={r.d} fill="none" stroke={r.c} strokeWidth="2.2" strokeDasharray="18 12" className="wp-flow" style={{ animationDelay: `${-i * 0.6}s` }} />
          </g>
        ))}
        {[[118, 300], [236, 352], [310, 330], [402, 318], [500, 298]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4.5" fill="#fff" className="wp-twinkle" style={{ animationDelay: `${i * 0.35}s` }} />
        ))}
      </svg>
    </>
  );
};

// Deterministic scatter of Local Event points around the globe.
const EVENT_DOTS = Array.from({ length: 46 }, (_, i) => {
  const a = (i * 137.508 * Math.PI) / 180;
  const r = 36 + ((i * 53) % 100) * 2.2;
  return [300 + Math.cos(a) * r * 1.25, 290 + Math.sin(a) * r * 0.72] as const;
});

const WhenArt: React.FC = () => (
  <>
    <img src="/journey-earth.jpg" alt="" className="wp-plate absolute inset-0 w-full h-full object-cover object-[42%_50%]" />
    <svg viewBox="0 0 600 520" preserveAspectRatio="xMidYMid slice" className="wp-overlay absolute inset-0 w-full h-full">
      <defs>
        <radialGradient id="wp-when-halo">
          <stop offset="0" stopColor={YELLOW} stopOpacity="0.5" />
          <stop offset="1" stopColor={YELLOW} stopOpacity="0" />
        </radialGradient>
      </defs>
      {EVENT_DOTS.filter((_, i) => i % 9 === 0).map(([x, y], i) => (
        <path
          key={`arc-${i}`}
          d={`M 300 290 Q ${(300 + x) / 2} ${Math.min(290, y) - 60} ${x} ${y}`}
          fill="none"
          stroke={BLUE}
          strokeWidth="1.2"
          strokeDasharray="6 6"
          opacity="0.7"
          className="wp-flow"
        />
      ))}
      {EVENT_DOTS.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 5 === 0 ? 2.6 : 1.7}
          fill={i % 7 === 0 ? YELLOW : '#BFE0FF'}
          className="wp-twinkle"
          style={{ animationDelay: `${(i % 11) * 0.23}s` }}
        />
      ))}
      <circle cx="300" cy="290" r="48" fill="url(#wp-when-halo)" />
      <circle cx="300" cy="290" r="10" fill="none" stroke={YELLOW} strokeWidth="2" className="wp-pulse" />
      <circle cx="300" cy="290" r="6" fill={YELLOW} />
      <g transform="translate(318 256)">
        <rect width="94" height="26" rx="13" fill="rgba(5,10,28,0.85)" stroke="rgba(255,255,255,0.7)" />
        <text x="47" y="17.5" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700" letterSpacing="1.6" fontFamily="'Fira Sans Condensed', sans-serif">
          HOUSTON
        </text>
      </g>
    </svg>
  </>
);

const HOW_STEPS = [
  { label: 'NASA data', Icon: Database, c: BLUE },
  { label: 'Challenge', Icon: FileText, c: RED },
  { label: 'Team', Icon: Users, c: BLUE },
  { label: 'Build', Icon: Code2, c: BLUE },
  { label: 'Solution', Icon: Rocket, c: BLUE }
];

const HowArt: React.FC = () => (
  <>
    <img
      src="/Pictures/DF87140A-6D4C-4E68-A027-1F1B9D7B7790_1_105_c.jpeg"
      alt=""
      className="wp-photo absolute inset-0 w-full h-full object-cover object-[55%_50%]"
    />
    <PhotoGrade />
    <div className="wp-overlay absolute left-1/2 top-[22%] lg:top-[26%] -translate-x-1/2 w-[92%] max-w-[520px] min-w-0 lg:min-w-[400px] rounded-2xl border border-[rgba(46,150,245,0.35)] bg-[rgba(5,12,32,0.72)] backdrop-blur-sm px-4 py-4 shadow-[0_0_40px_rgba(46,150,245,0.25)]">
      <div className="relative flex justify-between">
        <div className="absolute left-[22px] right-[22px] top-[21px] lg:left-[27px] lg:right-[27px] lg:top-[26px] h-[2px] overflow-hidden rounded-full bg-[linear-gradient(90deg,#2E96F5,#E43700_25%,#2E96F5_50%,#2E96F5)]">
          <span className="wp-shimmer absolute inset-y-0 left-0 w-1/4 bg-[linear-gradient(90deg,transparent,#fff,transparent)]" />
        </div>
        {HOW_STEPS.map(({ label, Icon, c }, i) => (
          <div
            key={label}
            className="wp-step relative flex flex-col items-center gap-1.5 lg:gap-2 w-[48px] lg:w-[58px]"
            style={{ '--d': `${0.18 + i * 0.12}s` } as React.CSSProperties}
          >
            <span
              className="grid place-items-center w-[44px] h-[44px] lg:w-[54px] lg:h-[54px] rounded-full border-2 bg-[#050A1C]"
              style={{ borderColor: c, boxShadow: `0 0 18px ${rgba(c, 0.55)}` }}
            >
              <Icon aria-hidden="true" className="w-[18px] h-[18px] lg:w-[22px] lg:h-[22px]" strokeWidth={1.7} style={{ color: c === RED ? '#FF8A66' : '#9FD0FF' }} />
            </span>
            <span className="text-[9px] lg:text-[10px] font-bold tracking-wider lg:tracking-widest uppercase text-white/85 text-center leading-tight">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </>
);

const WhyArt: React.FC = () => {
  const src = [150, 330] as const;
  const targets = [
    { x: 330, y: 120, c: BLUE, label: 'Science' },
    { x: 440, y: 190, c: YELLOW, label: 'Collaboration' },
    { x: 500, y: 280, c: RED, label: 'STEM' },
    { x: 230, y: 70, c: RED, label: 'Real-world impact' },
    { x: 560, y: 130, c: BLUE },
    { x: 410, y: 60, c: YELLOW }
  ];
  return (
    <>
      <img src="/journey-earth.jpg" alt="" className="wp-plate absolute inset-0 w-full h-full object-cover object-[70%_40%]" />
      <svg viewBox="0 0 600 520" preserveAspectRatio="xMidYMid slice" className="wp-overlay absolute inset-0 w-full h-full">
        <defs>
          <filter id="wp-why-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        {targets.map((t, i) => {
          const d = `M ${src[0]} ${src[1]} Q ${(src[0] + t.x) / 2 - 40} ${Math.min(src[1], t.y) - 80} ${t.x} ${t.y}`;
          return (
            <g key={i}>
              <path d={d} fill="none" stroke={t.c} strokeWidth="5" opacity="0.35" filter="url(#wp-why-glow)" />
              <path d={d} fill="none" stroke={t.c} strokeWidth="1.8" strokeDasharray="12 8" className="wp-flow" style={{ animationDelay: `${-i * 0.4}s` }} />
              <circle cx={t.x} cy={t.y} r="4" fill="#fff" className="wp-twinkle" style={{ animationDelay: `${i * 0.3}s` }} />
              {t.label && (
                <text x={t.x + 10} y={t.y - 8} fill="#fff" fontSize="11" fontWeight="700" letterSpacing="1.4" fontFamily="'Fira Sans Condensed', sans-serif">
                  {t.label.toUpperCase()}
                </text>
              )}
            </g>
          );
        })}
        <circle cx={src[0]} cy={src[1]} r="18" fill={YELLOW} opacity="0.35" filter="url(#wp-why-glow)" />
        <circle cx={src[0]} cy={src[1]} r="10" fill="none" stroke={YELLOW} strokeWidth="2" className="wp-pulse" />
        <circle cx={src[0]} cy={src[1]} r="6" fill="#fff" />
      </svg>
    </>
  );
};

const portals: PortalItem[] = [
  {
    key: 'who',
    num: '01',
    title: 'Who',
    short: 'Everyone is welcome.',
    accent: YELLOW,
    headline: ['Everyone.', 'Teams of 1–6.'],
    detail: 'Coders, scientists, designers, storytellers, educators, students, makers and builders — no matter their background, age, or skill level.',
    chip: 'All minds welcome',
    Icon: Users,
    href: '#/faq',
    cta: 'Who can join',
    Art: WhoArt
  },
  {
    key: 'when',
    num: '02',
    title: 'When & Where',
    short: 'One weekend, worldwide.',
    accent: BLUE,
    headline: ['November 14–15, 2026', 'Houston, Texas'],
    detail: 'One of hundreds of in-person and virtual Local Events happening worldwide the same weekend.',
    chip: 'A global event',
    Icon: Globe,
    href: '#/venue',
    cta: 'Venue details',
    Art: WhenArt
  },
  {
    key: 'how',
    num: '03',
    title: 'How',
    short: 'Choose. Build. Make an impact.',
    accent: BLUE,
    headline: ['Choose. Build.', 'Make an impact.'],
    detail: 'Challenges are authored by NASA Subject Matter Experts. You join a team, pick a challenge, and build across the weekend. Judges evaluate projects and NASA recognizes 10 Global Winners.',
    chip: 'Real solutions',
    Icon: Settings,
    href: '#/challenges',
    cta: 'See the challenges',
    Art: HowArt
  },
  {
    key: 'why',
    num: '04',
    title: 'Why',
    short: 'Real problems. Brighter futures.',
    accent: RED,
    headline: ['Real problems.', 'Brighter futures.'],
    detail: "Raise awareness of NASA's free and open data, inspire creativity and collaboration, and nurture an interest in STEM.",
    chip: 'Lasting impact',
    Icon: BarChart3,
    href: '#/about',
    cta: 'Why it matters',
    Art: WhyArt
  }
];

/* ---------- Section ---------- */

export const WhatIsSpaceApps: React.FC = () => (
  <section data-screen-label="What is Space Apps" className="max-w-[1320px] mx-auto py-[clamp(64px,8vw,120px)] px-6">
    <ScrollReveal>
      <div className="flex flex-wrap items-start justify-between gap-8 mb-[clamp(32px,4vw,48px)]">
        <div className="max-w-[760px]">
          <h2 className="m-0 mb-3.5 font-['Overpass',sans-serif] font-black text-[clamp(30px,4.2vw,54px)] leading-tight uppercase text-white">
            What is the
            <br />
            <span className="bg-[linear-gradient(90deg,#2E96F5_0%,#2E96F5_55%,#9AA8FF_80%,#E43700_100%)] bg-clip-text text-transparent">
              Space Apps Challenge?
            </span>
          </h2>
          <p className="m-0 max-w-[680px] text-[19px] leading-relaxed text-white/78 font-light">
            The largest annual global hackathon — engaging NASA and Space Agency Partners' free and open data to address real-world challenges on Earth and in space. Houston is one of hundreds of Local Events happening the same weekend worldwide.
          </p>
        </div>
        <div aria-hidden="true" className="hidden lg:block pt-2 font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-semibold uppercase tracking-[0.3em] leading-[2] text-white/60">
          People
          <br />
          Ideas
          <br />
          Data
          <br />
          Communities
          <br />
          Real impact
          <div className="mt-2 w-8 h-px bg-white/30" />
        </div>
      </div>
    </ScrollReveal>

    <ScrollReveal>
      <PortalRow items={portals} rowClassName="lg:h-[clamp(480px,42vw,560px)]" mobileClosed={136} mobileOpen={540} />
    </ScrollReveal>

    <div aria-hidden="true" className="mt-[clamp(28px,3.5vw,44px)] flex items-center justify-center gap-5">
      <span className="hidden sm:block h-px w-[clamp(32px,8vw,90px)] bg-white/20" />
      <span className="font-['Fira_Sans_Condensed',sans-serif] text-[clamp(10px,1vw,13px)] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.45em] text-white/60 text-center">
        Same curiosity. A brighter tomorrow.
      </span>
      <span className="hidden sm:block h-px w-[clamp(32px,8vw,90px)] bg-white/20" />
    </div>
  </section>
);

export default WhatIsSpaceApps;
