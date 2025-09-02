import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { migrate } from "drizzle-orm/libsql/migrator";

const client = createClient({
  url: "file:sqlite.db",
});

const db = drizzle(client);

async function initDatabase() {
  try {
    console.log("Initializing database...");
    
    // Run migrations
    await migrate(db, { migrationsFolder: "./drizzle" });
    
    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

if (require.main === module) {
  initDatabase();
}

export { initDatabase };
