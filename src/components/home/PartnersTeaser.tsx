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

        {/* Clean, perfectly balanced 6-column grid across screens */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {agencies.map((a, i) => (
            <ScrollReveal key={i} className="h-full">
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-between h-[150px] w-full border border-white/13 rounded-xl p-3.5 bg-white/[0.04] transition-all duration-300 hover:border-[#2E96F5] hover:bg-[rgba(46,150,245,0.12)] hover:-translate-y-1 group shadow-sm"
              >
                <div className="h-[58px] w-full flex items-center justify-center p-2 bg-white/95 rounded-lg shadow-sm group-hover:bg-white transition-colors">
                  <img
                    src={a.logo}
                    alt={`${a.abbr || a.name} logo`}
                    className="max-h-[46px] max-w-[85%] object-contain block"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/sac-logo-houston-transparent.png';
                    }}
                  />
                </div>
                <div className="flex flex-col items-center justify-center flex-1 mt-2">
                  <span className="text-[13px] font-extrabold text-center text-white leading-tight tracking-wide uppercase group-hover:text-[#EAFE07]">
                    {a.abbr}
                  </span>
                  <span className="text-[11px] font-medium text-center text-white/60 leading-tight truncate max-w-full mt-0.5">
                    {a.country}
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-8">
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
