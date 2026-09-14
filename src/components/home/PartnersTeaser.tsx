import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { agencies } from '../../data/partnersData';

export const PartnersTeaser: React.FC = () => {
  return (
    <section
      data-screen-label="Partners"
      className="py-[clamp(64px,8vw,120px)] px-6 bg-gradient-to-b from-transparent via-[rgba(0,66,166,0.22)] to-transparent"
    >
      <div className="max-w-[1320px] mx-auto">
        <ScrollReveal>
          <h2 className="m-0 mb-3.5 font-['Overpass',sans-serif] font-black text-[clamp(30px,4.2vw,54px)] uppercase leading-tight text-white">
            Supporting <span className="text-[#EAFE07]">organizations</span>
          </h2>
          <p className="m-0 mb-10 max-w-[720px] text-[19px] leading-relaxed text-white/78 font-light">
            Space Apps is led by NASA in collaboration with space agencies worldwide, who contribute open data and join the judging process.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3.5">
          {agencies.map((a, i) => (
            <ScrollReveal key={i}>
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-3 min-h-[130px] border border-white/13 rounded-xl p-4 bg-white/[0.04] transition-all duration-300 hover:border-[#2E96F5] hover:bg-[rgba(46,150,245,0.1)] hover:-translate-y-1 group"
              >
                {a.logo ? (
                  <img src={a.logo} alt={`${a.name} logo`} className="h-[44px] w-auto max-w-full object-contain block" />
                ) : (
                  <span className="w-[44px] h-[44px] border border-[#2E96F5]/50 rounded-lg bg-[#2E96F5]/12 flex items-center justify-center font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[16px] text-[#9ecdff]">
                    {a.mono || a.abbr}
                  </span>
                )}
                <span className="text-[13px] font-semibold text-center text-white/75 leading-tight group-hover:text-[#EAFE07]">
                  {a.name}
                </span>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-7.5">
          <div className="border border-white/16 rounded-2xl p-7 bg-white/[0.03] flex flex-wrap gap-5 items-center justify-between">
            <div>
              <h3 className="m-0 mb-2 text-[22px] font-extrabold text-white">Houston sponsors &amp; local collaborators</h3>
              <p className="m-0 text-[17px] text-white/72">
                <strong className="text-[#EAFE07] font-bold">Coming soon.</strong> Local collaborators are finalized by October 31, 2026.
              </p>
            </div>
            <a
              href="#/contact"
              className="px-7 py-3.5 rounded-lg border border-white/35 text-white font-bold text-[17px] transition-colors hover:border-[#EAFE07] hover:text-[#EAFE07]"
            >
              Become a collaborator
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PartnersTeaser;
