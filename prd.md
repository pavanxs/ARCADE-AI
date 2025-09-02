Understood! You've provided an excellent foundation, and our team can certainly fill in the granular details for the rest of the Product Requirements Document. We'll leverage the confirmed high-level concepts and user flows to craft the deeper specifications, incorporating best practices and leveraging the 0G platform where appropriate.

Here's a comprehensive PRD based on our discussions, with our team's suggested granular details where we left off:

---

## Product Requirements Document: Decentralized AI Agent Platform (ARCADE-AI)

**Version:** 1.0
**Date:** October 26, 2023

---

### 1. Project Overview & Core Goal

**Core Goal:** To empower users to easily create, customize, and monetize advanced AI agents by enabling them to integrate their own diverse knowledge bases, including personal research papers and consulting reports. Concurrently, the platform will offer a dynamic marketplace for other users to discover, interact with, and pay for enhanced access to these agents and a variety of AI-powered games.

---

### 2. Key Features

1.  **AI Agent Creation & Customization:** Allow users to build and configure AI agents, including setting their personality, parameters, and responses.
2.  **Knowledge Base Management:** Enable creators to upload and manage various document types (research papers, reports, etc.) to form the agent's knowledge base.
3.  **Agent Monetization & Pricing:** Provide tools for creators to set access tiers and pricing models for their AI agents.
4.  **AI Agent Marketplace:** A dedicated section where users can discover, browse, and select AI agents created by others.
5.  **Interactive AI Agent Chat:** Allow users to engage in conversations and interact with the listed AI agents.
6.  **Secure Cryptocurrency Payment & Access System:** Implement a system for users to purchase access to agents using cryptocurrency and for creators to receive earnings.
7.  **AI-Powered Games/Programmable Agents Section:** A distinct area featuring interactive AI games and opportunities for users to engage with more programmable AI experiences.

---

### 3. User Personas/Types

1.  **AI Agent Creators:**
    *   **Description:** Technical or semi-technical users who want to build and customize AI agents, integrate proprietary knowledge bases, and monetize their creations.
    *   **Primary Needs:** Powerful yet accessible creation and management interface, robust knowledge base upload/management, flexible monetization tools, performance analytics.
2.  **AI Agent Consumers/Players:**
    *   **Description:** Users looking to discover and interact with AI agents for specific information, entertainment, or utility, and are willing to pay for enhanced access using cryptocurrency. Includes users interested in AI-powered games.
    *   **Primary Needs:** User-friendly browsing and discovery experience, seamless and engaging interaction with agents, secure and intuitive crypto payment process, diverse range of agents and games.

---

### 4. User Flows

#### 4.1. AI Agent Creator: Create, Customize, Monetize AI Agent with Knowledge Base

1.  **Agent Creation Initiation:**
    *   **Action:** Creator navigates to "My Agents" section and clicks "Create New Agent."
    *   **System Response:** Navigates to the "Create Agent / Basic Info" page.
2.  **Basic Agent Information Input:**
    *   **Action:** Creator inputs Agent Name, Description, and selects a Base Model/Type (e.g., conversational, task-oriented).
    *   **System Response:** Validates input, proceeds to "Knowledge Base Management" page.
3.  **Knowledge Base Upload and Management:**
    *   **Action:** Creator uploads documents (PDFs, TXT, etc.) to form the agent's knowledge base. Views, manages, and removes documents.
    *   **System Response:** Processes uploads (e.g., secure storage on 0G Storage, indexing for AI model), updates document list, proceeds to "Agent Behavior Customization" page.
4.  **Agent Customization (Behavior & Personality):**
    *   **Action:** Creator defines agent persona, conversational style, specific directives, and potentially provides example interactions.
    *   **System Response:** Saves customization settings, proceeds to "Agent Monetization Settings" page.
5.  **Agent Monetization Configuration:**
    *   **Action:** Creator defines access tiers (e.g., free preview, paid full access) and sets pricing models (e.g., subscription, pay-per-query, one-time purchase) in cryptocurrency.
    *   **System Response:** Saves monetization settings, proceeds to "Agent Review & Publish" page.
