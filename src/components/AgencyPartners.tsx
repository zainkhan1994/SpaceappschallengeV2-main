import React from 'react';
import { motion } from 'framer-motion';

interface Partner {
  name: string;
  description: string;
  logo: string;
  url: string;
  country: string;
}

const defaultPartners: Partner[] = [
  {
    name: 'NASA',
    description: 'The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, aeronautics research, and space exploration. NASA leads the Space Apps Challenge globally.',
    logo: '/nasa-logo.png',
    url: 'https://www.nasa.gov/',
    country: 'United States',
  },
  {
    name: 'Bahrain Space Agency',
    description: 'The Bahrain Space Agency (BSA) aims to position the Kingdom of Bahrain as a global player in space science to support sustainable development. BSA focuses on space technologies for national growth, promoting space research and applications, and building local capacity.',
    logo: '/bahrain-space-agency-logo.png',
    url: 'https://www.nssa.gov.bh/',
    country: 'Bahrain',
  },
  {
    name: 'Brazilian Space Agency',
    description: 'The Brazilian Space Agency (AEB) promotes the development of space activities to drive scientific advancement, technological innovation, and sustainable development. As a proud supporter of the NASA Space Apps Challenge, AEB values global collaboration and open innovation.',
    logo: '/aeb-logo.png',
    url: 'https://www.gov.br/aeb/',
    country: 'Brazil',
  },
  {
    name: 'Canadian Space Agency',
    description: 'The Canadian Space Agency (CSA) promotes the peaceful use and development of space through exploration, innovation, observation, and inspiration. Proudly supporting the NASA Space Apps Challenge since 2016, the CSA believes in the transformative power of open space data.',
    logo: '/canadian-space-agency-logo.png',
    url: 'https://www.asc-csa.gc.ca/',
    country: 'Canada',
  },
  {
    name: 'ESA',
    description: 'The European Space Agency (ESA) is Europe\'s gateway to space. Its mission is to shape the development of Europe\'s space capability and ensure that investment in space continues to deliver benefits to the citizens of Europe and the world.',
    logo: '/esa-logo.png',
    url: 'https://www.esa.int/',
    country: 'Europe',
  },
  {
    name: 'ISRO',
    description: 'The Indian Space Research Organisation (ISRO) is the space agency of India. The organisation is involved in science, engineering and technology to harvest the benefits of outer space for India and the mankind.',
    logo: '/isro-logo.png',
    url: 'https://www.isro.gov.in/',
    country: 'India',
  },
  {
    name: 'ASI Italy',
    description: 'The Italian Space Agency (ASI) is dedicated to promoting, coordinating and advancing the national activities in the space sector, in close collaboration with the European Space Agency and other international partners.',
    logo: '/asi-italy-logo.png',
    url: 'https://www.asi.it/',
    country: 'Italy',
  },
  {
    name: 'JAXA',
    description: 'The Japan Aerospace Exploration Agency (JAXA) promotes Earth observation, data analysis, and application research to contribute to solving global environmental issues and sustainable development.',
    logo: '/jaxa-logo.png',
    url: 'https://global.jaxa.jp/',
    country: 'Japan',
  },
  {
    name: 'MBRSC',
    description: 'The Mohammed Bin Rashid Space Centre (MBRSC) is a leading hub for scientific innovation and space exploration, driving the UAE\'s ambitious space program including the Emirates Mars Mission.',
    logo: '/mbrsc-logo.png',
    url: 'https://www.mbrsc.ae/',
    country: 'UAE',
  },
  {
    name: 'AEP Argentina',
    description: 'The National Space Activities Commission of Argentina (CONAE) is the responsible body for implementing the national space program, developing space technology and applications for peaceful purposes.',
    logo: '/aep-logo.png',
    url: 'https://www.argentina.gob.ar/conae',
    country: 'Argentina',
  },
  {
    name: 'Paraguay Space Agency',
    description: 'The Paraguayan Space Agency (AEP) is an autonomous entity under the administrative and functional authority of the Presidency of the Republic, responsible for coordinating Paraguay\'s space activities.',
    logo: '/paraguay-space-agency-logo.png',
    url: 'https://www.aep.gov.py/',
    country: 'Paraguay',
  },
  {
    name: 'SANSA',
    description: 'The South African National Space Agency (SANSA) promotes the peaceful use of space and fosters international cooperation in space-related activities, supporting the development of space science and technology.',
    logo: '/sansa-logo.png',
    url: 'https://www.sansa.org.za/',
    country: 'South Africa',
  },
  {
    name: 'Spanish Space Agency',
    description: 'The Spanish Space Agency (AEE) believes that space has the power to improve our lives, protect our planet, and inspire future generations through innovation and international cooperation.',
    logo: '/spanish-space-agency-logo.jpg',
    url: 'https://www.ciencia.gob.es/',
    country: 'Spain',
  },
  {
    name: 'Turkish Space Agency',
    description: 'The Turkish Space Agency (TUA) is responsible for coordinating Turkey\'s space activities and developing the country\'s space capabilities to support national development and international cooperation.',
    logo: '/turkish-space-agency-logo.png',
    url: 'https://www.tua.gov.tr/',
    country: 'Turkey',
  },
  {
    name: 'UK Space Agency',
    description: 'The UK Space Agency is an executive agency of the Government of the United Kingdom, responsible for the United Kingdom\'s civil space programme and supporting the growth of the UK space sector.',
    logo: '/uksa-logo.png',
    url: 'https://www.gov.uk/government/organisations/uk-space-agency',
    country: 'United Kingdom',
  },
];

const AgencyPartners: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated Stars Background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
        {/* Larger stars */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`large-${i}`}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400">
                Agency Partners
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Collaborating with leading space agencies worldwide to advance space exploration and innovation.
            </p>
          </motion.div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {defaultPartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-500/20 hover:border-blue-400/40 hover:shadow-xl transition-all duration-300 group"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Country Badge */}
              <div className="inline-block bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium mb-4 border border-blue-500/30">
                {partner.country}
              </div>

              {/* Logo */}
              <div className="mb-6">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="h-16 w-auto mx-auto object-contain filter brightness-110"
                />
              </div>

              {/* Partner Name */}
              <h3 className="text-xl font-bold text-white mb-4 text-center leading-tight group-hover:text-blue-300 transition-colors">
                {partner.name}
              </h3>

              {/* Partner Description */}
              <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                {partner.description}
              </p>

              {/* Learn More Button */}
              <motion.a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Visit Website
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-8 border border-yellow-500/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              🚀 Become a Partner
            </h3>
            <p className="text-gray-300 mb-6">
              Join our network of space agencies and organizations working together to solve global challenges through innovation and collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🤝 Contact Us
              </motion.a>
              
              <motion.button
                onClick={() => {
                  // This will be handled by the parent component
                  const event = new CustomEvent('navigateToGlobe');
                  window.dispatchEvent(event);
                }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🌍 Explore Interactive Globe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AgencyPartners;