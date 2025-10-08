"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Zap, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatInterfaceProps {
  agentId: string;
  userAccess?: {
    tier: string;
    remainingQueries?: number;
    hasAccess: boolean;
  };
}

export function ChatInterface({ agentId, userAccess }: ChatInterfaceProps) {
  const { address, isConnected } = useAccount();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI financial advisor. I can help you with investment strategies, portfolio analysis, and financial planning. What would you like to discuss today?",
      sender: "agent",
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remainingQueries, setRemainingQueries] = useState(userAccess?.remainingQueries || 5);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAgentResponse = async (userMessage: string): Promise<string> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Mock responses based on keywords
    if (userMessage.toLowerCase().includes("portfolio")) {
      return "For portfolio optimization, I recommend diversifying across different asset classes. Based on current market conditions, consider a mix of 60% stocks, 30% bonds, and 10% alternative investments. However, this should be adjusted based on your risk tolerance and investment timeline. Would you like me to analyze a specific portfolio allocation?";
    } else if (userMessage.toLowerCase().includes("investment")) {
      return "Investment strategies should align with your financial goals and risk tolerance. For long-term wealth building, consider dollar-cost averaging into low-cost index funds. For more aggressive growth, you might look at growth stocks or emerging markets, but remember that higher returns come with higher risk. What's your investment timeline?";
    } else if (userMessage.toLowerCase().includes("risk")) {
      return "Risk assessment is crucial for any investment strategy. I evaluate risk based on volatility, correlation, and historical performance. Generally, younger investors can take on more risk for potentially higher returns, while those closer to retirement should focus on capital preservation. What's your current age and investment experience level?";
    } else {
      return "That's an interesting question about financial planning. Based on my knowledge base of market analysis and financial planning guides, I'd recommend taking a systematic approach. Could you provide more specific details about your situation so I can give you more targeted advice?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Disable auth check during development
    // if (!isConnected) {
    //   toast.error("Please connect your wallet to chat");
    //   return;
    // }

    if (remainingQueries <= 0 && (!userAccess?.hasAccess)) {
      toast.error("You've reached your free query limit. Please purchase access to continue.");
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: "typing",
      content: "Agent is typing...",
      sender: "agent",
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const response = await simulateAgentResponse(userMessage.content);
      
      // Remove typing indicator and add actual response
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== "typing");
        return [...filtered, {
          id: (Date.now() + 1).toString(),
          content: response,
          sender: "agent",
          timestamp: new Date(),
        }];
      });

      // Update remaining queries for free users
      if (!userAccess?.hasAccess) {
        setRemainingQueries(prev => Math.max(0, prev - 1));
      }

    } catch (error) {
      setMessages(prev => prev.filter(msg => msg.id !== "typing"));
      toast.error("Failed to get response from agent");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${agentId}`} />
            <AvatarFallback>
              <Bot className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">Financial Advisor Pro</h3>
            <p className="text-xs text-muted-foreground">AI Agent</p>
          </div>
        </div>
        
        {!userAccess?.hasAccess && (
          <div className="flex items-center gap-2">
            <Badge variant={remainingQueries > 0 ? "secondary" : "destructive"}>
              {remainingQueries} queries left
            </Badge>
            {remainingQueries <= 2 && (
              <Button size="sm" variant="outline">
                Upgrade
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "agent" && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${agentId}`} />
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <Card className={`max-w-[80%] ${
                message.sender === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted"
              }`}>
                <CardContent className="px-3 py-0">
                  {message.isTyping ? (
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      </div>
                      <span className="text-sm">Agent is thinking...</span>
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  )}
                </CardContent>
              </Card>
              
              {message.sender === "user" && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${address}`} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t p-4">
        {remainingQueries <= 0 && !userAccess?.hasAccess ? (
          <div className="text-center py-4">
            <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-3">
              You&apos;ve reached your free query limit
            </p>
            <Button size="sm">
              <Zap className="h-4 w-4 mr-2" />
              Upgrade for Unlimited Access
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about financial planning..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
