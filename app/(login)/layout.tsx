import type React from "react"
import type { Metadata } from "next"
import { chauPhilomeneOne, notoSans } from "../fonts"
import { Providers } from "../providers"
import { getUser } from "@/lib/db/queries"

export const metadata: Metadata = {
  title: "Authentication - Alpaka",
  description: "Sign in or create an account to access your carbon emissions dashboard",
}

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Wrap the database call in a try/catch to handle potential errors
  let userPromise: Promise<any> = Promise.resolve(null)

  try {
    userPromise = getUser()
  } catch (error) {
    console.error("Error getting user:", error)
    userPromise = Promise.resolve(null)
  }

  return (
    <div className={`${chauPhilomeneOne.variable} ${notoSans.variable}`}>
      <Providers userPromise={userPromise}>{children}</Providers>
    </div>
  )
}
