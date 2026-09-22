/**
 * The Tech Talks card collection.
 *
 * One card per confirmed talk, newest first. `art: true` means
 * public/tech-talks/cards/<slug>.jpg exists (4:5, 1600x2000); cards without art
 * render as type-led cards instead of showing a broken image. Photos picked from
 * the NASA Image and Video Library (images-api.nasa.gov) carry their ID in `photo`.
 *
 * Talks deliberately absent, per the card brief: OCT 2026 (topic not yet
 * announced), OCT 2025 (canceled), JUL 2024 (no confirmed talk), MAY 2023
 * (Ion names Chris Gerty, but does not state a session topic).
 */
export interface TechTalkCard {
  slug: string;
  year: string;
  month: string;
  /** Small wide-tracked line above the title. */
  kicker: string;
  /** Title renders as three lines: top, accent (coloured), end. */
  top: string;
  accent: string;
  end?: string;
  desc: string;
  /** Ion District event page, where one exists. */
  url?: string;
  art?: boolean;
  /** NASA Image and Video Library ID of the card photo (images.nasa.gov/details/<id>), public domain. */
  photo?: string;
}

const ION = 'https://iondistrict.com/event/';

export const techTalkCards: TechTalkCard[] = [
  {
    slug: '2026-09-navigation',
    year: '2026',
    month: 'SEP',
    kicker: 'Craters × Limbs × Stars',
    top: 'Autonomous',
    accent: 'Onboard',
    end: 'Navigation',
    desc: 'A spacecraft that finds itself from what its camera sees, when the ground goes quiet.',
    url: `${ION}nasa-tech-talks-22/`,
    art: true,
    photo: 'art001e000346'
  },
  {
    slug: '2026-08-humanities',
    year: '2026',
    month: 'AUG',
    kicker: 'People × Ideas × Worlds',
    top: 'Rice University’s',
    accent: 'Space Humanities',
    end: 'Initiative',
    desc: 'Culture, ethics and imagination as part of how we go — and who gets to come along.',
    url: `${ION}nasa-tech-talks-21/`,
    art: true
  },
  {
    slug: '2026-07-sensorimotor',
    year: '2026',
    month: 'JUL',
    kicker: 'Body × Gravity × Performance',
    top: 'Optimizing',
    accent: 'Sensorimotor',
    end: 'Performance',
    desc: 'The brain and body relearning which way is up when gravity stops answering the question.',
    url: `${ION}nasa-tech-talks-20/`,
    art: true
  },
  {
    slug: '2026-06-education',
    year: '2026',
    month: 'JUN',
    kicker: 'Students × Faculty × NASA',
    top: 'NASA',
    accent: 'Education',
    end: 'Highlights',
    desc: 'Ways into NASA for high school, undergraduate and graduate students — and for universities.',
    url: `${ION}nasa-tech-talks-19/`,
    art: true
  },
  {
    slug: '2026-05-tx-france',
    year: '2026',
    month: 'MAY',
    kicker: 'Data × Power × Propulsion',
    top: 'Texas–France',
    accent: 'Space Hub',
    end: 'Accelerator',
    desc: 'European space technology arriving in Houston: trusted data, power electronics, propulsion.',
    url: `${ION}nasa-tech-talks-18/`,
    art: true,
    photo: 'KSC-20211020-PH-GEB01_0005'
  },
  {
    slug: '2026-04-force',
    year: '2026',
    month: 'APR',
    kicker: 'Problems × Experts × Reach',
    top: 'The NASA',
    accent: 'Force',
    end: 'Initiative',
    desc: 'Outside expertise pulled onto NASA’s hardest problems, from universities to industry.',
    url: `${ION}nasa-tech-talks-24/`,
    art: true,
    photo: 'MSFC-STARPATH-07-30-2025-joek-2'
  },
  {
    slug: '2026-03-ritf',
    year: '2026',
    month: 'MAR',
    kicker: 'Tolerance × Proof × Trust',
    top: 'Receiving',
    accent: 'Inspection',
    end: '& Test Facility',
    desc: 'Nothing mission-critical gets a free pass. How flight hardware earns its place.',
    url: `${ION}nasa-tech-talks-17/`,
    art: true,
    photo: 'wstf2019e04639'
  },
  {
    slug: '2026-02-tech-dev',
    year: '2026',
    month: 'FEB',
    kicker: 'Gaps × Needs × Openings',
    top: 'Technology',
    accent: 'Development',
    end: 'Opportunities',
    desc: 'Where NASA’s unsolved technology problems actually are — and how Houston can take them on.',
    url: `${ION}nasa-tech-talks-16/`,
    art: true,
    photo: 'MSFC-1501193'
  },
  {
    slug: '2026-01-rice-uk',
    year: '2026',
    month: 'JAN',
    kicker: 'Houston × London × Orbit',
    top: 'Rice Space Institute',
    accent: '+ UK Consulate',
    desc: 'A UK science and technology delegation meets Houston’s space community.',
    url: `${ION}nasa-tech-talks-15/`,
    art: true,
    photo: 'jsc2012e239142'
  },
  {
    slug: '2025-09-ceramic',
    year: '2025',
    month: 'SEP',
    kicker: 'Air × Ceramic × Life',
    top: 'Ceramic Ion',
    accent: 'Transport',
    end: 'Membranes',
    desc: 'A new way to make greater than 99.9% pure oxygen, far from any resupply.',
    url: `${ION}nasa-tech-talks-13/`,
    art: true
  },
  {
    slug: '2025-08-lunar',
    year: '2025',
    month: 'AUG',
    kicker: 'Suits × Habitats × Safety',
    top: 'Lunar',
    accent: 'Innovations',
    desc: 'Astronaut rescue and lunar habitat cooling: turning engineering ideas into patents.',
    url: `${ION}nasa-tech-talks-12/`,
    art: true
  },
  {
    slug: '2025-07-biomanufacturing',
    year: '2025',
    month: 'JUL',
    kicker: 'Cells × Materials × Orbit',
    top: 'In-Space',
    accent: 'Biomanufacturing',
    desc: 'Microgravity treated as a factory floor: growing what Earth’s gravity will not allow.',
    url: `${ION}nasa-tech-talks-11/`,
    art: true
  },
  {
    slug: '2025-06-imca',
    year: '2025',
    month: 'JUN',
    kicker: 'Crew × Care × Autonomy',
    top: 'Intelligent',
    accent: 'Medical Crew',
    end: 'Agent',
    desc: 'A doctor in a box: local AI helping crews diagnose and treat when Earth is too far to ask.',
    url: `${ION}nasa-tech-talks-9/`,
    art: true,
    photo: 'iss073e0384171'
  },
  {
    slug: '2025-05-food',
    year: '2025',
    month: 'MAY',
    kicker: 'Safety × Shelf life × Missions',
    top: 'Space Food',
    accent: 'Systems',
    desc: 'Feeding a crew for years, when every calorie has to launch with them.',
    url: `${ION}nasa-tech-talks-8/`,
    art: true
  },
  {
    slug: '2025-04-rice',
    year: '2025',
    month: 'APR',
    kicker: 'Startups × Research × Houston',
    top: 'Rice Space',
    accent: 'Institute',
    desc: 'International technologies and founders meeting the Houston space ecosystem.',
    url: `${ION}nasa-tech-talks-10/`,
    art: true,
    photo: 'jsc2024e070222'
  },
  {
    slug: '2025-03-sans',
    year: '2025',
    month: 'MAR',
    kicker: 'Eyes × Pressure × Time',
    top: 'Spaceflight',
    accent: 'Neuro-ocular',
    end: 'Syndrome',
    desc: 'What long-duration flight does to an astronaut’s eyes — and why it is a mission risk.',
    url: `${ION}nasa-tech-talks-7/`,
    art: true,
    photo: 'iss065e045357'
  },
  {
    slug: '2025-02-gold-rush',
    year: '2025',
    month: 'FEB',
    kicker: 'Markets × Orbit × Capital',
    top: 'The Galactic',
    accent: 'Gold Rush',
    desc: 'The space economy as it actually is: who is buying, who is building, what is next.',
    url: `${ION}nasa-tech-talks-6/`,
    art: true,
    photo: 'iss070e075556'
  },
  {
    slug: '2025-01-artemis',
    year: '2025',
    month: 'JAN',
    kicker: 'Scale × Risk × Return',
    top: 'Artemis',
    accent: 'Sustainable Lunar',
    end: 'Exploration',
    desc: 'The sheer magnitude of putting people back on the Moon, and keeping them there.',
    url: `${ION}nasa-tech-talks-5/`,
    art: true,
    photo: 'Artemis II at the pad Moon 01292026_1'
  },
  {
    slug: '2024-10-space-force',
    year: '2024',
    month: 'OCT',
    kicker: 'Orbit × Awareness × Operations',
    top: 'Space Force',
    accent: 'Association',
    desc: 'Working with NASA in orbit while defending U.S. space assets.',
    art: true,
    photo: 'iss059e104771'
  },
  {
    slug: '2024-09-exercise',
    year: '2024',
    month: 'SEP',
    kicker: 'Muscle × Bone × Countermeasure',
    top: 'Exercise',
    accent: 'Physiology',
    end: '& Countermeasures',
    desc: 'Training against the slow erosion of a body that no longer has to hold itself up.',
    art: true,
    photo: 'iss072e126509'
  },
  {
    slug: '2024-08-robotics',
    year: '2024',
    month: 'AUG',
    kicker: 'Hands × Autonomy × Orbit',
    top: 'Robotics in the',
    accent: 'New Space',
    end: 'Economy',
    desc: 'How robotics builds the new space economy, and Novium’s role in it.',
    art: true,
    photo: 'iss073e0422335'
  },
  {
    slug: '2024-06-microbes',
    year: '2024',
    month: 'JUN',
    kicker: 'Samples × Sequencing × Station',
    top: 'Microbes',
    accent: 'in Space',
    desc: 'Sequencing life aboard the station — what grows up there, and what it means for crews.',
    art: true,
    photo: 'iss057e000180'
  },
  {
    slug: '2024-05-startup',
    year: '2024',
    month: 'MAY',
    kicker: 'Transfer × Licence × Launch',
    top: 'From Space',
    accent: 'to Startup',
    desc: 'NASA technology crossing the line from laboratory bench to a company’s product.',
    url: `${ION}nasa-tech-talks-0523/`,
    art: true,
    photo: 'KSC-20201009-PH-KLS01_0037'
  },
  {
    slug: '2024-04-nutrition',
    year: '2024',
    month: 'APR',
    kicker: 'Fuel × Biochemistry × Crew',
    top: 'Nutrition',
    accent: 'as Fuel',
    end: 'for Spaceflight',
    desc: 'History is full of missions broken by food. What crews eat is mission-critical engineering.',
    url: `${ION}nasa-tech-talks-0425/`,
    art: true,
    photo: 'jsc2024e040737'
  },
  {
    slug: '2024-03-life-support',
    year: '2024',
    month: 'MAR',
    kicker: 'Air × Water × Pressure',
    top: 'Keeping Humans',
    accent: 'Alive',
    end: 'in Space',
    desc: 'The closed loop that turns a sealed metal volume into somewhere a person can live.',
    art: true,
    photo: 'jsc2022e045237'
  },
  {
    slug: '2024-02-r5',
    year: '2024',
    month: 'FEB',
    kicker: 'Small × Free-flying × Watchful',
    top: 'JSC',
    accent: 'R5',
    desc: 'A low-cost free-flying spacecraft built to go look at things humans should not have to.',
    art: true,
    photo: 'KSC-20240424-PH-FRF01_0001'
  },
  {
    slug: '2024-01-challenges',
    year: '2024',
    month: 'JAN',
    kicker: 'Water × Dust × Lunar power',
    top: 'NASA',
    accent: 'Technology',
    end: 'Challenges',
    desc: 'Seven JSC projects: water treatment, lunar dust capture, fuel cells and more.',
    art: true,
    photo: 'GRC-2019-C-13153'
  },
  {
    slug: '2023-10-intuitive-machines',
    year: '2023',
    month: 'OCT',
    kicker: 'Descent × Dust × Landing',
    top: 'Intuitive',
    accent: 'Machines',
    desc: 'From NASA engineer to Project Morpheus to landing commercial hardware on the Moon.',
    url: `${ION}nasa-tech-talks1026/`,
    art: true,
    photo: 'KSC-2014-1706'
  },
  {
    slug: '2023-09-life-support-long',
    year: '2023',
    month: 'SEP',
    kicker: 'Droplet × Chemistry × Duration',
    top: 'Long-Duration',
    accent: 'Life Support',
    desc: 'On-demand hydrogen peroxide and the chemistry of staying alive far longer than a resupply.',
    url: `${ION}nasa-tech-talks0928/`,
    art: true,
    photo: 'iss062e014322'
  },
  {
    slug: '2023-08-orbital-mining',
    year: '2023',
    month: 'AUG',
    kicker: 'Regolith × Energy × Ground',
    top: 'Orbital Mining',
    accent: '& Lunar Power',
    desc: 'Treating lunar dust as a resource, and power as the thing that makes any of it possible.',
    url: `${ION}nasa-tech-talks0824/`,
    art: true,
    photo: 'KSC-20250603-PH-FMX01_0056'
  },
  {
    slug: '2023-07-networking',
    year: '2023',
    month: 'JUL',
    kicker: 'People × Rooms × Houston',
    top: 'Networking',
    accent: 'Edition',
    desc: 'No slides. Just the Houston aerospace community in one room at The Ion.',
    url: `${ION}nasa-tech-talks0727/`,
    art: true,
    photo: 'jsc2022e043154'
  },
  {
    slug: '2023-06-ultrasound',
    year: '2023',
    month: 'JUN',
    kicker: 'Pipelines × Bodies × Orbit',
    top: 'Ultrasound.',
    accent: 'Integrated.',
    end: 'Everywhere.',
    desc: 'One technology crossing from pipeline inspection to medicine to spaceflight.',
    url: `${ION}nasa-tech-talks0622/`,
    art: true,
    photo: 'iss073e0076065'
  },
  {
    slug: '2023-04-open-innovation',
    year: '2023',
    month: 'APR',
    kicker: 'Prototypes × Partners × JSC',
    top: 'Technology,',
    accent: 'Partnerships',
    end: '& Open Innovation',
    desc: 'A builder in front of a wall of prototypes, asking who else wants to work on this.',
    url: `${ION}nasa-tech-talk0427/`,
    art: true,
    photo: 'jsc2012e034637'
  }
];
