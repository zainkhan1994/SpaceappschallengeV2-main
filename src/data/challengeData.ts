import { KeyDate, ArchiveChallenge, GlobalAward, AwardArt } from '../types';

export const keyDates: KeyDate[] = [
  { day: 'Wednesday', date: 'August 26', time: '09:00', accent: '#2E96F5', title: 'Registration opens', desc: 'Participant registration officially opens on the NASA Space Apps Challenge website. You can register any time after this date — including on the event days themselves.' },
  { day: 'Thursday', date: 'September 17', time: '09:00', accent: '#EAFE07', title: 'Challenge Summaries + Team Formation', desc: 'Challenge Summaries released. Start choosing a direction and forming your team.' },
  { day: 'Wednesday', date: 'October 28', time: '09:00', accent: '#EAFE07', title: 'Full Challenge Statements', desc: 'The complete challenge statements and dataset resources are released.' },
  { day: 'Monday', date: 'November 2', time: '09:00', accent: '#2E96F5', title: 'Space Apps Connect', desc: 'Space Apps Connect (GitHub Discussions) opens; Space Apps Connect Participant Guide available.' },
  { day: 'Friday', date: 'November 13', time: '09:00', accent: '#2E96F5', title: 'Pre-event program & Global Offers', desc: 'Global Offers become accessible to participants; Project Submission and Judging & Awards Participant Guides available.' },
  { day: 'Saturday', date: 'November 14', time: '09:00', accent: '#E43700', title: 'Hackathon day 1: build & iterate', desc: 'Houston agenda coming soon. Project work may only begin at 9:00 am local time.' },
  { day: 'Sunday', date: 'November 15', time: '09:00', accent: '#E43700', title: 'Hackathon day 2: polish, pitch & submit', desc: 'Houston agenda coming soon. Submissions close 11:59 pm local time.' },
  { day: 'Tuesday', date: 'December 1', time: 'Tentative', accent: '#EAFE07', title: 'Global Nominees, Finalists & Honorable Mentions', desc: 'NASA announces Global Nominees, Global Finalists, and Honorable Mentions. Date tentative.' },
  { day: 'Friday', date: 'January 1', time: 'Tentative', accent: '#EAFE07', title: 'Global Winners announced', desc: 'Official 2026 NASA Space Apps Challenge Global Winners announced. Date tentative.' }
];

export const archiveChallenges: ArchiveChallenge[] = [
  { title: 'A World Away', category: 'AI & Big Data', difficulty: 'Advanced', dot: '#00D4FF', description: "Develop AI models to predict exoplanet habitability using NASA's extensive database of confirmed exoplanets.", datasets: ['NASA Exoplanet Archive', 'Kepler Mission Data'] },
  { title: 'Embiggen Your Eyes', category: 'AI & Big Data', difficulty: 'Intermediate', dot: '#00D4FF', description: 'Develop computer vision algorithms to enhance and analyze astronomical images from various NASA missions.', datasets: ['Hubble Space Telescope', 'James Webb Space Telescope'] },
  { title: 'BloomWatch', category: 'Earth & Climate', difficulty: 'Intermediate', dot: '#22C55E', description: 'Monitor harmful algal blooms using satellite imagery and develop early warning systems.', datasets: ['Ocean Color Data', 'MODIS Aqua'] },
  { title: 'Air Quality', category: 'Earth & Climate', difficulty: 'Intermediate', dot: '#22C55E', description: "Create tools to visualize and predict air quality using NASA's atmospheric monitoring data.", datasets: ['TEMPO Mission', 'OMI', 'AIRS'] },
  { title: 'Habitat Creator', category: 'Space & Habitats', difficulty: 'Advanced', dot: '#8B5CF6', description: 'Design innovative space habitats for long-duration missions to Mars and beyond.', datasets: ['Mars Mission Planning', 'Life Support Systems'] },
  { title: 'SpaceTrash Hack', category: 'Space & Habitats', difficulty: 'Intermediate', dot: '#8B5CF6', description: 'Develop solutions to track and mitigate space debris threatening satellites and space missions.', datasets: ['Orbital Debris Catalog', 'Satellite Tracking'] },
  { title: 'Sharks from Space', category: 'Oceans & Ecosystems', difficulty: 'Intermediate', dot: '#0EA5E9', description: 'Use satellite technology to track marine life migration patterns and protect ocean ecosystems.', datasets: ['Ocean Biology', 'Sea Surface Temperature'] },
  { title: 'Stellar Stories', category: 'Storytelling & Education', difficulty: 'Beginner', dot: '#F59E0B', description: 'Create compelling narratives that make space science accessible and inspiring for all audiences.', datasets: ['Mission Archives', 'Educational Resources'] }
];

export const awards: GlobalAward[] = [
  { num: '01', name: 'Best Use of Science', desc: 'The best and most valid use of the scientific method.' },
  { num: '02', name: 'Best Use of Data', desc: 'Makes space data accessible, or leverages it to a unique application.' },
  { num: '03', name: 'Best Use of Technology', desc: 'The most innovative use of technology.' },
  { num: '04', name: 'Galactic Impact', desc: 'Most potential to improve life on Earth or in the universe.' },
  { num: '05', name: 'Best Mission Concept', desc: 'The most plausible concept and design.' },
  { num: '06', name: 'Most Inspirational', desc: 'The project that captures our hearts.' },
  { num: '07', name: 'Best Use of Storytelling', desc: 'Most creatively communicates open data through storytelling.' },
  { num: '08', name: 'Global Connection', desc: 'Best connects people around the world through technology.' },
  { num: '09', name: 'Art & Technology', desc: 'Most effectively combines technical and creative skills.' },
  { num: '10', name: 'Local Impact', desc: 'Greatest potential for difference in the local community.' }
];

export const artworkList: AwardArt[] = [
  { name: 'Best Use of Science', slug: 'science', cut: '/awards/science-cut.png', full: '/awards/science-full.png' },
  { name: 'Best Use of Technology', slug: 'technology', cut: '/awards/technology-cut.png', full: '/awards/technology-full.png' },
  { name: 'Best Use of Storytelling', slug: 'storytelling', cut: '/awards/storytelling-cut.png', full: '/awards/storytelling-full.png' },
  { name: 'Art & Technology', slug: 'art-tech', cut: '/awards/art-tech-cut.png', full: '/awards/art-tech-full.png' },
  { name: 'Most Inspirational', slug: 'inspirational', cut: '/awards/inspirational-cut.png', full: '/awards/inspirational-full.png' },
  { name: 'Local Impact', slug: 'local-impact', cut: '/awards/local-impact-cut.png', full: '/awards/local-impact-full.png' },
  { name: 'Best Mission Concept', slug: 'mission', cut: '/awards/mission-cut.png', full: '/awards/mission-full.png' },
  { name: 'Global Community', slug: 'community', cut: '/awards/community-cut.png', full: '/awards/community-full.png' }
];
