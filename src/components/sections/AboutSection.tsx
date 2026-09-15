import React, { useState, useEffect } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { basics } from '../../data/homeData';
import { audiences, takeaways, roster } from '../../data/aboutData';
import { TeamNode } from '../../types';

export const AboutSection: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [isTeamWide, setIsTeamWide] = useState(true);

  useEffect(() => {
    // Whether this device can meaningfully hover (a mouse/trackpad), not the
    // viewport width — a hover-capable laptop at 1000px should still get the
    // near-node panel, and a touch tablet at 1300px still shouldn't.
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const apply = () => {
      setIsTeamWide(query.matches);
      if (!query.matches) setSelectedNode(null);
    };

    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  const activePerson: TeamNode | null =
    !isTeamWide && selectedNode !== null ? roster[selectedNode] : null;

  return (
    <div>
      <section data-screen-label="About hero" className="max-w-[1320px] mx-auto pt-[clamp(48px,6vw,88px)] px-6 pb-[clamp(32px,4vw,52px)]">
        <p className="m-0 mb-3.5 font-['Fira_Sans_Condensed',sans-serif] font-bold text-[14px] tracking-widest uppercase text-[#EAFE07]">
          About
        </p>
        <h1 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(38px,6.4vw,86px)] leading-none uppercase text-white">
          A hackathon for
          <br />
          <span className="text-[#2E96F5]">everyone in Houston</span>
        </h1>
        <p className="mt-[1.625rem] m-0 max-w-[700px] text-[20px] leading-relaxed text-white/80 font-light">
          The NASA International Space Apps Challenge is the largest annual global hackathon. Space Apps Houston is the official Local Event for our city — free to attend, open to the public, and organized by volunteers.
        </p>
      </section>

      <section className="max-w-[1320px] mx-auto px-6 pb-[clamp(56px,7vw,104px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.125rem]">
          {basics.map((b, i) => (
            <ScrollReveal key={i}>
              <div className="h-full border border-[rgba(46,150,245,0.3)] rounded-2xl p-7 bg-gradient-to-br from-[rgba(46,150,245,0.12)] to-[rgba(7,23,63,0.45)]">
                <div className="font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[22px] tracking-widest text-[#EAFE07] mb-3.5 text-center">
                  {b.k}
                </div>
                <p className="m-0 text-[17px] leading-relaxed text-white/85">{b.v}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="py-[clamp(56px,7vw,104px)] px-6 bg-gradient-to-b from-transparent via-[rgba(0,66,166,0.2)] to-transparent">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[clamp(28px,4vw,56px)]">
          <div>
            <ScrollReveal>
              <h2 className="m-0 mb-6 font-['Overpass',sans-serif] font-black text-[clamp(28px,3.6vw,44px)] uppercase text-white">
                Who participates?
              </h2>
            </ScrollReveal>
            <div className="grid gap-3.5">
              {audiences.map((a, i) => (
                <ScrollReveal key={i}>
                  <div className="border border-[rgba(46,150,245,0.18)] rounded-xl p-[1.375rem] bg-white/[0.03]">
                    <h3 className="m-0 mb-2 text-[19px] font-bold text-white">{a.title}</h3>
                    <p className="m-0 text-[16px] leading-relaxed text-white/75">{a.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <ScrollReveal>
            <div className="border border-[rgba(46,150,245,0.35)] rounded-2xl p-[clamp(26px,4vw,40px)] bg-gradient-to-br from-[rgba(46,150,245,0.12)] to-[rgba(7,23,63,0.5)] self-start">
              <h2 className="m-0 mb-[1.375rem] font-['Overpass',sans-serif] font-black text-[clamp(24px,3vw,34px)] uppercase text-white">
                What you'll take away
              </h2>
              <ul className="list-none m-0 p-0 grid gap-3.5">
                {takeaways.map((t, i) => (
                  <li key={i} className="flex gap-3.5 items-start text-[17px] leading-snug text-white/85">
                    <span className="w-2 h-2 rounded-full bg-[#EAFE07] flex-none mt-2" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Interactive Team Nodes Map */}
      <section data-screen-label="Who runs it" className="py-[clamp(56px,7vw,104px)] px-6">
        <div className="max-w-[1320px] mx-auto">
          <ScrollReveal className="text-center max-w-[640px] mx-auto mb-[clamp(26px,4vw,46px)]">
            <h2 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(28px,3.6vw,44px)] uppercase text-white">
              Who runs it
            </h2>
            <p className="mt-3 m-0 text-[18px] leading-relaxed text-white/72 font-light">
              Meet the people behind Space Apps Houston.
            </p>
          </ScrollReveal>

          <div
            onMouseLeave={() => {
              if (isTeamWide) setSelectedNode(null);
            }}
            className="relative flex justify-center"
          >
            <div className="relative w-[min(680px,94%)] flex-none">
              <div
                aria-hidden="true"
                className="absolute left-[8%] top-[4%] w-[84%] h-[44%] rounded-full bg-[radial-gradient(circle,rgba(46,150,245,0.22),rgba(46,150,245,0.06)_52%,transparent_72%)] blur-2xl pointer-events-none"
              />
              <img
                src="/team-globe-blend.png"
                alt="Globe linked by glowing lines to seven nodes"
                className="relative block w-full h-auto"
              />

              {/* Orbiting radar overlay */}
              <div
                aria-hidden="true"
                className="absolute left-[26.6%] top-[12.4%] w-[50.8%] h-[33.8%] rounded-full overflow-hidden pointer-events-none z-[3] mix-blend-overlay opacity-72"
              >
                <div className="absolute -left-[25%] -top-[25%] w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(168,214,255,0.5)_38deg,rgba(255,255,255,0.72)_60deg,rgba(120,185,250,0.34)_88deg,transparent_146deg,transparent_360deg)] animate-[spin_26s_linear_infinite]" />
              </div>

              {/* Active node glow overlay */}
              {selectedNode !== null && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none transition-opacity duration-350 z-[3]"
                  style={{
                    background: `radial-gradient(circle 170px at ${roster[selectedNode].x}% ${roster[selectedNode].y}%, rgba(234,254,7,0.16) 0%, rgba(2,6,15,0.05) 34%, rgba(2,6,15,0.55) 74%)`
                  }}
                />
              )}

              <div
                className={`absolute left-0 bottom-1.5 w-full text-center pointer-events-none transition-opacity duration-300 ${
                  selectedNode === null ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <span className="font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-extrabold tracking-widest uppercase text-white/50">
                  {isTeamWide ? 'Hover to meet the team' : 'Tap a node to meet the team'}
                </span>
              </div>

              {/* Nodes */}
              {roster.map((p, i) => {
                const on = selectedNode === i;
                const anyOn = selectedNode !== null;

                return (
                  <div
                    key={i}
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    className={`absolute w-0 h-0 ${on ? 'z-[9]' : 'z-[4]'}`}
                  >
                    <button
                      type="button"
                      onMouseEnter={() => {
                        if (isTeamWide) setSelectedNode(i);
                      }}
                      onFocus={() => {
                        if (isTeamWide) setSelectedNode(i);
                      }}
                      onClick={() => setSelectedNode(on ? null : i)}
                      aria-label={`${p.name}, ${p.role}`}
                      aria-expanded={on}
                      className="absolute -left-6 -top-6 w-12 h-12 p-0 border-0 bg-transparent cursor-pointer rounded-full"
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute left-1/2 top-1/2 -ml-[1.375rem] -mt-[1.375rem] w-11 h-11 rounded-full border border-[rgba(234,254,7,0.5)] transition-all duration-300 ${
                          on ? 'scale-100 opacity-100' : 'scale-60 opacity-0'
                        }`}
                      />
                      <span
                        aria-hidden="true"
                        className={`absolute left-1/2 top-1/2 -ml-1.5 -mt-1.5 w-3 h-3 rounded-full transition-all duration-300 ${
                          on
                            ? 'bg-[#EAFE07] shadow-[0_0_20px_5px_rgba(234,254,7,0.8)]'
                            : 'bg-[rgba(234,254,7,0.6)] shadow-[0_0_8px_1px_rgba(234,254,7,0.28)]'
                        } ${anyOn && !on ? 'opacity-30' : 'opacity-100'}`}
                      />
                    </button>

                    {/* Connecting line and side detail panel */}
                    {isTeamWide && on && (
                      <div
                        className={`absolute w-[250px] p-[1.125rem] border border-[rgba(234,254,7,0.42)] rounded-2xl bg-[rgba(6,16,41,0.94)] shadow-[0_18px_60px_rgba(0,0,0,0.6)] text-left z-[8] transition-all duration-300 ${
                          p.side === 'l'
                            ? 'top-1/2 -translate-y-1/2 right-[86px]'
                            : p.side === 'r'
                            ? 'top-1/2 -translate-y-1/2 left-[86px]'
                            : 'top-[98px] left-1/2 -translate-x-1/2'
                        }`}
                      >
                        <div className="font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[19px] tracking-wide uppercase text-white">
                          {p.name}
                        </div>
                        <div className="mt-1 font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-bold tracking-widest uppercase text-[#EAFE07]">
                          {p.role}
                        </div>
                        {p.expertise && (
                          <div className="mt-3 pt-3 border-t border-white/14 text-[14px] leading-relaxed text-white/80">
                            {p.expertise}
                          </div>
                        )}
                        {!p.expertise && (
                          <div className="mt-3 pt-3 border-t border-white/14 text-[13px] text-white/50">
                            Details coming soon.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Narrow viewport detail sheet */}
          {activePerson && (
            <div className="max-w-[620px] mx-auto mt-5 border border-[rgba(234,254,7,0.4)] rounded-2xl p-5 bg-[rgba(6,16,41,0.92)] text-left">
              <div className="font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[19px] tracking-wide uppercase text-white">
                {activePerson.name}
              </div>
              <div className="mt-1 font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-bold tracking-widest uppercase text-[#EAFE07]">
                {activePerson.role}
              </div>
              {activePerson.expertise && (
                <div className="mt-3 pt-3 border-t border-white/14 text-[14px] leading-relaxed text-white/80">
                  {activePerson.expertise}
                </div>
              )}
            </div>
          )}

          <ScrollReveal className="mt-[clamp(26px,4vw,44px)] text-center max-w-[660px] mx-auto">
            <p className="text-[16px] leading-relaxed text-white/62">
              Local Leads are volunteers — not NASA employees — approved by the global Space Apps organizing team to host an official Local Event. Want to help run it?{' '}
              <a href="#/contact" className="text-[#2E96F5] hover:text-[#EAFE07]">
                Get in touch
              </a>
              .
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
