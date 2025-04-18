import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth/session"
import { db } from "@/lib/db/drizzle"
import { users } from "@/lib/db/schema"
import { and, eq, isNull } from "drizzle-orm"

export async function GET() {
  try {
    const sessionCookie = cookies().get("session")
    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json(null)
    }

    const sessionData = await verifyToken(sessionCookie.value)
    if (!sessionData || !sessionData.user || typeof sessionData.user.id !== "number") {
      return NextResponse.json(null)
    }

    if (new Date(sessionData.expires) < new Date()) {
      return NextResponse.json(null)
    }

    const user = await db
      .select()
      .from(users)
      .where(and(eq(users.id, sessionData.user.id), isNull(users.deletedAt)))
      .limit(1)

    if (user.length === 0) {
      return NextResponse.json(null)
    }

    return NextResponse.json(user[0])
  } catch (error) {
    console.error("Error getting user:", error)
    return NextResponse.json(null)
  }
}
