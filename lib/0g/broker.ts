/**
 * 0G Network Broker Implementation
 * Handles AI inference operations using 0G Compute Network
 */

import { createZGComputeNetworkBroker } from '@0glabs/0g-serving-broker';
import { ethers } from 'ethers';

// Provider configuration for 0G testnet
const RPC_URL = 'https://evmrpc-testnet.0g.ai';
const CHAIN_ID = 16600;

// Official 0G AI services from the documentation
export const OFFICIAL_PROVIDERS = {
  'gpt-oss-120b': '0xf07240Efa67755B5311bc75784a061eDB47165Dd',
  'deepseek-r1-70b': '0x3feE5a4dd5FDb8a32dDA97Bed899830605dBD9D3',
} as const;

export interface ChatRequest {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  model?: string;
  provider?: string;
}

export interface ChatResponse {
  content: string;
  chatId: string;
  isValid: boolean;
}

export class ZeroGBroker {
  private broker: any = null;
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet | null = null;
  private isInitialized = false;

  constructor() {
    // Initialize provider for the 0G testnet
    this.provider = new ethers.JsonRpcProvider(RPC_URL);
  }

  /**
   * Initialize the broker with a wallet
   * For development, we'll use a dummy private key or try to get one from env
   */
  async initialize(): Promise<void> {
    try {
      // Try to get private key from environment
      const privateKey = process.env.ZEROG_PRIVATE_KEY || process.env.PRIVATE_KEY;

      if (!privateKey) {
        throw new Error('ZEROG_PRIVATE_KEY or PRIVATE_KEY environment variable is required');
      }

      // Create wallet and connect to provider
      this.wallet = new ethers.Wallet(privateKey, this.provider);

      // Create the 0G broker instance
      this.broker = await createZGComputeNetworkBroker(this.wallet);

      // Acknowledge official providers
      for (const providerAddress of Object.values(OFFICIAL_PROVIDERS)) {
        try {
          await this.broker.inference.acknowledgeProviderSigner(providerAddress);
        } catch (error) {
          console.log(`Provider ${providerAddress} already acknowledged or error:`, error);
        }
      }

      this.isInitialized = true;
      console.log('✅ 0G Broker initialized successfully');
    } catch (error) {
      console.error('❌ 0G Broker initialization failed:', error);
      throw error;
    }
  }

  /**
   * Get current account balance
   */
  async getBalance(): Promise<string> {
    if (!this.isInitialized || !this.broker) {
      throw new Error('Broker not initialized');
    }

    try {
      const account = await this.broker.ledger.getLedger();
      return ethers.formatEther(account.totalBalance);
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }

  /**
   * Get available AI services
   */
  async getAvailableServices(): Promise<any[]> {
    if (!this.isInitialized || !this.broker) {
      throw new Error('Broker not initialized');
    }

    try {
      const services = await this.broker.inference.listService();
      return services || [];
    } catch (error) {
      console.error('Error getting services:', error);
      return [];
    }
  }

  /**
   * Send a chat request to the 0G network
   */
  async sendChatRequest(request: ChatRequest): Promise<ChatResponse> {
    if (!this.isInitialized || !this.broker) {
      throw new Error('Broker not initialized');
    }

    try {
      // Determine provider and model - Use GPT-OSS as requested
      const providerAddress = request.provider || OFFICIAL_PROVIDERS['gpt-oss-120b'];
      const model = request.model || 'gpt-oss-120b';

      // Get service metadata
      const { endpoint } = await this.broker.inference.getServiceMetadata(providerAddress);

      // Generate request headers
      const headers = await this.broker.inference.getRequestHeaders(
        providerAddress,
        JSON.stringify(request.messages)
      );

      // Send request to the service
      const response = await fetch(`${endpoint}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({
          messages: request.messages,
          model: model,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`AI service error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();

      // Process response for verification
      const content = data.choices?.[0]?.message?.content || '';
      const chatId = data.id;

      let isValid = false;
      try {
        isValid = await this.broker.inference.processResponse(
          providerAddress,
          content,
          chatId
        );
      } catch (error) {
        console.log('Response verification failed (non-verifiable service):', error);
        isValid = false;
      }

      return {
        content,
        chatId,
        isValid,
      };
    } catch (error) {
      console.error('Chat request error:', error);
      throw error;
    }
  }

  /**
   * Add funds to the account (alias for fundAccount)
   */
  async addFunds(amount: number): Promise<void> {
    return this.fundAccount(amount);
  }

  /**
   * Add funds to the account
   */
  async fundAccount(amount: number): Promise<void> {
    if (!this.isInitialized || !this.broker) {
      throw new Error('Broker not initialized');
    }

    try {
      // Convert amount to wei (amount is in OG tokens)
      const amountInWei = ethers.parseEther(amount.toString());

      await this.broker.ledger.addLedger(amountInWei);
      console.log(`✅ Added ${amount} OG tokens to account`);
    } catch (error) {
      console.error('Error adding funds:', error);
      throw error;
    }
  }

  /**
   * Check if broker is initialized
   */
  isReady(): boolean {
    return this.isInitialized && this.broker !== null;
  }

  /**
   * Get wallet address (for debugging)
   */
  async getWalletAddress(): Promise<string> {
    if (!this.wallet) {
      throw new Error('Wallet not initialized');
    }
    return this.wallet.address;
  }
}

// Create and export a singleton instance
export const zeroGBroker = new ZeroGBroker();
