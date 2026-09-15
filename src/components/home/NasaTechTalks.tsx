import React, { useMemo, useRef, useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { techTalks2025, techTalks2026, TechTalk } from '../../data/techTalksData';

const BLUE = '#2E96F5';
const RED = '#E43700';

interface FlatNode extends TechTalk {
  year: 2025 | 2026;
  key: string;
  accent: string;
}

const flatten = (): FlatNode[] => [
  ...techTalks2025.map((t, i) => ({ ...t, year: 2025 as const, key: `2025-${i}`, accent: BLUE })),
  ...techTalks2026.map((t, i) => ({ ...t, year: 2026 as const, key: `2026-${i}`, accent: RED }))
];

const NODE_WIDTH = 132;

const Panel: React.FC<{ talk: FlatNode }> = ({ talk }) => {
  if (talk.status === 'canceled') {
    return (
      <div className="rounded-2xl border border-white/14 bg-[rgba(5,10,28,0.85)] px-6 py-5 max-w-[520px]">
        <div className="font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-bold tracking-widest uppercase text-white/40">
          {talk.month} {talk.year}
        </div>
        <div className="mt-1 text-[18px] font-bold text-white/50">Talk canceled</div>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border px-6 py-5 max-w-[560px] transition-colors duration-300"
      style={{ borderColor: `${talk.accent}55`, background: 'rgba(5,10,28,0.9)' }}
    >
      <div className="font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-bold tracking-widest uppercase" style={{ color: talk.accent }}>
        {talk.month} {talk.day ? `${talk.day}, ` : ''}
        {talk.year}
      </div>
      <h3 className="mt-1.5 m-0 font-['Overpass',sans-serif] font-black text-[clamp(19px,2.2vw,24px)] leading-tight text-white">
        {talk.title}
      </h3>
      {(talk.time || talk.venue) && (
        <div className="mt-2 text-[14px] font-semibold text-white/70">
          {[talk.time, talk.venue].filter(Boolean).join(' · ')}
        </div>
      )}
      {talk.status === 'upcoming' ? (
        <p className="mt-2.5 m-0 text-[15px] text-white/55">Speaker and topic to be announced.</p>
      ) : (
        <>
          {talk.speaker && <div className="mt-2.5 text-[16px] font-bold text-white/90">{talk.speaker}</div>}
          {talk.role && <div className="mt-0.5 text-[13px] font-semibold text-white/55">{talk.role}</div>}
          {talk.desc && <p className="mt-3 m-0 text-[15px] leading-relaxed text-white/75">{talk.desc}</p>}
        </>
      )}
    </div>
  );
};

const Track: React.FC<{
  nodes: FlatNode[];
  activeKey: string | null;
  setActiveKey: (k: string) => void;
  nodeRefs: React.MutableRefObject<Record<string, HTMLButtonElement | null>>;
  vertical?: boolean;
}> = ({ nodes, activeKey, setActiveKey, nodeRefs, vertical }) => {
  const activeIdx = nodes.findIndex((n) => n.key === activeKey);

  if (vertical) {
    return (
      <div className="relative pl-8">
        <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#2E96F5] via-white/25 to-[#E43700]" />
        <div className="grid gap-5">
          {nodes.map((n, i) => {
            const isActive = n.key === activeKey;
            const disabled = n.status === 'canceled';
            return (
              <button
                key={n.key}
                ref={(el) => (nodeRefs.current[n.key] = el)}
                type="button"
                disabled={disabled}
                onMouseEnter={() => !disabled && setActiveKey(n.key)}
                onClick={() => !disabled && setActiveKey(n.key)}
                className={`relative text-left transition-opacity duration-300 ${disabled ? 'opacity-40 cursor-default' : activeKey && !isActive ? 'opacity-50' : 'opacity-100'}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-8 top-1 w-4 h-4 rounded-full border-2 transition-all duration-300"
                  style={{
                    borderColor: n.accent,
                    backgroundColor: isActive ? n.accent : 'rgba(5,10,28,1)',
                    boxShadow: isActive ? `0 0 16px 3px ${n.accent}` : disabled ? 'none' : `0 0 6px 1px ${n.accent}55`
                  }}
                />
                <div className="font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-bold tracking-widest uppercase text-white/50">
                  {n.month} {n.day}
                  {disabled ? ' — CANCELED' : ''}
                </div>
                <div className={`text-[15px] font-semibold ${isActive ? 'text-white' : 'text-white/80'}`}>{n.short}</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ width: nodes.length * NODE_WIDTH, height: 140 }}>
      {/* Base orbital line */}
      <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-[#2E96F5] via-white/20 to-[#E43700]" />
      {/* Glowing segment up to the active node */}
      {activeIdx >= 0 && (
        <div
          className="absolute top-1/2 h-[3px] -translate-y-1/2 transition-all duration-500 ease-out"
          style={{
            left: 0,
            width: activeIdx * NODE_WIDTH + NODE_WIDTH / 2,
            background: `linear-gradient(90deg, ${BLUE}, ${nodes[activeIdx].accent})`,
            boxShadow: `0 0 14px 2px ${nodes[activeIdx].accent}88`
          }}
        />
      )}

      {nodes.map((n, i) => {
        const isActive = n.key === activeKey;
        const disabled = n.status === 'canceled';
        const left = i * NODE_WIDTH + NODE_WIDTH / 2;
        return (
          <button
            key={n.key}
            ref={(el) => (nodeRefs.current[n.key] = el)}
            type="button"
            disabled={disabled}
            onMouseEnter={() => !disabled && setActiveKey(n.key)}
            onClick={() => !disabled && setActiveKey(n.key)}
            style={{ left, transform: 'translateX(-50%)' }}
            className={`absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-2.5 transition-opacity duration-300 ${
              disabled ? 'opacity-35 cursor-default' : activeKey && !isActive ? 'opacity-45' : 'opacity-100'
            }`}
          >
            <div className="flex flex-col items-center gap-1 order-2 mt-1 w-[112px]">
              <span className="font-['Fira_Sans_Condensed',sans-serif] text-[11px] font-bold tracking-widest uppercase text-white/50 whitespace-nowrap">
                {n.month}
                {disabled ? ' — CANCELED' : ''}
              </span>
              <span className={`text-[13px] font-semibold text-center leading-snug ${isActive ? 'text-white' : 'text-white/75'}`}>
                {n.short}
              </span>
            </div>
            <span
              aria-hidden="true"
              className={`order-1 block rounded-full border-2 transition-all duration-300 ${isActive ? 'w-5 h-5' : 'w-3.5 h-3.5'}`}
              style={{
                borderColor: n.accent,
                backgroundColor: isActive ? n.accent : 'rgba(5,10,28,1)',
                boxShadow: isActive ? `0 0 20px 4px ${n.accent}` : disabled ? 'none' : `0 0 6px 1px ${n.accent}55`
              }}
            />
          </button>
        );
      })}
    </div>
  );
};

export const NasaTechTalks: React.FC = () => {
  const allNodes = useMemo(flatten, []);
  // Open on the next scheduled talk so upcoming dates are visible without hovering.
  const [activeKey, setActiveKey] = useState<string | null>(
    () => allNodes.find((n) => n.status === 'upcoming')?.key ?? null
  );
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  const activeTalk = allNodes.find((n) => n.key === activeKey) || null;

  const scrollToYear = (year: 2025 | 2026) => {
    const key = year === 2025 ? '2025-0' : '2026-0';
    const el = nodeRefs.current[key];
    if (el && scrollRef.current) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  const scrollToTimeline = () => {
    timelineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const bgTint = activeTalk ? activeTalk.accent : null;

  return (
    <section data-screen-label="NASA Tech Talks" className="relative py-[clamp(64px,8vw,120px)] px-6 bg-[#050A1C] overflow-hidden">
      {/* Intro */}
      <div className="max-w-[1320px] mx-auto grid lg:grid-cols-2 gap-[clamp(32px,5vw,64px)] items-center mb-[clamp(56px,7vw,96px)]">
        <ScrollReveal>
          <div className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-extrabold tracking-[0.26em] uppercase text-[#2E96F5] mb-4">
            Your first step
          </div>
          <h2 className="m-0 mb-5 font-['Overpass',sans-serif] font-black text-[clamp(32px,4.4vw,56px)] leading-[1.05] uppercase text-white">
            Start with a<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E96F5] to-[#E43700]">NASA Tech Talk</span>
          </h2>
          <p className="m-0 mb-7 max-w-[480px] text-[18px] leading-relaxed text-white/78 font-light">
            Meet the people working on real NASA challenges, hear what they're building, and discover where you might fit in.
          </p>
          <button
            type="button"
            onClick={scrollToTimeline}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border-2 border-[#2E96F5] text-[#2E96F5] font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[16px] tracking-wider uppercase transition-all hover:bg-[rgba(46,150,245,0.1)] hover:-translate-y-0.5"
          >
            Explore the talks
            <span aria-hidden="true">↓</span>
          </button>
        </ScrollReveal>

        {/* Cinematic visual */}
        <ScrollReveal>
          <div className="relative h-[300px] md:h-[380px] rounded-3xl overflow-hidden border border-white/10 bg-[radial-gradient(ellipse_120%_100%_at_50%_120%,#0B1B37_0%,#050A1C_60%,#020610_100%)]">
            {/* Earth rim-light */}
            <div className="absolute -bottom-[40%] left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle_at_50%_30%,rgba(46,150,245,0.35),rgba(46,150,245,0.05)_45%,transparent_70%)]" />
            {/* Spotlight cones */}
            <div className="absolute top-0 left-[18%] w-[220px] h-full bg-gradient-to-b from-white/10 via-white/[0.02] to-transparent [clip-path:polygon(46%_0,54%_0,100%_100%,0_100%)]" />
            <div className="absolute top-0 left-[46%] w-[260px] h-full bg-gradient-to-b from-[rgba(228,55,0,0.14)] via-transparent to-transparent [clip-path:polygon(46%_0,54%_0,100%_100%,0_100%)]" />
            {/* Speaker silhouette */}
            <svg
              aria-hidden="true"
              viewBox="0 0 200 260"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[78%] w-auto opacity-90"
            >
              <ellipse cx="100" cy="252" rx="70" ry="8" fill="rgba(0,0,0,0.4)" />
              <path
                d="M100 40c-16 0-28 13-28 30 0 12 6 22 15 27l-3 10c-30 8-52 34-52 66v27c0 6 5 10 10 10h116c5 0 10-4 10-10v-27c0-32-22-58-52-66l-3-10c9-5 15-15 15-27 0-17-12-30-28-30z"
                fill="#050A1C"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1.5"
              />
            </svg>
            {/* Podium glow line */}
            <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[46%] h-[2px] bg-gradient-to-r from-transparent via-[#2E96F5] to-transparent opacity-70 blur-[0.5px]" />
            <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 90px rgba(0,0,0,0.55)' }} />
          </div>
        </ScrollReveal>
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className="max-w-[1320px] mx-auto relative">
        {/* Dynamic background glow keyed to the active talk */}
        <div
          aria-hidden="true"
          className="absolute -inset-x-10 -inset-y-16 pointer-events-none transition-opacity duration-500 -z-[1]"
          style={{
            opacity: bgTint ? 0.5 : 0.18,
            background: `radial-gradient(ellipse 60% 70% at 50% 40%, ${bgTint || BLUE}33, transparent 70%)`
          }}
        />

        <ScrollReveal>
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <button
              type="button"
              onClick={() => scrollToYear(2025)}
              className="font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[14px] tracking-widest uppercase text-[#2E96F5] hover:text-white transition-colors"
            >
              ← 2025
            </button>
            <h3 className="m-0 text-center font-['Fira_Sans_Condensed',sans-serif] font-bold text-[13px] tracking-[0.3em] uppercase text-white/45">
              Completed &amp; upcoming NASA Tech Talks
            </h3>
            <button
              type="button"
              onClick={() => scrollToYear(2026)}
              className="font-['Fira_Sans_Condensed',sans-serif] font-extrabold text-[14px] tracking-widest uppercase text-[#E43700] hover:text-white transition-colors"
            >
              2026 →
            </button>
          </div>
        </ScrollReveal>

        {/* Desktop / tablet: horizontal scrollable track */}
        <div className="hidden md:block">
          <div ref={scrollRef} className="overflow-x-auto pb-4 [scrollbar-width:thin]">
            <Track nodes={allNodes} activeKey={activeKey} setActiveKey={setActiveKey} nodeRefs={nodeRefs} />
          </div>
        </div>

        {/* Mobile: vertical track */}
        <div className="md:hidden">
          <Track nodes={allNodes} activeKey={activeKey} setActiveKey={setActiveKey} nodeRefs={nodeRefs} vertical />
        </div>

        {/* Info panel */}
        <div className="mt-8 min-h-[140px] flex items-start">
          {activeTalk ? (
            <Panel talk={activeTalk} />
          ) : (
            <p className="m-0 text-[15px] text-white/45 max-w-[460px]">
              Hover or tap a node above to see the talk, speaker and topic.
            </p>
          )}
        </div>
      </div>

      {/* Bottom transition into Choose Your Path */}
      <ScrollReveal>
        <div className="max-w-[720px] mx-auto text-center mt-[clamp(56px,7vw,96px)]">
          <h3 className="m-0 mb-3 font-['Overpass',sans-serif] font-black text-[clamp(24px,3vw,36px)] uppercase text-white">
            Ready to go further?
          </h3>
          <p className="m-0 mb-4 text-[17px] leading-relaxed text-white/72 font-light">
            You've seen what NASA is working on. Now choose how you want to participate.
          </p>
          <div aria-hidden="true" className="text-white/40 text-[22px]">
            ↓
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default NasaTechTalks;
