import React from "react";



const Resources: React.FC = () => {
	return (
		<div className="bg-slate-900 py-16 border-t border-slate-800">
			<div className="container mx-auto px-6">
				<div className="text-center mb-12">
					<img
						src="/Pictures/nasa-international-space-apps-challenge-logo.png"
						alt="NASA International Space Apps Challenge Logo"
						className="h-16 mx-auto mb-4"
					/>
					<h2 className="text-3xl font-bold text-white mb-3">Resources</h2>
				</div>

				<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{/* General Resources */}
					<div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
						<h3 className="text-xl font-bold text-white mb-4">General Resources</h3>
						<ul className="space-y-3">
							<li>
								<a
									href="https://www.spaceappschallenge.org/resources/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
								>
									<span className="mr-2">→</span>
									All Resources
								</a>
							</li>
							<li>
								<a
									href="https://www.spaceappschallenge.org/faq/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
								>
									<span className="mr-2">→</span>
									Participant FAQ
								</a>
							</li>
							<li>
								<a
									href="https://www.spaceappschallenge.org/resources/brand-guidelines/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
								>
									<span className="mr-2">→</span>
									Brand Guidelines
								</a>
							</li>
						</ul>
					</div>

					{/* Hackathon & Events */}
					<div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
						<h3 className="text-xl font-bold text-white mb-4">Hackathon & Events</h3>
						<ul className="space-y-3">
							<li>
								<a
									href="https://www.spaceappschallenge.org/2025-hackathon/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
								>
									<span className="mr-2">→</span>
									2025 Hackathon
								</a>
							</li>
							<li>
								<a
									href="https://www.spaceappschallenge.org/2025/locations/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
								>
									<span className="mr-2">→</span>
									2025 Local Events
								</a>
							</li>
							<li>
								<a
									href="https://www.spaceappschallenge.org/2025/challenges/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
								>
									<span className="mr-2">→</span>
									2025 Challenges
								</a>
							</li>
						</ul>
					</div>

					{/* Connect with #SpaceApps */}
					<div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
						<h3 className="text-xl font-bold text-white mb-4">Connect with #SpaceApps</h3>
						<ul className="space-y-3">
							<li>
								<a
									href="https://www.facebook.com/spaceappschallenge"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
								>
									<span className="mr-2">→</span>
									Facebook
								</a>
							</li>
							<li>
								<a
									href="https://twitter.com/spaceapps"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
								>
									<span className="mr-2">→</span>
									Twitter
								</a>
							</li>
							<li>
								<a
									href="https://www.instagram.com/nasaspaceapps/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
								>
									<span className="mr-2">→</span>
									Instagram
								</a>
							</li>
							<li>
								<a
									href="https://www.youtube.com/nasaspaceappschallenge"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
								>
									<span className="mr-2">→</span>
									YouTube
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Resources;
