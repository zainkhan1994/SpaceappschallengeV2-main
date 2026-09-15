import React from 'react';
import { Lightbulb, Users, Trophy, Wrench, Globe, MapPin } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { PortalRow, PortalItem, photoArt, useMediaQuery, WIDE_QUERY } from '../ui/PortalRow';
import { benefits } from '../../data/homeData';

// Photos: NASA public-domain imagery (images.nasa.gov) —
// KSC-20220816-PH-JBS01_0144, iss070e062746, KSC-20221116-PH-KLS01_0570,
// AFRC2025-0063-55, iss042e019343 (sunrise over Earth's limb), iss042e241898 (Texas & Gulf Coast at night).
const extras: Pick<PortalItem, 'short' | 'headline' | 'Icon' | 'Art'>[] = [
  { short: 'Work on real NASA challenges.', headline: ['Innovation &', 'learning.'], Icon: Lightbulb, Art: photoArt('/photos/wj-innovation.jpg', '35% 50%') },
  { short: 'Meet Houston’s space community.', headline: ['Networking.', 'Connect & collaborate.'], Icon: Users, Art: photoArt('/photos/wj-networking.jpg', '50% 60%') },
  { short: 'Local awards, global judging.', headline: ['Prizes &', 'recognition.'], Icon: Trophy, Art: photoArt('/photos/wj-prizes.jpg', '60% 35%') },
  { short: 'Hands-on space experience.', headline: ['Skill', 'development.'], Icon: Wrench, Art: photoArt('/photos/wj-skills.jpg') },
  { short: 'Help NASA’s missions.', headline: ['Community', 'impact.'], Icon: Globe, Art: photoArt('/photos/wj-impact.jpg', '50% 28%') },
  { short: 'Be part of Space City.', headline: ['Space City.', 'Local relevance.'], Icon: MapPin, Art: photoArt('/photos/wj-local.jpg') }
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
  mobileOpen: 440,
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