6.  **Agent Publishing and Deployment:**
    *   **Action:** Creator reviews agent configuration summary and clicks "Publish" or "Deploy."
    *   **System Response:** Agent is made available on the marketplace; status updated to "Published." Confirmation message displayed.

#### 4.2. AI Agent Consumer: Discover, Interact, Pay for Enhanced Access

1.  **Agent Discovery:**
    *   **Action:** Consumer navigates to the "Marketplace" section.
    *   **System Response:** Displays a list/grid of available AI agents.
2.  **Agent Browsing and Filtering:**
    *   **Action:** Consumer uses search bar and filters (category, price, popularity, creator, knowledge base topics) to narrow down agents.
    *   **System Response:** Dynamically updates the displayed list of agents based on search/filter criteria.
3.  **Agent Profile Viewing:**
    *   **Action:** Consumer clicks on an agent from the marketplace.
    *   **System Response:** Navigates to the agent's dedicated profile page displaying name, description, creator, knowledge base summary, access tiers, pricing details, and reviews.
4.  **Initial Agent Interaction and Free Preview:**
    *   **Action:** Consumer initiates a chat with the agent for a limited free preview.
    *   **System Response:** Agent responds within free limits. If limits are reached or paid features are attempted, a prompt for purchasing enhanced access is displayed.
5.  **Purchase Enhanced Access (Cryptocurrency):**
    *   **Action:** Consumer selects desired access tier, connects Web3 wallet, reviews pricing in crypto, and authorizes the transaction.
    *   **System Response:** Initiates a crypto transaction via 0G Chain (or compatible EVM chain). Upon successful transaction, grants enhanced access to the agent. Confirmation displayed.
6.  **Full Agent Interaction:**
    *   **Action:** Consumer interacts fully with the agent, accessing all features of the purchased tier.
    *   **System Response:** Agent responds based on its configuration and full knowledge base access.

---

### 5. Page/Screen Planning (Product Designer Focus)

#### 5.1. Dashboard/My Agents Page

*   **Purpose:** Creator's central control panel for managing existing agents and initiating new ones.
*   **Content Elements:**
    *   Prominent "Create New Agent" button.
    *   List/grid of creator's agents.
    *   For each agent: Agent Name, brief description/status (e.g., "Published," "Draft"), key metrics (e.g., "Total Interactions," "Earnings to Date," "Current Subscribers").
*   **Key Interactive Elements:**
    *   **"Create New Agent" Button:** Navigates to `Create Agent / Basic Info Page`.
    *   **Agent List Items (Clickable):** Navigates to a detailed `Agent Overview/Edit Page`.
    *   **"Edit Agent" Button/Link:** Navigates to `Create Agent / Basic Info Page` (pre-filled).
    *   **"View Analytics" Button/Link:** Navigates to `Agent Analytics Page`.
    *   **"Publish/Unpublish" Toggle/Button:** Toggles agent visibility/availability.
*   **Basic Layout Considerations:** Responsive design, clear header, prominent "Create New Agent" button, scrollable section for agents (card-based grid or sortable table).
*   **Accessibility Considerations:** Keyboard navigation, clear focus states, semantic HTML, adequate color contrast.

#### 5.2. Create Agent / Basic Info Page

*   **Purpose:** Collect fundamental initial information for a new AI agent.
*   **Content Elements:**
    *   Form fields for: Agent Name (text input), Agent Description (textarea), Base AI Model Selection (dropdown/radio buttons, e.g., "Conversational," "Task-Oriented," "Creative").
    *   "Next" / "Save Draft" buttons.
*   **Key Interactive Elements:**
    *   **Form fields:** Standard input interactions.
    *   **"Next" Button:** Validates input and proceeds to `Knowledge Base Management Page`.
    *   **"Save Draft" Button:** Saves current progress and returns to `Dashboard/My Agents Page`.
*   **Basic Layout Considerations:** Form-based layout, clear labels, progress indicator if part of a multi-step wizard.
*   **Accessibility Considerations:** Accessible form elements, clear error messages, keyboard navigation.

#### 5.3. Knowledge Base Management Page

