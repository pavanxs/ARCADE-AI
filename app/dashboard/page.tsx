"use client";

import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Bot, TrendingUp, Users, DollarSign, Edit, Eye, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock data - will be replaced with real data from API
const mockAgents = [
  {
    id: "1",
    name: "Financial Advisor Bot",
    description: "AI agent specialized in financial planning and investment advice",
    status: "published",
    interactions: 245,
    earnings: 12.5,
    subscribers: 18,
    createdAt: "2024-01-15",
  },
  {
    id: "2", 
    name: "Tech Consultant",
    description: "Expert AI agent for software development and technology consulting",
    status: "draft",
    interactions: 0,
    earnings: 0,
    subscribers: 0,
    createdAt: "2024-01-20",
  },
];

export default function Dashboard() {
  const { isConnected } = useAccount();

  // Disable auth check during development
  // if (!isConnected) {
  //   return (
  //     <Layout>
  //       <div className="container mx-auto px-4 py-16 text-center">
  //         <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
  //         <p className="text-muted-foreground mb-8">
  //           Please connect your wallet to access your dashboard and manage your AI agents.
  //         </p>
  //       </div>
  //     </Layout>
  //   );
  // }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Agents</h1>
            <p className="text-muted-foreground">
              Create, manage, and monetize your AI agents
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link href="/dashboard/create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create New Agent
            </Link>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAgents.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockAgents.reduce((sum, agent) => sum + agent.interactions, 0)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${mockAgents.reduce((sum, agent) => sum + agent.earnings, 0).toFixed(2)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockAgents.reduce((sum, agent) => sum + agent.subscribers, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agents List */}
        <div className="space-y-4">
          {mockAgents.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Bot className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No agents yet</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Create your first AI agent to start earning from your knowledge base.
                </p>
                <Button asChild>
                  <Link href="/dashboard/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Agent
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            mockAgents.map((agent) => (
              <Card key={agent.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <Badge 
                          variant={agent.status === "published" ? "default" : "secondary"}
                        >
                          {agent.status}
                        </Badge>
                      </div>
                      <CardDescription>{agent.description}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/agents/${agent.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/agents/${agent.id}/edit`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Agent
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Interactions</p>
                      <p className="font-semibold">{agent.interactions}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Earnings</p>
                      <p className="font-semibold">${agent.earnings}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Subscribers</p>
                      <p className="font-semibold">{agent.subscribers}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Created</p>
                      <p className="font-semibold">{new Date(agent.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
