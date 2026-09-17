/**
 * Space Apps challenge posters, shown in their own swipeable section after the join frames.
 * Each poster already carries its own title and copy, so the card renders the image alone.
 * Files: public/tech-talks/challenges/<slug>.webp (1122x1402, 4:5).
 */
export interface ChallengePoster {
  slug: string;
  title: string;
}

export const challengePosters: ChallengePoster[] = [
  { slug: 'next-gen-houston', title: 'Next Gen Space Solutions' },
  { slug: 'abandoned', title: 'Abandoned But Not Forgotten' },
  { slug: 'trend-detective', title: 'Be an Earth System Trend Detective' },
  { slug: 'health-monitoring', title: 'Create Health Monitoring Software for Astronauts' },
  { slug: 'martian-map', title: 'Interplanetary Survival Guide: Martian Map' },
  { slug: 'sars', title: 'Dancing with the SARs' },
  { slug: 'field-shift', title: 'Field Shift: Adapting Farms with NASA Data' },
  { slug: 'modis-viirs', title: 'Harmonization of MODIS and VIIRS Hot Spots' },
  { slug: 'earth-analogs', title: 'Identify Earth Locations That Analog the Permanent Moon Base Locations and Mars' },
  { slug: 'flame-freefall', title: 'Flame in Freefall' },
  { slug: 'clps', title: 'CLPS Lunar Mission Browser' },
  { slug: 'ai-lunar', title: 'Build AI-Powered Tools for Lunar Exploration' },
  { slug: 'autonomous-systems', title: 'Design Autonomous Systems for Lunar Operations' },
  { slug: 'autonomous-robots', title: 'Build Autonomous Robots for Lunar Exploration' },
  { slug: 'lunar-robotics', title: 'Develop Robotic Systems to Assist Lunar Operations' },
  { slug: 'lunar-comms', title: 'Improve Communication Systems for Lunar Missions' },
  { slug: 'sustainable-moon', title: 'Design Sustainable Living Solutions for the Moon' },
  { slug: 'junior-trainer', title: 'Build a Junior Astronaut Mission Trainer' }
];
