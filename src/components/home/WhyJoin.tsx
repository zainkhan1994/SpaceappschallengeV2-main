import React from 'react';
import { Lightbulb, Users, Trophy, Wrench, Globe, MapPin } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { PortalRow, PortalItem, useMediaQuery, WIDE_QUERY } from '../ui/PortalRow';
import { benefits } from '../../data/homeData';

const YELLOW = '#EAFE07';

// Deterministic sparkle positions inside a viewBox.
const sparkles = (n: number, w: number, h: number, seed = 1) =>
  Array.from({ length: n }, (_, i) => [((i * 97 + seed * 31) % 100) / 100 * w, ((i * 61 + seed * 17) % 100) / 100 * h] as const);

const Twinkles: React.FC<{ pts: readonly (readonly [number, number])[]; r?: number; color?: string }> = ({ pts, r = 3, color = '#fff' }) => (
  <>
    {pts.map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? r * 1.4 : r} fill={color} className="wp-twinkle" style={{ animationDelay: `${(i % 9) * 0.27}s` }} />
    ))}
  </>
);

/* ---------- Portal artwork ---------- */

const InnovationArt: React.FC = () => (
  <>
    <img src="/why/innovation.jpg" alt="" className="wp-plate absolute inset-0 w-full h-full object-cover object-center" />
    <svg viewBox="0 0 1024 720" preserveAspectRatio="xMidYMid slice" className="wp-overlay absolute inset-0 w-full h-full">
      <Twinkles pts={sparkles(16, 1024, 300, 3)} r={3.5} />
      <circle cx="735" cy="375" r="34" fill="none" stroke="#FF8A3D" strokeWidth="4" className="wp-pulse" />
      <circle cx="735" cy="375" r="34" fill="none" stroke={YELLOW} strokeWidth="3" className="wp-pulse" style={{ animationDelay: '1.1s' }} />
    </svg>
  </>
);

// Yellow connection nodes on the globe artwork (cropped frame coordinates).
const NETWORK_NODES = [[333, 72], [160, 310], [803, 161], [893, 330], [886, 524], [795, 661], [682, 790]] as const;

const NetworkingArt: React.FC = () => (
  <>
    <img src="/why/network-globe.jpg" alt="" className="wp-plate absolute inset-0 w-full h-full object-cover object-center" />
    <svg viewBox="0 0 1024 852" preserveAspectRatio="xMidYMid slice" className="wp-overlay absolute inset-0 w-full h-full">
      {NETWORK_NODES.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="22" fill="none" stroke={YELLOW} strokeWidth="4" className="wp-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
    </svg>
  </>
);

const AWARDS = ['/awards/technology-full.png', '/awards/science-full.png', '/awards/inspirational-full.png'];

const PrizesArt: React.FC = () => (
  <>
    <div className="wp-plate absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_38%,rgba(228,55,0,0.32),rgba(46,150,245,0.12)_50%,transparent_75%)]" />
    <div className="absolute inset-x-0 top-[12%] h-[50%] flex items-center justify-center">
      {AWARDS.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className="wp-award absolute w-[clamp(92px,10.5vw,156px)] rounded-xl border border-white/15 shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
          style={
            {
              '--r': `${(i - 1) * 12}deg`,
              '--x': `${(i - 1) * 64}%`,
              '--d': `${0.12 + i * 0.1}s`,
              zIndex: i === 1 ? 2 : 1
            } as React.CSSProperties
          }
        />
      ))}
    </div>
    <svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" className="wp-overlay absolute inset-0 w-full h-full">
      <Twinkles pts={sparkles(12, 600, 260, 7)} r={2.4} color={YELLOW} />
    </svg>
  </>
);

const SkillsArt: React.FC = () => (
  <>
    <img src="/why/skills.jpg" alt="" className="wp-plate absolute inset-0 w-full h-full object-cover object-center" />
    <svg viewBox="0 0 1024 640" preserveAspectRatio="xMidYMid slice" className="wp-overlay absolute inset-0 w-full h-full">
      <Twinkles pts={[[180, 70], [120, 330], [250, 400], [880, 200], [930, 110], [790, 260]]} r={4} color="#9FD0FF" />
      <circle cx="512" cy="80" r="40" fill="none" stroke="#2E96F5" strokeWidth="3" className="wp-pulse" />
    </svg>
  </>
);

