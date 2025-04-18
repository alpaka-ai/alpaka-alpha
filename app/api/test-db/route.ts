import { NextResponse } from "next/server"
import postgres from "postgres"

export async function GET() {
  try {
    // Create a simple postgres client for testing
    const sql = postgres(process.env.POSTGRES_URL!, {
      max: 1,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    })

    // Try a simple query
    const result = await sql`SELECT 1 as test`

    // Close the connection
    await sql.end()

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      result,
    })
  } catch (error: any) {
    console.error("Database connection test failed:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
        error: error.message || "Unknown error",
      },
      { status: 500 },
    )
  }
}
