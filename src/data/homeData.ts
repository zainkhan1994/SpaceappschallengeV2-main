import { ParticipantPathway } from '../types';

export const basics = [
  { k: 'WHO', v: 'Everyone. Coders, scientists, designers, storytellers, educators, students, makers and builders — no matter their background, age, or skill level. Teams are 1 to 6 people.' },
  { k: 'WHEN & WHERE', v: 'November 14–15, 2026, in Houston, Texas — one of hundreds of in-person and virtual Local Events happening worldwide the same weekend.' },
  { k: 'HOW', v: 'Challenges are authored by NASA Subject Matter Experts. You join a team, pick a challenge, and build across the weekend. Judges evaluate projects and NASA recognizes 10 Global Winners.' },
  { k: 'WHY', v: "Raise awareness of NASA's free and open data, inspire creativity and collaboration, and nurture an interest in STEM." }
];

export const growth = [
  { n: '12', label: 'First Houston event', accent: '#2E96F5', h: '150px', bar: '22px' },
  { n: '48', label: 'Following year', accent: '#EAFE07', h: '150px', bar: '74px' },
  { n: '80', label: 'Most recent event', accent: '#E43700', h: '150px', bar: '112px' }
];

export const benefits = [
  { title: 'Innovation & Learning', dot: '#EAFE07', desc: 'Work on real NASA challenges and learn cutting-edge space technologies from industry experts and mentors.' },
  { title: 'Networking', dot: '#2E96F5', desc: "Connect with like-minded innovators, space professionals, students, and potential collaborators from Houston's thriving tech scene." },
  { title: 'Prizes & Recognition', dot: '#E43700', desc: 'Compete for local awards and the chance to be nominated to represent Houston in global judging.' },
  { title: 'Skill Development', dot: '#2E96F5', desc: 'Enhance your technical skills, project management abilities, and gain hands-on experience with space-related challenges.' },
  { title: 'Community Impact', dot: '#EAFE07', desc: "Contribute to solutions that can help NASA's missions and potentially benefit humanity's understanding of space." },
  { title: 'Local Relevance', dot: '#E43700', desc: "Be part of Houston's space heritage as Space City, connecting with the local aerospace and research community." }
];

export const journey = [
  { num: '01', when: 'Now', title: 'Register on the official site', desc: 'All registration happens on the NASA Space Apps website via the Houston Local Event page. You must register there to be counted for attendance and judging.' },
  { num: '02', when: 'Aug – Nov', title: 'Join the Houston Local Event', desc: 'Select Houston as your event. If you can’t attend in person, the virtual Universal Event is an alternative.' },
  { num: '03', when: 'Aug – Nov', title: 'Form a team of 1–6', desc: 'Come with a team or form one on site. One person can participate alone — as a team of one.' },
  { num: '04', when: 'Sep 17 – Oct 28', title: 'Choose a challenge', desc: 'Challenge Summaries arrive September 17 and the full Challenge Statements on October 28. Read them and pick the one that fits your team.' },
  { num: '05', when: 'November', title: 'Build during the hackathon', desc: 'Work begins at 9:00 am local time on day one. Mentors, Navigators and NASA subject matter experts are available for help.' },
  { num: '06', when: 'November 15', title: 'Submit your project', desc: 'Submissions close 11:59 pm local time on the second day. Partial submissions are welcome and still eligible.' },
  { num: '07', when: 'November', title: 'Take the registrant survey', desc: 'Quick feedback that shapes next year’s event — and closes out your participation.' }
];

/** The six-stop route drawn by the scroll-driven Participant Journey. */
export const journeyRoute = [
  { num: '01', title: 'Register', desc: 'Create your profile and join the global community.' },
  { num: '02', title: 'Find a team', desc: 'Join a team or meet new collaborators in Houston and beyond.' },
  { num: '03', title: 'Choose a challenge', desc: 'Explore NASA’s real-world challenges and pick the one that inspires you.' },
  { num: '04', title: 'Build your solution', desc: 'Create, iterate, and bring your idea to life with your team.' },
  { num: '05', title: 'Submit', desc: 'Share your project before the deadline.' },
  { num: '06', title: 'Complete a survey', desc: 'Tell us about your experience and help us grow the community.' }
];

