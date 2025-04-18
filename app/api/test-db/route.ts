import { NextResponse } from "next/server"
import { testConnection } from "@/lib/db/drizzle"

export async function GET() {
  try {
    console.log("Testing database connection...")
    const result = await testConnection()

    if (result.success) {
      console.log("Database connection successful:", result.result)
      return NextResponse.json({
        success: true,
        message: "Database connection successful",
        result: result.result,
      })
    } else {
      console.error("Database connection failed:", result.error)
      return NextResponse.json(
        {
          success: false,
          message: "Database connection failed",
          error: result.error || "Unknown error",
          stack: result.stack,
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("Database connection test failed:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
        error: error.message || "Unknown error",
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}
