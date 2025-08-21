'use client';

import { useState, useEffect } from 'react';
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
import { Progress } from '@/components/ui/progress';
import {
	Trophy,
	Zap,
	Target,
	Brain,
	CheckCircle,
	XCircle,
	ArrowLeft,
	Crown,
	Medal,
	Award,
} from 'lucide-react';
import Link from 'next/link';

export default function TriviaGameRoom() {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
	const [showResult, setShowResult] = useState(false);
	const [gameState, setGameState] = useState('waiting'); // waiting, playing, finished
	const [timeLeft, setTimeLeft] = useState(15);
	const [userScore, setUserScore] = useState(0);

	const room = {
		name: '90s Pop Culture Trivia Night',
		host: 'Quiz Master 3000',
		participants: 24,
		maxParticipants: 30,
		currentRound: 1,
		totalRounds: 10,
		category: '90s Pop Culture',
		difficulty: 'Medium',
	};

	const questions = [
		{
			id: 1,
			question: "Which boy band sang 'I Want It That Way' in 1999?",
			options: ['NSYNC', 'Backstreet Boys', '98 Degrees', 'Boyz II Men'],
			correct: 1,
			timeLimit: 15,
			points: 100,
		},
		{
			id: 2,
			question: 'What was the highest-grossing film of the 1990s?',
			options: ['Titanic', 'Jurassic Park', 'The Lion King', 'Forrest Gump'],
			correct: 0,
			timeLimit: 15,
			points: 100,
		},
		{
			id: 3,
			question:
				'Which TV show featured the characters Ross, Rachel, Monica, Chandler, Joey, and Phoebe?',
			options: ['Seinfeld', 'Friends', 'Cheers', 'Frasier'],
			correct: 1,
			timeLimit: 15,
			points: 100,
		},
	];

	const leaderboard = [
		{
			rank: 1,
			name: 'Sarah Chen',
			avatar: '/api/placeholder/32/32',
			score: 850,
			streak: 5,
		},
		{
			rank: 2,
			name: 'Mike Wilson',
			avatar: '/api/placeholder/32/32',
			score: 780,
			streak: 3,
		},
		{
			rank: 3,
			name: 'You',
			avatar: '/api/placeholder/32/32',
			score: userScore,
			streak: 2,
		},
		{
			rank: 4,
			name: 'Alex Garcia',
			avatar: '/api/placeholder/32/32',
			score: 620,
			streak: 1,
		},
		{
			rank: 5,
			name: 'Lisa Park',
			avatar: '/api/placeholder/32/32',
			score: 590,
			streak: 4,
		},
	];

	const currentQ = questions[currentQuestion];

	useEffect(() => {
		if (gameState === 'playing' && timeLeft > 0) {
			const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
			return () => clearTimeout(timer);
		} else if (timeLeft === 0 && !showResult) {
			setShowResult(true);
		}
	}, [timeLeft, gameState, showResult]);

	const handleAnswerSelect = (index: number) => {
		if (showResult) return;
		setSelectedAnswer(index);
		setShowResult(true);

		if (index === currentQ.correct) {
			setUserScore((prev) => prev + currentQ.points + timeLeft * 10); // Bonus for speed
		}
	};

	const nextQuestion = () => {
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion((prev) => prev + 1);
			setSelectedAnswer(null);
			setShowResult(false);
			setTimeLeft(15);
		} else {
			setGameState('finished');
		}
	};

	const startGame = () => {
		setGameState('playing');
		setTimeLeft(15);
	};

	const getRankIcon = (rank: number) => {
		switch (rank) {
			case 1:
				return <Crown className='h-4 w-4 text-yellow-500' />;
			case 2:
				return <Medal className='h-4 w-4 text-gray-400' />;
			case 3:
				return <Award className='h-4 w-4 text-amber-600' />;
			default:
				return null;
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50'>
			{/* Header */}
			<header className='border-b bg-white/80 backdrop-blur-md sticky top-0 z-50'>
				<div className='container mx-auto px-4 py-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-4'>
							<Button variant='ghost' asChild>
								<Link href='/dashboard'>
									<ArrowLeft className='h-4 w-4 mr-2' />
									Leave Game
								</Link>
							</Button>

							<div className='flex items-center gap-3'>
								<div className='w-3 h-3 bg-green-500 rounded-full animate-pulse' />
								<div>
									<h1 className='font-semibold'>{room.name}</h1>
									<p className='text-sm text-gray-500'>
										Hosted by {room.host} • {room.participants}/
										{room.maxParticipants} players
									</p>
								</div>
							</div>
						</div>

						<div className='flex items-center space-x-4'>
							<div className='text-center'>
								<div className='text-2xl font-bold text-yellow-600'>
									{userScore}
								</div>
								<div className='text-xs text-gray-500'>Your Score</div>
							</div>

							<div className='text-center'>
								<div className='text-2xl font-bold text-blue-600'>
									{room.currentRound}/{room.totalRounds}
								</div>
								<div className='text-xs text-gray-500'>Round</div>
							</div>
						</div>
					</div>
				</div>
			</header>

			<div className='container mx-auto px-4 py-8'>
				<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
					{/* Game Area */}
					<div className='lg:col-span-3'>
						{gameState === 'waiting' && (
							<Card className='text-center'>
								<CardContent className='p-12'>
									<Brain className='h-16 w-16 text-yellow-500 mx-auto mb-4' />
									<h2 className='text-2xl font-bold mb-4'>
										Get Ready for Trivia Night!
									</h2>
									<p className='text-gray-600 mb-6'>
										Test your knowledge of 90s pop culture. Answer quickly for
										bonus points!
									</p>

									<div className='grid grid-cols-3 gap-4 mb-6 text-center'>
										<div>
											<div className='text-2xl font-bold text-yellow-600'>
												{questions.length}
											</div>
											<div className='text-sm text-gray-500'>Questions</div>
										</div>
										<div>
											<div className='text-2xl font-bold text-blue-600'>
												15s
											</div>
											<div className='text-sm text-gray-500'>Per Question</div>
										</div>
										<div>
											<div className='text-2xl font-bold text-green-600'>
												100+
											</div>
											<div className='text-sm text-gray-500'>Points Each</div>
										</div>
									</div>

									<Button
										size='lg'
										onClick={startGame}
										className='bg-yellow-500 hover:bg-yellow-600'>
										<Zap className='h-5 w-5 mr-2' />
										Start Game
									</Button>
								</CardContent>
							</Card>
						)}

						{gameState === 'playing' && (
							<div className='space-y-6'>
								{/* Question Progress */}
								<Card>
									<CardContent className='p-6'>
										<div className='flex items-center justify-between mb-4'>
											<div>
												<h3 className='text-lg font-semibold'>
													Question {currentQuestion + 1} of {questions.length}
												</h3>
												<Badge variant='outline'>{room.category}</Badge>
											</div>

											<div className='text-center'>
												<div className='text-3xl font-bold text-red-500'>
													{timeLeft}
												</div>
												<div className='text-xs text-gray-500'>seconds</div>
											</div>
										</div>

										<Progress
											value={((currentQuestion + 1) / questions.length) * 100}
											className='mb-4'
										/>
										<Progress
											value={(timeLeft / 15) * 100}
											className='h-2 bg-red-100'
										/>
									</CardContent>
								</Card>

								{/* Current Question */}
								<Card>
									<CardContent className='p-8'>
										<h2 className='text-2xl font-bold mb-8 text-center'>
											{currentQ.question}
										</h2>

										<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
											{currentQ.options.map((option, index) => (
												<Button
													key={index}
													variant={
														showResult
															? index === currentQ.correct
																? 'default'
																: index === selectedAnswer
																? 'destructive'
																: 'outline'
															: selectedAnswer === index
															? 'default'
															: 'outline'
													}
													className={`p-6 h-auto text-left justify-start text-wrap ${
														showResult && index === currentQ.correct
															? 'bg-green-500 hover:bg-green-600'
															: showResult &&
															  index === selectedAnswer &&
															  index !== currentQ.correct
															? 'bg-red-500 hover:bg-red-600'
															: ''
													}`}
													onClick={() => handleAnswerSelect(index)}
													disabled={showResult}>
													<div className='flex items-center gap-3 w-full'>
														<div className='flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold'>
															{String.fromCharCode(65 + index)}
														</div>
														<span className='flex-1'>{option}</span>
														{showResult && index === currentQ.correct && (
															<CheckCircle className='h-5 w-5' />
														)}
														{showResult &&
															index === selectedAnswer &&
															index !== currentQ.correct && (
																<XCircle className='h-5 w-5' />
															)}
													</div>
												</Button>
											))}
										</div>

										{showResult && (
											<div className='mt-8 text-center'>
												<div className='mb-4'>
													{selectedAnswer === currentQ.correct ? (
														<div className='text-green-600'>
															<CheckCircle className='h-8 w-8 mx-auto mb-2' />
															<div className='text-xl font-bold'>Correct!</div>
															<div className='text-sm'>
																+{currentQ.points + timeLeft * 10} points
															</div>
														</div>
													) : (
														<div className='text-red-600'>
															<XCircle className='h-8 w-8 mx-auto mb-2' />
															<div className='text-xl font-bold'>Incorrect</div>
															<div className='text-sm'>
																The correct answer was{' '}
																{currentQ.options[currentQ.correct]}
															</div>
														</div>
													)}
												</div>

												<Button onClick={nextQuestion} size='lg'>
													{currentQuestion < questions.length - 1
														? 'Next Question'
														: 'Finish Game'}
												</Button>
											</div>
										)}
									</CardContent>
								</Card>
							</div>
						)}

						{gameState === 'finished' && (
							<Card className='text-center'>
								<CardContent className='p-12'>
									<Trophy className='h-16 w-16 text-yellow-500 mx-auto mb-4' />
									<h2 className='text-2xl font-bold mb-4'>Game Complete!</h2>
									<div className='text-4xl font-bold text-yellow-600 mb-2'>
										{userScore}
									</div>
									<p className='text-gray-600 mb-6'>Final Score</p>

									<div className='grid grid-cols-3 gap-4 mb-6 text-center'>
										<div>
											<div className='text-xl font-bold'>3rd</div>
											<div className='text-sm text-gray-500'>Final Rank</div>
										</div>
										<div>
											<div className='text-xl font-bold'>2/3</div>
											<div className='text-sm text-gray-500'>Correct</div>
										</div>
										<div>
											<div className='text-xl font-bold'>8.2s</div>
											<div className='text-sm text-gray-500'>Avg Time</div>
										</div>
									</div>

									<div className='flex gap-4 justify-center'>
										<Button variant='outline' asChild>
											<Link href='/games'>Play Another Game</Link>
										</Button>
										<Button asChild>
											<Link href='/dashboard'>Back to Dashboard</Link>
										</Button>
									</div>
								</CardContent>
							</Card>
						)}
					</div>

					{/* Leaderboard Sidebar */}
					<div className='lg:col-span-1'>
						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<Trophy className='h-5 w-5 text-yellow-500' />
									Live Leaderboard
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='space-y-3'>
									{leaderboard.map((player) => (
										<div
											key={player.rank}
											className={`flex items-center gap-3 p-3 rounded-lg ${
												player.name === 'You'
													? 'bg-blue-50 border border-blue-200'
													: 'hover:bg-gray-50'
											}`}>
											<div className='flex items-center gap-2'>
												<span className='font-bold text-gray-600'>
													#{player.rank}
												</span>
												{getRankIcon(player.rank)}
											</div>

											<Avatar className='h-8 w-8'>
												<AvatarImage src={player.avatar} />
												<AvatarFallback>{player.name[0]}</AvatarFallback>
											</Avatar>

											<div className='flex-1'>
												<div className='font-medium text-sm'>{player.name}</div>
												<div className='text-xs text-gray-500 flex items-center gap-1'>
													<Target className='h-3 w-3' />
													{player.streak} streak
												</div>
											</div>

											<div className='text-right'>
												<div className='font-bold text-sm'>{player.score}</div>
												<div className='text-xs text-gray-500'>pts</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Game Info */}
						<Card className='mt-6'>
							<CardHeader>
								<CardTitle className='text-lg'>Game Info</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='space-y-3 text-sm'>
									<div className='flex justify-between'>
										<span className='text-gray-600'>Category:</span>
										<span>{room.category}</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-gray-600'>Difficulty:</span>
										<Badge variant='outline'>{room.difficulty}</Badge>
									</div>
									<div className='flex justify-between'>
										<span className='text-gray-600'>Players:</span>
										<span>
											{room.participants}/{room.maxParticipants}
										</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-gray-600'>Host:</span>
										<span>{room.host}</span>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Power-ups (Future Feature) */}
						<Card className='mt-6 opacity-60'>
							<CardHeader>
								<CardTitle className='text-lg'>Power-ups</CardTitle>
								<CardDescription>Coming Soon</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='space-y-2 text-sm text-gray-500'>
									<div>⚡ Double Points</div>
									<div>🔍 50/50 Chance</div>
									<div>⏰ Extra Time</div>
									<div>🎯 Skip Question</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
