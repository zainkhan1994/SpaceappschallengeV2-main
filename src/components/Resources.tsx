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
			fullDescription: "Watch this quick video for a step-by-step guide to registering for the 2025 NASA Space Apps Challenge.",
			specialContent: (
				<div className="w-full aspect-video mt-4">
					<iframe
						width="100%"
						height="315"
						src="https://www.youtube.com/embed/_AL3QrPBugc"
						title="How to Register | 2025 NASA Space Apps Challenge"
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
			fullDescription: "The most frequently asked questions related to the NASA Space Apps Challenge.",
			link: "https://www.spaceappschallenge.org/resources/-faq/",
			linkText: "FAQ Overview"
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
			fullDescription: "Teams of up to 5 members. Team formation opens August 21, 2025. A step-by-step guide on how to create or join a team for Space Apps.",
			link: "https://www.spaceappschallenge.org/2025/local-events/houston/?tab=teams",
			linkText: "Full Team Formation Guide"
		},
		{
			id: "connect",
			title: "Space Apps Connect Guide",
			icon: <Globe2 className="h-8 w-8" />,
			iconColor: "text-indigo-400",
			shortDescription: "Collaborative hub for participants",
			fullDescription: "A collaborative hub for participants, Local Leads, and more. Opens September 23, 2025. Step-by-step instructions on how to navigate Space Apps Connect (available Sept 23, 2025).",
			link: "https://www.spaceappschallenge.org/resources/space-app-connect-guide/",
			linkText: "Guide Overview"
		},
		{
			id: "submission",
			title: "Project Submission Guide",
			icon: <Send className="h-8 w-8" />,
			iconColor: "text-pink-400",
			shortDescription: "How to submit your project",
			fullDescription: "Submit your project through your team's project page before the deadline. Instructions and best practices for building and submitting your project (available Oct 3, 2025).",
			link: "https://www.spaceappschallenge.org/resources/project-submission-guide/",
			linkText: "Guide Overview"
		},
		{
			id: "judging",
			title: "Judging & Awards Guide",
			icon: <Trophy className="h-8 w-8" />,
			iconColor: "text-red-400",
			shortDescription: "Judging process and awards",
			fullDescription: "All participants who submit a project receive a certificate. See the Judging & Awards Guide for details. Overview of the judging process and Global Awards (available Oct 3, 2025).",
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
