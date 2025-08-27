import React from 'react';
import { Mail, MessageSquare, Users, Globe, Clock, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Local Lead",
      description: "Primary contact for all inquiries",
      contact: "Zain Khan",
      email: "zain@nasaspaceappschallenge.org"
    }
  ];

  const quickLinks = [
    { title: "Registration Help", type: "video", url: "https://www.youtube.com/watch?v=_AL3QrPBugc" },
    { title: "Sponsorship Inquiry", type: "mailto", email: "Houston@nasaspaceappschallenge.org", subject: "Sponsorship Opportunity" },
    { title: "Volunteer Application", type: "mailto", email: "Houston@nasaspaceappschallenge.org", subject: "Volunteer Application" },
    { title: "Media & Press", type: "comingsoon" },
    { title: "Technical Questions", type: "mailto", email: "Houston@nasaspaceappschallenge.org", subject: "Technical Question" },
    { title: "General Information", type: "mailto", email: "Houston@nasaspaceappschallenge.org", subject: "General Inquiry" }
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
                        <div className="text-blue-400 font-medium text-sm">
                          <a href={`mailto:${method.email}`} className="underline">{method.email}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Admin Team */}
            <div className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/20 mb-8">
              <h4 className="font-overpass font-bold text-lg text-white mb-4">Admin Team</h4>
              <div className="space-y-3 font-fira-sans text-gray-300 text-sm">
                <div><strong>Inquiries or Questions:</strong> <a href="mailto:Houston@nasaspaceappschallenge.org" className="text-blue-400 underline">Houston@nasaspaceappschallenge.org</a></div>
                <div><strong>Social Media:</strong></div>
                <div className="ml-4">
                  <div>Instagram: <a href="https://www.instagram.com/nasaspaceapps_houston/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">@nasaspaceapps_houston</a></div>
                  <div>Facebook: <a href="https://www.facebook.com/profile.php?id=100094729717802" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Space Apps Houston</a></div>
                  <div>TikTok: <a href="https://www.tiktok.com/@nasa.space.apps.houston" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">@nasa.space.apps.houston</a></div>
                  <div>Discord: <a href="https://discord.com/channels/1282054890600009841/customize-community" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Join Discord</a></div>
                  <div>Youtube: <a href="https://youtube.com/c/nasaspaceappschallenge?reload=9" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">NASA Space Apps Challenge</a></div>
                </div>
              </div>
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

          {/* Quick Inquiries */}
          <div className="lg:col-span-2">
            <h3 className="font-overpass font-bold text-2xl text-white mb-8">
              Quick Inquiries
            </h3>
            <div className="mb-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {quickLinks.map((link, index) => {
                  if (link.type === "video") {
                    return (
                      <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 hover:bg-slate-700/50 border border-blue-500/20 hover:border-blue-400/40 rounded-lg p-3 text-left transition-all duration-200 block">
                        <span className="font-fira-sans text-white text-sm">{link.title}</span>
                      </a>
                    );
                  } else if (link.type === "mailto") {
                    const subject = link.subject ?? "";
                    return (
                      <a key={index} href={`mailto:${link.email}?subject=${encodeURIComponent(subject)}`} className="bg-slate-800/50 hover:bg-slate-700/50 border border-blue-500/20 hover:border-blue-400/40 rounded-lg p-3 text-left transition-all duration-200 block">
                        <span className="font-fira-sans text-white text-sm">{link.title}</span>
                      </a>
                    );
                  } else if (link.type === "comingsoon") {
                    return (
                      <div key={index} className="bg-slate-800/50 border border-yellow-400 rounded-lg p-3 text-left transition-all duration-200 block">
                        <span className="font-fira-sans text-yellow-400 text-sm font-bold">{link.title}: Coming Soon</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            {/* Terms and Conditions Section */}
            <div className="mt-8 text-center">
              <a href="https://www.spaceappschallenge.org/legal/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline font-fira-sans text-lg">Terms and Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;