*   **Purpose:** Enable creators to upload and manage documents for the agent's knowledge base.
*   **Content Elements:**
    *   Drag-and-drop file upload area.
    *   "Upload File" button.
    *   List of uploaded documents (with file name, size, upload date).
    *   Progress bar/status indicator for ongoing uploads.
    *   Call to action to proceed to the next step.
*   **Key Interactive Elements:**
    *   **File Upload:** Triggers file selection or drag-and-drop.
    *   **"Delete" Button (per document):** Removes a document from the knowledge base.
    *   **"Next" Button:** Proceeds to `Agent Behavior Customization Page`.
*   **Basic Layout Considerations:** Dedicated section for upload, clear list display, easy identification of actions per document.
*   **Accessibility Considerations:** Clear instructions for file upload, accessible file input, keyboard navigation for actions.

#### 5.4. Agent Behavior Customization Page

*   **Purpose:** Define the AI agent's persona, conversational style, and specific directives.
*   **Content Elements:**
    *   Textareas for: Agent Persona Description (e.g., "Act as a helpful, but slightly sarcastic, financial advisor"), Specific Directives/Rules (e.g., "Always cite sources from the knowledge base").
    *   Sliders/Dropdowns for: Conversational Tone (e.g., "Formal," "Casual," "Empathetic").
    *   Optional "Example Interactions" input field or upload for fine-tuning.
*   **Key Interactive Elements:**
    *   **Textareas/Sliders/Dropdowns:** Standard input interactions.
    *   **"Save & Next" Button:** Saves settings and proceeds to `Agent Monetization Settings Page`.
*   **Basic Layout Considerations:** Organized forms with clear sections for different aspects of behavior.
*   **Accessibility Considerations:** Clear labels, descriptive text, keyboard navigation.

#### 5.5. Agent Monetization Settings Page

*   **Purpose:** Configure access tiers and cryptocurrency pricing models for the agent.
*   **Content Elements:**
    *   Options to define multiple access tiers (e.g., "Free Preview," "Standard Access," "Premium Access").
    *   For each tier:
        *   Tier Name.
        *   Description of features included.
        *   Pricing Model (e.g., "Per-Query," "Monthly Subscription," "One-Time Purchase").
        *   Price in selected cryptocurrency (e.g., USDC on 0G Chain).
        *   Usage Limits (e.g., "5 queries/day" for free, "unlimited" for paid).
    *   Wallet connection prompt/status for creators to receive earnings.
*   **Key Interactive Elements:**
    *   **"Add Tier" Button:** Adds a new access tier.
    *   **"Remove Tier" Button:** Removes an existing tier.
    *   **Currency Selector:** Dropdown for supported cryptocurrencies.
    *   **Input fields:** For pricing and limits.
    *   **"Save & Next" Button:** Saves settings and proceeds to `Agent Review & Publish Page`.
*   **Basic Layout Considerations:** Clear, tabbed, or accordion-style sections for managing multiple tiers, input fields for numerical values, clear indications of currency.
*   **Accessibility Considerations:** Clear labels, input validation feedback, keyboard navigation.

#### 5.6. Agent Review & Publish Page

*   **Purpose:** Provide a summary of the agent's configuration before final deployment to the marketplace.
*   **Content Elements:**
    *   Read-only summary of: Agent Name, Description, Base Model, Knowledge Base (number of documents/summary), Behavior settings, Monetization Tiers and Pricing.
    *   Confirmation checkbox (e.g., "I agree to the terms and conditions").
    *   "Publish Agent" button.
*   **Key Interactive Elements:**
    *   **"Edit" Links (per section):** Allows navigation back to previous configuration steps.
    *   **"Publish Agent" Button:** Becomes active once terms are accepted; initiates deployment.
*   **Basic Layout Considerations:** Well-organized summary sections, clear call to action for publishing.
*   **Accessibility Considerations:** Clear hierarchy of information, accessible links for editing, keyboard navigation.

#### 5.7. Marketplace Page

*   **Purpose:** Central hub for consumers to discover, browse, and filter AI agents.
*   **Content Elements:**
    *   Search bar.
    *   Filter options (categories, price range, popularity, creator, knowledge base keywords).
    *   Grid/list of AI agent cards.
    *   Each agent card: Agent Name, Creator, Short Description, Price Range (if applicable), Average Rating.
