import React from 'react';
import { ArrowRight } from 'lucide-react';
import BrighterTomorrowHero from '../get-involved/BrighterTomorrowHero';
import { ScrollReveal } from '../ui/ScrollReveal';

const paths = [
  {
    href: '#/tech-talks',
    eyebrow: 'Monthly at The Ion',
    title: 'NASA Tech Talks',
    body: 'Thursday evenings with NASA engineers, scientists and partners. Next talks: September 24 and October 22, 2026.',
    cta: 'Explore Tech Talks',
    accent: '#EAFE07'
  },
  {
    href: '#/opportunities',
    eyebrow: 'All year',
    title: 'NASA Opportunities',
    body: 'Challenges, research studies and student programs you can join without working at NASA.',
    cta: 'Browse opportunities',
    accent: '#2E96F5'
  }
];

export const GetInvolvedNasaSection: React.FC = () => {
  return (
    <div>
      <BrighterTomorrowHero />

      <section
        data-screen-label="Get Involved intro"
        className="max-w-[1320px] mx-auto pt-[clamp(48px,6vw,88px)] px-6 pb-[clamp(20px,3vw,36px)]"
      >
        <ScrollReveal>
          <p className="m-0 mb-3.5 font-['Fira_Sans_Condensed',sans-serif] font-bold text-[14px] tracking-widest uppercase text-[#2E96F5]">
            Get involved with NASA
          </p>
          <h2 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(32px,5.2vw,68px)] leading-none uppercase text-white">
            One weekend in Houston.
            <br />
            <span className="text-[#E43700]">A whole year of ways in.</span>
          </h2>
          <p className="mt-[1.625rem] m-0 max-w-[760px] text-[20px] leading-relaxed text-white/80 font-light">
            Space Apps Houston is the front door. Behind it, NASA runs monthly Tech Talks, open
            citizen-science projects, student challenges and research studies you can join without
            ever working at NASA. Start with a talk, then pick a path that fits.
          </p>
        </ScrollReveal>
      </section>

      <section data-screen-label="Ways in" className="px-6 pb-[clamp(56px,7vw,100px)]">
        <div className="max-w-[1320px] mx-auto grid gap-5 md:grid-cols-2">
          {paths.map((p) => (
            <ScrollReveal key={p.href}>
              <a
                href={p.href}
                className="group flex h-full flex-col rounded-3xl border border-white/15 bg-[rgba(5,10,28,0.62)] px-[clamp(24px,3.4vw,44px)] py-[clamp(28px,3.4vw,44px)] transition-colors duration-300 hover:border-white/35"
              >
                <span className="font-['Fira_Sans_Condensed',sans-serif] font-bold text-[14px] tracking-widest uppercase" style={{ color: p.accent }}>
                  {p.eyebrow}
                </span>
                <span className="mt-3 font-['Overpass',sans-serif] font-black text-[clamp(26px,3vw,38px)] leading-tight uppercase text-white">
                  {p.title}
                </span>
                <span className="mt-3 flex-1 text-[17px] leading-relaxed text-white/75 font-light">{p.body}</span>
                <span className="mt-7 inline-flex items-center gap-2 font-extrabold text-[16px] text-white">
                  {p.cta}
                  <ArrowRight aria-hidden="true" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section data-screen-label="Back to Houston" className="relative px-6 pb-[clamp(70px,8vw,124px)]">
        <div className="max-w-[1320px] mx-auto">
          <ScrollReveal>
            <div className="rounded-3xl border border-[rgba(46,150,245,0.30)] bg-[rgba(5,10,28,0.62)] px-[clamp(24px,4vw,56px)] py-[clamp(30px,4vw,54px)] flex flex-wrap items-center justify-between gap-6">
              <div className="max-w-[620px]">
                <h2 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(24px,3.2vw,40px)] leading-tight uppercase text-white">
                  Ready for the Houston weekend?
                </h2>
                <p className="mt-3 m-0 text-[17px] leading-relaxed text-white/75 font-light">
                  Participate, mentor, judge, volunteer or partner — the local roles are on the home
                  page under Find Your Place.
                </p>
              </div>
              <a
                href="#/"
                className="group inline-flex items-center gap-2.5 px-7 py-[1.125rem] rounded-xl bg-[#E43700] text-white font-extrabold text-[17px] shadow-[0_8px_32px_rgba(228,55,0,0.32)] transition-colors duration-300 hover:bg-[#FF5426]"
              >
                Find your place
                <ArrowRight
                  aria-hidden="true"
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default GetInvolvedNasaSection;
