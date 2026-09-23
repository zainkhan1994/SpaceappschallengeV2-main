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

export interface WinnerProject {
  name: string;
  summary: string;
  details?: string;
  demo?: string;
  url?: string;
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
  /** Straight from the team's Space Apps page. */
  aboutTeam?: string;
  aboutChallenge?: string;
  project2?: WinnerProject;
  teamPage?: string;
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
    teamPage: 'https://www.spaceappschallenge.org/2025/find-a-team/band-of-bros1/',
    aboutTeam:
      'We\u2019re a team of builders passionate about AI, data, and space science, with experience in machine learning, app dev, data viz, and prototyping. We love creating solutions that are both impactful and visually striking.',
    aboutChallenge:
      'NASA\u2019s Tropospheric Emissions: Monitoring of Pollution (TEMPO) mission is revolutionizing air quality monitoring across North America by enabling better forecasts and reducing pollutant exposure. Your challenge is to develop a web-based app that forecasts air quality by integrating real-time TEMPO data with ground-based air quality measurements and weather data, notifying users of poor air quality, and helping to improve public health decisions. (Earth Science Division)',
    project2: {
      name: 'EnviroCast',
      summary:
        'EnviroCast is a quantum enhanced environmental intelligence platform that leverages quantum computing to model, predict, and combat global environmental challenges with unprecedented accuracy and speed. The crown jewel of our project is EnviroNex, our quantum prediction model fitted with a globe and a dynamic UI. Using NASA\u2019s TEMPO satellite data, EnviroNex processes over 2.3 million data points per second with 95.4% accuracy and 1000\u00d7 faster computation than classical models.',
      details:
        'Our system integrates quantum superposition, entanglement networks, and AI-driven machine learning to simulate thousands of environmental scenarios simultaneously, from pollution dispersion to climate forecasting. This enables real-time decision-making for governments, researchers, and organizations. By combining NASA\u2019s open data with quantum technology, EnviroCast offers a transformative step toward sustainable planetary stewardship.',
      demo: 'https://drive.google.com/file/d/1GjeHXEr4NPi4ikB-eR-t50MRJTObQffn/view',
      url: 'https://envirocast.github.io/'
    },
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
    teamPage: 'https://www.spaceappschallenge.org/2025/find-a-team/team-ai-med/',
    aboutTeam:
      'We are a highly diverse team, bringing together bright middle school innovators and experienced industry AI leaders. Our unique blend of curiosity, creativity, and expertise allows us to tackle complex challenges from multiple perspectives \u2014 combining fresh ideas with advanced technical knowledge.',
    aboutChallenge:
      'NASA has been performing biology experiments in space for decades, generating a tremendous amount of information that will need to be considered as humans prepare to revisit the Moon and explore Mars. Although this knowledge is publicly available, it can be difficult for potential users to find information that pertains to their specific interests. Your challenge is to build a dynamic dashboard that leverages artificial intelligence (AI), knowledge graphs, and/or other tools to summarize a set of NASA bioscience publications and enables users to explore the impacts and results of the experiments these publications describe. (Earth Science Division)',
    project2: {
      name: 'AURA (AI-Unified Research Atlas)',
      summary:
        'AURA is an AI-powered research atlas that turns NASA\u2019s vast library of space-life-science data (>200k pages, >6k tasks, >500 experiments) into instant, audience-tailored insight. Using a Retrieval-Augmented-Generation (RAG 2.0) pipeline, AURA ingests four major NASA repositories (OSDR, NSLSL, Task Book, PubMed) and auto-summarizes findings at four comprehension levels \u2014 kid, student, scientist, and manager.',
      details:
        'A built-in Knowledge-Gap Radar highlights under-studied topics to guide future missions, while ROI analytics reveal where commercial space-bio can thrive. The platform is web-based, with a companion iOS app, and multilingual (English, French, Italian, German and Spanish), lowering the barrier for educators, researchers, investors, and citizen scientists to leverage decades of NASA science. By compressing weeks of literature review into seconds, AURA accelerates discovery, informs policy, and democratizes access to space-biology knowledge.',
      demo: 'https://youtube.com/watch?v=y47DzRVc_bM',
      url: 'https://nasa-deep-research-service-eoohrvwf7q-uc.a.run.app/'
    },
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
    teamPage: 'https://www.spaceappschallenge.org/2025/find-a-team/the-cosmobots/',
    aboutTeam:
      'We are a high school team in Houston! We work on robotics and engineering in high school, and we have extensive programming experience as well. We have a deep interest in space, and sustainability of space exploration! We have experience with Fusion 360, Onshape, as well as working with Neural Networks and AI models.',
    aboutChallenge:
      'As the commercialization of space rapidly accelerates, the future of business in low Earth orbit (LEO) holds incredible potential, but also presents significant operational, regulatory, and environmental challenges. This new economic frontier invites innovative and sustainable approaches to foster long-term viability and responsible execution. Your challenge is to conceptualize and design a scalable, sustainable, business model, accompanied by a prototype, that explores the unique opportunities LEO offers while addressing the complexities of operating in space. (Joint Agency Satellite Division)',
    project2: {
      name: 'ORCA \u2014 Orbital Recycling and Construction Array',
      summary:
        'ORCA is a visionary project in low Earth orbit that turns space junk into useful orbital infrastructure. Our project works by capturing and recycling old satellites and pieces of debris, helping to cut down the increasing risks space junk poses while also supporting a more sustainable space industry. The captured material gets melted down and upcycled into feedstock for 3D-printing new parts and structures right there in orbit. Every 1 kg recycled in orbit saves roughly $10,000 in launch costs.',
      details:
        'ORCA works as a small network of three spacecraft: the central ORCA Hub, a Fishnet Satellite, and a Tug Satellite. The Hub acts as an orbital factory, with a vacuum bake-out chamber, an electron beam cold-hearth furnace, a wire-drawing system, and 3D printers; captured debris is cleaned, melted, and refined into thin metal wire that becomes the raw material for printing truss sections, station panels, or replacement parts in orbit. Capture Drones gather tiny debris with nets or adhesive surfaces while the Tug Satellite hauls in heavy items like spent rocket stages. The whole system runs autonomously, guided by onboard AI and live orbital data from NASA\u2019s Orbital Debris Program and LeoLabs.',
      demo: 'https://www.youtube.com/watch?v=dITm2Ox0KxU',
      url: 'https://orcadebriscleanup.space/'
    },
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
    teamPage: 'https://www.spaceappschallenge.org/2025/find-a-team/bluetonium/',
    aboutTeam: 'Friendswood High School Team.',
    aboutChallenge:
      'A newly identified near-Earth asteroid, \u201cImpactor-2025,\u201d poses a potential threat to Earth, but do we have the tools to enable the public and decision makers to understand and mitigate its risks? NASA datasets include information about known asteroids and the United States Geological Survey provides critical information that could enable modeling the effects of asteroid impacts, but this data needs to be integrated to enable effective visualization and decision making. Your challenge is to develop an interactive visualization and simulation tool that uses real data to help users model asteroid impact scenarios, predict consequences, and evaluate potential mitigation strategies. (Planetary Science Division)',
    project2: {
      name: 'Code Red',
      summary:
        'Our web application is designed to bring awareness to the dire impact that asteroids can have on our planet, and to show measures we could take to prevent such catastrophes. We use visual interactive tools to demonstrate an asteroid simulation, and with this data we use complex equations to calculate important resulting characteristics such as shockwave radii, effects on population and much more. The user is able to input the mass, velocity, and position of the asteroid in orbit and gets back the data needed to determine its effects on the Earth.',
      details:
        'The project is separated into two main parts: the front end, which handles 3D visual simulation, orbital mechanics and user inputs, and the back end, which takes the data resulting from the orbital simulation and returns asteroid impact characteristics through a complex set of calculations. The front end is coded from the ground up in JavaScript, HTML and CSS; the backend is entirely Python. The main factor the team considered was user friendliness, so the controls and inputs stay easy to understand. NASA data, with the U.S. Geological Survey.',
      demo: 'https://codered.space',
      url: 'https://drive.google.com/file/d/1B3YTzxxdDbXgxwGKZbVJke0QXcQ8mObd/view'
    },
    accent: '#EAFE07'
  }
];
