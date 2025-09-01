import React, { useState } from 'react';
import { ExternalLink, AlertCircle } from 'lucide-react';

const Registration: React.FC = () => {
  const [registrationStep, setRegistrationStep] = useState(0);

  const steps = [
    {
      title: "Create NASA Space Apps Account",
      description: "Visit the official NASA Space Apps website and create your account",
      action: "Go to spaceappschallenge.org",
      completed: false
    },
    {
      title: "Find Houston Event",
      description: "Search for and select the Houston local event from the events list",
      action: "Select Houston Event",
      completed: false
    },
    {
      title: "Complete Registration",
      description: "Fill out the registration form with your details and preferences",
      action: "Register for Houston",
      completed: false
    },
    {
      title: "Join Our Community",
      description: "Connect with other Houston participants before the event",
      action: "Join Discord/Social",
      completed: false
    }
  ];

  return (
    <section id="registration" className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-overpass font-bold text-4xl lg:text-5xl text-white mb-6">
            Registration
          </h2>
          <p className="font-fira-sans text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to join us? Follow these simple steps to secure your spot at Space Apps Houston 2025
          </p>
        </div>

        {/* Registration Steps */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-slate-900/50 rounded-xl p-8 border border-blue-500/20">
            <h3 className="font-overpass font-bold text-2xl text-white mb-8 text-center">
              How to Register
            </h3>
            
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 p-4 rounded-lg border transition-all duration-300 ${
                    registrationStep >= index
                      ? 'bg-blue-500/10 border-blue-500/30'
                      : 'bg-slate-800/30 border-slate-600/30'
                  }`}
                >
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      registrationStep >= index
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-600 text-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-overpass font-bold text-lg text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="font-fira-sans text-gray-300 mb-3">
                      {step.description}
                    </p>
                    <button
                      onClick={() => setRegistrationStep(Math.max(registrationStep, index + 1))}
                      className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                    >
                      <span>{step.action}</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href="https://www.spaceappschallenge.org/2025/local-events/houston"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-fira-sans font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
              >
                <span>Register on NASA Space Apps</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-8 border border-yellow-500/30">
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-overpass font-bold text-xl text-white mb-4">
                Important Registration Notes
              </h3>
              <div className="grid md:grid-cols-2 gap-6 font-fira-sans text-gray-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">Before You Register:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• All participants must register through the official NASA Space Apps website</li>
                    <li>• Registration is free for all participants</li>
                    <li>• Early registration recommended due to limited capacity</li>
                    <li>• Waitlist available if event reaches capacity</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">What You'll Need:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Valid email address for account creation</li>
                    <li>• Basic profile information and emergency contact</li>
                    <li>• Laptop and any preferred development tools</li>
                    <li>• Enthusiasm for space exploration and innovation!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;