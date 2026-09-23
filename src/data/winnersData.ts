/**
 * Houston's Global Nominees — the teams the local event sent forward to global judging.
 *
 * Sources: the Houston Global Nominees sheet, the participant nominee list and the 2025 project notes in the Space
 * Apps directory, the NASA Space Apps profile sheets for May Lynn Espinola and Sahus Gupta (FarmVis), and each team's
 * own site for roles and links.
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
  /** The Space Apps challenge the team answered, and what they built for it. */
  challenge?: string;
  project?: string;
  summary: string;
  /** Longer story, where we have one. */
  detail?: string[];
  members: WinnerMember[];
  image?: string;
  links?: WinnerLink[];
  accent: string;
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
    accent: '#EAFE07'
  },
  {
    name: 'EnviroCast',
    year: 2025,
    award: 'Houston Global Nominee',
    challenge: 'From EarthData to Action: Cloud Computing with Earth Observation Data for Predicting Cleaner, Safer Skies',
    project: 'EnviroCast / EnviroNex',
    summary: 'A forecasting platform that predicts pollution and climate shifts, built on NASA TEMPO satellite data with quantum machine learning alongside the classical models.',
    detail: [
      'EnviroCast pulls NASA TEMPO air quality data together with NOAA climate data and the EONET event feed, runs it through quantum machine learning modules, and draws the result on a 3D globe you can turn: real-time pollution and climate data, with an LLM assistant to ask about it. The team reports 95.4% forecast accuracy and a thousandfold speed-up over the classical approach.',
      'They have kept building since the hackathon weekend — EnviroNex is where the work stands now.'
    ],
    members: [
      {
        name: 'Arnav Nemade',
        note: 'Team lead and lead quantum developer, working in AI, multi-agent orchestration, autonomous workflows and machine learning.',
        links: [
          { label: 'Site', href: 'https://arnavnemade.vercel.app' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arnav-nemade-586871390/' }
        ]
      },
      {
        name: 'Kavin Elangovan',
        note: 'Co-lead on web applications and graphics, working in deep learning, visual interfaces and full-stack development.',
        links: [
          { label: 'Site', href: 'https://www.kavinelangovan.com' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kavin-elangovan-93b556324/' }
        ]
      },
      { name: 'Sathyan Gopal' },
      { name: 'Divin Giddaluru' },
      { name: 'Ahaan Thota' },
      { name: 'Vir Sanghavi' }
    ],
    links: [
      { label: 'Demo', href: 'https://envirocast.github.io/' },
      { label: 'envirocast.org', href: 'https://www.envirocast.org/team' },
      { label: 'Code', href: 'https://github.com/envirocast' }
    ],
    accent: '#00E5FF'
  },
  {
    name: 'Team AI MED',
    year: 2025,
    award: 'Houston Global Nominee',
    challenge: 'Build a Space Biology Knowledge Engine',
    project: 'AURA (AI-Unified Research Atlas)',
    summary: 'A research atlas that turns more than 200,000 pages of NASA space life-science literature into summaries anyone can search.',
    detail: [
      'AURA merges four NASA repositories — OSDR, NSLSL, the Task Book and PubMed — through a retrieval pipeline, answers in English, French, Italian, German and Spanish, and keeps a knowledge-gap radar on what the literature has not covered. Built with Python, TypeScript, FastAPI, LangChain and Google Cloud Run.',
      'The team is middle school innovators working alongside experienced AI professionals.'
    ],
    members: [
      {
        name: 'Myreen Ahsan',
        note: 'Founder and chief executive of AI-MED STEM for ALL, a youth-led nonprofit, working in translational medicine and AI.',
        links: [{ label: 'AI-MED STEM', href: 'https://aimedstemforall.org/meet-the-team/' }]
      },
      {
        name: 'Ashley Jiang',
        note: 'Vice president of AI-MED STEM for ALL, working in medical AI.',
        links: [{ label: 'AI-MED STEM', href: 'https://aimedstemforall.org/meet-the-team/' }]
      },
      {
        name: 'Xiaoqian Jiang',
        note: 'Professor and chair of health data science and artificial intelligence at UTHealth Houston\u2019s McWilliams School of Biomedical Informatics, and an advisor to AI-MED STEM.',
        links: [{ label: 'UTHealth', href: 'https://sbmi.uth.edu/faculty-and-staff/xiaoqian-jiang.htm' }]
      },
      { name: 'Carlos Alfredo Jaimes Garcia' },
      { name: 'Abyaz Bhuiyan' },
      { name: 'Sonia A' }
    ],
    links: [
      { label: 'Try AURA', href: 'https://nasa-deep-research-service-eoohrvwf7q-uc.a.run.app/' },
      { label: 'Video', href: 'https://youtube.com/watch?v=y47DzRVc_bM' }
    ],
    accent: '#FF3366'
  },
  {
    name: 'Cosmobots',
    year: 2025,
    award: 'Houston Global Nominee',
    challenge: 'Commercializing Low Earth Orbit',
    project: 'ORCA (Orbital Recycling & Construction Array)',
    summary: 'A system that turns orbital debris into construction material for future spacecraft and stations.',
    detail: [
      'Drones and tugs capture debris in orbit; a vacuum furnace and 3D printing turn it into usable material; AI-guided robotics coordinate the work using NASA and LeoLabs tracking data. The aim is a circular economy in orbit, where what is already up there becomes the infrastructure that follows.',
      'The team is Houston high school robotics and engineering students, who kept the AI to layout and proofreading and built the rest themselves.'
    ],
    members: [
      { name: 'Amey Mishra', note: 'Team owner.', links: [{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/amey-mishra/' }] },
      { name: 'Thevesh Pal' },
      { name: 'Yen-Ching Cheng' },
      { name: 'Yunus Kilinc' },
      { name: 'Dhruv Mantri' },
      { name: 'Parth Zanwar' }
    ],
    links: [{ label: 'orcadebriscleanup.space', href: 'https://orcadebriscleanup.space' }],
    accent: '#2E96F5'
  },
  {
    name: 'Bluetonium',
    year: 2025,
    award: 'Houston Global Nominee',
    challenge: 'Meteor Madness',
    project: 'Code Red',
    summary: 'An asteroid impact simulator: set the parameters, watch what that rock would do to a real place.',
    detail: [
      'Code Red takes NASA asteroid data and population data and models the shockwave, the energy released and the people in its path. JavaScript front end, Python behind it, built by Friendswood High School students.'
    ],
    members: [
      { name: 'Jim Foreman', note: 'Team owner.' },
      { name: 'Kaiden Dillon' },
      { name: 'Devin Gross' },
      { name: 'Maxwell Campbell-Ricketts' },
      { name: 'Silas Lovett' }
    ],
    links: [{ label: 'codered.space', href: 'https://codered.space' }],
    accent: '#EAFE07'
  }
];
