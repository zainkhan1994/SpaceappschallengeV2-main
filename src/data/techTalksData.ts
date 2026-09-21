export interface TechTalk {
  month: string;
  day: string;
  short: string;
  title: string;
  speaker: string;
  role?: string;
  desc?: string;
  /** Session time, e.g. "6:00 PM – 7:00 PM CDT". */
  time?: string;
  venue?: string;
  /** Ion District event page for this talk. */
  url?: string;
  /** What follows the talk, e.g. networking. */
  after?: string;
  status: 'normal' | 'canceled' | 'upcoming';
}

const ION = 'https://iondistrict.com/event/';

export const techTalks2023: TechTalk[] = [
  {
    month: 'APR',
    day: '27',
    short: 'Tech Talks',
    title: 'NASA Tech Talks',
    speaker: 'Montgomery B. Goforth + subject matter experts',
    desc: 'The monthly session on NASA technology development challenges open to the Houston community.',
    url: `${ION}nasa-tech-talk0427/`,
    status: 'normal'
  },
  {
    month: 'MAY',
    day: '25',
    short: 'Tech Talks',
    title: 'NASA Tech Talks',
    speaker: 'Montgomery B. Goforth + subject matter experts',
    desc: 'Fourth-Thursday session on the technology development challenges NASA is working through.',
    url: `${ION}nasa-tech-talks0525/`,
    status: 'normal'
  },
  {
    month: 'JUN',
    day: '22',
    short: 'Pumps & Pipes',
    title: 'Special Edition: NASA Tech Talks & Pumps & Pipes — Ultrasound. Integrated. Everywhere.',
    speaker: 'With Pumps & Pipes and the Ion Health & MedTech series',
    desc: 'Thin-film ultrasound technology moving from energy applications into aerospace, health and medtech.',
    url: `${ION}nasa-tech-talks0622/`,
    status: 'normal'
  },
  {
    month: 'JUL',
    day: '27',
    short: 'Networking',
    title: 'NASA Tech Talks: Networking Edition',
    speaker: '',
    desc: 'No formal programming — an evening for the Houston aerospace community at Second Draught.',
    url: `${ION}nasa-tech-talks0727/`,
    status: 'normal'
  },
  {
    month: 'AUG',
    day: '24',
    short: 'Tech Talks',
    title: 'NASA Tech Talks',
    speaker: 'Montgomery B. Goforth + subject matter experts',
    desc: 'Fourth-Thursday session on the technology development challenges NASA is working through.',
    url: `${ION}nasa-tech-talks0824/`,
    status: 'normal'
  },
  {
    month: 'SEP',
    day: '28',
    short: 'Tech Talks',
    title: 'NASA Tech Talks',
    speaker: 'Montgomery B. Goforth + subject matter experts',
    desc: 'Fourth-Thursday session on the technology development challenges NASA is working through.',
    url: `${ION}nasa-tech-talks0928/`,
    status: 'normal'
  },
  {
    month: 'OCT',
    day: '26',
    short: 'Tech Talks',
    title: 'NASA Tech Talks',
    speaker: 'Montgomery B. Goforth + subject matter experts',
    desc: 'Fourth-Thursday session on the technology development challenges NASA is working through.',
    url: `${ION}nasa-tech-talks1026/`,
    status: 'normal'
  }
];

export const techTalks2024: TechTalk[] = [
  {
    month: 'APR',
    day: '25',
    short: 'Space Nutrition',
    title: 'NASA Tech Talks: Nutrition as Fuel for Human Space Flight',
    speaker: '',
    desc: 'How nutrition shapes crew health and performance on long-duration exploration missions.',
    url: `${ION}nasa-tech-talks-0425/`,
    status: 'normal'
  },
  {
    month: 'MAY',
    day: '23',
    short: 'From Space to Startup',
    title: 'NASA Tech Talks: From Space to Startup',
    speaker: '',
    desc: "NASA's Technology Transfer and T2X programs, and how companies build on NASA innovation.",
    url: `${ION}nasa-tech-talks-0523/`,
    status: 'normal'
  }
];

