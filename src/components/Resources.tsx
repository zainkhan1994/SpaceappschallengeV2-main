import React, { useState } from "react";
import { Video, MessageCircle, Users, Globe2, Send, Trophy, UserCheck } from 'lucide-react';

interface ResourceCard {
	id: string;
	title: string;
	icon: React.ReactNode;
	iconColor: string;
	shortDescription: string;
	fullDescription: string;
	link?: string;
	linkText?: string;
	specialContent?: React.ReactNode;
}

const Resources: React.FC = () => {
	const [expandedCard, setExpandedCard] = useState<string | null>(null);

	const toggleCard = (cardId: string) => {
		setExpandedCard(expandedCard === cardId ? null : cardId);
	};

	const resourceCards: ResourceCard[] = [
		{
			id: "how-to-register",
			title: "How to Register",
			icon: <Video className="h-8 w-8" />,
			iconColor: "text-purple-400",
			shortDescription: "Step-by-step registration guide",
			fullDescription: "Watch this quick video for a step-by-step guide to registering for the NASA Space Apps Challenge.",
			specialContent: (
				<div className="w-full aspect-video mt-4">
					<iframe
						width="100%"
						height="315"
						src="https://www.youtube.com/embed/_AL3QrPBugc"
						title="How to Register | NASA Space Apps Challenge"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
						className="rounded-lg w-full h-full"
					></iframe>
				</div>
			)
		},
		{
			id: "faq",
			title: "Participant FAQ",
			icon: <MessageCircle className="h-8 w-8" />,
			iconColor: "text-blue-400",
			shortDescription: "Most frequently asked questions",
			fullDescription: "Key details for the 2026 NASA Space Apps Challenge, including participation guidance and important dates.",
			link: "https://www.spaceappschallenge.org/resources/-faq/",
			linkText: "Official FAQ",
			specialContent: (
				<div className="space-y-4 text-sm text-gray-300">
					<div>
						<h4 className="text-white font-semibold mb-2">About the NASA Space Apps Challenge</h4>
						<div className="space-y-3">
							<p><span className="text-blue-300 font-medium">What are the dates for the NASA Space Apps Challenge?</span><br />The 2026 NASA Space Apps Challenge will take place November 14–15, 2026.</p>
							<p><span className="text-blue-300 font-medium">Who should participate in the NASA Space Apps Challenge?</span><br />The NASA Space Apps Challenge offers opportunities for students, technologists, and citizen scientists to better understand how to utilize NASA open data to respond to today's most pressing science and space exploration challenges. No matter your age, skill level, or professional background, when you participate in the NASA Space Apps Challenge, you join a global community that embraces collaboration to develop projects and tools that improve life on Earth and in space.</p>
							<p><span className="text-blue-300 font-medium">Does it cost anything to participate?</span><br />There is no cost to participate in the NASA Space Apps Challenge. If you are asked to pay money to participate in any aspect of a NASA Space Apps event, do not pay anything and please report to info@spaceappschallenge.org.</p>
							<p><span className="text-blue-300 font-medium">What is the minimum age for participants?</span><br />The NASA Space Apps Challenge is open to all ages! However, participants who are under the age of 18 must be registered for the event by a parent or legal guardian and must be accompanied by a parent or legal guardian at all times during the event. Recognizable names, voices, and likenesses of persons under the age of 18 should not be included in any video or project submissions. Please read the details in our Participant Terms &amp; Conditions.</p>
							<p><span className="text-blue-300 font-medium">Where does the NASA Space Apps Challenge take place?</span><br />The NASA Space Apps Challenge takes place at hundreds of events around the world. You may participate in an in-person or virtual Local Event near you or the virtual Universal Event if there is not an event near you.</p>
							<p>Local Events are organized by Local Leads. Learn more about how to host a Local Event.</p>
							<p><span className="text-blue-300 font-medium">What should I do if I experience or witness discrimination, harassment, or bullying?</span><br />We strive to ensure that NASA Space Apps is a place where all feel they belong, where all are comfortable being authentic, and where all are empowered to contribute to their fullest.</p>
							<p>If you experience or witness discrimination, harassment, or any form of bullying during the NASA Space Apps Challenge, or have any other concerns, please contact your Local Lead and/or the NASA Space Apps Global Organizing (GO) Team at conduct@spaceappschallenge.org. The GO Team will take appropriate action, which may include warning or expelling offending participants from the event.</p>
						</div>
					</div>
					<div>
						<h4 className="text-white font-semibold mb-2">Important Dates: 2026 NASA Space Apps Challenge</h4>
						<ul className="list-disc pl-5 space-y-1">
							<li><span className="font-medium text-blue-300">August:</span> August 26: Registration Opens.</li>
							<li><span className="font-medium text-blue-300">September:</span> September 17: Challenge Summaries available and Team Formation opens. Team Formation Participant Guide available.</li>
							<li><span className="font-medium text-blue-300">October:</span> October 28: Challenge Statements available.</li>
							<li><span className="font-medium text-blue-300">November:</span> November 2: Space Apps Connect Opens. Space Apps Connect Participant Guide available.</li>
							<li><span className="font-medium text-blue-300">November:</span> November 13: Global Offers Available. Project Submission and Judging &amp; Awards Participant Guides available.</li>
							<li><span className="font-medium text-blue-300">November:</span> November 14–15: NASA Space Apps Challenge event.</li>
							<li><span className="font-medium text-blue-300">After the Hackathon:</span> Judging occurs. Experts from NASA, Space Agency Partners, and industry leaders will evaluate the projects and select the winners. See the Judging and Awards Guide for details about the judging process and Global Awards.</li>
							<li><span className="font-medium text-blue-300">After the Hackathon:</span> December 2026: Global Nominees, Global Finalists, and Honorable Mentions are announced.</li>
							<li><span className="font-medium text-blue-300">After the Hackathon:</span> January 2027: Global Winners are announced!</li>
						</ul>
					</div>
				</div>
			)
		},
		{
			id: "bootcamp",
			title: "Virtual Bootcamp",
			icon: <Video className="h-8 w-8" />,
			iconColor: "text-green-400",
			shortDescription: "Video tutorials and guides",
			fullDescription: "Video series with tips from NASA Navigators, Global Winners, and more. Video tutorials that guide you through the hackathon experience and share valuable info about challenges, Global Offers, and more.",
			link: "https://www.spaceappschallenge.org/resources/virtual-bootcamp/",
			linkText: "About Virtual Bootcamp"
		},
		{
			id: "team",
			title: "Team Formation Guide",
			icon: <Users className="h-8 w-8" />,
			iconColor: "text-yellow-400",
			shortDescription: "How to create or join teams",
			fullDescription: "Team Formation opens September 17, 2026. A step-by-step guide on how to create or join a team for Space Apps.",
			link: "https://www.spaceappschallenge.org/resources/team-formation-guide/",
			linkText: "Full Team Formation Guide"
		},
		{
			id: "connect",
			title: "Space Apps Connect Guide",
			icon: <Globe2 className="h-8 w-8" />,
			iconColor: "text-indigo-400",
			shortDescription: "Collaborative hub for participants",
			fullDescription: "A collaborative hub for participants, Local Leads, and more. Opens November 2, 2026. Step-by-step instructions on how to navigate Space Apps Connect.",
			link: "https://www.spaceappschallenge.org/resources/space-app-connect-guide/",
			linkText: "Guide Overview"
		},
		{
			id: "submission",
			title: "Project Submission Guide",
			icon: <Send className="h-8 w-8" />,
			iconColor: "text-pink-400",
			shortDescription: "How to submit your project",
			fullDescription: "Submit your project through your team's project page before the deadline. Instructions and best practices for building and submitting your project (available November 13, 2026).",
			link: "https://www.spaceappschallenge.org/resources/project-submission-guide/",
			linkText: "Guide Overview"
		},
		{
			id: "judging",
			title: "Judging & Awards Guide",
			icon: <Trophy className="h-8 w-8" />,
			iconColor: "text-red-400",
			shortDescription: "Judging process and awards",
			fullDescription: "All participants who submit a project receive a certificate. See the Judging & Awards Guide for details. Overview of the judging process and Global Awards (available November 13, 2026).",
			link: "https://www.spaceappschallenge.org/resources/judging-awards-guide/",
			linkText: "Guide Overview"
		},
		{
			id: "social",
			title: "Connect with #SpaceApps",
			icon: <UserCheck className="h-8 w-8" />,
			iconColor: "text-cyan-400",
			shortDescription: "Follow us on social media",
			fullDescription: "Follow and connect with Space Apps on social media.",
			specialContent: (
				<div className="flex flex-col space-y-2 mt-4">
					<a href="https://www.facebook.com/spaceappschallenge" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">Facebook</a>
					<a href="https://www.youtube.com/nasaspaceappschallenge" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">YouTube</a>
					<a href="https://twitter.com/spaceapps" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">Twitter / X</a>
					<a href="https://www.instagram.com/nasaspaceapps/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">Instagram</a>
				</div>
			)
		}
	];

	return (
		<div className="bg-slate-900 py-16 border-t border-slate-800">
			<div className="container mx-auto px-6">
				<div className="text-center mb-12">
					<img
						src="/Pictures/nasa-space-apps-logo.png"
						alt="NASA Space Apps Logo"
						className="h-24 mx-auto mb-4"
					/>
					<h2 className="text-3xl font-bold text-white mb-3">Resources</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
					{resourceCards.map((card) => (
						<div key={card.id} className="relative">
							<div 
								className={`bg-slate-800/50 rounded-xl p-6 border border-slate-700 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-slate-800/70 ${
									expandedCard === card.id ? 'ring-2 ring-blue-500/50' : ''
								}`}
								onClick={() => toggleCard(card.id)}
							>
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<div className={`mb-3 ${card.iconColor}`}>
											{card.icon}
										</div>
										<h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
										<p className="text-gray-300 text-sm">{card.shortDescription}</p>
									</div>
									<div className="ml-4">
										<svg 
											xmlns="http://www.w3.org/2000/svg" 
											className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
												expandedCard === card.id ? 'rotate-180' : ''
											}`} 
											fill="none" 
											viewBox="0 0 24 24" 
											stroke="currentColor"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
										</svg>
									</div>
								</div>
							</div>
							
							{/* Expanded Content */}
							<div className={`overflow-hidden transition-all duration-300 ${
								expandedCard === card.id ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
							}`}>
								<div className="bg-slate-800/30 border border-t-0 border-slate-700 rounded-b-xl p-6 -mt-3">
									<p className="text-gray-300 mb-4">{card.fullDescription}</p>
									
									{card.specialContent && card.specialContent}
									
									{card.link && card.linkText && (
										<a 
											href={card.link} 
											target="_blank" 
											rel="noopener noreferrer" 
											className="inline-block text-blue-400 hover:text-blue-300 font-semibold transition-colors"
											onClick={(e) => e.stopPropagation()}
										>
											{card.linkText} →
										</a>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);


}
export default Resources;
