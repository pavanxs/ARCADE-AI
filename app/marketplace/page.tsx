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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import {
	Search,
	Filter,
	Star,
	Users,
	Bot,
	Gamepad2,
	Briefcase,
	GraduationCap,
	Heart,
	DollarSign,
	TrendingUp,
	Clock,
	Zap,
	Crown,
	ChevronDown,
	Grid3X3,
	List,
} from 'lucide-react';
import Link from 'next/link';

export default function Marketplace() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [priceRange, setPriceRange] = useState([0, 100]);
	const [sortBy, setSortBy] = useState('popular');
	const [viewMode, setViewMode] = useState('grid');
	const [showFilters, setShowFilters] = useState(false);

	const categories = [
		{ id: 'all', name: 'All Categories', icon: Bot, count: 1247 },
		{ id: 'productivity', name: 'Productivity', icon: Briefcase, count: 342 },
		{ id: 'games', name: 'Games & Entertainment', icon: Gamepad2, count: 256 },
		{ id: 'education', name: 'Education', icon: GraduationCap, count: 189 },
		{ id: 'wellness', name: 'Wellness', icon: Heart, count: 145 },
		{ id: 'finance', name: 'Finance', icon: DollarSign, count: 98 },
		{ id: 'creative', name: 'Creative', icon: Zap, count: 217 },
	];

	const ais = [
		{
			id: 1,
			name: 'CodeMaster Pro',
			description:
				'Advanced coding assistant that helps you write, debug, and optimize code across all programming languages with intelligent suggestions.',
			category: 'Productivity',
			rating: 4.9,
			reviewCount: 1284,
			users: '15.2k',
			price: 9.99,
			priceType: 'monthly',
			badge: 'Popular',
			creator: 'TechWiz Studios',
			avatar: '/api/placeholder/60/60',
			tags: ['Programming', 'Debugging', 'Code Review'],
			verified: true,
			featured: true,
		},
		{
			id: 2,
			name: 'Therapy Companion',
			description:
				'Empathetic AI therapist providing 24/7 mental health support with evidence-based therapeutic techniques and personalized guidance.',
			category: 'Wellness',
			rating: 4.8,
			reviewCount: 892,
			users: '8.7k',
			price: 0,
			priceType: 'free',
			badge: 'Trending',
			creator: 'MindSpace AI',
			avatar: '/api/placeholder/60/60',
			tags: ['Mental Health', 'CBT', 'Mindfulness'],
			verified: true,
			featured: false,
		},
		{
			id: 3,
			name: 'CryptoTrader Elite',
			description:
				'AI-powered cryptocurrency trading bot with advanced technical analysis, risk management, and automated portfolio optimization.',
			category: 'Finance',
			rating: 4.7,
			reviewCount: 567,
			users: '12.1k',
			price: 29.99,
			priceType: 'monthly',
			badge: 'Hot',
			creator: 'FinanceAI Labs',
			avatar: '/api/placeholder/60/60',
			tags: ['Trading', 'Crypto', 'Analysis'],
			verified: true,
			featured: true,
		},
		{
			id: 4,
			name: 'Story Weaver',
			description:
				'Creative writing companion that helps authors develop plots, characters, and narratives with intelligent story generation.',
			category: 'Creative',
			rating: 4.6,
			reviewCount: 423,
			users: '5.8k',
			price: 14.99,
			priceType: 'monthly',
			badge: 'New',
			creator: 'Creative Minds Co',
			avatar: '/api/placeholder/60/60',
			tags: ['Writing', 'Creative', 'Stories'],
			verified: false,
			featured: false,
		},
		{
			id: 5,
			name: 'Language Master',
			description:
				'Personalized language learning AI that adapts to your pace and learning style with conversation practice and grammar correction.',
			category: 'Education',
			rating: 4.8,
			reviewCount: 789,
			users: '9.3k',
			price: 19.99,
			priceType: 'monthly',
			badge: 'Bestseller',
			creator: 'EduTech Solutions',
			avatar: '/api/placeholder/60/60',
			tags: ['Language', 'Learning', 'Conversation'],
			verified: true,
			featured: true,
		},
		{
			id: 6,
			name: 'Game Master AI',
			description:
				'Dynamic dungeon master for tabletop RPGs, creating immersive campaigns with intelligent storytelling and character interactions.',
			category: 'Games',
			rating: 4.9,
			reviewCount: 654,
			users: '7.2k',
			price: 12.99,
			priceType: 'monthly',
			badge: "Editor's Choice",
			creator: 'RPG Studios',
			avatar: '/api/placeholder/60/60',
			tags: ['RPG', 'Storytelling', 'Gaming'],
			verified: true,
			featured: false,
		},
	];

	const filteredAIs = ais.filter((ai) => {
		const matchesSearch =
			ai.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			ai.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			ai.tags.some((tag) =>
				tag.toLowerCase().includes(searchQuery.toLowerCase())
			);
		const matchesCategory =
			selectedCategory === 'all' ||
			ai.category.toLowerCase() === selectedCategory;
		const matchesPrice = ai.price >= priceRange[0] && ai.price <= priceRange[1];
		return matchesSearch && matchesCategory && matchesPrice;
	});

	const sortedAIs = [...filteredAIs].sort((a, b) => {
		switch (sortBy) {
			case 'popular':
				return b.users.localeCompare(a.users);
			case 'rating':
				return b.rating - a.rating;
			case 'price-low':
				return a.price - b.price;
			case 'price-high':
				return b.price - a.price;
			case 'newest':
				return b.id - a.id;
			default:
				return 0;
		}
	});

	return (
		<div className='min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100'>
			{/* Header */}
			<header className='border-b bg-white/80 backdrop-blur-md sticky top-0 z-50'>
				<div className='container mx-auto px-4 py-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-4'>
							<Link href='/dashboard' className='flex items-center space-x-2'>
								<Bot className='h-8 w-8 text-purple-600' />
								<span className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
									AI Marketplace
								</span>
							</Link>
						</div>

						<div className='flex-1 max-w-xl mx-8'>
							<div className='relative'>
								<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
								<Input
									placeholder='Search AIs, creators, tags...'
									className='pl-10 bg-white/70'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>
						</div>

						<div className='flex items-center space-x-4'>
							<Button variant='outline' asChild>
								<Link href='/dashboard'>Dashboard</Link>
							</Button>
							<Button asChild>
								<Link href='/create'>Create AI</Link>
							</Button>
						</div>
					</div>
				</div>
			</header>

			<div className='container mx-auto px-4 py-8'>
				<div className='flex gap-8'>
					{/* Sidebar Filters */}
					<div className='w-80 space-y-6'>
						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<Filter className='h-5 w-5' />
									Filters
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-6'>
								{/* Categories */}
								<div>
									<h3 className='font-semibold mb-3'>Categories</h3>
									<div className='space-y-2'>
										{categories.map((category) => {
											const Icon = category.icon;
											return (
												<div
													key={category.id}
													className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
														selectedCategory === category.id
															? 'bg-purple-100 text-purple-700'
															: 'hover:bg-gray-100'
													}`}
													onClick={() => setSelectedCategory(category.id)}>
													<div className='flex items-center gap-2'>
														<Icon className='h-4 w-4' />
														<span className='text-sm'>{category.name}</span>
													</div>
													<span className='text-xs text-gray-500'>
														{category.count}
													</span>
												</div>
											);
										})}
									</div>
								</div>

								{/* Price Range */}
								<div>
									<h3 className='font-semibold mb-3'>Price Range</h3>
									<div className='space-y-3'>
										<Slider
											value={priceRange}
											onValueChange={setPriceRange}
											max={100}
											step={1}
											className='w-full'
										/>
										<div className='flex justify-between text-sm text-gray-500'>
											<span>${priceRange[0]}</span>
											<span>${priceRange[1]}+</span>
										</div>
									</div>
								</div>

								{/* Rating */}
								<div>
									<h3 className='font-semibold mb-3'>Minimum Rating</h3>
									<div className='space-y-2'>
										{[4.5, 4.0, 3.5, 3.0].map((rating) => (
											<div key={rating} className='flex items-center space-x-2'>
												<Checkbox id={`rating-${rating}`} />
												<label
													htmlFor={`rating-${rating}`}
													className='flex items-center gap-1 text-sm'>
													<Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
													{rating}+ ({Math.floor(Math.random() * 500) + 100})
												</label>
											</div>
										))}
									</div>
								</div>

								{/* Features */}
								<div>
									<h3 className='font-semibold mb-3'>Features</h3>
									<div className='space-y-2'>
										{[
											'Free Trial',
											'API Access',
											'Custom Training',
											'Multi-language',
											'Real-time',
										].map((feature) => (
											<div
												key={feature}
												className='flex items-center space-x-2'>
												<Checkbox id={feature} />
												<label htmlFor={feature} className='text-sm'>
													{feature}
												</label>
											</div>
										))}
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Main Content */}
					<div className='flex-1'>
						{/* Top Bar */}
						<div className='flex items-center justify-between mb-6'>
							<div>
								<h1 className='text-3xl font-bold mb-2'>AI Marketplace</h1>
								<p className='text-gray-600'>
									Showing {sortedAIs.length} of {ais.length} AIs
									{selectedCategory !== 'all' &&
										` in ${
											categories.find((c) => c.id === selectedCategory)?.name
										}`}
								</p>
							</div>

							<div className='flex items-center gap-4'>
								<Select value={sortBy} onValueChange={setSortBy}>
									<SelectTrigger className='w-48'>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='popular'>Most Popular</SelectItem>
										<SelectItem value='rating'>Highest Rated</SelectItem>
										<SelectItem value='newest'>Newest</SelectItem>
										<SelectItem value='price-low'>
											Price: Low to High
										</SelectItem>
										<SelectItem value='price-high'>
											Price: High to Low
										</SelectItem>
									</SelectContent>
								</Select>

								<div className='flex border rounded-lg'>
									<Button
										variant={viewMode === 'grid' ? 'default' : 'ghost'}
										size='sm'
										onClick={() => setViewMode('grid')}>
										<Grid3X3 className='h-4 w-4' />
									</Button>
									<Button
										variant={viewMode === 'list' ? 'default' : 'ghost'}
										size='sm'
										onClick={() => setViewMode('list')}>
										<List className='h-4 w-4' />
									</Button>
								</div>
							</div>
						</div>

						{/* Featured AIs */}
						{selectedCategory === 'all' && (
							<div className='mb-8'>
								<h2 className='text-xl font-semibold mb-4 flex items-center gap-2'>
									<Crown className='h-5 w-5 text-yellow-500' />
									Featured AIs
								</h2>
								<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
									{ais
										.filter((ai) => ai.featured)
										.slice(0, 3)
										.map((ai) => (
											<Card
												key={ai.id}
												className='border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50'>
												<CardContent className='p-6'>
													<div className='flex items-start gap-4'>
														<Avatar className='h-12 w-12'>
															<AvatarImage src={ai.avatar} />
															<AvatarFallback>{ai.name[0]}</AvatarFallback>
														</Avatar>
														<div className='flex-1'>
															<div className='flex items-center gap-2 mb-1'>
																<h3 className='font-semibold'>{ai.name}</h3>
																{ai.verified && (
																	<Badge variant='secondary'>Verified</Badge>
																)}
																<Badge className='bg-yellow-500'>
																	{ai.badge}
																</Badge>
															</div>
															<p className='text-sm text-gray-600 mb-3 line-clamp-2'>
																{ai.description}
															</p>
															<div className='flex items-center gap-4 text-sm text-gray-500 mb-3'>
																<span className='flex items-center gap-1'>
																	<Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
																	{ai.rating} ({ai.reviewCount})
																</span>
																<span className='flex items-center gap-1'>
																	<Users className='h-3 w-3' />
																	{ai.users}
																</span>
															</div>
															<div className='flex items-center justify-between'>
																<div>
																	<p className='font-semibold text-purple-600'>
																		{ai.price === 0
																			? 'Free'
																			: `$${ai.price}/${ai.priceType}`}
																	</p>
																</div>
																<Button size='sm' asChild>
																	<Link href={`/ai/${ai.id}`}>
																		View Details
																	</Link>
																</Button>
															</div>
														</div>
													</div>
												</CardContent>
											</Card>
										))}
								</div>
							</div>
						)}

						{/* AI Grid/List */}
						<div
							className={
								viewMode === 'grid'
									? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'
									: 'space-y-4'
							}>
							{sortedAIs.map((ai) => (
								<Card
									key={ai.id}
									className={`hover:shadow-lg transition-shadow ${
										viewMode === 'list' ? 'flex' : ''
									}`}>
									<CardContent
										className={`${
											viewMode === 'list'
												? 'flex items-center gap-6 p-6'
												: 'p-6'
										}`}>
										<div
											className={`flex ${
												viewMode === 'list'
													? 'items-center gap-4'
													: 'items-start gap-4 mb-4'
											}`}>
											<Avatar className='h-12 w-12 flex-shrink-0'>
												<AvatarImage src={ai.avatar} />
												<AvatarFallback>{ai.name[0]}</AvatarFallback>
											</Avatar>
											<div className='flex-1 min-w-0'>
												<div className='flex items-center gap-2 mb-1'>
													<h3 className='font-semibold truncate'>{ai.name}</h3>
													{ai.verified && (
														<Badge variant='secondary' className='text-xs'>
															Verified
														</Badge>
													)}
													<Badge variant='outline' className='text-xs'>
														{ai.badge}
													</Badge>
												</div>
												<p className='text-sm text-gray-600 mb-2'>
													{ai.creator}
												</p>
												{viewMode === 'grid' && (
													<p className='text-sm text-gray-600 mb-3 line-clamp-2'>
														{ai.description}
													</p>
												)}
											</div>
										</div>

										{viewMode === 'list' && (
											<div className='flex-1 min-w-0'>
												<p className='text-sm text-gray-600 mb-2 line-clamp-1'>
													{ai.description}
												</p>
											</div>
										)}

										<div
											className={`flex ${
												viewMode === 'list'
													? 'flex-col items-end gap-2'
													: 'items-center justify-between'
											}`}>
											<div
												className={`flex ${
													viewMode === 'list'
														? 'flex-col items-end'
														: 'flex-col'
												}`}>
												<div className='flex items-center gap-4 text-sm text-gray-500 mb-2'>
													<span className='flex items-center gap-1'>
														<Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
														{ai.rating}
													</span>
													<span className='flex items-center gap-1'>
														<Users className='h-3 w-3' />
														{ai.users}
													</span>
												</div>
												<div className='flex flex-wrap gap-1 mb-3'>
													{ai.tags.slice(0, 2).map((tag) => (
														<Badge
															key={tag}
															variant='outline'
															className='text-xs'>
															{tag}
														</Badge>
													))}
												</div>
											</div>

											<div
												className={`flex items-center ${
													viewMode === 'list'
														? 'flex-col gap-2'
														: 'justify-between w-full'
												}`}>
												<p className='font-semibold text-purple-600'>
													{ai.price === 0
														? 'Free'
														: `$${ai.price}/${ai.priceType}`}
												</p>
												<Button size='sm' asChild>
													<Link href={`/ai/${ai.id}`}>
														{ai.price === 0 ? 'Try Free' : 'View Details'}
													</Link>
												</Button>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>

						{sortedAIs.length === 0 && (
							<div className='text-center py-12'>
								<Bot className='h-16 w-16 text-gray-400 mx-auto mb-4' />
								<h3 className='text-lg font-semibold text-gray-600 mb-2'>
									No AIs found
								</h3>
								<p className='text-gray-500'>
									Try adjusting your filters or search terms
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