*   **Key Interactive Elements:**
    *   **Search Bar:** Filters agents dynamically.
    *   **Filter Checkboxes/Dropdowns:** Refine agent list.
    *   **Agent Cards (Clickable):** Navigates to `Agent Profile Page`.
*   **Basic Layout Considerations:** Prominent search and filter, visually appealing agent cards, pagination or infinite scroll for results.
*   **Accessibility Considerations:** Clear search/filter labels, keyboard navigation, accessible sorting/filtering options.

#### 5.8. Agent Profile Page

*   **Purpose:** Display detailed information about a specific AI agent and initiate interaction/purchase.
*   **Content Elements:**
    *   Agent Name, Creator Name.
    *   Detailed Description.
    *   Summary of Knowledge Base (e.g., "Covers financial reports, market analysis").
    *   Available Access Tiers with descriptions and crypto pricing.
    *   "Chat with Agent" button (initiates free preview).
    *   "Purchase Access" button (if paid tiers exist).
    *   User Reviews/Ratings section.
*   **Key Interactive Elements:**
    *   **"Chat with Agent" Button:** Opens chat interface for free preview.
    *   **"Purchase Access" Button:** Initiates crypto payment flow.
    *   **Review Submission Form/Button:** Allows users to leave feedback.
*   **Basic Layout Considerations:** Clear hero section for agent details, distinct sections for tiers, reviews, and interaction.
*   **Accessibility Considerations:** Clear hierarchy, accessible buttons and forms.

#### 5.9. Chat Interface (In-Page or Modal)

*   **Purpose:** Facilitate real-time interaction between consumer and AI agent.
*   **Content Elements:**
    *   Chat message display area (showing user and agent messages).
    *   Message input field.
    *   "Send" button.
    *   If free preview, a clear indicator of remaining interactions and a prompt to upgrade.
    *   If paid, access tier displayed.
*   **Key Interactive Elements:**
    *   **Message Input:** Allows typing.
    *   **"Send" Button:** Submits message to agent.
    *   **"Upgrade" / "Purchase Full Access" Button:** Initiates payment flow.
*   **Basic Layout Considerations:** Responsive chat window, clear message bubbles, persistent input field.
*   **Accessibility Considerations:** Keyboard navigation, clear visual feedback for messages, screen reader compatibility.

#### 5.10. Crypto Payment Flow Pages/Modals

*   **Purpose:** Securely process cryptocurrency payments for agent access.
*   **Content Elements:**
    *   Selected Access Tier summary.
    *   Total price in crypto (e.g., USDC).
    *   "Connect Wallet" button / Display connected wallet address.
    *   Transaction details (gas fees, total).
    *   "Confirm Payment" button.
    *   Transaction status indicator (pending, confirmed, failed).
*   **Key Interactive Elements:**
    *   **"Connect Wallet" Button:** Triggers Web3 wallet connection (e.g., MetaMask, WalletConnect).
    *   **"Confirm Payment" Button:** Initiates blockchain transaction.
    *   **Transaction Status Display:** Updates in real-time.
*   **Basic Layout Considerations:** Clear, step-by-step process, prominent transaction details, secure visual cues.
*   **Accessibility Considerations:** Clear instructions, accessible buttons, real-time feedback.

#### 5.11. AI Games/Programmable Agents Page

*   **Purpose:** Showcase and allow interaction with AI-powered games and programmable agents.
*   **Content Elements:**
    *   Categorized list/grid of AI games or programmable agents.
    *   For each item: Game/Agent Name, Short Description, Creator, Play/Launch button.
*   **Key Interactive Elements:**
    *   **"Play" / "Launch" Button:** Initiates the game or programmable agent experience.
*   **Basic Layout Considerations:** Similar to marketplace but focused on interactive experiences, clear entry points to individual games.
*   **Accessibility Considerations:** Consistent navigation, accessible controls for games (where applicable).

---

### 6. Interaction & UX Details (Product Designer/Developer Focus)

