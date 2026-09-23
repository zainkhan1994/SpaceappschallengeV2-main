/**
 * Houston's Global Nominees — the teams the local event sent forward to global judging.
 *
 * Sources: the Houston Global Nominees sheet and the participant nominee list in the Space Apps directory, and the
 * NASA Space Apps profile sheets for May Lynn Espinola and Sahus Gupta (FarmVis).
 */
export interface WinnerLink {
  label: string;
  href: string;
}

export interface WinnerMember {
  name: string;
  note?: string;
  links?: WinnerLink[];
}

export interface WinnerTeam {
  name: string;
  year: number;
  award: string;
  /** The Space Apps challenge the team answered. */
  challenge?: string;
  summary: string;
  /** Longer story, for the featured team. */
  detail?: string[];
  members: WinnerMember[];
  image?: string;
  links?: WinnerLink[];
  accent: string;
  featured?: boolean;
}

export const houstonWinners: WinnerTeam[] = [
  {
    name: 'FarmVis',
    year: 2024,
    award: 'Houston Global Nominee',
    challenge: 'Leveraging Earth Observation Data for Informed Agricultural Decision-Making',
    summary:
      'A decision tool that turns NASA Earth observation data into plain guidance for farmers: soil moisture, drought and flood risk, and weather, mapped farm by farm.',
    detail: [
      'Farmers face unpredictable weather, pests and disease, and the tools that could help are often expensive and hard to read. FarmVis puts the data on one map: custom farm profiles for size, location and crops, with soil moisture, drought conditions and flood risk drawn around them.',
      'Under the map, DBSCAN clustering groups events and drops duplicates, local outlier factor filters bad points, and Douglas-Peucker simplification keeps the shapes clean. Hourly updates carry drought, heavy rain and official weather alerts, and an AI companion answers questions in plain language.'
    ],
    members: [
      {
        name: 'May Lynn Espinola',
        note: 'Tompkins High School. A Space Apps Global Nominee in both 2023 and 2024 and a USACO Silver medalist, she worked on the AI, the geospatial analysis and the real-time visualisation.',
        links: [
          { label: 'Site', href: 'https://goldpig888.github.io' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/may-lynn-espinola-a0120b206/' }
        ]
      },
      {
        name: 'Sahus Gupta',
        note: 'Tompkins High School and a National Merit Scholarship semifinalist, who built the geospatial data processing, the AI integration and the predictive models. He also built PlatoAI, used by more than 3,000 students.',
        links: [
          { label: 'GitHub', href: 'https://github.com/sahusgupta' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sahusgupta/' }
        ]
      }
    ],
    image: '/Pictures/Farmvis.png',
    links: [
      { label: 'Slides', href: 'https://docs.google.com/presentation/d/1li-WhVqb-3GmzET4satab2NlbWf9P9UeNMMF79hCCKw/edit' },
      { label: 'Code', href: 'https://github.com/farmvis' }
    ],
    accent: '#EAFE07',
    featured: true
  },
  {
    name: 'Bluetonium',
    year: 2024,
    award: 'Houston Global Nominee',
    summary: 'Space mission modelling built on open data.',
    members: [
      { name: 'Silas Lovett' },
      { name: 'Maxwell Campbell-Ricketts' },
      { name: 'Devin Gross' },
      { name: 'Kaiden Dillon' },
      { name: 'Jim Foreman' }
    ],
    accent: '#EAFE07'
  },
  {
    name: 'Cosmobots',
    year: 2024,
    award: 'Houston Global Nominee',
    summary: 'Autonomous robotics working from satellite data.',
    members: [
      { name: 'Thevesh Pal' },
      { name: 'Yunus Kilinc' },
      { name: 'Amey Mishra' },
      { name: 'Yen-Ching Cheng' },
      { name: 'Parth Zanwar' },
      { name: 'Dhruv Mantri' }
    ],
    accent: '#2E96F5'
  },
  {
    name: 'EnviroCast',
    year: 2024,
    award: 'Houston Global Nominee',
    summary: 'Environmental prediction from Earth observation data.',
    members: [
      { name: 'Ahaan Thota' },
      { name: 'Divin Giddaluru' },
      { name: 'Sathyan Gopal' },
      { name: 'Arnav Nemade' },
      { name: 'Kavin Elangovan' },
      { name: 'Vir Sanghavi' }
    ],
    accent: '#00E5FF'
  },
  {
    name: 'Team AI MED',
    year: 2024,
    award: 'Houston Global Nominee',
    summary: 'AI analysis applied to space medicine data.',
    members: [
      { name: 'Abyaz Bhuiyan' },
      { name: 'Ashley Jiang' },
      { name: 'Xiaoqian Jiang' },
      { name: 'Sonia A' },
      { name: 'Carlos Alfredo' },
      { name: 'Myreen Ahsan' }
    ],
    accent: '#FF3366'
  }
];
