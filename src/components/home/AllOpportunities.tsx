import React, { useMemo, useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { nasaOpportunities, OppCategory } from '../../data/nasaOpportunitiesData';

const TABS: { key: OppCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'challenges', label: 'Challenges' },
  { key: 'research', label: 'Research' },
  { key: 'students', label: 'Students' }
];

const CATEGORY_ACCENT: Record<OppCategory, string> = {
  challenges: '#E43700',
  research: '#2E96F5',
  students: '#EAFE07'
};

export const AllOpportunities: React.FC = () => {
  const [tab, setTab] = useState<OppCategory | 'all'>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return nasaOpportunities.filter((o) => {
      const matchesTab = tab === 'all' || o.categories.includes(tab);
      const matchesQuery = !q || o.title.toLowerCase().includes(q) || o.desc.toLowerCase().includes(q);
      return matchesTab && matchesQuery;
    });
  }, [tab, query]);

  return (
    <section data-screen-label="All Opportunities" className="relative py-[clamp(70px,8vw,124px)] px-6">
      <div className="max-w-[1320px] mx-auto">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-2 font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-extrabold tracking-widest uppercase text-[#E43700] mb-2.5">
                <span aria-hidden="true" className="w-2 h-2 rounded-full border-2 border-[#E43700]" />
                More to explore
              </div>
              <h2 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(30px,4.2vw,56px)] leading-tight uppercase text-white">
                All <span className="text-[#2E96F5]">opportunities</span>
              </h2>
            </div>
            <div className="hidden sm:block text-right font-['Fira_Sans_Condensed',sans-serif] text-[12px] font-bold tracking-widest uppercase text-white/40 leading-relaxed">
              Same mission.
              <br />
              Different paths.
            </div>
          </div>
          <p className="m-0 mb-8 max-w-[720px] text-[18px] leading-relaxed text-white/78 font-light">
            Space Apps Houston is one weekend. NASA runs opportunities to build, research and learn all year — here are the ones currently open or ongoing.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="flex flex-wrap gap-2">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  aria-pressed={tab === t.key}
                  className={`px-4 py-2 rounded-full text-[14px] font-bold tracking-wide transition-colors duration-200 ${
                    tab === t.key
                      ? 'bg-[#E43700] text-white'
                      : 'bg-white/[0.06] text-white/70 hover:bg-white/[0.12] hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="relative flex-1 min-w-[220px] max-w-[320px] ml-auto">
              <Search aria-hidden="true" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search opportunities..."
                className="w-full rounded-full bg-white/[0.06] border border-white/12 pl-10 pr-4 py-2.5 text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-[#2E96F5]"
              />
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((o, i) => {
            const accent = CATEGORY_ACCENT[o.categories[0]];
            return (
              <ScrollReveal key={o.title + i} className="h-full">
                <a
                  href={o.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col h-full rounded-2xl border border-white/12 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1"
                  style={{ borderColor: `${accent}35` }}
                >
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {o.categories.map((c) => (
                      <span
                        key={c}
                        className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border"
                        style={{ color: CATEGORY_ACCENT[c], borderColor: CATEGORY_ACCENT[c] }}
                      >
                        {c}
                      </span>
                    ))}
                    {o.status === 'paused' && (
                      <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border border-white/25 text-white/50">
                        Paused
                      </span>
                    )}
                  </div>

                  <h3 className="m-0 mb-2 font-['Overpass',sans-serif] font-black text-[18px] leading-tight text-white">
                    {o.title}
                  </h3>
                  <p className="m-0 mb-3 text-[14px] leading-relaxed text-white/72 flex-1">{o.desc}</p>

                  <ul className="m-0 mb-4 p-0 list-none grid gap-1">
                    {o.facts.map((f, fi) => (
                      <li key={fi} className="text-[12px] leading-snug text-white/55 flex gap-1.5">
                        <span aria-hidden="true" style={{ color: accent }}>
                          •
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <span
                    className="inline-flex items-center gap-1.5 text-[13px] font-bold transition-colors duration-200"
                    style={{ color: accent }}
                  >
                    Learn more
                    <ExternalLink aria-hidden="true" size={13} />
                  </span>
                </a>
              </ScrollReveal>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-white/50 text-[16px] py-12">No opportunities match that search.</p>
        )}
      </div>
    </section>
  );
};

export default AllOpportunities;
