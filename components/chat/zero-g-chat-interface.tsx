"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Send,
  Bot,
  User,
  Zap,
  AlertCircle,
  Loader2,
  Wifi,
  WifiOff,
  Coins,
  Gamepad2
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  isTyping?: boolean;
  verified?: boolean;
}

interface ServiceInfo {
  provider: string;
  serviceType: string;
  model: string;
  verifiability: string;
  inputPrice: bigint;
  outputPrice: bigint;
}

interface ChatStatus {
  services: ServiceInfo[];
  balance: string;
  initialized: boolean;
  error?: string;
}

export function ZeroGChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm powered by the 0G Compute Network. I can help you with a wide range of topics and questions. What would you like to discuss?",
      sender: "assistant",
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatStatus, setChatStatus] = useState<ChatStatus | null>(null);
  const [isFunding, setIsFunding] = useState(false);
  const [fundAmount, setFundAmount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    loadChatStatus();
  }, [messages]);

  const loadChatStatus = async () => {
    try {
      const response = await fetch('/api/chat');
      if (response.ok) {
        const status = await response.json();
        setChatStatus(status);
      }
    } catch (error) {
      console.error('Failed to load chat status:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

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
      content: "AI is thinking...",
      sender: "assistant",
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages.filter(m => !m.isTyping), userMessage].map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        let error;
        try {
          error = await response.json();
        } catch (parseError) {
          error = { error: 'Failed to parse error response' };
        }

        if (response.status === 402) {
          // Insufficient balance - show funding UI
          setMessages(prev => prev.filter(msg => msg.id !== "typing"));
          toast.error(error.message || "Insufficient balance");
          return;
        }

        throw new Error(error.error || 'Failed to get response');
      }

      const data = await response.json();

      // Remove typing indicator and add actual response
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== "typing");
        return [...filtered, {
          id: (Date.now() + 1).toString(),
          content: data.message.content,
          sender: "assistant",
          timestamp: new Date(),
          verified: data.verified,
        }];
      });

      // Update balance
      if (data.balance) {
        setChatStatus(prev => prev ? { ...prev, balance: data.balance } : null);
      }

      toast.success("Response received!");

    } catch (error) {
      setMessages(prev => prev.filter(msg => msg.id !== "typing"));
      toast.error(error instanceof Error ? error.message : "Failed to get response");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFundAccount = async () => {
    if (!fundAmount || fundAmount <= 0) return;

    setIsFunding(true);
    try {
      const response = await fetch('/api/chat/fund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: fundAmount }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fund account');
      }

      const data = await response.json();
      setChatStatus(prev => prev ? { ...prev, balance: data.balance } : null);
      toast.success(`Successfully funded account with ${fundAmount} OG tokens`);
      setFundAmount(1);

    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to fund account");
    } finally {
      setIsFunding(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const balance = parseFloat(chatStatus?.balance || '0');

  return (
    <div className="flex flex-col h-[600px] max-w-4xl mx-auto">
      {/* Header with Status and Funding */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">0G AI Chat</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Powered by 0G Compute Network
                </p>
              </div>
            </div>

            {/* Status and Balance */}
            <div className="flex items-center gap-4">
              {chatStatus && !chatStatus.error ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Wifi className="h-4 w-4" />
                  <span className="text-sm font-medium">Connected</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <WifiOff className="h-4 w-4" />
                  <span className="text-sm font-medium">Disconnected</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">
                  {balance.toFixed(4)} OG
                </span>
              </div>

              {/* Funding UI */}
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="0.1"
                  max="10"
                  step="0.1"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(parseFloat(e.target.value) || 0)}
                  className="w-20 h-8"
                  placeholder="Amount"
                />
                <Button
                  size="sm"
                  onClick={handleFundAccount}
                  disabled={isFunding || !fundAmount || fundAmount <= 0}
                >
                  {isFunding ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Zap className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        {balance < 0.001 && (
          <div className="px-6 pb-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Your account balance is low. Add funds to continue using AI chat.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </Card>

      {/* Messages */}
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "assistant" && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <Card className={`py-1.5 max-w-[80%] ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}>
                    <CardContent className="px-3 py-1">
                      {message.isTyping ? (
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                          </div>
                          <span className="text-sm">AI is thinking...</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          {message.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified Response
                            </Badge>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8 mt-1">
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
        </CardContent>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              size="sm"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
