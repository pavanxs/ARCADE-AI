"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/web3/config";
import { createWeb3Modal } from "@web3modal/wagmi/react";

const queryClient = new QueryClient();

// Create Web3Modal
createWeb3Modal({
  wagmiConfig: config,
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "2f5a4c8b9e3d7a1f6c8b5e2a9d4f7c1b",
  enableAnalytics: false,
  enableOnramp: false,
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
