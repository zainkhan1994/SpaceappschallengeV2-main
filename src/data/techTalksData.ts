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
    speaker: "Nick Skytland",
    desc: "NASA technology development and opportunities for Houston innovators, with JSC Chief Technologist Nick Skytland.",
    role: "JSC Chief Technologist and Director, Business Development and Technology Integration Office",
    time: "Thursday · 6:00 PM – 7:30 PM CDT",
    url: `${ION}nasa-tech-talk0427/`,
    status: 'normal'
  },
  {
    month: 'MAY',
    day: '25',
    short: 'Tech Talks',
    title: 'NASA Tech Talks',
    speaker: "Chris Gerty",
    desc: "NASA technology development with Chris Gerty, whose work focuses on spacesuit informatics, human-centered technology and open collaboration.",
    role: "xEMU Informatics Subsystem Lead, NASA",
    url: `${ION}nasa-tech-talks0525/`,
    status: 'normal'
  },
  {
    month: 'JUN',
    day: '22',
    short: 'Pumps & Pipes',
    title: 'Special Edition: NASA Tech Talks & Pumps & Pipes — Ultrasound. Integrated. Everywhere.',
    speaker: "Dr. Josef Schmid + Dr. Dave Hughes",
    desc: 'Thin-film ultrasound technology moving from energy applications into aerospace, health and medtech.',
    role: "NASA flight surgeon + CEO and founder, Novosound",
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
    short: "Orbital Mining",
    title: "Orbital Mining Corporation: Lunar Power",
    speaker: "Chris Tolton + Ken Liang",
    desc: "Lunar power transmission and storage, the Watts on the Moon competition, and building a space startup.",
    role: "CEO + CTO, Orbital Mining Corporation",
    url: `${ION}nasa-tech-talks0824/`,
    status: 'normal'
  },
  {
    month: 'SEP',
    day: '28',
    short: "Life Support",
    title: "Hydrogen Peroxide for Long-Duration Life Support",
    speaker: "Dr. Jeffrey J. Sweterlitsch",
    desc: "On-demand hydrogen peroxide production by Faraday Technology and its potential for long-duration spaceflight life support.",
    url: `${ION}nasa-tech-talks0928/`,
    status: 'normal'
  },
  {
    month: 'OCT',
    day: '26',
    short: "Intuitive Machines",
    title: "Intuitive Machines: From Napkin to NASDAQ",
    speaker: "Dr. Tim Crain",
    desc: "Building Intuitive Machines, technology needs shared by space companies, and opportunities for Houston entrepreneurs.",
    role: "Co-founder and CTO, Intuitive Machines",
    url: `${ION}nasa-tech-talks1026/`,
    status: 'normal'
  }
];

