/**
 * The 2026 NASA Space Apps challenges, as shown in the Tech Talks challenge deck and its detail sheet.
 *
 * Text, difficulty and subjects are the official challenge summaries on spaceappschallenge.org/2026/challenges
 * (released 17 September 2026), which are canonical. The 14 September Local Lead "Team Formation & Challenges"
 * deck has the same summaries but older tags for CLPS, Health Monitoring, MODIS/VIIRS, Martian Map and Planet X.
 * Art: public/tech-talks/challenges/<slug>.webp (1122x1402, 4:5). Posters supplied by Space Apps Houston carry
 * their own type; challenges without a poster get a NASA photograph with the type set in HTML (`cover`).
 * The CLPS poster's blurb was re-set to match the official summary (it described browsing upcoming CLPS missions).
 */
export type Difficulty = 'Beginner/Youth' | 'Intermediate' | 'Advanced';

export const DIFFICULTIES: Difficulty[] = ['Beginner/Youth', 'Intermediate', 'Advanced'];

export interface SpaceAppsChallenge {
  slug: string;
  /** Official title. */
  title: string;
  /** The tail of the title drawn in the accent colour. */
  accent?: string;
  url: string;
  difficulty: Difficulty[];
  subjects: string[];
  /** Official summary, verbatim; the sheet splits it at "Your challenge is to". */
  summary: string;
  /** Poster type for challenges without a supplied poster, and the photo's credit. */
  cover?: { title: string; blurb: string; credit: string };
}

const SAC = 'https://www.spaceappschallenge.org/2026/challenges/';

export const CHALLENGES_URL = SAC;

