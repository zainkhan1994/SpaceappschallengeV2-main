import React, { useEffect, useState } from 'react';
import { Users, Lightbulb, Trophy, Heart, Handshake, Check, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { pathways } from '../../data/homeData';

interface Role {
  title: string;
  Icon: LucideIcon;
  short: string;
  detail: string;
  bullets: string[];
  cta: string;
  photo: string;
  position: string;
}

// Photos: NASA public-domain imagery (images.nasa.gov) —
// iss064e002941, jsc2026e019618, art002e021278, Artemis II at the pad (Jan. 2026), iss040e091208.
const roles: Role[] = [
  {
    title: 'Participate',
    Icon: Users,
    short: 'Join the hackathon, solve real-world challenges, and bring your ideas to life.',
    detail: 'Join as an individual or with a team. Work on real NASA challenges using open data, and build solutions that make an impact.',
    bullets: ['Students, professionals, creators, everyone', 'In-person or virtual', 'No cost to participate'],
    cta: 'Sign up to participate',
    photo: '/photos/fyp-participate.jpg',
    position: '50% 75%'
  },
  {
    title: 'Mentor',
    Icon: Lightbulb,
    short: 'Share your expertise and help teams turn their ideas into impact.',
    detail: 'Guide and support teams throughout the weekend. Share your knowledge in coding, design, data, business or space.',
    bullets: ['15+ mentors needed', 'NASA, industry, academia and community', 'Virtual or in-person'],
    cta: 'Become a mentor',
    photo: '/photos/fyp-mentor.jpg',
    position: '50% 50%'
  },
  {
    title: 'Judge',
    Icon: Trophy,
    short: 'Help recognize ideas that inspire and create change.',
    detail: 'Help evaluate projects and celebrate innovative solutions. Judges come from NASA, academia and industry.',
    bullets: ['Targeting 5–7 judges', 'Technical and non-technical roles', 'In-person or virtual'],
    cta: 'Apply to judge',
    photo: '/photos/fyp-judge.jpg',
    position: '50% 60%'
  },
  {
    title: 'Volunteer',
    Icon: Heart,
    short: 'Support the event and help make it an amazing experience for everyone.',
    detail: 'Help with event logistics, communications, team support, and more. Volunteers make the event possible.',
    bullets: ['On-site and virtual roles', 'Great for students and professionals', 'Be part of the behind-the-scenes team'],
    cta: 'Volunteer',
    photo: '/photos/fyp-volunteer.jpg',
    position: '50% 62%'
  },
  {
    title: 'Partner / Sponsor',
    Icon: Handshake,
    short: 'Support the next generation of innovators and help grow the Houston space community.',
    detail: 'Support the event through venue, food, prizes, tools, speakers, mentorship or financial contributions.',
    bullets: ['Showcase your organization', 'Support local talent', 'Invest in the future of Houston'],
    cta: 'Partner with us',
    photo: '/photos/fyp-partner.jpg',
    position: '50% 50%'
  }
];

const BG_MASK = 'radial-gradient(ellipse 70% 85% at 68% 30%, #000 25%, transparent 72%)';

export const FindYourPlace: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  const [canHover, setCanHover] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches);

  useEffect(() => {
    const q = window.matchMedia('(hover: hover) and (pointer: fine)');
    const onChange = () => setCanHover(q.matches);
    q.addEventListener('change', onChange);
    return () => q.removeEventListener('change', onChange);
  }, []);

  return (
    <section data-screen-label="Find Your Place" className="relative overflow-hidden py-[clamp(70px,8vw,124px)] px-6">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img
          src="/photos/fyp-bg.jpg"
          alt=""
          className="absolute right-0 top-0 h-[78%] w-full lg:w-[64%] object-cover object-[40%_30%] opacity-40"
          style={{ WebkitMaskImage: BG_MASK, maskImage: BG_MASK }}
        />
      </div>

      <div className="relative max-w-[1320px] mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-3 font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-bold tracking-[0.26em] uppercase text-[#2E96F5] mb-3">
            <span aria-hidden="true" className="h-px w-8 bg-[#EAFE07]" />
            Ways to get involved
          </div>
          <h2 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(32px,4.4vw,58px)] leading-tight uppercase text-white">
            Find your place
          </h2>
          <p className="mt-3 mb-[clamp(32px,4vw,52px)] max-w-[600px] text-[18px] leading-relaxed text-white/75 font-light">
            Students, professionals, creators and space enthusiasts — there’s a place for you.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
            onMouseLeave={() => canHover && setOpen(null)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(null);
            }}
          >
            {roles.map((r, i) => {
              const isOpen = open === i;
              const { Icon } = r;
              const href = pathways[i]?.href ?? '#/';
              const external = href.startsWith('http') || href.startsWith('mailto');
              return (
                <article
                  key={r.title}
                  data-open={isOpen}
                  tabIndex={0}
                  aria-label={`${r.title}: ${r.short}`}
                  // Hover, focus and tap all *set* the open card — none toggles.
                  onMouseEnter={() => canHover && setOpen(i)}
                  onFocus={() => setOpen(i)}
                  onClick={() => setOpen(i)}
                  className="group relative h-[420px] lg:h-[440px] overflow-hidden rounded-2xl border border-white/12 bg-[rgba(8,14,32,0.78)] cursor-pointer outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#2E96F5] data-[open=true]:border-white/30"
                >
                  <img
                    src={r.photo}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[58%] w-full object-cover transition-[opacity,transform] duration-700 group-data-[open=true]:opacity-25 group-data-[open=true]:scale-105"
                    style={{ objectPosition: r.position }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[58%] bg-[linear-gradient(180deg,rgba(8,14,32,1)_0%,rgba(8,14,32,0.35)_38%,rgba(8,14,32,0)_62%,rgba(8,14,32,0.6)_100%)]"
                  />

                  {/* Resting state */}
                  <div className="relative z-10 p-5 transition-opacity duration-300 group-data-[open=true]:opacity-0">
                    <Icon aria-hidden="true" size={30} strokeWidth={1.4} className="text-white" />
                    <h3 className="mt-4 mb-0 font-['Overpass',sans-serif] font-extrabold text-[20px] leading-tight text-white">{r.title}</h3>
                    <p className="mt-2 mb-0 text-[14px] leading-relaxed text-white/75">{r.short}</p>
                  </div>
                  <span className="absolute z-10 left-5 bottom-5 inline-flex items-center gap-1.5 font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-bold tracking-widest uppercase text-[#2E96F5] transition-opacity duration-300 group-data-[open=true]:opacity-0">
                    Learn more
                    <ArrowRight aria-hidden="true" size={14} />
                  </span>

                  {/* Revealed on hover / tap */}
                  <div className="absolute inset-0 z-20 flex flex-col p-5 bg-[rgba(8,14,32,0.9)] opacity-0 translate-y-3 pointer-events-none transition-[opacity,transform] duration-300 group-data-[open=true]:opacity-100 group-data-[open=true]:translate-y-0 group-data-[open=true]:pointer-events-auto">
                    <Icon aria-hidden="true" size={30} strokeWidth={1.4} className="text-white" />
                    <h3 className="mt-4 mb-0 font-['Overpass',sans-serif] font-extrabold text-[20px] leading-tight text-white">{r.title}</h3>
                    <p className="mt-2 mb-0 text-[14px] leading-relaxed text-white/80">{r.detail}</p>
                    <ul className="mt-4 mb-0 p-0 list-none grid gap-2.5">
                      {r.bullets.map((b) => (
                        <li key={b} className="flex gap-2 text-[13px] leading-snug text-white/85">
                          <Check aria-hidden="true" size={15} strokeWidth={2.4} className="mt-0.5 flex-none text-[#2E96F5]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      tabIndex={isOpen ? 0 : -1}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-auto block rounded-full border border-[#2E96F5] px-4 py-2.5 text-center text-[14px] font-semibold text-[#5FB4FF] transition-colors duration-200 hover:bg-[#2E96F5] hover:text-[#04122F]"
                    >
                      {r.cta}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FindYourPlace;
