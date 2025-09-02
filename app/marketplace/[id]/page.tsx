"use client";

import React, { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, MessageCircle, DollarSign, Bot, FileText, User, Calendar, Shield } from "lucide-react";
import Link from "next/link";
import { ChatInterface } from "@/components/chat/chat-interface";
import { PaymentFlow } from "@/components/payment/payment-flow";

// Mock data - will be replaced with real API data
const mockAgent = {
  id: "1",
  name: "Financial Advisor Pro",
  description: "Expert AI agent for financial planning, investment advice, and portfolio management with 15+ years of market data.",
  creator: "0x1234...5678",
  creatorName: "John Smith",
  category: "Finance",
  rating: 4.8,
  totalRatings: 156,
  interactions: 1250,
  tags: ["Finance", "Investment", "Planning", "Portfolio", "Analysis"],
  knowledgeBase: "Market analysis reports, financial planning guides, investment strategies, economic research papers",
  createdAt: "2024-01-15",
  lastUpdated: "2024-01-20",
  tiers: [
    {
      id: "free",
      name: "Free Preview",
      description: "Try the agent with limited interactions",
      price: 0,
      currency: "USDC",
      priceModel: "per_query",
      usageLimits: { queriesPerDay: 5 },
      features: ["5 queries per day", "Basic responses", "No priority support"]
    },
    {
      id: "standard",
      name: "Standard Access",
      description: "Full access to the agent's capabilities",
      price: 0.5,
      currency: "USDC",
      priceModel: "per_query",
      usageLimits: { unlimited: true },
      features: ["Unlimited queries", "Detailed responses", "Priority support", "Access to full knowledge base"]
    },
    {
      id: "premium",
      name: "Premium Subscription",
      description: "Monthly subscription with additional benefits",
      price: 25,
      currency: "USDC",
      priceModel: "monthly_subscription",
      usageLimits: { unlimited: true },
      features: ["Everything in Standard", "Monthly market reports", "Direct creator access", "Custom analysis"]
    }
  ],
  reviews: [
    {
      id: "1",
      user: "0x9876...5432",
      userName: "CryptoTrader",
      rating: 5,
      comment: "Excellent financial advice! The agent helped me optimize my portfolio allocation.",
      date: "2024-01-18"
    },
    {
      id: "2", 
      user: "0x5432...9876",
      userName: "InvestorJoe",
      rating: 4,
      comment: "Very knowledgeable about market trends. Could use more real-time data.",
      date: "2024-01-16"
    }
  ]
};

export default function AgentProfile({ params }: { params: { id: string } }) {
  const [showChat, setShowChat] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedTier, setSelectedTier] = useState<any>(null);

  const handleChatStart = () => {
    setShowChat(true);
  };

  const handlePurchaseAccess = (tier: any) => {
    setSelectedTier(tier);
    setShowPayment(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Agent Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold">{mockAgent.name}</h1>
                <Badge variant="secondary">{mockAgent.category}</Badge>
              </div>
              
              <p className="text-lg text-muted-foreground mb-4">
                {mockAgent.description}
              </p>
              
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${mockAgent.creator}`} />
                    <AvatarFallback>{mockAgent.creatorName?.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{mockAgent.creatorName}</p>
                    <p className="text-sm text-muted-foreground">{mockAgent.creator}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">{mockAgent.rating}</span>
                  <span className="text-muted-foreground">({mockAgent.totalRatings} reviews)</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-5 w-5 text-muted-foreground" />
                  <span>{mockAgent.interactions} interactions</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {mockAgent.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-4">
                <Button size="lg" onClick={handleChatStart}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat with Agent
                </Button>
                <Button size="lg" variant="outline" onClick={() => handlePurchaseAccess(mockAgent.tiers[1])}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Purchase Access
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Agent Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  This AI agent specializes in financial advisory services and can help you with:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Portfolio analysis and optimization</li>
                  <li>• Investment strategy recommendations</li>
                  <li>• Risk assessment and management</li>
                  <li>• Market trend analysis</li>
                  <li>• Financial planning guidance</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Knowledge Base
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {mockAgent.knowledgeBase}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pricing" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockAgent.tiers.map((tier) => (
                <Card key={tier.id} className={tier.id === "standard" ? "border-primary" : ""}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{tier.name}</CardTitle>
                      {tier.id === "standard" && <Badge>Popular</Badge>}
                    </div>
                    <CardDescription>{tier.description}</CardDescription>
                    <div className="text-2xl font-bold">
                      {tier.price === 0 ? "Free" : `$${tier.price} ${tier.currency}`}
                      {tier.priceModel === "monthly_subscription" && <span className="text-sm font-normal">/month</span>}
                      {tier.priceModel === "per_query" && <span className="text-sm font-normal">/query</span>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm mb-6">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full" 
                      variant={tier.id === "free" ? "outline" : "default"}
                      onClick={() => tier.id === "free" ? handleChatStart() : handlePurchaseAccess(tier)}
                    >
                      {tier.id === "free" ? "Try Now" : "Purchase"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-6">
            <div className="space-y-4">
              {mockAgent.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${review.user}`} />
                        <AvatarFallback>{review.userName?.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{review.userName}</span>
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created</span>
                    <span>{new Date(mockAgent.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span>{new Date(mockAgent.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Trust & Safety
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm">Creator Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm">Content Reviewed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm">Active Monitoring</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Chat Dialog */}
        <Dialog open={showChat} onOpenChange={setShowChat}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Chat with {mockAgent.name}</DialogTitle>
            </DialogHeader>
            <ChatInterface agentId={mockAgent.id} />
          </DialogContent>
        </Dialog>

        {/* Payment Dialog */}
        <Dialog open={showPayment} onOpenChange={setShowPayment}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Purchase Access</DialogTitle>
            </DialogHeader>
            {selectedTier && (
              <PaymentFlow 
                tier={selectedTier} 
                agentId={mockAgent.id}
                onSuccess={() => {
                  setShowPayment(false);
                  setShowChat(true);
                }}
                onCancel={() => setShowPayment(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
