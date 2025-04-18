"use client"

import type { ReactNode } from "react"
import { UserProvider } from "@/lib/auth/index"
import type { User } from "@/lib/db/schema"

export function Providers({
  children,
  userPromise,
}: {
  children: ReactNode
  userPromise?: Promise<User | null>
}) {
  return <UserProvider userPromise={userPromise}>{children}</UserProvider>
}
