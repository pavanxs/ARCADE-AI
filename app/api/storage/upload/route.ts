import { NextRequest, NextResponse } from 'next/server';
import { ZgFile, Indexer } from '@0glabs/0g-ts-sdk';
import { ethers, Wallet } from 'ethers';

export async function POST(request: NextRequest) {
  let zgFile: any = null;
  let tempPath: string | null = null;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to buffer and create ZgFile
    const buffer = Buffer.from(await file.arrayBuffer());

    // Create ZgFile from buffer - use temp file approach since fromBuffer doesn't exist
    if (ZgFile.fromFilePath) {
      // Write to temp file and use fromFilePath (fallback)
      const fs = await import('fs/promises');
      const path = await import('path');
      const tempDir = await fs.mkdtemp('/tmp/0g-upload-');
      tempPath = path.join(tempDir, file.name);
      await fs.writeFile(tempPath, buffer);
      zgFile = await ZgFile.fromFilePath(tempPath);
    } else {
      throw new Error('No suitable ZgFile creation method available');
    }

    // Generate Merkle tree
    const [tree, treeErr] = await zgFile.merkleTree();
    if (treeErr) {
      throw new Error(`Merkle tree error: ${treeErr}`);
    }

    const rootHash = tree?.rootHash();

    // Initialize 0G client
    const RPC_URL = 'https://evmrpc-testnet.0g.ai/';
    const INDEXER_RPC = 'https://indexer-storage-testnet-turbo.0g.ai';
    const privateKey = process.env.ZEROG_PRIVATE_KEY2;

    if (!privateKey) {
      throw new Error('ZEROG_PRIVATE_KEY2 not configured');
    }

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const signer: Wallet = new ethers.Wallet(privateKey, provider);
    const indexer = new Indexer(INDEXER_RPC);

    // Upload file
    const [tx, uploadErr] = await indexer.upload(zgFile, RPC_URL, signer as any);
    if (uploadErr) {
      throw new Error(`Upload error: ${uploadErr}`);
    }

    return NextResponse.json({
      success: true,
      hash: rootHash,
      txHash: tx,
      fileName: file.name,
      fileSize: file.size
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Upload failed'
    }, { status: 500 });
  } finally {
    // Clean up temp file if created
    if (tempPath) {
      try {
        const fs = await import('fs/promises');
        await fs.unlink(tempPath);
      } catch (cleanupError) {
        console.warn('Failed to clean up temp file:', cleanupError);
      }
    }
    // Close ZgFile
    if (zgFile) {
      try {
        await zgFile.close();
      } catch (closeError) {
        console.warn('Failed to close ZgFile:', closeError);
      }
    }
  }
}
