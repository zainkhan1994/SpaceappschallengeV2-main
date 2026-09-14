import { FooterCol } from '../types';

export const navDesktopItems: { label: string; href: string; route: string }[] = [
  { label: 'About', href: '#/about', route: '/about' },
  { label: 'Challenges', href: '#/challenges', route: '/challenges' },
  { label: 'Schedule', href: '#/schedule', route: '/schedule' },
  { label: 'Venue', href: '#/venue', route: '/venue' },
  { label: 'Resources', href: '#/resources', route: '/resources' },
  { label: 'FAQ', href: '#/faq', route: '/faq' },
  { label: 'Partners', href: '#/partners', route: '/partners' }
];

export const navExtraItems: { label: string; href: string; route: string }[] = [
  { label: 'Home', href: '#/', route: '/' },
  { label: 'Past Events', href: '#/past-events', route: '/past-events' },
  { label: 'Contact', href: '#/contact', route: '/contact' }
];

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
