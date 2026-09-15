export type OppCategory = 'challenges' | 'research' | 'students';

export interface NasaOpportunity {
  title: string;
  org?: string;
  desc: string;
  facts: string[];
  href: string;
  categories: OppCategory[];
  status?: 'paused';
}

/**
 * Curated from NASA's own program pages. Only programs still open, ongoing,
 * or between cycles as of the date this was compiled are listed — anything
 * with a passed deadline was left out rather than shown as if still open.
 * Always confirm current status on the linked NASA page before applying.
 */
export const nasaOpportunities: NasaOpportunity[] = [
  {
    title: 'NASA Space Robotics Challenge',
    desc: 'Propose a payload a robotic arm can manipulate in low Earth orbit, for US researchers, post-docs, professors and grad students.',
    facts: ['Registration closes Sept 23, 2026', 'White papers due Oct 2, 2026', 'Reward: on-orbit experiment time on the FFR mission'],
    href: 'https://spaceroboticistchallenge.com/',
    categories: ['challenges']
  },
  {
    title: 'NASA TechRise Student Challenge',
    desc: 'Design an experiment to fly on a suborbital flight payload. For grades 6–12 at US public, private and charter schools.',
    facts: ['2025–26 cycle finished; pre-registration open for next cycle', 'Reward: $1,500 + virtual mentorship'],
    href: 'https://www.futureengineers.org/nasatechrise',
    categories: ['challenges', 'students']
  },
  {
    title: 'NASA Student Launch Challenge',
    desc: 'A 9-month rocketry challenge for grades 6–12 and college/university US students.',
    facts: ['Launch: Saturday, April 10, 2027 — Huntsville, AL'],
    href: 'https://www.nasa.gov/learning-resources/nasa-student-launch/',
    categories: ['challenges', 'students']
  },
  {
    title: 'NASA Human Exploration Rover Challenge (HERC)',
    desc: 'Design and build a human-powered rover. Open to grades 6–12 and college/university students, both US and international.',
    facts: ['Culminating event: April 21–24, 2027 — U.S. Space & Rocket Center, Huntsville, AL'],
    href: 'https://www.nasa.gov/learning-resources/human-exploration-rover-challenge/',
    categories: ['challenges', 'students']
  },
  {
    title: 'Rise to Stardance Hack Club Challenge',
    desc: 'A hackathon using real NASA mission data, run by Hack Club with NASA, AMD and GitHub. Free to join.',
    facts: ['Runs through Sept 30, 2026', 'Ages 13–18', '50,000+ teens participating'],
    href: 'https://stardance.hackclub.com/',
    categories: ['challenges', 'students']
  },
  {
    title: 'App Development Challenge',
    desc: 'A challenge for high school and community college students at Johnson Space Center.',
    facts: ['On pause for 2026 — may return in 2027'],
    href: 'https://www.nasa.gov/johnson/',
    categories: ['challenges', 'students'],
    status: 'paused'
  },
  {
    title: 'NASA Citizen Science',
    desc: 'Open to everyone worldwide, no citizenship required — 46+ active projects. Most need only a smartphone or laptop. Popular projects include Planet Hunters TESS, Backyard Worlds: Planet 9, Aurorasaurus and JunoCam.',
    facts: ['450+ volunteers have co-authored peer-reviewed papers', 'Email do-nasa-science-join@lists.nasa.gov to subscribe for monthly project updates'],
    href: 'https://science.nasa.gov/citizen-science/',
    categories: ['research']
  },
  {
    title: 'Volunteer for a NASA Study',
    desc: "Run by NASA's Human Research Program. Analog missions recreate the challenges of spaceflight on Earth to help keep future crews healthy on long-duration missions.",
    facts: ['Open to highly motivated individuals interested in contributing to space exploration'],
    href: 'https://www.nasa.gov/humans-in-space/analogs/',
    categories: ['research']
  },
  {
    title: '20-Foot Chamber — Exploration Atmosphere Study',
    desc: 'NASA Johnson Space Center is recruiting volunteers for an overnight altitude-chamber study testing procedures that reduce the risk of decompression sickness during spacewalks.',
    facts: ['Up to 15 days, living and working with other participants', 'Requires a JSC class III physical, psychological assessment, physiological training, VO2 max test, lung capacity test/x-rays and heart ultrasound'],
    href: 'https://www.nasa.gov/johnson/',
    categories: ['research']
  },
  {
    title: 'Moon & Mars Exploration Analog (MMEA)',
    desc: 'NASA JSC is recruiting crew members for a year-long simulated space mission — living and working in isolation and confinement while simulating interplanetary transit and planetary surface operations.',
    facts: ['One-year commitment', 'Helps NASA validate hardware, protocols and support systems for long-duration missions'],
    href: 'https://www.nasa.gov/johnson/',
    categories: ['research']
  },
  {
    title: 'Open Science Curriculum',
    desc: "Self-paced learning, part of NASA's decade-long Transform to Open Science (TOPS) initiative.",
    facts: ['No deadline — self-paced'],
    href: 'https://openscience.nasa.gov/',
    categories: ['research']
  },
  {
    title: 'Research on the Station',
    desc: 'Resources for proposing experiments and technology demonstrations aboard the International Space Station.',
    facts: ['Ongoing'],
    href: 'https://www.nasa.gov/mission/station/research-explorer/',
    categories: ['research']
  },
  {
    title: 'Science, Technology & Aeronautics Research Solicitations',
    desc: "Umbrella pages for NASA's Earth, heliophysics, planetary and astrophysics research, plus STMD space-tech and ARMD aeronautics collaboration opportunities.",
    facts: ['Ongoing solicitations, reviewed on a rolling basis'],
    href: 'https://science.nasa.gov/researchers/solicitations/',
    categories: ['research']
  },
  {
    title: 'NASA STEM Opportunities & Activities',
    desc: 'The hub page listing every current NASA STEM opportunity and activity for students.',
    facts: ['Updated on a rolling basis'],
    href: 'https://www.nasa.gov/stem/',
    categories: ['students']
  }
];
