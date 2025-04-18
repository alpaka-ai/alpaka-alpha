"use client"

import type React from "react"

import { UserProvider } from "@/lib/auth/index"

export function Providers({ children, userPromise }: { children: React.ReactNode; userPromise: Promise<any> }) {
  return <UserProvider userPromise={userPromise}>{children}</UserProvider>
}
