import React from "react";
import { ExternalLink } from "lucide-react";

const resources = [
	{
		title: "General Resources",
		links: [
			{
				name: "All Resources",
				url: "https://www.spaceappschallenge.org/resources/",
			},
			{
				name: "Participant FAQ",
				url: "https://www.spaceappschallenge.org/resources/-faq/",
			},
			{
				name: "Brand Guidelines",
				url: "https://www.spaceappschallenge.org/brand/",
			},
			{
				name: "Awards",
				url: "https://www.spaceappschallenge.org/nasa-space-apps-2024/awards/",
			},
		],
	},
	{
		title: "Hackathon & Events",
		links: [
			{ name: "2025 Hackathon", url: "https://www.spaceappschallenge.org/2025/" },
			{
				name: "2025 Local Events",
				url: "https://www.spaceappschallenge.org/2025/local-events/",
			},
			{ name: "2025 Challenges", url: "https://www.spaceappschallenge.org/2025/challenges/" },
			{ name: "Find a Team", url: "https://www.spaceappschallenge.org/2025/find-a-team/" },
			{
				name: "Space Agency Partners",
				url: "https://www.spaceappschallenge.org/2025/space-agency-partners/",
			},
		],
	},
	{
		title: "Connect with #SpaceApps",
		links: [
			{ name: "Facebook", url: "https://www.facebook.com/spaceappschallenge" },
			{ name: "Twitter", url: "https://www.twitter.com/spaceapps" },
			{ name: "Instagram", url: "https://www.instagram.com/nasa_spaceapps" },
			{ name: "YouTube", url: "https://www.youtube.com/nasaspaceappschallenge" },
		],
	},
];

const logoUrl =
	"https://assets.spaceappschallenge.org/media/images/Colorway2-Color_White3x.width-440.jpegquality-60.png";

const Resources: React.FC = () => {
	return (
		<section id="resources" className="py-20 bg-slate-800/50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center mb-12">
					<img
						src={logoUrl}
						alt="NASA Space Apps Challenge Logo"
						className="mb-6 w-64 h-auto drop-shadow-lg"
					/>
					<h2 className="font-overpass font-bold text-4xl lg:text-5xl text-white mb-4 text-center">
						Resources
					</h2>
					<p className="font-fira-sans text-xl text-gray-300 max-w-3xl mx-auto text-center">
						Resources and Participant Guides will be updated periodically leading
						up to the 2025 NASA Space Apps Challenge.
					</p>
				</div>
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{resources.map((resource, idx) => (
						<div
							key={idx}
							className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/20 shadow-lg flex flex-col items-start"
						>
							<h3 className="font-overpass font-bold text-xl text-white mb-2">
								{resource.title}
							</h3>
							{resource.links && (
								<ul className="space-y-2">
									{resource.links.map((link, i) => (
										<li key={i}>
											<a
												href={link.url}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center text-blue-400 hover:underline font-fira-sans"
											>
												{link.name}
												<ExternalLink className="ml-2 w-4 h-4" />
											</a>
										</li>
									))}
								</ul>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Resources;
