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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
	Bot,
	ArrowLeft,
	Settings,
	Edit,
	Camera,
	Star,
	Trophy,
	Users,
	Calendar,
	MapPin,
	Link as LinkIcon,
	Github,
	Twitter,
	Globe,
	Mail,
	Shield,
	Crown,
	Zap,
	Heart,
	MessageSquare,
	TrendingUp,
	Award,
	BookOpen,
	Gamepad2,
} from 'lucide-react';
import Link from 'next/link';

export default function UserProfile() {
	const [isEditing, setIsEditing] = useState(false);
	const [profileData, setProfileData] = useState({
		name: 'John Doe',
		username: 'johndoe',
		bio: 'AI enthusiast and developer. Love creating intelligent assistants that help people be more productive.',
		location: 'San Francisco, CA',
		website: 'https://johndoe.dev',
		twitter: '@johndoe',
		github: 'johndoe',
	});

	const user = {
		id: 1,
		name: 'John Doe',
		username: 'johndoe',
		avatar: '/api/placeholder/120/120',
		bio: 'AI enthusiast and developer. Love creating intelligent assistants that help people be more productive.',
		location: 'San Francisco, CA',
		website: 'https://johndoe.dev',
		joinDate: '2023-06-15',
		verified: true,
		stats: {
			aisCreated: 12,
			totalUsers: 23000,
			totalRevenue: 4304.3,
			averageRating: 4.8,
			followers: 1247,
			following: 89,
			roomsHosted: 15,
			roomsJoined: 47,
		},
		badges: [
			{ id: 'verified', name: 'Verified Creator', icon: Shield, color: 'blue' },
			{ id: 'top-creator', name: 'Top Creator', icon: Crown, color: 'yellow' },
			{
				id: 'early-adopter',
				name: 'Early Adopter',
				icon: Zap,
				color: 'purple',
			},
			{
				id: 'community-champion',
				name: 'Community Champion',
				icon: Heart,
				color: 'red',
			},
		],
		socialLinks: {
			twitter: '@johndoe',
			github: 'johndoe',
			website: 'https://johndoe.dev',
		},
	};

	const myAIs = [
		{
			id: 1,
			name: 'CodeMaster Pro',
			description: 'Advanced coding assistant',
			rating: 4.9,
			users: 15200,
			revenue: 2847.5,
			category: 'Productivity',
			avatar: '/api/placeholder/60/60',
		},
		{
			id: 2,
			name: 'Story Weaver AI',
			description: 'Creative writing companion',
			rating: 4.7,
			users: 7800,
			revenue: 1456.8,
			category: 'Creative',
			avatar: '/api/placeholder/60/60',
		},
		{
			id: 3,
			name: 'Math Tutor Bot',
			description: 'Personalized math learning',
			rating: 4.6,
			users: 3200,
			revenue: 0,
			category: 'Education',
			avatar: '/api/placeholder/60/60',
		},
	];

	const achievements = [
		{
			id: 1,
			name: 'First AI Published',
			description: 'Published your first AI to the marketplace',
			icon: Bot,
			unlockedAt: '2023-06-20',
			rarity: 'common',
		},
		{
			id: 2,
			name: '1000 Users Milestone',
			description: 'Reached 1000 users across all your AIs',
			icon: Users,
			unlockedAt: '2023-08-15',
			rarity: 'uncommon',
		},
		{
			id: 3,
			name: 'Debate Champion',
			description: 'Won 10 debate room competitions',
			icon: Trophy,
			unlockedAt: '2023-09-22',
			rarity: 'rare',
		},
		{
			id: 4,
			name: 'Revenue Rocket',
			description: 'Earned over $1000 in a single month',
			icon: TrendingUp,
			unlockedAt: '2023-10-05',
			rarity: 'epic',
		},
	];

	const recentActivity = [
		{
			id: 1,
			type: 'ai_published',
			description: 'Published Math Tutor Bot',
			timestamp: '2 days ago',
		},
		{
			id: 2,
			type: 'room_hosted',
			description: 'Hosted Creative Writing Session',
			timestamp: '3 days ago',
		},
		{
			id: 3,
			type: 'achievement',
			description: 'Unlocked Revenue Rocket achievement',
			timestamp: '1 week ago',
		},
		{
			id: 4,
			type: 'review',
			description: 'Received 5-star review on CodeMaster Pro',
			timestamp: '1 week ago',
		},
		{
			id: 5,
			type: 'follower',
			description: 'Gained 50 new followers',
			timestamp: '2 weeks ago',
		},
	];

	const getRarityColor = (rarity) => {
		switch (rarity) {
			case 'common':
				return 'text-gray-600 bg-gray-100';
			case 'uncommon':
				return 'text-green-600 bg-green-100';
			case 'rare':
				return 'text-blue-600 bg-blue-100';
			case 'epic':
				return 'text-purple-600 bg-purple-100';
			case 'legendary':
				return 'text-yellow-600 bg-yellow-100';
			default:
				return 'text-gray-600 bg-gray-100';
		}
	};

	const getActivityIcon = (type) => {
		switch (type) {
			case 'ai_published':
				return Bot;
			case 'room_hosted':
				return Users;
			case 'achievement':
				return Award;
			case 'review':
				return Star;
			case 'follower':
				return Heart;
			default:
				return MessageSquare;
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
							<Button
								variant='outline'
								onClick={() => setIsEditing(!isEditing)}>
								<Edit className='h-4 w-4 mr-2' />
								{isEditing ? 'Save Changes' : 'Edit Profile'}
							</Button>
							<Button variant='outline' asChild>
								<Link href='/settings'>
									<Settings className='h-4 w-4 mr-2' />
									Settings
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</header>

			<div className='container mx-auto px-4 py-8'>
				<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
					{/* Profile Sidebar */}
					<div className='lg:col-span-1 space-y-6'>
						{/* Profile Info */}
						<Card>
							<CardContent className='p-6'>
								<div className='text-center mb-6'>
									<div className='relative inline-block'>
										<Avatar className='h-24 w-24 mx-auto mb-4'>
											<AvatarImage src={user.avatar} />
											<AvatarFallback className='text-2xl'>
												{user.name[0]}
											</AvatarFallback>
										</Avatar>
										{isEditing && (
											<Button
												size='sm'
												className='absolute bottom-0 right-0 rounded-full h-8 w-8 p-0'>
												<Camera className='h-4 w-4' />
											</Button>
										)}
									</div>

									<div className='space-y-2'>
										{isEditing ? (
											<Input
												value={profileData.name}
												onChange={(e) =>
													setProfileData((prev) => ({
														...prev,
														name: e.target.value,
													}))
												}
												className='text-center font-semibold'
											/>
										) : (
											<h1 className='text-xl font-bold flex items-center justify-center gap-2'>
												{user.name}
												{user.verified && (
													<Shield className='h-4 w-4 text-blue-500' />
												)}
											</h1>
										)}

										<p className='text-gray-500'>@{user.username}</p>
									</div>
								</div>

								<div className='space-y-4'>
									<div>
										<Label className='text-sm font-medium'>Bio</Label>
										{isEditing ? (
											<Textarea
												value={profileData.bio}
												onChange={(e) =>
													setProfileData((prev) => ({
														...prev,
														bio: e.target.value,
													}))
												}
												className='mt-1'
												rows={3}
											/>
										) : (
											<p className='text-sm text-gray-600 mt-1'>{user.bio}</p>
										)}
									</div>

									<div className='space-y-2 text-sm'>
										<div className='flex items-center gap-2'>
											<MapPin className='h-4 w-4 text-gray-400' />
											{isEditing ? (
												<Input
													value={profileData.location}
													onChange={(e) =>
														setProfileData((prev) => ({
															...prev,
															location: e.target.value,
														}))
													}
													placeholder='Location'
													className='h-8'
												/>
											) : (
												<span>{user.location}</span>
											)}
										</div>

										<div className='flex items-center gap-2'>
											<Calendar className='h-4 w-4 text-gray-400' />
											<span>
												Joined {new Date(user.joinDate).toLocaleDateString()}
											</span>
										</div>
									</div>

									<div className='space-y-2'>
										<Label className='text-sm font-medium'>Social Links</Label>
										<div className='space-y-2'>
											<div className='flex items-center gap-2'>
												<Globe className='h-4 w-4 text-gray-400' />
												{isEditing ? (
													<Input
														value={profileData.website}
														onChange={(e) =>
															setProfileData((prev) => ({
																...prev,
																website: e.target.value,
															}))
														}
														placeholder='Website'
														className='h-8 text-sm'
													/>
												) : user.socialLinks.website ? (
													<a
														href={user.socialLinks.website}
														target='_blank'
														rel='noopener noreferrer'
														className='text-blue-600 hover:underline text-sm'>
														{user.socialLinks.website}
													</a>
												) : (
													<span className='text-gray-400 text-sm'>
														No website
													</span>
												)}
											</div>

											<div className='flex items-center gap-2'>
												<Twitter className='h-4 w-4 text-gray-400' />
												{isEditing ? (
													<Input
														value={profileData.twitter}
														onChange={(e) =>
															setProfileData((prev) => ({
																...prev,
																twitter: e.target.value,
															}))
														}
														placeholder='@username'
														className='h-8 text-sm'
													/>
												) : user.socialLinks.twitter ? (
													<span className='text-sm'>
														{user.socialLinks.twitter}
													</span>
												) : (
													<span className='text-gray-400 text-sm'>
														No Twitter
													</span>
												)}
											</div>

											<div className='flex items-center gap-2'>
												<Github className='h-4 w-4 text-gray-400' />
												{isEditing ? (
													<Input
														value={profileData.github}
														onChange={(e) =>
															setProfileData((prev) => ({
																...prev,
																github: e.target.value,
															}))
														}
														placeholder='username'
														className='h-8 text-sm'
													/>
												) : user.socialLinks.github ? (
													<span className='text-sm'>
														{user.socialLinks.github}
													</span>
												) : (
													<span className='text-gray-400 text-sm'>
														No GitHub
													</span>
												)}
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Stats */}
						<Card>
							<CardHeader>
								<CardTitle className='text-lg'>Stats</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='grid grid-cols-2 gap-4 text-center'>
									<div>
										<div className='text-2xl font-bold text-purple-600'>
											{user.stats.aisCreated}
										</div>
										<div className='text-xs text-gray-500'>AIs Created</div>
									</div>
									<div>
										<div className='text-2xl font-bold text-blue-600'>
											{user.stats.followers.toLocaleString()}
										</div>
										<div className='text-xs text-gray-500'>Followers</div>
									</div>
									<div>
										<div className='text-2xl font-bold text-green-600'>
											${user.stats.totalRevenue.toFixed(0)}
										</div>
										<div className='text-xs text-gray-500'>Revenue</div>
									</div>
									<div>
										<div className='text-2xl font-bold text-yellow-600'>
											{user.stats.averageRating}
										</div>
										<div className='text-xs text-gray-500'>Avg Rating</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Badges */}
						<Card>
							<CardHeader>
								<CardTitle className='text-lg'>Badges</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='grid grid-cols-2 gap-3'>
									{user.badges.map((badge) => {
										const Icon = badge.icon;
										return (
											<div
												key={badge.id}
												className='text-center p-3 border rounded-lg hover:bg-gray-50'>
												<Icon
													className={`h-6 w-6 mx-auto mb-1 text-${badge.color}-600`}
												/>
												<p className='text-xs font-medium'>{badge.name}</p>
											</div>
										);
									})}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Main Content */}
					<div className='lg:col-span-3'>
						<Tabs defaultValue='ais' className='w-full'>
							<TabsList className='grid w-full grid-cols-4'>
								<TabsTrigger value='ais'>My AIs</TabsTrigger>
								<TabsTrigger value='achievements'>Achievements</TabsTrigger>
								<TabsTrigger value='activity'>Activity</TabsTrigger>
								<TabsTrigger value='rooms'>Rooms</TabsTrigger>
							</TabsList>

							<TabsContent value='ais' className='space-y-6 mt-6'>
								<div className='grid gap-6'>
									{myAIs.map((ai) => (
										<Card
											key={ai.id}
											className='hover:shadow-lg transition-shadow'>
											<CardContent className='p-6'>
												<div className='flex items-start gap-4'>
													<Avatar className='h-16 w-16'>
														<AvatarImage src={ai.avatar} />
														<AvatarFallback>{ai.name[0]}</AvatarFallback>
													</Avatar>

													<div className='flex-1'>
														<div className='flex items-center gap-2 mb-2'>
															<h3 className='text-xl font-semibold'>
																{ai.name}
															</h3>
															<Badge variant='outline'>{ai.category}</Badge>
														</div>
														<p className='text-gray-600 mb-3'>
															{ai.description}
														</p>

														<div className='grid grid-cols-3 gap-4 text-center'>
															<div>
																<div className='text-lg font-semibold flex items-center justify-center gap-1'>
																	<Star className='h-4 w-4 text-yellow-500' />
																	{ai.rating}
																</div>
																<div className='text-xs text-gray-500'>
																	Rating
																</div>
															</div>
															<div>
																<div className='text-lg font-semibold'>
																	{ai.users.toLocaleString()}
																</div>
																<div className='text-xs text-gray-500'>
																	Users
																</div>
															</div>
															<div>
																<div className='text-lg font-semibold'>
																	${ai.revenue.toFixed(0)}
																</div>
																<div className='text-xs text-gray-500'>
																	Revenue
																</div>
															</div>
														</div>
													</div>

													<Button variant='outline' asChild>
														<Link href={`/ai/${ai.id}`}>View</Link>
													</Button>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							</TabsContent>

							<TabsContent value='achievements' className='space-y-6 mt-6'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									{achievements.map((achievement) => {
										const Icon = achievement.icon;
										return (
											<Card
												key={achievement.id}
												className='hover:shadow-lg transition-shadow'>
												<CardContent className='p-6'>
													<div className='flex items-start gap-4'>
														<div
															className={`p-3 rounded-lg ${getRarityColor(
																achievement.rarity
															)}`}>
															<Icon className='h-6 w-6' />
														</div>
														<div className='flex-1'>
															<div className='flex items-center gap-2 mb-1'>
																<h3 className='font-semibold'>
																	{achievement.name}
																</h3>
																<Badge
																	variant='outline'
																	className={getRarityColor(
																		achievement.rarity
																	)}>
																	{achievement.rarity}
																</Badge>
															</div>
															<p className='text-sm text-gray-600 mb-2'>
																{achievement.description}
															</p>
															<p className='text-xs text-gray-500'>
																Unlocked{' '}
																{new Date(
																	achievement.unlockedAt
																).toLocaleDateString()}
															</p>
														</div>
													</div>
												</CardContent>
											</Card>
										);
									})}
								</div>
							</TabsContent>

							<TabsContent value='activity' className='space-y-6 mt-6'>
								<Card>
									<CardHeader>
										<CardTitle>Recent Activity</CardTitle>
									</CardHeader>
									<CardContent>
										<div className='space-y-4'>
											{recentActivity.map((activity) => {
												const Icon = getActivityIcon(activity.type);
												return (
													<div
														key={activity.id}
														className='flex items-center gap-4 p-3 border rounded-lg'>
														<Icon className='h-5 w-5 text-gray-500' />
														<div className='flex-1'>
															<p className='text-sm'>{activity.description}</p>
															<p className='text-xs text-gray-500'>
																{activity.timestamp}
															</p>
														</div>
													</div>
												);
											})}
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value='rooms' className='space-y-6 mt-6'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<Card>
										<CardHeader>
											<CardTitle className='flex items-center gap-2'>
												<Users className='h-5 w-5' />
												Rooms Hosted
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className='text-center'>
												<div className='text-3xl font-bold text-purple-600 mb-2'>
													{user.stats.roomsHosted}
												</div>
												<p className='text-sm text-gray-600'>
													Total rooms hosted across all categories
												</p>
											</div>
										</CardContent>
									</Card>

									<Card>
										<CardHeader>
											<CardTitle className='flex items-center gap-2'>
												<MessageSquare className='h-5 w-5' />
												Rooms Joined
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className='text-center'>
												<div className='text-3xl font-bold text-blue-600 mb-2'>
													{user.stats.roomsJoined}
												</div>
												<p className='text-sm text-gray-600'>
													Total rooms participated in
												</p>
											</div>
										</CardContent>
									</Card>
								</div>

								<Card>
									<CardHeader>
										<CardTitle>Favorite Room Categories</CardTitle>
									</CardHeader>
									<CardContent>
										<div className='space-y-3'>
											<div className='flex items-center justify-between'>
												<div className='flex items-center gap-2'>
													<MessageSquare className='h-4 w-4 text-blue-600' />
													<span className='text-sm'>Debate & Discussion</span>
												</div>
												<div className='flex items-center gap-2'>
													<Progress value={75} className='w-24' />
													<span className='text-sm text-gray-500'>
														15 rooms
													</span>
												</div>
											</div>

											<div className='flex items-center justify-between'>
												<div className='flex items-center gap-2'>
													<BookOpen className='h-4 w-4 text-green-600' />
													<span className='text-sm'>Learning & Education</span>
												</div>
												<div className='flex items-center gap-2'>
													<Progress value={60} className='w-24' />
													<span className='text-sm text-gray-500'>
														12 rooms
													</span>
												</div>
											</div>

											<div className='flex items-center justify-between'>
												<div className='flex items-center gap-2'>
													<Gamepad2 className='h-4 w-4 text-red-600' />
													<span className='text-sm'>AI Gaming</span>
												</div>
												<div className='flex items-center gap-2'>
													<Progress value={40} className='w-24' />
													<span className='text-sm text-gray-500'>8 rooms</span>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</div>
		</div>
	);
}
