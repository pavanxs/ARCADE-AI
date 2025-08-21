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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Bot,
	ArrowLeft,
	Trophy,
	Star,
	TrendingUp,
	Users,
	Crown,
	Medal,
	Award,
	Calendar,
	MessageSquare,
	ThumbsUp,
	ThumbsDown,
	Flag,
	Search,
	Filter,
	Zap,
	Heart,
	Fire,
	Eye,
	Share,
	ChevronUp,
	ChevronDown,
	MoreHorizontal,
} from 'lucide-react';
import Link from 'next/link';

export default function CommunityPage() {
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [selectedTimeframe, setSelectedTimeframe] = useState('month');
	const [searchQuery, setSearchQuery] = useState('');

	const leaderboards = {
		topCreators: [
			{
				rank: 1,
				user: {
					name: 'Alex Chen',
					username: 'alexcode',
					avatar: '/api/placeholder/40/40',
					verified: true,
				},
				stats: {
					aisCreated: 23,
					totalUsers: 45600,
					revenue: 12890.5,
					averageRating: 4.9,
				},
				change: 'up',
				badge: 'gold',
			},
			{
				rank: 2,
				user: {
					name: 'Sarah Wilson',
					username: 'sarahwrites',
					avatar: '/api/placeholder/40/40',
					verified: true,
				},
				stats: {
					aisCreated: 18,
					totalUsers: 38200,
					revenue: 9734.2,
					averageRating: 4.8,
				},
				change: 'down',
				badge: 'silver',
			},
			{
				rank: 3,
				user: {
					name: 'Marcus Johnson',
					username: 'marcusai',
					avatar: '/api/placeholder/40/40',
					verified: false,
				},
				stats: {
					aisCreated: 15,
					totalUsers: 29800,
					revenue: 7456.8,
					averageRating: 4.7,
				},
				change: 'up',
				badge: 'bronze',
			},
		],
		topAIs: [
			{
				rank: 1,
				ai: {
					name: 'CodeMaster Pro',
					creator: 'Alex Chen',
					avatar: '/api/placeholder/40/40',
					category: 'Productivity',
				},
				stats: {
					users: 15200,
					rating: 4.9,
					reviews: 1284,
					revenue: 45600,
				},
				change: 'same',
			},
			{
				rank: 2,
				ai: {
					name: 'Story Weaver AI',
					creator: 'Sarah Wilson',
					avatar: '/api/placeholder/40/40',
					category: 'Creative',
				},
				stats: {
					users: 12800,
					rating: 4.8,
					reviews: 967,
					revenue: 38400,
				},
				change: 'up',
			},
			{
				rank: 3,
				ai: {
					name: 'Language Master',
					creator: 'Marcus Johnson',
					avatar: '/api/placeholder/40/40',
					category: 'Education',
				},
				stats: {
					users: 11500,
					rating: 4.7,
					reviews: 834,
					revenue: 32100,
				},
				change: 'down',
			},
		],
	};

	const recentReviews = [
		{
			id: 1,
			user: {
				name: 'Emily Zhang',
				avatar: '/api/placeholder/32/32',
				verified: false,
			},
			ai: {
				name: 'CodeMaster Pro',
				creator: 'Alex Chen',
			},
			rating: 5,
			text: 'Absolutely incredible! This AI has revolutionized my coding workflow. The suggestions are spot-on and have saved me countless hours. The debugging features are particularly impressive.',
			timestamp: '2 hours ago',
			helpful: 23,
			hasUserVoted: false,
		},
		{
			id: 2,
			user: {
				name: 'David Rodriguez',
				avatar: '/api/placeholder/32/32',
				verified: true,
			},
			ai: {
				name: 'Story Weaver AI',
				creator: 'Sarah Wilson',
			},
			rating: 4,
			text: 'Great for creative writing! The AI understands narrative structure well and provides helpful suggestions. Could use more genre-specific templates though.',
			timestamp: '4 hours ago',
			helpful: 15,
			hasUserVoted: true,
		},
		{
			id: 3,
			user: {
				name: 'Lisa Park',
				avatar: '/api/placeholder/32/32',
				verified: false,
			},
			ai: {
				name: 'Language Master',
				creator: 'Marcus Johnson',
			},
			rating: 5,
			text: 'Perfect for language learning! The conversational practice feature is amazing and the grammar corrections are very helpful. Highly recommended!',
			timestamp: '6 hours ago',
			helpful: 31,
			hasUserVoted: false,
		},
	];

	const communityHighlights = [
		{
			id: 1,
			type: 'achievement',
			title: 'New Milestone Reached!',
			description:
				'Alex Chen becomes the first creator to reach 50,000 total users across all AIs',
			user: {
				name: 'Alex Chen',
				avatar: '/api/placeholder/32/32',
			},
			timestamp: '1 day ago',
			reactions: { likes: 234, comments: 45 },
		},
		{
			id: 2,
			type: 'featured',
			title: 'AI of the Week',
			description:
				'Story Weaver AI has been selected as our featured AI for its innovative approach to creative writing assistance',
			ai: {
				name: 'Story Weaver AI',
				avatar: '/api/placeholder/32/32',
			},
			timestamp: '2 days ago',
			reactions: { likes: 189, comments: 23 },
		},
		{
			id: 3,
			type: 'community',
			title: 'New Room Category Launched',
			description:
				"Philosophy Debate rooms are now available! Join thoughtful discussions about life's big questions.",
			timestamp: '3 days ago',
			reactions: { likes: 156, comments: 67 },
		},
	];

	const getRankIcon = (rank) => {
		switch (rank) {
			case 1:
				return <Crown className='h-5 w-5 text-yellow-500' />;
			case 2:
				return <Medal className='h-5 w-5 text-gray-400' />;
			case 3:
				return <Award className='h-5 w-5 text-amber-600' />;
			default:
				return <span className='font-bold text-gray-600'>#{rank}</span>;
		}
	};

	const getChangeIcon = (change) => {
		switch (change) {
			case 'up':
				return <ChevronUp className='h-4 w-4 text-green-500' />;
			case 'down':
				return <ChevronDown className='h-4 w-4 text-red-500' />;
			default:
				return <span className='text-gray-400'>-</span>;
		}
	};

	const getBadgeColor = (badge) => {
		switch (badge) {
			case 'gold':
				return 'bg-yellow-500';
			case 'silver':
				return 'bg-gray-400';
			case 'bronze':
				return 'bg-amber-600';
			default:
				return 'bg-gray-500';
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100'>
			{/* Header */}
			<header className='border-b bg-white/80 backdrop-blur-md sticky top-0 z-50'>
				<div className='container mx-auto px-4 py-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-4'>
							<Button variant='ghost' asChild>
								<Link href='/dashboard'>
									<ArrowLeft className='h-4 w-4 mr-2' />
									Back to Dashboard
								</Link>
							</Button>
						</div>

						<Link href='/dashboard' className='flex items-center space-x-2'>
							<Bot className='h-8 w-8 text-purple-600' />
							<span className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
								AI Marketplace
							</span>
						</Link>

						<div className='flex items-center space-x-4'>
							<div className='relative'>
								<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
								<Input
									placeholder='Search community...'
									className='pl-10 w-64'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>
						</div>
					</div>
				</div>
			</header>

			<div className='container mx-auto px-4 py-8'>
				<div className='mb-8'>
					<h1 className='text-3xl font-bold mb-2'>Community Hub</h1>
					<p className='text-gray-600'>
						Discover top creators, trending AIs, and community highlights
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
					{/* Sidebar */}
					<div className='lg:col-span-1 space-y-6'>
						{/* Quick Stats */}
						<Card>
							<CardHeader>
								<CardTitle className='text-lg'>Community Stats</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='space-y-4'>
									<div className='flex items-center justify-between'>
										<span className='text-sm text-gray-600'>
											Total Creators
										</span>
										<span className='font-semibold'>2,847</span>
									</div>
									<div className='flex items-center justify-between'>
										<span className='text-sm text-gray-600'>Active AIs</span>
										<span className='font-semibold'>12,456</span>
									</div>
									<div className='flex items-center justify-between'>
										<span className='text-sm text-gray-600'>Live Rooms</span>
										<span className='font-semibold'>89</span>
									</div>
									<div className='flex items-center justify-between'>
										<span className='text-sm text-gray-600'>Reviews Today</span>
										<span className='font-semibold'>234</span>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Trending Topics */}
						<Card>
							<CardHeader>
								<CardTitle className='text-lg flex items-center gap-2'>
									<Fire className='h-5 w-5 text-orange-500' />
									Trending Topics
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='space-y-3'>
									{[
										'#AI-Coding',
										'#Creative-Writing',
										'#Language-Learning',
										'#Productivity',
										'#Game-AI',
									].map((topic, index) => (
										<div
											key={index}
											className='flex items-center justify-between'>
											<span className='text-sm text-blue-600 hover:underline cursor-pointer'>
												{topic}
											</span>
											<Badge variant='outline' className='text-xs'>
												{Math.floor(Math.random() * 500) + 100}
											</Badge>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Community Guidelines */}
						<Card>
							<CardHeader>
								<CardTitle className='text-lg'>Community Guidelines</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='space-y-2 text-sm'>
									<p>• Be respectful and constructive</p>
									<p>• Provide honest and helpful reviews</p>
									<p>• No spam or self-promotion</p>
									<p>• Report inappropriate content</p>
									<p>• Celebrate others' achievements</p>
								</div>
								<Button variant='outline' className='w-full mt-4' size='sm'>
									Read Full Guidelines
								</Button>
							</CardContent>
						</Card>
					</div>

					{/* Main Content */}
					<div className='lg:col-span-3'>
						<Tabs defaultValue='leaderboards' className='w-full'>
							<TabsList className='grid w-full grid-cols-3'>
								<TabsTrigger value='leaderboards'>Leaderboards</TabsTrigger>
								<TabsTrigger value='reviews'>Reviews</TabsTrigger>
								<TabsTrigger value='highlights'>Highlights</TabsTrigger>
							</TabsList>

							<TabsContent value='leaderboards' className='space-y-6 mt-6'>
								{/* Filters */}
								<Card>
									<CardContent className='p-4'>
										<div className='flex gap-4'>
											<Select
												value={selectedCategory}
												onValueChange={setSelectedCategory}>
												<SelectTrigger className='w-48'>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='all'>All Categories</SelectItem>
													<SelectItem value='productivity'>
														Productivity
													</SelectItem>
													<SelectItem value='creative'>Creative</SelectItem>
													<SelectItem value='education'>Education</SelectItem>
													<SelectItem value='gaming'>Gaming</SelectItem>
												</SelectContent>
											</Select>

											<Select
												value={selectedTimeframe}
												onValueChange={setSelectedTimeframe}>
												<SelectTrigger className='w-32'>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='week'>This Week</SelectItem>
													<SelectItem value='month'>This Month</SelectItem>
													<SelectItem value='year'>This Year</SelectItem>
													<SelectItem value='all'>All Time</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</CardContent>
								</Card>

								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									{/* Top Creators */}
									<Card>
										<CardHeader>
											<CardTitle className='flex items-center gap-2'>
												<Trophy className='h-5 w-5 text-yellow-500' />
												Top Creators
											</CardTitle>
											<CardDescription>
												Ranked by total revenue and user satisfaction
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className='space-y-4'>
												{leaderboards.topCreators.map((creator) => (
													<div
														key={creator.rank}
														className='flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50'>
														<div className='flex items-center gap-2'>
															{getRankIcon(creator.rank)}
															<div
																className={`w-2 h-8 rounded ${getBadgeColor(
																	creator.badge
																)}`}
															/>
														</div>

														<Avatar className='h-10 w-10'>
															<AvatarImage src={creator.user.avatar} />
															<AvatarFallback>
																{creator.user.name[0]}
															</AvatarFallback>
														</Avatar>

														<div className='flex-1'>
															<div className='flex items-center gap-2'>
																<h3 className='font-semibold text-sm'>
																	{creator.user.name}
																</h3>
																{creator.user.verified && (
																	<Badge variant='outline' className='text-xs'>
																		Verified
																	</Badge>
																)}
															</div>
															<div className='text-xs text-gray-500'>
																{creator.stats.aisCreated} AIs •{' '}
																{creator.stats.totalUsers.toLocaleString()}{' '}
																users
															</div>
															<div className='flex items-center gap-2 text-xs'>
																<Star className='h-3 w-3 text-yellow-500' />
																<span>{creator.stats.averageRating}</span>
																<span className='text-gray-400'>•</span>
																<span className='text-green-600'>
																	${creator.stats.revenue.toFixed(0)}
																</span>
															</div>
														</div>

														<div className='flex items-center gap-1'>
															{getChangeIcon(creator.change)}
														</div>
													</div>
												))}
											</div>
										</CardContent>
									</Card>

									{/* Top AIs */}
									<Card>
										<CardHeader>
											<CardTitle className='flex items-center gap-2'>
												<Bot className='h-5 w-5 text-purple-600' />
												Top AIs
											</CardTitle>
											<CardDescription>
												Most popular AIs by user count and ratings
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className='space-y-4'>
												{leaderboards.topAIs.map((ai) => (
													<div
														key={ai.rank}
														className='flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50'>
														<div className='flex items-center gap-2'>
															{getRankIcon(ai.rank)}
														</div>

														<Avatar className='h-10 w-10'>
															<AvatarImage src={ai.ai.avatar} />
															<AvatarFallback>{ai.ai.name[0]}</AvatarFallback>
														</Avatar>

														<div className='flex-1'>
															<h3 className='font-semibold text-sm'>
																{ai.ai.name}
															</h3>
															<div className='text-xs text-gray-500'>
																by {ai.ai.creator} • {ai.ai.category}
															</div>
															<div className='flex items-center gap-2 text-xs'>
																<Star className='h-3 w-3 text-yellow-500' />
																<span>{ai.stats.rating}</span>
																<span className='text-gray-400'>•</span>
																<span>
																	{ai.stats.users.toLocaleString()} users
																</span>
															</div>
														</div>

														<div className='flex items-center gap-1'>
															{getChangeIcon(ai.change)}
														</div>
													</div>
												))}
											</div>
										</CardContent>
									</Card>
								</div>
							</TabsContent>

							<TabsContent value='reviews' className='space-y-6 mt-6'>
								{/* Review Filters */}
								<Card>
									<CardContent className='p-4'>
										<div className='flex gap-4'>
											<Select defaultValue='recent'>
												<SelectTrigger className='w-48'>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='recent'>Most Recent</SelectItem>
													<SelectItem value='helpful'>Most Helpful</SelectItem>
													<SelectItem value='rating-high'>
														Highest Rated
													</SelectItem>
													<SelectItem value='rating-low'>
														Lowest Rated
													</SelectItem>
												</SelectContent>
											</Select>

											<Select defaultValue='all-ratings'>
												<SelectTrigger className='w-32'>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='all-ratings'>
														All Ratings
													</SelectItem>
													<SelectItem value='5'>5 Stars</SelectItem>
													<SelectItem value='4'>4 Stars</SelectItem>
													<SelectItem value='3'>3 Stars</SelectItem>
													<SelectItem value='2'>2 Stars</SelectItem>
													<SelectItem value='1'>1 Star</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</CardContent>
								</Card>

								{/* Reviews List */}
								<div className='space-y-6'>
									{recentReviews.map((review) => (
										<Card key={review.id}>
											<CardContent className='p-6'>
												<div className='flex items-start gap-4'>
													<Avatar className='h-10 w-10'>
														<AvatarImage src={review.user.avatar} />
														<AvatarFallback>
															{review.user.name[0]}
														</AvatarFallback>
													</Avatar>

													<div className='flex-1'>
														<div className='flex items-center gap-2 mb-2'>
															<h3 className='font-semibold'>
																{review.user.name}
															</h3>
															{review.user.verified && (
																<Badge variant='outline' className='text-xs'>
																	Verified
																</Badge>
															)}
															<span className='text-gray-400'>•</span>
															<span className='text-sm text-gray-500'>
																{review.timestamp}
															</span>
														</div>

														<div className='flex items-center gap-2 mb-2'>
															<div className='flex items-center gap-1'>
																{[1, 2, 3, 4, 5].map((star) => (
																	<Star
																		key={star}
																		className={`h-4 w-4 ${
																			star <= review.rating
																				? 'fill-yellow-400 text-yellow-400'
																				: 'text-gray-300'
																		}`}
																	/>
																))}
															</div>
															<span className='text-sm text-gray-500'>
																for{' '}
																<Link
																	href={`/ai/${review.ai.name}`}
																	className='text-blue-600 hover:underline'>
																	{review.ai.name}
																</Link>
															</span>
														</div>

														<p className='text-gray-700 mb-4'>{review.text}</p>

														<div className='flex items-center gap-4'>
															<Button
																variant='ghost'
																size='sm'
																className={
																	review.hasUserVoted ? 'text-blue-600' : ''
																}>
																<ThumbsUp className='h-4 w-4 mr-1' />
																Helpful ({review.helpful})
															</Button>

															<Button variant='ghost' size='sm'>
																<ThumbsDown className='h-4 w-4 mr-1' />
																Not Helpful
															</Button>

															<Button variant='ghost' size='sm'>
																<MessageSquare className='h-4 w-4 mr-1' />
																Reply
															</Button>

															<Button variant='ghost' size='sm'>
																<Flag className='h-4 w-4 mr-1' />
																Report
															</Button>
														</div>
													</div>

													<Button variant='ghost' size='sm'>
														<MoreHorizontal className='h-4 w-4' />
													</Button>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							</TabsContent>

							<TabsContent value='highlights' className='space-y-6 mt-6'>
								<div className='space-y-6'>
									{communityHighlights.map((highlight) => (
										<Card key={highlight.id}>
											<CardContent className='p-6'>
												<div className='flex items-start gap-4'>
													<div className='p-2 bg-purple-100 rounded-lg'>
														{highlight.type === 'achievement' && (
															<Trophy className='h-5 w-5 text-purple-600' />
														)}
														{highlight.type === 'featured' && (
															<Star className='h-5 w-5 text-purple-600' />
														)}
														{highlight.type === 'community' && (
															<Users className='h-5 w-5 text-purple-600' />
														)}
													</div>

													<div className='flex-1'>
														<div className='flex items-center gap-2 mb-2'>
															<h3 className='font-semibold'>
																{highlight.title}
															</h3>
															<Badge
																variant='outline'
																className='text-xs capitalize'>
																{highlight.type}
															</Badge>
														</div>

														<p className='text-gray-700 mb-3'>
															{highlight.description}
														</p>

														{(highlight.user || highlight.ai) && (
															<div className='flex items-center gap-2 mb-3'>
																<Avatar className='h-6 w-6'>
																	<AvatarImage
																		src={
																			(highlight.user || highlight.ai)?.avatar
																		}
																	/>
																	<AvatarFallback>
																		{(highlight.user || highlight.ai)?.name[0]}
																	</AvatarFallback>
																</Avatar>
																<span className='text-sm text-gray-600'>
																	{highlight.user?.name || highlight.ai?.name}
																</span>
															</div>
														)}

														<div className='flex items-center justify-between'>
															<div className='flex items-center gap-4 text-sm text-gray-500'>
																<span>{highlight.timestamp}</span>
																<div className='flex items-center gap-2'>
																	<Heart className='h-4 w-4' />
																	<span>{highlight.reactions.likes}</span>
																</div>
																<div className='flex items-center gap-2'>
																	<MessageSquare className='h-4 w-4' />
																	<span>{highlight.reactions.comments}</span>
																</div>
															</div>

															<div className='flex items-center gap-2'>
																<Button variant='ghost' size='sm'>
																	<Heart className='h-4 w-4 mr-1' />
																	Like
																</Button>
																<Button variant='ghost' size='sm'>
																	<Share className='h-4 w-4 mr-1' />
																	Share
																</Button>
															</div>
														</div>
													</div>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</div>
		</div>
	);
}
