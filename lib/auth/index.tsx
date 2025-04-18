"use client"

import { createContext, useContext, type ReactNode, useState, useEffect } from "react"
import type { User } from "@/lib/db/schema"

type UserContextType = {
  userPromise: Promise<User | null>
  loading: boolean
  fetchUser: () => Promise<User | null>
}

const UserContext = createContext<UserContextType | null>(null)

export function useUser(): UserContextType {
  const context = useContext(UserContext)
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

export function UserProvider({
  children,
  userPromise: initialUserPromise,
}: {
  children: ReactNode
  userPromise?: Promise<User | null>
}) {
  const [loading, setLoading] = useState(true)
  const [userPromise, setUserPromise] = useState<Promise<User | null>>(initialUserPromise || Promise.resolve(null))

  const fetchUser = async () => {
    try {
      // Only fetch user on the client side
      if (typeof window !== "undefined") {
        const response = await fetch("/api/user")
        if (response.ok) {
          const userData = await response.json()
          const newPromise = Promise.resolve(userData)
          setUserPromise(newPromise)
          return userData
        }
      }
      const nullPromise = Promise.resolve(null)
      setUserPromise(nullPromise)
      return null
    } catch (error) {
      console.error("Error fetching user:", error)
      const nullPromise = Promise.resolve(null)
      setUserPromise(nullPromise)
      return null
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!initialUserPromise) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [initialUserPromise])

  return <UserContext.Provider value={{ userPromise, loading, fetchUser }}>{children}</UserContext.Provider>
}
