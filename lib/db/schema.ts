import { relations } from "drizzle-orm";
import { sqliteTable, text, integer, real, blob } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

// Users table
export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  walletAddress: text("wallet_address").unique().notNull(),
  username: text("username").unique(),
  email: text("email").unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Agents table
export const agents = sqliteTable("agents", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  creatorId: text("creator_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  baseModel: text("base_model").notNull(), // "conversational", "task-oriented"
  status: text("status").notNull().default("draft"), // "draft", "published", "archived"
  personaDescription: text("persona_description"),
  directives: text("directives"), // JSON string for agent rules
  conversationalTone: text("conversational_tone"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Knowledge Base Documents table
export const knowledgeBaseDocuments = sqliteTable("knowledge_base_documents", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  agentId: text("agent_id").references(() => agents.id, { onDelete: "cascade" }).notNull(),
  filename: text("filename").notNull(),
  storagePath: text("storage_path").notNull(), // Path to document in 0G Storage
  fileType: text("file_type").notNull(), // "pdf", "txt", etc.
  uploadDate: integer("upload_date", { mode: "timestamp" }).$defaultFn(() => new Date()),
  processedStatus: text("processed_status").notNull().default("pending"), // "pending", "completed", "failed"
});

// Access Tiers table
export const accessTiers = sqliteTable("access_tiers", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  agentId: text("agent_id").references(() => agents.id, { onDelete: "cascade" }).notNull(),
  name: text("name").notNull(), // "Free Preview", "Standard"
  description: text("description"),
  priceModel: text("price_model").notNull(), // "per_query", "monthly_subscription", "one_time"
  currency: text("currency").notNull(), // "USDC"
  amount: real("amount").notNull(), // Price in crypto
  usageLimits: text("usage_limits"), // JSON string for limits
});

// User Agent Access table
export const userAgentAccess = sqliteTable("user_agent_access", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  userId: text("user_id").references(() => users.id).notNull(),
  agentId: text("agent_id").references(() => agents.id).notNull(),
  tierId: text("tier_id").references(() => accessTiers.id).notNull(),
  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  endDate: integer("end_date", { mode: "timestamp" }), // null for one-time or free
  currentUsage: text("current_usage"), // JSON string for usage tracking
});

// Transactions table
export const transactions = sqliteTable("transactions", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  userId: text("user_id").references(() => users.id).notNull(),
  agentId: text("agent_id").references(() => agents.id).notNull(),
  tierId: text("tier_id").references(() => accessTiers.id).notNull(),
  transactionHash: text("transaction_hash").unique().notNull(),
  amount: real("amount").notNull(),
  currency: text("currency").notNull(),
  status: text("status").notNull(), // "pending", "confirmed", "failed"
  transactionDate: integer("transaction_date", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Agent Interactions table (for analytics)
export const agentInteractions = sqliteTable("agent_interactions", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  userId: text("user_id").references(() => users.id).notNull(),
  agentId: text("agent_id").references(() => agents.id).notNull(),
  messageContent: text("message_content").notNull(),
  responseContent: text("response_content").notNull(),
  interactionTimestamp: integer("interaction_timestamp", { mode: "timestamp" }).$defaultFn(() => new Date()),
  isPaidInteraction: integer("is_paid_interaction", { mode: "boolean" }).notNull(),
});

// AI Games table
export const aiGames = sqliteTable("ai_games", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  name: text("name").notNull(),
  description: text("description").notNull(),
  launchUrl: text("launch_url").notNull(),
  creatorId: text("creator_id").references(() => users.id),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  agents: many(agents),
  userAgentAccess: many(userAgentAccess),
  transactions: many(transactions),
  agentInteractions: many(agentInteractions),
  aiGames: many(aiGames),
}));

export const agentsRelations = relations(agents, ({ one, many }) => ({
  creator: one(users, {
    fields: [agents.creatorId],
    references: [users.id],
  }),
  knowledgeBaseDocuments: many(knowledgeBaseDocuments),
  accessTiers: many(accessTiers),
  userAgentAccess: many(userAgentAccess),
  transactions: many(transactions),
  agentInteractions: many(agentInteractions),
}));

export const knowledgeBaseDocumentsRelations = relations(knowledgeBaseDocuments, ({ one }) => ({
  agent: one(agents, {
    fields: [knowledgeBaseDocuments.agentId],
    references: [agents.id],
  }),
}));

export const accessTiersRelations = relations(accessTiers, ({ one, many }) => ({
  agent: one(agents, {
    fields: [accessTiers.agentId],
    references: [agents.id],
  }),
  userAgentAccess: many(userAgentAccess),
  transactions: many(transactions),
}));

export const userAgentAccessRelations = relations(userAgentAccess, ({ one }) => ({
  user: one(users, {
    fields: [userAgentAccess.userId],
    references: [users.id],
  }),
  agent: one(agents, {
    fields: [userAgentAccess.agentId],
    references: [agents.id],
  }),
  tier: one(accessTiers, {
    fields: [userAgentAccess.tierId],
    references: [accessTiers.id],
  }),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
  agent: one(agents, {
    fields: [transactions.agentId],
    references: [agents.id],
  }),
  tier: one(accessTiers, {
    fields: [transactions.tierId],
    references: [accessTiers.id],
  }),
}));

export const agentInteractionsRelations = relations(agentInteractions, ({ one }) => ({
  user: one(users, {
    fields: [agentInteractions.userId],
    references: [users.id],
  }),
  agent: one(agents, {
    fields: [agentInteractions.agentId],
    references: [agents.id],
  }),
}));

export const aiGamesRelations = relations(aiGames, ({ one }) => ({
  creator: one(users, {
    fields: [aiGames.creatorId],
    references: [users.id],
  }),
}));

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Agent = typeof agents.$inferSelect;
export type NewAgent = typeof agents.$inferInsert;
export type KnowledgeBaseDocument = typeof knowledgeBaseDocuments.$inferSelect;
export type NewKnowledgeBaseDocument = typeof knowledgeBaseDocuments.$inferInsert;
export type AccessTier = typeof accessTiers.$inferSelect;
export type NewAccessTier = typeof accessTiers.$inferInsert;
export type UserAgentAccess = typeof userAgentAccess.$inferSelect;
export type NewUserAgentAccess = typeof userAgentAccess.$inferInsert;
export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
export type AgentInteraction = typeof agentInteractions.$inferSelect;
export type NewAgentInteraction = typeof agentInteractions.$inferInsert;
export type AIGame = typeof aiGames.$inferSelect;
export type NewAIGame = typeof aiGames.$inferInsert;