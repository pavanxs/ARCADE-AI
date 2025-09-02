/**
 * 0G Storage Integration
 * Handles decentralized file storage for knowledge base documents
 */

export interface StorageConfig {
  endpoint: string;
  apiKey?: string;
}

export interface UploadResult {
  hash: string;
  url: string;
  size: number;
}

export class ZeroGStorage {
  private config: StorageConfig;

  constructor(config: StorageConfig) {
    this.config = config;
  }

  /**
   * Upload file to 0G Storage
   */
  async uploadFile(file: File | Buffer, filename: string): Promise<UploadResult> {
    try {
      // Convert file to buffer if needed
      const buffer = file instanceof File ? await file.arrayBuffer() : file;
      
      // Create form data for upload
      const formData = new FormData();
      formData.append('file', new Blob([buffer]), filename);
      
      // Upload to 0G Storage network
      const response = await fetch(`${this.config.endpoint}/upload`, {
        method: 'POST',
        headers: {
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      
      return {
        hash: result.hash,
        url: `${this.config.endpoint}/file/${result.hash}`,
        size: buffer.byteLength,
      };
    } catch (error) {
      console.error('0G Storage upload error:', error);
      throw error;
    }
  }

  /**
   * Retrieve file from 0G Storage
   */
  async getFile(hash: string): Promise<ArrayBuffer> {
    try {
      const response = await fetch(`${this.config.endpoint}/file/${hash}`, {
        headers: {
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`File retrieval failed: ${response.statusText}`);
      }

      return await response.arrayBuffer();
    } catch (error) {
      console.error('0G Storage retrieval error:', error);
      throw error;
    }
  }

  /**
   * Delete file from 0G Storage
   */
  async deleteFile(hash: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.endpoint}/file/${hash}`, {
        method: 'DELETE',
        headers: {
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
        },
      });

      return response.ok;
    } catch (error) {
      console.error('0G Storage deletion error:', error);
      return false;
    }
  }

  /**
   * Get file metadata
   */
  async getFileInfo(hash: string): Promise<{ size: number; contentType: string; uploadDate: Date }> {
    try {
      const response = await fetch(`${this.config.endpoint}/info/${hash}`, {
        headers: {
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`File info retrieval failed: ${response.statusText}`);
      }

      const info = await response.json();
      
      return {
        size: info.size,
        contentType: info.contentType,
        uploadDate: new Date(info.uploadDate),
      };
    } catch (error) {
      console.error('0G Storage info error:', error);
      throw error;
    }
  }
}

// Default 0G Storage instance
export const storage = new ZeroGStorage({
  endpoint: process.env.ZEROG_STORAGE_ENDPOINT || 'https://storage.0g.ai',
  apiKey: process.env.ZEROG_STORAGE_API_KEY,
});
