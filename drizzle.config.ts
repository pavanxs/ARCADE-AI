import type { Config } from "drizzle-kit";

export default {
  dialect: "sqlite",
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "./sqlite.db",
  },
} satisfies Config;
