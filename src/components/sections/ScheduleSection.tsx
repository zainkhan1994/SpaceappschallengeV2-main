import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { keyDates, journey } from '../../data/scheduleData';

export const ScheduleSection: React.FC = () => {
  return (
    <div>
      <section data-screen-label="Schedule hero" className="max-w-[1320px] mx-auto pt-[clamp(48px,6vw,88px)] px-6 pb-[clamp(32px,4vw,48px)]">
        <p className="m-0 mb-3.5 font-['Fira_Sans_Condensed',sans-serif] font-bold text-[14px] tracking-widest uppercase text-[#EAFE07]">
          Schedule
        </p>
        <h1 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(38px,6.4vw,86px)] leading-none uppercase text-white">
          Key dates for
          <br />
          <span className="text-[#2E96F5]">2026</span>
        </h1>
        <p className="mt-6.5 m-0 max-w-[700px] text-[20px] leading-relaxed text-white/80 font-light">
          Program milestones confirmed by the global Space Apps organizing team. The hour-by-hour Houston agenda is published closer to the event.
        </p>
      </section>

      {/* Timeline List */}
      <section className="max-w-[1000px] mx-auto px-6 pb-[clamp(56px,7vw,96px)]">
        <ol className="list-none m-0 p-0 grid gap-3">
          {keyDates.map((d, i) => (
            <ScrollReveal key={i}>
              <li className="flex flex-wrap gap-5 items-start border border-white/13 rounded-2xl p-5.5 md:p-6.5 bg-white/[0.03]" style={{ borderLeftWidth: '3px', borderLeftColor: d.accent }}>
                <span className="min-w-[190px] flex flex-col gap-1">
                  <span className="text-[13px] font-semibold tracking-widest uppercase text-white/50">{d.day}</span>
                  <span className="font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[22px] tracking-tight" style={{ color: d.accent }}>{d.date}</span>
                  <span className="text-[14px] font-semibold tabular-nums text-white/60">{d.time}</span>
                </span>
                <span className="flex-1 min-w-[260px]">
                  <span className="block text-[20px] font-extrabold text-white mb-1.5">{d.title}</span>
                  <span className="block text-[16px] leading-relaxed text-white/75">{d.desc}</span>
                </span>
              </li>
            </ScrollReveal>
          ))}
        </ol>

        <ScrollReveal className="mt-7">
          <div className="border border-[rgba(234,254,7,0.35)] rounded-2xl p-6.5 bg-[rgba(234,254,7,0.06)]">
            <div className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-extrabold tracking-widest uppercase text-[#EAFE07] mb-2.5">
              Coming soon
            </div>
            <p className="m-0 text-[17px] leading-relaxed text-white/85">
              The Houston event-day agenda — check-in times, workshops, meals, demo slots and judging — will be published here and on the official Local Event page once the venue and schedule are set.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Participant Journey section */}
      <section className="py-[clamp(56px,7vw,104px)] px-6 bg-gradient-to-b from-transparent via-[rgba(0,66,166,0.2)] to-transparent">
        <div className="max-w-[1320px] mx-auto">
          <ScrollReveal>
            <h2 className="m-0 mb-10 font-['Overpass',sans-serif] font-black text-[clamp(28px,3.6vw,46px)] uppercase text-white">
              The participant journey
            </h2>
          </ScrollReveal>

          <div className="relative">
            <svg
              aria-hidden="true"
              viewBox="0 0 54 1000"
              preserveAspectRatio="none"
              className="absolute left-0 top-7 w-[54px] h-[calc(100%-64px)] pointer-events-none"
            >
              <path d="M27 0 C4 150, 50 320, 27 480 C4 640, 50 820, 27 1000" fill="none" stroke="rgba(46,150,245,.55)" strokeWidth="14" opacity=".2" style={{ filter: 'blur(6px)' }} />
              <path d="M27 0 C4 150, 50 320, 27 480 C4 640, 50 820, 27 1000" fill="none" stroke="rgba(46,150,245,.7)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="6 9" />
            </svg>

            <ol className="list-none m-0 p-0 grid gap-[clamp(20px,2.6vw,34px)] relative">
              {journey.map((s, i) => (
                <ScrollReveal key={i}>
                  <li className="relative flex gap-[clamp(16px,2.4vw,28px)] items-start">
                    <span className="relative flex-none w-[54px] h-[54px] grid place-items-center rounded-full border border-[rgba(46,150,245,0.6)] bg-[radial-gradient(circle,rgba(46,150,245,0.3),rgba(3,8,20,0.96))] shadow-[0_0_0_7px_#050A1C,0_0_30px_rgba(46,150,245,0.4)]">
                      <span className="font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[19px] text-[#EAFE07] tabular-nums">
                        {s.num}
                      </span>
                    </span>
                    <div className="flex-1 min-w-0 pb-[clamp(16px,2vw,24px)] border-b border-white/10">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-2">
                        <span className="text-[clamp(19px,2.2vw,26px)] font-extrabold text-white leading-tight">{s.title}</span>
                        <span className="font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-bold tracking-widest uppercase text-[#EAFE07]">
                          {s.when}
                        </span>
                      </div>
                      <div className="text-[17px] leading-relaxed text-white/76 max-w-[720px]">{s.desc}</div>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScheduleSection;
