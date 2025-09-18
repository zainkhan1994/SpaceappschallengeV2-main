import React from 'react';
import { UserPlus, Users, BookOpen, Compass, Video, Puzzle, Trophy, Send, Globe2, Calendar, MessageCircle } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus className="text-blue-400 mr-3" size={28} />, 
    title: 'Create an Account',
    description: 'Sign up on the official Space Apps Challenge website to get started.',
    link: 'https://www.spaceappschallenge.org/create-account/'
  },
  {
    icon: <BookOpen className="text-blue-400 mr-3" size={28} />, 
    title: 'Register for the Hackathon',
    description: 'Registration opens July 17, 2025. Secure your spot early.'
  },
  {
    icon: <Compass className="text-blue-400 mr-3" size={28} />, 
    title: 'Choose a Local Event',
    description: 'Pick a nearby in-person event or join the Universal (Virtual) event.'
  },
  {
    icon: <Users className="text-blue-400 mr-3" size={28} />, 
    title: 'Form or Join a Team',
    description: 'Team formation opens August 21, 2025. Teams can have up to 6 members.'
  },
  {
    icon: <Calendar className="text-blue-400 mr-3" size={28} />, 
    title: 'Join the Hackathon',
    description: 'October 4–5, 2025 at your selected Local Event.'
  },
  {
    icon: <Send className="text-blue-400 mr-3" size={28} />, 
    title: 'Submit Your Project',
    description: 'Submit before your Local Event’s deadline.'
  }
];

const guides = [
  {
    icon: <Users className="text-blue-400 mr-3" size={24} />,
    title: 'Team Formation Guide',
    date: 'August 21',
    link: 'https://www.spaceappschallenge.org/resources/team-formation-guide/#navigating-the-hackathon-team-formation'
  },
  {
    icon: <MessageCircle className="text-blue-400 mr-3" size={24} />,
    title: 'Space Apps Connect Guide',
    date: 'September 23',
    link: 'https://www.spaceappschallenge.org/resources/space-app-connect-guide/'
  },
  {
    icon: <Send className="text-blue-400 mr-3" size={24} />,
    title: 'Project Submission Guide',
    date: 'October 3',
    link: 'https://www.spaceappschallenge.org/resources/project-submission-guide/'
  },
  {
    icon: <Trophy className="text-blue-400 mr-3" size={24} />,
    title: 'Judging & Awards Guide',
    date: 'October 3',
    link: 'https://www.spaceappschallenge.org/resources/judging-awards-guide/'
  }
];

const NavigatingSpaceApps: React.FC = () => {
  return (
    <div className="bg-slate-900 py-16 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">How to Participate in the NASA Space Apps Challenge</h1>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start bg-slate-800/50 rounded-xl p-6 border border-slate-700 shadow-lg mb-2">
              {step.icon}
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                <p className="text-gray-300 text-sm mb-1">{step.description}</p>
                {step.link && <a href={step.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-xs">Create Account</a>}
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-white mb-4 mt-12">Participant Guides Timeline</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {guides.map((guide, idx) => (
            <a key={idx} href={guide.link} target="_blank" rel="noopener noreferrer" className="flex items-center bg-slate-800/50 rounded-xl p-5 border border-slate-700 shadow-lg hover:bg-slate-700 transition-colors">
              {guide.icon}
              <div>
                <h4 className="text-white font-semibold text-base mb-1">{guide.title}</h4>
                <p className="text-gray-400 text-xs">{guide.date}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Virtual Bootcamp</h2>
          <div className="flex items-center mb-2">
            <Video className="text-blue-400 mr-3" size={24} />
            <span className="text-gray-300">Video series with tips from NASA Navigators, Global Winners, and more.</span>
          </div>
          <a href="https://www.spaceappschallenge.org/resources/virtual-bootcamp/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-sm">Watch Bootcamp Videos</a>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Challenges</h2>
          <div className="flex items-center mb-2">
            <Puzzle className="text-blue-400 mr-3" size={24} />
            <span className="text-gray-300">Choose one challenge to address. Challenge summaries released August 21, full statements September 16.</span>
          </div>
          <a href="https://www.spaceappschallenge.org/2025/challenges/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-sm">View 2025 Challenges</a>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Teams</h2>
          <div className="flex items-center mb-2">
            <Users className="text-blue-400 mr-3" size={24} />
            <span className="text-gray-300">Teams of up to 6 members. Team formation opens August 21, 2025.</span>
          </div>
          <a href="https://www.spaceappschallenge.org/resources/team-formation-guide/#navigating-the-hackathon-team-formation" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-sm">Team Formation Guide</a>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Project Submission</h2>
          <div className="flex items-center mb-2">
            <Send className="text-blue-400 mr-3" size={24} />
            <span className="text-gray-300">Submit your project through your team’s project page before the deadline.</span>
          </div>
          <a href="https://www.spaceappschallenge.org/resources/project-submission-guide/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-sm">Project Submission Guide</a>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Space Apps Connect</h2>
          <div className="flex items-center mb-2">
            <Globe2 className="text-blue-400 mr-3" size={24} />
            <span className="text-gray-300">A collaborative hub for participants, Local Leads, and more. Opens September 23, 2025.</span>
          </div>
          <a href="https://www.spaceappschallenge.org/resources/space-app-connect-guide/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-sm">Space Apps Connect Guide</a>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Recognition & Awards</h2>
          <div className="flex items-center mb-2">
            <Trophy className="text-blue-400 mr-3" size={24} />
            <span className="text-gray-300">All participants who submit a project receive a certificate. See the Judging & Awards Guide for details.</span>
          </div>
          <a href="https://www.spaceappschallenge.org/resources/judging-awards-guide/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-sm">Judging & Awards Guide</a>
        </div>

      </div>
    </div>
  );
};

export default NavigatingSpaceApps;
