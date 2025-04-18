// Client-safe authentication functions
import type { User } from "@/lib/db/schema"

// Function to get user data from API endpoint
export async function getUserForClient(): Promise<User | null> {
  try {
    const response = await fetch("/api/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error getting user:", error)
    return null
  }
}

// Client-safe sign out function
export async function signOutClient(): Promise<void> {
  try {
    await fetch("/api/auth/signout", {
      method: "POST",
      credentials: "include",
    })
    window.location.href = "/"
  } catch (error) {
    console.error("Error signing out:", error)
  }
}
