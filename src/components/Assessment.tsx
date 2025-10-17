import React, { useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';

/**
 * ASSESSMENT CONFIGURATION
 * 
 * To modify questions or archetypes:
 * 1. Update the 'questions' array below to add/remove/edit questions
 * 2. Each question should have:
 *    - id: unique identifier
 *    - question: the question text
 *    - options: array of options with 'text' and 'archetype' that the answer points toward
 * 
 * 3. Update the 'archetypes' object to add/remove/edit archetype descriptions
 * 4. The scoring logic automatically counts which archetype has the most answers
 */

// Archetype definitions with descriptions
const archetypes = {
  Leader: {
    title: 'The Leader',
    emoji: '👑',
    description: 'You excel at organizing teams, making strategic decisions, and inspiring others. You\'re the person everyone looks to for direction and motivation.',
    traits: ['Strategic thinker', 'Team coordinator', 'Decision maker', 'Motivator']
  },
  Builder: {
    title: 'The Builder',
    emoji: '🔨',
    description: 'You love bringing ideas to life through hands-on creation. Whether it\'s hardware, prototypes, or tangible solutions, you make things real.',
    traits: ['Hands-on creator', 'Problem solver', 'Practical thinker', 'Prototype expert']
  },
  Designer: {
    title: 'The Designer',
    emoji: '🎨',
    description: 'You have an eye for aesthetics and user experience. You think about how things look, feel, and how users interact with solutions.',
    traits: ['Visual thinker', 'UX focused', 'Creative mind', 'Detail oriented']
  },
  Coder: {
    title: 'The Coder',
    emoji: '💻',
    description: 'You speak the language of computers and love solving problems through code. You turn ideas into software and make systems work.',
    traits: ['Technical expert', 'Algorithm wizard', 'Bug squasher', 'Logic master']
  },
  Researcher: {
    title: 'The Researcher',
    emoji: '🔬',
    description: 'You dive deep into topics, gathering data and insights. You love discovering new information and understanding the "why" behind everything.',
    traits: ['Data analyst', 'Information seeker', 'Critical thinker', 'Documentation pro']
  }
};

// Assessment questions - MODIFY THESE to change the assessment
const questions = [
  {
    id: 1,
    question: 'During a hackathon, which role naturally appeals to you most?',
    options: [
      { text: 'Coordinating the team and managing our timeline', archetype: 'Leader' },
      { text: 'Building physical prototypes or assembling hardware', archetype: 'Builder' },
      { text: 'Designing the user interface and experience', archetype: 'Designer' },
      { text: 'Writing code and implementing features', archetype: 'Coder' },
      { text: 'Researching the problem and analyzing data', archetype: 'Researcher' }
    ]
  },
  {
    id: 2,
    question: 'When facing a challenging problem, your first instinct is to:',
    options: [
      { text: 'Break it down and delegate tasks to the team', archetype: 'Leader' },
      { text: 'Sketch out a physical solution or prototype', archetype: 'Builder' },
      { text: 'Think about the user journey and design flow', archetype: 'Designer' },
      { text: 'Start coding and testing different approaches', archetype: 'Coder' },
      { text: 'Gather information and study similar problems', archetype: 'Researcher' }
    ]
  },
  {
    id: 3,
    question: 'What gets you most excited about a project?',
    options: [
      { text: 'Seeing the team come together and achieve goals', archetype: 'Leader' },
      { text: 'Creating something tangible you can hold', archetype: 'Builder' },
      { text: 'Crafting a beautiful and intuitive design', archetype: 'Designer' },
      { text: 'Solving complex technical challenges', archetype: 'Coder' },
      { text: 'Discovering insights from data and research', archetype: 'Researcher' }
    ]
  },
  {
    id: 4,
    question: 'In your ideal work environment, you would spend most time:',
    options: [
      { text: 'In meetings, planning and communicating with others', archetype: 'Leader' },
      { text: 'In a workshop with tools and materials', archetype: 'Builder' },
      { text: 'Working on mockups and visual designs', archetype: 'Designer' },
      { text: 'At your computer writing and debugging code', archetype: 'Coder' },
      { text: 'Reading papers and analyzing information', archetype: 'Researcher' }
    ]
  },
  {
    id: 5,
    question: 'Which achievement would make you proudest?',
    options: [
      { text: 'Leading a team to win the competition', archetype: 'Leader' },
      { text: 'Building a working prototype that impresses judges', archetype: 'Builder' },
      { text: 'Creating a design that users love', archetype: 'Designer' },
      { text: 'Implementing a clever technical solution', archetype: 'Coder' },
      { text: 'Discovering a key insight that changes the approach', archetype: 'Researcher' }
    ]
  }
];

interface AssessmentProps {
  onComplete?: (result: { archetype: string; email: string }) => void;
}

const Assessment: React.FC<AssessmentProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleAnswer = (questionId: number, archetype: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: archetype }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  // Calculate which archetype the user fits best based on their answers
  const calculateResult = () => {
    const scores: Record<string, number> = {};
    
    Object.values(answers).forEach(archetype => {
      scores[archetype] = (scores[archetype] || 0) + 1;
    });

    // Find the archetype with the highest score
    const topArchetype = Object.entries(scores).reduce((a, b) => 
      b[1] > a[1] ? b : a
    )[0];

    setResult(topArchetype);
  };

  const handleSubmit = async () => {
    if (!email) {
      setSubmitError('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          archetype: result,
          answers,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit assessment');
      }

      setSubmitSuccess(true);
      if (onComplete) {
        onComplete({ archetype: result!, email });
      }
    } catch (error) {
      setSubmitError('Failed to save your results. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQ = questions[currentQuestion];
  const isAnswered = answers[currentQ.id] !== undefined;
  const allAnswered = questions.every(q => answers[q.id] !== undefined);

  // Results view
  if (result) {
    const archetypeData = archetypes[result as keyof typeof archetypes];
    
    return (
      <div className="min-h-screen bg-slate-900 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
            <div className="text-center mb-8">
              <div className="text-7xl mb-4">{archetypeData.emoji}</div>
              <h2 className="text-4xl font-bold text-white mb-2">{archetypeData.title}</h2>
              <p className="text-xl text-gray-300">{archetypeData.description}</p>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Your Key Traits:</h3>
              <ul className="grid grid-cols-2 gap-3">
                {archetypeData.traits.map((trait, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                    <span className="text-gray-300">{trait}</span>
                  </li>
                ))}
              </ul>
            </div>

            {!submitSuccess ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address (optional - to receive your results)
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {submitError && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
                    {submitError}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  {isSubmitting ? 'Saving...' : 'Save My Results'}
                </button>

                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Return to Home
                </button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg">
                  ✓ Your results have been saved successfully!
                </div>
                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Return to Home
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Assessment view
  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            🚀 Hackathon Archetype Assessment
          </h1>
          <p className="text-xl text-gray-300">
            Discover your unique role in hackathon teams
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-400">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-slate-800 rounded-xl shadow-2xl p-8 mb-6 border border-slate-700">
          <h2 className="text-2xl font-semibold text-white mb-6">
            {currentQ.question}
          </h2>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              const isSelected = answers[currentQ.id] === option.archetype;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(currentQ.id, option.archetype)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center space-x-3 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-600 bg-slate-700/50 hover:border-slate-500 hover:bg-slate-700'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {isSelected ? (
                      <CheckCircle className="text-blue-500" size={24} />
                    ) : (
                      <Circle className="text-gray-500" size={24} />
                    )}
                  </div>
                  <span className="text-gray-200 flex-1">{option.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-slate-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors"
          >
            ← Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors font-semibold"
          >
            {currentQuestion === questions.length - 1 && allAnswered ? 'See Results →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
