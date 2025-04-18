import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    cookies().delete("session")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error signing out:", error)
    return NextResponse.json({ success: false, error: "Failed to sign out" }, { status: 500 })
  }
}
