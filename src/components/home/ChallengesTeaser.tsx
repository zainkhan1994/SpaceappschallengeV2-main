import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { challengeTags } from '../../data/homeData';

export const ChallengesTeaser: React.FC = () => {
  return (
    <section
      data-screen-label="Challenges teaser"
      className="py-[clamp(64px,8vw,120px)] px-0 bg-gradient-to-b from-transparent via-[rgba(0,66,166,0.2)] to-transparent overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-6">
        <ScrollReveal>
          <h2 className="m-0 mb-3.5 font-['Overpass',sans-serif] font-black text-[clamp(30px,4.2vw,54px)] uppercase leading-tight text-white">
            2026 <span className="text-[#EAFE07]">challenges</span>
          </h2>
          <div className="border border-[rgba(234,254,7,0.35)] rounded-2xl p-7 bg-[rgba(234,254,7,0.06)] max-w-[760px]">
            <div className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-extrabold tracking-widest uppercase text-[#EAFE07] mb-2.5">
              Not yet released
            </div>
            <p className="m-0 text-[17px] leading-relaxed text-white/85">
              Challenges are authored by NASA Subject Matter Experts and published ahead of the hackathon.{' '}
              <strong className="text-white">
                Challenge Summaries land September 17, 2026, and the full Challenge Statements follow on October 28, 2026.
              </strong>{' '}
              Below are challenges from a previous cycle, to give you a feel for the range.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <div className="flex gap-4 w-max animate-[marquee_46s_linear_infinite] mt-11">
        {challengeTags.map((t, i) => (
          <div
            key={i}
            className="flex-none border border-[rgba(46,150,245,0.35)] rounded-full px-6 py-3 font-['Fira_Sans_Condensed',sans-serif] font-semibold text-[16px] text-[#cfe4ff] bg-[rgba(46,150,245,0.08)] whitespace-nowrap"
          >
            {t}
          </div>
        ))}
      </div>

      <div className="max-w-[1320px] mx-auto px-6 mt-10">
        <ScrollReveal>
          <a href="#/challenges" className="text-[18px] font-bold text-[#2E96F5] hover:text-[#EAFE07]">
            How challenges work →
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ChallengesTeaser;
