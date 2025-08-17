import React, { useState } from 'react';
import { Mail, MessageSquare, Users, Globe, Send, MapPin, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:houston@spaceapps.local?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Primary contact for all inquiries",
      contact: "houston@spaceapps.local",
      action: "Send Email"
    },
    {
      icon: MessageSquare,
      title: "Discord Community",
      description: "Join our Discord server for real-time updates",
      contact: "discord.gg/spaceappshouston",
      action: "Join Discord"
    },
    {
      icon: Users,
      title: "Social Media",
      description: "Follow us for updates and announcements",
      contact: "@SpaceAppsHouston",
      action: "Follow Us"
    },
    {
      icon: Globe,
      title: "Official Website",
      description: "Visit the main NASA Space Apps website",
      contact: "spaceappschallenge.org",
      action: "Visit Site"
    }
  ];

  const quickLinks = [
    { title: "Registration Help", subject: "Registration Assistance" },
    { title: "Sponsorship Inquiry", subject: "Sponsorship Opportunity" },
    { title: "Volunteer Application", subject: "Volunteer Interest" },
    { title: "Media & Press", subject: "Media Inquiry" },
    { title: "Technical Questions", subject: "Technical Question" },
    { title: "General Information", subject: "General Inquiry" }
  ];

  return (
    <section id="contact" className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-overpass font-bold text-4xl lg:text-5xl text-white mb-6">
            Contact Us
          </h2>
          <p className="font-fira-sans text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions about Space Apps Houston 2025? We're here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Methods */}
          <div className="lg:col-span-1">
            <h3 className="font-overpass font-bold text-2xl text-white mb-8">
              Get in Touch
            </h3>
            
            <div className="space-y-6 mb-8">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div key={index} className="bg-slate-900/50 rounded-xl p-4 border border-blue-500/20">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-fira-sans font-semibold text-white mb-1">
                          {method.title}
                        </h4>
                        <p className="font-fira-sans text-gray-300 text-sm mb-2">
                          {method.description}
                        </p>
                        <div className="text-blue-400 font-medium text-sm">
                          {method.contact}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Event Details */}
            <div className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/20">
              <h4 className="font-overpass font-bold text-lg text-white mb-4">
                Event Details
              </h4>
              <div className="space-y-3 font-fira-sans text-gray-300 text-sm">
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>October 4-5, 2025</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Houston, TX (Venue TBA)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Capacity: 200 participants</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>In-Person Event</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <h3 className="font-overpass font-bold text-2xl text-white mb-8">
              Send us a Message
            </h3>

            {/* Quick Links */}
            <div className="mb-8">
              <h4 className="font-fira-sans font-semibold text-white mb-4">Quick Inquiries</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {quickLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => setFormData({ ...formData, subject: link.subject })}
                    className="bg-slate-800/50 hover:bg-slate-700/50 border border-blue-500/20 hover:border-blue-400/40 rounded-lg p-3 text-left transition-all duration-200"
                  >
                    <span className="font-fira-sans text-white text-sm">{link.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/20">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block font-fira-sans font-medium text-white mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-fira-sans font-medium text-white mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block font-fira-sans font-medium text-white mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  placeholder="What's your inquiry about?"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block font-fira-sans font-medium text-white mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none"
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-fira-sans font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>

            <div className="mt-6 bg-blue-600/10 border border-blue-500/30 rounded-lg p-4">
              <p className="font-fira-sans text-blue-300 text-sm">
                <strong>Response Time:</strong> We typically respond to inquiries within 24-48 hours. 
                For urgent matters during the event, please reach out on our Discord server for faster assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;