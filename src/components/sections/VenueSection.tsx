import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { venueCriteria, venueHosts } from '../../data/venueData';

export const VenueSection: React.FC = () => {
  return (
    <div>
      <section data-screen-label="Venue hero" className="max-w-[1320px] mx-auto pt-[clamp(48px,6vw,88px)] px-6 pb-[clamp(32px,4vw,48px)]">
        <p className="m-0 mb-3.5 font-['Fira_Sans_Condensed',sans-serif] font-bold text-[14px] tracking-widest uppercase text-[#EAFE07]">
          Venue
        </p>
        <h1 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(38px,6.4vw,86px)] leading-none uppercase text-white">
          Houston, Texas
          <br />
          <span className="text-[#2E96F5]">venue coming soon</span>
        </h1>
        <p className="mt-[1.625rem] m-0 max-w-[720px] text-[20px] leading-relaxed text-white/80 font-light">
          Space Apps Houston 2026 is a hybrid Local Event — in person in Houston, with virtual participation available. The venue is confirmed by September 30, 2026 — this page will carry the address, parking, and accessibility details as soon as it's signed.
        </p>
        <a
          href="https://www.spaceappschallenge.org/2026/local-events/houston/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-[1.875rem] inline-block px-8 py-[1.125rem] rounded-xl bg-[#2E96F5] text-[#04122F] font-extrabold text-[19px] shadow-[0_8px_32px_rgba(46,150,245,0.35)] transition-all hover:bg-[#5FB4FF]"
        >
          Register
        </a>
      </section>

      {/* Criteria */}
      <section className="max-w-[1320px] mx-auto px-6 pb-[clamp(56px,7vw,96px)]">
        <ScrollReveal>
          <h2 className="m-0 mb-3.5 font-['Overpass',sans-serif] font-black text-[clamp(26px,3.4vw,42px)] uppercase text-white">
            What we're looking for
          </h2>
          <p className="m-0 mb-9 max-w-[700px] text-[18px] leading-relaxed text-white/72">
            Every Space Apps venue is evaluated against the same criteria, so you know what to expect wherever we land.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {venueCriteria.map((v, i) => (
            <ScrollReveal key={i}>
              <div className="h-full border border-[rgba(46,150,245,0.25)] rounded-2xl p-[1.625rem] bg-white/[0.03]">
                <h3 className="m-0 mb-2.5 font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[20px] uppercase tracking-wide text-[#2E96F5]">
                  {v.title}
                </h3>
                <p className="m-0 text-[16px] leading-relaxed text-white/78">{v.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-6">
          <div className="border border-white/14 rounded-2xl p-6 bg-white/[0.03]">
            <p className="m-0 text-[17px] leading-relaxed text-white/80">
              <strong className="text-white">On overnight access:</strong> the hackathon does not need to run continuously. Houston will publish formal start and stop times for each day with its agenda.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Universities behind past Houston Local Events */}
      <section className="py-[clamp(56px,7vw,104px)] px-6 bg-gradient-to-b from-transparent via-[rgba(0,66,166,0.2)] to-transparent">
        <div className="max-w-[1320px] mx-auto">
          <ScrollReveal>
            <h2 className="m-0 mb-3.5 font-['Overpass',sans-serif] font-black text-[clamp(26px,3.4vw,42px)] uppercase text-white">
              Where we've been
            </h2>
            <p className="m-0 mb-9 max-w-[700px] text-[18px] leading-relaxed text-white/72">
              The universities behind past Houston Local Events.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.125rem]">
            {venueHosts.map((h) => (
              <ScrollReveal key={h.name}>
                <figure className="m-0 h-full">
                  <div className="grid place-items-center h-[clamp(140px,18vw,200px)] px-8 rounded-2xl border border-white/16 bg-white/[0.04]">
                    <img src={h.logo} alt={`${h.name} logo`} className="w-full max-w-[340px] max-h-[62px] object-contain block" />
                  </div>
                  <figcaption className="mt-2.5 text-[14px] text-white/55">
                    {h.name}
                    {h.unit ? ` · ${h.unit}` : ''}
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VenueSection;