*   **Form Validation:** All form inputs will have real-time client-side validation, providing immediate feedback (e.g., red borders, error messages) as the user types or on blur.
*   **Loading States:** For any action involving an API call or blockchain transaction, a loading spinner or skeleton component will be displayed to indicate ongoing processing.
*   **Confirmation Messages:** Successful actions (e.g., agent published, payment confirmed) will trigger clear, dismissible success notifications (e.g., "Sonner" toast notifications).
*   **Error States:** API errors or failed transactions will display user-friendly error messages, suggesting next steps where applicable.
*   **Empty States:** Sections like "My Agents" or the "Marketplace" will have clear messages and calls to action when no agents are created or available.
*   **Responsiveness:** The entire application will be designed to be fully responsive, adapting gracefully to desktop, tablet, and mobile screen sizes.
*   **Micro-interactions:** Subtle animations for button hovers, card selections, and page transitions to enhance the perceived responsiveness and polish of the UI.
*   **Chat Interaction:** Messages will animate into view, and an "Agent is typing..." indicator will be shown during AI response generation.

---

### 7. API Design (Developer Focus)

The API will be RESTful, with endpoints designed to support the defined user flows and features. Authentication will likely leverage Web3 wallet signatures for certain actions and potentially traditional JWTs for session management.

#### 7.1. Agent Creation & Management (Creator Focused)

*   **`POST /api/agents`**
    *   **Purpose:** Create a new AI agent.
    *   **Request Payload:** `{"name": "string", "description": "string", "baseModel": "string", "creatorAddress": "address"}`
    *   **Response:** `{"id": "uuid", "name": "string", ...}` (Agent details)
    *   **Auth:** Creator signature.
*   **`GET /api/agents/{id}`**
    *   **Purpose:** Retrieve details of a specific agent.
    *   **Response:** `{"id": "uuid", "name": "string", ...}`
    *   **Auth:** Optional (public agent) / Creator signature (draft agent).
*   **`PUT /api/agents/{id}`**
    *   **Purpose:** Update agent basic information, behavior, or monetization settings.
    *   **Request Payload:** `{"name": "string", "description": "string", ...}` (partial updates)
    *   **Response:** `{"id": "uuid", "name": "string", ...}` (Updated agent details)
    *   **Auth:** Creator signature.
*   **`DELETE /api/agents/{id}`**
    *   **Purpose:** Delete an agent.
    *   **Auth:** Creator signature.
*   **`POST /api/agents/{id}/publish`**
    *   **Purpose:** Publish an agent to the marketplace.
    *   **Response:** `{"status": "published"}`
    *   **Auth:** Creator signature.
*   **`POST /api/agents/{id}/unpublish`**
    *   **Purpose:** Unpublish an agent from the marketplace.
    *   **Response:** `{"status": "draft"}`
    *   **Auth:** Creator signature.

#### 7.2. Knowledge Base Management

*   **`POST /api/agents/{id}/knowledge-base/upload`**
    *   **Purpose:** Upload a document to an agent's knowledge base.
    *   **Request Payload:** `multipart/form-data` with file.
    *   **Response:** `{"documentId": "uuid", "filename": "string", "status": "processing"}`
    *   **Auth:** Creator signature.
*   **`GET /api/agents/{id}/knowledge-base`**
    *   **Purpose:** List documents in an agent's knowledge base.
    *   **Response:** `[{"documentId": "uuid", "filename": "string", "uploadDate": "datetime", ...}]`
    *   **Auth:** Creator signature.
*   **`DELETE /api/agents/{id}/knowledge-base/{documentId}`**
    *   **Purpose:** Remove a document from an agent's knowledge base.
    *   **Auth:** Creator signature.

#### 7.3. Marketplace & Consumer Interaction

*   **`GET /api/marketplace/agents`**
    *   **Purpose:** Retrieve a list of published agents, with filtering and pagination.
    *   **Query Params:** `?category=string&priceMin=number&priceMax=number&search=string&sort=string&page=number&limit=number`
    *   **Response:** `{"agents": [{"id": "uuid", "name": "string", ...}], "total": number, "page": number}`
    *   **Auth:** None.
*   **`GET /api/marketplace/agents/{id}`**
    *   **Purpose:** Retrieve a single agent's public profile details.
    *   **Response:** `{"id": "uuid", "name": "string", "description": "string", "creator": "string", "tiers": [...], ...}`
    *   **Auth:** None.
