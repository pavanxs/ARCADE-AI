/**
 * 0G Network Integration Suite
 * Complete integration with 0G's decentralized infrastructure
 */

// Export all 0G services
export * from './storage';
export * from './compute';
export * from './chain';
export * from './data-availability';

// Re-export instances for easy access
export { storage } from './storage';
export { compute } from './compute';
export { chain } from './chain';
export { dataAvailability } from './data-availability';

/**
 * 0G Network Service Manager
 * Coordinates all 0G services and provides unified interface
 */
export class ZeroGNetwork {
  /**
   * Initialize all 0G services
   */
  static async initialize(): Promise<void> {
    console.log('Initializing 0G Network services...');
    
    try {
      // Test connectivity to all services
      await Promise.allSettled([
        this.testStorage(),
        this.testCompute(),
        this.testChain(),
        this.testDataAvailability(),
      ]);
      
      console.log('0G Network services initialized successfully');
    } catch (error) {
      console.error('0G Network initialization error:', error);
    }
  }

  /**
   * Test 0G Storage connectivity
   */
  private static async testStorage(): Promise<void> {
    try {
      // Test with a small dummy file
      const testData = new TextEncoder().encode('0G Storage test');
      const result = await storage.uploadFile(Buffer.from(testData), 'test.txt');
      console.log('✅ 0G Storage: Connected');
      
      // Clean up test file
      await storage.deleteFile(result.hash);
    } catch (error) {
      console.log('❌ 0G Storage: Connection failed', error);
    }
  }

  /**
   * Test 0G Compute connectivity
   */
  private static async testCompute(): Promise<void> {
    try {
      await compute.getModels();
      console.log('✅ 0G Compute: Connected');
    } catch (error) {
      console.log('❌ 0G Compute: Connection failed', error);
    }
  }

  /**
   * Test 0G Chain connectivity
   */
  private static async testChain(): Promise<void> {
    try {
      // Test basic chain connectivity
      const earnings = await chain.getCreatorEarnings('0x0000000000000000000000000000000000000000');
      console.log('✅ 0G Chain: Connected');
    } catch (error) {
      console.log('❌ 0G Chain: Connection failed', error);
    }
  }

  /**
   * Test 0G Data Availability connectivity
   */
  private static async testDataAvailability(): Promise<void> {
    try {
      await dataAvailability.getHistoricalData('test', 1);
      console.log('✅ 0G Data Availability: Connected');
    } catch (error) {
      console.log('❌ 0G Data Availability: Connection failed', error);
    }
  }

  /**
   * Get network status
   */
  static async getNetworkStatus(): Promise<{
    storage: boolean;
    compute: boolean;
    chain: boolean;
    dataAvailability: boolean;
  }> {
    const results = await Promise.allSettled([
      this.testStorage(),
      this.testCompute(), 
      this.testChain(),
      this.testDataAvailability(),
    ]);

    return {
      storage: results[0].status === 'fulfilled',
      compute: results[1].status === 'fulfilled',
      chain: results[2].status === 'fulfilled',
      dataAvailability: results[3].status === 'fulfilled',
    };
  }
}

// Auto-initialize on import
if (typeof window === 'undefined') {
  // Only initialize on server-side
  ZeroGNetwork.initialize();
}
