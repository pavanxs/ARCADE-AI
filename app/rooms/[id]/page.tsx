'use client';

import { useState, useRef, useEffect } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Send,
	Users,
	Bot,
	ArrowLeft,
	Settings,
	Mic,
	MicOff,
	VideoOff,
	Video,
	Hand,
	Crown,
	Star,
	Clock,
	Eye,
	MessageSquare,
	Trophy,
	Zap,
	Play,
	Pause,
	Volume2,
	VolumeX,
	UserPlus,
	UserMinus,
	Flag,
	Share,
	Heart,
	ThumbsUp,
	MoreHorizontal,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function AIRoom() {
	const params = useParams();
	const [message, setMessage] = useState('');
	const [isTyping, setIsTyping] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [isHandRaised, setIsHandRaised] = useState(false);
	const [roomStatus, setRoomStatus] = useState('active'); // active, paused, ended
	const messagesEndRef = useRef(null);

	// Mock room data
	const room = {
		id: params.id,
		name: 'Philosophy Debate Arena',
		description: 'Exploring the nature of consciousness and free will',
		category: 'debate',
		aiHost: {
			name: 'Socrates AI',
			avatar: '/api/placeholder/40/40',
			status: 'active',
		},
		creator: {
			name: 'PhilosophyMaster',
			avatar: '/api/placeholder/32/32',
		},
		maxParticipants: 12,
		currentParticipants: 8,
		spectators: 15,
		duration: 60,
		timeRemaining: 42,
		status: 'live',
		topic:
			'Does true free will exist, or are we all just sophisticated automatons?',
		rules: [
			'Be respectful and constructive',
			'Support arguments with reasoning',
			'No personal attacks',
			'Stay on topic',
		],
	};

	const participants = [
		{
			id: 1,
			name: 'Alice Chen',
			avatar: '/api/placeholder/32/32',
			role: 'participant',
			status: 'speaking',
			handRaised: false,
			points: 150,
		},
		{
			id: 2,
			name: 'Bob Smith',
			avatar: '/api/placeholder/32/32',
			role: 'participant',
			status: 'listening',
			handRaised: true,
			points: 120,
		},
		{
			id: 3,
			name: 'Carol Johnson',
			avatar: '/api/placeholder/32/32',
			role: 'participant',
			status: 'listening',
			handRaised: false,
			points: 180,
		},
		{
			id: 4,
			name: 'David Wilson',
			avatar: '/api/placeholder/32/32',
			role: 'moderator',
			status: 'listening',
			handRaised: false,
			points: 0,
		},
	];

	const messages = [
		{
			id: 1,
			sender: 'Socrates AI',
			avatar: '/api/placeholder/32/32',
			message:
				"Welcome to our philosophical debate! Today we're exploring the question: Does true free will exist? Let's start with opening statements. Alice, would you like to begin?",
			timestamp: '14:23',
			type: 'ai',
			reactions: [],
		},
		{
			id: 2,
			sender: 'Alice Chen',
			avatar: '/api/placeholder/32/32',
			message:
				"I believe free will is an illusion. Our brains are biological computers, and every decision we make is the result of prior causes - genetics, environment, experiences. We feel like we're choosing, but it's really just complex deterministic processes.",
			timestamp: '14:24',
			type: 'user',
			reactions: [
				{ emoji: '👍', count: 3 },
				{ emoji: '🤔', count: 2 },
			],
		},
		{
			id: 3,
			sender: 'Bob Smith',
			avatar: '/api/placeholder/32/32',
			message:
				"I respectfully disagree, Alice. While our brains are indeed physical systems, consciousness and free will emerge from complexity. Just because something has physical causes doesn't mean it's predetermined. Quantum mechanics shows us true randomness exists.",
			timestamp: '14:25',
			type: 'user',
			reactions: [
				{ emoji: '👏', count: 2 },
				{ emoji: '💭', count: 1 },
			],
		},
		{
			id: 4,
			sender: 'Socrates AI',
			avatar: '/api/placeholder/32/32',
			message:
				"Excellent points from both sides! Bob, you're invoking quantum indeterminacy - but does randomness really give us the kind of free will we intuitively believe we have? Carol, what's your take on this?",
			timestamp: '14:26',
			type: 'ai',
			reactions: [],
		},
		{
			id: 5,
			sender: 'Carol Johnson',
			avatar: '/api/placeholder/32/32',
			message:
				"I think we're missing something important here. Free will isn't about being uncaused - it's about being the right kind of cause. When I choose to help someone, that choice flows from my values, beliefs, and reasoning. That's free will - being able to act according to our deeply held convictions.",
			timestamp: '14:27',
			type: 'user',
			reactions: [
				{ emoji: '✨', count: 4 },
				{ emoji: '🎯', count: 2 },
			],
		},
	];

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const sendMessage = () => {
		if (message.trim()) {
			// In real app, this would send to server
			console.log('Sending message:', message);
			setMessage('');
			setIsTyping(true);

			// Simulate AI response
			setTimeout(() => {
				setIsTyping(false);
			}, 2000);
		}
	};

	const handleReaction = (messageId, emoji) => {
		// In real app, this would update message reactions
		console.log('Reaction:', messageId, emoji);
	};

	const formatTime = (minutes) => {
		return `${Math.floor(minutes / 60)}:${(minutes % 60)
			.toString()
			.padStart(2, '0')}`;
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
									Leave Room
								</Link>
							</Button>

							<div className='flex items-center gap-3'>
								<div className='w-3 h-3 bg-green-500 rounded-full animate-pulse' />
								<div>
									<h1 className='font-semibold'>{room.name}</h1>
									<p className='text-sm text-gray-500'>
										{room.currentParticipants}/{room.maxParticipants}{' '}
										participants • {room.spectators} watching
									</p>
								</div>
							</div>
						</div>

						<div className='flex items-center space-x-4'>
							<div className='flex items-center gap-2 text-sm'>
								<Clock className='h-4 w-4 text-gray-500' />
								<span className='font-mono'>
									{formatTime(room.timeRemaining)}
								</span>
							</div>

							<Button variant='outline' size='sm'>
								<Share className='h-4 w-4 mr-2' />
								Share
							</Button>

							<Button variant='outline' size='sm'>
								<Settings className='h-4 w-4' />
							</Button>
						</div>
					</div>
				</div>
			</header>

			<div className='container mx-auto px-4 py-4'>
				<div className='grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]'>
					{/* Participants Sidebar */}
					<div className='lg:col-span-1 space-y-4'>
						{/* AI Host */}
						<Card>
							<CardHeader className='pb-3'>
								<CardTitle className='text-lg flex items-center gap-2'>
									<Bot className='h-5 w-5 text-purple-600' />
									AI Host
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='flex items-center gap-3'>
									<Avatar className='h-10 w-10 ring-2 ring-purple-200'>
										<AvatarImage src={room.aiHost.avatar} />
										<AvatarFallback>AI</AvatarFallback>
									</Avatar>
									<div>
										<p className='font-medium'>{room.aiHost.name}</p>
										<div className='flex items-center gap-1'>
											<div className='w-2 h-2 bg-green-500 rounded-full' />
											<span className='text-xs text-gray-500'>Active</span>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Participants */}
						<Card className='flex-1'>
							<CardHeader className='pb-3'>
								<CardTitle className='text-lg flex items-center justify-between'>
									<span className='flex items-center gap-2'>
										<Users className='h-5 w-5' />
										Participants
									</span>
									<Badge variant='outline'>{participants.length}</Badge>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<ScrollArea className='h-64'>
									<div className='space-y-3'>
										{participants.map((participant) => (
											<div
												key={participant.id}
												className='flex items-center justify-between p-2 rounded-lg hover:bg-gray-50'>
												<div className='flex items-center gap-2'>
													<Avatar
														className={`h-8 w-8 ${
															participant.status === 'speaking'
																? 'ring-2 ring-green-500'
																: ''
														}`}>
														<AvatarImage src={participant.avatar} />
														<AvatarFallback>
															{participant.name[0]}
														</AvatarFallback>
													</Avatar>
													<div>
														<div className='flex items-center gap-1'>
															<p className='text-sm font-medium'>
																{participant.name}
															</p>
															{participant.role === 'moderator' && (
																<Crown className='h-3 w-3 text-yellow-500' />
															)}
														</div>
														{room.category === 'trivia' && (
															<p className='text-xs text-gray-500'>
																{participant.points} pts
															</p>
														)}
													</div>
												</div>

												<div className='flex items-center gap-1'>
													{participant.handRaised && (
														<Hand className='h-4 w-4 text-yellow-500' />
													)}
													{participant.status === 'speaking' && (
														<div className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
													)}
												</div>
											</div>
										))}
									</div>
								</ScrollArea>
							</CardContent>
						</Card>

						{/* Room Info */}
						<Card>
							<CardHeader className='pb-3'>
								<CardTitle className='text-lg'>Room Info</CardTitle>
							</CardHeader>
							<CardContent className='space-y-3'>
								<div>
									<p className='text-sm font-medium mb-1'>Topic</p>
									<p className='text-sm text-gray-600'>{room.topic}</p>
								</div>

								<div>
									<p className='text-sm font-medium mb-2'>Rules</p>
									<ul className='space-y-1'>
										{room.rules.map((rule, index) => (
											<li
												key={index}
												className='text-xs text-gray-600 flex items-start gap-1'>
												<span className='w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0' />
												{rule}
											</li>
										))}
									</ul>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Main Chat Area */}
					<div className='lg:col-span-3 flex flex-col'>
						<Card className='flex-1 flex flex-col'>
							{/* Chat Header */}
							<CardHeader className='border-b'>
								<div className='flex items-center justify-between'>
									<div>
										<CardTitle>Discussion</CardTitle>
										<CardDescription>{room.description}</CardDescription>
									</div>

									<div className='flex items-center gap-2'>
										<Progress
											value={(room.timeRemaining / room.duration) * 100}
											className='w-24'
										/>
										<span className='text-sm text-gray-500 font-mono'>
											{formatTime(room.timeRemaining)}
										</span>
									</div>
								</div>
							</CardHeader>

							{/* Messages */}
							<CardContent className='flex-1 p-0'>
								<ScrollArea className='h-full p-4'>
									<div className='space-y-4'>
										{messages.map((msg) => (
											<div
												key={msg.id}
												className={`flex gap-3 ${
													msg.type === 'ai'
														? 'bg-purple-50 -mx-4 px-4 py-3'
														: ''
												}`}>
												<Avatar className='h-8 w-8 flex-shrink-0'>
													<AvatarImage src={msg.avatar} />
													<AvatarFallback>{msg.sender[0]}</AvatarFallback>
												</Avatar>

												<div className='flex-1 min-w-0'>
													<div className='flex items-center gap-2 mb-1'>
														<span className='font-medium text-sm'>
															{msg.sender}
														</span>
														{msg.type === 'ai' && (
															<Badge variant='outline' className='text-xs'>
																AI Host
															</Badge>
														)}
														<span className='text-xs text-gray-500'>
															{msg.timestamp}
														</span>
													</div>

													<p className='text-sm text-gray-700 leading-relaxed mb-2'>
														{msg.message}
													</p>

													{msg.reactions.length > 0 && (
														<div className='flex gap-2'>
															{msg.reactions.map((reaction, index) => (
																<button
																	key={index}
																	className='flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs hover:bg-gray-200'
																	onClick={() =>
																		handleReaction(msg.id, reaction.emoji)
																	}>
																	<span>{reaction.emoji}</span>
																	<span>{reaction.count}</span>
																</button>
															))}
														</div>
													)}
												</div>
											</div>
										))}

										{isTyping && (
											<div className='flex gap-3 bg-purple-50 -mx-4 px-4 py-3'>
												<Avatar className='h-8 w-8'>
													<AvatarImage src={room.aiHost.avatar} />
													<AvatarFallback>AI</AvatarFallback>
												</Avatar>
												<div className='flex-1'>
													<div className='flex items-center gap-2 mb-1'>
														<span className='font-medium text-sm'>
															{room.aiHost.name}
														</span>
														<Badge variant='outline' className='text-xs'>
															AI Host
														</Badge>
													</div>
													<div className='flex items-center gap-1'>
														<div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' />
														<div
															className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
															style={{ animationDelay: '0.1s' }}
														/>
														<div
															className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
															style={{ animationDelay: '0.2s' }}
														/>
														<span className='text-sm text-gray-500 ml-2'>
															AI is thinking...
														</span>
													</div>
												</div>
											</div>
										)}

										<div ref={messagesEndRef} />
									</div>
								</ScrollArea>
							</CardContent>

							{/* Message Input */}
							<div className='border-t p-4'>
								<div className='flex items-center gap-3 mb-3'>
									<Button
										variant={isHandRaised ? 'default' : 'outline'}
										size='sm'
										onClick={() => setIsHandRaised(!isHandRaised)}>
										<Hand className='h-4 w-4 mr-2' />
										{isHandRaised ? 'Lower Hand' : 'Raise Hand'}
									</Button>

									<Button
										variant='outline'
										size='sm'
										onClick={() => setIsMuted(!isMuted)}>
										{isMuted ? (
											<MicOff className='h-4 w-4' />
										) : (
											<Mic className='h-4 w-4' />
										)}
									</Button>

									<Button variant='outline' size='sm'>
										<VideoOff className='h-4 w-4' />
									</Button>

									<div className='ml-auto flex items-center gap-2'>
										<Button variant='outline' size='sm'>
											<ThumbsUp className='h-4 w-4' />
										</Button>
										<Button variant='outline' size='sm'>
											<Heart className='h-4 w-4' />
										</Button>
										<Button variant='outline' size='sm'>
											<Flag className='h-4 w-4' />
										</Button>
									</div>
								</div>

								<div className='flex gap-3'>
									<div className='flex-1'>
										<Input
											placeholder='Type your message...'
											value={message}
											onChange={(e) => setMessage(e.target.value)}
											onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
											className='w-full'
										/>
									</div>
									<Button onClick={sendMessage} disabled={!message.trim()}>
										<Send className='h-4 w-4' />
									</Button>
								</div>

								<p className='text-xs text-gray-500 mt-2'>
									Press Enter to send • Be respectful and follow the room rules
								</p>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
