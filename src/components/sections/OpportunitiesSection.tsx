import React from 'react';
import { ArrowRight } from 'lucide-react';
import AllOpportunities from '../home/AllOpportunities';
import { ScrollReveal } from '../ui/ScrollReveal';

export const OpportunitiesSection: React.FC = () => {
  return (
    <div>
      <section
        data-screen-label="Opportunities intro"
        className="max-w-[1320px] mx-auto pt-[clamp(48px,6vw,88px)] px-6"
      >
        <ScrollReveal>
          <p className="m-0 mb-3.5 font-['Fira_Sans_Condensed',sans-serif] font-bold text-[14px] tracking-widest uppercase text-[#2E96F5]">
            NASA opportunities
          </p>
          <h1 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(34px,5.6vw,72px)] leading-none uppercase text-white">
            Beyond the weekend.
            <br />
            <span className="text-[#E43700]">Keep building with NASA.</span>
          </h1>
          <p className="mt-[1.625rem] m-0 max-w-[760px] text-[20px] leading-relaxed text-white/80 font-light">
            Challenges, research studies and student programs you can join all year — no NASA badge
            required. Filter by what fits you, and confirm current status on each NASA page before
            applying.
          </p>
        </ScrollReveal>
      </section>

      <AllOpportunities />

      <section data-screen-label="Back to Tech Talks" className="relative px-6 pb-[clamp(70px,8vw,124px)]">
        <div className="max-w-[1320px] mx-auto">
          <ScrollReveal>
            <div className="rounded-3xl border border-[rgba(46,150,245,0.30)] bg-[rgba(5,10,28,0.62)] px-[clamp(24px,4vw,56px)] py-[clamp(30px,4vw,54px)] flex flex-wrap items-center justify-between gap-6">
              <div className="max-w-[620px]">
                <h2 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(24px,3.2vw,40px)] leading-tight uppercase text-white">
                  Not sure where to start?
                </h2>
                <p className="mt-3 m-0 text-[17px] leading-relaxed text-white/75 font-light">
                  Hear from the people doing the work first — NASA Tech Talks run monthly at The Ion.
                </p>
              </div>
              <a
                href="#/get-involved"
                className="group inline-flex items-center gap-2.5 px-7 py-[1.125rem] rounded-xl bg-[#2E96F5] text-[#04122F] font-extrabold text-[17px] shadow-[0_8px_32px_rgba(46,150,245,0.32)] transition-colors duration-300 hover:bg-[#5FB4FF]"
              >
                See NASA Tech Talks
                <ArrowRight
                  aria-hidden="true"
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default OpportunitiesSection;