export const spaceAppsChallenges: SpaceAppsChallenge[] = [
  {
    slug: 'abandoned',
    title: 'Abandoned but not Forgotten: Storytelling about NASA’s Discarded Equipment on the Moon and Mars',
    accent: 'Storytelling about NASA’s Discarded Equipment on the Moon and Mars',
    url: `${SAC}abandoned-but-not-forgotten-storytelling-about-nasas-discarded-equipment-on-the-moon-and-mars/`,
    difficulty: ['Intermediate', 'Beginner/Youth'],
    subjects: ['Astrophysics', 'Planets & Moons', 'Space Exploration'],
    summary:
      'Since the 1960s, NASA has left hardware across the solar system–on the Moon, on Mars, and in deep space. From rovers and instruments that completed their science missions to probes still traveling away from Earth this hardware varies widely in both its purpose and current level of functionality. Your challenge is to tell the story of some or all of this equipment that introduces school-age space enthusiasts to the hardware and the science it made possible.'
  },
  {
    slug: 'trend-detective',
    title: 'Be An Earth System Trend Detective!',
    accent: 'Trend Detective!',
    url: `${SAC}be-an-earth-system-trend-detective/`,
    difficulty: ['Advanced'],
    subjects: ['Earth Science', 'Software'],
    summary:
      'Change is always occurring in the Earth’s interconnected environmental system, and when it runs in a consistent direction – rising or falling, increasing or decreasing, thickening or thinning – measured variables reflect it. But a variable can trend one way in one region and the opposite way in another, even when the same process drives both. Your challenge is to find and examine variables measured by NASA missions or produced by NASA models, visualize how they change over time, and determine what is changing, where it is changing, how much it is changing, and if these changes are what scientists call “significant.”'
  },
  {
    slug: 'junior-trainer',
    title: 'Build a Junior Astronaut Mission Trainer',
    accent: 'Mission Trainer',
    url: `${SAC}build-a-junior-astronaut-mission-trainer/`,
    difficulty: ['Intermediate', 'Beginner/Youth'],
    subjects: ['Games', 'Planets & Moons', 'Software', 'Space Exploration', 'Sun'],
    summary:
      'Space-themed STEM content often oversimplifies the engineering trade-offs that define a real mission or presents them at a level too complex to hold a young learner’s attention. Few tools make those trade-offs both tangible and fun. Your challenge is to design and build an interactive game or app that lets students run a lunar or Martian outpost, balancing competing demands like life support, radiation shielding, power, and food production, so they experience firsthand the decisions that determine whether a mission fails or succeeds.'
  },
  {
    slug: 'clps',
    title: 'CLPS Lunar Mission Browser',
    accent: 'Mission Browser',
    url: `${SAC}clps-lunar-mission-browser/`,
    difficulty: ['Advanced', 'Intermediate'],
    subjects: ['Human Exploration', 'Moon', 'Software', 'Space Exploration'],
    summary:
      'Missions to the Moon’s south pole face extreme lighting and communication constraints, and planning them takes careful coordination between science and engineering teams. Tools for determining Sun and Earth positions at candidate landing sites exist, but their complicated interfaces make it difficult to evaluate critical information with efficiency. Your challenge is to create an intuitive tool or application that lets mission planners, educators, and the public compare landing sites and dates quickly, visualizing Sun and Earth positions relative to the horizon to assess power generation potential and direct-to-Earth communication windows.'
  },
  {
    slug: 'health-monitoring',
    title: 'Create Health Monitoring Software for Astronauts on Space Missions',
    accent: 'for Astronauts on Space Missions',
    url: `${SAC}create-health-monitoring-software-for-astronauts-on-space-missions/`,
    difficulty: ['Intermediate'],
    subjects: ['Human Exploration', 'Software', 'Space Exploration'],
    summary:
      'Long-duration missions expose astronauts to space radiation, isolation and confinement, altered gravity, and a hostile closed environment, which can bring immune changes, bone loss, cardiovascular events, and behavioral health problems. On long missions, astronauts carry much of the responsibility for spotting these changes in themselves. Your challenge is to build a health monitoring software that gathers health indicators and enables astronauts to evaluate and act on the status of their health.'
  },
  {
    slug: 'sars',
    title: 'Dancing with the SARs',
    accent: 'the SARs',
    url: `${SAC}dancing-with-the-sars/`,
    difficulty: ['Advanced', 'Intermediate'],
    subjects: ['Earth Science'],
    summary:
      'Earth’s surface is an endless dance of natural processes and human activities, but these changes are often difficult to visualize, understand, and communicate. From wetland loss to forest wildfires, earthquakes, farming activities, glacier movement, and more, Earth is in a constant waltz of surface changes. Your challenge is to build an interactive application that uses radar remote sensing data from the NASA-ISRO Synthetic Aperture Radar (NISAR) mission to track and visualize one or more types of surface change at locations around the world.'
  },
  {
    slug: 'field-shift',
    title: 'Field Shift: Adapting Farms with NASA Data',
    accent: 'Adapting Farms with NASA Data',
    url: `${SAC}field-shift-adapting-farms-with-nasa-data/`,
    difficulty: ['Advanced', 'Intermediate'],
    subjects: ['Arts & Multimedia', 'Earth Science', 'Software'],
    summary:
      'Farmers around the world navigate shifting temperatures, changing rainfall patterns, water shortages, extreme weather, and declining soil health. These pressures make it difficult to choose crop rotations that protect fields, conserve water, and support long‑term resilience. Your challenge is to create a decision‑support tool that uses NASA Earth observations along with local soil information, crop characteristics, and farmer priorities to help farmers explore rotation strategies that could strengthen soil health and adapt their farms to changing conditions.'
  },
  {
    slug: 'flame-freefall',
    title: 'Flame in Freefall: AI-Powered Fire Safety Insights from Microgravity Combustion Data',
    accent: 'AI-Powered Fire Safety Insights from Microgravity Combustion Data',
    url: `${SAC}flame-in-freefall-ai-powered-fire-safety-insights-from-microgravity-combustion-data/`,
    difficulty: ['Advanced', 'Intermediate'],
    subjects: ['Space Exploration'],
    summary:
      'For decades, NASA has studied how flames and fire behave in microgravity, gathering a trove of experimental data along the way. That knowledge matters more than ever as humans gear up to return to the Moon and press on to Mars, yet the volume of results makes them hard to find, compare, and understand. Your challenge is to create an interactive, AI-powered dashboard that summarizes, ranks, and interprets those findings to deliver fire safety insights for human space exploration.'
  },
  {
    slug: 'modis-viirs',
    title: 'Harmonization of MODIS and VIIRS Hot Spots',
    accent: 'MODIS and VIIRS Hot Spots',
    url: `${SAC}harmonization-of-modis-and-viirs-hot-spots/`,
    difficulty: ['Advanced', 'Intermediate'],
    subjects: ['Earth Science', 'Software'],
    summary:
      'Understanding how burning activity is distributed across our planet over time, including wildfires and agricultural burns intense enough to be detected by satellite sensors, enables us to anticipate critical periods, guide monitoring efforts, and improve fire response. Satellites have tracked active fire hotspots for more than two decades, but the record is split across sensors whose data cannot be compared directly, leaving fire managers without a consistent picture of when and where burning has occurred. Your challenge is to build a web application that harmonizes these records into a burning activity calendar based on active fire hotspots, enabling early warning and emergency responders, scientists, and land managers to examine historical fire patterns, unusual conditions, and critical periods within a selected area of interest.'
  },
  {
    slug: 'earth-analogs',
    title: 'Identify Earth Locations that Analog the Permanent Moon Base Locations and Mars',
    accent: 'the Permanent Moon Base Locations and Mars',
    url: `${SAC}identify-earth-locations-that-analog-the-permanent-moon-base-locations-and-mars/`,
    difficulty: ['Advanced', 'Intermediate', 'Beginner/Youth'],
    subjects: ['Earth Science', 'Planets & Moons', 'Software', 'Space Exploration'],
    summary:
      'Selecting future landing sites and lunar base locations depends on many factors, including topography, geology, environment, and available resources, to name a few. Places on Earth that have analogous characteristics to the Moon or Mars – the Atacama Desert, Haughton Crater, Death Valley – allow mission teams to test equipment and methods before they fly; however, such terrestrial analog sites are not entirely well characterized. Your challenge is to use open Earth, Moon, and Mars data from NASA and other space agencies to identify and characterize new terrestrial analogs for future bases or landing sites, drawing on deserts, polar regions, volcanic and arid terrains, caves, and other environments that share conditions with the lunar or Martian surface.'
  },
  {
    slug: 'martian-map',
    title: 'Interplanetary Survival Guide: Martian Map',
    accent: 'Martian Map',
    url: `${SAC}interplanetary-survival-guide-martian-map/`,
    difficulty: ['Intermediate'],
    subjects: ['Human Exploration', 'Mars', 'Planets & Moons', 'Software', 'Space Exploration'],
    summary:
      'NASA has explored Mars robotically for decades, studying its extreme environment, mapping its surface, and collecting many types of data. Far from home, the first astronauts to set foot on Mars will want the best map possible, with information on the details of their routes and destinations, updates on current conditions, and the data needed to complete their mission quickly and safely. Your challenge is to create a layered, integrated view of a location or route on the Martian surface that pulls together data from multiple NASA science missions and could help a human explorer plan and carry out a successful Marswalk while conducting new and exciting science along the way.'
  },
  {
    slug: 'planet-x-spherex',
    title: 'Planet X and SPHEREx',
    accent: 'and SPHEREx',
    url: `${SAC}planet-x-and-spherex/`,
    difficulty: ['Advanced'],
    subjects: ['Astrophysics', 'Planets & Moons', 'Software'],
    summary:
      'Since 2025, NASA’s SPHEREx mission has been mapping the entire sky every six months in 102 bands of near-infrared light, returning images of more than a billion objects. Comets, asteroids, stars, brown dwarfs, and even new planets reveal themselves by shifting position between images, but no one person can sift through all that data alone. Your challenge is to create a public-facing web tool to display images of the sky from SPHEREx mission, making it easy for anyone to quickly see how they change over time.',
    cover: {
      title: 'Planet X and SPHEREx',
      blurb: 'Build a public web tool that shows how the sky in SPHEREx’s all-sky images changes over time.',
      credit: 'NASA/JPL-Caltech/BAE Systems (PIA26542)'
    }
  },
  {
    slug: 'mission-design-game',
    title: 'Space Mission Design Game',
    accent: 'Design Game',
    url: `${SAC}space-mission-design-game/`,
    difficulty: ['Intermediate', 'Beginner/Youth'],
    subjects: ['Games'],
    summary:
      'Designing a space mission requires careful consideration of competing demands, including mission objectives, spacecraft design, scientific instruments, launch vehicles, budgets, power, mass, communications, and orbital constraints. For students who rarely get to experiment with an entire mission from concept to operation, these trade-offs often remain abstract. Your challenge is to create an interactive game that allows participants to design, manage, and simulate a complete space mission while making engineering decisions, managing limited resources, and evaluating how each choice shapes the success of their mission.',
    cover: {
      title: 'Space Mission Design Game',
      blurb: 'Create a game where players design, run and simulate a complete space mission, one trade-off at a time.',
      credit: 'NASA, Orion over the Moon on Artemis I (art001e002092)'
    }
  },
  {
    slug: 'earth-jukebox',
    title: 'The Earth Information Jukebox',
    accent: 'Jukebox',
    url: `${SAC}the-earth-information-jukebox/`,
    difficulty: ['Intermediate', 'Beginner/Youth'],
    subjects: ['Arts & Multimedia', 'Earth Science', 'Software'],
    summary:
      'NASA’s Earth Information Center (EIC) produces stunning visualizations of our changing planet, but presenting Earth science through visualization alone limits who can reach it. We invite you to make this complex Earth science accessible, engaging, and multi-sensory by translating sight into sound. Your challenge is to build an “Earth Jukebox”—an interface, script, or application that pairs Earth Information Center (EIC) visual frames with dynamic sonifications generated in real time.',
    cover: {
      title: 'The Earth Information Jukebox',
      blurb: 'Pair visuals from NASA’s Earth Information Center with sound generated in real time.',
      credit: 'NASA/Bill Ingalls, Earth Information Center (NHQ202410070003)'
    }
  }
];

/** The opening card of the deck: the Space Apps Houston poster, which opens a guide to how the challenges work. */
export const challengeGuide = {
  slug: 'next-gen-houston',
  title: 'How the challenges work',
  facts: [
    { big: '14', label: 'challenges', text: 'Pick one of the official challenges. Create-your-own challenges are not offered in 2026.' },
    { big: '1–6', label: 'per team', text: 'Solo participants still create a team. Mix skills and backgrounds: you learn more and build better.' },
    { big: 'Oct 28', label: 'full statements', text: 'The full challenge statements arrive: background, objectives, considerations, tips and resources.' },
    { big: 'NASA', label: 'data required', text: 'Every project must use NASA data. Data from partner space agencies can help too.' },
    { big: 'Nov 14–15', label: 'build weekend', text: 'Build only during the hackathon: starting early leads to disqualification. Projects are due Nov 15, 11:59 p.m. local time.' }
  ]
};
