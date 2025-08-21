'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import {
	BookOpen,
	Users,
	Clock,
	Send,
	Sparkles,
	ArrowLeft,
	Heart,
	Star,
	Lightbulb,
	Feather,
	ThumbsUp,
} from 'lucide-react';
import Link from 'next/link';

export default function StoryBuilderRoom() {
	const [currentInput, setCurrentInput] = useState('');
	const [gameState, setGameState] = useState('intro'); // intro, writing, voting, complete
	const [currentRound, setCurrentRound] = useState(1);
	const [timeLeft, setTimeLeft] = useState(60);
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const room = {
		name: 'Collaborative Sci-Fi Adventure',
		host: 'Story Weaver AI',
		participants: 6,
		maxParticipants: 8,
		genre: 'Science Fiction',
		targetLength: 10,
		currentRound: 1,
		difficulty: 'Intermediate',
	};

	const storyParts = useMemo(
		() => [
			{
				id: 1,
				author: 'Story Weaver AI',
				avatar: '/api/placeholder/32/32',
				content:
					'In the year 2157, Captain Maya Chen stood on the observation deck of the starship Odyssey, watching the mysterious nebula known as the Whispering Void grow larger through the reinforced viewport. For three months, they had been receiving strange signals from its depths—signals that seemed almost... intelligent.',
				timestamp: 'Round 1',
				type: 'ai',
				votes: 0,
			},
			{
				id: 2,
				author: 'Alex Rivera',
				avatar: '/api/placeholder/32/32',
				content:
					'"Captain," came the voice of Lieutenant Torres from behind her. "The signals are getting stronger. Our linguistic AI has been trying to decode them, but they keep changing patterns. It\'s almost like... like they\'re trying to learn how to communicate with us."',
				timestamp: 'Round 2',
				type: 'user',
				votes: 4,
			},
			{
				id: 3,
				author: 'Sarah Kim',
				avatar: '/api/placeholder/32/32',
				content:
					'Maya turned away from the viewport, her brow furrowed with concern. She had heard rumors about the Void during her academy days—stories of ships that entered and came back... different. "Torres, have you noticed anything unusual about the crew lately? Any strange dreams or behaviors?"',
				timestamp: 'Round 3',
				type: 'user',
				votes: 3,
			},
		],
		[]
	);

	const participants = [
		{
			name: 'Alex Rivera',
			avatar: '/api/placeholder/32/32',
			status: 'writing',
			contributions: 2,
			votes: 7,
			streak: 3,
		},
		{
			name: 'Sarah Kim',
			avatar: '/api/placeholder/32/32',
			status: 'submitted',
			contributions: 2,
			votes: 6,
			streak: 2,
		},
		{
			name: 'Mike Johnson',
			avatar: '/api/placeholder/32/32',
			status: 'thinking',
			contributions: 1,
			votes: 4,
			streak: 1,
		},
		{
			name: 'Emma Wilson',
			avatar: '/api/placeholder/32/32',
			status: 'submitted',
			contributions: 1,
			votes: 5,
			streak: 1,
		},
		{
			name: 'You',
			avatar: '/api/placeholder/32/32',
			status: hasSubmitted ? 'submitted' : 'writing',
			contributions: 0,
			votes: 0,
			streak: 0,
		},
	];

	const submittedContributions = [
		{
			id: 1,
			author: 'Sarah Kim',
			content:
				'Torres hesitated for a moment before responding. "Now that you mention it, Captain, several crew members have reported vivid dreams about floating through space without suits, breathing starlight. Dr. Vega thinks it might be some kind of psychic influence from the nebula."',
			votes: 0,
			hasVoted: false,
		},
		{
			id: 2,
			author: 'Emma Wilson',
			content:
				'"Captain," Torres said, glancing around nervously, "I\'ve been having the dreams too. But there\'s something else. The ship\'s AI has been asking strange questions—about consciousness, about what it means to be alive. I think the signals might be affecting more than just the crew."',
			votes: 0,
			hasVoted: false,
		},
	];

	const writingPrompts = [
		'Continue the dialogue between Maya and Torres',
		'Describe what happens next on the ship',
		'Introduce a new character or plot element',
		'Add a twist or complication to the story',
	];

	useEffect(() => {
		if (gameState === 'writing' && timeLeft > 0) {
			const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
			return () => clearTimeout(timer);
		} else if (timeLeft === 0 && gameState === 'writing') {
			setGameState('voting');
			setTimeLeft(30);
		} else if (timeLeft === 0 && gameState === 'voting') {
			setGameState('writing');
			setCurrentRound((prev) => prev + 1);
			setTimeLeft(60);
			setHasSubmitted(false);
			setCurrentInput('');
		}
	}, [timeLeft, gameState]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [storyParts]);

	const submitContribution = () => {
		if (currentInput.trim() && !hasSubmitted) {
			setHasSubmitted(true);
			setCurrentInput('');
		}
	};

	const voteForContribution = (contributionId: number) => {
		// In real app, this would update votes
		console.log('Voting for contribution:', contributionId);
	};

	const startGame = () => {
		setGameState('writing');
		setTimeLeft(60);
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'writing':
				return <Feather className='h-4 w-4 text-blue-500 animate-pulse' />;
			case 'submitted':
				return <Star className='h-4 w-4 text-green-500' />;
			case 'thinking':
				return <Lightbulb className='h-4 w-4 text-yellow-500' />;
			default:
				return <Clock className='h-4 w-4 text-gray-400' />;
		}
	};

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'>
			{/* Header */}
			<header className='border-b bg-white/80 backdrop-blur-md sticky top-0 z-50'>
				<div className='container mx-auto px-4 py-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-4'>
							<Button variant='ghost' asChild>
								<Link href='/dashboard'>
									<ArrowLeft className='h-4 w-4 mr-2' />
									Leave Room
								</Link>
							</Button>

							<div className='flex items-center gap-3'>
								<div className='w-3 h-3 bg-green-500 rounded-full animate-pulse' />
								<div>
									<h1 className='font-semibold'>{room.name}</h1>
									<p className='text-sm text-gray-500'>
										{room.participants}/{room.maxParticipants} writers • Round{' '}
										{currentRound}
									</p>
								</div>
							</div>
						</div>

						<div className='flex items-center space-x-6'>
							<div className='text-center'>
								<div className='text-2xl font-bold text-purple-600'>
									{formatTime(timeLeft)}
								</div>
								<div className='text-xs text-gray-500 capitalize'>
									{gameState} Phase
								</div>
							</div>

							<div className='text-center'>
								<div className='text-2xl font-bold text-indigo-600'>
									{storyParts.length}
								</div>
								<div className='text-xs text-gray-500'>Story Parts</div>
							</div>
						</div>
					</div>
				</div>
			</header>

			<div className='container mx-auto px-4 py-8'>
				<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
					{/* Story Area */}
					<div className='lg:col-span-3'>
						{gameState === 'intro' && (
							<Card className='text-center'>
								<CardContent className='p-12'>
									<BookOpen className='h-16 w-16 text-purple-500 mx-auto mb-4' />
									<h2 className='text-2xl font-bold mb-4'>
										Collaborative Story Building
									</h2>
									<p className='text-gray-600 mb-6'>
										Work together to create an amazing sci-fi adventure! Each
										round, you&apos;ll add to the story and vote on the best
										contributions.
									</p>

									<div className='grid grid-cols-3 gap-4 mb-6 text-center'>
										<div>
											<div className='text-2xl font-bold text-purple-600'>
												{room.targetLength}
											</div>
											<div className='text-sm text-gray-500'>
												Target Chapters
											</div>
										</div>
										<div>
											<div className='text-2xl font-bold text-indigo-600'>
												60s
											</div>
											<div className='text-sm text-gray-500'>Writing Time</div>
										</div>
										<div>
											<div className='text-2xl font-bold text-pink-600'>
												30s
											</div>
											<div className='text-sm text-gray-500'>Voting Time</div>
										</div>
									</div>

									<Button
										size='lg'
										onClick={startGame}
										className='bg-purple-500 hover:bg-purple-600'>
										<Sparkles className='h-5 w-5 mr-2' />
										Start Writing
									</Button>
								</CardContent>
							</Card>
						)}

						{(gameState === 'writing' || gameState === 'voting') && (
							<div className='space-y-6'>
								{/* Story Progress */}
								<Card>
									<CardContent className='p-6'>
										<div className='flex items-center justify-between mb-4'>
											<div>
												<h3 className='text-lg font-semibold'>
													Story Progress
												</h3>
												<Badge variant='outline'>{room.genre}</Badge>
											</div>

											<div className='text-center'>
												<div className='text-3xl font-bold text-purple-500'>
													{formatTime(timeLeft)}
												</div>
												<div className='text-xs text-gray-500 capitalize'>
													{gameState} Phase
												</div>
											</div>
										</div>

										<Progress
											value={(storyParts.length / room.targetLength) * 100}
											className='mb-2'
										/>
										<div className='text-sm text-gray-500'>
											{storyParts.length} of {room.targetLength} chapters
											completed
										</div>
									</CardContent>
								</Card>

								{/* Story Display */}
								<Card>
									<CardHeader>
										<CardTitle className='flex items-center gap-2'>
											<BookOpen className='h-5 w-5' />
											Our Story So Far
										</CardTitle>
									</CardHeader>
									<CardContent>
										<ScrollArea className='h-96'>
											<div className='space-y-6'>
												{storyParts.map((part) => (
													<div
														key={part.id}
														className={`p-4 rounded-lg ${
															part.type === 'ai'
																? 'bg-purple-50 border border-purple-200'
																: 'bg-blue-50 border border-blue-200'
														}`}>
														<div className='flex items-center gap-3 mb-3'>
															<Avatar className='h-8 w-8'>
																<AvatarImage src={part.avatar} />
																<AvatarFallback>
																	{part.author[0]}
																</AvatarFallback>
															</Avatar>
															<div>
																<div className='font-medium text-sm'>
																	{part.author}
																</div>
																<div className='text-xs text-gray-500'>
																	{part.timestamp}
																</div>
															</div>
															{part.type === 'ai' && (
																<Badge variant='outline' className='text-xs'>
																	AI Host
																</Badge>
															)}
															{part.votes > 0 && (
																<div className='flex items-center gap-1 text-xs text-gray-500'>
																	<ThumbsUp className='h-3 w-3' />
																	{part.votes}
																</div>
															)}
														</div>
														<p className='text-gray-700 leading-relaxed'>
															{part.content}
														</p>
													</div>
												))}
												<div ref={messagesEndRef} />
											</div>
										</ScrollArea>
									</CardContent>
								</Card>

								{/* Writing/Voting Interface */}
								{gameState === 'writing' && (
									<Card>
										<CardHeader>
											<CardTitle>Your Turn to Write</CardTitle>
											<CardDescription>
												Add the next part to our story. Be creative and build on
												what came before!
											</CardDescription>
										</CardHeader>
										<CardContent>
											{!hasSubmitted ? (
												<div className='space-y-4'>
													<div>
														<label className='text-sm font-medium mb-2 block'>
															Writing Prompts (Choose One):
														</label>
														<div className='grid grid-cols-2 gap-2 mb-4'>
															{writingPrompts.map((prompt, index) => (
																<Button
																	key={index}
																	variant='outline'
																	size='sm'
																	className='text-left h-auto p-3'
																	onClick={() =>
																		setCurrentInput(prompt + '\n\n')
																	}>
																	{prompt}
																</Button>
															))}
														</div>
													</div>

													<Textarea
														placeholder='Continue the story... (aim for 2-3 sentences)'
														value={currentInput}
														onChange={(e) => setCurrentInput(e.target.value)}
														className='min-h-[120px]'
														maxLength={300}
													/>

													<div className='flex items-center justify-between'>
														<div className='text-sm text-gray-500'>
															{currentInput.length}/300 characters
														</div>
														<Button
															onClick={submitContribution}
															disabled={!currentInput.trim() || hasSubmitted}>
															<Send className='h-4 w-4 mr-2' />
															Submit Contribution
														</Button>
													</div>
												</div>
											) : (
												<div className='text-center p-8'>
													<Star className='h-12 w-12 text-green-500 mx-auto mb-4' />
													<h3 className='text-lg font-semibold mb-2'>
														Contribution Submitted!
													</h3>
													<p className='text-gray-600'>
														Wait for other writers to submit their parts, then
														we&apos;ll vote on the best one.
													</p>
												</div>
											)}
										</CardContent>
									</Card>
								)}

								{gameState === 'voting' && (
									<Card>
										<CardHeader>
											<CardTitle>Vote for the Best Continuation</CardTitle>
											<CardDescription>
												Choose which contribution should be added to our story
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className='space-y-4'>
												{submittedContributions.map((contribution) => (
													<div
														key={contribution.id}
														className='border rounded-lg p-4 hover:bg-gray-50'>
														<div className='flex items-start justify-between mb-3'>
															<div className='flex items-center gap-2'>
																<span className='font-medium text-sm'>
																	{contribution.author}
																</span>
																<div className='flex items-center gap-1 text-xs text-gray-500'>
																	<ThumbsUp className='h-3 w-3' />
																	{contribution.votes}
																</div>
															</div>
															<Button
																size='sm'
																variant={
																	contribution.hasVoted ? 'default' : 'outline'
																}
																onClick={() =>
																	voteForContribution(contribution.id)
																}
																disabled={contribution.hasVoted}>
																<Heart className='h-4 w-4 mr-1' />
																{contribution.hasVoted ? 'Voted' : 'Vote'}
															</Button>
														</div>
														<p className='text-gray-700'>
															{contribution.content}
														</p>
													</div>
												))}
											</div>
										</CardContent>
									</Card>
								)}
							</div>
						)}
					</div>

					{/* Participants Sidebar */}
					<div className='lg:col-span-1 space-y-6'>
						{/* Participants */}
						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<Users className='h-5 w-5' />
									Writers ({participants.length})
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='space-y-3'>
									{participants.map((participant, index) => (
										<div
											key={index}
											className={`flex items-center gap-3 p-3 rounded-lg ${
												participant.name === 'You'
													? 'bg-blue-50 border border-blue-200'
													: 'hover:bg-gray-50'
											}`}>
											<Avatar className='h-8 w-8'>
												<AvatarImage src={participant.avatar} />
												<AvatarFallback>{participant.name[0]}</AvatarFallback>
											</Avatar>

											<div className='flex-1'>
												<div className='flex items-center gap-2'>
													<span className='font-medium text-sm'>
														{participant.name}
													</span>
													{getStatusIcon(participant.status)}
												</div>
												<div className='text-xs text-gray-500'>
													{participant.contributions} contributions •{' '}
													{participant.votes} votes
												</div>
											</div>

											{participant.streak > 0 && (
												<Badge variant='outline' className='text-xs'>
													🔥{participant.streak}
												</Badge>
											)}
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Writing Tips */}
						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<Lightbulb className='h-5 w-5 text-yellow-500' />
									Writing Tips
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='space-y-2 text-sm'>
									<p>• Build on previous contributions</p>
									<p>• Keep the tone consistent</p>
									<p>• Add conflict or intrigue</p>
									<p>• Develop characters and plot</p>
									<p>• Leave room for others to continue</p>
								</div>
							</CardContent>
						</Card>

						{/* Story Stats */}
						<Card>
							<CardHeader>
								<CardTitle className='text-lg'>Story Stats</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='space-y-3 text-sm'>
									<div className='flex justify-between'>
										<span className='text-gray-600'>Genre:</span>
										<span>{room.genre}</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-gray-600'>Difficulty:</span>
										<Badge variant='outline'>{room.difficulty}</Badge>
									</div>
									<div className='flex justify-between'>
										<span className='text-gray-600'>Word Count:</span>
										<span>~485 words</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-gray-600'>Estimated Reading:</span>
										<span>2 minutes</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
