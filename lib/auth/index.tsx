"use client"

import type React from "react"

import { createContext, useContext, useState, useCallback, cache } from "react"
import type { User } from "@/lib/db/schema"

// Create a context for the user
const UserContext = createContext<{
  userPromise: Promise<User | null>
  refreshUser: () => void
}>({
  userPromise: Promise.resolve(null),
  refreshUser: () => {},
})

// Cache the fetch function to avoid duplicate requests
const fetchUser = cache(() =>
  fetch("/api/user").then((res) => {
    if (!res.ok) return null
    return res.json()
  }),
)

// Provider component that wraps your app and makes user object available to any
// child component that calls useUser().
export function UserProvider({
  children,
  userPromise,
}: {
  children: React.ReactNode
  userPromise: Promise<User | null>
}) {
  const [promise, setPromise] = useState<Promise<User | null>>(userPromise)

  // Function to refresh the user data
  const refreshUser = useCallback(() => {
    setPromise(fetchUser())
  }, [])

  return <UserContext.Provider value={{ userPromise: promise, refreshUser }}>{children}</UserContext.Provider>
}

// Hook for components to get the user object and refresh function
export function useUser() {
  return useContext(UserContext)
}
