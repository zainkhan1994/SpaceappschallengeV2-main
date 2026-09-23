import React, { useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { houstonWinners, WinnerLink, WinnerTeam } from '../../data/winnersData';

const LinkRow: React.FC<{ links: WinnerLink[]; className?: string }> = ({ links, className = '' }) => (
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

const TABS = ['About', 'Project', 'Members'] as const;

const Heading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="m-0 mb-2 font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-extrabold tracking-widest uppercase text-[#2E96F5]">{children}</h4>
);

const TeamRow: React.FC<{ team: WinnerTeam }> = ({ team }) => {
  const [tab, setTab] = useState<(typeof TABS)[number]>('About');
  const hasTabs = !!(team.aboutTeam || team.project2);
  const show = hasTabs ? tab : 'About';
  return (
  <ScrollReveal>
    <article className="grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] gap-[clamp(20px,3vw,44px)] border border-white/14 rounded-2xl p-[clamp(20px,3vw,38px)] bg-[#050A1C]/80">
      <div>
        {team.image && (
          <img src={team.image} alt="" className="w-full aspect-square object-cover rounded-xl border border-white/12 block mb-5" loading="lazy" />
        )}
        <div className="flex flex-wrap items-center gap-2.5">
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
        {team.project && (
          <p className="m-0 mt-3 text-[17px] leading-snug text-white/85">
            <span className="font-['Fira_Sans_Condensed',sans-serif] text-[11px] font-bold tracking-widest uppercase text-white/45 block mb-1">Project</span>
            {team.project}
          </p>
        )}
        {team.challenge && (
          <p className="m-0 mt-3 text-[15px] leading-relaxed text-white/60">
            <span className="font-['Fira_Sans_Condensed',sans-serif] text-[11px] font-bold tracking-widest uppercase text-white/45 block mb-1">Challenge</span>
            {team.challenge}
          </p>
        )}
        {team.links && <LinkRow links={team.links} className="mt-5" />}
      </div>

      <div>
        {hasTabs && (
          <div role="tablist" aria-label={`${team.name} details`} className="flex flex-wrap gap-1.5 mb-6">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={show === t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-lg font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-bold tracking-wider uppercase transition-colors ${
                  show === t ? 'bg-white text-[#04122F]' : 'bg-white/[0.06] text-white/70 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {show === 'About' && (
          <>
            <p className="m-0 text-[clamp(18px,1.8vw,22px)] leading-relaxed text-white/85 font-light">{team.summary}</p>
            {team.aboutTeam && (
              <div className="mt-6">
                <Heading>About the team</Heading>
                <p className="m-0 text-[16px] leading-relaxed text-white/72 font-light">{team.aboutTeam}</p>
              </div>
            )}
            {team.aboutChallenge && (
              <div className="mt-6">
                <Heading>About the challenge</Heading>
                <p className="m-0 text-[16px] leading-relaxed text-white/72 font-light">{team.aboutChallenge}</p>
              </div>
            )}
            {!team.aboutTeam &&
              team.detail?.map((p) => (
                <p key={p.slice(0, 24)} className="m-0 mt-4 text-[16px] leading-relaxed text-white/70 font-light">
                  {p}
                </p>
              ))}
          </>
        )}

        {show === 'Project' && team.project2 && (
          <>
            <h4 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(20px,2.2vw,28px)] uppercase text-white">{team.project2.name}</h4>
            <div className="mt-5">
              <Heading>Summary</Heading>
              <p className="m-0 text-[16px] leading-relaxed text-white/80 font-light">{team.project2.summary}</p>
            </div>
            {team.project2.details && (
              <div className="mt-6">
                <Heading>Project details</Heading>
                <p className="m-0 text-[16px] leading-relaxed text-white/72 font-light">{team.project2.details}</p>
              </div>
            )}
            <LinkRow
              className="mt-6"
              links={[
                ...(team.project2.demo ? [{ label: 'Demonstration', href: team.project2.demo }] : []),
                ...(team.project2.url ? [{ label: 'Project', href: team.project2.url }] : []),
                ...(team.teamPage ? [{ label: 'Space Apps team page', href: team.teamPage }] : [])
              ]}
            />
          </>
        )}

        {(show === 'Members' || !hasTabs) && (
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 ${hasTabs ? '' : 'mt-7'}`}>
            {team.members.map((m) => (
              <div key={m.name} className="border-t border-white/12 pt-4">
                <h4 className="m-0 font-['Overpass',sans-serif] font-bold text-[18px] text-white">{m.name}</h4>
                {m.note && <p className="m-0 mt-2 text-[15px] leading-relaxed text-white/68 font-light">{m.note}</p>}
                {m.links && <LinkRow links={m.links} className="mt-3" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  </ScrollReveal>
  );
};

export const HoustonWinners: React.FC = () => {
  const years = [...new Set(houstonWinners.map((t) => t.year))].sort((a, b) => b - a);

  return (
    <section data-screen-label="Houston winners" className="py-[clamp(56px,7vw,104px)] px-6">
      <div className="max-w-[1320px] mx-auto">
        {years.map((year, i) => (
          <div key={year} className={i ? 'mt-[clamp(48px,6vw,88px)]' : ''}>
            <ScrollReveal>
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <h2 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(28px,3.6vw,46px)] uppercase text-white">
                  Houston <span className="text-[#EAFE07]">{year} winners</span>
                </h2>
                <span className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-bold tracking-widest uppercase text-[#2E96F5]">
                  Global Nominees
                </span>
              </div>
              {i === 0 && (
                <p className="m-0 mb-10 max-w-[720px] text-[18px] leading-relaxed text-white/75 font-light">
                  Every local event sends its strongest projects to global judging. These are the teams Houston put forward.
                </p>
              )}
            </ScrollReveal>

            <div className={`grid gap-[1.125rem] ${i === 0 ? 'mt-0' : 'mt-8'}`}>
              {houstonWinners
                .filter((t) => t.year === year)
                .map((team) => (
                  <TeamRow key={team.name} team={team} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HoustonWinners;
