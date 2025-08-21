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
import { Progress } from '@/components/ui/progress';
import {
	Upload,
	Bot,
	ArrowLeft,
	Save,
	Eye,
	Settings,
	DollarSign,
	Globe,
	Lock,
	FileText,
	Image,
	Code,
	Zap,
	AlertCircle,
	CheckCircle,
	Plus,
	X,
	Upload as UploadIcon,
} from 'lucide-react';
import Link from 'next/link';

export default function CreateAI() {
	const [currentStep, setCurrentStep] = useState(1);
	const [aiData, setAiData] = useState({
		name: '',
		description: '',
		longDescription: '',
		category: '',
		tags: [],
		pricing: {
			type: 'free',
			price: 0,
			period: 'month',
		},
		features: [],
		supportedLanguages: [],
		visibility: 'public',
		avatar: null,
		screenshots: [],
		modelFile: null,
		apiEndpoint: '',
		documentation: '',
		website: '',
		supportEmail: '',
	});
	const [tagInput, setTagInput] = useState('');
	const [featureInput, setFeatureInput] = useState('');

	const categories = [
		'Productivity',
		'Games & Entertainment',
		'Education',
		'Wellness',
		'Finance',
		'Creative',
		'Developer Tools',
		'Business',
		'Healthcare',
		'Other',
	];

	const languages = [
		'JavaScript',
		'Python',
		'Java',
		'C++',
		'TypeScript',
		'Go',
		'Rust',
		'PHP',
		'C#',
		'Ruby',
		'Swift',
		'Kotlin',
		'Dart',
		'R',
		'MATLAB',
	];

	const pricingTypes = [
		{ id: 'free', name: 'Free', description: 'No cost to users' },
		{
			id: 'freemium',
			name: 'Freemium',
			description: 'Free with premium features',
		},
		{
			id: 'subscription',
			name: 'Subscription',
			description: 'Monthly/yearly subscription',
		},
		{
			id: 'pay-per-use',
			name: 'Pay Per Use',
			description: 'Users pay for each interaction',
		},
		{
			id: 'one-time',
			name: 'One-time Purchase',
			description: 'Single payment',
		},
	];

	const steps = [
		{
			id: 1,
			name: 'Basic Info',
			description: 'Name, description, and category',
		},
		{
			id: 2,
			name: 'AI Model',
			description: 'Upload your AI model or connect API',
		},
		{ id: 3, name: 'Pricing', description: 'Set your pricing strategy' },
		{ id: 4, name: 'Media', description: 'Add images and documentation' },
		{ id: 5, name: 'Review', description: 'Review and publish' },
	];

	const addTag = () => {
		if (tagInput && !aiData.tags.includes(tagInput)) {
			setAiData((prev) => ({
				...prev,
				tags: [...prev.tags, tagInput],
			}));
			setTagInput('');
		}
	};

	const removeTag = (tagToRemove) => {
		setAiData((prev) => ({
			...prev,
			tags: prev.tags.filter((tag) => tag !== tagToRemove),
		}));
	};

	const addFeature = () => {
		if (featureInput && !aiData.features.includes(featureInput)) {
			setAiData((prev) => ({
				...prev,
				features: [...prev.features, featureInput],
			}));
			setFeatureInput('');
		}
	};

	const removeFeature = (featureToRemove) => {
		setAiData((prev) => ({
			...prev,
			features: prev.features.filter((feature) => feature !== featureToRemove),
		}));
	};

	const handleLanguageToggle = (language) => {
		setAiData((prev) => ({
			...prev,
			supportedLanguages: prev.supportedLanguages.includes(language)
				? prev.supportedLanguages.filter((l) => l !== language)
				: [...prev.supportedLanguages, language],
		}));
	};

	const nextStep = () => {
		if (currentStep < steps.length) {
			setCurrentStep(currentStep + 1);
		}
	};

	const prevStep = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
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
					{/* Progress Header */}
					<div className='mb-8'>
						<h1 className='text-3xl font-bold mb-2'>Create Your AI</h1>
						<p className='text-gray-600 mb-6'>
							Share your AI with the world and start earning
						</p>

						{/* Progress Indicator */}
						<div className='relative'>
							<Progress
								value={(currentStep / steps.length) * 100}
								className='mb-4'
							/>
							<div className='flex justify-between'>
								{steps.map((step) => (
									<div
										key={step.id}
										className={`flex flex-col items-center ${
											step.id <= currentStep
												? 'text-purple-600'
												: 'text-gray-400'
										}`}>
										<div
											className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
												step.id <= currentStep
													? 'bg-purple-600 text-white'
													: 'bg-gray-200 text-gray-600'
											}`}>
											{step.id}
										</div>
										<span className='text-xs mt-1 text-center'>
											{step.name}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>

					<Card>
						<CardContent className='p-8'>
							{/* Step 1: Basic Info */}
							{currentStep === 1 && (
								<div className='space-y-6'>
									<div>
										<h2 className='text-2xl font-bold mb-4'>
											Basic Information
										</h2>
										<p className='text-gray-600 mb-6'>
											Tell us about your AI and what it does
										</p>
									</div>

									<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
										<div className='space-y-4'>
											<div>
												<Label htmlFor='ai-name'>AI Name *</Label>
												<Input
													id='ai-name'
													placeholder="Enter your AI's name"
													value={aiData.name}
													onChange={(e) =>
														setAiData((prev) => ({
															...prev,
															name: e.target.value,
														}))
													}
													className='mt-1'
												/>
											</div>

											<div>
												<Label htmlFor='category'>Category *</Label>
												<Select
													value={aiData.category}
													onValueChange={(value) =>
														setAiData((prev) => ({ ...prev, category: value }))
													}>
													<SelectTrigger className='mt-1'>
														<SelectValue placeholder='Select a category' />
													</SelectTrigger>
													<SelectContent>
														{categories.map((category) => (
															<SelectItem
																key={category}
																value={category.toLowerCase()}>
																{category}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>

											<div>
												<Label htmlFor='visibility'>Visibility</Label>
												<Select
													value={aiData.visibility}
													onValueChange={(value) =>
														setAiData((prev) => ({
															...prev,
															visibility: value,
														}))
													}>
													<SelectTrigger className='mt-1'>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='public'>
															<div className='flex items-center gap-2'>
																<Globe className='h-4 w-4' />
																Public - Anyone can discover and use
															</div>
														</SelectItem>
														<SelectItem value='private'>
															<div className='flex items-center gap-2'>
																<Lock className='h-4 w-4' />
																Private - Only you can access
															</div>
														</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</div>

										<div className='space-y-4'>
											<div>
												<Label htmlFor='description'>Short Description *</Label>
												<Textarea
													id='description'
													placeholder='Brief description of what your AI does (max 160 characters)'
													value={aiData.description}
													onChange={(e) =>
														setAiData((prev) => ({
															...prev,
															description: e.target.value,
														}))
													}
													className='mt-1'
													maxLength={160}
												/>
												<p className='text-xs text-gray-500 mt-1'>
													{aiData.description.length}/160 characters
												</p>
											</div>

											<div>
												<Label htmlFor='long-description'>
													Detailed Description
												</Label>
												<Textarea
													id='long-description'
													placeholder="Detailed description of your AI's capabilities, use cases, and features"
													value={aiData.longDescription}
													onChange={(e) =>
														setAiData((prev) => ({
															...prev,
															longDescription: e.target.value,
														}))
													}
													className='mt-1 min-h-[120px]'
												/>
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
											{aiData.tags.map((tag) => (
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

									<div>
										<Label>
											Supported Programming Languages (if applicable)
										</Label>
										<div className='grid grid-cols-3 md:grid-cols-5 gap-3 mt-3'>
											{languages.map((language) => (
												<div
													key={language}
													className='flex items-center space-x-2'>
													<Checkbox
														id={language}
														checked={aiData.supportedLanguages.includes(
															language
														)}
														onCheckedChange={() =>
															handleLanguageToggle(language)
														}
													/>
													<Label htmlFor={language} className='text-sm'>
														{language}
													</Label>
												</div>
											))}
										</div>
									</div>
								</div>
							)}

							{/* Step 2: AI Model */}
							{currentStep === 2 && (
								<div className='space-y-6'>
									<div>
										<h2 className='text-2xl font-bold mb-4'>AI Model Setup</h2>
										<p className='text-gray-600 mb-6'>
											Upload your model or connect your API endpoint
										</p>
									</div>

									<Tabs defaultValue='upload' className='w-full'>
										<TabsList className='grid w-full grid-cols-2'>
											<TabsTrigger value='upload'>Upload Model</TabsTrigger>
											<TabsTrigger value='api'>API Endpoint</TabsTrigger>
										</TabsList>

										<TabsContent value='upload' className='space-y-6'>
											<div className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center'>
												<UploadIcon className='mx-auto h-12 w-12 text-gray-400 mb-4' />
												<h3 className='text-lg font-medium mb-2'>
													Upload your AI model
												</h3>
												<p className='text-gray-500 mb-4'>
													Supported formats: .pkl, .pt, .h5, .onnx, .tflite
												</p>
												<Button>
													<Upload className='h-4 w-4 mr-2' />
													Choose File
												</Button>
												<p className='text-xs text-gray-400 mt-2'>
													Max file size: 500MB
												</p>
											</div>

											<div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
												<div className='flex items-start gap-3'>
													<AlertCircle className='h-5 w-5 text-blue-600 mt-0.5' />
													<div>
														<h4 className='font-medium text-blue-900'>
															Model Requirements
														</h4>
														<ul className='text-sm text-blue-700 mt-1 space-y-1'>
															<li>
																• Model must be compatible with our inference
																engine
															</li>
															<li>
																• Include model metadata and input/output
																specifications
															</li>
															<li>
																• Ensure your model follows our content
																guidelines
															</li>
														</ul>
													</div>
												</div>
											</div>
										</TabsContent>

										<TabsContent value='api' className='space-y-6'>
											<div>
												<Label htmlFor='api-endpoint'>API Endpoint URL *</Label>
												<Input
													id='api-endpoint'
													placeholder='https://your-api.com/endpoint'
													value={aiData.apiEndpoint}
													onChange={(e) =>
														setAiData((prev) => ({
															...prev,
															apiEndpoint: e.target.value,
														}))
													}
													className='mt-1'
												/>
												<p className='text-xs text-gray-500 mt-1'>
													Your API should accept POST requests with JSON payload
												</p>
											</div>

											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												<div>
													<Label>Authentication Method</Label>
													<Select defaultValue='api-key'>
														<SelectTrigger className='mt-1'>
															<SelectValue />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value='none'>
																No Authentication
															</SelectItem>
															<SelectItem value='api-key'>API Key</SelectItem>
															<SelectItem value='bearer'>
																Bearer Token
															</SelectItem>
															<SelectItem value='oauth'>OAuth 2.0</SelectItem>
														</SelectContent>
													</Select>
												</div>

												<div>
													<Label htmlFor='api-key'>API Key</Label>
													<Input
														id='api-key'
														type='password'
														placeholder='Your API key'
														className='mt-1'
													/>
												</div>
											</div>

											<div>
												<Label>Test Your API</Label>
												<div className='border rounded-lg p-4 mt-2'>
													<div className='flex gap-3 mb-3'>
														<Input
															placeholder='Test input message'
															className='flex-1'
														/>
														<Button>Test</Button>
													</div>
													<div className='bg-gray-50 rounded p-3 text-sm'>
														<p className='text-gray-500'>
															API response will appear here...
														</p>
													</div>
												</div>
											</div>
										</TabsContent>
									</Tabs>

									<div>
										<Label>Features Your AI Provides</Label>
										<div className='flex gap-2 mt-2 mb-3'>
											<Input
												placeholder='Add a feature'
												value={featureInput}
												onChange={(e) => setFeatureInput(e.target.value)}
												onKeyPress={(e) => e.key === 'Enter' && addFeature()}
												className='flex-1'
											/>
											<Button onClick={addFeature} variant='outline'>
												<Plus className='h-4 w-4' />
											</Button>
										</div>
										<div className='space-y-2'>
											{aiData.features.map((feature) => (
												<div
													key={feature}
													className='flex items-center justify-between p-3 border rounded-lg'>
													<div className='flex items-center gap-2'>
														<CheckCircle className='h-4 w-4 text-green-500' />
														<span>{feature}</span>
													</div>
													<button onClick={() => removeFeature(feature)}>
														<X className='h-4 w-4 text-gray-400 hover:text-red-500' />
													</button>
												</div>
											))}
										</div>
									</div>
								</div>
							)}

							{/* Step 3: Pricing */}
							{currentStep === 3 && (
								<div className='space-y-6'>
									<div>
										<h2 className='text-2xl font-bold mb-4'>
											Pricing Strategy
										</h2>
										<p className='text-gray-600 mb-6'>
											Choose how you want to monetize your AI
										</p>
									</div>

									<div className='grid gap-4'>
										{pricingTypes.map((type) => (
											<div
												key={type.id}
												className={`border rounded-lg p-4 cursor-pointer transition-colors ${
													aiData.pricing.type === type.id
														? 'border-purple-500 bg-purple-50'
														: 'hover:border-gray-300'
												}`}
												onClick={() =>
													setAiData((prev) => ({
														...prev,
														pricing: { ...prev.pricing, type: type.id },
													}))
												}>
												<div className='flex items-center justify-between'>
													<div>
														<h3 className='font-semibold'>{type.name}</h3>
														<p className='text-sm text-gray-600'>
															{type.description}
														</p>
													</div>
													<div
														className={`w-4 h-4 rounded-full border-2 ${
															aiData.pricing.type === type.id
																? 'border-purple-500 bg-purple-500'
																: 'border-gray-300'
														}`}
													/>
												</div>
											</div>
										))}
									</div>

									{aiData.pricing.type !== 'free' && (
										<div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border rounded-lg bg-gray-50'>
											<div>
												<Label htmlFor='price'>Price *</Label>
												<div className='relative mt-1'>
													<DollarSign className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
													<Input
														id='price'
														type='number'
														placeholder='0.00'
														value={aiData.pricing.price}
														onChange={(e) =>
															setAiData((prev) => ({
																...prev,
																pricing: {
																	...prev.pricing,
																	price: parseFloat(e.target.value) || 0,
																},
															}))
														}
														className='pl-9'
														step='0.01'
														min='0'
													/>
												</div>
											</div>

											{(aiData.pricing.type === 'subscription' ||
												aiData.pricing.type === 'freemium') && (
												<div>
													<Label>Billing Period</Label>
													<Select
														value={aiData.pricing.period}
														onValueChange={(value) =>
															setAiData((prev) => ({
																...prev,
																pricing: { ...prev.pricing, period: value },
															}))
														}>
														<SelectTrigger className='mt-1'>
															<SelectValue />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value='day'>Per Day</SelectItem>
															<SelectItem value='week'>Per Week</SelectItem>
															<SelectItem value='month'>Per Month</SelectItem>
															<SelectItem value='year'>Per Year</SelectItem>
														</SelectContent>
													</Select>
												</div>
											)}
										</div>
									)}

									<div className='bg-green-50 border border-green-200 rounded-lg p-4'>
										<div className='flex items-start gap-3'>
											<DollarSign className='h-5 w-5 text-green-600 mt-0.5' />
											<div>
												<h4 className='font-medium text-green-900'>
													Revenue Sharing
												</h4>
												<p className='text-sm text-green-700 mt-1'>
													You keep 80% of all revenue. Our platform fee is 20%
													which covers hosting, payment processing, customer
													support, and platform maintenance.
												</p>
											</div>
										</div>
									</div>
								</div>
							)}

							{/* Step 4: Media */}
							{currentStep === 4 && (
								<div className='space-y-6'>
									<div>
										<h2 className='text-2xl font-bold mb-4'>
											Media & Documentation
										</h2>
										<p className='text-gray-600 mb-6'>
											Add images and documentation to showcase your AI
										</p>
									</div>

									<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
										<div>
											<Label>AI Avatar</Label>
											<div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mt-2'>
												<Image className='mx-auto h-8 w-8 text-gray-400 mb-2' />
												<p className='text-sm text-gray-600 mb-2'>
													Upload an avatar for your AI
												</p>
												<Button variant='outline' size='sm'>
													Choose Image
												</Button>
												<p className='text-xs text-gray-400 mt-2'>
													PNG, JPG up to 2MB
												</p>
											</div>
										</div>

										<div>
											<Label>Screenshots</Label>
											<div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mt-2'>
												<Image className='mx-auto h-8 w-8 text-gray-400 mb-2' />
												<p className='text-sm text-gray-600 mb-2'>
													Add screenshots of your AI in action
												</p>
												<Button variant='outline' size='sm'>
													Add Screenshots
												</Button>
												<p className='text-xs text-gray-400 mt-2'>
													PNG, JPG up to 5MB each
												</p>
											</div>
										</div>
									</div>

									<div>
										<Label htmlFor='documentation'>Documentation</Label>
										<Textarea
											id='documentation'
											placeholder='Provide detailed documentation on how to use your AI, including examples and best practices'
											value={aiData.documentation}
											onChange={(e) =>
												setAiData((prev) => ({
													...prev,
													documentation: e.target.value,
												}))
											}
											className='mt-2 min-h-[150px]'
										/>
									</div>

									<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
										<div>
											<Label htmlFor='website'>Website (Optional)</Label>
											<Input
												id='website'
												placeholder='https://your-website.com'
												value={aiData.website}
												onChange={(e) =>
													setAiData((prev) => ({
														...prev,
														website: e.target.value,
													}))
												}
												className='mt-1'
											/>
										</div>

										<div>
											<Label htmlFor='support-email'>Support Email</Label>
											<Input
												id='support-email'
												type='email'
												placeholder='support@your-domain.com'
												value={aiData.supportEmail}
												onChange={(e) =>
													setAiData((prev) => ({
														...prev,
														supportEmail: e.target.value,
													}))
												}
												className='mt-1'
											/>
										</div>
									</div>
								</div>
							)}

							{/* Step 5: Review */}
							{currentStep === 5 && (
								<div className='space-y-6'>
									<div>
										<h2 className='text-2xl font-bold mb-4'>
											Review & Publish
										</h2>
										<p className='text-gray-600 mb-6'>
											Review your AI details before publishing
										</p>
									</div>

									<div className='space-y-6'>
										<Card>
											<CardHeader>
												<CardTitle>AI Preview</CardTitle>
											</CardHeader>
											<CardContent>
												<div className='flex items-start gap-4'>
													<div className='w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center'>
														<Bot className='h-8 w-8 text-purple-600' />
													</div>
													<div className='flex-1'>
														<h3 className='text-xl font-bold'>
															{aiData.name || 'Your AI Name'}
														</h3>
														<p className='text-gray-600 mb-2'>
															{aiData.description ||
																'AI description will appear here'}
														</p>
														<div className='flex items-center gap-4 text-sm text-gray-500'>
															<Badge variant='outline'>
																{aiData.category || 'Category'}
															</Badge>
															<span>
																{aiData.pricing.type === 'free'
																	? 'Free'
																	: `$${aiData.pricing.price}/${aiData.pricing.period}`}
															</span>
														</div>
													</div>
												</div>
											</CardContent>
										</Card>

										<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
											<Card>
												<CardHeader>
													<CardTitle className='text-lg'>
														Details Summary
													</CardTitle>
												</CardHeader>
												<CardContent className='space-y-3'>
													<div className='flex justify-between'>
														<span className='text-gray-600'>Category:</span>
														<span>{aiData.category || 'Not set'}</span>
													</div>
													<div className='flex justify-between'>
														<span className='text-gray-600'>Visibility:</span>
														<span className='capitalize'>
															{aiData.visibility}
														</span>
													</div>
													<div className='flex justify-between'>
														<span className='text-gray-600'>Tags:</span>
														<span>{aiData.tags.length} tags</span>
													</div>
													<div className='flex justify-between'>
														<span className='text-gray-600'>Features:</span>
														<span>{aiData.features.length} features</span>
													</div>
												</CardContent>
											</Card>

											<Card>
												<CardHeader>
													<CardTitle className='text-lg'>
														Publishing Checklist
													</CardTitle>
												</CardHeader>
												<CardContent className='space-y-3'>
													<div className='flex items-center gap-2'>
														<CheckCircle className='h-4 w-4 text-green-500' />
														<span className='text-sm'>
															Basic information complete
														</span>
													</div>
													<div className='flex items-center gap-2'>
														<CheckCircle className='h-4 w-4 text-green-500' />
														<span className='text-sm'>AI model configured</span>
													</div>
													<div className='flex items-center gap-2'>
														<CheckCircle className='h-4 w-4 text-green-500' />
														<span className='text-sm'>
															Pricing strategy set
														</span>
													</div>
													<div className='flex items-center gap-2'>
														<AlertCircle className='h-4 w-4 text-yellow-500' />
														<span className='text-sm'>
															Media uploads (optional)
														</span>
													</div>
												</CardContent>
											</Card>
										</div>

										<div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
											<div className='flex items-start gap-3'>
												<AlertCircle className='h-5 w-5 text-blue-600 mt-0.5' />
												<div>
													<h4 className='font-medium text-blue-900'>
														Before Publishing
													</h4>
													<ul className='text-sm text-blue-700 mt-1 space-y-1'>
														<li>• Your AI will be reviewed within 24 hours</li>
														<li>
															• Make sure your AI complies with our community
															guidelines
														</li>
														<li>• Test your AI thoroughly before publishing</li>
														<li>
															• You can update your AI anytime after publishing
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}

							{/* Navigation Buttons */}
							<div className='flex justify-between pt-8'>
								<Button
									variant='outline'
									onClick={prevStep}
									disabled={currentStep === 1}>
									Previous
								</Button>

								<div className='flex gap-3'>
									<Button variant='outline'>Save Draft</Button>

									{currentStep < steps.length ? (
										<Button onClick={nextStep}>Next</Button>
									) : (
										<Button className='bg-gradient-to-r from-purple-600 to-blue-600'>
											<Zap className='h-4 w-4 mr-2' />
											Publish AI
										</Button>
									)}
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