export const techTalks2025: TechTalk[] = [
  {
    month: 'JAN',
    day: '23',
    short: 'Artemis',
    title: "Artemis: NASA's Plan for Sustainable Lunar Exploration",
    speaker: 'Montgomery B. Goforth',
    role: 'Assistant Director of Engineering, NASA Johnson Space Center',
    desc: "NASA's Artemis effort and the technology challenges involved in returning humans to the Moon.",
    url: `${ION}nasa-tech-talks-5/`,
    status: 'normal'
  },
  {
    month: 'FEB',
    day: '27',
    short: 'Galactic Gold Rush',
    title: 'The Galactic Gold Rush: Tapping Into the Space Economy',
    speaker: 'Kelli Kedis Ogborn',
    role: 'VP for Space Commerce and Entrepreneurship, Space Foundation',
    desc: 'The emerging commercial space economy, markets, capabilities and trends.',
    url: `${ION}nasa-tech-talks-6/`,
    status: 'normal'
  },
  {
    month: 'MAR',
    day: '27',
    short: 'Neuro-Ocular Syndrome',
    title: 'Spaceflight Associated Neuro-Ocular Syndrome',
    speaker: 'Dr. Tyson Brunstetter',
    role: 'NASA JSC Eyes & Vision Clinical Lead',
    desc: 'How long-duration spaceflight can affect astronaut vision and neurological health.',
    url: `${ION}nasa-tech-talks-7/`,
    status: 'normal'
  },
  {
    month: 'APR',
    day: '24',
    short: 'Rice Space Institute',
    title: 'NASA Tech Talks: Rice Space Institute',
    speaker: 'Montgomery B. Goforth + Texas-France Space Hub Cohort',
    desc: 'A showcase of French space companies and technologies entering the Houston space ecosystem.',
    url: `${ION}nasa-tech-talks-10/`,
    status: 'normal'
  },
  {
    month: 'MAY',
    day: '22',
    short: 'Space Food Systems',
    title: 'Space Food Systems',
    speaker: 'Xulei Wu + Montgomery B. Goforth',
    role: 'ISS and Artemis food systems',
    desc: 'How NASA develops, produces and delivers food for astronauts.',
    url: `${ION}nasa-tech-talks-8/`,
    status: 'normal'
  },
  {
    month: 'JUN',
    day: '26',
    short: 'Medical Crew Agent',
    title: 'Intelligent Medical Crew Agent',
    speaker: 'Lui Wang',
    role: 'Principal Technical Expert, Advanced Software Technologies, NASA JSC',
    desc: 'An AI-enabled medical system designed to help astronauts diagnose and treat medical problems away from Earth.',
    url: `${ION}nasa-tech-talks-9/`,
    status: 'normal'
  },
  {
    month: 'JUL',
    day: '24',
    short: 'Biomanufacturing',
    title: 'In-Space Biomanufacturing',
    speaker: 'Matthew E. Wallace + Montgomery B. Goforth',
    role: 'NASA In Space Production Applications',
    desc: 'Manufacturing biological products and advanced materials in microgravity.',
    url: `${ION}nasa-tech-talks-11/`,
    status: 'normal'
  },
  {
    month: 'AUG',
    day: '28',
    short: 'Lunar Innovations',
    title: 'Lunar Innovations',
    speaker: 'Julie N. Strickland',
    role: 'Lunar Innovations & Spacesuit Systems Engineer',
    desc: 'New technologies for lunar exploration, habitats and astronaut safety.',
    url: `${ION}nasa-tech-talks-12/`,
    status: 'normal'
  },
  {
    month: 'SEP',
    day: '25',
    short: 'Ion Transport Membranes',
    title: 'Ceramic Ion Transport Membranes',
    speaker: 'John Graf, P.E., Ph.D.',
    role: 'Technology Development Lead for Life Support, NASA JSC',
    desc: 'Technology for producing extremely pure oxygen for spaceflight applications.',
    url: `${ION}nasa-tech-talks-13/`,
    status: 'normal'
  },
  {
    month: 'OCT',
    day: '23',
    short: 'Canceled',
    title: 'NASA Tech Talks',
    speaker: '',
    desc: 'Canceled because of the lapse in federal funding for Fiscal Year 2026 and the partial government shutdown.',
    url: `${ION}nasa-tech-talks-14/`,
    status: 'canceled'
  }
];

