import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// Check for required environment variables
if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL environment variable is not set")
}

// Create a postgres connection with minimal configuration
// This approach should avoid the "t.on is not a function" error
const sql = postgres(process.env.POSTGRES_URL, {
  max: 1, // Use a single connection to avoid pool issues
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Create the drizzle ORM instance
export const db = drizzle(sql, { schema })
