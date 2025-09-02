"use client";

import React, { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Play, 
  Users, 
  Clock, 
  Star, 
  Gamepad2, 
  Bot, 
  Zap, 
  Brain,
  Target,
  Puzzle,
  Trophy
} from "lucide-react";
import Link from "next/link";

// Mock data for AI games
const mockGames = [
  {
    id: "1",
    name: "AI Dungeon Master",
    description: "An AI-powered text-based RPG where the dungeon master adapts to your choices in real-time.",
    category: "Adventure",
    creator: "0x1234...5678",
    creatorName: "GameDev Studios",
    players: 1250,
    rating: 4.8,
    playTime: "30-60 min",
    difficulty: "Medium",
    tags: ["RPG", "Text-based", "Adaptive", "Story"],
    thumbnail: "dungeon",
    isLive: true,
    price: 0,
  },
  {
    id: "2",
    name: "Neural Chess",
    description: "Play chess against an AI that learns and adapts to your playing style throughout the game.",
    category: "Strategy",
    creator: "0x8765...4321",
    creatorName: "ChessAI Labs",
    players: 890,
    rating: 4.9,
    playTime: "15-45 min",
    difficulty: "Hard",
    tags: ["Chess", "Strategy", "Learning", "Competitive"],
    thumbnail: "chess",
    isLive: true,
    price: 0.1,
  },
  {
    id: "3",
    name: "Story Weaver",
    description: "Collaborative storytelling with AI where you and the AI create stories together.",
    category: "Creative",
    creator: "0x9876...1234",
    creatorName: "Creative AI",
    players: 2100,
    rating: 4.7,
    playTime: "20-40 min",
    difficulty: "Easy",
    tags: ["Creative", "Storytelling", "Collaborative", "Writing"],
    thumbnail: "story",
    isLive: true,
    price: 0,
  },
  {
    id: "4",
    name: "Code Challenge Arena",
    description: "AI generates programming challenges that adapt to your skill level and coding style.",
    category: "Educational",
    creator: "0x5432...9876",
    creatorName: "CodeAI Academy",
    players: 756,
    rating: 4.6,
    playTime: "10-30 min",
    difficulty: "Medium",
    tags: ["Programming", "Education", "Challenges", "Adaptive"],
    thumbnail: "code",
    isLive: false,
    price: 0.05,
  },
  {
    id: "5",
    name: "Mystery Detective",
    description: "Solve AI-generated mysteries where clues and suspects are created based on your investigation style.",
    category: "Puzzle",
    creator: "0x2468...1357",
    creatorName: "Mystery Games Inc",
    players: 1456,
    rating: 4.5,
    playTime: "45-90 min",
    difficulty: "Medium",
    tags: ["Mystery", "Detective", "Puzzle", "Investigation"],
    thumbnail: "mystery",
    isLive: true,
    price: 0.2,
  },
];

const categories = ["All", "Adventure", "Strategy", "Creative", "Educational", "Puzzle", "Action"];

export default function Games() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");

  const filteredGames = mockGames.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || game.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return parseInt(b.id) - parseInt(a.id);
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default: // popularity
        return b.players - a.players;
    }
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Adventure": return <Gamepad2 className="h-5 w-5" />;
      case "Strategy": return <Brain className="h-5 w-5" />;
      case "Creative": return <Zap className="h-5 w-5" />;
      case "Educational": return <Target className="h-5 w-5" />;
      case "Puzzle": return <Puzzle className="h-5 w-5" />;
      default: return <Bot className="h-5 w-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">AI-Powered Games</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience next-generation gaming with AI that adapts, learns, and creates unique experiences just for you
          </p>
        </div>

        {/* Featured Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">🔥 Trending Now</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge className="bg-red-500 text-white">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                  Live
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Gamepad2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">AI Dungeon Master</CardTitle>
                    <CardDescription>Most popular adventure game</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Experience unlimited adventures with an AI dungeon master that creates unique stories based on your choices.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      1,250 players
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      4.8
                    </span>
                  </div>
                  <Button>
                    <Play className="h-4 w-4 mr-2" />
                    Play Free
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge variant="secondary">Premium</Badge>
              </div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Neural Chess</CardTitle>
                    <CardDescription>AI that learns your style</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Play against an AI opponent that adapts and learns from your moves to provide the perfect challenge.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      890 players
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      4.9
                    </span>
                  </div>
                  <Button>
                    <Play className="h-4 w-4 mr-2" />
                    Play $0.10
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search games by name, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
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

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedGames.map((game) => (
            <Card key={game.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {getCategoryIcon(game.category)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{game.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        {game.category}
                        {game.isLive && (
                          <Badge variant="secondary" className="text-xs">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse" />
                            Live
                          </Badge>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mt-2">
                  {game.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {game.tags.slice(0, 3).map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{game.players} players</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span>{game.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{game.playTime}</span>
                  </div>
                  <div>
                    <Badge 
                      className={`text-xs ${getDifficultyColor(game.difficulty)}`}
                      variant="secondary"
                    >
                      {game.difficulty}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${game.creator}`} />
                      <AvatarFallback>{game.creatorName?.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">
                      {game.creatorName}
                    </span>
                  </div>
                  
                  <Button size="sm" asChild>
                    <Link href={`/games/${game.id}`}>
                      <Play className="h-3 w-3 mr-2" />
                      {game.price === 0 ? "Play Free" : `Play $${game.price}`}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create Your Own Game CTA */}
        <div className="mt-12">
          <Card className="text-center">
            <CardContent className="py-8">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Create Your Own AI Game</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Have an idea for an AI-powered game? Use our platform to create programmable AI agents 
                that can power your own unique gaming experiences.
              </p>
              <Button size="lg" asChild>
                <Link href="/dashboard/create">
                  Start Creating
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