export const techTalks2024: TechTalk[] = [
  {
    month: 'JAN',
    day: '25',
    short: 'Technology Challenges',
    title: "NASA Tech Talks: JSC Technology Development",
    speaker: "Michael Callahan, Terry Mayes, John Graf, Lawrence Barrett, Thomas Cognata, Steven Garcia and Michael Evans",
    role: "JSC technology presenters; moderated by Montgomery B. Goforth",
    desc: "Seven projects spanning water filtration, lunar visualization, dust capture, breathing cartridges, fuel cells, acoustic testing and lunar surface navigation.",
    time: "Thursday · 6:00 PM – 7:30 PM CST",
    venue: 'Ion · 4201 Main Street, Houston',
    after: 'Drinks and networking at Second Draught',
    url: `${ION}nasa-tech-talks-3/`,
    status: 'normal'
  },
  {
    month: 'FEB',
    day: '22',
    short: 'JSC R5',
    title: 'JSC R5: A Low-Cost On-Orbit Technology Demonstration and Free-Flying Inspection Platform',
    speaker: 'Sam Pedrotty',
    role: 'R5 Project Manager, GNC Autonomous Flight Systems Branch, NASA JSC',
    desc: 'A lean approach to small spacecraft that takes immature technologies to orbit quickly and cheaply: how small spacecraft evolved at JSC, and what faster, cheaper demonstrations could enable.',
    time: "Thursday · 6:00 PM – 7:30 PM CST",
    venue: 'Ion · 4201 Main Street, Houston',
    after: 'Drinks and networking at Second Draught',
    url: `${ION}nasa-tech-talks-4/`,
    status: 'normal'
  },
  {
    month: 'MAR',
    day: '28',
    short: 'Keeping Humans Alive',
    title: 'Keeping Humans Alive in Space',
    speaker: "Julie N. Strickland; moderated by Montgomery B. Goforth",
    desc: 'How habitats and spacesuits keep fragile human physiology going: oxygen and carbon dioxide, invisible radiation, muscle atrophy and bone loss.',
    time: "Thursday · 6:00 PM – 7:30 PM CDT",
    venue: 'Ion · 4201 Main Street, Houston',
    after: 'Drinks and networking at Second Draught',
    url: `${ION}nasa-tech-talks-0328/`,
    status: 'normal'
  },
  {
    month: 'APR',
    day: '25',
    short: 'Space Nutrition',
    title: 'NASA Tech Talks: Nutrition as Fuel for Human Space Flight',
    speaker: "Scott M. Smith",
    desc: 'How nutrition shapes crew health and performance on long-duration exploration missions.',
    role: "Lead, Nutritional Biochemistry Laboratory, NASA JSC",
    time: "Thursday · 6:00 PM – 7:30 PM CDT",
    url: `${ION}nasa-tech-talks-0425/`,
    status: 'normal'
  },
  {
    month: 'MAY',
    day: '23',
    short: 'From Space to Startup',
    title: 'NASA Tech Talks: From Space to Startup',
    speaker: "Walt Ugalde",
    desc: "NASA's Technology Transfer and T2X programs, and how companies build on NASA innovation.",
    role: "NASA Technology Transfer; T2X and T2U lead at JSC",
    url: `${ION}nasa-tech-talks-0523/`,
    status: 'normal'
  },
  {
    month: 'JUN',
    day: '27',
    short: 'Microbes in Space',
    title: 'NASA Tech Talks: Microbes in Space',
    speaker: 'Dr. Sarah Wallace',
    role: 'Technical lead, Microbiology Laboratory, NASA JSC',
    desc: 'From culturing samples on Earth to sequencing in orbit: miniPCR and the MinION sequencer on the ISS, swab-to-sequencer microbial monitoring of surfaces and water, and what comes next for spaceflight microbiology.',
    time: 'Thursday · 6:00 PM – 7:00 PM',
    venue: 'Ion · 4201 Main Street, Houston',
    after: 'Drinks and networking at Second Draught',
    url: `${ION}nasa-tech-talks-0627/`,
    status: 'normal'
  },
  {
    month: 'AUG',
    day: '22',
    short: 'Robotics',
    title: 'NASA Tech Talks: Robotics in the New Space Economy',
    speaker: 'Brice Howard',
    role: 'Co-founder and President, Novium',
    desc: 'The role robotics will play in building the new space economy, and how Novium is helping to pave the way.',
    time: 'Thursday · 6:00 PM – 7:00 PM',
    venue: 'Ion · 4201 Main Street, Houston',
    after: 'Drinks and networking at Second Draught',
    url: `${ION}nasa-tech-talks-0822/`,
    status: 'normal'
  },
  {
    month: 'SEP',
    day: '26',
    short: 'Exercise Physiology',
    title: 'NASA Tech Talks: Exercise Physiology and Countermeasures for Human Spaceflight',
    speaker: 'Dr. Brian Prejean',
    role: 'Human Performance Scientist, KBR, H-3PO laboratory at NASA JSC',
    desc: 'How NASA protects astronauts against spaceflight deconditioning: preparing crews for flight, countermeasures on the ISS, reconditioning after landing, and the challenges ahead on Orion, Gateway and the lunar surface.',
    time: 'Thursday · 6:00 PM – 7:00 PM',
    venue: 'Ion · 4201 Main Street, Houston',
    after: 'Drinks and networking at Second Draught',
    url: `${ION}nasa-tech-talks-0926/`,
    status: 'normal'
  },
  {
    month: 'OCT',
    day: '24',
    short: 'Space Force',
    title: 'NASA Tech Talks: Space Force Association Presentation',
    speaker: 'Col. Jeff Hokett (USSF, ret.) + Commissioner Tom Duncavage',
    role: 'Former Director of Futures and Integration, U.S. Space Force + Texas Military Preparedness Commissioner and NASA Visiting Executive',
    desc: 'The evolving role of the U.S. Space Force in space exploration and defense, and how it works with NASA and other space organizations.',
    time: 'Thursday · 6:00 PM – 7:00 PM',
    venue: 'Ion · 4201 Main Street, Houston',
    after: 'Drinks and networking at Second Draught',
    url: `${ION}nasa-tech-talks-1024/`,
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
    time: "Thursday · 6:00 PM reception; 6:30 PM talk – 7:30 PM CST",
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
    role: "Matthew Wallace: Manager, The Aerospace Corporation, supporting NASA’s InSPA portfolio",
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
    role: "Engineer, R&D Project Manager and founder, Strawberry Innovation",
    desc: "How ideas become patents, illustrated by an astronaut rescue system and a lunar habitat heat-removal system.",
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
    role: "JSC Chief Technologist and Acting Director, Business Development & Technology Integration Office, NASA JSC",
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
    speaker: "Dr. Elicia \"Dynae\" Fullwood, Keya T. Briscoe, Jennifer Scott Williams, Glenn Johnson, Alli Westover and Donald M. Bennett",
    desc: 'NASA education opportunities for high school, undergraduate and graduate students and universities.',
    time: "Thursday · 5:00 PM booths and activities – 7:00 PM CDT",
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
    speaker: "Alexander Regier + David Alexander, with Dario Robleto and Ryn Delpapa",
    role: "Space Humanities Initiative co-leads and guest speakers",
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
