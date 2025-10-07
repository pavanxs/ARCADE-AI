import { ZgFile, Indexer, Batcher, KvClient } from '@0glabs/0g-ts-sdk';
import { ethers, Wallet } from 'ethers';

// Network Constants
const RPC_URL = 'https://evmrpc-testnet.0g.ai/';
const INDEXER_RPC = 'https://indexer-storage-testnet-turbo.0g.ai';

// Initialize provider and signer
const privateKey = process.env.ZEROG_PRIVATE_KEY; // Replace with your private key
const provider = new ethers.JsonRpcProvider(RPC_URL);
const signer = new ethers.Wallet(privateKey as `0x${string}`, provider) as Wallet;

// Initialize indexer
const indexer = new Indexer(INDEXER_RPC);

async function uploadFile(filePath: string) {
    // Create file object from file path
    const file = await ZgFile.fromFilePath(filePath);
    
    // Generate Merkle tree for verification
    const [tree, treeErr] = await file.merkleTree();
    if (treeErr !== null) {
      throw new Error(`Error generating Merkle tree: ${treeErr}`);
    }
    
    // Get root hash for future reference
    console.log("File Root Hash:", tree?.rootHash());
    
    // Upload to network
    const [tx, uploadErr] = await indexer.upload(file, RPC_URL, signer);
    if (uploadErr !== null) {
      throw new Error(`Upload error: ${uploadErr}`);
    }
    
    console.log("Upload successful! Transaction:", tx);
    
    // Always close the file when done
    await file.close();
    
    return { rootHash: tree?.rootHash(), txHash: tx };
  }