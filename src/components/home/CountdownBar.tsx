import React from 'react';
import { Check } from 'lucide-react';

interface CountdownBarProps {
  clock: { k: string; v: string | number }[];
}

const milestones = [
  { when: 'Sep 17', label: 'Challenge Summaries + Team Formation', t: '2026-09-17T09:00:00-05:00' },
  { when: 'Oct 28', label: 'Full Challenge Release', t: '2026-10-28T09:00:00-05:00' },
  { when: 'Nov 14', label: 'Hack Weekend Begins', t: '2026-11-14T09:00:00-06:00' }
];

type Status = 'done' | 'next' | 'later';

const pad = (n: number) => String(n).padStart(2, '0');

const BLUE = '#2E96F5';
const GRAY = 'rgba(255,255,255,0.22)';

const Node: React.FC<{ status: Status }> = ({ status }) => {
  if (status === 'done') {
    return (
      <span className="relative z-10 grid place-items-center w-7 h-7 rounded-full bg-[#2E96F5] text-[#04122F] shadow-[0_0_0_4px_rgba(46,150,245,0.22),0_0_18px_rgba(46,150,245,0.6)]">
        <Check aria-hidden="true" size={15} strokeWidth={3} />
      </span>
    );
  }
  if (status === 'next') {
    return (
      <span className="relative z-10 grid place-items-center w-7 h-7">
        <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[rgba(46,150,245,0.35)] animate-ping" />
        <span className="relative w-7 h-7 rounded-full border-[3px] border-[#2E96F5] bg-[#050A1C] shadow-[0_0_0_4px_rgba(46,150,245,0.18),0_0_20px_rgba(46,150,245,0.7)]" />
      </span>
    );
  }
  return <span className="relative z-10 w-7 h-7 rounded-full border-[3px] border-white/35 bg-[#050A1C]" />;
};

export const CountdownBar: React.FC<CountdownBarProps> = ({ clock }) => {
  const now = Date.now();
  const nextIdx = milestones.findIndex((m) => new Date(m.t).getTime() > now);

  const rows: { date: React.ReactNode; label: React.ReactNode; status: Status }[] = [
    {
      date: (
        <>
          <span className="block text-[12px] font-bold tracking-widest uppercase text-white/55">Today</span>
          <span className="block text-[13px] text-white/70">Get ready</span>
        </>
      ),
      label: null,
      status: 'done'
    },
    ...milestones.map((m, i) => {
      const status: Status = nextIdx === -1 || i < nextIdx ? 'done' : i === nextIdx ? 'next' : 'later';
      const ms = Math.max(0, new Date(m.t).getTime() - now);
      return {
        date: (
          <span className={`text-[14px] font-bold tracking-wide uppercase ${status === 'later' ? 'text-white/75' : 'text-white'}`}>
            {m.when}
          </span>
        ),
        label: (
          <>
            <span className={`block text-[15px] leading-snug ${status === 'later' ? 'text-white/80 font-medium' : 'text-white font-semibold'}`}>
              {m.label}
            </span>
            {status === 'next' && (
              <span className="mt-1 block font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-bold tabular-nums text-[#EAFE07]">
                {Math.floor(ms / 86400000)}d {pad(Math.floor(ms / 3600000) % 24)}h {pad(Math.floor(ms / 60000) % 60)}m{' '}
                {pad(Math.floor(ms / 1000) % 60)}s
              </span>
            )}
          </>
        ),
        status
      };
    })
  ];

  return (
    <section data-screen-label="Countdown" className="px-6 py-[clamp(32px,5vw,56px)]">
      <div className="max-w-[1320px] mx-auto border border-[rgba(46,150,245,0.25)] rounded-3xl bg-[rgba(7,23,63,0.55)] p-[clamp(24px,4vw,44px)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-[clamp(28px,4vw,48px)]">
          <div className="min-w-0 text-center lg:self-center">
            <h2 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(30px,4vw,46px)] leading-tight uppercase text-white">
              <span className="whitespace-nowrap">November 14–15,</span>{' '}
              <span className="whitespace-nowrap text-[#EAFE07]">2026</span>
            </h2>

            <p className="mt-4 mx-auto text-[16px] leading-relaxed text-white/78 font-light max-w-[540px]">
              Two days in Space City building real solutions with NASA's free and open data. Free to attend, open to everyone — no experience required.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
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
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#EAFE07] animate-pulse" />
              <span className="text-center lg:text-left font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-bold tracking-[0.24em] uppercase text-white/60">
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

            {/* Milestone timeline */}
            <ol className="mt-7 mx-auto max-w-[400px] list-none p-0 mb-0" aria-label="Key dates">
              {rows.map((r, i) => {
                const intoThis = i > 0 && r.status !== 'later';
                const outOfThis = i < rows.length - 1 && rows[i + 1].status !== 'later';
                return (
                  <li key={i} className="grid grid-cols-[84px_28px_1fr] gap-x-4 items-center">
                    <div className="text-right py-3">{r.date}</div>
                    <div className="relative flex items-center justify-center self-stretch">
                      {i > 0 && (
                        <span
                          aria-hidden="true"
                          className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-1/2"
                          style={{ background: intoThis ? BLUE : GRAY }}
                        />
                      )}
                      {i < rows.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-1/2"
                          style={{ background: outOfThis ? BLUE : GRAY }}
                        />
                      )}
                      <Node status={r.status} />
                    </div>
                    <div className="py-3 min-w-0">{r.label}</div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-3 text-center">
              <a
                href="#/schedule"
                className="font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-bold tracking-widest uppercase text-[#2E96F5] hover:text-[#EAFE07]"
              >
                All key dates →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownBar;
