import React from 'react';
import { Users, Globe, Settings, BarChart3 } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { PortalRow, PortalItem, photoArt } from '../ui/PortalRow';

const YELLOW = '#EAFE07';
const BLUE = '#2E96F5';
const RED = '#E43700';

// Photos: NASA public-domain imagery (images.nasa.gov) —
// jsc2026e022251, iss022e078463 (Houston at night), jsc2024e028394, iss064e002894.
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
    Art: photoArt('/photos/wis-who.jpg')
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
    Art: photoArt('/photos/wis-when.jpg', '50% 45%')
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
    Art: photoArt('/photos/wis-how.jpg', '32% 30%')
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
    Art: photoArt('/photos/wis-why.jpg', '50% 70%')
  }
];

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
      <PortalRow items={portals} rowClassName="lg:h-[clamp(480px,42vw,560px)]" mobileClosed={136} mobileOpen={520} />
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
