# ARCADE-AI: Decentralized AI Agent Platform

A fully-featured decentralized platform for creating, customizing, and monetizing AI agents powered by the 0G Network.

### 🎉 **BUILD STATUS: ✅ SUCCESSFUL**
The application builds successfully and is ready for deployment!

### 📋 **IMPLEMENTATION STATUS: 100% COMPLETE**
All features from the PRD have been implemented with comprehensive 0G Network integration.

### 🚀 **LIVE DEMO**
**Base URL**: [https://arcade-ai-psi.vercel.app/](https://arcade-ai-psi.vercel.app/)

**Quick Links:**
- 🏠 [Home Page](https://arcade-ai-psi.vercel.app/) - Landing page with feature overview
- 🛍️ [Marketplace](https://arcade-ai-psi.vercel.app/marketplace) - Browse and discover AI agents
- 🎮 [AI Games](https://arcade-ai-psi.vercel.app/games) - Play AI-powered games
- 📊 [Dashboard](https://arcade-ai-psi.vercel.app/dashboard) - Manage your AI agents
- ➕ [Create Agent](https://arcade-ai-psi.vercel.app/dashboard/create) - Build new AI agents

### 🆕 **Screens**
<img width="1076" height="616" alt="Screenshot 2025-09-03 032235" src="https://github.com/user-attachments/assets/48a10b99-4535-4e45-b05e-485fa6facaa4" />
<img width="1079" height="614" alt="Screenshot 2025-09-03 032153" src="https://github.com/user-attachments/assets/c0202b74-0781-4057-af92-3cfd67665ae6" />
<img width="1079" height="614" alt="Screenshot 2025-09-03 032036" src="https://github.com/user-attachments/assets/df22d8cd-7fd6-41a2-ad74-0ed854e93b07" />
<img width="1079" height="614" alt="Screenshot 2025-09-03 031936" src="https://github.com/user-attachments/assets/b62bc62d-6705-4402-8678-39298fc6cf75" />

### 🆕 **What's New - Latest Changes**

#### **🔧 Core Platform Features**
- ✅ **Complete Agent Creation Flow**: 5-step wizard (Basic Info → Knowledge Base → Behavior → Monetization → Review)
- ✅ **Advanced Marketplace**: Search, filter, and discover AI agents with detailed profiles
- ✅ **Real-time Chat Interface**: Interactive chat with AI agents including typing indicators
- ✅ **Multi-tier Monetization**: Flexible pricing models (free, per-query, subscription)
- ✅ **AI Games Section**: Discover and play AI-powered games and experiences
- ✅ **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

#### **🌐 0G Network Integration**
- ✅ **0G Storage**: Decentralized file storage for knowledge base documents
- ✅ **0G Compute**: AI inference for agent responses with fallback mechanisms  
- ✅ **0G Chain**: Smart contract-based payments and access control
- ✅ **0G Data Availability**: Real-time analytics and interaction tracking
- ✅ **Intelligent Fallbacks**: Graceful degradation when 0G services are unavailable

#### **🎨 UI/UX Enhancements**
- ✅ **Dark Mode Default**: Modern dark theme with light mode toggle
- ✅ **Outfit Font**: Clean, professional typography throughout
- ✅ **Smooth Animations**: Micro-interactions and loading states
- ✅ **Toast Notifications**: User feedback for all actions
- ✅ **Form Validation**: Real-time validation with helpful error messages

#### **🔐 Web3 Features**
- ✅ **Wallet Integration**: Connect with MetaMask, WalletConnect, and other wallets
- ✅ **Multi-chain Support**: 0G Chain, Ethereum Mainnet, and Sepolia testnet
- ✅ **Crypto Payments**: USDC, ETH, and 0G token support
- ✅ **Access Control**: Token-gated features and tier-based permissions

#### **🛠️ Developer Experience**
- ✅ **TypeScript**: Full type safety throughout the application
- ✅ **Drizzle ORM**: Type-safe database operations with SQLite
- ✅ **API Routes**: RESTful APIs for all functionality
- ✅ **Build Optimization**: Successful production builds with proper error handling
- ✅ **Development Mode**: Authentication disabled for easy testing

#### **📱 Pages Implemented**
1. **Landing Page** - Hero section, features, and call-to-action
2. **Marketplace** - Agent discovery with advanced filtering
3. **Agent Profile** - Detailed agent information with chat and payment
4. **Dashboard** - Agent management and analytics overview
5. **Agent Creation** - Multi-step wizard for building agents
6. **AI Games** - Game catalog with individual game pages
7. **Chat Interface** - Real-time messaging with AI agents
8. **Payment Flow** - Cryptocurrency payment processing

#### **🗃️ Database Schema**
- ✅ **8 Core Tables**: Users, Agents, Knowledge Base, Access Tiers, Transactions, Interactions, AI Games
- ✅ **Relational Design**: Proper foreign keys and relationships
- ✅ **Type Safety**: Full TypeScript integration with Drizzle ORM

## Features

- **AI Agent Creation**: Build and customize AI agents with your own knowledge base
- **Knowledge Base Management**: Upload documents to train your agents
- **Monetization**: Set pricing tiers and earn cryptocurrency from agent interactions
- **Marketplace**: Discover and interact with AI agents created by others
- **AI Games**: Play AI-powered games and experiences
- **Web3 Integration**: Wallet connection and crypto payments via 0G Chain
- **Decentralized Storage**: Document storage powered by 0G Storage

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **Database**: SQLite with Drizzle ORM
- **Web3**: Wagmi, Web3Modal, Viem
- **Blockchain**: 0G Chain (EVM-compatible)
- **Storage**: 0G Storage for decentralized file storage
- **Compute**: 0G Compute for AI inference


## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Web3 wallet (MetaMask, etc.)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ARCADE-AI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Update the environment variables:
   ```
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
   ```

4. Initialize the database:
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ARCADE-AI/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── dashboard/         # Creator dashboard
│   ├── marketplace/       # Agent marketplace
│   └── games/            # AI games section
├── components/            # React components
│   ├── agent-creation/   # Agent creation wizard
│   ├── chat/             # Chat interface
│   ├── layout/           # Layout components
│   ├── payment/          # Payment flow
│   └── ui/               # UI components (shadcn/ui)
├── lib/                   # Utilities and configurations
│   ├── db/               # Database schema and client
│   ├── providers/        # React providers
│   └── web3/             # Web3 configuration
└── scripts/              # Utility scripts
```

## Key Features

### 1. Agent Creation Flow
- **Basic Information**: Name, description, and model type
- **Knowledge Base**: Upload and manage documents
- **Behavior & Personality**: Define agent persona and tone
- **Monetization**: Set pricing tiers and access levels
- **Review & Publish**: Final review before marketplace listing

### 2. Marketplace
- Browse and discover AI agents
- Filter by category, price, and ratings
- View detailed agent profiles
- Free previews and paid access tiers

### 3. Chat Interface
- Real-time chat with AI agents
- Usage tracking and limits
- Payment integration for premium access
- Message history and context

### 4. AI Games
- Discover AI-powered gaming experiences
- Adaptive gameplay that learns from player behavior
- Various categories: Adventure, Strategy, Creative, Educational

### 5. Web3 Integration
- Wallet connection via Web3Modal
- Cryptocurrency payments on 0G Chain
- Decentralized storage for knowledge bases
- Transparent earnings distribution

## Database Schema

The application uses SQLite with Drizzle ORM. Key tables include:

- `users`: User accounts linked to wallet addresses
- `agents`: AI agent configurations and metadata
- `knowledge_base_documents`: Uploaded documents for agent training
- `access_tiers`: Pricing and access level definitions
- `user_agent_access`: User subscriptions and access tracking
- `transactions`: Payment history and records
- `agent_interactions`: Chat history and analytics
- `ai_games`: AI-powered game catalog

## API Endpoints

### Agents
- `GET /api/agents` - List published agents (marketplace)
- `POST /api/agents` - Create new agent
- `GET /api/agents/[id]` - Get agent details
- `PUT /api/agents/[id]` - Update agent
- `DELETE /api/agents/[id]` - Delete agent
- `POST /api/agents/[id]/chat` - Chat with agent

### Games
- `GET /api/games` - List AI games
- `POST /api/games` - Create new game

## 0G Network Integration

This platform is fully integrated with the 0G Network's decentralized infrastructure:

### 🗄️ 0G Storage
- **Knowledge Base Storage**: All uploaded documents (PDFs, TXT, DOC, DOCX) are stored on 0G's decentralized storage network
- **Automatic Fallback**: Graceful fallback to local storage if 0G Storage is unavailable
- **File Management**: Upload, retrieve, delete, and get metadata for files using 0G Storage APIs
- **Implementation**: `lib/0g/storage.ts` with full CRUD operations

### 🧠 0G Compute  
- **AI Inference**: All agent responses are generated using 0G Compute's distributed AI infrastructure
- **Model Selection**: Support for multiple AI models (GPT-3.5-turbo, GPT-4) based on agent configuration
- **RAG Processing**: Knowledge base documents are processed into embeddings using 0G Compute
- **Streaming Responses**: Real-time streaming of AI responses for better user experience
- **Vector Search**: Semantic search through knowledge bases using 0G Compute's embedding models
- **Implementation**: `lib/0g/compute.ts` with OpenAI-compatible API

### ⛓️ 0G Chain (EVM-Compatible)
- **Payment Processing**: All cryptocurrency payments processed through smart contracts on 0G Chain
- **Agent Registry**: On-chain registration of AI agents with metadata stored on 0G Storage
- **Access Control**: Smart contract-based access management for paid agent tiers
- **Creator Earnings**: Automatic earnings distribution to agent creators via smart contracts
- **Transaction Tracking**: Real-time transaction status monitoring and confirmation
- **Implementation**: `lib/0g/chain.ts` with Viem integration

### 📊 0G Data Availability (DA)
- **Real-time Analytics**: All agent interactions published to 0G DA for real-time analytics
- **Marketplace Updates**: Live updates of agent popularity, ratings, and usage statistics
- **WebSocket Streaming**: Real-time data streaming for live dashboards and notifications
- **Historical Data**: Query historical interaction data for analytics and insights
- **Implementation**: `lib/0g/data-availability.ts` with WebSocket support

### 🔧 Integration Features

#### Implemented 0G Services:
1. **File Upload API** (`/api/agents/[id]/knowledge-base/upload`):
   - Uploads files to 0G Storage
   - Stores 0G hash as storage path in database
   - Processes documents for RAG using 0G Compute

2. **AI Chat API** (`/api/agents/[id]/chat`):
   - Uses 0G Compute for AI inference
   - Publishes interactions to 0G DA for analytics
   - Supports streaming responses

3. **Payment API** (`/api/payments/process`):
   - Processes payments via 0G Chain smart contracts
   - Updates access control based on blockchain transactions
   - Handles transaction status monitoring

4. **Network Status Monitoring**:
   - Automatic connectivity testing for all 0G services
   - Graceful fallbacks when services are unavailable
   - Real-time network status reporting

#### Environment Variables:
```env
# 0G Storage
ZEROG_STORAGE_ENDPOINT=https://storage.0g.ai
ZEROG_STORAGE_API_KEY=your_storage_api_key

# 0G Compute  
ZEROG_COMPUTE_ENDPOINT=https://compute.0g.ai
ZEROG_COMPUTE_API_KEY=your_compute_api_key

# 0G Chain
ZEROG_RPC_URL=https://rpc.0g.ai
ZEROG_CHAIN_ID=16600
ZEROG_PRIVATE_KEY=your_private_key
ZEROG_PAYMENT_CONTRACT=0x...
ZEROG_REGISTRY_CONTRACT=0x...
ZEROG_TOKEN_CONTRACT=0x...

# 0G Data Availability
ZEROG_DA_ENDPOINT=https://da.0g.ai
ZEROG_DA_API_KEY=your_da_api_key
```

#### Smart Contracts:
The platform uses three main smart contracts on 0G Chain:

1. **PaymentProcessor**: Handles all payment processing, access control, and earnings distribution
2. **AgentRegistry**: Manages on-chain agent registration and metadata
3. **TokenContract**: ERC-20 token contract for platform payments (USDC/0G tokens)

#### Fallback Mechanisms:
- **Storage**: Falls back to local file storage if 0G Storage is unavailable
- **Compute**: Falls back to mock responses if 0G Compute is unavailable  
- **Chain**: Falls back to mock transactions for development if 0G Chain is unavailable
- **DA**: Continues operation without analytics if 0G DA is unavailable

This comprehensive integration ensures the platform can leverage 0G's full decentralized infrastructure while maintaining reliability through intelligent fallbacks.

## Development

### Database Commands
```bash
npm run db:generate  # Generate migrations
npm run db:migrate   # Run migrations
npm run db:init      # Initialize database
```

### Building for Production
```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built for the 0G Network Hackathon
- Powered by 0G's decentralized infrastructure
- UI components from shadcn/ui
- Web3 integration via Wagmi
