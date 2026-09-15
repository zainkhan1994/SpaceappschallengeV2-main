export interface TechTalk {
  month: string;
  day: string;
  short: string;
  title: string;
  speaker: string;
  role?: string;
  desc?: string;
  status: 'normal' | 'canceled' | 'upcoming';
}

export const techTalks2025: TechTalk[] = [
  {
    month: 'JAN',
    day: '23',
    short: 'Artemis',
    title: "Artemis: NASA's Plan for Sustainable Lunar Exploration",
    speaker: 'Montgomery B. Goforth',
    role: 'Assistant Director of Engineering, NASA Johnson Space Center',
    desc: "NASA's Artemis effort and the technology challenges involved in returning humans to the Moon.",
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
    status: 'normal'
  },
  {
    month: 'APR',
    day: '24',
    short: 'Rice Space Institute',
    title: 'NASA Tech Talks: Rice Space Institute',
    speaker: 'Montgomery B. Goforth + Texas-France Space Hub Cohort',
    desc: 'A showcase of French space companies and technologies entering the Houston space ecosystem.',
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
    status: 'normal'
  },
  {
    month: 'OCT',
    day: '',
    short: 'Canceled',
    title: 'NASA Tech Talks',
    speaker: '',
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
    status: 'normal'
  },
  {
    month: 'JUN',
    day: '25',
    short: 'Education Highlights',
    title: 'NASA Education Highlights',
    speaker: 'Dr. Elicia "Dynae" Fullwood, Jennifer Scott Williams, Glenn Johnson',
    desc: 'NASA education opportunities for high school, undergraduate and graduate students and universities.',
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
    status: 'normal'
  },
  {
    month: 'AUG',
    day: '27',
    short: 'Upcoming',
    title: 'NASA Tech Talks',
    speaker: '',
    status: 'upcoming'
  }
];
