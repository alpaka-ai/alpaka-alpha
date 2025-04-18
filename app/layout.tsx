import type React from "react"
import type { Metadata } from "next"
import { chauPhilomeneOne, notoSans } from "./fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "Alpaka - Carbon Emission Management",
  description: "Measure, trace, and reduce carbon emissions across your real estate portfolio",
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
    apple: null,
    other: null,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${chauPhilomeneOne.variable} ${notoSans.variable}`}>
      <head>
        {/* Force favicon refresh by adding a version parameter */}
        <link rel="icon" href="/favicon.ico?v=2" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" type="image/x-icon" />
      </head>
      <body className={notoSans.className}>
        <div className="flex flex-col min-h-screen">{children}</div>
      </body>
    </html>
  )
}
