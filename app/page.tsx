'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Bot,
	Users,
	TrendingUp,
	Star,
	Play,
	ArrowRight,
	Sparkles,
	Brain,
	Heart,
	Trophy,
	Globe,
	Shield,
	Gamepad2,
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
	const features = [
		{
			icon: Bot,
			title: 'Create & Monetize AIs',
			description:
				'Build and share AI assistants with the world. Set your own pricing and earn from your creations.',
			color: 'text-purple-600',
		},
		{
			icon: Users,
			title: 'Interactive AI Rooms',
			description:
				'Join live multiplayer experiences with AI hosts. Debate, create stories, and play games together.',
			color: 'text-blue-600',
		},
		{
			icon: Gamepad2,
			title: 'AI-Powered Games',
			description:
				'Play trivia, text adventures, and creative challenges with intelligent AI game masters.',
			color: 'text-green-600',
		},
		{
			icon: TrendingUp,
			title: 'Discover & Explore',
			description:
				'Find the perfect AI for any task. Browse by category, rating, and popularity.',
			color: 'text-orange-600',
		},
	];

	const stats = [
		{ label: 'Active AIs', value: '12,456', icon: Bot },
		{ label: 'Creators', value: '2,847', icon: Users },
		{ label: 'Daily Users', value: '89,234', icon: Heart },
		{ label: 'Live Rooms', value: '156', icon: Play },
	];

	const testimonials = [
		{
			name: 'Sarah Chen',
			role: 'AI Creator',
			avatar: '/api/placeholder/40/40',
			text: "I've earned over $5,000 in my first month! The platform makes it so easy to share my AI creations with the world.",
		},
		{
			name: 'Mike Rodriguez',
			role: 'Daily User',
			avatar: '/api/placeholder/40/40',
			text: "The AI rooms are incredible. I've made friends from around the world while playing trivia and building stories together.",
		},
		{
			name: 'Dr. Emily Watson',
			role: 'Educator',
			avatar: '/api/placeholder/40/40',
			text: "My students love the educational AIs here. It's transformed how we approach learning in the classroom.",
		},
	];

	return (
		<div className='min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100'>
			{/* Header */}
			<header className='border-b bg-white/80 backdrop-blur-md sticky top-0 z-50'>
				<div className='container mx-auto px-4 py-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-2'>
							<Bot className='h-8 w-8 text-purple-600' />
							<span className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
								AI Marketplace
							</span>
						</div>

						<nav className='hidden md:flex items-center space-x-8'>
							<Link
								href='#features'
								className='text-gray-600 hover:text-gray-900'>
								Features
							</Link>
							<Link
								href='#pricing'
								className='text-gray-600 hover:text-gray-900'>
								Pricing
							</Link>
							<Link
								href='#community'
								className='text-gray-600 hover:text-gray-900'>
								Community
							</Link>
							<Link href='#about' className='text-gray-600 hover:text-gray-900'>
								About
							</Link>
						</nav>

						<div className='flex items-center space-x-4'>
							<Button variant='ghost' asChild>
								<Link href='/auth/login'>Sign In</Link>
							</Button>
							<Button asChild>
								<Link href='/dashboard'>
									Get Started
									<ArrowRight className='ml-2 h-4 w-4' />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className='py-20'>
				<div className='container mx-auto px-4 text-center'>
					<div className='max-w-4xl mx-auto'>
						<Badge className='mb-6 bg-purple-100 text-purple-700 border-purple-200'>
							<Sparkles className='w-4 h-4 mr-2' />
							The Future of AI Interaction
						</Badge>

						<h1 className='text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent'>
							AI Marketplace
						</h1>

						<p className='text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed'>
							Create, discover, and interact with amazing AI experiences.
							<br />
							Join a vibrant community of creators and users building the future
							of AI.
						</p>

						<div className='flex flex-col md:flex-row gap-4 justify-center mb-12'>
							<Button size='lg' className='text-lg px-8 py-3' asChild>
								<Link href='/dashboard'>
									<Play className='mr-2 h-5 w-5' />
									Start Exploring
								</Link>
							</Button>
							<Button
								size='lg'
								variant='outline'
								className='text-lg px-8 py-3'
								asChild>
								<Link href='/create'>
									<Bot className='mr-2 h-5 w-5' />
									Create Your AI
								</Link>
							</Button>
						</div>

						{/* Stats */}
						<div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto'>
							{stats.map((stat, index) => {
								const Icon = stat.icon;
								return (
									<div key={index} className='text-center'>
										<Icon className='h-8 w-8 mx-auto mb-2 text-purple-600' />
										<div className='text-2xl font-bold text-gray-900'>
											{stat.value}
										</div>
										<div className='text-sm text-gray-600'>{stat.label}</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id='features' className='py-20 bg-white'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl md:text-4xl font-bold mb-4'>
							Everything you need to succeed
						</h2>
						<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
							From creating AIs to building communities, our platform has all
							the tools you need.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						{features.map((feature, index) => {
							const Icon = feature.icon;
							return (
								<Card
									key={index}
									className='text-center hover:shadow-lg transition-shadow'>
									<CardContent className='p-6'>
										<Icon
											className={`h-12 w-12 mx-auto mb-4 ${feature.color}`}
										/>
										<h3 className='text-xl font-semibold mb-2'>
											{feature.title}
										</h3>
										<p className='text-gray-600'>{feature.description}</p>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>
			</section>

			{/* Demo Section */}
			<section className='py-20'>
				<div className='container mx-auto px-4'>
					<div className='max-w-6xl mx-auto'>
						<div className='text-center mb-16'>
							<h2 className='text-3xl md:text-4xl font-bold mb-4'>
								See it in action
							</h2>
							<p className='text-xl text-gray-600'>
								Experience the power of collaborative AI
							</p>
						</div>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
							<div>
								<Badge className='mb-4 bg-blue-100 text-blue-700 border-blue-200'>
									<Users className='w-4 h-4 mr-2' />
									Live Demo
								</Badge>
								<h3 className='text-2xl font-bold mb-4'>
									Interactive AI Rooms
								</h3>
								<p className='text-gray-600 mb-6'>
									Join live multiplayer experiences where AI hosts facilitate
									engaging activities. From trivia nights to creative writing
									sessions, there&apos;s always something happening.
								</p>
								<div className='space-y-4'>
									<div className='flex items-center gap-3'>
										<div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
											<Brain className='w-4 h-4 text-green-600' />
										</div>
										<span>Real-time AI moderation and guidance</span>
									</div>
									<div className='flex items-center gap-3'>
										<div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
											<Users className='w-4 h-4 text-blue-600' />
										</div>
										<span>Connect with people worldwide</span>
									</div>
									<div className='flex items-center gap-3'>
										<div className='w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center'>
											<Trophy className='w-4 h-4 text-purple-600' />
										</div>
										<span>Compete and collaborate in games</span>
									</div>
								</div>
								<Button className='mt-6' asChild>
									<Link href='/rooms'>
										Explore Rooms
										<ArrowRight className='ml-2 h-4 w-4' />
									</Link>
								</Button>
							</div>

							<Card className='p-6'>
								<div className='bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6'>
									<div className='flex items-center gap-3 mb-4'>
										<Avatar>
											<AvatarImage src='/api/placeholder/32/32' />
											<AvatarFallback>AI</AvatarFallback>
										</Avatar>
										<div>
											<p className='font-medium'>Quiz Master 3000</p>
											<p className='text-sm text-gray-500'>AI Host</p>
										</div>
										<Badge variant='outline' className='ml-auto'>
											Live
										</Badge>
									</div>
									<div className='bg-white rounded-lg p-4 mb-4'>
										<p className='text-sm'>
											&quot;Welcome to 90s Pop Culture Trivia! Our first
											question: Which boy band sang &apos;I Want It That
											Way&apos;?&quot;
										</p>
									</div>
									<div className='flex items-center justify-between text-sm text-gray-600'>
										<span>24 participants</span>
										<span>Round 3 of 10</span>
									</div>
								</div>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className='py-20 bg-white'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl md:text-4xl font-bold mb-4'>
							Loved by creators and users
						</h2>
						<p className='text-xl text-gray-600'>
							See what our community has to say
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
						{testimonials.map((testimonial, index) => (
							<Card key={index} className='hover:shadow-lg transition-shadow'>
								<CardContent className='p-6'>
									<div className='flex items-center gap-3 mb-4'>
										<Avatar>
											<AvatarImage src={testimonial.avatar} />
											<AvatarFallback>{testimonial.name[0]}</AvatarFallback>
										</Avatar>
										<div>
											<p className='font-medium'>{testimonial.name}</p>
											<p className='text-sm text-gray-500'>
												{testimonial.role}
											</p>
										</div>
									</div>
									<p className='text-gray-600 italic'>
										&quot;{testimonial.text}&quot;
									</p>
									<div className='flex mt-4'>
										{[1, 2, 3, 4, 5].map((star) => (
											<Star
												key={star}
												className='w-4 h-4 fill-yellow-400 text-yellow-400'
											/>
										))}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white'>
				<div className='container mx-auto px-4 text-center'>
					<h2 className='text-3xl md:text-4xl font-bold mb-4'>
						Ready to join the AI revolution?
					</h2>
					<p className='text-xl mb-8 opacity-90'>
						Start creating, discovering, and earning with AI today.
					</p>
					<div className='flex flex-col md:flex-row gap-4 justify-center'>
						<Button
							size='lg'
							variant='secondary'
							className='text-lg px-8 py-3'
							asChild>
							<Link href='/dashboard'>
								Get Started Free
								<ArrowRight className='ml-2 h-5 w-5' />
							</Link>
						</Button>
						<Button
							size='lg'
							variant='outline'
							className='text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-purple-600'
							asChild>
							<Link href='/marketplace'>Explore Marketplace</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className='bg-gray-900 text-white py-12'>
				<div className='container mx-auto px-4'>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
						<div>
							<div className='flex items-center space-x-2 mb-4'>
								<Bot className='h-6 w-6 text-purple-400' />
								<span className='text-xl font-bold'>AI Marketplace</span>
							</div>
							<p className='text-gray-400'>
								The future of AI interaction is here. Create, discover, and
								connect.
							</p>
						</div>

						<div>
							<h3 className='font-semibold mb-4'>Platform</h3>
							<ul className='space-y-2 text-gray-400'>
								<li>
									<Link href='/marketplace' className='hover:text-white'>
										Browse AIs
									</Link>
								</li>
								<li>
									<Link href='/create' className='hover:text-white'>
										Create AI
									</Link>
								</li>
								<li>
									<Link href='/rooms' className='hover:text-white'>
										AI Rooms
									</Link>
								</li>
								<li>
									<Link href='/games' className='hover:text-white'>
										Games
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className='font-semibold mb-4'>Community</h3>
							<ul className='space-y-2 text-gray-400'>
								<li>
									<Link href='/community' className='hover:text-white'>
										Community Hub
									</Link>
								</li>
								<li>
									<Link href='/blog' className='hover:text-white'>
										Blog
									</Link>
								</li>
								<li>
									<Link href='/docs' className='hover:text-white'>
										Documentation
									</Link>
								</li>
								<li>
									<Link href='/support' className='hover:text-white'>
										Support
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className='font-semibold mb-4'>Company</h3>
							<ul className='space-y-2 text-gray-400'>
								<li>
									<Link href='/about' className='hover:text-white'>
										About
									</Link>
								</li>
								<li>
									<Link href='/careers' className='hover:text-white'>
										Careers
									</Link>
								</li>
								<li>
									<Link href='/privacy' className='hover:text-white'>
										Privacy
									</Link>
								</li>
								<li>
									<Link href='/terms' className='hover:text-white'>
										Terms
									</Link>
								</li>
							</ul>
						</div>
					</div>

					<div className='border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center'>
						<p className='text-gray-400'>
							&copy; 2024 AI Marketplace. All rights reserved.
						</p>
						<div className='flex items-center space-x-4 mt-4 md:mt-0'>
							<Badge
								variant='outline'
								className='border-green-500 text-green-400'>
								<Shield className='w-3 h-3 mr-1' />
								Secure
							</Badge>
							<Badge
								variant='outline'
								className='border-blue-500 text-blue-400'>
								<Globe className='w-3 h-3 mr-1' />
								Global
							</Badge>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
