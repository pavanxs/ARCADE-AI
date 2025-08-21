'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
	Search,
	TrendingUp,
	Star,
	Users,
	Bot,
	Gamepad2,
	Briefcase,
	GraduationCap,
	Heart,
	Plus,
	PlayCircle,
	Crown,
	Zap,
	DollarSign,
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
	const [searchQuery, setSearchQuery] = useState('');

	const featuredAIs = [
		{
			id: 1,
			name: 'CodeMaster Pro',
			description: 'Advanced coding assistant for all programming languages',
			category: 'Productivity',
			rating: 4.9,
			users: '15.2k',
			price: '$9.99/mo',
			badge: 'Popular',
			creator: 'TechWiz Studios',
			avatar: '/api/placeholder/40/40',
		},
		{
			id: 2,
			name: 'Therapy Companion',
			description: 'Empathetic AI therapist for mental health support',
			category: 'Wellness',
			rating: 4.8,
			users: '8.7k',
			price: 'Free',
			badge: 'Trending',
			creator: 'MindSpace AI',
			avatar: '/api/placeholder/40/40',
		},
		{
			id: 3,
			name: 'CryptoTrader Elite',
			description: 'AI-powered cryptocurrency trading bot',
			category: 'Finance',
			rating: 4.7,
			users: '12.1k',
			price: '$29.99/mo',
			badge: 'Hot',
			creator: 'FinanceAI Labs',
			avatar: '/api/placeholder/40/40',
		},
	];

	const activeRooms = [
		{
			id: 1,
			name: 'Philosophy Debate Arena',
			participants: 24,
			aiHost: 'Socrates AI',
			topic: 'The meaning of consciousness',
			status: 'Live',
		},
		{
			id: 2,
			name: 'Creative Writing Jam',
			participants: 18,
			aiHost: 'Story Weaver',
			topic: 'Sci-fi adventure story',
			status: 'Live',
		},
		{
			id: 3,
			name: 'Trivia Night Champions',
			participants: 45,
			aiHost: 'Quiz Master 3000',
			topic: '90s Pop Culture',
			status: 'Starting Soon',
		},
	];

	const myRecentAIs = [
		{
			name: 'Personal Assistant Alpha',
			lastUsed: '2 hours ago',
			status: 'Active',
		},
		{ name: 'Language Tutor', lastUsed: '1 day ago', status: 'Inactive' },
		{ name: 'Fitness Coach Pro', lastUsed: '3 days ago', status: 'Active' },
	];

	return (
		<div className='min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100'>
			{/* Header */}
			<header className='border-b bg-white/80 backdrop-blur-md sticky top-0 z-50'>
				<div className='container mx-auto px-4 py-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-4'>
							<div className='flex items-center space-x-2'>
								<Bot className='h-8 w-8 text-purple-600' />
								<span className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
									AI Marketplace
								</span>
							</div>
						</div>

						<div className='flex-1 max-w-xl mx-8'>
							<div className='relative'>
								<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
								<Input
									placeholder='Search AIs, rooms, creators...'
									className='pl-10 bg-white/70'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>
						</div>

						<div className='flex items-center space-x-4'>
							<Button variant='outline' asChild>
								<Link href='/marketplace'>
									<Bot className='h-4 w-4 mr-2' />
									Browse AIs
								</Link>
							</Button>
							<Button asChild>
								<Link href='/create'>
									<Plus className='h-4 w-4 mr-2' />
									Create AI
								</Link>
							</Button>
							<Avatar>
								<AvatarImage src='/api/placeholder/32/32' />
								<AvatarFallback>JD</AvatarFallback>
							</Avatar>
						</div>
					</div>
				</div>
			</header>

			<main className='container mx-auto px-4 py-8'>
				{/* Welcome Section */}
				<div className='mb-8'>
					<h1 className='text-4xl font-bold mb-2'>Welcome back, John!</h1>
					<p className='text-gray-600 text-lg'>
						Discover, create, and interact with amazing AI experiences
					</p>
				</div>

				{/* Quick Stats */}
				<div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
					<Card className='bg-gradient-to-r from-purple-500 to-purple-600 text-white'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-purple-100'>Your AIs</p>
									<p className='text-3xl font-bold'>12</p>
								</div>
								<Bot className='h-8 w-8 text-purple-200' />
							</div>
						</CardContent>
					</Card>

					<Card className='bg-gradient-to-r from-blue-500 to-blue-600 text-white'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-blue-100'>Credits</p>
									<p className='text-3xl font-bold'>2,450</p>
								</div>
								<Zap className='h-8 w-8 text-blue-200' />
							</div>
						</CardContent>
					</Card>

					<Card className='bg-gradient-to-r from-green-500 to-green-600 text-white'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-green-100'>Earnings</p>
									<p className='text-3xl font-bold'>$287</p>
								</div>
								<DollarSign className='h-8 w-8 text-green-200' />
							</div>
						</CardContent>
					</Card>

					<Card className='bg-gradient-to-r from-orange-500 to-orange-600 text-white'>
						<CardContent className='p-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-orange-100'>Active Rooms</p>
									<p className='text-3xl font-bold'>3</p>
								</div>
								<Users className='h-8 w-8 text-orange-200' />
							</div>
						</CardContent>
					</Card>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Main Content */}
					<div className='lg:col-span-2 space-y-8'>
						{/* Featured AIs */}
						<Card>
							<CardHeader>
								<div className='flex items-center justify-between'>
									<CardTitle className='flex items-center gap-2'>
										<TrendingUp className='h-5 w-5 text-purple-600' />
										Featured AIs
									</CardTitle>
									<Button variant='ghost' asChild>
										<Link href='/marketplace'>View All</Link>
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								<div className='grid gap-4'>
									{featuredAIs.map((ai) => (
										<div
											key={ai.id}
											className='flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors'>
											<Avatar className='h-12 w-12'>
												<AvatarImage src={ai.avatar} />
												<AvatarFallback>{ai.name[0]}</AvatarFallback>
											</Avatar>

											<div className='flex-1'>
												<div className='flex items-center gap-2 mb-1'>
													<h3 className='font-semibold'>{ai.name}</h3>
													<Badge variant='secondary'>{ai.badge}</Badge>
												</div>
												<p className='text-sm text-gray-600 mb-2'>
													{ai.description}
												</p>
												<div className='flex items-center gap-4 text-sm text-gray-500'>
													<span className='flex items-center gap-1'>
														<Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
														{ai.rating}
													</span>
													<span className='flex items-center gap-1'>
														<Users className='h-3 w-3' />
														{ai.users}
													</span>
													<span>{ai.category}</span>
												</div>
											</div>

											<div className='text-right'>
												<p className='font-semibold text-purple-600'>
													{ai.price}
												</p>
												<Button size='sm' className='mt-2'>
													Try Now
												</Button>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Active Rooms */}
						<Card>
							<CardHeader>
								<div className='flex items-center justify-between'>
									<CardTitle className='flex items-center gap-2'>
										<PlayCircle className='h-5 w-5 text-blue-600' />
										Live AI Rooms
									</CardTitle>
									<Button variant='ghost' asChild>
										<Link href='/rooms'>View All</Link>
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								<div className='grid gap-4'>
									{activeRooms.map((room) => (
										<div
											key={room.id}
											className='flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors'>
											<div>
												<div className='flex items-center gap-2 mb-1'>
													<h3 className='font-semibold'>{room.name}</h3>
													<Badge
														variant={
															room.status === 'Live' ? 'default' : 'secondary'
														}>
														{room.status}
													</Badge>
												</div>
												<p className='text-sm text-gray-600 mb-1'>
													{room.topic}
												</p>
												<div className='flex items-center gap-4 text-sm text-gray-500'>
													<span className='flex items-center gap-1'>
														<Users className='h-3 w-3' />
														{room.participants} participants
													</span>
													<span>Host: {room.aiHost}</span>
												</div>
											</div>
											<Button size='sm'>Join Room</Button>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Sidebar */}
					<div className='space-y-6'>
						{/* My Recent AIs */}
						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<Bot className='h-5 w-5 text-purple-600' />
									My Recent AIs
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='space-y-3'>
									{myRecentAIs.map((ai, index) => (
										<div
											key={index}
											className='flex items-center justify-between'>
											<div>
												<p className='font-medium text-sm'>{ai.name}</p>
												<p className='text-xs text-gray-500'>{ai.lastUsed}</p>
											</div>
											<Badge
												variant={
													ai.status === 'Active' ? 'default' : 'secondary'
												}>
												{ai.status}
											</Badge>
										</div>
									))}
								</div>
								<Button className='w-full mt-4' variant='outline' asChild>
									<Link href='/my-ais'>View All My AIs</Link>
								</Button>
							</CardContent>
						</Card>

						{/* Quick Actions */}
						<Card>
							<CardHeader>
								<CardTitle>Quick Actions</CardTitle>
							</CardHeader>
							<CardContent className='space-y-3'>
								<Button
									className='w-full justify-start'
									variant='outline'
									asChild>
									<Link href='/create'>
										<Plus className='h-4 w-4 mr-2' />
										Create New AI
									</Link>
								</Button>
								<Button
									className='w-full justify-start'
									variant='outline'
									asChild>
									<Link href='/rooms/create'>
										<Users className='h-4 w-4 mr-2' />
										Start AI Room
									</Link>
								</Button>
								<Button
									className='w-full justify-start'
									variant='outline'
									asChild>
									<Link href='/marketplace'>
										<Search className='h-4 w-4 mr-2' />
										Browse Marketplace
									</Link>
								</Button>
								<Button
									className='w-full justify-start'
									variant='outline'
									asChild>
									<Link href='/wallet'>
										<Zap className='h-4 w-4 mr-2' />
										Buy Credits
									</Link>
								</Button>
							</CardContent>
						</Card>

						{/* Categories */}
						<Card>
							<CardHeader>
								<CardTitle>Popular Categories</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='grid grid-cols-2 gap-3'>
									<Button
										variant='outline'
										size='sm'
										className='justify-start'
										asChild>
										<Link href='/marketplace?category=productivity'>
											<Briefcase className='h-4 w-4 mr-2' />
											Productivity
										</Link>
									</Button>
									<Button
										variant='outline'
										size='sm'
										className='justify-start'
										asChild>
										<Link href='/marketplace?category=games'>
											<Gamepad2 className='h-4 w-4 mr-2' />
											Games
										</Link>
									</Button>
									<Button
										variant='outline'
										size='sm'
										className='justify-start'
										asChild>
										<Link href='/marketplace?category=education'>
											<GraduationCap className='h-4 w-4 mr-2' />
											Education
										</Link>
									</Button>
									<Button
										variant='outline'
										size='sm'
										className='justify-start'
										asChild>
										<Link href='/marketplace?category=wellness'>
											<Heart className='h-4 w-4 mr-2' />
											Wellness
										</Link>
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}
