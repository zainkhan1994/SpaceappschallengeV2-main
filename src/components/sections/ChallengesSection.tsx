import React, { useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { archiveChallenges, awards, artworkList } from '../../data/challengeData';

export const ChallengesSection: React.FC = () => {
  const [activeArtwork, setActiveArtwork] = useState<number | null>(null);

  return (
    <div className="overflow-hidden">
      <section data-screen-label="Challenges hero" className="max-w-[1320px] mx-auto pt-[clamp(48px,6vw,88px)] px-6 pb-[clamp(32px,4vw,48px)]">
        <p className="m-0 mb-3.5 font-['Fira_Sans_Condensed',sans-serif] font-bold text-[14px] tracking-widest uppercase text-[#EAFE07]">
          Challenges
        </p>
        <h1 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(38px,6.4vw,86px)] leading-none uppercase text-white">
          The 2026 challenges
          <br />
          <span className="text-[#2E96F5]">aren't out yet</span>
        </h1>
        <p className="mt-[1.625rem] m-0 max-w-[720px] text-[20px] leading-relaxed text-white/80 font-light">
          Challenges are problem statements written by NASA Subject Matter Experts to engage the creativity and problem-solving skills of participants. They're released in two stages ahead of the hackathon.
        </p>
      </section>

      {/* Release Timeline Milestones */}
      <section className="max-w-[1320px] mx-auto px-6 pb-[clamp(56px,7vw,96px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <ScrollReveal>
            <div className="border-2 border-[rgba(234,254,7,0.4)] rounded-2xl p-7 bg-[rgba(234,254,7,0.07)] h-full">
              <div className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-extrabold tracking-widest uppercase text-[#EAFE07] mb-3">
                September 17, 2026
              </div>
              <h2 className="m-0 mb-2.5 text-[23px] font-extrabold text-white">Challenge Summaries + Team Formation</h2>
              <p className="m-0 text-[17px] leading-relaxed text-white/82">
                Short summaries of every challenge — enough to start picking a direction and forming your team.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="border-2 border-[rgba(234,254,7,0.4)] rounded-2xl p-7 bg-[rgba(234,254,7,0.07)] h-full">
              <div className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-extrabold tracking-widest uppercase text-[#EAFE07] mb-3">
                October 28, 2026
              </div>
              <h2 className="m-0 mb-2.5 text-[23px] font-extrabold text-white">Full Challenge Statements</h2>
              <p className="m-0 text-[17px] leading-relaxed text-white/82">
                The complete version of every challenge, released together with its dataset resources.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="border border-[rgba(46,150,245,0.35)] rounded-2xl p-7 bg-[rgba(46,150,245,0.08)] h-full">
              <div className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-extrabold tracking-widest uppercase text-[#2E96F5] mb-3">
                November 2 &amp; 13
              </div>
              <h2 className="m-0 mb-2.5 text-[23px] font-extrabold text-white">Support &amp; Global Offers</h2>
              <p className="m-0 text-[17px] leading-relaxed text-white/82">
                Space Apps Connect opens November 2 for questions to Navigators and NASA experts. Global Offers and submission guides land November 13.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="border border-white/14 rounded-2xl p-7 bg-white/[0.03] h-full">
              <div className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-extrabold tracking-widest uppercase text-white/60 mb-3">
                November 14, 9:00 am
              </div>
              <h2 className="m-0 mb-2.5 text-[23px] font-extrabold text-white">Work begins</h2>
              <p className="m-0 text-[17px] leading-relaxed text-white/82">
                You can read and plan beforehand, but project work may only begin at 9:00 am local time on the first day.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Archive Challenges — Clean non-overlapping grid layout */}
      <section className="py-[clamp(56px,7vw,104px)] px-6 bg-gradient-to-b from-transparent via-[rgba(0,66,166,0.2)] to-transparent">
        <div className="max-w-[1320px] mx-auto">
          <ScrollReveal>
            <h2 className="m-0 mb-3.5 font-['Overpass',sans-serif] font-black text-[clamp(28px,3.6vw,46px)] uppercase text-white">
              Previous challenges, for a feel
            </h2>
            <p className="m-0 mb-10 max-w-[700px] text-[18px] leading-relaxed text-white/72">
              Archive — from an earlier cycle. Not the 2026 set.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-0">
            {archiveChallenges.map((c, i) => (
              <ScrollReveal key={i} className="h-full">
                <article className="h-full flex flex-col justify-between border border-white/14 rounded-2xl p-6 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#EAFE07] overflow-hidden min-w-0 shadow-lg">
                  <div>
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-md bg-white/10" style={{ color: c.dot }}>
                        {c.category}
                      </span>
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-white/55 px-2 py-0.5 rounded border border-white/15">
                        {c.difficulty}
                      </span>
                    </div>
                    <h3 className="m-0 mb-2.5 text-[20px] font-extrabold text-white leading-snug">{c.title}</h3>
                    <p className="m-0 text-[15px] leading-relaxed text-white/75 font-light">{c.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-5 pt-3 border-t border-white/10">
                    {c.datasets.map((d, dIdx) => (
                      <span key={dIdx} className="border border-white/18 rounded-full px-2.5 py-1 text-[11px] text-white/75 truncate max-w-full">
                        {d}
                      </span>
                    ))}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Global Award Categories */}
      <section className="max-w-[1320px] mx-auto py-[clamp(56px,7vw,104px)] px-6">
        <ScrollReveal>
          <h2 className="m-0 mb-3.5 font-['Overpass',sans-serif] font-black text-[clamp(28px,3.6vw,46px)] uppercase text-white">
            Global award <span className="text-[#EAFE07]">categories</span>
          </h2>
          <p className="m-0 mb-10 max-w-[700px] text-[18px] leading-relaxed text-white/72">
            Global Winners are determined by NASA after three rounds of judging, across ten categories.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {awards.map((a, i) => (
            <ScrollReveal key={i} className="h-full">
              <div className="flex gap-4 items-start border border-white/12 rounded-xl p-5 bg-white/[0.03] h-full transition-all duration-300 hover:translate-x-1 hover:border-[#EAFE07]">
                <div className="font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[24px] text-[rgba(234,254,7,0.85)] min-w-[36px] leading-none">
                  {a.num}
                </div>
                <div>
                  <div className="font-bold text-[16px] uppercase tracking-wide text-white mb-1">{a.name}</div>
                  <div className="text-[14px] leading-snug text-white/68 font-light">{a.desc}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Renamed Houston Awards Section */}
      <section data-screen-label="Award artwork" className="max-w-[1320px] mx-auto pb-[clamp(64px,8vw,116px)] px-6">
        <ScrollReveal className="flex flex-wrap items-baseline gap-2.5 sm:gap-[1.125rem] mb-3">
          <h2 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(28px,3.6vw,46px)] uppercase text-white">
            Houston <span className="text-[#2E96F5]">Awards</span>
          </h2>
          <span className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-bold tracking-widest uppercase text-[#EAFE07]">
            Hover or tap poster
          </span>
        </ScrollReveal>

        <ScrollReveal>
          <p className="m-0 mb-[clamp(30px,4vw,48px)] max-w-[700px] text-[18px] leading-relaxed text-white/72">
            Official Houston event award categories and artwork posters. Hover or tap any mark to expand full artwork poster.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {artworkList.map((a, i) => {
            const isOpen = activeArtwork === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setActiveArtwork(i)}
                onMouseLeave={() => setActiveArtwork(null)}
                onClick={() => setActiveArtwork(isOpen ? null : i)}
                className={`relative flex flex-col items-center gap-3.5 rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
                  isOpen
                    ? 'z-[6] border border-[rgba(234,254,7,0.5)] bg-[rgba(46,150,245,0.08)]'
                    : 'z-[1] border border-white/12 bg-white/[0.03]'
                }`}
              >
                <div className={`h-[168px] w-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                  <img src={a.cut} alt={`${a.name} award artwork`} className="max-w-full max-h-full object-contain block drop-shadow-[0_14px_34px_rgba(0,0,0,0.55)]" />
                </div>
                <div className={`font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[17px] tracking-wide uppercase text-center leading-snug transition-colors ${isOpen ? 'text-white/35' : 'text-white'}`}>
                  {a.name}
                </div>

                {/* Hover overlay full poster */}
                <img
                  src={a.full}
                  alt={a.name}
                  aria-hidden={!isOpen}
                  className={`absolute left-1/2 top-1/2 pointer-events-none z-[7] rounded-xl shadow-[0_34px_90px_rgba(0,0,0,0.72),0_0_0_1px_rgba(234,254,7,0.38)] transition-all duration-380 w-[114%] ${
                    isOpen
                      ? 'opacity-100 -translate-x-1/2 -translate-y-1/2 scale-100'
                      : 'opacity-0 -translate-x-1/2 -translate-y-1/2 scale-80'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ChallengesSection;
