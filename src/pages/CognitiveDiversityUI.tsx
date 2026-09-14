import React from 'react';
import { Lightbulb, Users, Brain, LayoutDashboard, ClipboardList, CheckCircle, UserCheck, Compass, Palette, BarChart3, FileText, Settings, FlaskConical, Rocket } from 'lucide-react';

export default function CognitiveDiversityUI() {
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center">NASA Space Apps 2025 – Team Diversity Guide</h1>
      <p className="text-center text-gray-400 text-lg">Building better teams through cognitive diversity and intentional collaboration</p>

      <div className="bg-slate-800/50 rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2"><Lightbulb /> Why This Year Is Different</h2>
        <p className="mt-3 text-gray-300">
          We’re engaging with participants just two weeks out on purpose. Why? Because pre-building goes against the collaborative, rapid-innovation spirit of Space Apps. This isn’t about early submissions — it’s about showing up, working with new people, and walking away with something transformative.
        </p>
      </div>

      <div className="bg-slate-800/50 rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2"><Brain /> Take the Cognitive Strengths Assessment</h2>
        <p className="mt-3 text-gray-300">
          This short, mandatory assessment helps you identify how you think, communicate, and collaborate. It will help you form more balanced and high-performing teams.
        </p>
        <ul className="list-disc list-inside mt-3 text-gray-300 space-y-1">
          <li>Understand your strengths and working style</li>
          <li>Find teammates with complementary skills</li>
          <li>Recruit others intentionally — developer, designer, visionary, etc.</li>
          <li>Walk away with insight, not just a submission</li>
        </ul>
        <div className="mt-4">
          <button className="px-4 py-2 border border-blue-500 text-blue-200 rounded hover:bg-blue-700">Take the Assessment</button>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2"><Users /> Who Comes to a Hackathon?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {[ 
            { icon: LayoutDashboard, title: "Developers & Engineers", desc: "Code, build, simulate, and solve technical challenges." },
            { icon: Palette, title: "Designers & Creatives", desc: "Design interfaces, logos, visuals, and ensure usability." },
            { icon: Compass, title: "Visionaries & Idea People", desc: "Think big, guide team direction, and spark innovation." },
            { icon: BarChart3, title: "Data Scientists", desc: "Analyze open data to inform insights and solutions." },
            { icon: FileText, title: "Writers & Storytellers", desc: "Craft the narrative, pitches, and keep ideas clear." },
            { icon: Settings, title: "Organizers & PMs", desc: "Keep the team structured and on task." },
            { icon: FlaskConical, title: "Scientists & Educators", desc: "Ground ideas in real science and research." },
            { icon: Rocket, title: "Entrepreneurs", desc: "Think about impact, scale, and real-world use." },
            { icon: UserCheck, title: "Curious Learners", desc: "Dive in, ask questions, bridge gaps, and learn by doing." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4 items-start bg-slate-900/20 p-3 rounded">
              <Icon className="w-6 h-6 mt-1 text-blue-300" />
              <div>
                <h3 className="font-semibold text-lg text-white">{title}</h3>
                <p className="text-sm text-gray-300">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2"><ClipboardList /> Color Badge System</h2>
        <p className="mt-3 text-gray-300">Once you complete the assessment, you'll receive a color-coded badge that represents your thinking style:</p>
        <ul className="list-disc list-inside mt-3 text-gray-300 space-y-1">
          <li><span className="inline-block px-2 py-1 rounded bg-blue-600 text-white mr-2">Blue</span>: Logical / Analytical</li>
          <li><span className="inline-block px-2 py-1 rounded bg-green-600 text-white mr-2">Green</span>: Practical / Structured</li>
          <li><span className="inline-block px-2 py-1 rounded bg-red-600 text-white mr-2">Red</span>: Empathetic / Supportive</li>
          <li><span className="inline-block px-2 py-1 rounded bg-purple-600 text-white mr-2">Purple</span>: Creative / Visionary</li>
        </ul>
        <p className="mt-3 text-gray-300">Use this system during team formation to build balance and avoid groupthink.</p>
      </div>

      <div className="bg-slate-800/50 rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2"><CheckCircle /> Your Next Steps</h2>
        <ul className="list-disc list-inside mt-3 text-gray-300 space-y-1">
          <li>Complete the self-assessment before October 4th</li>
          <li>Attend the hackathon kickoff with your badge</li>
          <li>Form teams onsite based on balance and alignment</li>
          <li>Stay curious and open to new roles and teammates</li>
        </ul>
        <p className="mt-3 text-gray-400 text-sm">The goal isn’t perfection. It’s exploration, growth, and contribution.</p>
      </div>
    </div>
  );
}
