import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { houstonWinners, WinnerTeam } from '../../data/winnersData';

const LinkRow: React.FC<{ links: { label: string; href: string }[]; className?: string }> = ({ links, className = '' }) => (
  <div className={`flex flex-wrap gap-x-5 gap-y-2 ${className}`}>
    {links.map((l) => (
      <a
        key={l.href}
        href={l.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-bold tracking-wider uppercase text-[#9ecdff] hover:text-[#EAFE07] transition-colors"
      >
        {l.label}
        <span aria-hidden="true">↗</span>
      </a>
    ))}
  </div>
);

const Featured: React.FC<{ team: WinnerTeam }> = ({ team }) => (
  <ScrollReveal>
    <article className="grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] gap-[clamp(20px,3vw,44px)] border border-white/14 rounded-2xl p-[clamp(20px,3vw,38px)] bg-[#050A1C]/80">
      <div>
        {team.image && (
          <img
            src={team.image}
            alt=""
            className="w-full aspect-square object-cover rounded-xl border border-white/12 block"
            loading="lazy"
          />
        )}
        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <span
            className="font-['Fira_Sans_Condensed',sans-serif] text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded bg-white/10"
            style={{ color: team.accent }}
          >
            {team.year} {team.award}
          </span>
        </div>
        <h3 className="m-0 mt-3 font-['Overpass',sans-serif] font-black text-[clamp(30px,3.6vw,46px)] leading-none uppercase text-white">
          {team.name}
        </h3>
        {team.challenge && (
          <p className="m-0 mt-3 text-[15px] leading-relaxed text-white/60">
            Challenge: <span className="text-white/80">{team.challenge}</span>
          </p>
        )}
        {team.links && <LinkRow links={team.links} className="mt-5" />}
      </div>

      <div>
        <p className="m-0 text-[clamp(18px,1.8vw,22px)] leading-relaxed text-white/85 font-light">{team.summary}</p>
        {team.detail?.map((p) => (
          <p key={p.slice(0, 24)} className="m-0 mt-4 text-[16px] leading-relaxed text-white/70 font-light">
            {p}
          </p>
        ))}

        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-4">
          {team.members.map((m) => (
            <div key={m.name} className="border-t border-white/12 pt-4">
              <h4 className="m-0 font-['Overpass',sans-serif] font-bold text-[18px] text-white">{m.name}</h4>
              {m.note && <p className="m-0 mt-2 text-[15px] leading-relaxed text-white/68 font-light">{m.note}</p>}
              {m.links && <LinkRow links={m.links} className="mt-3" />}
            </div>
          ))}
        </div>
      </div>
    </article>
  </ScrollReveal>
);

export const HoustonWinners: React.FC = () => {
  const featured = houstonWinners.find((t) => t.featured);
  const rest = houstonWinners.filter((t) => !t.featured);
  const year = featured?.year ?? rest[0]?.year;

  return (
    <section data-screen-label="Houston winners" className="py-[clamp(56px,7vw,104px)] px-6">
      <div className="max-w-[1320px] mx-auto">
        <ScrollReveal>
          <div className="flex flex-wrap items-baseline gap-3 mb-2">
            <h2 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(28px,3.6vw,46px)] uppercase text-white">
              Houston <span className="text-[#EAFE07]">{year} winners</span>
            </h2>
            <span className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-bold tracking-widest uppercase text-[#2E96F5]">
              Global Nominees
            </span>
          </div>
          <p className="m-0 mb-10 max-w-[720px] text-[18px] leading-relaxed text-white/75 font-light">
            Every local event sends its strongest projects to global judging. These are the teams Houston put forward.
          </p>
        </ScrollReveal>

        {featured && <Featured team={featured} />}

        <div className="mt-[1.125rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.125rem]">
          {rest.map((team) => (
            <ScrollReveal key={team.name} className="h-full">
              <article className="h-full flex flex-col border border-white/14 rounded-2xl p-6 bg-[#050A1C]/80 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#EAFE07]">
                <span
                  className="self-start font-['Fira_Sans_Condensed',sans-serif] text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded bg-white/10"
                  style={{ color: team.accent }}
                >
                  {team.year} {team.award}
                </span>
                <h3 className="m-0 mt-3 mb-2 font-['Overpass',sans-serif] font-extrabold text-[22px] leading-snug text-white">
                  {team.name}
                </h3>
                <p className="m-0 mb-4 text-[15px] leading-relaxed text-white/72 font-light">{team.summary}</p>
                <div className="mt-auto pt-4 border-t border-white/10">
                  <div className="font-['Fira_Sans_Condensed',sans-serif] text-[11px] font-bold tracking-widest uppercase text-white/50 mb-2">
                    Team
                  </div>
                  <ul className="m-0 p-0 list-none grid gap-1">
                    {team.members.map((m) => (
                      <li key={m.name} className="text-[14px] text-white/78">
                        {m.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HoustonWinners;
