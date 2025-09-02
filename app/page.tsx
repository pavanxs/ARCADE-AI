import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Zap, Coins, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Create & Monetize
          <br />
          <span className="text-primary">AI Agents</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Build powerful AI agents with your own knowledge base, customize their behavior, 
          and monetize them in our decentralized marketplace powered by 0G Network.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg" asChild>
            <Link href="/dashboard">Create Agent</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/marketplace">Explore Marketplace</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="https://arcade-ai-psi.vercel.app/" target="_blank" rel="noopener noreferrer">
              🚀 Live Demo
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose ARCADE-AI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <Bot className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>Custom AI Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Upload your documents and create specialized AI agents with your unique knowledge base.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Zap className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>Powered by 0G</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Leveraging 0G&apos;s decentralized storage, compute, and blockchain infrastructure for maximum efficiency.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Coins className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>Monetize Knowledge</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Set pricing tiers and earn cryptocurrency from users who interact with your AI agents.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Users className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>Community Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Discover and interact with AI agents created by experts in various fields and domains.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="rounded-lg border p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the future of AI agent creation and monetization. Connect your wallet and start building today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" asChild>
              <Link href="/dashboard">Start Creating</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="https://arcade-ai-psi.vercel.app/" target="_blank" rel="noopener noreferrer">
                🚀 View Live Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}