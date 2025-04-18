import type React from "react"
import { getUser } from "@/lib/db/queries"
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

  return <DashboardLayout userPromise={userPromise}>{children}</DashboardLayout>
}
