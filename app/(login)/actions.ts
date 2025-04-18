"use server"

import { z } from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db/drizzle"
import { users, teams, teamMembers } from "@/lib/db/schema"
import { setSession } from "@/lib/auth/session"
import { validatedAction } from "@/lib/auth/middleware"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { cookies } from "next/headers"

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  redirect: z.string().optional(),
  priceId: z.string().optional(),
})

export const signIn = validatedAction(signInSchema, async (data) => {
  const { email, password, redirect: redirectPath } = data

  try {
    // Find user by email
    const existingUsers = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1)
    const user = existingUsers[0]

    if (!user) {
      return {
        error: "Invalid email or password",
        email,
      }
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.passwordHash)
    if (!passwordMatch) {
      return {
        error: "Invalid email or password",
        email,
      }
    }

    // Set session
    await setSession({
      id: user.id,
      email: user.email,
      name: user.name || "",
    })

    // Redirect
    if (redirectPath) {
      redirect(redirectPath)
    } else {
      redirect("/dashboard")
    }
  } catch (error) {
    console.error("Sign in error:", error)
    return {
      error: "An error occurred during sign in. Please try again.",
      email,
    }
  }
})

const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  redirect: z.string().optional(),
  priceId: z.string().optional(),
  inviteId: z.string().optional(),
})

export const signUp = validatedAction(signUpSchema, async (data) => {
  const { email, password, redirect: redirectPath, priceId, inviteId } = data

  try {
    // Check if user already exists
    const existingUsers = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1)
    if (existingUsers.length > 0) {
      return {
        error: "Email already in use",
        email,
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user
    const [user] = await db
      .insert(users)
      .values({
        email: email.toLowerCase(),
        passwordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    // Create team
    const [team] = await db
      .insert(teams)
      .values({
        name: `${user.email.split("@")[0]}'s Team`,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    // Add user to team
    await db.insert(teamMembers).values({
      userId: user.id,
      teamId: team.id,
      role: "owner",
      joinedAt: new Date(),
    })

    // Set session
    await setSession(user)

    // Redirect
    if (redirectPath) {
      redirect(redirectPath)
    } else if (priceId) {
      redirect(`/checkout?priceId=${priceId}`)
    } else {
      redirect("/dashboard")
    }
  } catch (error) {
    console.error("Sign up error:", error)
    return {
      error: "An error occurred during sign up. Please try again.",
      email,
    }
  }
})

export async function signOut() {
  // Clear session cookie
  cookies().set("session", "", {
    expires: new Date(0),
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })
  redirect("/")
}
