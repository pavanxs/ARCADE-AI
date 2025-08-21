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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
	Star,
	Users,
	Bot,
	Heart,
	Share,
	MessageCircle,
	Play,
	Shield,
	Clock,
	CheckCircle,
	ThumbsUp,
	ThumbsDown,
	ArrowLeft,
	ExternalLink,
	Globe,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function AIDetailPage() {
	const params = useParams();
	const [selectedPlan, setSelectedPlan] = useState('pro');
	const [chatMessage, setChatMessage] = useState('');
	const [isLiked, setIsLiked] = useState(false);
	const [reviewRating, setReviewRating] = useState(5);
	const [reviewText, setReviewText] = useState('');

	// Mock data - in real app, fetch based on params.id
	const ai = {
		id: params.id,
		name: 'CodeMaster Pro',
		description:
			'Advanced coding assistant that helps you write, debug, and optimize code across all programming languages with intelligent suggestions and real-time collaboration features.',
		longDescription:
			"CodeMaster Pro is the ultimate coding companion designed for developers of all skill levels. Powered by cutting-edge AI technology, it provides intelligent code suggestions, automated debugging, code optimization, and real-time collaboration features. Whether you're working on web development, mobile apps, data science, or system programming, CodeMaster Pro adapts to your coding style and helps you write better code faster.",
		category: 'Productivity',
		rating: 4.9,
		reviewCount: 1284,
		users: '15.2k',
		badge: 'Popular',
		creator: {
			name: 'TechWiz Studios',
			avatar: '/api/placeholder/40/40',
			verified: true,
			followers: '2.3k',
			aisCreated: 12,
		},
		avatar: '/api/placeholder/80/80',
		tags: [
			'Programming',
			'Debugging',
			'Code Review',
			'AI Assistant',
			'Developer Tools',
		],
		verified: true,
		featured: true,
		lastUpdated: '2024-01-15',
		version: '2.1.4',
		languages: [
			'JavaScript',
			'Python',
			'Java',
			'C++',
			'TypeScript',
			'Go',
			'Rust',
		],
		features: [
			'Real-time code suggestions',
			'Advanced debugging assistance',
			'Code optimization recommendations',
			'Multi-language support',
			'Integration with popular IDEs',
			'Collaborative coding sessions',
			'Custom model training',
			'API access',
		],
		screenshots: [
			'/api/placeholder/600/400',
			'/api/placeholder/600/400',
			'/api/placeholder/600/400',
		],
		demo: 'https://demo.codemaster.ai',
		website: 'https://codemaster.ai',
		support: 'support@codemaster.ai',
	};

	const plans = [
		{
			id: 'free',
			name: 'Free',
			price: 0,
			period: 'forever',
			features: [
				'Basic code suggestions',
				'100 queries per month',
				'Community support',
				'Basic debugging',
			],
			limitations: ['Limited queries', 'No API access'],
		},
		{
			id: 'pro',
			name: 'Pro',
			price: 9.99,
			period: 'month',
			popular: true,
			features: [
				'Unlimited code suggestions',
				'Advanced debugging',
				'Priority support',
				'IDE integrations',
				'Custom templates',
				'Collaboration features',
			],
			limitations: [],
		},
		{
			id: 'enterprise',
			name: 'Enterprise',
			price: 29.99,
			period: 'month',
			features: [
				'Everything in Pro',
				'Custom model training',
				'API access',
				'Team management',
				'Advanced analytics',
				'Dedicated support',
				'On-premise deployment',
			],
			limitations: [],
		},
	];

	const reviews = [
		{
			id: 1,
			user: 'Sarah Chen',
			avatar: '/api/placeholder/32/32',
			rating: 5,
			date: '2024-01-10',
			text: 'Absolutely amazing! CodeMaster Pro has completely transformed my coding workflow. The suggestions are spot-on and have saved me countless hours.',
			helpful: 23,
			verified: true,
		},
		{
			id: 2,
			user: 'Mike Rodriguez',
			avatar: '/api/placeholder/32/32',
			rating: 4,
			date: '2024-01-08',
			text: 'Great tool for debugging complex issues. The AI really understands context well. Could use more language support though.',
			helpful: 15,
			verified: true,
		},
		{
			id: 3,
			user: 'Alex Kumar',
			avatar: '/api/placeholder/32/32',
			rating: 5,
			date: '2024-01-05',
			text: "The collaborative features are fantastic. My team's productivity has increased significantly since we started using this.",
			helpful: 31,
			verified: false,
		},
	];

	const relatedAIs = [
		{
			id: 2,
			name: 'Debug Detective',
			rating: 4.7,
			price: 7.99,
			category: 'Productivity',
		},
		{
			id: 3,
			name: 'Code Reviewer AI',
			rating: 4.8,
			price: 12.99,
			category: 'Productivity',
		},
		{
			id: 4,
			name: 'API Generator Pro',
			rating: 4.6,
			price: 15.99,
			category: 'Productivity',
		},
	];

	return (
		<div className='min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100'>
			{/* Header */}
			<header className='border-b bg-white/80 backdrop-blur-md sticky top-0 z-50'>
				<div className='container mx-auto px-4 py-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-4'>
							<Button variant='ghost' asChild>
								<Link href='/marketplace'>
									<ArrowLeft className='h-4 w-4 mr-2' />
									Back to Marketplace
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
							<Button variant='outline' onClick={() => setIsLiked(!isLiked)}>
								<Heart
									className={`h-4 w-4 mr-2 ${
										isLiked ? 'fill-red-500 text-red-500' : ''
									}`}
								/>
								{isLiked ? 'Liked' : 'Like'}
							</Button>
							<Button variant='outline'>
								<Share className='h-4 w-4 mr-2' />
								Share
							</Button>
						</div>
					</div>
				</div>
			</header>

			<div className='container mx-auto px-4 py-8'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Main Content */}
					<div className='lg:col-span-2 space-y-8'>
						{/* AI Header */}
						<Card>
							<CardContent className='p-8'>
								<div className='flex items-start gap-6'>
									<Avatar className='h-20 w-20'>
										<AvatarImage src={ai.avatar} />
										<AvatarFallback>{ai.name[0]}</AvatarFallback>
									</Avatar>

									<div className='flex-1'>
										<div className='flex items-center gap-3 mb-2'>
											<h1 className='text-3xl font-bold'>{ai.name}</h1>
											{ai.verified && (
												<Badge className='bg-blue-500'>
													<Shield className='h-3 w-3 mr-1' />
													Verified
												</Badge>
											)}
											<Badge variant='secondary'>{ai.badge}</Badge>
										</div>

										<p className='text-gray-600 mb-4'>{ai.description}</p>

										<div className='flex items-center gap-6 mb-4'>
											<div className='flex items-center gap-1'>
												<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
												<span className='font-semibold'>{ai.rating}</span>
												<span className='text-gray-500'>
													({ai.reviewCount} reviews)
												</span>
											</div>
											<div className='flex items-center gap-1'>
												<Users className='h-4 w-4 text-gray-400' />
												<span>{ai.users} users</span>
											</div>
											<div className='flex items-center gap-1'>
												<Clock className='h-4 w-4 text-gray-400' />
												<span>Updated {ai.lastUpdated}</span>
											</div>
										</div>

										<div className='flex items-center gap-4'>
											<div className='flex items-center gap-2'>
												<Avatar className='h-8 w-8'>
													<AvatarImage src={ai.creator.avatar} />
													<AvatarFallback>{ai.creator.name[0]}</AvatarFallback>
												</Avatar>
												<div>
													<p className='font-medium text-sm'>
														{ai.creator.name}
													</p>
													<p className='text-xs text-gray-500'>
														{ai.creator.followers} followers
													</p>
												</div>
											</div>
											<Button variant='outline' size='sm'>
												Follow
											</Button>
										</div>
									</div>
								</div>

								<div className='flex flex-wrap gap-2 mt-6'>
									{ai.tags.map((tag) => (
										<Badge key={tag} variant='outline'>
											{tag}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Demo Section */}
						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<Play className='h-5 w-5 text-green-600' />
									Try It Now
								</CardTitle>
								<CardDescription>
									Test the AI before you buy. Type a message to see how it
									responds.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='bg-gray-50 rounded-lg p-4 mb-4 min-h-[200px]'>
									<div className='space-y-4'>
										<div className='flex gap-3'>
											<Avatar className='h-8 w-8'>
												<AvatarFallback>You</AvatarFallback>
											</Avatar>
											<div className='bg-white rounded-lg p-3 max-w-sm'>
												<p className='text-sm'>
													Can you help me optimize this Python function?
												</p>
											</div>
										</div>
										<div className='flex gap-3'>
											<Avatar className='h-8 w-8'>
												<AvatarImage src={ai.avatar} />
												<AvatarFallback>{ai.name[0]}</AvatarFallback>
											</Avatar>
											<div className='bg-purple-100 rounded-lg p-3 max-w-md'>
												<p className='text-sm'>
													I&apos;d be happy to help! Please share your Python
													function and I&apos;ll analyze it for performance
													optimizations, suggest improvements, and explain the
													reasoning behind each suggestion.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className='flex gap-3'>
									<Input
										placeholder='Type your message here...'
										value={chatMessage}
										onChange={(e) => setChatMessage(e.target.value)}
										className='flex-1'
									/>
									<Button>
										<MessageCircle className='h-4 w-4 mr-2' />
										Send
									</Button>
								</div>
							</CardContent>
						</Card>

						{/* Detailed Tabs */}
						<Card>
							<Tabs defaultValue='overview' className='w-full'>
								<TabsList className='grid w-full grid-cols-4'>
									<TabsTrigger value='overview'>Overview</TabsTrigger>
									<TabsTrigger value='features'>Features</TabsTrigger>
									<TabsTrigger value='reviews'>Reviews</TabsTrigger>
									<TabsTrigger value='support'>Support</TabsTrigger>
								</TabsList>

								<TabsContent value='overview' className='p-6'>
									<div className='space-y-6'>
										<div>
											<h3 className='text-lg font-semibold mb-3'>
												About {ai.name}
											</h3>
											<p className='text-gray-600 leading-relaxed'>
												{ai.longDescription}
											</p>
										</div>

										<div>
											<h3 className='text-lg font-semibold mb-3'>
												Supported Languages
											</h3>
											<div className='flex flex-wrap gap-2'>
												{ai.languages.map((lang) => (
													<Badge key={lang} variant='outline'>
														{lang}
													</Badge>
												))}
											</div>
										</div>

										<div>
											<h3 className='text-lg font-semibold mb-3'>
												Screenshots
											</h3>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												{ai.screenshots.map((screenshot, index) => (
													<div
														key={index}
														className='border rounded-lg overflow-hidden'>
														<Image
															src={screenshot}
															alt={`Screenshot ${index + 1}`}
															width={600}
															height={400}
															sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
															className='w-full h-48 object-cover'
														/>
													</div>
												))}
											</div>
										</div>
									</div>
								</TabsContent>

								<TabsContent value='features' className='p-6'>
									<div className='grid gap-4'>
										{ai.features.map((feature, index) => (
											<div
												key={index}
												className='flex items-center gap-3 p-3 border rounded-lg'>
												<CheckCircle className='h-5 w-5 text-green-500' />
												<span>{feature}</span>
											</div>
										))}
									</div>
								</TabsContent>

								<TabsContent value='reviews' className='p-6'>
									<div className='space-y-6'>
										{/* Review Summary */}
										<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
											<div>
												<h3 className='text-lg font-semibold mb-3'>
													Overall Rating
												</h3>
												<div className='flex items-center gap-4 mb-4'>
													<span className='text-4xl font-bold'>
														{ai.rating}
													</span>
													<div>
														<div className='flex items-center gap-1 mb-1'>
															{[1, 2, 3, 4, 5].map((star) => (
																<Star
																	key={star}
																	className={`h-4 w-4 ${
																		star <= Math.floor(ai.rating)
																			? 'fill-yellow-400 text-yellow-400'
																			: 'text-gray-300'
																	}`}
																/>
															))}
														</div>
														<p className='text-sm text-gray-500'>
															{ai.reviewCount} reviews
														</p>
													</div>
												</div>

												{/* Rating Distribution */}
												<div className='space-y-2'>
													{[5, 4, 3, 2, 1].map((stars) => (
														<div
															key={stars}
															className='flex items-center gap-3'>
															<span className='text-sm w-8'>{stars}★</span>
															<Progress
																value={stars === 5 ? 75 : stars === 4 ? 20 : 5}
																className='flex-1'
															/>
															<span className='text-sm text-gray-500 w-12'>
																{stars === 5
																	? '75%'
																	: stars === 4
																	? '20%'
																	: '5%'}
															</span>
														</div>
													))}
												</div>
											</div>

											{/* Write Review */}
											<div>
												<h3 className='text-lg font-semibold mb-3'>
													Write a Review
												</h3>
												<div className='space-y-4'>
													<div>
														<label className='text-sm font-medium mb-2 block'>
															Rating
														</label>
														<div className='flex gap-1'>
															{[1, 2, 3, 4, 5].map((star) => (
																<Star
																	key={star}
																	className={`h-6 w-6 cursor-pointer ${
																		star <= reviewRating
																			? 'fill-yellow-400 text-yellow-400'
																			: 'text-gray-300'
																	}`}
																	onClick={() => setReviewRating(star)}
																/>
															))}
														</div>
													</div>
													<div>
														<label className='text-sm font-medium mb-2 block'>
															Your Review
														</label>
														<Textarea
															placeholder='Share your experience with this AI...'
															value={reviewText}
															onChange={(e) => setReviewText(e.target.value)}
														/>
													</div>
													<Button className='w-full'>Submit Review</Button>
												</div>
											</div>
										</div>

										{/* Reviews List */}
										<div className='space-y-4'>
											<h3 className='text-lg font-semibold'>Recent Reviews</h3>
											{reviews.map((review) => (
												<div key={review.id} className='border rounded-lg p-4'>
													<div className='flex items-start gap-4'>
														<Avatar className='h-10 w-10'>
															<AvatarImage src={review.avatar} />
															<AvatarFallback>{review.user[0]}</AvatarFallback>
														</Avatar>
														<div className='flex-1'>
															<div className='flex items-center gap-2 mb-2'>
																<span className='font-medium'>
																	{review.user}
																</span>
																{review.verified && (
																	<Badge variant='outline' className='text-xs'>
																		Verified
																	</Badge>
																)}
																<span className='text-sm text-gray-500'>
																	{review.date}
																</span>
															</div>
															<div className='flex items-center gap-1 mb-2'>
																{[1, 2, 3, 4, 5].map((star) => (
																	<Star
																		key={star}
																		className={`h-3 w-3 ${
																			star <= review.rating
																				? 'fill-yellow-400 text-yellow-400'
																				: 'text-gray-300'
																		}`}
																	/>
																))}
															</div>
															<p className='text-gray-600 mb-3'>
																{review.text}
															</p>
															<div className='flex items-center gap-4'>
																<Button variant='ghost' size='sm'>
																	<ThumbsUp className='h-3 w-3 mr-1' />
																	Helpful ({review.helpful})
																</Button>
																<Button variant='ghost' size='sm'>
																	<ThumbsDown className='h-3 w-3 mr-1' />
																	Not Helpful
																</Button>
															</div>
														</div>
													</div>
												</div>
											))}
										</div>
									</div>
								</TabsContent>

								<TabsContent value='support' className='p-6'>
									<div className='space-y-6'>
										<div>
											<h3 className='text-lg font-semibold mb-3'>Get Help</h3>
											<div className='grid gap-4'>
												<Button
													variant='outline'
													className='justify-start'
													asChild>
													<a
														href={ai.demo}
														target='_blank'
														rel='noopener noreferrer'>
														<ExternalLink className='h-4 w-4 mr-2' />
														Live Demo
													</a>
												</Button>
												<Button
													variant='outline'
													className='justify-start'
													asChild>
													<a
														href={ai.website}
														target='_blank'
														rel='noopener noreferrer'>
														<Globe className='h-4 w-4 mr-2' />
														Official Website
													</a>
												</Button>
												<Button
													variant='outline'
													className='justify-start'
													asChild>
													<a href={`mailto:${ai.support}`}>
														<MessageCircle className='h-4 w-4 mr-2' />
														Contact Support
													</a>
												</Button>
											</div>
										</div>

										<div>
											<h3 className='text-lg font-semibold mb-3'>
												Technical Details
											</h3>
											<div className='space-y-2 text-sm'>
												<div className='flex justify-between'>
													<span className='text-gray-600'>Version:</span>
													<span>{ai.version}</span>
												</div>
												<div className='flex justify-between'>
													<span className='text-gray-600'>Last Updated:</span>
													<span>{ai.lastUpdated}</span>
												</div>
												<div className='flex justify-between'>
													<span className='text-gray-600'>Category:</span>
													<span>{ai.category}</span>
												</div>
											</div>
										</div>
									</div>
								</TabsContent>
							</Tabs>
						</Card>
					</div>

					{/* Sidebar */}
					<div className='space-y-6'>
						{/* Pricing Plans */}
						<Card>
							<CardHeader>
								<CardTitle>Choose Your Plan</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								{plans.map((plan) => (
									<div
										key={plan.id}
										className={`border rounded-lg p-4 cursor-pointer transition-colors ${
											selectedPlan === plan.id
												? 'border-purple-500 bg-purple-50'
												: 'hover:border-gray-300'
										} ${plan.popular ? 'border-purple-500 bg-purple-50' : ''}`}
										onClick={() => setSelectedPlan(plan.id)}>
										<div className='flex items-center justify-between mb-2'>
											<h3 className='font-semibold'>{plan.name}</h3>
											{plan.popular && <Badge>Popular</Badge>}
										</div>
										<div className='mb-3'>
											<span className='text-2xl font-bold'>${plan.price}</span>
											<span className='text-gray-500'>/{plan.period}</span>
										</div>
										<ul className='space-y-1 text-sm'>
											{plan.features.slice(0, 3).map((feature, index) => (
												<li key={index} className='flex items-center gap-2'>
													<CheckCircle className='h-3 w-3 text-green-500' />
													{feature}
												</li>
											))}
											{plan.features.length > 3 && (
												<li className='text-gray-500'>
													+{plan.features.length - 3} more features
												</li>
											)}
										</ul>
									</div>
								))}

								<Button className='w-full' size='lg'>
									{plans.find((p) => p.id === selectedPlan)?.price === 0
										? 'Get Started Free'
										: 'Subscribe Now'}
								</Button>

								<div className='text-center'>
									<Button variant='outline' className='w-full'>
										<Play className='h-4 w-4 mr-2' />
										Try Free Demo
									</Button>
								</div>
							</CardContent>
						</Card>

						{/* Related AIs */}
						<Card>
							<CardHeader>
								<CardTitle>Related AIs</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								{relatedAIs.map((relatedAI) => (
									<div
										key={relatedAI.id}
										className='flex items-center justify-between'>
										<div>
											<h4 className='font-medium'>{relatedAI.name}</h4>
											<div className='flex items-center gap-2 text-sm text-gray-500'>
												<Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
												{relatedAI.rating}
												<span>•</span>
												<span>${relatedAI.price}/mo</span>
											</div>
										</div>
										<Button size='sm' variant='outline' asChild>
											<Link href={`/ai/${relatedAI.id}`}>View</Link>
										</Button>
									</div>
								))}
							</CardContent>
						</Card>

						{/* Creator Info */}
						<Card>
							<CardHeader>
								<CardTitle>About the Creator</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='flex items-center gap-3 mb-4'>
									<Avatar className='h-12 w-12'>
										<AvatarImage src={ai.creator.avatar} />
										<AvatarFallback>{ai.creator.name[0]}</AvatarFallback>
									</Avatar>
									<div>
										<h3 className='font-semibold'>{ai.creator.name}</h3>
										<p className='text-sm text-gray-500'>
											{ai.creator.followers} followers
										</p>
									</div>
								</div>
								<div className='space-y-2 text-sm'>
									<div className='flex justify-between'>
										<span className='text-gray-600'>AIs Created:</span>
										<span>{ai.creator.aisCreated}</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-gray-600'>Member Since:</span>
										<span>2022</span>
									</div>
								</div>
								<Button variant='outline' className='w-full mt-4'>
									View Profile
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
