import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { faqPreview } from '../../data/homeData';

export const LocalLead: React.FC = () => {
  return (
    <section data-screen-label="Local Lead" className="max-w-[1320px] mx-auto py-[clamp(64px,8vw,120px)] px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(24px,4vw,44px)]">
        <ScrollReveal>
          <div className="h-full border border-[rgba(46,150,245,0.4)] rounded-2xl p-[clamp(26px,4vw,42px)] bg-gradient-to-br from-[rgba(46,150,245,0.14)] to-[rgba(7,23,63,0.5)] flex flex-col justify-between">
            <div>
              <div className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-extrabold tracking-widest uppercase text-[#EAFE07] mb-4">
                First time at a hackathon?
              </div>
              <h2 className="m-0 mb-4 font-['Overpass',sans-serif] font-black text-[clamp(26px,3.2vw,40px)] leading-tight uppercase text-white">
                Talk to your Local Lead
              </h2>
              <p className="m-0 text-[18px] leading-relaxed text-white/85 font-light">
                Not sure where to begin, how to form a team, or which challenge to pick? Book a one-on-one with Houston's Local Lead, Zain Khan — or send us a message directly.
              </p>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-3.5 items-center">
              <a
                href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3NhJFzIf_7Oc7zIWx-XDhPqiPl3R4W8NQbN3Bj21nk2AUQYBNoZbl5SsQrDcg2OaS0SG8xX7db?gv=true"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-xl bg-[#2E96F5] text-[#04122F] font-extrabold text-[17px] shadow-[0_8px_32px_rgba(46,150,245,0.35)] transition-all hover:bg-[#5FB4FF] hover:-translate-y-0.5"
              >
                Book a 1:1 appointment
              </a>
              <a
                href="mailto:zain@nasaspaceappschallenge.org?subject=Space%20Apps%20Houston%20Inquiry"
                className="px-6 py-3.5 rounded-xl border border-white/35 text-white font-bold text-[17px] transition-all hover:border-[#EAFE07] hover:text-[#EAFE07]"
              >
                Email the Houston team
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="h-full border border-white/14 rounded-2xl p-[clamp(26px,4vw,42px)] bg-white/[0.03]">
            <h2 className="m-0 mb-2.5 font-['Overpass',sans-serif] font-black text-[clamp(26px,3.2vw,40px)] leading-tight uppercase text-white">
              Common questions
            </h2>
            <div className="grid gap-2.5 mt-5">
              {faqPreview.map((f, i) => (
                <details key={i} className="border border-white/14 rounded-xl bg-white/[0.03] p-[1.125rem]">
                  <summary className="cursor-pointer text-[18px] font-bold text-white list-none select-none">
                    {f.q}
                  </summary>
                  <p className="mt-3 m-0 text-[16px] leading-relaxed text-white/78 font-light">{f.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-[1.375rem]">
              <a href="#/faq" className="text-[18px] font-bold text-[#2E96F5] hover:text-[#EAFE07]">
                All frequently asked questions →
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default LocalLead;
