import React from 'react';

interface CountdownBarProps {
  clock: { k: string; v: string | number }[];
}

export const CountdownBar: React.FC<CountdownBarProps> = ({ clock }) => {
  return (
    <section
      data-screen-label="Countdown"
      className="border-t border-b border-[rgba(46,150,245,0.22)] bg-[rgba(7,23,63,0.6)] py-6 px-6"
    >
      <div className="max-w-[1320px] mx-auto flex flex-wrap items-center justify-between gap-5">
        <div>
          <div className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-bold tracking-[0.26em] uppercase text-white/60">
            Countdown to hack weekend
          </div>
          <div className="mt-1.5 text-[19px] font-bold text-[#EAFE07]">
            Houston, Texas · Venue coming soon
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          {clock.map((u, i) => (
            <div
              key={i}
              className="min-w-[90px] text-center border border-white/16 rounded-xl p-3 bg-[rgba(5,10,28,0.7)]"
            >
              <div className="text-[clamp(26px,3vw,38px)] font-black leading-none tabular-nums text-white">
                {u.v}
              </div>
              <div className="mt-1.5 text-[11px] font-semibold tracking-widest uppercase text-white/55">
                {u.k}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownBar;
