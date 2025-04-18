import type React from "react"
import { getUser } from "@/lib/db/queries"
import { Providers } from "../providers"
import DashboardLayout from "./layout"
import { redirect } from "next/navigation"

export default async function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch user data on the server
  let user = null

  try {
    user = await getUser()

    // If no user is found, redirect to sign-in
    if (!user) {
      redirect("/sign-in")
    }

    // Create a promise that resolves to the user
    const userPromise = Promise.resolve(user)

    return (
      <Providers userPromise={userPromise}>
        <DashboardLayout>{children}</DashboardLayout>
      </Providers>
    )
  } catch (error) {
    console.error("Error getting user:", error)
    redirect("/sign-in")
  }
}
