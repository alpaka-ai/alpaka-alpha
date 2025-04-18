import type React from "react"
import type { Metadata } from "next"
import { chauPhilomeneOne, notoSans } from "./fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "Alpaka - Carbon Emission Management",
  description: "Measure, trace, and reduce carbon emissions across your real estate portfolio",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.svg",
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
      <body className={notoSans.className}>{children}</body>
    </html>
  )
}
