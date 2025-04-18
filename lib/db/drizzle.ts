import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// Next.js automatically loads environment variables, so we don't need dotenv

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL environment variable is not set")
}

export const client = postgres(process.env.POSTGRES_URL)
export const db = drizzle(client, { schema })

export const executeQuery = async (cb: any) => {
  try {
    return await cb(db)
  } catch (error: any) {
    console.error("db error", error)
    throw error
  }
}

export const testConnection = async () => {
  try {
    const result = await executeQuery(async (db: any) => {
      const res = await db.execute(postgres`SELECT 1`)
      return res
    })
    return { success: true, result: result }
  } catch (error: any) {
    console.error("Database connection test failed:", error)
    return { success: false, error: error.message, stack: error.stack }
  }
}
