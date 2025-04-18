"use client"

import type React from "react"

import { createContext, useContext } from "react"

type UserContextType = {
  userPromise: Promise<any>
}

const UserContext = createContext<UserContextType>({
  userPromise: Promise.resolve(null),
})

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children, userPromise }: { children: React.ReactNode; userPromise: Promise<any> }) {
  return <UserContext.Provider value={{ userPromise }}>{children}</UserContext.Provider>
}
