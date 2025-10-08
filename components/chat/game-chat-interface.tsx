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
  AlertCircle,
  Loader2,
  Gamepad2,
  RotateCcw,
  Home
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface Message {
  id: string;
  content: string;
  sender: "user" | "game";
  timestamp: Date;
  isTyping?: boolean;
}

interface GameConfig {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  avatar?: string;
  color?: string;
}

interface GameChatInterfaceProps {
  gameConfig: GameConfig;
  onExit?: () => void;
}

export function GameChatInterface({ gameConfig, onExit }: GameChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: `Welcome to ${gameConfig.name}! ${gameConfig.description}\n\nWhat would you like to do?`,
      sender: "game",
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [gameState, setGameState] = useState<any>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateGameResponse = async (userMessage: string): Promise<string> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Simple game logic based on the system prompt and user input
    const prompt = `${gameConfig.systemPrompt}

User: ${userMessage}

Game State: ${JSON.stringify(gameState)}

Please respond as the game AI, maintaining character and game logic:`;

    // Mock responses - in a real implementation, this would call an AI API
    if (gameConfig.id === "1") { // AI Dungeon Master
      return simulateDungeonMasterResponse(userMessage, gameState);
    } else if (gameConfig.id === "2") { // Neural Chess
      return simulateChessResponse(userMessage, gameState);
    } else if (gameConfig.id === "3") { // Story Weaver
      return simulateStoryWeaverResponse(userMessage, gameState);
    } else if (gameConfig.id === "4") { // Code Challenge Arena
      return simulateCodeChallengeResponse(userMessage, gameState);
    } else if (gameConfig.id === "5") { // Mystery Detective
      return simulateMysteryDetectiveResponse(userMessage, gameState);
    } else {
      return "I understand your input. This is a demo response for the game. In a real implementation, this would connect to an AI service.";
    }
  };

  const simulateDungeonMasterResponse = (userMessage: string, state: any): string => {
    const message = userMessage.toLowerCase();

    if (message.includes("start") || message.includes("begin") || message.includes("new game")) {
      return "Excellent! You find yourself standing at the entrance of the ancient Dragon's Lair dungeon. The stone archway looms before you, covered in mysterious runes that glow with an otherworldly light. The air is thick with mystery and danger.\n\nWhat do you do?";
    } else if (message.includes("look") || message.includes("examine")) {
      return "You carefully examine your surroundings. The dungeon entrance is carved from solid rock, and you can hear the distant echo of dripping water and strange creatures. Your adventuring gear feels heavy but reassuring on your back.";
    } else if (message.includes("enter") || message.includes("go in")) {
      return "You step through the archway into the darkness. The runes flare brightly as you pass, and you find yourself in a dimly lit stone corridor. Flickering torchlight reveals three passages ahead.\n\nWhich path do you choose: left, center, or right?";
    } else if (message.includes("left")) {
      return "You venture down the left passage. The walls are damp and covered in moss. Suddenly, you hear a low growl echoing from the darkness ahead. A large wolf-like creature with glowing red eyes blocks your path!\n\nWhat do you do?";
    } else if (message.includes("fight") || message.includes("attack")) {
      return "You draw your sword and charge at the beast! The creature lunges at you with incredible speed. Roll for initiative... You strike first and deal 15 damage! The creature howls in pain but counters with a vicious bite, dealing 8 damage to you.\n\nHealth: 92/100\n\nWhat is your next action?";
    } else {
      return "The dungeon master nods thoughtfully at your choice. 'A wise decision,' echoes a mysterious voice in your mind. The adventure continues...\n\nWhat would you like to do next?";
    }
  };

  const simulateChessResponse = (userMessage: string, state: any): string => {
    return "♟️ Neural Chess AI analyzes your move and the current board position. This is a sophisticated chess engine that adapts to your playing style. Make your move using standard chess notation (e.g., 'e2e4' for pawn to e4).";
  };

  const simulateStoryWeaverResponse = (userMessage: string, state: any): string => {
    return "📖 Story Weaver acknowledges your contribution to our collaborative tale. Together we're crafting an epic narrative. Continue the story or suggest plot developments!";
  };

  const simulateCodeChallengeResponse = (userMessage: string, state: any): string => {
    return "💻 Code Challenge Arena processes your solution. Here's your next programming challenge: Write a function that finds the longest palindromic substring in a given string.";
  };

  const simulateMysteryDetectiveResponse = (userMessage: string, state: any): string => {
    return "🔍 Detective AI notes your observation. The mansion holds many secrets. You've discovered a clue: a torn letter fragment mentioning 'midnight rendezvous'. Continue your investigation!";
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
      content: `${gameConfig.name} is thinking...`,
      sender: "game",
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const response = await simulateGameResponse(userMessage.content);

      // Remove typing indicator and add actual response
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== "typing");
        return [...filtered, {
          id: (Date.now() + 1).toString(),
          content: response,
          sender: "game",
          timestamp: new Date(),
        }];
      });

      // Update game state based on response (in a real implementation)
      setGameState(prev => ({ ...prev, lastAction: userMessage.content }));

    } catch (error) {
      setMessages(prev => prev.filter(msg => msg.id !== "typing"));
      toast.error("Failed to get game response");
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

  const handleRestart = () => {
    setMessages([{
      id: "welcome",
      content: `Welcome back to ${gameConfig.name}! Starting a new game.\n\nWhat would you like to do?`,
      sender: "game",
      timestamp: new Date(),
    }]);
    setGameState({});
    setInputMessage("");
  };

  return (
    <div className="flex flex-col h-[600px] max-w-4xl mx-auto">
      {/* Header */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className={gameConfig.color ? `bg-${gameConfig.color}-100` : ""}>
                  <Gamepad2 className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{gameConfig.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Interactive AI Game
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={handleRestart}>
                <RotateCcw className="h-3 w-3 mr-2" />
                New Game
              </Button>
              {onExit && (
                <Button size="sm" variant="outline" onClick={onExit}>
                  <Home className="h-3 w-3 mr-2" />
                  Exit
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
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
                  {message.sender === "game" && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className={gameConfig.color ? `bg-${gameConfig.color}-100` : ""}>
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
                          <span className="text-sm">{message.content}</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
              placeholder={`Play ${gameConfig.name}...`}
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
