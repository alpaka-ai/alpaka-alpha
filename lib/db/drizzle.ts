import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// Check for POSTGRES_URL without relying on dotenv
if (!process.env.POSTGRES_URL) {
  console.warn("Warning: POSTGRES_URL environment variable is not set")
}

// Create a singleton pattern for the database connection
let _client: ReturnType<typeof postgres> | null = null
let _db: ReturnType<typeof drizzle> | null = null

// Get or create the postgres client
export function getClient() {
  if (!_client && process.env.POSTGRES_URL) {
    try {
      _client = postgres(process.env.POSTGRES_URL, {
        prepare: false, // Disable prepared statements for better compatibility
      })
    } catch (error) {
      console.error("Failed to create postgres client:", error)
    }
  }
  return _client
}

// Get or create the drizzle instance
export function getDrizzle() {
  if (!_db && getClient()) {
    _db = drizzle(getClient()!, { schema })
  }
  return _db
}

// For backward compatibility
export const client = getClient()
export const db = getDrizzle()

export const executeQuery = async (cb: any) => {
  try {
    const database = getDrizzle()
    if (!database) {
      throw new Error("Database connection not available")
    }
    return await cb(database)
  } catch (error: any) {
    console.error("QUERY FAILED: ", error)
    throw error
  }
}

export const testConnection = async () => {
  try {
    const pgClient = getClient()
    if (!pgClient) {
      throw new Error("Database client not available")
    }

    const result = await pgClient`SELECT 1 as test`
    return { success: true, result }
  } catch (error: any) {
    console.error("Database connection test failed:", error)
    return {
      success: false,
      error: error.message,
      stack: error.stack,
    }
  }
}
