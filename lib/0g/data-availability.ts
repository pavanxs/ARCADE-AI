/**
 * 0G Data Availability Integration
 * Handles high-throughput data streaming for real-time features
 */

export interface DAConfig {
  endpoint: string;
  apiKey?: string;
}

export interface DataStream {
  id: string;
  topic: string;
  data: any;
  timestamp: number;
  signature?: string;
}

export interface StreamSubscription {
  id: string;
  topic: string;
  callback: (data: DataStream) => void;
  isActive: boolean;
}

export class ZeroGDA {
  private config: DAConfig;
  private subscriptions: Map<string, StreamSubscription> = new Map();
  private websocket: WebSocket | null = null;

  constructor(config: DAConfig) {
    this.config = config;
  }

  /**
   * Publish data to 0G DA network
   */
  async publishData(topic: string, data: any): Promise<string> {
    try {
      const stream: DataStream = {
        id: this.generateId(),
        topic,
        data,
        timestamp: Date.now(),
      };

      const response = await fetch(`${this.config.endpoint}/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
        },
        body: JSON.stringify(stream),
      });

      if (!response.ok) {
        throw new Error(`Data publish failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result.streamId;
    } catch (error) {
      console.error('0G DA publish error:', error);
      throw error;
    }
  }

  /**
   * Subscribe to data stream
   */
  async subscribe(topic: string, callback: (data: DataStream) => void): Promise<string> {
    const subscriptionId = this.generateId();
    
    const subscription: StreamSubscription = {
      id: subscriptionId,
      topic,
      callback,
      isActive: true,
    };

    this.subscriptions.set(subscriptionId, subscription);

    // Initialize WebSocket connection if not already connected
    if (!this.websocket) {
      await this.initializeWebSocket();
    }

    // Send subscription message
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify({
        type: 'subscribe',
        topic,
        subscriptionId,
      }));
    }

    return subscriptionId;
  }

  /**
   * Unsubscribe from data stream
   */
  async unsubscribe(subscriptionId: string): Promise<void> {
    const subscription = this.subscriptions.get(subscriptionId);
    if (!subscription) return;

    subscription.isActive = false;
    this.subscriptions.delete(subscriptionId);

    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify({
        type: 'unsubscribe',
        subscriptionId,
      }));
    }
  }

  /**
   * Get historical data from topic
   */
  async getHistoricalData(topic: string, limit = 100, offset = 0): Promise<DataStream[]> {
    try {
      const response = await fetch(`${this.config.endpoint}/history/${topic}?limit=${limit}&offset=${offset}`, {
        headers: {
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`Historical data retrieval failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('0G DA historical data error:', error);
      return [];
    }
  }

  /**
   * Initialize WebSocket connection for real-time streaming
   */
  private async initializeWebSocket(): Promise<void> {
    return new Promise((resolve, reject) => {
      const wsUrl = this.config.endpoint.replace('http', 'ws') + '/stream';
      this.websocket = new WebSocket(wsUrl);

      this.websocket.onopen = () => {
        console.log('0G DA WebSocket connected');
        resolve();
      };

      this.websocket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          this.handleWebSocketMessage(message);
        } catch (error) {
          console.error('0G DA WebSocket message parsing error:', error);
        }
      };

      this.websocket.onerror = (error) => {
        console.error('0G DA WebSocket error:', error);
        reject(error);
      };

      this.websocket.onclose = () => {
        console.log('0G DA WebSocket disconnected');
        this.websocket = null;
        
        // Attempt to reconnect after 5 seconds
        setTimeout(() => {
          if (this.subscriptions.size > 0) {
            this.initializeWebSocket();
          }
        }, 5000);
      };
    });
  }

  /**
   * Handle incoming WebSocket messages
   */
  private handleWebSocketMessage(message: any): void {
    if (message.type === 'data') {
      const stream: DataStream = message.stream;
      
      // Find matching subscriptions
      for (const subscription of this.subscriptions.values()) {
        if (subscription.isActive && subscription.topic === stream.topic) {
          try {
            subscription.callback(stream);
          } catch (error) {
            console.error('0G DA subscription callback error:', error);
          }
        }
      }
    }
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }

  /**
   * Close all connections and clean up
   */
  async disconnect(): Promise<void> {
    // Clear all subscriptions
    for (const subscriptionId of this.subscriptions.keys()) {
      await this.unsubscribe(subscriptionId);
    }

    // Close WebSocket connection
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
  }

  /**
   * Publish real-time agent interaction data
   */
  async publishAgentInteraction(agentId: string, userId: string, interaction: any): Promise<string> {
    return this.publishData(`agent:${agentId}:interactions`, {
      userId,
      interaction,
      agentId,
    });
  }

  /**
   * Subscribe to agent interactions
   */
  async subscribeToAgentInteractions(agentId: string, callback: (data: any) => void): Promise<string> {
    return this.subscribe(`agent:${agentId}:interactions`, (stream) => {
      callback(stream.data);
    });
  }

  /**
   * Publish marketplace analytics
   */
  async publishMarketplaceAnalytics(data: any): Promise<string> {
    return this.publishData('marketplace:analytics', data);
  }

  /**
   * Subscribe to marketplace updates
   */
  async subscribeToMarketplaceUpdates(callback: (data: any) => void): Promise<string> {
    return this.subscribe('marketplace:updates', (stream) => {
      callback(stream.data);
    });
  }
}

// Default 0G DA instance
export const dataAvailability = new ZeroGDA({
  endpoint: process.env.ZEROG_DA_ENDPOINT || 'https://da.0g.ai',
  apiKey: process.env.ZEROG_DA_API_KEY,
});
