import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { siteSurvey } from '../../data/homeData';

export const VenueTeaser: React.FC = () => {
  return (
    <section data-screen-label="Venue teaser" className="max-w-[1320px] mx-auto py-[clamp(64px,8vw,120px)] px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(26px,4vw,52px)] items-center">
        <div>
          <ScrollReveal>
            <h2 className="m-0 mb-3.5 font-['Overpass',sans-serif] font-black text-[clamp(30px,4.2vw,54px)] uppercase leading-tight text-white">
              Venue &amp; <span className="text-[#2E96F5]">location</span>
            </h2>
            <p className="m-0 mb-6 text-[19px] leading-relaxed text-white/78 font-light">
              Space Apps Houston is a hybrid Local Event — an in-person hackathon in Houston with virtual participation available. The 2026 venue is being finalized.
            </p>
            <div className="border border-[rgba(234,254,7,0.35)] rounded-2xl p-6 bg-[rgba(234,254,7,0.06)]">
              <div className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-extrabold tracking-widest uppercase text-[#EAFE07] mb-2.5">
                Coming soon
              </div>
              <p className="m-0 text-[17px] leading-relaxed text-white/85">
                Address, parking, and accessibility details will be published here once the venue is confirmed.
              </p>
            </div>
            <div className="mt-[1.375rem]">
              <a href="#/venue" className="text-[18px] font-bold text-[#2E96F5] hover:text-[#EAFE07]">
                What we're looking for in a venue →
              </a>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="relative overflow-hidden border border-[rgba(46,150,245,0.4)] rounded-2xl p-[clamp(24px,3vw,38px)] bg-gradient-to-br from-[rgba(46,150,245,0.1)] to-[rgba(3,8,20,0.75)]">
            <div className="flex flex-wrap justify-between gap-3.5 font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-extrabold tracking-widest uppercase text-white/50">
              <span>Site survey</span>
              <span className="text-[#EAFE07]">Status: pending</span>
            </div>
            <div className="mt-[1.625rem] font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[clamp(30px,4vw,50px)] leading-none uppercase text-white">
              Houston, TX
            </div>
            <div className="mt-2.5 text-[16px] tabular-nums text-[#2E96F5] tracking-wider">
              29.7604° N &nbsp;95.3698° W &nbsp;·&nbsp; HOU
            </div>
            <div className="mt-[1.625rem] grid gap-2.5">
              {siteSurvey.map((s, i) => (
                <div key={i} className="flex items-baseline gap-3 border-t border-white/10 pt-2.5">
                  <span className="flex-none w-2.25 h-2.25 rounded-full" style={{ backgroundColor: s.dot }} />
                  <span className="flex-1 text-[16px] text-white/82">{s.k}</span>
                  <span className="flex-none font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-bold tracking-widest uppercase text-white/55">
                    {s.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default VenueTeaser;
