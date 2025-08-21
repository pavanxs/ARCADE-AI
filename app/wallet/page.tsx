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
	Wallet,
	Download,
	Upload,
	Plus,
	DollarSign,
	ArrowUpRight,
	ArrowDownLeft,
	Settings,
	AlertCircle,
	CheckCircle,
	Clock,
	Eye,
	EyeOff,
	Receipt,
	CreditCard,
	ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export default function WalletPage() {
	const [showBalance, setShowBalance] = useState(true);
	const [selectedPeriod, setSelectedPeriod] = useState('30d');
	const [withdrawAmount, setWithdrawAmount] = useState('');
	const [topUpAmount, setTopUpAmount] = useState('');

	const walletData = {
		balance: 2450.75,
		credits: 2450,
		pendingEarnings: 187.5,
		totalEarned: 4304.3,
		totalSpent: 1853.55,
		currency: 'USD',
	};

	const recentTransactions = [
		{
			id: 1,
			type: 'earning',
			description: 'CodeMaster Pro subscription',
			amount: 9.99,
			currency: 'USD',
			timestamp: '2024-01-20T14:30:00Z',
			status: 'completed',
			ai: 'CodeMaster Pro',
		},
		{
			id: 2,
			type: 'purchase',
			description: 'Used Story Weaver AI',
			amount: -2.5,
			currency: 'USD',
			timestamp: '2024-01-20T12:15:00Z',
			status: 'completed',
			ai: 'Story Weaver AI',
		},
		{
			id: 3,
			type: 'earning',
			description: 'Math Tutor Bot usage',
			amount: 5.99,
			currency: 'USD',
			timestamp: '2024-01-19T16:45:00Z',
			status: 'completed',
			ai: 'Math Tutor Bot',
		},
		{
			id: 4,
			type: 'withdrawal',
			description: 'Bank transfer',
			amount: -500.0,
			currency: 'USD',
			timestamp: '2024-01-18T10:00:00Z',
			status: 'processing',
			ai: null,
		},
		{
			id: 5,
			type: 'topup',
			description: 'Credit card top-up',
			amount: 100.0,
			currency: 'USD',
			timestamp: '2024-01-17T09:30:00Z',
			status: 'completed',
			ai: null,
		},
		{
			id: 6,
			type: 'earning',
			description: 'CodeMaster Pro usage',
			amount: 14.99,
			currency: 'USD',
			timestamp: '2024-01-16T11:20:00Z',
			status: 'completed',
			ai: 'CodeMaster Pro',
		},
	];

	const subscriptions = [
		{
			id: 1,
			ai: 'Language Master Pro',
			plan: 'Pro',
			amount: 19.99,
			period: 'monthly',
			nextBilling: '2024-02-15',
			status: 'active',
		},
		{
			id: 2,
			ai: 'Design Assistant AI',
			plan: 'Premium',
			amount: 29.99,
			period: 'monthly',
			nextBilling: '2024-02-20',
			status: 'active',
		},
		{
			id: 3,
			ai: 'Research Helper',
			plan: 'Basic',
			amount: 9.99,
			period: 'monthly',
			nextBilling: '2024-02-25',
			status: 'cancelled',
		},
	];

	const paymentMethods = [
		{
			id: 1,
			type: 'card',
			last4: '4242',
			brand: 'Visa',
			expiryMonth: 12,
			expiryYear: 2027,
			isDefault: true,
		},
		{
			id: 2,
			type: 'card',
			last4: '5555',
			brand: 'Mastercard',
			expiryMonth: 8,
			expiryYear: 2026,
			isDefault: false,
		},
		{
			id: 3,
			type: 'paypal',
			email: 'john@example.com',
			isDefault: false,
		},
	];

	const earningsChart = [
		{ month: 'Jan', earnings: 234.5 },
		{ month: 'Feb', earnings: 445.2 },
		{ month: 'Mar', earnings: 567.8 },
		{ month: 'Apr', earnings: 892.3 },
		{ month: 'May', earnings: 1123.45 },
		{ month: 'Jun', earnings: 1456.78 },
	];

	const getTransactionIcon = (type: string) => {
		switch (type) {
			case 'earning':
				return <ArrowUpRight className='h-4 w-4 text-green-600' />;
			case 'purchase':
				return <ArrowDownLeft className='h-4 w-4 text-red-600' />;
			case 'withdrawal':
				return <Download className='h-4 w-4 text-blue-600' />;
			case 'topup':
				return <Upload className='h-4 w-4 text-purple-600' />;
			default:
				return <DollarSign className='h-4 w-4 text-gray-600' />;
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'completed':
				return <CheckCircle className='h-4 w-4 text-green-600' />;
			case 'processing':
				return <Clock className='h-4 w-4 text-yellow-600' />;
			case 'failed':
				return <AlertCircle className='h-4 w-4 text-red-600' />;
			default:
				return <Clock className='h-4 w-4 text-gray-600' />;
		}
	};

	const formatAmount = (amount: number) => {
		const sign = amount >= 0 ? '+' : '';
		return `${sign}$${Math.abs(amount).toFixed(2)}`;
	};

	const formatDate = (timestamp: string) => {
		return new Date(timestamp).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
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
								<Link href='/billing-settings'>
									<Settings className='h-4 w-4 mr-2' />
									Billing Settings
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</header>

			<div className='container mx-auto px-4 py-8'>
				<div className='mb-8'>
					<h1 className='text-3xl font-bold mb-2'>Wallet & Billing</h1>
					<p className='text-gray-600'>
						Manage your credits, earnings, and payment methods
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
					{/* Sidebar */}
					<div className='lg:col-span-1 space-y-6'>
						{/* Wallet Balance */}
						<Card>
							<CardHeader>
								<div className='flex items-center justify-between'>
									<CardTitle className='flex items-center gap-2'>
										<Wallet className='h-5 w-5' />
										Wallet Balance
									</CardTitle>
									<Button
										variant='ghost'
										size='sm'
										onClick={() => setShowBalance(!showBalance)}>
										{showBalance ? (
											<EyeOff className='h-4 w-4' />
										) : (
											<Eye className='h-4 w-4' />
										)}
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								<div className='space-y-4'>
									<div className='text-center'>
										<div className='text-3xl font-bold text-green-600 mb-1'>
											{showBalance
												? `$${walletData.balance.toFixed(2)}`
												: '••••••'}
										</div>
										<div className='text-sm text-gray-500'>
											Available Balance
										</div>
									</div>

									<div className='grid grid-cols-2 gap-4 text-center text-sm'>
										<div>
											<div className='font-semibold text-purple-600'>
												{showBalance
													? walletData.credits.toLocaleString()
													: '••••'}
											</div>
											<div className='text-gray-500'>Credits</div>
										</div>
										<div>
											<div className='font-semibold text-yellow-600'>
												{showBalance
													? `$${walletData.pendingEarnings.toFixed(2)}`
													: '••••'}
											</div>
											<div className='text-gray-500'>Pending</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Quick Actions */}
						<Card>
							<CardHeader>
								<CardTitle>Quick Actions</CardTitle>
							</CardHeader>
							<CardContent className='space-y-3'>
								<Button className='w-full justify-start'>
									<Plus className='h-4 w-4 mr-2' />
									Add Credits
								</Button>
								<Button variant='outline' className='w-full justify-start'>
									<Download className='h-4 w-4 mr-2' />
									Withdraw Funds
								</Button>
								<Button variant='outline' className='w-full justify-start'>
									<Receipt className='h-4 w-4 mr-2' />
									Download Statement
								</Button>
								<Button variant='outline' className='w-full justify-start'>
									<CreditCard className='h-4 w-4 mr-2' />
									Manage Cards
								</Button>
							</CardContent>
						</Card>

						{/* Earnings Overview */}
						<Card>
							<CardHeader>
								<CardTitle>Earnings Overview</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='space-y-3'>
									<div className='flex justify-between'>
										<span className='text-sm text-gray-600'>Total Earned</span>
										<span className='font-semibold text-green-600'>
											${walletData.totalEarned.toFixed(2)}
										</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-sm text-gray-600'>Total Spent</span>
										<span className='font-semibold text-red-600'>
											${walletData.totalSpent.toFixed(2)}
										</span>
									</div>
									<div className='flex justify-between pt-2 border-t'>
										<span className='text-sm font-medium'>Net Profit</span>
										<span className='font-semibold text-purple-600'>
											$
											{(walletData.totalEarned - walletData.totalSpent).toFixed(
												2
											)}
										</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Main Content */}
					<div className='lg:col-span-3'>
						<Tabs defaultValue='transactions' className='w-full'>
							<TabsList className='grid w-full grid-cols-4'>
								<TabsTrigger value='transactions'>Transactions</TabsTrigger>
								<TabsTrigger value='subscriptions'>Subscriptions</TabsTrigger>
								<TabsTrigger value='payments'>Payment Methods</TabsTrigger>
								<TabsTrigger value='earnings'>Earnings</TabsTrigger>
							</TabsList>

							<TabsContent value='transactions' className='space-y-6 mt-6'>
								{/* Transaction Filters */}
								<Card>
									<CardContent className='p-4'>
										<div className='flex gap-4'>
											<Select defaultValue='all'>
												<SelectTrigger className='w-48'>
													<SelectValue placeholder='Transaction Type' />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='all'>All Transactions</SelectItem>
													<SelectItem value='earning'>Earnings</SelectItem>
													<SelectItem value='purchase'>Purchases</SelectItem>
													<SelectItem value='withdrawal'>
														Withdrawals
													</SelectItem>
													<SelectItem value='topup'>Top-ups</SelectItem>
												</SelectContent>
											</Select>

											<Select
												value={selectedPeriod}
												onValueChange={setSelectedPeriod}>
												<SelectTrigger className='w-32'>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='7d'>Last 7 days</SelectItem>
													<SelectItem value='30d'>Last 30 days</SelectItem>
													<SelectItem value='90d'>Last 3 months</SelectItem>
													<SelectItem value='1y'>Last year</SelectItem>
												</SelectContent>
											</Select>

											<Button variant='outline'>
												<Download className='h-4 w-4 mr-2' />
												Export
											</Button>
										</div>
									</CardContent>
								</Card>

								{/* Transactions List */}
								<Card>
									<CardHeader>
										<CardTitle>Recent Transactions</CardTitle>
									</CardHeader>
									<CardContent>
										<div className='space-y-4'>
											{recentTransactions.map((transaction) => (
												<div
													key={transaction.id}
													className='flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50'>
													<div className='flex items-center gap-4'>
														<div className='p-2 bg-gray-100 rounded-lg'>
															{getTransactionIcon(transaction.type)}
														</div>
														<div>
															<p className='font-medium'>
																{transaction.description}
															</p>
															<div className='flex items-center gap-2 text-sm text-gray-500'>
																<span>{formatDate(transaction.timestamp)}</span>
																{transaction.ai && (
																	<>
																		<span>•</span>
																		<span>{transaction.ai}</span>
																	</>
																)}
															</div>
														</div>
													</div>

													<div className='flex items-center gap-3'>
														<div className='text-right'>
															<p
																className={`font-semibold ${
																	transaction.amount >= 0
																		? 'text-green-600'
																		: 'text-red-600'
																}`}>
																{formatAmount(transaction.amount)}
															</p>
															<div className='flex items-center gap-1'>
																{getStatusIcon(transaction.status)}
																<span className='text-xs text-gray-500 capitalize'>
																	{transaction.status}
																</span>
															</div>
														</div>

														<Button variant='ghost' size='sm'>
															<ExternalLink className='h-4 w-4' />
														</Button>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value='subscriptions' className='space-y-6 mt-6'>
								<Card>
									<CardHeader>
										<CardTitle>Active Subscriptions</CardTitle>
										<CardDescription>
											Manage your AI subscriptions and billing
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className='space-y-4'>
											{subscriptions.map((subscription) => (
												<div
													key={subscription.id}
													className={`p-4 border rounded-lg ${
														subscription.status === 'cancelled'
															? 'opacity-60'
															: ''
													}`}>
													<div className='flex items-center justify-between'>
														<div>
															<h3 className='font-semibold'>
																{subscription.ai}
															</h3>
															<p className='text-sm text-gray-600'>
																{subscription.plan} Plan • $
																{subscription.amount}/{subscription.period}
															</p>
															<p className='text-xs text-gray-500'>
																Next billing:{' '}
																{new Date(
																	subscription.nextBilling
																).toLocaleDateString()}
															</p>
														</div>

														<div className='flex items-center gap-3'>
															<Badge
																variant={
																	subscription.status === 'active'
																		? 'default'
																		: 'secondary'
																}>
																{subscription.status}
															</Badge>

															{subscription.status === 'active' ? (
																<Button variant='outline' size='sm'>
																	Cancel
																</Button>
															) : (
																<Button variant='outline' size='sm'>
																	Reactivate
																</Button>
															)}
														</div>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value='payments' className='space-y-6 mt-6'>
								<div className='grid gap-6'>
									{/* Add Payment Method */}
									<Card>
										<CardHeader>
											<CardTitle>Add Payment Method</CardTitle>
										</CardHeader>
										<CardContent>
											<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
												<Button variant='outline' className='p-6 h-auto'>
													<div className='text-center'>
														<CreditCard className='h-8 w-8 mx-auto mb-2' />
														<p className='font-medium'>Credit Card</p>
														<p className='text-xs text-gray-500'>
															Visa, Mastercard, etc.
														</p>
													</div>
												</Button>

												<Button variant='outline' className='p-6 h-auto'>
													<div className='text-center'>
														<Wallet className='h-8 w-8 mx-auto mb-2' />
														<p className='font-medium'>PayPal</p>
														<p className='text-xs text-gray-500'>
															Pay with PayPal account
														</p>
													</div>
												</Button>

												<Button variant='outline' className='p-6 h-auto'>
													<div className='text-center'>
														<DollarSign className='h-8 w-8 mx-auto mb-2' />
														<p className='font-medium'>Bank Transfer</p>
														<p className='text-xs text-gray-500'>
															Direct bank account
														</p>
													</div>
												</Button>
											</div>
										</CardContent>
									</Card>

									{/* Saved Payment Methods */}
									<Card>
										<CardHeader>
											<CardTitle>Saved Payment Methods</CardTitle>
										</CardHeader>
										<CardContent>
											<div className='space-y-4'>
												{paymentMethods.map((method) => (
													<div
														key={method.id}
														className='flex items-center justify-between p-4 border rounded-lg'>
														<div className='flex items-center gap-4'>
															<div className='p-2 bg-gray-100 rounded-lg'>
																<CreditCard className='h-5 w-5' />
															</div>
															<div>
																{method.type === 'card' ? (
																	<>
																		<p className='font-medium'>
																			{method.brand} •••• {method.last4}
																		</p>
																		<p className='text-sm text-gray-500'>
																			Expires {method.expiryMonth}/
																			{method.expiryYear}
																		</p>
																	</>
																) : (
																	<>
																		<p className='font-medium'>PayPal</p>
																		<p className='text-sm text-gray-500'>
																			{method.email}
																		</p>
																	</>
																)}
															</div>
														</div>

														<div className='flex items-center gap-3'>
															{method.isDefault && (
																<Badge variant='outline'>Default</Badge>
															)}
															<Button variant='outline' size='sm'>
																Edit
															</Button>
															<Button variant='outline' size='sm'>
																Remove
															</Button>
														</div>
													</div>
												))}
											</div>
										</CardContent>
									</Card>
								</div>
							</TabsContent>

							<TabsContent value='earnings' className='space-y-6 mt-6'>
								{/* Earnings Chart */}
								<Card>
									<CardHeader>
										<CardTitle>Earnings Over Time</CardTitle>
									</CardHeader>
									<CardContent>
										<div className='h-64 flex items-end justify-between gap-2'>
											{earningsChart.map((data, index) => (
												<div
													key={index}
													className='flex flex-col items-center flex-1'>
													<div
														className='bg-purple-500 rounded-t w-full min-h-[20px]'
														style={{
															height: `${(data.earnings / 1500) * 200}px`,
														}}
													/>
													<div className='text-xs text-gray-500 mt-2'>
														{data.month}
													</div>
													<div className='text-xs font-medium'>
														${data.earnings.toFixed(0)}
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>

								{/* Withdrawal Options */}
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<Card>
										<CardHeader>
											<CardTitle>Withdraw Earnings</CardTitle>
											<CardDescription>
												Transfer your earnings to your bank account
											</CardDescription>
										</CardHeader>
										<CardContent className='space-y-4'>
											<div>
												<Label htmlFor='withdraw-amount'>
													Amount to withdraw
												</Label>
												<Input
													id='withdraw-amount'
													type='number'
													placeholder='0.00'
													value={withdrawAmount}
													onChange={(e) => setWithdrawAmount(e.target.value)}
													className='mt-1'
												/>
												<p className='text-xs text-gray-500 mt-1'>
													Available: ${walletData.balance.toFixed(2)}
												</p>
											</div>

											<div>
												<Label>Withdrawal method</Label>
												<Select defaultValue='bank'>
													<SelectTrigger className='mt-1'>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='bank'>
															Bank Transfer (2-3 days)
														</SelectItem>
														<SelectItem value='paypal'>
															PayPal (Instant)
														</SelectItem>
													</SelectContent>
												</Select>
											</div>

											<Button className='w-full'>
												<Download className='h-4 w-4 mr-2' />
												Withdraw ${withdrawAmount || '0.00'}
											</Button>
										</CardContent>
									</Card>

									<Card>
										<CardHeader>
											<CardTitle>Top Up Credits</CardTitle>
											<CardDescription>
												Add credits to use AI services
											</CardDescription>
										</CardHeader>
										<CardContent className='space-y-4'>
											<div>
												<Label htmlFor='topup-amount'>Amount to add</Label>
												<Input
													id='topup-amount'
													type='number'
													placeholder='0.00'
													value={topUpAmount}
													onChange={(e) => setTopUpAmount(e.target.value)}
													className='mt-1'
												/>
											</div>

											<div className='grid grid-cols-3 gap-2'>
												{[25, 50, 100].map((amount) => (
													<Button
														key={amount}
														variant='outline'
														size='sm'
														onClick={() => setTopUpAmount(amount.toString())}>
														${amount}
													</Button>
												))}
											</div>

											<div>
												<Label>Payment method</Label>
												<Select defaultValue='card-4242'>
													<SelectTrigger className='mt-1'>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='card-4242'>
															Visa •••• 4242
														</SelectItem>
														<SelectItem value='paypal'>PayPal</SelectItem>
													</SelectContent>
												</Select>
											</div>

											<Button className='w-full'>
												<Plus className='h-4 w-4 mr-2' />
												Add ${topUpAmount || '0.00'}
											</Button>
										</CardContent>
									</Card>
								</div>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</div>
		</div>
	);
}
