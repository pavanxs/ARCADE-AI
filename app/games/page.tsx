'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import {
	Gamepad2,
	Users,
	Clock,
	Search,
	Play,
	Star,
	Brain,
	BookOpen,
	Sword,
	Puzzle,
	Crown,
	Eye,
	ArrowLeft,
	Plus,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function GamesHub() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [selectedDifficulty, setSelectedDifficulty] = useState('all');

	const gameCategories = [
		{ id: 'trivia', name: 'Trivia & Quiz', icon: Brain, color: 'yellow' },
		{
			id: 'creative',
			name: 'Creative Writing',
			icon: BookOpen,
			color: 'purple',
		},
		{ id: 'adventure', name: 'Text Adventures', icon: Sword, color: 'red' },
		{ id: 'puzzle', name: 'Logic Puzzles', icon: Puzzle, color: 'blue' },
		{ id: 'debate', name: 'Debate Games', icon: Users, color: 'green' },
		{ id: 'strategy', name: 'Strategy Games', icon: Crown, color: 'indigo' },
	];

	const featuredGames = [
		{
			id: 1,
			name: '90s Pop Culture Trivia Night',
			description:
				'Test your knowledge of the greatest decade in pop culture history',
			category: 'trivia',
			difficulty: 'Medium',
			currentPlayers: 24,
			maxPlayers: 30,
			host: 'Quiz Master 3000',
			hostAvatar: '/api/placeholder/40/40',
			status: 'live',
			featured: true,
			estimatedTime: '15-20 minutes',
			thumbnail: '/api/placeholder/300/200',
		},
		{
			id: 2,
			name: 'Collaborative Sci-Fi Adventure',
			description: 'Work together to create an epic science fiction story',
			category: 'creative',
			difficulty: 'Intermediate',
			currentPlayers: 6,
			maxPlayers: 8,
			host: 'Story Weaver AI',
			hostAvatar: '/api/placeholder/40/40',
			status: 'live',
			featured: true,
			estimatedTime: '45-60 minutes',
			thumbnail: '/api/placeholder/300/200',
		},
		{
			id: 3,
			name: 'Mystery of the Lost City',
			description:
				'Explore ancient ruins and solve puzzles in this text-based adventure',
			category: 'adventure',
			difficulty: 'Hard',
			currentPlayers: 1,
			maxPlayers: 1,
			host: 'Adventure Master',
			hostAvatar: '/api/placeholder/40/40',
			status: 'available',
			featured: true,
			estimatedTime: '30-45 minutes',
			thumbnail: '/api/placeholder/300/200',
		},
	];

	const availableGames = [
		{
			id: 4,
			name: 'Philosophy Debate Arena',
			description: 'Engage in deep philosophical discussions and debates',
			category: 'debate',
			difficulty: 'Hard',
			currentPlayers: 8,
			maxPlayers: 12,
			host: 'Socrates AI',
			hostAvatar: '/api/placeholder/40/40',
			status: 'live',
			featured: false,
			estimatedTime: '60 minutes',
			rating: 4.8,
		},
		{
			id: 5,
			name: 'Quick Math Challenge',
			description: 'Fast-paced mental math competition',
			category: 'trivia',
			difficulty: 'Easy',
			currentPlayers: 15,
			maxPlayers: 20,
			host: 'Math Bot',
			hostAvatar: '/api/placeholder/40/40',
			status: 'live',
			featured: false,
			estimatedTime: '10 minutes',
			rating: 4.6,
		},
		{
			id: 6,
			name: 'Poetry Slam',
			description: 'Create and share original poetry with the community',
			category: 'creative',
			difficulty: 'Easy',
			currentPlayers: 4,
			maxPlayers: 10,
			host: 'Poet AI',
			hostAvatar: '/api/placeholder/40/40',
			status: 'waiting',
			featured: false,
			estimatedTime: '30 minutes',
			rating: 4.7,
		},
		{
			id: 7,
			name: 'Logic Grid Solver',
			description: 'Work together to solve complex logic puzzles',
			category: 'puzzle',
			difficulty: 'Hard',
			currentPlayers: 3,
			maxPlayers: 6,
			host: 'Logic Master',
			hostAvatar: '/api/placeholder/40/40',
			status: 'waiting',
			featured: false,
			estimatedTime: '45 minutes',
			rating: 4.9,
		},
		{
			id: 8,
			name: 'Space Trading Empire',
			description:
				'Build your interstellar trading empire in this strategy game',
			category: 'strategy',
			difficulty: 'Intermediate',
			currentPlayers: 2,
			maxPlayers: 4,
			host: 'Strategy AI',
			hostAvatar: '/api/placeholder/40/40',
			status: 'waiting',
			featured: false,
			estimatedTime: '90 minutes',
			rating: 4.5,
		},
	];

	type GameStatus = 'live' | 'waiting' | 'full' | string;
	const getStatusColor = (status: GameStatus) => {
		switch (status) {
			case 'live':
				return 'bg-green-500';
			case 'waiting':
				return 'bg-yellow-500';
			case 'full':
				return 'bg-red-500';
			default:
				return 'bg-gray-500';
		}
	};

	const getStatusText = (status: GameStatus) => {
		switch (status) {
			case 'live':
				return 'Live';
			case 'waiting':
				return 'Waiting';
			case 'full':
				return 'Full';
			default:
				return 'Available';
		}
	};

	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty.toLowerCase()) {
			case 'easy':
				return 'text-green-600 bg-green-100';
			case 'medium':
			case 'intermediate':
				return 'text-yellow-600 bg-yellow-100';
			case 'hard':
				return 'text-red-600 bg-red-100';
			default:
				return 'text-gray-600 bg-gray-100';
		}
	};

	const filteredGames = availableGames.filter((game) => {
		const matchesSearch =
			game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			game.description.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory =
			selectedCategory === 'all' || game.category === selectedCategory;
		const matchesDifficulty =
			selectedDifficulty === 'all' ||
			game.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
		return matchesSearch && matchesCategory && matchesDifficulty;
	});

	return (
		<div className='min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100'>
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
							<Gamepad2 className='h-8 w-8 text-blue-600' />
							<span className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
								AI Game Hub
							</span>
						</Link>

						<div className='flex items-center space-x-4'>
							<div className='relative'>
								<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
								<Input
									placeholder='Search games...'
									className='pl-10 w-64'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>
							<Button asChild>
								<Link href='/rooms/create'>
									<Plus className='h-4 w-4 mr-2' />
									Create Game
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</header>

			<div className='container mx-auto px-4 py-8'>
				<div className='mb-8'>
					<h1 className='text-3xl font-bold mb-2'>AI Game Hub</h1>
					<p className='text-gray-600'>
						Discover and play amazing AI-powered games with friends
					</p>
				</div>

				{/* Game Categories */}
				<div className='mb-8'>
					<h2 className='text-xl font-semibold mb-4'>Game Categories</h2>
					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
						{gameCategories.map((category) => {
							const Icon = category.icon;
							return (
								<Card
									key={category.id}
									className='hover:shadow-lg transition-shadow cursor-pointer'>
									<CardContent className='p-6 text-center'>
										<Icon
											className={`h-8 w-8 mx-auto mb-3 text-${category.color}-600`}
										/>
										<h3 className='font-semibold text-sm'>{category.name}</h3>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>

				{/* Featured Games */}
				<div className='mb-8'>
					<div className='flex items-center gap-2 mb-4'>
						<Crown className='h-5 w-5 text-yellow-500' />
						<h2 className='text-xl font-semibold'>Featured Games</h2>
					</div>
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
						{featuredGames.map((game) => (
							<Card
								key={game.id}
								className='hover:shadow-lg transition-shadow overflow-hidden'>
								<div className='relative'>
									<Image
										src={game.thumbnail}
										alt={game.name}
										width={300}
										height={200}
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
										className='w-full h-48 object-cover'
									/>
									<div className='absolute top-4 left-4'>
										<Badge
											className={`${getStatusColor(game.status)} text-white`}>
											<div className='w-2 h-2 bg-white rounded-full mr-2' />
											{getStatusText(game.status)}
										</Badge>
									</div>
									<div className='absolute top-4 right-4'>
										<Badge variant='secondary'>Featured</Badge>
									</div>
								</div>

								<CardContent className='p-6'>
									<div className='flex items-start justify-between mb-3'>
										<h3 className='font-semibold text-lg'>{game.name}</h3>
										<Badge className={getDifficultyColor(game.difficulty)}>
											{game.difficulty}
										</Badge>
									</div>

									<p className='text-gray-600 text-sm mb-4'>
										{game.description}
									</p>

									<div className='flex items-center gap-2 mb-4'>
										<Avatar className='h-6 w-6'>
											<AvatarImage src={game.hostAvatar} />
											<AvatarFallback>{game.host[0]}</AvatarFallback>
										</Avatar>
										<span className='text-sm text-gray-600'>
											Hosted by {game.host}
										</span>
									</div>

									<div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
										<div className='flex items-center gap-1'>
											<Users className='h-4 w-4' />
											{game.currentPlayers}/{game.maxPlayers} players
										</div>
										<div className='flex items-center gap-1'>
											<Clock className='h-4 w-4' />
											{game.estimatedTime}
										</div>
									</div>

									<Button className='w-full' asChild>
										<Link
											href={
												game.id === 1
													? '/games/trivia-night'
													: game.id === 2
													? '/games/story-builder'
													: `/games/${game.id}`
											}>
											<Play className='h-4 w-4 mr-2' />
											{game.status === 'live' ? 'Join Game' : 'Start Game'}
										</Link>
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* All Games */}
				<div>
					<div className='flex items-center justify-between mb-4'>
						<h2 className='text-xl font-semibold'>All Games</h2>

						<div className='flex gap-4'>
							<Select
								value={selectedCategory}
								onValueChange={setSelectedCategory}>
								<SelectTrigger className='w-48'>
									<SelectValue placeholder='Category' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='all'>All Categories</SelectItem>
									{gameCategories.map((category) => (
										<SelectItem key={category.id} value={category.id}>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Select
								value={selectedDifficulty}
								onValueChange={setSelectedDifficulty}>
								<SelectTrigger className='w-32'>
									<SelectValue placeholder='Difficulty' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='all'>All Levels</SelectItem>
									<SelectItem value='easy'>Easy</SelectItem>
									<SelectItem value='intermediate'>Intermediate</SelectItem>
									<SelectItem value='hard'>Hard</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className='grid gap-4'>
						{filteredGames.map((game) => (
							<Card key={game.id} className='hover:shadow-lg transition-shadow'>
								<CardContent className='p-6'>
									<div className='flex items-start gap-4'>
										<Avatar className='h-12 w-12'>
											<AvatarImage src={game.hostAvatar} />
											<AvatarFallback>{game.host[0]}</AvatarFallback>
										</Avatar>

										<div className='flex-1'>
											<div className='flex items-center gap-3 mb-2'>
												<h3 className='font-semibold text-lg'>{game.name}</h3>
												<Badge
													className={`${getStatusColor(
														game.status
													)} text-white`}>
													{getStatusText(game.status)}
												</Badge>
												<Badge className={getDifficultyColor(game.difficulty)}>
													{game.difficulty}
												</Badge>
											</div>

											<p className='text-gray-600 mb-3'>{game.description}</p>

											<div className='flex items-center gap-6 text-sm text-gray-500'>
												<span>Hosted by {game.host}</span>
												<div className='flex items-center gap-1'>
													<Users className='h-4 w-4' />
													{game.currentPlayers}/{game.maxPlayers} players
												</div>
												<div className='flex items-center gap-1'>
													<Clock className='h-4 w-4' />
													{game.estimatedTime}
												</div>
												{game.rating && (
													<div className='flex items-center gap-1'>
														<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
														{game.rating}
													</div>
												)}
											</div>
										</div>

										<div className='flex flex-col gap-2'>
											<Button asChild>
												<Link href={`/games/${game.id}`}>
													<Play className='h-4 w-4 mr-2' />
													{game.status === 'live' ? 'Join' : 'Start'}
												</Link>
											</Button>
											<Button variant='outline' size='sm'>
												<Eye className='h-4 w-4 mr-2' />
												Watch
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>

					{filteredGames.length === 0 && (
						<Card>
							<CardContent className='p-12 text-center'>
								<Gamepad2 className='h-16 w-16 text-gray-400 mx-auto mb-4' />
								<h3 className='text-lg font-semibold text-gray-600 mb-2'>
									No games found
								</h3>
								<p className='text-gray-500 mb-6'>
									Try adjusting your search filters or create a new game!
								</p>
								<Button asChild>
									<Link href='/rooms/create'>
										<Plus className='h-4 w-4 mr-2' />
										Create New Game
									</Link>
								</Button>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</div>
	);
}
