import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { agencies, supportTypes } from '../../data/partnersData';

export const PartnersSection: React.FC = () => {
  return (
    <div>
      <section data-screen-label="Partners hero" className="max-w-[1320px] mx-auto pt-[clamp(48px,6vw,88px)] px-6 pb-[clamp(32px,4vw,48px)]">
        <p className="m-0 mb-3.5 font-['Fira_Sans_Condensed',sans-serif] font-bold text-[14px] tracking-widest uppercase text-[#EAFE07]">
          Partners &amp; sponsors
        </p>
        <h1 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(38px,6.4vw,86px)] leading-none uppercase text-white">
          Who makes this
          <br />
          <span className="text-[#2E96F5]">possible</span>
        </h1>
        <p className="mt-[1.625rem] m-0 max-w-[720px] text-[20px] leading-relaxed text-white/80 font-light">
          Space Apps is led by NASA in collaboration with space agencies worldwide, who contribute open data and join the judging process. Local events are supported by Local Collaborators in their own city.
        </p>
      </section>

      {/* 16 Space Agency Partners Grid */}
      <section className="max-w-[1320px] mx-auto px-6 pb-[clamp(56px,7vw,96px)]">
        <ScrollReveal className="flex flex-wrap items-baseline gap-2.5 sm:gap-[1.125rem] mb-[1.125rem]">
          <h2 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(24px,3vw,36px)] uppercase text-white">
            2026 Space Agency Partners
          </h2>
          <span className="font-['Fira_Sans_Condensed',sans-serif] text-[14px] font-bold tracking-widest uppercase text-[#EAFE07]">
            16 agencies
          </span>
        </ScrollReveal>

        <ScrollReveal>
          <p className="m-0 mb-[2.125rem] max-w-[860px] text-[18px] leading-relaxed text-white/78 font-light">
            NASA Space Apps is proud to partner with 16 Space Agency Partners from around the world, connecting cities and countries during the Challenge. Alongside NASA’s free and open data, Space Agency Partners provide additional space-based data for participants to use.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.125rem]">
          {agencies.map((a, i) => (
            <ScrollReveal key={i}>
              <div className="flex flex-col gap-3.5 border border-white/13 rounded-2xl p-6 bg-white/[0.035] transition-all duration-300 hover:border-[#2E96F5] hover:bg-[rgba(46,150,245,0.08)] h-full">
                <div className="flex items-center gap-3.5 min-h-[56px]">
                  {a.logo ? (
                    <img src={a.logo} alt={`${a.name} logo`} className="h-[48px] w-[48px] object-contain block flex-none" />
                  ) : (
                    <span aria-hidden="true" className="flex-none flex items-center justify-center w-[48px] h-[48px] border border-[#2E96F5]/50 rounded-xl bg-[#2E96F5]/12 font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[18px] tracking-wide text-[#9ecdff]">
                      {a.mono || a.abbr}
                    </span>
                  )}
                  <div className="min-w-0">
                    <div className="font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[20px] tracking-wide uppercase text-white">
                      {a.abbr}
                    </div>
                    <div className="text-[13px] text-white/55">{a.country}</div>
                  </div>
                </div>
                <div className="text-[16px] font-bold leading-snug text-[#cfe4ff]">{a.name}</div>
                <p className="m-0 text-[15px] leading-relaxed text-white/70 font-light">{a.desc}</p>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto font-['Fira_Sans_Condensed',sans-serif] text-[14px] font-bold tracking-widest uppercase text-[#2E96F5] hover:text-[#EAFE07]"
                >
                  Learn more →
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Houston Local Collaborators & Sponsorship */}
      <section className="py-[clamp(56px,7vw,104px)] px-6 bg-gradient-to-b from-transparent via-[rgba(0,66,166,0.2)] to-transparent">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <h2 className="m-0 mb-5 font-['Overpass',sans-serif] font-black text-[clamp(24px,3vw,36px)] uppercase text-white">
              Houston Local Collaborators
            </h2>
            <div className="border-2 border-dashed border-[rgba(234,254,7,0.35)] rounded-2xl p-[clamp(28px,4vw,44px)] bg-[rgba(234,254,7,0.05)] text-center">
              <div className="font-['Fira_Sans_Condensed',sans-serif] text-[14px] font-extrabold tracking-widest uppercase text-[#EAFE07] mb-3.5">
                Coming soon
              </div>
              <p className="m-0 mx-auto max-w-[640px] text-[18px] leading-relaxed text-white/85">
                Local Collaborators for 2026 — financial sponsors, in-kind donors, venue and tooling partners — are finalized by October 31, 2026. Their logos will appear here.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal className="mt-6">
            <div className="border border-[rgba(46,150,245,0.35)] rounded-2xl p-[clamp(26px,4vw,40px)] bg-gradient-to-br from-[rgba(46,150,245,0.12)] to-[rgba(7,23,63,0.5)]">
              <h3 className="m-0 mb-3.5 text-[24px] font-extrabold text-white">Support Space Apps Houston</h3>
              <p className="m-0 mb-[1.125rem] text-[17px] leading-relaxed text-white/85">
                Every Local Event is free for participants — supporters are what make that possible. There are ten ways to help:
              </p>
              <div className="flex flex-wrap gap-2.5">
                {supportTypes.map((t, i) => (
                  <span
                    key={i}
                    className="border border-[#2E96F5]/45 rounded-full px-5 py-2 font-['Fira_Sans_Condensed',sans-serif] text-[15px] font-bold tracking-wide uppercase text-[#cfe4ff] bg-[#2E96F5]/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href="mailto:zain@nasaspaceappschallenge.org?subject=Space%20Apps%20Houston%202026%20sponsorship"
                className="mt-[1.125rem] inline-block px-[1.875rem] py-4 rounded-xl bg-[#2E96F5] text-[#04122F] font-extrabold text-[18px] hover:bg-[#5FB4FF]"
              >
                Talk to us about sponsoring
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default PartnersSection;
