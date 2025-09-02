"use client";

import React, { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Star, MessageCircle, DollarSign, Bot } from "lucide-react";
import Link from "next/link";

// Mock data - will be replaced with real API data
const mockAgents = [
  {
    id: "1",
    name: "Financial Advisor Pro",
    description: "Expert AI agent for financial planning, investment advice, and portfolio management with 15+ years of market data.",
    creator: "0x1234...5678",
    creatorName: "John Smith",
    category: "Finance",
    rating: 4.8,
    interactions: 1250,
    minPrice: 0.1,
    maxPrice: 5.0,
    currency: "USDC",
    tags: ["Finance", "Investment", "Planning"],
    knowledgeBase: "Market analysis reports, financial planning guides",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Tech Consultant AI",
    description: "Software development expert specializing in React, Node.js, and cloud architecture solutions.",
    creator: "0x8765...4321",
    creatorName: "Sarah Dev",
    category: "Technology",
    rating: 4.9,
    interactions: 890,
    minPrice: 0,
    maxPrice: 2.5,
    currency: "USDC",
    tags: ["Programming", "React", "Cloud"],
    knowledgeBase: "Technical documentation, best practices",
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    name: "Health & Wellness Coach",
    description: "Personalized health advice based on nutrition science and wellness research from top medical journals.",
    creator: "0x9876...1234",
    creatorName: "Dr. Maria Health",
    category: "Health",
    rating: 4.7,
    interactions: 2100,
    minPrice: 0.05,
    maxPrice: 3.0,
    currency: "USDC",
    tags: ["Health", "Nutrition", "Wellness"],
    knowledgeBase: "Medical journals, nutrition studies",
    createdAt: "2024-01-10",
  },
];

const categories = ["All", "Finance", "Technology", "Health", "Education", "Business", "Creative"];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("popularity");
  const [showFilters, setShowFilters] = useState(false);

  const filteredAgents = mockAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || agent.category === selectedCategory;
    
    const matchesPrice = (!priceRange.min || agent.minPrice >= parseFloat(priceRange.min)) &&
                        (!priceRange.max || agent.maxPrice <= parseFloat(priceRange.max));
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "price-low":
        return a.minPrice - b.minPrice;
      case "price-high":
        return b.maxPrice - a.maxPrice;
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default: // popularity
        return b.interactions - a.interactions;
    }
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">AI Agent Marketplace</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover and interact with specialized AI agents created by experts worldwide
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents by name, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Min Price (USDC)</label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Max Price (USDC)</label>
                    <Input
                      type="number"
                      placeholder="10.00"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popularity">Most Popular</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-muted-foreground">
            {sortedAgents.length} agent{sortedAgents.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Agent Grid */}
        {sortedAgents.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Bot className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No agents found</h3>
              <p className="text-muted-foreground text-center">
                Try adjusting your search criteria or browse all categories.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAgents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{agent.name}</CardTitle>
                      <CardDescription className="text-sm mb-3">
                        {agent.description}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${agent.creator}`} />
                      <AvatarFallback>{agent.creatorName?.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {agent.creatorName}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {agent.tags.slice(0, 3).map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{agent.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                      <span>{agent.interactions}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {agent.minPrice === 0 ? "Free" : `${agent.minPrice}+`}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mb-4">
                    <strong>Knowledge:</strong> {agent.knowledgeBase}
                  </div>
                  
                  <Button asChild className="w-full">
                    <Link href={`/marketplace/${agent.id}`}>
                      View Agent
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
