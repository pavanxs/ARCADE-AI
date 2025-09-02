/**
 * 0G Chain Integration
 * Handles smart contracts for payments, access control, and earnings distribution
 */

import { createPublicClient, createWalletClient, http, parseEther, formatEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

export interface ChainConfig {
  rpcUrl: string;
  chainId: number;
  contractAddresses: {
    paymentProcessor: string;
    agentRegistry: string;
    tokenContract: string;
  };
}

export interface PaymentParams {
  agentId: string;
  tierId: string;
  amount: bigint;
  currency: string;
  userAddress: string;
}

export interface AgentRegistration {
  agentId: string;
  creatorAddress: string;
  metadataHash: string;
  isActive: boolean;
}

export class ZeroGChain {
  private config: ChainConfig;
  private publicClient: any;
  private walletClient: any;

  constructor(config: ChainConfig) {
    this.config = config;
    
    this.publicClient = createPublicClient({
      transport: http(config.rpcUrl),
      chain: {
        id: config.chainId,
        name: '0G Chain',
        network: '0g',
        nativeCurrency: {
          decimals: 18,
          name: '0G',
          symbol: '0G',
        },
        rpcUrls: {
          default: { http: [config.rpcUrl] },
          public: { http: [config.rpcUrl] },
        },
      },
    });

    // Initialize wallet client if private key is provided
    if (process.env.ZEROG_PRIVATE_KEY) {
      const account = privateKeyToAccount(process.env.ZEROG_PRIVATE_KEY as `0x${string}`);
      this.walletClient = createWalletClient({
        account,
        transport: http(config.rpcUrl),
        chain: this.publicClient.chain,
      });
    }
  }

  /**
   * Process payment for agent access
   */
  async processPayment(params: PaymentParams): Promise<string> {
    try {
      if (!this.walletClient) {
        throw new Error('Wallet client not initialized');
      }

      // Payment processor contract ABI (simplified)
      const abi = [
        {
          name: 'processPayment',
          type: 'function',
          inputs: [
            { name: 'agentId', type: 'string' },
            { name: 'tierId', type: 'string' },
            { name: 'amount', type: 'uint256' },
            { name: 'currency', type: 'address' },
            { name: 'user', type: 'address' },
          ],
          outputs: [{ name: 'transactionId', type: 'bytes32' }],
          stateMutability: 'payable',
        },
      ];

      const { request } = await this.publicClient.simulateContract({
        address: this.config.contractAddresses.paymentProcessor,
        abi,
        functionName: 'processPayment',
        args: [
          params.agentId,
          params.tierId,
          params.amount,
          this.config.contractAddresses.tokenContract,
          params.userAddress,
        ],
        value: params.currency === 'native' ? params.amount : 0n,
      });

      const hash = await this.walletClient.writeContract(request);
      
      // Wait for transaction confirmation
      const receipt = await this.publicClient.waitForTransactionReceipt({ hash });
      
      return hash;
    } catch (error) {
      console.error('0G Chain payment error:', error);
      throw error;
    }
  }

  /**
   * Register agent on-chain
   */
  async registerAgent(registration: AgentRegistration): Promise<string> {
    try {
      if (!this.walletClient) {
        throw new Error('Wallet client not initialized');
      }

      const abi = [
        {
          name: 'registerAgent',
          type: 'function',
          inputs: [
            { name: 'agentId', type: 'string' },
            { name: 'creator', type: 'address' },
            { name: 'metadataHash', type: 'string' },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
      ];

      const { request } = await this.publicClient.simulateContract({
        address: this.config.contractAddresses.agentRegistry,
        abi,
        functionName: 'registerAgent',
        args: [
          registration.agentId,
          registration.creatorAddress,
          registration.metadataHash,
        ],
      });

      const hash = await this.walletClient.writeContract(request);
      return hash;
    } catch (error) {
      console.error('0G Chain registration error:', error);
      throw error;
    }
  }

  /**
   * Get agent registration info
   */
  async getAgentInfo(agentId: string): Promise<AgentRegistration | null> {
    try {
      const abi = [
        {
          name: 'getAgent',
          type: 'function',
          inputs: [{ name: 'agentId', type: 'string' }],
          outputs: [
            { name: 'creator', type: 'address' },
            { name: 'metadataHash', type: 'string' },
            { name: 'isActive', type: 'bool' },
          ],
          stateMutability: 'view',
        },
      ];

      const result = await this.publicClient.readContract({
        address: this.config.contractAddresses.agentRegistry,
        abi,
        functionName: 'getAgent',
        args: [agentId],
      }) as [string, string, boolean];

      if (!result[0] || result[0] === '0x0000000000000000000000000000000000000000') {
        return null;
      }

      return {
        agentId,
        creatorAddress: result[0],
        metadataHash: result[1],
        isActive: result[2],
      };
    } catch (error) {
      console.error('0G Chain agent info error:', error);
      return null;
    }
  }

  /**
   * Check user's access to agent
   */
  async checkUserAccess(userAddress: string, agentId: string): Promise<boolean> {
    try {
      const abi = [
        {
          name: 'hasAccess',
          type: 'function',
          inputs: [
            { name: 'user', type: 'address' },
            { name: 'agentId', type: 'string' },
          ],
          outputs: [{ name: 'hasAccess', type: 'bool' }],
          stateMutability: 'view',
        },
      ];

      const result = await this.publicClient.readContract({
        address: this.config.contractAddresses.paymentProcessor,
        abi,
        functionName: 'hasAccess',
        args: [userAddress, agentId],
      });

      return result as boolean;
    } catch (error) {
      console.error('0G Chain access check error:', error);
      return false;
    }
  }

  /**
   * Get creator earnings
   */
  async getCreatorEarnings(creatorAddress: string): Promise<bigint> {
    try {
      const abi = [
        {
          name: 'getEarnings',
          type: 'function',
          inputs: [{ name: 'creator', type: 'address' }],
          outputs: [{ name: 'earnings', type: 'uint256' }],
          stateMutability: 'view',
        },
      ];

      const result = await this.publicClient.readContract({
        address: this.config.contractAddresses.paymentProcessor,
        abi,
        functionName: 'getEarnings',
        args: [creatorAddress],
      });

      return result as bigint;
    } catch (error) {
      console.error('0G Chain earnings error:', error);
      return 0n;
    }
  }

  /**
   * Withdraw creator earnings
   */
  async withdrawEarnings(creatorAddress: string): Promise<string> {
    try {
      if (!this.walletClient) {
        throw new Error('Wallet client not initialized');
      }

      const abi = [
        {
          name: 'withdraw',
          type: 'function',
          inputs: [],
          outputs: [],
          stateMutability: 'nonpayable',
        },
      ];

      const { request } = await this.publicClient.simulateContract({
        address: this.config.contractAddresses.paymentProcessor,
        abi,
        functionName: 'withdraw',
        args: [],
      });

      const hash = await this.walletClient.writeContract(request);
      return hash;
    } catch (error) {
      console.error('0G Chain withdrawal error:', error);
      throw error;
    }
  }

  /**
   * Get transaction status
   */
  async getTransactionStatus(hash: string): Promise<'pending' | 'confirmed' | 'failed'> {
    try {
      const receipt = await this.publicClient.getTransactionReceipt({ hash });
      return receipt.status === 'success' ? 'confirmed' : 'failed';
    } catch (error) {
      // Transaction not yet mined
      return 'pending';
    }
  }

  /**
   * Format currency amount
   */
  formatAmount(amount: bigint, decimals = 18): string {
    return formatEther(amount);
  }

  /**
   * Parse currency amount
   */
  parseAmount(amount: string): bigint {
    return parseEther(amount);
  }
}

// Default 0G Chain instance
export const chain = new ZeroGChain({
  rpcUrl: process.env.ZEROG_RPC_URL || 'https://rpc.0g.ai',
  chainId: parseInt(process.env.ZEROG_CHAIN_ID || '16600'),
  contractAddresses: {
    paymentProcessor: process.env.ZEROG_PAYMENT_CONTRACT || '0x0000000000000000000000000000000000000000',
    agentRegistry: process.env.ZEROG_REGISTRY_CONTRACT || '0x0000000000000000000000000000000000000000',
    tokenContract: process.env.ZEROG_TOKEN_CONTRACT || '0x0000000000000000000000000000000000000000',
  },
});
