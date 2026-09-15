import React from 'react';

interface CountdownBarProps {
  clock: { k: string; v: string | number }[];
}

export const CountdownBar: React.FC<CountdownBarProps> = ({ clock }) => {
  return (
    <section data-screen-label="Countdown" className="px-6 py-[clamp(32px,5vw,56px)]">
      <div className="max-w-[1320px] mx-auto border border-[rgba(46,150,245,0.25)] rounded-3xl bg-[rgba(7,23,63,0.55)] p-[clamp(24px,4vw,44px)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-[clamp(28px,4vw,48px)]">
          <div className="min-w-0">
            <div className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-bold tracking-[0.26em] uppercase text-[#2E96F5]">
              Houston, Texas · Venue coming soon
            </div>
            <h2 className="mt-2 font-['Overpass',sans-serif] font-black text-[clamp(30px,4vw,46px)] leading-tight uppercase text-white">
              November 14–15, <span className="text-[#EAFE07]">2026</span>
            </h2>

            <p className="mt-4 text-[16px] leading-relaxed text-white/78 font-light max-w-[540px]">
              Two days in Space City building real solutions with NASA's free and open data. Free to attend, open to everyone — no experience required.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.spaceappschallenge.org/2026/local-events/houston/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-xl bg-[#2E96F5] text-[#04122F] font-extrabold text-[16px] shadow-[0_8px_28px_rgba(46,150,245,0.4)] transition-all hover:bg-[#5FB4FF] hover:-translate-y-0.5"
              >
                Register
              </a>
              <a
                href="#/about"
                className="px-7 py-3 rounded-xl border border-white/40 text-white font-bold text-[16px] transition-all hover:border-[#EAFE07] hover:text-[#EAFE07] hover:bg-[rgba(234,254,7,0.07)]"
              >
                What is Space Apps?
              </a>
            </div>
          </div>

          <div className="min-w-0 lg:border-l lg:border-white/10 lg:pl-[clamp(28px,4vw,48px)]">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#EAFE07] animate-pulse" />
              <span className="font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-bold tracking-[0.24em] uppercase text-white/60">
                Countdown to hack weekend
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              {clock.map((u, i) => (
                <div
                  key={i}
                  className="text-center border border-white/16 rounded-xl py-3 px-1.5 bg-[rgba(5,10,28,0.7)]"
                >
                  <div className="text-[clamp(22px,3vw,32px)] font-black leading-none tabular-nums text-white">
                    {u.v}
                  </div>
                  <div className="mt-1.5 text-[10px] font-semibold tracking-widest uppercase text-white/55">
                    {u.k}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownBar;
