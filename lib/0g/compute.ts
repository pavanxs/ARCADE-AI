/**
 * 0G Compute Integration
 * Handles AI inference and model serving for agent responses using the official 0G SDK
 */

import { createZGComputeNetworkBroker } from '@0glabs/0g-serving-broker';
import { ethers } from 'ethers';

export interface ComputeConfig {
  rpcUrl?: string;
  privateKey?: string;
  providerAddress?: string;
}

export interface AIRequest {
  model: string;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  max_tokens?: number;
  temperature?: number;
  stream?: boolean;
}

export interface AIResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  id: string;
  verified?: boolean;
}

export interface ModelInfo {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  pricing: {
    input_tokens: number;
    output_tokens: number;
  };
}

// Official 0G Provider addresses from documentation
export const OFFICIAL_PROVIDERS = {
  'gpt-oss-120b': '0xf07240Efa67755B5311bc75784a061eDB47165Dd',
  'deepseek-r1-70b': '0x3feE5a4dd5FDb8a32dDA97Bed899830605dBD9D3',
} as const;

export class ZeroGCompute {
  private broker: any = null;
  private config: ComputeConfig;
  private isInitialized = false;

  constructor(config: ComputeConfig = {}) {
    this.config = {
      rpcUrl: process.env.NEXT_PUBLIC_0G_RPC_URL || 'https://evmrpc-testnet.0g.ai',
      privateKey: process.env.ZEROG_PRIVATE_KEY,
      ...config,
    };
  }

  /**
   * Initialize the 0G Compute broker
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      if (typeof window !== 'undefined' && this.config.privateKey) {
        // Browser environment - use private key
        const provider = new ethers.JsonRpcProvider(this.config.rpcUrl);
        const wallet = new ethers.Wallet(this.config.privateKey, provider);
        this.broker = await createZGComputeNetworkBroker(wallet);
      } else if (typeof window !== 'undefined' && window.ethereum) {
        // Browser environment - use wallet connection
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        this.broker = await createZGComputeNetworkBroker(signer);
      } else {
        throw new Error('No wallet available for 0G Compute initialization');
      }

      this.isInitialized = true;
      console.log('✅ 0G Compute broker initialized');
    } catch (error) {
      console.error('❌ 0G Compute initialization failed:', error);
      throw error;
    }
  }

  /**
   * Fund the account for inference services
   */
  async fundAccount(amount: number): Promise<void> {
    if (!this.broker) await this.initialize();

    try {
      await this.broker.ledger.addLedger(ethers.parseEther(amount.toString()));
      console.log(`✅ Funded account with ${amount} OG tokens`);
    } catch (error) {
      console.error('❌ Account funding failed:', error);
      throw error;
    }
  }

  /**
   * Get account balance
   */
  async getBalance(): Promise<string> {
    if (!this.broker) await this.initialize();

    try {
      const account = await this.broker.ledger.getLedger();
      return ethers.formatEther(account.totalBalance);
    } catch (error) {
      console.error('❌ Balance check failed:', error);
      return '0';
    }
  }

  /**
   * Discover available services
   */
  async getAvailableServices(): Promise<any[]> {
    if (!this.broker) await this.initialize();

    try {
      const services = await this.broker.inference.listService();
      return services;
    } catch (error) {
      console.error('❌ Service discovery failed:', error);
      return [];
    }
  }

  /**
   * Acknowledge a provider before using their service
   */
  async acknowledgeProvider(providerAddress: string): Promise<void> {
    if (!this.broker) await this.initialize();

    try {
      await this.broker.inference.acknowledgeProviderSigner(providerAddress);
      console.log(`✅ Acknowledged provider: ${providerAddress}`);
    } catch (error) {
      console.error('❌ Provider acknowledgment failed:', error);
      throw error;
    }
  }

  /**
   * Generate AI response using 0G Compute
   */
  async generateResponse(request: AIRequest): Promise<AIResponse> {
    if (!this.broker) await this.initialize();

    try {
      // Use the first available official provider or the configured one
      const providerAddress = this.config.providerAddress || OFFICIAL_PROVIDERS['gpt-oss-120b'];

      // Ensure provider is acknowledged
      await this.acknowledgeProvider(providerAddress);

      // Get service metadata and auth headers
      const { endpoint, model } = await this.broker.inference.getServiceMetadata(providerAddress);
      const messages = [{ role: "user", content: request.messages[request.messages.length - 1].content }];
      const headers = await this.broker.inference.getRequestHeaders(providerAddress, JSON.stringify(messages));

      // Make the request to the provider
      const response = await fetch(`${endpoint}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({
          messages: request.messages,
          model: model,
          max_tokens: request.max_tokens || 500,
          temperature: request.temperature || 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI generation failed: ${response.statusText}`);
      }

      const data = await response.json();

      // Process the response for verification if it's a verifiable service
      const isValid = await this.broker.inference.processResponse(
        providerAddress,
        data.choices[0]?.message?.content || '',
        data.id
      );

      return {
        ...data,
        verified: isValid,
      };
    } catch (error) {
      console.error('0G Compute generation error:', error);
      throw error;
    }
  }

  /**
   * Stream AI response using 0G Compute
   */
  async *streamResponse(request: AIRequest): AsyncGenerator<string, void, unknown> {
    if (!this.broker) await this.initialize();

    try {
      // Use the first available official provider or the configured one
      const providerAddress = this.config.providerAddress || OFFICIAL_PROVIDERS['gpt-oss-120b'];

      // Ensure provider is acknowledged
      await this.acknowledgeProvider(providerAddress);

      // Get service metadata and auth headers
      const { endpoint, model } = await this.broker.inference.getServiceMetadata(providerAddress);
      const messages = [{ role: "user", content: request.messages[request.messages.length - 1].content }];
      const headers = await this.broker.inference.getRequestHeaders(providerAddress, JSON.stringify(messages));

      // Make the streaming request to the provider
      const response = await fetch(`${endpoint}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({
          messages: request.messages,
          model: model,
          max_tokens: request.max_tokens || 500,
          temperature: request.temperature || 0.7,
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI streaming failed: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') return;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) yield content;
            } catch (e) {
              // Skip invalid JSON lines
            }
          }
        }
      }
    } catch (error) {
      console.error('0G Compute streaming error:', error);
      throw error;
    }
  }

  /**
   * Get available models (using official providers)
   */
  async getModels(): Promise<ModelInfo[]> {
    return [
      {
        id: 'gpt-oss-120b',
        name: 'GPT-OSS 120B',
        description: 'State-of-the-art 70B parameter model for general AI tasks',
        capabilities: ['text-generation', 'conversation', 'analysis'],
        pricing: {
          input_tokens: 0.000001, // Price per token in OG
          output_tokens: 0.000002,
        },
      },
      {
        id: 'deepseek-r1-70b',
        name: 'DeepSeek R1 70B',
        description: 'Advanced reasoning model optimized for complex problem solving',
        capabilities: ['reasoning', 'problem-solving', 'analysis'],
        pricing: {
          input_tokens: 0.000001,
          output_tokens: 0.000002,
        },
      },
    ];
  }

  /**
   * Check if the service is ready
   */
  async isReady(): Promise<boolean> {
    try {
      await this.getBalance();
      return true;
    } catch {
      return false;
    }
  }
}

// Default 0G Compute instance
export const compute = new ZeroGCompute();
