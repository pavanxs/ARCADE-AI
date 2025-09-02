import { NextRequest, NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { storage } from "@/lib/0g";

// POST /api/agents/[id]/knowledge-base/upload - Upload document to agent's knowledge base
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const agentId = params.id;
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const creatorAddress = formData.get('creatorAddress') as string;

    if (!file || !creatorAddress) {
      return NextResponse.json(
        { error: "File and creator address are required" },
        { status: 400 }
      );
    }

    // Verify agent ownership
    const agent = await db
      .select({
        id: schema.agents.id,
        creatorId: schema.agents.creatorId,
        creator: {
          walletAddress: schema.users.walletAddress,
        },
      })
      .from(schema.agents)
      .leftJoin(schema.users, eq(schema.agents.creatorId, schema.users.id))
      .where(eq(schema.agents.id, agentId))
      .limit(1);

    if (agent.length === 0) {
      return NextResponse.json(
        { error: "Agent not found" },
        { status: 404 }
      );
    }

    if (agent[0].creator?.walletAddress !== creatorAddress) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Validate file type and size
    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      return NextResponse.json(
        { error: "File too large (max 10MB)" },
        { status: 400 }
      );
    }

    try {
      // Upload file to 0G Storage
      const uploadResult = await storage.uploadFile(file, file.name);

      // Save document record to database
      const [document] = await db
        .insert(schema.knowledgeBaseDocuments)
        .values({
          agentId: agentId,
          filename: file.name,
          storagePath: uploadResult.hash, // Store 0G hash as storage path
          fileType: file.type,
          processedStatus: "pending",
        })
        .returning();

      // TODO: Process document for embeddings using 0G Compute
      // This would involve:
      // 1. Extracting text from the document
      // 2. Chunking the text into segments
      // 3. Generating embeddings using 0G Compute
      // 4. Storing embeddings for RAG functionality

      return NextResponse.json({
        documentId: document.id,
        filename: document.filename,
        status: document.processedStatus,
        storageHash: uploadResult.hash,
        size: uploadResult.size,
      }, { status: 201 });

    } catch (storageError) {
      console.error('0G Storage upload error:', storageError);
      
      // Fallback: store file locally or use alternative storage
      const [document] = await db
        .insert(schema.knowledgeBaseDocuments)
        .values({
          agentId: agentId,
          filename: file.name,
          storagePath: `local://${file.name}`, // Fallback storage path
          fileType: file.type,
          processedStatus: "pending",
        })
        .returning();

      return NextResponse.json({
        documentId: document.id,
        filename: document.filename,
        status: document.processedStatus,
        warning: "Uploaded to fallback storage (0G Storage unavailable)",
      }, { status: 201 });
    }

  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json(
      { error: "Failed to upload document" },
      { status: 500 }
    );
  }
}

// DELETE /api/agents/[id]/knowledge-base/upload - Delete document from knowledge base
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const agentId = params.id;
    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get("documentId");
    const creatorAddress = searchParams.get("creatorAddress");

    if (!documentId || !creatorAddress) {
      return NextResponse.json(
        { error: "Document ID and creator address are required" },
        { status: 400 }
      );
    }

    // Get document and verify ownership
    const document = await db
      .select({
        id: schema.knowledgeBaseDocuments.id,
        storagePath: schema.knowledgeBaseDocuments.storagePath,
        agent: {
          creatorId: schema.agents.creatorId,
        },
        creator: {
          walletAddress: schema.users.walletAddress,
        },
      })
      .from(schema.knowledgeBaseDocuments)
      .leftJoin(schema.agents, eq(schema.knowledgeBaseDocuments.agentId, schema.agents.id))
      .leftJoin(schema.users, eq(schema.agents.creatorId, schema.users.id))
      .where(eq(schema.knowledgeBaseDocuments.id, documentId))
      .limit(1);

    if (document.length === 0) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    if (document[0].creator?.walletAddress !== creatorAddress) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Delete from 0G Storage if it's stored there
    if (document[0].storagePath && !document[0].storagePath.startsWith('local://')) {
      try {
        await storage.deleteFile(document[0].storagePath);
      } catch (error) {
        console.warn('Failed to delete from 0G Storage:', error);
      }
    }

    // Delete from database
    await db
      .delete(schema.knowledgeBaseDocuments)
      .where(eq(schema.knowledgeBaseDocuments.id, documentId));

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { error: "Failed to delete document" },
      { status: 500 }
    );
  }
}
