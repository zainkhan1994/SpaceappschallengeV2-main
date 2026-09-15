import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { resourceGroups, bring } from '../../data/resourcesData';

export const ResourcesSection: React.FC = () => {
  return (
    <div>
      <section data-screen-label="Resources hero" className="max-w-[1320px] mx-auto pt-[clamp(48px,6vw,88px)] px-6 pb-[clamp(32px,4vw,48px)]">
        <p className="m-0 mb-3.5 font-['Fira_Sans_Condensed',sans-serif] font-bold text-[14px] tracking-widest uppercase text-[#EAFE07]">
          Resources
        </p>
        <h1 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(38px,6.4vw,86px)] leading-none uppercase text-white">
          Participant
          <br />
          <span className="text-[#2E96F5]">guides &amp; data</span>
        </h1>
        <p className="mt-[1.625rem] m-0 max-w-[700px] text-[20px] leading-relaxed text-white/80 font-light">
          Everything you need before the weekend — official guides from NASA Space Apps, plus the open data you'll be building with.
        </p>
      </section>

      <section className="max-w-[1320px] mx-auto px-6 pb-[clamp(56px,7vw,96px)]">
        {resourceGroups.map((group, idx) => (
          <div key={idx} className="mb-12">
            <ScrollReveal>
              <h2 className="m-0 mb-5 font-['Overpass',sans-serif] font-black text-[clamp(24px,3vw,36px)] uppercase text-white">
                {group.title}
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {group.items.map((r, i) => (
                <ScrollReveal key={i}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-white/14 rounded-xl p-6 bg-white/[0.03] text-white transition-all duration-300 hover:border-[#2E96F5] hover:-translate-y-1 hover:bg-[rgba(46,150,245,0.09)] group h-full"
                  >
                    <div className="text-[19px] font-extrabold mb-2 group-hover:text-[#EAFE07]">
                      {r.label} <span className="text-[#2E96F5]">→</span>
                    </div>
                    <div className="text-[15px] leading-relaxed text-white/70">{r.desc}</div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        ))}

        <ScrollReveal>
          <div className="border border-[rgba(46,150,245,0.35)] rounded-2xl p-[clamp(26px,4vw,38px)] bg-gradient-to-br from-[rgba(46,150,245,0.12)] to-[rgba(7,23,63,0.5)]">
            <h2 className="m-0 mb-5 font-['Overpass',sans-serif] font-black text-[clamp(22px,2.8vw,32px)] uppercase text-white">
              What to bring
            </h2>
            <ul className="list-none m-0 p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {bring.map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-[17px] text-white/85">
                  <span className="w-2 h-2 rounded-full bg-[#EAFE07] flex-none mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default ResourcesSection;
