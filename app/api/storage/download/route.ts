import { NextRequest, NextResponse } from 'next/server';
import { Indexer } from '@0glabs/0g-ts-sdk';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { hash, fileName } = await request.json();

    if (!hash) {
      return NextResponse.json({ error: 'No hash provided' }, { status: 400 });
    }

    console.log('Download attempt for hash:', hash);

    // Normalize hash format - 0G SDK expects hash without 0x prefix
    const normalizedHash = hash.startsWith('0x') ? hash.slice(2) : hash;
    console.log('Normalized hash for download:', normalizedHash);

    // Initialize indexer
    const INDEXER_RPC = 'https://indexer-storage-testnet-turbo.0g.ai';
    const indexer = new Indexer(INDEXER_RPC);

    // Create temp file for download
    const tempDir = await fs.promises.mkdtemp('/tmp/0g-download-');
    const outputFileName = fileName || `downloaded_${Date.now()}`;
    const outputPath = path.join(tempDir, outputFileName);

    // Add a small delay to ensure file is fully available
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Download file using normalized hash
    console.log('Attempting download with hash:', normalizedHash);
    const downloadErr = await indexer.download(normalizedHash, outputPath, true);
    if (downloadErr) {
      console.error('Download error details:', downloadErr);
      throw new Error(`Download error: ${downloadErr}`);
    }

    // Check if file exists
    if (!fs.existsSync(outputPath)) {
      throw new Error('Downloaded file not found');
    }

    // Read file as buffer
    const fileBuffer = await fs.promises.readFile(outputPath);
    const base64Data = fileBuffer.toString('base64');

    // Get file stats
    const stats = await fs.promises.stat(outputPath);
    const fileSize = stats.size;

    // Determine MIME type based on file extension (use provided filename for better detection)
    const detectionFileName = fileName || outputFileName;
    const ext = path.extname(detectionFileName).toLowerCase();
    const mimeTypes: { [key: string]: string } = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
      '.bmp': 'image/bmp',
      '.ico': 'image/x-icon',
      '.pdf': 'application/pdf',
      '.txt': 'text/plain',
      '.json': 'application/json',
      '.zip': 'application/zip',
      '.rar': 'application/x-rar-compressed',
      '.7z': 'application/x-7z-compressed',
      '.mp4': 'video/mp4',
      '.mp3': 'audio/mpeg',
      '.wav': 'audio/wav',
    };

    const mimeType = mimeTypes[ext] || 'application/octet-stream';

    // Clean up temp file
    await fs.promises.unlink(outputPath);
    await fs.promises.rmdir(tempDir);

    console.log('File downloaded and converted to base64, size:', fileSize);

    return NextResponse.json({
      success: true,
      fileName: outputFileName,
      fileSize,
      mimeType,
      data: base64Data, // Base64 encoded file data
      message: `File ready for browser display`
    });

  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Download failed'
    }, { status: 500 });
  }
}
