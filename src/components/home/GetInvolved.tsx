import React from 'react';
import { Rocket, Users, ClipboardCheck, HeartHandshake, Handshake, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { pathways } from '../../data/homeData';

const icons = [Rocket, Users, ClipboardCheck, HeartHandshake, Handshake];
const accents = ['#E43700', '#2E96F5', '#E43700', '#2E96F5', '#E43700'];

export const GetInvolved: React.FC = () => {
  return (
    <section
      data-screen-label="Get Involved"
      className="relative py-[clamp(70px,8vw,124px)] px-6 bg-gradient-to-b from-transparent via-[rgba(228,55,0,0.08)] to-transparent"
    >
      <div className="max-w-[1320px] mx-auto">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-2 font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-extrabold tracking-widest uppercase text-[#2E96F5] mb-2.5">
                <span aria-hidden="true" className="w-2 h-2 rounded-full border-2 border-[#E43700]" />
                Explore opportunities
              </div>
              <h2 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(30px,4.2vw,56px)] leading-tight uppercase text-white">
                Choose <span className="text-[#E43700]">your path</span>
              </h2>
            </div>
            <div className="hidden sm:block text-right font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-bold tracking-widest uppercase text-white/40 leading-relaxed">
              Five ways in.
              <br />
              One Houston weekend.
            </div>
          </div>
          <p className="m-0 mb-[clamp(34px,4vw,52px)] max-w-[680px] text-[19px] leading-relaxed text-white/80 font-light">
            Open a path to see what the role involves.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {pathways.map((p, i) => {
            const Icon = icons[i % icons.length];
            const accent = accents[i % accents.length];
            return (
              <ScrollReveal key={i} className="h-full">
                <a
                  href={p.href}
                  target={p.href.startsWith('http') || p.href.startsWith('mailto') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={p.cta}
                  className="group relative flex flex-col h-full rounded-2xl border overflow-hidden bg-[rgba(5,10,28,0.6)] transition-all duration-300 hover:-translate-y-1"
                  style={{ borderColor: `${accent}40` }}
                >
                  <div
                    className="relative h-[140px] flex items-center justify-center overflow-hidden"
                    style={{ background: `radial-gradient(circle at 50% 30%, ${accent}30, rgba(5,10,28,0.9) 75%)` }}
                  >
                    <span
                      className="absolute top-3 left-3 font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[13px] tracking-wider border rounded-md px-2 py-0.5"
                      style={{ color: accent, borderColor: accent }}
                    >
                      {p.num}
                    </span>
                    <Icon aria-hidden="true" size={52} strokeWidth={1.4} style={{ color: accent }} className="opacity-90 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  <div className="flex flex-col flex-1 p-5">
                    <h3 className="m-0 mb-2 font-['Overpass',sans-serif] font-black text-[19px] leading-tight uppercase text-white">
                      {p.title}
                    </h3>
                    <p className="m-0 text-[14px] leading-relaxed text-white/70 flex-1">{p.desc}</p>
                    <p className="mt-3 mb-0 text-[13px] leading-relaxed font-semibold" style={{ color: accent }}>
                      {p.goal}
                    </p>

                    <span
                      aria-hidden="true"
                      className="mt-4 inline-flex items-center justify-center w-9 h-9 rounded-full border self-end transition-colors duration-300"
                      style={{ borderColor: accent, color: accent }}
                    >
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </a>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
