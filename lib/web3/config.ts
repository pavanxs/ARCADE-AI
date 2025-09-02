import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

// 0G Chain configuration (placeholder - will need actual chain details)
export const zeroGChain = {
  id: 16600, // Placeholder chain ID
  name: '0G Chain',
  nativeCurrency: {
    decimals: 18,
    name: '0G',
    symbol: '0G',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.0g.ai'], // Placeholder RPC URL
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.0g.ai' },
  },
} as const;

export const config = createConfig({
  chains: [mainnet, sepolia, zeroGChain],
  connectors: [
    injected(),
    walletConnect({ 
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "2f5a4c8b9e3d7a1f6c8b5e2a9d4f7c1b" 
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [zeroGChain.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
