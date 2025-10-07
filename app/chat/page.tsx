"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Send, Bot, User, Zap, AlertCircle, Wallet, Coins, Settings } from "lucide-react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { compute, OFFICIAL_PROVIDERS } from "@/lib/0g/compute";

interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: Date;
  isTyping?: boolean;
  model?: string;
}

export default function ChatPage() {
  const { address, isConnected } = useAccount();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Welcome to 0G Compute Chat! I'm powered by the 0G decentralized AI network. I can help you with a wide range of topics using state-of-the-art AI models. What would you like to discuss?",
      sender: "agent",
      timestamp: new Date(),
      model: "gpt-oss-120b",
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-oss-120b");
  const [balance, setBalance] = useState<string>("0");
  const [isComputeReady, setIsComputeReady] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize 0G Compute on page load
    const initializeCompute = async () => {
      try {
        await compute.initialize();
        const balance = await compute.getBalance();
        setBalance(balance);
        setIsComputeReady(await compute.isReady());
      } catch (error) {
        console.error("Failed to initialize 0G Compute:", error);
        toast.error("Failed to connect to 0G Compute network");
      }
    };

    initializeCompute();
  }, []);

  const fundAccount = async () => {
    try {
      await compute.fundAccount(1); // Fund with 1 OG token
      const newBalance = await compute.getBalance();
      setBalance(newBalance);
      toast.success(`Account funded with 1 OG token. New balance: ${newBalance}`);
    } catch (error) {
      console.error("Funding failed:", error);
      toast.error("Failed to fund account");
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !isConnected) return;

    if (!isComputeReady) {
      toast.error("0G Compute is not ready. Please check your connection and balance.");
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
      content: "AI is thinking...",
      sender: "agent",
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const systemMessage = {
        role: 'system' as const,
        content: `You are a helpful AI assistant powered by the 0G decentralized compute network. You have access to ${selectedModel} model. Provide helpful, accurate, and engaging responses.`,
      };

      const userContent = {
        role: 'user' as const,
        content: inputMessage.trim(),
      };

      const response = await compute.generateResponse({
        model: selectedModel,
        messages: [systemMessage, userContent],
        max_tokens: 1000,
        temperature: 0.7,
      });

      // Remove typing indicator and add actual response
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== "typing");
        return [...filtered, {
          id: (Date.now() + 1).toString(),
          content: response.choices[0]?.message?.content || "I'm sorry, I couldn't process your request at the moment.",
          sender: "agent",
          timestamp: new Date(),
          model: selectedModel,
        }];
      });

      // Update balance after successful response
      const newBalance = await compute.getBalance();
      setBalance(newBalance);

    } catch (error) {
      setMessages(prev => prev.filter(msg => msg.id !== "typing"));
      console.error("Chat error:", error);
      toast.error("Failed to get response from 0G Compute");
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">0G Compute Chat</h1>
                <p className="text-sm text-muted-foreground">Decentralized AI Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Wallet Connection Status */}
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <>
                    <Wallet className="h-4 w-4" />
                    <span className="text-sm text-green-600">Connected</span>
                  </>
                ) : (
                  <>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Disconnected</span>
                  </>
                )}
              </div>

              {/* Balance */}
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4" />
                <span className="text-sm font-mono">{parseFloat(balance).toFixed(4)} OG</span>
              </div>

              {/* Model Selection */}
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-oss-120b">GPT-OSS 120B</SelectItem>
                  <SelectItem value="deepseek-r1-70b">DeepSeek R1 70B</SelectItem>
                </SelectContent>
              </Select>

              {/* Fund Account Button */}
              <Button onClick={fundAccount} variant="outline" size="sm">
                <Zap className="h-4 w-4 mr-2" />
                Fund Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px]">
              {/* Messages */}
              <CardContent className="p-0 h-full flex flex-col">
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
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <Card className={`max-w-[80%] ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}>
                          <CardContent className="p-3">
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
                              <div>
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                {message.model && (
                                  <div className="flex items-center gap-1 mt-2">
                                    <Badge variant="secondary" className="text-xs">
                                      {message.model}
                                    </Badge>
                                  </div>
                                )}
                              </div>
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
                  {!isConnected ? (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Please connect your wallet to start chatting with 0G Compute.
                      </AlertDescription>
                    </Alert>
                  ) : !isComputeReady ? (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        0G Compute is initializing or needs funding. Please fund your account to continue.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={`Ask me anything using ${selectedModel}...`}
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
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Settings className="h-4 w-4" />
                  0G Network Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Balance:</span>
                  <span className="font-mono">{parseFloat(balance).toFixed(4)} OG</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Model:</span>
                  <Badge variant="outline">{selectedModel}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Network:</span>
                  <Badge variant={isComputeReady ? "default" : "destructive"}>
                    {isComputeReady ? "Ready" : "Initializing"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Available Models</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>GPT-OSS 120B</span>
                    <Badge variant="secondary" className="text-xs">General AI</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>DeepSeek R1 70B</span>
                    <Badge variant="secondary" className="text-xs">Reasoning</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">About 0G Compute</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-2">
                <p>
                  This chat uses the 0G decentralized compute network for AI inference.
                </p>
                <p>
                  Responses are generated using verifiable AI models running on decentralized infrastructure.
                </p>
                <p>
                  Each query consumes OG tokens from your account balance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
