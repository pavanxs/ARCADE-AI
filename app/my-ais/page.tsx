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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Search,
	Plus,
	Bot,
	ArrowLeft,
	TrendingUp,
	Users,
	DollarSign,
	Eye,
	Edit,
	MoreHorizontal,
	Trash2,
	Copy,
	ExternalLink,
	BarChart3,
	Star,
	Download,
	Settings,
	Pause,
	Play,
	AlertCircle,
	CheckCircle,
	Clock,
	Zap,
} from 'lucide-react';
import Link from 'next/link';

export default function MyAIs() {
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [sortBy, setSortBy] = useState('latest');

	const myAIs = [
		{
			id: 1,
			name: 'CodeMaster Pro',
			description: 'Advanced coding assistant for all programming languages',
			status: 'published',
			rating: 4.9,
			reviewCount: 1284,
			users: 15200,
			revenue: 2847.5,
			views: 45600,
			price: 9.99,
			priceType: 'monthly',
			category: 'Productivity',
			createdAt: '2024-01-15',
			lastUpdated: '2024-01-20',
			avatar: '/api/placeholder/60/60',
			growth: 12.5,
			isActive: true,
		},
		{
			id: 2,
			name: 'Story Weaver AI',
			description: 'Creative writing companion for authors and storytellers',
			status: 'published',
			rating: 4.7,
			reviewCount: 523,
			users: 7800,
			revenue: 1456.8,
			views: 23400,
			price: 14.99,
			priceType: 'monthly',
			category: 'Creative',
			createdAt: '2024-01-10',
			lastUpdated: '2024-01-18',
			avatar: '/api/placeholder/60/60',
			growth: 8.3,
			isActive: true,
		},
		{
			id: 3,
			name: 'Math Tutor Bot',
			description: 'Personalized mathematics learning assistant',
			status: 'draft',
			rating: 0,
			reviewCount: 0,
			users: 0,
			revenue: 0,
			views: 127,
			price: 12.99,
			priceType: 'monthly',
			category: 'Education',
			createdAt: '2024-01-22',
			lastUpdated: '2024-01-22',
			avatar: '/api/placeholder/60/60',
			growth: 0,
			isActive: false,
		},
		{
			id: 4,
			name: 'Fitness Coach AI',
			description: 'Personalized workout and nutrition guidance',
			status: 'review',
			rating: 0,
			reviewCount: 0,
			users: 0,
			revenue: 0,
			views: 89,
			price: 19.99,
			priceType: 'monthly',
			category: 'Wellness',
			createdAt: '2024-01-20',
			lastUpdated: '2024-01-21',
			avatar: '/api/placeholder/60/60',
			growth: 0,
			isActive: false,
		},
	];

	const analytics = {
		totalRevenue: 4304.3,
		totalUsers: 23000,
		totalViews: 69216,
		averageRating: 4.8,
		monthlyGrowth: 15.7,
		topPerformer: 'CodeMaster Pro',
	};

	const recentActivity = [
		{
			type: 'review',
			message: 'New 5-star review on CodeMaster Pro',
			time: '2 hours ago',
		},
		{
			type: 'revenue',
			message: 'Earned $89.99 from Story Weaver AI',
			time: '4 hours ago',
		},
		{
			type: 'user',
			message: '23 new users subscribed to CodeMaster Pro',
			time: '6 hours ago',
		},
		{
			type: 'status',
			message: 'Fitness Coach AI submitted for review',
			time: '1 day ago',
		},
		{
			type: 'update',
			message: 'Math Tutor Bot draft updated',
			time: '2 days ago',
		},
	];

	const filteredAIs = myAIs.filter((ai) => {
		const matchesSearch =
			ai.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			ai.description.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesStatus = statusFilter === 'all' || ai.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	const sortedAIs = [...filteredAIs].sort((a, b) => {
		switch (sortBy) {
			case 'name':
				return a.name.localeCompare(b.name);
			case 'revenue':
				return b.revenue - a.revenue;
			case 'users':
				return b.users - a.users;
			case 'rating':
				return b.rating - a.rating;
			case 'latest':
				return (
					new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
				);
			default:
				return 0;
		}
	});

	const getStatusColor = (status) => {
		switch (status) {
			case 'published':
				return 'bg-green-500';
			case 'draft':
				return 'bg-gray-500';
			case 'review':
				return 'bg-yellow-500';
			case 'rejected':
				return 'bg-red-500';
			default:
				return 'bg-gray-500';
		}
	};

	const getStatusIcon = (status) => {
		switch (status) {
			case 'published':
				return <CheckCircle className='h-4 w-4' />;
			case 'draft':
				return <Edit className='h-4 w-4' />;
			case 'review':
				return <Clock className='h-4 w-4' />;
			case 'rejected':
				return <AlertCircle className='h-4 w-4' />;
			default:
				return <Clock className='h-4 w-4' />;
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
							<Button variant='outline' asChild>
								<Link href='/analytics'>
									<BarChart3 className='h-4 w-4 mr-2' />
									Analytics
								</Link>
							</Button>
							<Button asChild>
								<Link href='/create'>
									<Plus className='h-4 w-4 mr-2' />
									Create New AI
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</header>

			<div className='container mx-auto px-4 py-8'>
				<div className='mb-8'>
					<h1 className='text-3xl font-bold mb-2'>My AIs</h1>
					<p className='text-gray-600'>
						Manage your AI creations and track their performance
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
					{/* Sidebar */}
					<div className='lg:col-span-1 space-y-6'>
						{/* Quick Stats */}
						<Card>
							<CardHeader>
								<CardTitle className='text-lg'>Overview</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='text-center'>
									<div className='text-2xl font-bold text-green-600'>
										${analytics.totalRevenue.toFixed(2)}
									</div>
									<div className='text-sm text-gray-500'>Total Revenue</div>
								</div>

								<div className='grid grid-cols-2 gap-4 text-center'>
									<div>
										<div className='text-lg font-semibold'>
											{analytics.totalUsers.toLocaleString()}
										</div>
										<div className='text-xs text-gray-500'>Users</div>
									</div>
									<div>
										<div className='text-lg font-semibold'>
											{analytics.averageRating}
										</div>
										<div className='text-xs text-gray-500'>Avg Rating</div>
									</div>
								</div>

								<div className='pt-4 border-t'>
									<div className='flex items-center justify-between text-sm'>
										<span className='text-gray-600'>Monthly Growth</span>
										<span className='flex items-center text-green-600'>
											<TrendingUp className='h-3 w-3 mr-1' />
											{analytics.monthlyGrowth}%
										</span>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Recent Activity */}
						<Card>
							<CardHeader>
								<CardTitle className='text-lg'>Recent Activity</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='space-y-3'>
									{recentActivity.slice(0, 5).map((activity, index) => (
										<div key={index} className='flex gap-3'>
											<div
												className={`w-2 h-2 rounded-full mt-2 ${
													activity.type === 'review'
														? 'bg-yellow-500'
														: activity.type === 'revenue'
														? 'bg-green-500'
														: activity.type === 'user'
														? 'bg-blue-500'
														: activity.type === 'status'
														? 'bg-purple-500'
														: 'bg-gray-500'
												}`}
											/>
											<div className='flex-1'>
												<p className='text-sm'>{activity.message}</p>
												<p className='text-xs text-gray-500'>{activity.time}</p>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Quick Actions */}
						<Card>
							<CardHeader>
								<CardTitle className='text-lg'>Quick Actions</CardTitle>
							</CardHeader>
							<CardContent className='space-y-3'>
								<Button className='w-full justify-start' asChild>
									<Link href='/create'>
										<Plus className='h-4 w-4 mr-2' />
										Create New AI
									</Link>
								</Button>
								<Button
									variant='outline'
									className='w-full justify-start'
									asChild>
									<Link href='/analytics'>
										<BarChart3 className='h-4 w-4 mr-2' />
										View Analytics
									</Link>
								</Button>
								<Button
									variant='outline'
									className='w-full justify-start'
									asChild>
									<Link href='/wallet'>
										<Download className='h-4 w-4 mr-2' />
										Withdraw Earnings
									</Link>
								</Button>
								<Button
									variant='outline'
									className='w-full justify-start'
									asChild>
									<Link href='/settings'>
										<Settings className='h-4 w-4 mr-2' />
										Creator Settings
									</Link>
								</Button>
							</CardContent>
						</Card>
					</div>

					{/* Main Content */}
					<div className='lg:col-span-3 space-y-6'>
						{/* Filters and Search */}
						<Card>
							<CardContent className='p-6'>
								<div className='flex flex-col md:flex-row gap-4'>
									<div className='flex-1'>
										<div className='relative'>
											<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
											<Input
												placeholder='Search your AIs...'
												className='pl-10'
												value={searchQuery}
												onChange={(e) => setSearchQuery(e.target.value)}
											/>
										</div>
									</div>

									<Select value={statusFilter} onValueChange={setStatusFilter}>
										<SelectTrigger className='w-48'>
											<SelectValue placeholder='Filter by status' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='all'>All Status</SelectItem>
											<SelectItem value='published'>Published</SelectItem>
											<SelectItem value='draft'>Draft</SelectItem>
											<SelectItem value='review'>Under Review</SelectItem>
											<SelectItem value='rejected'>Rejected</SelectItem>
										</SelectContent>
									</Select>

									<Select value={sortBy} onValueChange={setSortBy}>
										<SelectTrigger className='w-48'>
											<SelectValue placeholder='Sort by' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='latest'>Latest Updated</SelectItem>
											<SelectItem value='name'>Name</SelectItem>
											<SelectItem value='revenue'>Revenue</SelectItem>
											<SelectItem value='users'>Users</SelectItem>
											<SelectItem value='rating'>Rating</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>

						{/* AIs Grid */}
						<div className='grid gap-6'>
							{sortedAIs.map((ai) => (
								<Card key={ai.id} className='hover:shadow-lg transition-shadow'>
									<CardContent className='p-6'>
										<div className='flex items-start justify-between'>
											<div className='flex items-start gap-4 flex-1'>
												<Avatar className='h-16 w-16'>
													<AvatarImage src={ai.avatar} />
													<AvatarFallback>{ai.name[0]}</AvatarFallback>
												</Avatar>

												<div className='flex-1'>
													<div className='flex items-center gap-3 mb-2'>
														<h3 className='text-xl font-semibold'>{ai.name}</h3>
														<Badge
															className={`${getStatusColor(
																ai.status
															)} text-white`}>
															{getStatusIcon(ai.status)}
															<span className='ml-1 capitalize'>
																{ai.status}
															</span>
														</Badge>
														{!ai.isActive && ai.status === 'published' && (
															<Badge variant='outline'>Paused</Badge>
														)}
													</div>

													<p className='text-gray-600 mb-3'>{ai.description}</p>

													<div className='flex items-center gap-6 text-sm text-gray-500'>
														<span className='flex items-center gap-1'>
															<Users className='h-3 w-3' />
															{ai.users.toLocaleString()} users
														</span>
														{ai.status === 'published' && (
															<>
																<span className='flex items-center gap-1'>
																	<Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
																	{ai.rating} ({ai.reviewCount})
																</span>
																<span className='flex items-center gap-1'>
																	<DollarSign className='h-3 w-3' />$
																	{ai.revenue.toFixed(2)}
																</span>
																<span className='flex items-center gap-1'>
																	<Eye className='h-3 w-3' />
																	{ai.views.toLocaleString()} views
																</span>
															</>
														)}
													</div>
												</div>
											</div>

											<div className='flex flex-col items-end gap-3'>
												<div className='text-right'>
													<p className='font-semibold text-purple-600'>
														${ai.price}/{ai.priceType}
													</p>
													{ai.status === 'published' && ai.growth > 0 && (
														<p className='text-sm text-green-600 flex items-center'>
															<TrendingUp className='h-3 w-3 mr-1' />+
															{ai.growth}%
														</p>
													)}
												</div>

												<div className='flex gap-2'>
													{ai.status === 'published' && (
														<Button size='sm' variant='outline' asChild>
															<Link href={`/ai/${ai.id}`}>
																<ExternalLink className='h-3 w-3 mr-1' />
																View
															</Link>
														</Button>
													)}

													<Button size='sm' variant='outline' asChild>
														<Link href={`/edit/${ai.id}`}>
															<Edit className='h-3 w-3 mr-1' />
															Edit
														</Link>
													</Button>

													{ai.status === 'published' && (
														<Button size='sm' variant='outline'>
															{ai.isActive ? (
																<>
																	<Pause className='h-3 w-3 mr-1' />
																	Pause
																</>
															) : (
																<>
																	<Play className='h-3 w-3 mr-1' />
																	Resume
																</>
															)}
														</Button>
													)}

													<Button size='sm' variant='outline'>
														<MoreHorizontal className='h-3 w-3' />
													</Button>
												</div>
											</div>
										</div>

										{ai.status === 'published' && (
											<div className='mt-4 pt-4 border-t'>
												<div className='grid grid-cols-4 gap-4'>
													<div className='text-center'>
														<div className='text-lg font-semibold'>
															{ai.users.toLocaleString()}
														</div>
														<div className='text-xs text-gray-500'>
															Total Users
														</div>
													</div>
													<div className='text-center'>
														<div className='text-lg font-semibold'>
															${ai.revenue.toFixed(0)}
														</div>
														<div className='text-xs text-gray-500'>Revenue</div>
													</div>
													<div className='text-center'>
														<div className='text-lg font-semibold'>
															{ai.rating}
														</div>
														<div className='text-xs text-gray-500'>Rating</div>
													</div>
													<div className='text-center'>
														<div className='text-lg font-semibold'>
															{ai.views.toLocaleString()}
														</div>
														<div className='text-xs text-gray-500'>Views</div>
													</div>
												</div>
											</div>
										)}
									</CardContent>
								</Card>
							))}
						</div>

						{sortedAIs.length === 0 && (
							<Card>
								<CardContent className='p-12 text-center'>
									<Bot className='h-16 w-16 text-gray-400 mx-auto mb-4' />
									<h3 className='text-lg font-semibold text-gray-600 mb-2'>
										No AIs found
									</h3>
									<p className='text-gray-500 mb-6'>
										{searchQuery || statusFilter !== 'all'
											? 'Try adjusting your search or filters'
											: "You haven't created any AIs yet. Start by creating your first AI!"}
									</p>
									{!searchQuery && statusFilter === 'all' && (
										<Button asChild>
											<Link href='/create'>
												<Plus className='h-4 w-4 mr-2' />
												Create Your First AI
											</Link>
										</Button>
									)}
								</CardContent>
							</Card>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
