import { TeamNode } from '../types';

export const audiences = [
  { title: 'Students & academics', desc: "University students, researchers, and faculty from Houston's educational institutions." },
  { title: 'Tech professionals', desc: 'Software developers, data scientists, engineers, and IT professionals.' },
  { title: 'Space industry', desc: 'Aerospace engineers and space industry professionals from across the region.' },
  { title: 'Creatives & entrepreneurs', desc: 'Designers, artists, business professionals, educators and startup founders.' }
];

export const takeaways = [
  'New technical skills and space domain knowledge',
  "Professional network within Houston's space ecosystem",
  'Portfolio project demonstrating your capabilities',
  'Recognition and potential prizes for outstanding work',
  'Experience working on real-world space challenges',
  'Memories and friendships that last beyond the weekend'
];

export const roster: TeamNode[] = [
  {
    name: 'Zain Khan',
    role: 'Local Lead',
    x: 32.2,
    y: 13.5,
    side: 'l',
    expertise: 'Community Organizer · Business Development · Software Consulting',
    loves: 'Loves: Building communities, startups & AI'
  },
  {
    name: 'Rawaa Al-Safar',
    role: 'Co-Lead',
    x: 78.3,
    y: 19.1,
    side: 'r',
    expertise: 'Community · Operations · Space Apps',
    loves: 'Loves: Bringing people together & space'
  },
  {
    name: 'Maleha Alvi',
    role: 'Industry & Community Partnerships',
    x: 87.6,
    y: 30.1,
    side: 'r',
    expertise: 'Workforce Development · Employer Partnerships · Community',
    loves: 'Loves: Connecting people with opportunities'
  },
  { name: 'Tanveer Shah', role: 'Marketing', x: 86.7, y: 43, side: 'r', expertise: '', loves: '' },
  {
    name: 'Myreen Ahsan',
    role: 'High School Ambassador',
    x: 77.8,
    y: 51.8,
    side: 'r',
    expertise: 'AI Research · STEM · Youth Outreach',
    loves: 'Loves: AI, science & helping young people build'
  },
  {
    name: 'Martina Dimoska',
    role: 'NASA Internal Lead Representative',
    x: 66.7,
    y: 60.4,
    side: 'b',
    expertise: 'NASA · Space Apps · Community',
    loves: 'Loves: Space, technology & connecting global communities'
  },
  {
    name: 'Bobi Sofronijoski',
    role: 'Technology & Space Apps Advisor',
    x: 15.4,
    y: 28.8,
    side: 'l',
    expertise: 'Software Engineering · Space Apps · Technology',
    loves: 'Loves: Building technology & solving problems'
  }
];

/**
 * Space Apps Houston's own films, looped on the About page. The three vertical clips and the two event films come
 * from the Space Apps Houston marketing library.
 */
export const motionClips: { src: string; poster: string; label: string; wide?: boolean }[] = [
  { src: '/videos/loops/houston.mp4', poster: '/videos/loops/houston-poster.jpg', label: 'Houston from above' },
  { src: '/videos/loops/space-data.mp4', poster: '/videos/loops/space-data-poster.jpg', label: 'Houston after dark' },
  { src: '/videos/loops/space.mp4', poster: '/videos/loops/space-poster.jpg', label: 'Earth from orbit' },
  { src: '/videos/SACHoustonIntro.mp4', poster: '/Pictures/StudentCenterNorth.jpg', label: 'Inside the hackathon', wide: true },
  { src: '/videos/SavetheDate.mp4', poster: '/videos/save-the-date-poster.jpg', label: 'Save the date', wide: true }
];
