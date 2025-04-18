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

// Get or create the postgres client with better error handling
export function getClient() {
  if (!_client && process.env.POSTGRES_URL) {
    try {
      // Add more options for better stability
      _client = postgres(process.env.POSTGRES_URL, {
        prepare: false, // Disable prepared statements for better compatibility
        max: 10, // Limit the connection pool size
        idle_timeout: 20, // Close idle connections after 20 seconds
        connect_timeout: 10, // Connection timeout after 10 seconds
        ssl: process.env.NODE_ENV !== "development" ? { rejectUnauthorized: false } : undefined,
      })
    } catch (error) {
      console.error("Failed to create postgres client:", error)
      // Return null instead of throwing to allow graceful degradation
      return null
    }
  }
  return _client
}

// Get or create the drizzle instance with better error handling
export function getDrizzle() {
  if (!_db) {
    const client = getClient()
    if (client) {
      try {
        _db = drizzle(client, { schema })
      } catch (error) {
        console.error("Failed to create drizzle instance:", error)
        return null
      }
    }
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
