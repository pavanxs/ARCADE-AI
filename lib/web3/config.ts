import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";
// import { walletConnect } from "wagmi/connectors"; // Temporarily disabled

// 0G Chain configuration - Testnet
export const zeroGChain = {
  id: 16600,
  name: '0G Chain Testnet',
  nativeCurrency: {
    decimals: 18,
    name: '0G',
    symbol: '0G',
  },
  rpcUrls: {
    default: {
      http: ['https://evmrpc-testnet.0g.ai'],
    },
  },
  blockExplorers: {
    default: { name: '0G Explorer', url: 'https://chainscan.0g.ai' },
  },
} as const;

export const config = createConfig({
  chains: [mainnet, sepolia, zeroGChain],
  connectors: [
    injected(),
    // walletConnect connector temporarily disabled to fix Reown allowlist error
    // walletConnect({
    //   projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "2f5a4c8b9e3d7a1f6c8b5e2a9d4f7c1b"
    // }),
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
