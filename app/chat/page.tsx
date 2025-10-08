import { ZeroGChatInterface } from "@/components/chat/zero-g-chat-interface";

/**
 * Chat Page
 * Main chat interface using 0G Compute Network
 */
export default function ChatPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">AI Chat</h1>
        <p className="text-muted-foreground">
          Chat with AI powered by the 0G Compute Network. Use your private key to fund your account and start chatting.
        </p>
      </div>

      <ZeroGChatInterface />
    </div>
  );
}