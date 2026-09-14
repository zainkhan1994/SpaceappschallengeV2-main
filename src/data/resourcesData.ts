import { ResourceGroup } from '../types';

export const resourceGroups: ResourceGroup[] = [
  {
    title: 'Official participant guides',
    items: [
      { label: 'Team Formation Guide', href: 'https://www.spaceappschallenge.org/resources/team-formation-guide/', desc: 'How to find teammates, what roles a team needs, and how to register your team.' },
      { label: 'Space Apps Connect Guide', href: 'https://www.spaceappschallenge.org/resources/space-app-connect-guide/', desc: 'Where to ask Navigators and NASA subject matter experts questions during the hackathon.' },
      { label: 'Project Submission Guide', href: 'https://www.spaceappschallenge.org/resources/project-submission-guide/', desc: 'What a submission needs, and how to save and edit it before the deadline.' },
      { label: 'Judging & Awards Guide', href: 'https://www.spaceappschallenge.org/resources/judging-awards-guide/', desc: 'How projects are evaluated locally and globally, and what the award categories mean.' }
    ]
  },
  {
    title: 'NASA open data',
    items: [
      { label: 'NASA Open APIs', href: 'https://api.nasa.gov/', desc: 'A single catalogue of NASA APIs with a free developer key.' },
      { label: 'NASA Open Data', href: 'https://www.nasa.gov/open/data.html', desc: "NASA's open data portal — the datasets behind most challenges." },
      { label: 'NASA STEM Resources', href: 'https://www.nasa.gov/stem/nextgenstem/index.html', desc: 'Classroom-ready material, useful for educators bringing students.' },
      { label: 'Global Space Apps site', href: 'https://www.spaceappschallenge.org/', desc: 'The official program site: challenges, registration, project archive.' }
    ]
  }
];

export const bring = [
  'A laptop and charger',
  'Headphones',
  'A water bottle',
  'Any hardware your idea needs',
  'Curiosity — genuinely enough'
];
