/**
 * 0G Compute Integration
 * Handles AI inference and model serving for agent responses
 */

export interface ComputeConfig {
  endpoint: string;
  apiKey?: string;
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

export class ZeroGCompute {
  private config: ComputeConfig;

  constructor(config: ComputeConfig) {
    this.config = config;
  }

  /**
   * Generate AI response using 0G Compute
   */
  async generateResponse(request: AIRequest): Promise<AIResponse> {
    try {
      const response = await fetch(`${this.config.endpoint}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`AI generation failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('0G Compute generation error:', error);
      throw error;
    }
  }

  /**
   * Stream AI response using 0G Compute
   */
  async *streamResponse(request: AIRequest): AsyncGenerator<string, void, unknown> {
    try {
      const response = await fetch(`${this.config.endpoint}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
        },
        body: JSON.stringify({ ...request, stream: true }),
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
   * Get available models
   */
  async getModels(): Promise<ModelInfo[]> {
    try {
      const response = await fetch(`${this.config.endpoint}/v1/models`, {
        headers: {
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`Models retrieval failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('0G Compute models error:', error);
      return [];
    }
  }

  /**
   * Process knowledge base for RAG
   */
  async processKnowledgeBase(documents: Array<{ content: string; metadata: any }>): Promise<string[]> {
    try {
      const response = await fetch(`${this.config.endpoint}/v1/embeddings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
        },
        body: JSON.stringify({
          input: documents.map(doc => doc.content),
          model: 'text-embedding-ada-002',
        }),
      });

      if (!response.ok) {
        throw new Error(`Knowledge base processing failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data.map((item: any) => item.embedding);
    } catch (error) {
      console.error('0G Compute knowledge processing error:', error);
      throw error;
    }
  }

  /**
   * Search knowledge base using vector similarity
   */
  async searchKnowledgeBase(query: string, embeddings: string[], limit = 5): Promise<number[]> {
    try {
      const response = await fetch(`${this.config.endpoint}/v1/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
        },
        body: JSON.stringify({
          query,
          embeddings,
          limit,
        }),
      });

      if (!response.ok) {
        throw new Error(`Knowledge search failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result.indices || [];
    } catch (error) {
      console.error('0G Compute search error:', error);
      return [];
    }
  }
}

// Default 0G Compute instance
export const compute = new ZeroGCompute({
  endpoint: process.env.ZEROG_COMPUTE_ENDPOINT || 'https://compute.0g.ai',
  apiKey: process.env.ZEROG_COMPUTE_API_KEY,
});
