export interface NavItem {
  label: string;
  href: string;
  route: string;
  current?: string;
  color?: string;
  bg?: string;
}

export interface FooterCol {
  title: string;
  links: { label: string; href: string }[];
}

export interface TeamNode {
  name: string;
  role: string;
  x: number;
  y: number;
  side: 'l' | 'r' | 'b';
  expertise: string;
  loves: string;
  accent?: string;
}

export interface AwardArt {
  name: string;
  slug: string;
  cut: string;
  full: string;
}

export interface AgencyPartner {
  name: string;
  abbr: string;
  country: string;
  logo?: string;
  mono?: string;
  desc: string;
  url: string;
}

export interface ArchiveChallenge {
  title: string;
  category: string;
  difficulty: string;
  dot: string;
  description: string;
  datasets: string[];
}

export interface GlobalAward {
  num: string;
  name: string;
  desc: string;
}

export interface KeyDate {
  day: string;
  date: string;
  time: string;
  accent: string;
  title: string;
  desc: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQGroup {
  title: string;
  items: FAQItem[];
}

export interface ResourceGroup {
  title: string;
  items: { label: string; href: string; desc: string }[];
}

export interface ParticipantPathway {
  num: string;
  accent: string;
  title: string;
  tag: string;
  desc: string;
  goal: string;
  href: string;
  cta: string;
}
