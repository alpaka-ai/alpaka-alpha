import type React from "react"
import type { Metadata } from "next"
import { chauPhilomeneOne, notoSans } from "../fonts"

export const metadata: Metadata = {
  title: "Authentication - Alpaka",
  description: "Sign in or create an account to access your carbon emissions dashboard",
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className={`${chauPhilomeneOne.variable} ${notoSans.variable}`}>{children}</div>
}
