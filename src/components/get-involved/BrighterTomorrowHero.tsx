import React from 'react';
import { Users, Lightbulb, Globe, Rocket, ArrowRight } from 'lucide-react';

const pillars = [
  { Icon: Users, label: 'Collaborate' },
  { Icon: Lightbulb, label: 'Innovate' },
  { Icon: Globe, label: 'Solve' },
  { Icon: Rocket, label: 'Create' }
];

const leftWords = ['People', 'Ideas', 'Data', 'Community'];
const rightWords = ['Local', 'Solutions', 'Global', 'Impact'];

interface BrighterTomorrowHeroProps {
  /**
   * Houston skyline plate for the right edge. No licensed skyline photo ships
   * with the repo yet, so the right side falls back to the red arc glow alone —
   * drop a file in /public and pass its path here to fill the slot.
   */
  skylineSrc?: string;
}

export const BrighterTomorrowHero: React.FC<BrighterTomorrowHeroProps> = ({ skylineSrc }) => {
  return (
    <section
      data-screen-label="Get Involved hero"
      className="relative isolate overflow-hidden bg-[#02060F] flex items-center min-h-[clamp(540px,76vh,780px)]"
    >
      {/* Arc backdrop — a clean frame of the Save the Date film, so the yellow /
          blue / red light arcs are the real ones, not an approximation. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-center bg-cover"
        style={{ backgroundImage: "url('/arc-backdrop.jpg')" }}
      />

      {/* Astronaut + Earth plate, left edge */}
      <div aria-hidden="true" className="absolute inset-y-0 left-0 z-[1] w-[21%] max-w-[340px] hidden md:block">
        <img
          src="/astronaut-earth.jpg"
          alt=""
          className="w-full h-full object-cover object-[50%_42%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(2,6,15,0.26),rgba(2,6,15,0.52)_46%,rgba(2,6,15,0.90)_84%,#02060F_100%)]" />
      </div>

      {/* Houston skyline plate, right edge */}
      {skylineSrc && (
        <div aria-hidden="true" className="absolute inset-y-0 right-0 z-[1] w-[24%] max-w-[380px] hidden md:block">
          <img src={skylineSrc} alt="" className="w-full h-full object-cover object-[40%_center]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_left,rgba(2,6,15,0.28),rgba(2,6,15,0.60)_52%,rgba(2,6,15,0.94)_86%,#02060F_100%)]" />
          <div className="absolute inset-0 bg-[rgba(228,55,0,0.18)] mix-blend-screen" />
        </div>
      )}

      {/* Centre vignette so the type always wins against the arcs */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_58%_66%_at_50%_48%,rgba(2,6,15,0.72),rgba(2,6,15,0.42)_62%,rgba(2,6,15,0.10)_100%)]"
      />

      {/* Bottom fade into the page ground so the arc plate doesn't end on a hard edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[clamp(70px,12vh,140px)] z-[2] pointer-events-none bg-[linear-gradient(to_bottom,rgba(5,10,28,0),#050A1C_92%)]"
      />

      {/* Edge word stacks */}
      <div
        aria-hidden="true"
        className="absolute z-[3] left-[clamp(28px,5vw,88px)] top-[clamp(56px,11vh,112px)] hidden xl:block"
      >
        {leftWords.map((w) => (
          <div
            key={w}
            className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-semibold uppercase text-white/75 leading-[2] tracking-[0.34em]"
          >
            {w}
          </div>
        ))}
        <div className="mt-3 w-10 h-px bg-white/30" />
      </div>

      <div
        aria-hidden="true"
        className="absolute z-[3] right-[clamp(28px,5vw,88px)] top-[clamp(56px,11vh,112px)] hidden xl:block text-right"
      >
        {rightWords.map((w) => (
          <div
            key={w}
            className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-semibold uppercase text-white/75 leading-[2] tracking-[0.34em]"
          >
            {w}
          </div>
        ))}
        <div className="mt-3 ml-auto w-10 h-px bg-white/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 py-[clamp(40px,5vw,64px)] text-center">
        <img
          src="/sac-logo-houston-transparent.png"
          alt="NASA Space Apps Challenge Houston"
          className="mx-auto w-[clamp(158px,16.5vw,236px)] h-auto"
        />

        <p className="mt-[clamp(20px,2.6vw,34px)] mb-0 font-['Fira_Sans_Condensed',sans-serif] text-[clamp(12px,1.25vw,16px)] font-semibold uppercase text-white/85 tracking-[0.42em]">
          Ideas&nbsp;&nbsp; People&nbsp;&nbsp; Technology
        </p>

        <h1 className="mt-[clamp(10px,1.4vw,18px)] mb-0 font-['Overpass',sans-serif] font-black uppercase leading-[0.92] text-[clamp(40px,7.2vw,98px)] tracking-[-0.01em]">
          <span className="block bg-[linear-gradient(180deg,#FFFFFF_18%,#C6D2E2_100%)] bg-clip-text text-transparent">
            A Brighter
          </span>
          <span className="block bg-[linear-gradient(90deg,#2E96F5_0%,#9FCAF4_26%,#F4F7FB_50%,#F09A7C_74%,#E43700_100%)] bg-clip-text text-transparent">
            Tomorrow
          </span>
        </h1>

        <p className="mt-[clamp(14px,1.9vw,24px)] mb-0 mx-auto max-w-[620px] text-[clamp(15px,1.7vw,21px)] leading-relaxed text-white/85 font-light">
          Local minds. Global impact.
          <br />
          Join the NASA Space Apps Hackathon in Houston.
        </p>

        <div className="mt-[clamp(22px,2.8vw,36px)]">
          <a
            href="https://www.spaceappschallenge.org/2026/local-events/houston/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-block rounded-full p-[1.5px] bg-[linear-gradient(90deg,#2E96F5,#7E6BB0_50%,#E43700)] shadow-[0_0_38px_rgba(46,150,245,0.28)] transition-shadow duration-300 hover:shadow-[0_0_52px_rgba(228,55,0,0.34)]"
          >
            <span className="flex items-center gap-3.5 rounded-full bg-[rgba(4,9,24,0.94)] px-[clamp(28px,4vw,52px)] py-[clamp(13px,1.6vw,19px)] font-['Fira_Sans_Condensed',sans-serif] text-[clamp(13px,1.4vw,17px)] font-bold uppercase tracking-[0.24em] text-white">
              Be part of it
              <ArrowRight
                aria-hidden="true"
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </a>
        </div>

        <ul className="mt-[clamp(28px,3.6vw,48px)] mb-0 p-0 list-none mx-auto max-w-[760px] grid grid-cols-2 sm:grid-cols-4 gap-y-7">
          {pillars.map(({ Icon, label }, i) => (
            <li
              key={label}
              className={`flex flex-col items-center gap-2.5 ${
                i % 2 === 1 ? 'border-l border-white/15' : ''
              } sm:border-l sm:first:border-l-0 sm:border-white/15`}
            >
              <Icon aria-hidden="true" size={26} strokeWidth={1.5} className="text-white/85" />
              <span className="font-['Fira_Sans_Condensed',sans-serif] text-[clamp(10px,1vw,12px)] font-semibold uppercase text-white/75 tracking-[0.28em]">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BrighterTomorrowHero;
