import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { faqGroups } from '../../data/faqData';

export const FAQSection: React.FC = () => {
  return (
    <div>
      <section data-screen-label="FAQ hero" className="max-w-[1320px] mx-auto pt-[clamp(48px,6vw,88px)] px-6 pb-[clamp(32px,4vw,48px)]">
        <p className="m-0 mb-3.5 font-['Fira_Sans_Condensed',sans-serif] font-bold text-[14px] tracking-widest uppercase text-[#EAFE07]">
          FAQ
        </p>
        <h1 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(38px,6.4vw,86px)] leading-none uppercase text-white">
          Frequently asked
          <br />
          <span className="text-[#2E96F5]">questions</span>
        </h1>
        <p className="mt-6.5 m-0 max-w-[700px] text-[20px] leading-relaxed text-white/80 font-light">
          Answers drawn from the official 2026 program guidance. Still stuck?{' '}
          <a href="mailto:zain@nasaspaceappschallenge.org?subject=Space%20Apps%20Houston%20Inquiry" className="text-[#2E96F5] hover:text-[#EAFE07] underline">
            Email the Houston team
          </a>
          .
        </p>
      </section>

      <section className="max-w-[1000px] mx-auto px-6 pb-[clamp(64px,8vw,110px)]">
        {faqGroups.map((group, idx) => (
          <div key={idx} className="mb-11">
            <ScrollReveal>
              <h2 className="m-0 mb-4.5 font-['Overpass',sans-serif] font-black text-[clamp(22px,2.8vw,32px)] uppercase text-[#EAFE07]">
                {group.title}
              </h2>
            </ScrollReveal>

            <div className="grid gap-3">
              {group.items.map((f, i) => (
                <ScrollReveal key={i}>
                  <details className="border border-white/14 rounded-xl bg-white/[0.03] p-5.5 md:p-6.5">
                    <summary className="cursor-pointer text-[19px] font-bold text-white list-none select-none">
                      {f.q}
                    </summary>
                    <p className="mt-3.5 m-0 text-[17px] leading-relaxed text-white/78">{f.a}</p>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </div>
        ))}

        <ScrollReveal className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <a
            href="https://www.spaceappschallenge.org/resources/-faq/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[18px] font-bold text-[#2E96F5] hover:text-[#EAFE07]"
          >
            Read the global Space Apps FAQ →
          </a>
          <a
            href="mailto:zain@nasaspaceappschallenge.org?subject=Space%20Apps%20Houston%20Inquiry"
            className="px-6 py-3 rounded-xl bg-[#2E96F5] text-[#04122F] font-bold text-[16px] hover:bg-[#5FB4FF]"
          >
            Email the Houston team
          </a>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default FAQSection;
