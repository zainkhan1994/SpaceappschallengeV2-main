import React, { useState } from 'react';

interface AccordionSection {
  title: string;
  content: React.ReactNode;
}

const sections: AccordionSection[] = [
  {
    title: 'About the Challenge',
    content: (
      <>
        <p className="text-gray-300 mb-2">
          Farmers face a deluge of water-related challenges due to unpredictable weather, pests, and diseases. These factors impact crop health, profits, and food security. Many regions experience droughts or floods, sometimes both in the same season.
        </p>
        <p className="text-gray-300">
          The challenge asks teams to design a tool that lets farmers explore, analyze, and use NASA datasets to address these water issues and improve their practices.
        </p>
      </>
    ),
  },
  {
    title: 'Project Summary',
    content: (
      <>
        <p className="text-gray-300 mb-2">
          FarmVis bridges the gap between expert and new farmers by simplifying terrain and environmental data. Interactive GIS maps show farm locations, soil moisture, drought conditions, and flood risk, with focused insights for each area.
        </p>
        <p className="text-gray-300 mb-2 font-semibold">Key features:</p>
        <ul className="text-gray-300 list-disc pl-5">
          <li>Custom farm profiles for size, location, and crops</li>
          <li>Spatial clustering with DBSCAN to group events and remove duplicates</li>
          <li>Outlier detection with LOF to filter bad points</li>
          <li>Polygon simplification with Douglas-Peucker for clean map shapes</li>
          <li>AI companion for plain-language answers and guidance</li>
          <li>Hourly updates for drought, heavy rain, and official weather alerts</li>
          <li>Graphs and heatmaps for water levels, precipitation, and risk</li>
        </ul>
      </>
    ),
  },
  {
    title: 'About the Team',
    content: (
      <>
        <p className="text-gray-300 mb-3">
          <span className="font-bold">May Lynn Espinola</span>, Junior, Tompkins High School<br />
          Focus on using technology for real problems. Winner in NASA Apps Challenge and MIT App Inventor. USACO silver. Computer vision research at UTD Intelligent Robotics and Vision Lab. Building an AI app that personalizes math learning.
        </p>
        <p className="text-gray-300">
          <span className="font-bold">Sahus Gupta</span>, Senior, Tompkins High School<br />
          Built Gradus App for academic data access and PlatoAI used by 3,000+ students. Skills in Python, Java, JavaScript. Supports student research at Limelight. Building AI applications with Headstarter AI.
        </p>
      </>
    ),
  },
  {
    title: 'Project Details',
    content: (
      <>
        <ul className="text-gray-300 list-disc pl-5 mb-3">
          <li>GDAL and Geopandas for geospatial processing</li>
          <li>Leafmap and Streamlit-Folium for interactive maps</li>
          <li>OWSLib for live geospatial services</li>
          <li>Streamlit for the web app</li>
          <li>OpenAI for the AI companion</li>
          <li>Streamlit Echarts for charts and time series</li>
          <li>Geopy for geocoding</li>
          <li>Scikit-learn for DBSCAN and LOF</li>
          <li>Dotenv for environment variables</li>
        </ul>
        <p className="text-gray-300 mb-2 font-semibold">Links:</p>
        <ul className="text-gray-300 list-disc pl-5 text-sm">
          <li><a href="https://docs.google.com/presentation/d/1li-WhVqb-3GmzET4satab2NlbWf9P9UeNMMF79hCCKw/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Slides demo</a></li>
          <li><a href="https://github.com/farmvis/.github" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">FarmVis org GitHub</a></li>
          <li><a href="https://goldpig888.github.io" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">May GitHub site</a></li>
          <li><a href="https://github.com/sahusgupta" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Sahus GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/sahusgupta/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Sahus LinkedIn</a></li>
        </ul>
      </>
    ),
  },
];

const FarmVisAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3 mt-6">
      {sections.map((section, idx) => (
        <div key={section.title} className="border border-blue-500/30 rounded-lg bg-slate-800/60">
          <button
            className="group transition-all duration-200 hover:text-white hover:translate-x-0.5 w-full text-left px-5 py-3 focus:outline-none flex justify-between items-center"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            aria-expanded={openIndex === idx}
          >
            <span className="text-yellow-400 font-bold text-lg">{section.title}</span>
            <span className="ml-2 text-blue-300">{openIndex === idx ? '−' : '+'}</span>
          </button>
          {openIndex === idx && (
            <div className="transition-[max-height,opacity] duration-300 ease-out opacity-100 px-5 pb-4 animate-fade-in">
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FarmVisAccordion;
