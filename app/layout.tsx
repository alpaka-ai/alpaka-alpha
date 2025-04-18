import type React from "react"
import type { Metadata } from "next"
import { chauPhilomeneOne, notoSans } from "./fonts"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Alpaka - Carbon Emission Management",
  description: "Measure, trace, and reduce carbon emissions across your real estate portfolio",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.svg",
  },
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Wrap the database call in a try/catch to handle potential errors
  let userPromise: Promise<any> = Promise.resolve(null)

  try {
    // Import getUser dynamically to avoid initialization issues
    const { getUser } = await import("@/lib/db/queries")
    userPromise = getUser()
  } catch (error) {
    console.error("Error getting user:", error)
    // Return a promise that resolves to null in case of error
    userPromise = Promise.resolve(null)
  }

  return (
    <html lang="en" className={`${chauPhilomeneOne.variable} ${notoSans.variable}`}>
      <body className={notoSans.className}>
        <Providers userPromise={userPromise}>{children}</Providers>
      </body>
    </html>
  )
}