export const techTalks2026: TechTalk[] = [
  {
    month: 'JAN',
    day: '22',
    short: 'Rice + UK Consulate',
    title: 'Rice Space Institute + UK Consulate',
    speaker: 'Meganne Louise Christian + David Alexander',
    role: 'ESA Reserve Astronaut + Director, Rice Space Institute',
    desc: 'A UK space delegation and conversation connecting international space expertise with Houston.',
    url: `${ION}nasa-tech-talks-15/`,
    status: 'normal'
  },
  {
    month: 'FEB',
    day: '26',
    short: 'Tech Dev Opportunities',
    title: 'Technology Development Opportunities for Human Space Exploration',
    speaker: 'Montgomery B. Goforth',
    role: 'Assistant Director of Engineering, NASA JSC',
    desc: "How NASA identifies technology needs and how Houston's innovation community can participate.",
    url: `${ION}nasa-tech-talks-16/`,
    status: 'normal'
  },
  {
    month: 'MAR',
    day: '26',
    short: 'Inspection & Test Facility',
    title: 'Receiving Inspection and Test Facility',
    speaker: 'Paula Gothreaux',
    role: 'SAIC Chief Safety and Mission Assurance Engineer supporting NASA JSC',
    desc: 'How mission-critical space hardware is inspected and tested.',
    url: `${ION}nasa-tech-talks-17/`,
    status: 'normal'
  },
  {
    month: 'APR',
    day: '23',
    short: 'Force Initiative',
    title: 'NASA Force Initiative',
    speaker: 'Molly Bannon',
    role: 'Innovation and Strategy Specialist, NASA JSC',
    desc: 'Technology development opportunities connecting NASA with universities, companies and technical experts.',
    url: `${ION}nasa-tech-talks-24/`,
    status: 'normal'
  },
  {
    month: 'MAY',
    day: '28',
    short: 'TX-France Space Hub',
    title: 'Texas-France Space Hub Business Accelerator',
    speaker: '3IPK · Watt & Well · Infinity Space Providers',
    role: 'Featuring Montgomery B. Goforth',
    desc: 'Space companies working on aerospace data, power electronics and propulsion.',
    url: `${ION}nasa-tech-talks-18/`,
    status: 'normal'
  },
  {
    month: 'JUN',
    day: '25',
    short: 'Education Highlights',
    title: 'NASA Education Highlights',
    speaker: 'Dr. Elicia "Dynae" Fullwood, Jennifer Scott Williams, Glenn Johnson',
    desc: 'NASA education opportunities for high school, undergraduate and graduate students and universities.',
    time: 'Thursday · 5:00 PM start',
    url: `${ION}nasa-tech-talks-19/`,
    status: 'normal'
  },
  {
    month: 'JUL',
    day: '23',
    short: 'Sensorimotor Performance',
    title: 'Optimizing Sensorimotor Performance During Space Exploration',
    speaker: 'Dr. Scott Wood',
    role: 'NASA Human Health and Performance Directorate',
    desc: 'How altered gravity affects astronaut movement, spatial awareness and neurological performance.',
    url: `${ION}nasa-tech-talks-20/`,
    status: 'normal'
  },
  {
    month: 'AUG',
    day: '27',
    short: 'Space Humanities',
    title: "NASA Tech Talks: Rice University's Space Humanities Initiative",
    speaker: 'Alexander Regier',
    role: "Co-lead, Rice University's Space Humanities Initiative",
    desc: "Rice's new Space Humanities Initiative and what the humanities bring to space exploration.",
    venue: 'The Ion',
    url: `${ION}nasa-tech-talks-21/`,
    status: 'normal'
  },
  {
    month: 'SEP',
    day: '24',
    short: 'Onboard Navigation',
    title: 'Enhancing Autonomous Onboard Navigation Systems',
    speaker: 'Jorge Chong + Montgomery B. Goforth',
    role: 'Project TRON manager, NASA JSC + JSC Chief Technologist',
    desc: 'TRON, the Target & Range-adaptive Optical Navigation suite built at NASA JSC: a spacecraft finds its own position from crater images up close, the Earth or Moon limb at mid range and unresolved planets far out, so it keeps navigating when contact with the ground is lost. An overview of the software release and two upcoming test flights.',
    time: 'Thursday · 6:00 PM – 7:00 PM CDT',
    venue: 'Ion · 4201 Main Street, Houston',
    after: 'Drinks and networking at Second Draught',
    url: `${ION}nasa-tech-talks-22/`,
    status: 'upcoming'
  },
  {
    month: 'OCT',
    day: '22',
    short: 'Topic TBA',
    title: 'NASA Tech Talks',
    speaker: '',
    desc: 'Topic and speakers not yet announced by Ion.',
    time: 'Thursday · 6:00 PM – 7:00 PM CDT',
    venue: 'Ion · 4201 Main Street, Houston',
    after: 'Drinks and networking at Second Draught',
    url: `${ION}nasa-tech-talks-23/`,
    status: 'upcoming'
  }
];
