import type React from "react"
import { getUser } from "@/lib/db/queries"
import { Providers } from "../providers"
import DashboardLayout from "./layout"

export default async function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch user data on the server
  let userPromise: Promise<any> = Promise.resolve(null)

  try {
    userPromise = getUser()
  } catch (error) {
    console.error("Error getting user:", error)
    userPromise = Promise.resolve(null)
  }

  return (
    <Providers userPromise={userPromise}>
      <DashboardLayout>{children}</DashboardLayout>
    </Providers>
  )
}