*   **`POST /api/agents/{id}/chat`**
    *   **Purpose:** Send a message to an AI agent and receive a response.
    *   **Request Payload:** `{"message": "string", "sessionId": "uuid" (optional for continuing chat)}`
    *   **Response:** `{"response": "string", "usage": {"freeRemaining": number, "paidAccess": boolean}}`
    *   **Auth:** User session token (or Web3 wallet address for identification).
*   **`POST /api/payments/initiate`**
    *   **Purpose:** Initiate a crypto payment transaction for agent access.
    *   **Request Payload:** `{"agentId": "uuid", "tierId": "uuid", "userAddress": "address", "currency": "string", "amount": "string"}`
    *   **Response:** `{"transactionHash": "string", "status": "pending"}` (or details for Web3 wallet confirmation)
    *   **Auth:** User session token + Web3 wallet signature.
*   **`GET /api/payments/{transactionHash}/status`**
    *   **Purpose:** Check the status of a crypto payment.
    *   **Response:** `{"status": "pending"|"confirmed"|"failed"}`
    *   **Auth:** User session token.

#### 7.4. AI Games / Programmable Agents

*   **`GET /api/games`**
    *   **Purpose:** List available AI-powered games.
    *   **Response:** `[{"id": "uuid", "name": "string", "description": "string", "url": "string"}]`
    *   **Auth:** None.
*   **`GET /api/programmable-agents`**
    *   **Purpose:** List available programmable AI experiences.
    *   **Response:** `[{"id": "uuid", "name": "string", "description": "string", "url": "string"}]`
    *   **Auth:** None.

---

### 8. Database Structure (Developer Focus)

A relational database (e.g., PostgreSQL) is recommended for its ACID properties and strong consistency, which are crucial for financial transactions and user data. It will integrate with 0G services for specific functions (e.g., 0G Storage for actual document files, 0G Chain for transaction records).

#### 8.1. `Users` Table

