"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { User } from "../db/schema"

type UserContextType = {
  userPromise: Promise<User | null>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({
  children,
  userPromise,
}: {
  children: ReactNode
  userPromise: Promise<User | null>
}) {
  return <UserContext.Provider value={{ userPromise }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
