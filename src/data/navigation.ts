import { FooterCol } from '../types';

export interface NavLink {
  label: string;
  href: string;
}

export interface NavChild extends NavLink {
  children?: NavLink[];
}

export interface NavTop extends NavLink {
  children?: NavChild[];
}

export const primaryNav: NavTop[] = [
  { label: 'Home', href: '#/' },
  {
    label: 'About Houston',
    href: '#/about',
    children: [
      { label: 'About Space Apps Houston', href: '#/about' },
      { label: 'Meet the Team', href: '#/about' },
      { label: 'Venue', href: '#/venue' },
      { label: 'Past Events', href: '#/past-events' },
      { label: 'Contact', href: '#/contact' }
    ]
  },
  {
    label: 'Hackathon',
    href: '#/challenges',
    children: [
      { label: 'Challenges', href: '#/challenges' },
      { label: 'Schedule', href: '#/schedule' },
      {
        label: 'Resources',
        href: '#/resources',
        children: [
          { label: 'Participant Guides', href: '#/resources' },
          { label: 'NASA Data & Tools', href: '#/resources' }
        ]
      },
      { label: 'FAQ', href: '#/faq' }
    ]
  },
  {
    label: 'Get Involved',
    href: '#/get-involved',
    children: [
      { label: 'Get Involved with NASA', href: '#/get-involved' },
      { label: 'NASA Tech Talks', href: '#/get-involved' },
      { label: 'NASA Opportunities', href: '#/opportunities' },
      { label: 'Partners', href: '#/partners' }
    ]
  }
];

/** Every route these nav entries point to, used to highlight the active top-level item. */
export const navRoutesByTopLabel: Record<string, string[]> = {
  Home: ['/'],
  'About Houston': ['/about', '/venue', '/past-events', '/contact'],
  Hackathon: ['/challenges', '/schedule', '/resources', '/faq'],
  'Get Involved': ['/get-involved', '/opportunities', '/partners']
};

export const footerCols: FooterCol[] = [
  {
    title: 'Event',
    links: [
      { label: 'Home', href: '#/' },
      { label: 'About', href: '#/about' },
      { label: 'Challenges', href: '#/challenges' },
      { label: 'Schedule', href: '#/schedule' },
      { label: 'Venue', href: '#/venue' }
    ]
  },
  {
    title: 'Participants',
    links: [
      { label: 'Get involved with NASA', href: '#/get-involved' },
      { label: 'Resources & guides', href: '#/resources' },
      { label: 'FAQ', href: '#/faq' },
      { label: 'Past events', href: '#/past-events' },
      { label: 'Contact', href: '#/contact' },
      { label: 'Register', href: 'https://www.spaceappschallenge.org/2026/local-events/houston/' }
    ]
  },
  {
    title: 'NASA resources',
    links: [
      { label: 'Global Space Apps site', href: 'https://www.spaceappschallenge.org/' },
      { label: 'NASA Open APIs', href: 'https://api.nasa.gov/' },
      { label: 'NASA Open Data', href: 'https://www.nasa.gov/open/data.html' },
      { label: 'NASA STEM Resources', href: 'https://www.nasa.gov/stem/nextgenstem/index.html' }
    ]
  }
];
