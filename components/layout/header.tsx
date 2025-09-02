"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
// Removed NavigationMenu to fix infinite loop issue
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Wallet, User, LogOut, Settings } from "lucide-react";

export function Header() {
  const { address, isConnected } = useAccount();

  const connectWallet = () => {
    // This will be handled by web3modal
    const modal = document.querySelector('w3m-button') as any;
    modal?.click();
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          ARCADE-AI
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/marketplace" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Marketplace
          </Link>
          <Link 
            href="/games" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            AI Games
          </Link>
          <Link 
            href="/dashboard" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            My Agents
          </Link>
        </nav>

        {/* Wallet Connection */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {!isConnected ? (
            <Button onClick={connectWallet} className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${address}`} />
                    <AvatarFallback>
                      {address?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="flex items-center gap-2"
                  onClick={() => {
                    // Disconnect wallet - this will be handled by web3modal
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
