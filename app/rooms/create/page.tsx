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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import {
	Users,
	Bot,
	ArrowLeft,
	Save,
	Eye,
	Settings,
	Globe,
	Lock,
	Gamepad2,
	MessageSquare,
	BookOpen,
	Lightbulb,
	Sword,
	Music,
	Trophy,
	Clock,
	Crown,
	Star,
	Plus,
	X,
	Play,
	Zap,
	AlertCircle,
	CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function CreateRoom() {
	const [roomData, setRoomData] = useState({
		name: '',
		description: '',
		category: '',
		aiHost: '',
		maxParticipants: 10,
		duration: 60,
		privacy: 'public',
		requireApproval: false,
		allowSpectators: true,
		enableChat: true,
		enableVoice: false,
		tags: [],
		rules: [],
		customSettings: {},
	});
	const [tagInput, setTagInput] = useState('');
	const [ruleInput, setRuleInput] = useState('');

	const roomCategories = [
		{
			id: 'debate',
			name: 'Debate & Discussion',
			description: 'Structured debates and discussions',
			icon: MessageSquare,
			color: 'blue',
			defaultSettings: {
				maxParticipants: 8,
				duration: 45,
				requireApproval: true,
			},
		},
		{
			id: 'trivia',
			name: 'Trivia & Quiz',
			description: 'Knowledge competitions and quizzes',
			icon: Trophy,
			color: 'yellow',
			defaultSettings: {
				maxParticipants: 20,
				duration: 30,
				requireApproval: false,
			},
		},
		{
			id: 'creative',
			name: 'Creative Collaboration',
			description: 'Story writing, brainstorming, and creative projects',
			icon: Lightbulb,
			color: 'purple',
			defaultSettings: {
				maxParticipants: 6,
				duration: 90,
				requireApproval: false,
			},
		},
		{
			id: 'educational',
			name: 'Learning & Education',
			description: 'Study groups, tutoring, and educational activities',
			icon: BookOpen,
			color: 'green',
			defaultSettings: {
				maxParticipants: 15,
				duration: 60,
				requireApproval: false,
			},
		},
		{
			id: 'gaming',
			name: 'AI Gaming',
			description: 'Text-based games and interactive entertainment',
			icon: Gamepad2,
			color: 'red',
			defaultSettings: {
				maxParticipants: 12,
				duration: 45,
				requireApproval: false,
			},
		},
		{
			id: 'roleplay',
			name: 'Roleplay & Simulation',
			description: 'Character roleplay and scenario simulations',
			icon: Sword,
			color: 'indigo',
			defaultSettings: {
				maxParticipants: 8,
				duration: 120,
				requireApproval: true,
			},
		},
	];

	const aiHosts = [
		{
			id: 'socrates',
			name: 'Socrates AI',
			description: 'Philosophy and debate moderator',
			category: 'debate',
			avatar: '/api/placeholder/40/40',
		},
		{
			id: 'quizmaster',
			name: 'Quiz Master 3000',
			description: 'Trivia and knowledge game host',
			category: 'trivia',
			avatar: '/api/placeholder/40/40',
		},
		{
			id: 'storyteller',
			name: 'Story Weaver',
			description: 'Creative writing and storytelling guide',
			category: 'creative',
			avatar: '/api/placeholder/40/40',
		},
		{
			id: 'tutor',
			name: 'Professor Alpha',
			description: 'Educational facilitator and tutor',
			category: 'educational',
			avatar: '/api/placeholder/40/40',
		},
		{
			id: 'gamemaster',
			name: 'Game Master AI',
			description: 'Interactive game and adventure host',
			category: 'gaming',
			avatar: '/api/placeholder/40/40',
		},
		{
			id: 'director',
			name: 'Scene Director',
			description: 'Roleplay and scenario coordinator',
			category: 'roleplay',
			avatar: '/api/placeholder/40/40',
		},
	];

	const addTag = () => {
		if (tagInput && !roomData.tags.includes(tagInput)) {
			setRoomData((prev) => ({
				...prev,
				tags: [...prev.tags, tagInput],
			}));
			setTagInput('');
		}
	};

	const removeTag = (tagToRemove) => {
		setRoomData((prev) => ({
			...prev,
			tags: prev.tags.filter((tag) => tag !== tagToRemove),
		}));
	};

	const addRule = () => {
		if (ruleInput && !roomData.rules.includes(ruleInput)) {
			setRoomData((prev) => ({
				...prev,
				rules: [...prev.rules, ruleInput],
			}));
			setRuleInput('');
		}
	};

	const removeRule = (ruleToRemove) => {
		setRoomData((prev) => ({
			...prev,
			rules: prev.rules.filter((rule) => rule !== ruleToRemove),
		}));
	};

	const selectCategory = (categoryId) => {
		const category = roomCategories.find((c) => c.id === categoryId);
		if (category) {
			setRoomData((prev) => ({
				...prev,
				category: categoryId,
				...category.defaultSettings,
			}));
		}
	};

	const getAvailableHosts = () => {
		return roomData.category
			? aiHosts.filter((host) => host.category === roomData.category)
			: aiHosts;
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
							<Button variant='outline'>
								<Save className='h-4 w-4 mr-2' />
								Save Draft
							</Button>
							<Button variant='outline'>
								<Eye className='h-4 w-4 mr-2' />
								Preview
							</Button>
						</div>
					</div>
				</div>
			</header>

			<div className='container mx-auto px-4 py-8'>
				<div className='max-w-4xl mx-auto'>
					{/* Header */}
					<div className='mb-8'>
						<h1 className='text-3xl font-bold mb-2'>Create AI Room</h1>
						<p className='text-gray-600'>
							Set up an interactive space where people can engage with AI and
							each other
						</p>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
						{/* Main Form */}
						<div className='lg:col-span-2 space-y-6'>
							{/* Room Category */}
							<Card>
								<CardHeader>
									<CardTitle>Choose Room Type</CardTitle>
									<CardDescription>
										Select the type of room you want to create. This will
										determine the AI host and default settings.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										{roomCategories.map((category) => {
											const Icon = category.icon;
											return (
												<div
													key={category.id}
													className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
														roomData.category === category.id
															? `border-${category.color}-500 bg-${category.color}-50`
															: 'border-gray-200 hover:border-gray-300'
													}`}
													onClick={() => selectCategory(category.id)}>
													<div className='flex items-start gap-3'>
														<Icon
															className={`h-6 w-6 text-${category.color}-600 mt-1`}
														/>
														<div>
															<h3 className='font-semibold mb-1'>
																{category.name}
															</h3>
															<p className='text-sm text-gray-600'>
																{category.description}
															</p>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								</CardContent>
							</Card>

							{/* Basic Information */}
							<Card>
								<CardHeader>
									<CardTitle>Room Details</CardTitle>
								</CardHeader>
								<CardContent className='space-y-4'>
									<div>
										<Label htmlFor='room-name'>Room Name *</Label>
										<Input
											id='room-name'
											placeholder='Enter your room name'
											value={roomData.name}
											onChange={(e) =>
												setRoomData((prev) => ({
													...prev,
													name: e.target.value,
												}))
											}
											className='mt-1'
										/>
									</div>

									<div>
										<Label htmlFor='description'>Description *</Label>
										<Textarea
											id='description'
											placeholder='Describe what your room is about and what participants can expect'
											value={roomData.description}
											onChange={(e) =>
												setRoomData((prev) => ({
													...prev,
													description: e.target.value,
												}))
											}
											className='mt-1'
										/>
									</div>

									<div>
										<Label>AI Host</Label>
										<Select
											value={roomData.aiHost}
											onValueChange={(value) =>
												setRoomData((prev) => ({ ...prev, aiHost: value }))
											}>
											<SelectTrigger className='mt-1'>
												<SelectValue placeholder='Select an AI host' />
											</SelectTrigger>
											<SelectContent>
												{getAvailableHosts().map((host) => (
													<SelectItem key={host.id} value={host.id}>
														<div className='flex items-center gap-2'>
															<img
																src={host.avatar}
																alt={host.name}
																className='w-6 h-6 rounded-full'
															/>
															<div>
																<div className='font-medium'>{host.name}</div>
																<div className='text-xs text-gray-500'>
																	{host.description}
																</div>
															</div>
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										<div>
											<Label>Maximum Participants</Label>
											<div className='mt-2'>
												<Slider
													value={[roomData.maxParticipants]}
													onValueChange={(value) =>
														setRoomData((prev) => ({
															...prev,
															maxParticipants: value[0],
														}))
													}
													max={50}
													min={2}
													step={1}
													className='w-full'
												/>
												<div className='flex justify-between text-sm text-gray-500 mt-1'>
													<span>2</span>
													<span className='font-medium'>
														{roomData.maxParticipants} participants
													</span>
													<span>50</span>
												</div>
											</div>
										</div>

										<div>
											<Label>Session Duration (minutes)</Label>
											<div className='mt-2'>
												<Slider
													value={[roomData.duration]}
													onValueChange={(value) =>
														setRoomData((prev) => ({
															...prev,
															duration: value[0],
														}))
													}
													max={180}
													min={15}
													step={15}
													className='w-full'
												/>
												<div className='flex justify-between text-sm text-gray-500 mt-1'>
													<span>15m</span>
													<span className='font-medium'>
														{roomData.duration} minutes
													</span>
													<span>3h</span>
												</div>
											</div>
										</div>
									</div>

									<div>
										<Label>Tags</Label>
										<div className='flex gap-2 mt-2 mb-3'>
											<Input
												placeholder='Add a tag'
												value={tagInput}
												onChange={(e) => setTagInput(e.target.value)}
												onKeyPress={(e) => e.key === 'Enter' && addTag()}
												className='flex-1'
											/>
											<Button onClick={addTag} variant='outline'>
												<Plus className='h-4 w-4' />
											</Button>
										</div>
										<div className='flex flex-wrap gap-2'>
											{roomData.tags.map((tag) => (
												<Badge
													key={tag}
													variant='secondary'
													className='flex items-center gap-1'>
													{tag}
													<button onClick={() => removeTag(tag)}>
														<X className='h-3 w-3' />
													</button>
												</Badge>
											))}
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Room Settings */}
							<Card>
								<CardHeader>
									<CardTitle>Room Settings</CardTitle>
								</CardHeader>
								<CardContent className='space-y-6'>
									<div>
										<Label>Privacy</Label>
										<Select
											value={roomData.privacy}
											onValueChange={(value) =>
												setRoomData((prev) => ({ ...prev, privacy: value }))
											}>
											<SelectTrigger className='mt-1'>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='public'>
													<div className='flex items-center gap-2'>
														<Globe className='h-4 w-4' />
														Public - Anyone can join
													</div>
												</SelectItem>
												<SelectItem value='private'>
													<div className='flex items-center gap-2'>
														<Lock className='h-4 w-4' />
														Private - Invite only
													</div>
												</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className='space-y-4'>
										<div className='flex items-center justify-between'>
											<div>
												<Label>Require Approval</Label>
												<p className='text-sm text-gray-500'>
													Review participants before they can join
												</p>
											</div>
											<Switch
												checked={roomData.requireApproval}
												onCheckedChange={(checked) =>
													setRoomData((prev) => ({
														...prev,
														requireApproval: checked,
													}))
												}
											/>
										</div>

										<div className='flex items-center justify-between'>
											<div>
												<Label>Allow Spectators</Label>
												<p className='text-sm text-gray-500'>
													Let people watch without participating
												</p>
											</div>
											<Switch
												checked={roomData.allowSpectators}
												onCheckedChange={(checked) =>
													setRoomData((prev) => ({
														...prev,
														allowSpectators: checked,
													}))
												}
											/>
										</div>

										<div className='flex items-center justify-between'>
											<div>
												<Label>Enable Chat</Label>
												<p className='text-sm text-gray-500'>
													Allow participants to chat with each other
												</p>
											</div>
											<Switch
												checked={roomData.enableChat}
												onCheckedChange={(checked) =>
													setRoomData((prev) => ({
														...prev,
														enableChat: checked,
													}))
												}
											/>
										</div>

										<div className='flex items-center justify-between'>
											<div>
												<Label>Voice Chat (Beta)</Label>
												<p className='text-sm text-gray-500'>
													Enable voice communication
												</p>
											</div>
											<Switch
												checked={roomData.enableVoice}
												onCheckedChange={(checked) =>
													setRoomData((prev) => ({
														...prev,
														enableVoice: checked,
													}))
												}
											/>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Room Rules */}
							<Card>
								<CardHeader>
									<CardTitle>Room Rules</CardTitle>
									<CardDescription>
										Set guidelines for participants to follow in your room
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className='space-y-4'>
										<div className='flex gap-2'>
											<Input
												placeholder='Add a rule'
												value={ruleInput}
												onChange={(e) => setRuleInput(e.target.value)}
												onKeyPress={(e) => e.key === 'Enter' && addRule()}
												className='flex-1'
											/>
											<Button onClick={addRule} variant='outline'>
												<Plus className='h-4 w-4' />
											</Button>
										</div>

										<div className='space-y-2'>
											{roomData.rules.map((rule, index) => (
												<div
													key={index}
													className='flex items-center justify-between p-3 border rounded-lg'>
													<span className='text-sm'>
														{index + 1}. {rule}
													</span>
													<button onClick={() => removeRule(rule)}>
														<X className='h-4 w-4 text-gray-400 hover:text-red-500' />
													</button>
												</div>
											))}
										</div>

										{roomData.rules.length === 0 && (
											<div className='text-center py-8 text-gray-500'>
												<Settings className='h-8 w-8 mx-auto mb-2 text-gray-400' />
												<p>
													No rules set. Add rules to help guide participant
													behavior.
												</p>
											</div>
										)}
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Sidebar */}
						<div className='space-y-6'>
							{/* Room Preview */}
							<Card>
								<CardHeader>
									<CardTitle className='flex items-center gap-2'>
										<Eye className='h-5 w-5' />
										Room Preview
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='space-y-4'>
										<div className='p-4 border rounded-lg'>
											<div className='flex items-start gap-3 mb-3'>
												<div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center'>
													<Users className='h-5 w-5 text-purple-600' />
												</div>
												<div className='flex-1'>
													<h3 className='font-semibold'>
														{roomData.name || 'Room Name'}
													</h3>
													<p className='text-sm text-gray-600 line-clamp-2'>
														{roomData.description ||
															'Room description will appear here'}
													</p>
												</div>
											</div>

											<div className='flex items-center justify-between text-sm'>
												<div className='flex items-center gap-4'>
													<span className='flex items-center gap-1'>
														<Users className='h-3 w-3' />
														0/{roomData.maxParticipants}
													</span>
													<span className='flex items-center gap-1'>
														<Clock className='h-3 w-3' />
														{roomData.duration}m
													</span>
												</div>
												<Badge
													variant={
														roomData.privacy === 'public'
															? 'default'
															: 'secondary'
													}>
													{roomData.privacy === 'public' ? 'Public' : 'Private'}
												</Badge>
											</div>
										</div>

										{roomData.aiHost && (
											<div className='p-3 bg-blue-50 border border-blue-200 rounded-lg'>
												<div className='flex items-center gap-2 mb-1'>
													<Bot className='h-4 w-4 text-blue-600' />
													<span className='text-sm font-medium text-blue-900'>
														AI Host
													</span>
												</div>
												<p className='text-sm text-blue-700'>
													{
														aiHosts.find((host) => host.id === roomData.aiHost)
															?.name
													}
												</p>
											</div>
										)}
									</div>
								</CardContent>
							</Card>

							{/* Category Info */}
							{roomData.category && (
								<Card>
									<CardHeader>
										<CardTitle className='text-lg'>Category Guide</CardTitle>
									</CardHeader>
									<CardContent>
										{(() => {
											const category = roomCategories.find(
												(c) => c.id === roomData.category
											);
											if (!category) return null;

											const Icon = category.icon;
											return (
												<div className='space-y-3'>
													<div className='flex items-center gap-2'>
														<Icon
															className={`h-5 w-5 text-${category.color}-600`}
														/>
														<span className='font-medium'>{category.name}</span>
													</div>
													<p className='text-sm text-gray-600'>
														{category.description}
													</p>

													<div className='space-y-2 text-sm'>
														<h4 className='font-medium'>Best Practices:</h4>
														{category.id === 'debate' && (
															<ul className='space-y-1 text-gray-600'>
																<li>• Set clear debate topics</li>
																<li>• Establish time limits for arguments</li>
																<li>• Encourage respectful discourse</li>
															</ul>
														)}
														{category.id === 'trivia' && (
															<ul className='space-y-1 text-gray-600'>
																<li>• Prepare diverse question categories</li>
																<li>• Set appropriate difficulty levels</li>
																<li>• Consider team-based formats</li>
															</ul>
														)}
														{category.id === 'creative' && (
															<ul className='space-y-1 text-gray-600'>
																<li>• Encourage wild ideas</li>
																<li>• Build on others' contributions</li>
																<li>• Avoid premature criticism</li>
															</ul>
														)}
														{category.id === 'educational' && (
															<ul className='space-y-1 text-gray-600'>
																<li>• Start with clear learning objectives</li>
																<li>• Encourage questions and discussion</li>
																<li>• Provide helpful resources</li>
															</ul>
														)}
														{category.id === 'gaming' && (
															<ul className='space-y-1 text-gray-600'>
																<li>• Explain game rules clearly</li>
																<li>• Keep sessions engaging and fun</li>
																<li>• Balance competition and collaboration</li>
															</ul>
														)}
														{category.id === 'roleplay' && (
															<ul className='space-y-1 text-gray-600'>
																<li>• Set clear scenario boundaries</li>
																<li>• Encourage character development</li>
																<li>• Respect others' creative choices</li>
															</ul>
														)}
													</div>
												</div>
											);
										})()}
									</CardContent>
								</Card>
							)}

							{/* Publishing Info */}
							<Card>
								<CardHeader>
									<CardTitle className='text-lg'>Publishing</CardTitle>
								</CardHeader>
								<CardContent className='space-y-4'>
									<div className='space-y-3'>
										<div className='flex items-center gap-2'>
											<CheckCircle className='h-4 w-4 text-green-500' />
											<span className='text-sm'>
												Room will be instantly available
											</span>
										</div>
										<div className='flex items-center gap-2'>
											<CheckCircle className='h-4 w-4 text-green-500' />
											<span className='text-sm'>
												You can edit settings anytime
											</span>
										</div>
										<div className='flex items-center gap-2'>
											<Clock className='h-4 w-4 text-yellow-500' />
											<span className='text-sm'>
												Sessions start when you activate them
											</span>
										</div>
									</div>

									<div className='pt-4 border-t'>
										<Button className='w-full' size='lg'>
											<Play className='h-4 w-4 mr-2' />
											Create & Launch Room
										</Button>

										<Button variant='outline' className='w-full mt-2'>
											Save as Draft
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