*   `id` (PRIMARY KEY, UUID)
*   `wallet_address` (VARCHAR, UNIQUE, NOT NULL) - User's primary crypto wallet address.
*   `username` (VARCHAR, UNIQUE, NULLABLE)
*   `email` (VARCHAR, UNIQUE, NULLABLE) - For notifications (optional).
*   `created_at` (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
*   `updated_at` (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
*   **Indexing:** `wallet_address`

#### 8.2. `Agents` Table

*   `id` (PRIMARY KEY, UUID)
*   `creator_id` (UUID, FOREIGN KEY REFERENCES Users(id), NOT NULL)
*   `name` (VARCHAR, NOT NULL)
*   `description` (TEXT, NOT NULL)
*   `base_model` (VARCHAR, NOT NULL) - e.g., "Conversational", "Task-Oriented".
*   `status` (VARCHAR, NOT NULL) - e.g., "draft", "published", "archived".
*   `persona_description` (TEXT, NULLABLE)
*   `directives` (TEXT, NULLABLE) - JSON or plain text for agent rules.
*   `conversational_tone` (VARCHAR, NULLABLE)
*   `created_at` (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
*   `updated_at` (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
*   **Indexing:** `creator_id`, `status`

#### 8.3. `KnowledgeBaseDocuments` Table

*   `id` (PRIMARY KEY, UUID)
*   `agent_id` (UUID, FOREIGN KEY REFERENCES Agents(id) ON DELETE CASCADE, NOT NULL)
*   `filename` (VARCHAR, NOT NULL)
*   `storage_path` (VARCHAR, NOT NULL) - Path to document in 0G Storage or other decentralized storage.
*   `file_type` (VARCHAR, NOT NULL) - e.g., "pdf", "txt".
*   `upload_date` (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
*   `processed_status` (VARCHAR, NOT NULL) - e.g., "pending", "completed", "failed".
*   **Indexing:** `agent_id`

#### 8.4. `AccessTiers` Table

*   `id` (PRIMARY KEY, UUID)
*   `agent_id` (UUID, FOREIGN KEY REFERENCES Agents(id) ON DELETE CASCADE, NOT NULL)
*   `name` (VARCHAR, NOT NULL) - e.g., "Free Preview", "Standard".
*   `description` (TEXT, NULLABLE)
*   `price_model` (VARCHAR, NOT NULL) - e.g., "per_query", "monthly_subscription", "one_time".
*   `currency` (VARCHAR, NOT NULL) - e.g., "USDC".
*   `amount` (DECIMAL(18, 6), NOT NULL) - Price in crypto.
*   `usage_limits` (JSONB, NULLABLE) - e.g., `{"queries_per_day": 5}`.
*   **Constraints:** (agent_id, name) UNIQUE
*   **Indexing:** `agent_id`

#### 8.5. `UserAgentAccess` Table

*   `id` (PRIMARY KEY, UUID)
*   `user_id` (UUID, FOREIGN KEY REFERENCES Users(id), NOT NULL)
*   `agent_id` (UUID, FOREIGN KEY REFERENCES Agents(id), NOT NULL)
*   `tier_id` (UUID, FOREIGN KEY REFERENCES AccessTiers(id), NOT NULL)
*   `start_date` (TIMESTAMP, NOT NULL)
*   `end_date` (TIMESTAMP, NULLABLE) - For subscriptions, null for one-time or free.
*   `current_usage` (JSONB, NULLABLE) - e.g., `{"queries_today": 3}`.
*   **Indexing:** `user_id`, `agent_id`
*   **Constraints:** (user_id, agent_id) UNIQUE (to ensure one active access per user per agent)

#### 8.6. `Transactions` Table

*   `id` (PRIMARY KEY, UUID)
*   `user_id` (UUID, FOREIGN KEY REFERENCES Users(id), NOT NULL)
*   `agent_id` (UUID, FOREIGN KEY REFERENCES Agents(id), NOT NULL)
*   `tier_id` (UUID, FOREIGN KEY REFERENCES AccessTiers(id), NOT NULL)
*   `transaction_hash` (VARCHAR, UNIQUE, NOT NULL) - On-chain transaction ID.
*   `amount` (DECIMAL(18, 6), NOT NULL)
*   `currency` (VARCHAR, NOT NULL)
*   `status` (VARCHAR, NOT NULL) - e.g., "pending", "confirmed", "failed".
*   `transaction_date` (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
*   **Indexing:** `transaction_hash`, `user_id`, `agent_id`

#### 8.7. `AgentInteractions` Table (for analytics and history)

*   `id` (PRIMARY KEY, UUID)
*   `user_id` (UUID, FOREIGN KEY REFERENCES Users(id), NOT NULL)
*   `agent_id` (UUID, FOREIGN KEY REFERENCES Agents(id), NOT NULL)
*   `message_content` (TEXT, NOT NULL)
*   `response_content` (TEXT, NOT NULL)
*   `interaction_timestamp` (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
*   `is_paid_interaction` (BOOLEAN, NOT NULL)
*   **Indexing:** `user_id`, `agent_id`, `interaction_timestamp`

#### 8.8. `AIGames` Table (for the games section)

*   `id` (PRIMARY KEY, UUID)
*   `name` (VARCHAR, NOT NULL)
*   `description` (TEXT, NOT NULL)
*   `launch_url` (VARCHAR, NOT NULL)
*   `creator_id` (UUID, FOREIGN KEY REFERENCES Users(id), NULLABLE) - If user-created games.
*   **Indexing:** `name`

---

### 9. System Design/Architecture (Developer Focus)

The system will follow a modular, decentralized-first architecture, leveraging the 0G platform's services.

*   **Frontend (Client-side):**
    *   **Framework:** React/Next.js (as suggested earlier, excellent for performant full-stack apps).
    *   **Functionality:** User interface, client-side routing, state management, Web3 wallet integration (e.g., Wagmi, Ethers.js).
    *   **Deployment:** Static site hosting or serverless functions (for Next.js server-side rendering).

*   **Backend (Server-side / API Gateway):**
    *   **Framework:** Node.js with Express/NestJS, or Python with FastAPI/Django (our team suggests Node.js for consistency with frontend ecosystem).
    *   **Functionality:** Handles API requests, user authentication (Web2 + Web3), orchestration of 0G services, database interactions, payment processing logic, rate limiting, and security.
    *   **Deployment:** Serverless functions (e.g., Vercel, AWS Lambda) or containerized services (e.g., Docker on Kubernetes).

*   **AI Agent Runtime & Orchestration:**
    *   **Leveraging 0G Compute:** For running AI inference for agent responses. When a user queries an agent, the backend sends the prompt and knowledge base context to 0G Compute.
    *   **Knowledge Base Processing:** Uploaded documents will be processed (parsed, chunked, embedded) and indexed. This processing might occur in a separate microservice or as a background job, potentially using 0G Compute for heavy processing tasks.
    *   **Vector Database:** A dedicated vector database (e.g., Pinecone, Weaviate, or potentially a decentralized solution if available via 0G) to store embeddings of knowledge base documents for efficient retrieval.

*   **Data Storage:**
    *   **Relational Database:** PostgreSQL (as detailed above) for structured data (users, agents, tiers, transactions).
    *   **0G Storage:** For actual large knowledge base documents (PDFs, reports) themselves. This ensures decentralized, secure, and cost-effective storage for critical AI datasets.
    *   **0G Data Availability (DA):** Could be used for ensuring high-throughput, real-time access to critical data, possibly for real-time agent updates or shared game state.

*   **Blockchain Integration (0G Chain):**
    *   **Payments:** All payments for agent access will be handled via smart contracts deployed on the 0G Chain (EVM-compatible). Users will authorize transactions with their Web3 wallets.
    *   **Creator Earnings:** Smart contracts will manage the distribution of earnings to creators, potentially with a platform fee.
    *   **Access Control:** Access to paid agent features could be token-gated or controlled by smart contract state, verified by the backend.
    *   **Auditability:** Transaction records on 0G Chain provide transparency and auditability for all financial movements.

*   **Scalability:**
    *   Leverage serverless functions for the backend API for automatic scaling.
    *   0G Compute provides scalable AI inference capabilities.
    *   0G Storage for massive data handling.
    *   Proper indexing in the relational database.

*   **Security:**
    *   Robust authentication (Web3 signatures, JWTs).
    *   Input validation and sanitization.
    *   Protection against common web vulnerabilities (OWASP Top 10).
    *   Secure storage of sensitive data (if any).
    *   Smart contract audits for payment and earning distribution.

*   **Deployment Strategy:**
    *   Frontend and backend APIs deployed as serverless functions (e.g., Vercel for frontend, AWS Lambda/Google Cloud Functions for backend).
    *   Blockchain smart contracts deployed to 0G Chain testnet/mainnet.
    *   Integration with 0G Storage/Compute SDKs within backend services.

---

### 10. Technology Stack

*   **Frontend:**
    *   **Framework:** Next.js (React)
    *   **Language:** TypeScript
    *   **Styling:** Tailwind CSS (for utility-first, responsive design)
    *   **Web3 Integration:** Wagmi, Ethers.js
    *   **UI Components:** Shadcn/ui (for accessible and customizable components)
*   **Backend:**
    *   **Framework:** Node.js (NestJS or Express.js)
    *   **Language:** TypeScript
    *   **Database ORM:** Prisma or TypeORM
    *   **Authentication:** NextAuth.js (for Web2), custom Web3 signature verification
*   **Database:**
    *   **Primary Database:** PostgreSQL
    *   **Vector Database:** (e.g., Pinecone or a similar service/library for embeddings)
*   **Blockchain / Decentralized Services:**
    *   **Blockchain:** 0G Chain (EVM-compatible)
    *   **Decentralized Storage:** 0G Storage
    *   **Decentralized Compute:** 0G Compute
    *   **Data Availability:** 0G Data Availability (if real-time data streaming is needed)
*   **AI Models:**
    *   Integration with LLM APIs (e.g., OpenAI, Anthropic) or open-source models deployed via 0G Compute.

---

This PRD provides a comprehensive blueprint, filling in the necessary details based on your excellent initial inputs and our team's expertise. We've focused on creating a robust, scalable, and decentralized platform aligned with the 0G hackathon goals.

Please let us know if any part of this document is unclear or if you have further questions or refinements!