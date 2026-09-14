import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';

export interface WinnerTeam {
  name: string;
  category: string;
  members: string[];
  description: string;
  badgeColor: string;
}

const winnersList: WinnerTeam[] = [
  {
    name: 'Bluetonium',
    category: 'Houston Global Nominee',
    members: ['Silas Lovett', 'Maxwell Campbell-Ricketts', 'Devin Gross', 'Kaiden Dillon', 'Jim Foreman'],
    description: 'Advanced space mission modeling and open data technical solution.',
    badgeColor: '#EAFE07'
  },
  {
    name: 'Cosmobots',
    category: 'Houston Global Nominee',
    members: ['Thevesh Pal', 'Yunus Kilinc', 'Amey Mishra', 'Yen-Ching Cheng', 'Parth Zanwar', 'Dhruv Mantri'],
    description: 'Autonomous robotics, satellite data, and space technology innovation.',
    badgeColor: '#2E96F5'
  },
  {
    name: 'EnviroCast',
    category: 'Houston Global Nominee',
    members: ['Ahaan Thota', 'Divin Giddaluru', 'Sathyan Gopal', 'Arnav Nemade', 'Kavin Elangovan', 'Vir Sanghavi'],
    description: 'Environmental predictive analytics and Earth observation platform.',
    badgeColor: '#00E5FF'
  },
  {
    name: 'Team AI MED',
    category: 'Houston Global Nominee',
    members: ['Abyaz Bhuiyan', 'Ashley Jiang', 'Xiaoqian Jiang', 'Sonia A', 'Carlos Alfredo', 'Myreen Ahsan'],
    description: 'AI medical analysis and space medicine data application.',
    badgeColor: '#FF3366'
  }
];

export const HoustonWinners: React.FC = () => {
  return (
    <section data-screen-label="Houston winners" className="py-[clamp(56px,7vw,104px)] px-6">
      <div className="max-w-[1320px] mx-auto">
        <ScrollReveal>
          <div className="flex flex-wrap items-baseline gap-3 mb-2">
            <h2 className="m-0 font-['Overpass',sans-serif] font-black text-[clamp(28px,3.6vw,46px)] uppercase text-white">
              Houston <span className="text-[#EAFE07]">2024 Winners</span>
            </h2>
            <span className="font-['Fira_Sans_Condensed',sans-serif] text-[13px] font-bold tracking-widest uppercase text-[#2E96F5]">
              Global Nominees
            </span>
          </div>
          <p className="m-0 mb-10 max-w-[720px] text-[18px] leading-relaxed text-white/75 font-light">
            Official Houston local event winners nominated for the global NASA Space Apps Challenge judging rounds.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {winnersList.map((team, idx) => (
            <ScrollReveal key={idx} className="h-full">
              <div className="h-full flex flex-col justify-between border border-white/14 rounded-2xl p-6 bg-[#050A1C]/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#EAFE07] shadow-xl">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-['Fira_Sans_Condensed',sans-serif] text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded bg-white/10" style={{ color: team.badgeColor }}>
                      🏆 {team.category}
                    </span>
                  </div>
                  <h3 className="m-0 mb-2 text-[22px] font-extrabold text-white leading-snug font-['Overpass',sans-serif]">
                    {team.name}
                  </h3>
                  <p className="m-0 mb-4 text-[14px] leading-relaxed text-white/75 font-light">
                    {team.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="font-['Fira_Sans_Condensed',sans-serif] text-[11px] font-bold tracking-widest uppercase text-white/50 mb-2">
                    Team Members
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {team.members.map((m, mIdx) => (
                      <span key={mIdx} className="text-[12px] font-medium text-white/85 bg-white/6 px-2.5 py-1 rounded-md border border-white/10">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HoustonWinners;
