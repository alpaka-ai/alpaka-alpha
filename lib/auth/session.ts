import bcrypt from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import type { NewUser } from "@/lib/db/schema"

const key = new TextEncoder().encode(process.env.AUTH_SECRET || "alpaka-default-secret-key-for-development")
const SALT_ROUNDS = 10

export async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function comparePasswords(plainTextPassword: string, hashedPassword: string) {
  return bcrypt.compare(plainTextPassword, hashedPassword)
}

type SessionData = {
  user: { id: number }
  expires: string
}

export async function signToken(payload: SessionData) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7 days from now") // Extended from 1 day to 7 days
    .sign(key)
}

export async function verifyToken(input: string) {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    })
    return payload as SessionData
  } catch (error) {
    console.error("Token verification failed:", error)
    return null
  }
}

export async function getSession() {
  try {
    const session = (await cookies()).get("session")?.value
    if (!session) return null
    return await verifyToken(session)
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

export async function setSession(user: NewUser) {
  const expiresIn7Days = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  const session: SessionData = {
    user: { id: user.id! },
    expires: expiresIn7Days.toISOString(),
  }
  const encryptedSession = await signToken(session)
  ;(await cookies()).set("session", encryptedSession, {
    expires: expiresIn7Days,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  })
}

export async function clearSession() {
  ;(await cookies()).delete("session")
}