export const pathways: ParticipantPathway[] = [
  { num: '01', accent: '#2E96F5', title: 'Participate', tag: 'Teams of 1–6', desc: 'Spend the weekend building a real project against a NASA challenge, in person in Houston or virtually. Every skill level is welcome, and you can come with a team or form one on site.', goal: 'Free to attend, no experience required.', href: 'https://www.spaceappschallenge.org/2026/local-events/houston/', cta: 'Register on the official site' },
  { num: '02', accent: '#EAFE07', title: 'Mentor', tag: 'Goal: 15+ mentors', desc: 'Mentors float between teams and unblock them: coding help, finding and using NASA data, tooling, design feedback, project submission mechanics, pitch practice, and simply keeping teams moving when they stall.', goal: "We're aiming for 15+ mentors across NASA, aerospace, software and data science.", href: 'mailto:zain@nasaspaceappschallenge.org?subject=Mentoring%20at%20Space%20Apps%20Houston%202026', cta: 'Volunteer as a mentor' },
  { num: '03', accent: '#E43700', title: 'Judge', tag: 'Goal: 5–7 judges', desc: 'Judges review Houston submissions at the end of the weekend and select the projects that go forward for global judging.', goal: 'Houston needs at least 3 judges and is targeting 5–7, drawn from NASA subject matter experts, academia and industry.', href: 'mailto:zain@nasaspaceappschallenge.org?subject=Judging%20at%20Space%20Apps%20Houston%202026', cta: 'Offer to judge' },
  { num: '04', accent: '#2E96F5', title: 'Volunteer', tag: 'Event crew', desc: 'Help the weekend actually run: check-in and registration, room and logistics support, food and supply runs, comms, and floor support for participants.', goal: 'Shifts are flexible — a few hours is genuinely useful.', href: 'mailto:zain@nasaspaceappschallenge.org?subject=Volunteering%20at%20Space%20Apps%20Houston%202026', cta: 'Sign up to volunteer' },
  { num: '05', accent: '#EAFE07', title: 'Partner / Sponsor', tag: 'Ten ways to help', desc: 'Support can be venue, food and beverage, prizes, swag, tools and software credits, speakers, mentors, judges, photography and event coverage, or direct financial support.', goal: 'Space Apps is always free for participants — supporters make that possible.', href: '#/partners', cta: 'See partnership options' }
];

export const rawChallengeTags = [
  'A World Away', 'Space Biology Engine', 'Embiggen Your Eyes', 'Radar Looking Glass', 'Terra Data',
  'BloomWatch', 'Air Quality', 'Healthy Cities', 'Farm Navigators', 'ISS Anniversary', 'LEO Business',
  'Habitat Creator', 'SpaceTrash Hack', 'Meteor Madness', 'Sharks from Space', 'Deep Dive',
  'Stellar Stories', 'Animation Celebration'
];
export const challengeTags = [...rawChallengeTags, ...rawChallengeTags];

export const siteSurvey = [
  { k: 'Capacity for 80+ hackers', v: 'Required', dot: '#2E96F5' },
  { k: 'Reliable power & wifi', v: 'Required', dot: '#2E96F5' },
  { k: 'Accessible & transit-reachable', v: 'Required', dot: '#EAFE07' },
  { k: 'Address, parking, accessibility', v: 'Pending', dot: '#E43700' }
];

export const stats = [
  { n: 93520, label: 'Registered participants', color: '#2E96F5' },
  { n: 163, label: 'Countries & territories', color: '#EAFE07' },
  { n: 485, label: 'Local events', color: '#E43700' }
];

export const faqPreview = [
  { q: 'Do I need to be a programmer?', a: 'No. Space Apps is for coders, scientists, designers, storytellers, business people, makers and builders — no matter their background, age, or skills.' },
  { q: 'How much does it cost?', a: 'Nothing. Local Events must be free to attend and participate in.' },
  { q: 'Do I need a team before I arrive?', a: 'No. Teams are 1–6 people and can be formed on site. One person can participate alone as a team of one.' },
  { q: 'Where do I register?', a: 'On the official NASA Space Apps website via the Houston Local Event page. Registering there is what makes your participation count.' }
];
