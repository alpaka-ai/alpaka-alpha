import { NextResponse } from "next/server"
import { getUser } from "@/lib/db/queries"

export async function GET() {
  try {
    const user = await getUser()
    return NextResponse.json(user)
  } catch (error) {
    console.error("Error getting user:", error)
    return NextResponse.json(null)
  }
}