const ImpactArt: React.FC = () => (
  <>
    <img src="/why/impact.jpg" alt="" className="wp-plate absolute inset-0 w-full h-full object-cover object-center" />
    <svg viewBox="0 0 1880 860" preserveAspectRatio="xMidYMid slice" className="wp-overlay absolute inset-0 w-full h-full">
      <Twinkles pts={sparkles(18, 700, 520, 5).map(([x, y]) => [1050 + x, 60 + y] as const)} r={5} color={YELLOW} />
    </svg>
  </>
);

const LocalArt: React.FC = () => (
  <>
    <img src="/why/local.jpg" alt="" className="wp-plate absolute inset-0 w-full h-full object-cover object-center" />
    <svg viewBox="0 0 1440 546" preserveAspectRatio="xMidYMid slice" className="wp-overlay absolute inset-0 w-full h-full">
      <circle cx="720" cy="270" r="18" fill="none" stroke={YELLOW} strokeWidth="4" className="wp-pulse" />
      <circle cx="720" cy="270" r="18" fill="none" stroke={YELLOW} strokeWidth="3" className="wp-pulse" style={{ animationDelay: '1.1s' }} />
      <Twinkles pts={sparkles(12, 520, 90, 9).map(([x, y]) => [480 + x, 50 + y] as const)} r={3} color="#BFE0FF" />
    </svg>
  </>
);

/* ---------- Content (titles, colours and descriptions come from homeData.benefits) ---------- */

const extras: Pick<PortalItem, 'short' | 'headline' | 'Icon' | 'Art'>[] = [
  { short: 'Work on real NASA challenges.', headline: ['Innovation &', 'learning.'], Icon: Lightbulb, Art: InnovationArt },
  { short: 'Meet Houston’s space community.', headline: ['Networking.', 'Connect & collaborate.'], Icon: Users, Art: NetworkingArt },
  { short: 'Local awards, global judging.', headline: ['Prizes &', 'recognition.'], Icon: Trophy, Art: PrizesArt },
  { short: 'Hands-on space experience.', headline: ['Skill', 'development.'], Icon: Wrench, Art: SkillsArt },
  { short: 'Help NASA’s missions.', headline: ['Community', 'impact.'], Icon: Globe, Art: ImpactArt },
  { short: 'Be part of Space City.', headline: ['Space City.', 'Local relevance.'], Icon: MapPin, Art: LocalArt }
];

const items: PortalItem[] = benefits.map((b, i) => ({
  key: b.title,
  num: String(i + 1).padStart(2, '0'),
  title: b.title,
  accent: b.dot,
  detail: b.desc,
  ...extras[i]
}));

const rowProps = {
  rowClassName: 'lg:h-[clamp(380px,32vw,440px)]',
  mobileClosed: 124,
  mobileOpen: 470,
  activeGrow: 2.2,
  compressedGrow: 0.8,
  headlineClassName: 'text-[clamp(22px,2.2vw,32px)]',
  revealMinWidthClassName: 'lg:min-w-[380px]'
};

export const WhyJoin: React.FC = () => {
  const wide = useMediaQuery(WIDE_QUERY);

  return (
    <section data-screen-label="Why Join" className="py-[clamp(64px,8vw,120px)] px-6 bg-gradient-to-b from-transparent via-[rgba(0,66,166,0.22)] to-transparent">
      <div className="max-w-[1320px] mx-auto">
        <ScrollReveal>
          <h2 className="m-0 mb-3.5 font-['Overpass',sans-serif] font-black text-[clamp(30px,4.2vw,54px)] uppercase leading-tight text-white">
            Why join Space Apps <span className="text-[#EAFE07]">Houston?</span>
          </h2>
          <p className="m-0 mb-12 max-w-[680px] text-[19px] leading-relaxed text-white/78 font-light">
            Discover the benefits and opportunities that await you at Houston's premier space hackathon.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          {wide ? (
            <div className="grid gap-3">
              <PortalRow items={items.slice(0, 3)} {...rowProps} />
              <PortalRow items={items.slice(3)} {...rowProps} />
            </div>
          ) : (
            <PortalRow items={items} {...rowProps} />
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WhyJoin;
