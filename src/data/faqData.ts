import { FAQGroup } from '../types';

export const faqGroups: FAQGroup[] = [
  {
    title: 'Attending',
    items: [
      { q: 'Does the event cost anything?', a: 'No. NASA Space Apps Local Events must be free for participants.' },
      { q: 'Is the event open to the public?', a: 'Yes. Houston is an open, public Local Event.' },
      { q: 'Do I need to be a programmer?', a: 'No. Space Apps is for coders, scientists, designers, storytellers, business people, makers and builders — no matter their background, age, or skills.' },
      { q: 'Can participants under 18 attend?', a: 'Yes, but they must be registered on the website by a parent or legal guardian, and either accompanied at all times by that parent or guardian, or covered by written consent transferring chaperone responsibility to the Local Organizing Team.' },
      { q: 'What should I bring?', a: 'A laptop, chargers, headphones, a water bottle, and anything else you need to stay comfortable and productive.' },
      { q: 'Will there be food?', a: 'Meals are not guaranteed. The Houston agenda will state exactly what is provided and when there is time to get your own food.' },
      { q: 'Is it a full 24-hour lock-in?', a: 'No. The hackathon does not need to run continuously — Houston will publish formal start and stop times for each day.' }
    ]
  },
  {
    title: 'Registering & teams',
    items: [
      { q: 'Where do I register?', a: 'On the official NASA Space Apps website, through the Houston Local Event page. Participants must register there to be counted for attendance and global judging — even if you also fill in any supplementary Houston form.' },
      { q: 'Can I register late, or on the day?', a: 'Yes. You can register during the hackathon itself. There will be a check-in desk for walk-ups.' },
      { q: 'How many people can be on a team?', a: '1 to 6 people. No more than 6. One person can participate alone, but they still need to form a team of one.' },
      { q: 'Can my team include people from other cities?', a: 'Yes, teams can be local or global. Houston focuses recruitment on the city and roughly 40 miles around it; people with no nearby Local Event can join the virtual Universal Event.' }
    ]
  },
  {
    title: 'Challenges, projects & judging',
    items: [
      { q: 'When are the 2026 challenges released?', a: 'September 17, 2026 — the full Challenge Statements and their dataset resources are released together on that date.' },
      { q: 'Can I start building before the event?', a: 'No. Work may only begin at 9:00 am local time on the first day of the hackathon. Starting early can lead to disqualification.' },
      { q: 'Do I have to submit a project?', a: 'No, but submitting is the only way to be eligible for awards — and partial submissions are welcome. Teams should explain their approach and what they accomplished.' },
      { q: 'Can I use data that isn’t from NASA?', a: 'Yes, as long as you also incorporate the required NASA data included in the challenge resources to remain eligible for global judging.' },
      { q: 'Can my team use AI?', a: 'Yes — anything open source, or that you have the appropriate copyright permissions to use.' },
      { q: 'Can I edit my project after submitting?', a: 'Yes, team owners can edit project information up until the deadline at 11:59 pm local time on the second day. You must submit again to save changes.' },
      { q: 'How do local and global judging relate?', a: 'Local judges evaluate Houston projects first. The Local Lead then submits Global Nominees by November 22, 2026, and NASA determines Global Winners after three rounds of judging across 10 award categories.' }
    ]
  }
];
