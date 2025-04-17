import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { UserProvider } from "@/lib/auth"
import { getUser } from "@/lib/db/queries"

// Load font
const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    display: "swap",
})

export const metadata: Metadata = {
    title: "Alpaka - Carbon Emission Management for Real Estate",
    description: "Measure, trace, and reduce Scope 3 carbon emissions across your real estate supply chain.",
}

export const viewport: Viewport = {
    maximumScale: 1,
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    const userPromise = getUser()

    return (
        <html lang="en" className="bg-white dark:bg-gray-950 text-black dark:text-white">
        <body className={`min-h-[100dvh] bg-gray-50 ${plusJakartaSans.className}`}>
        <UserProvider userPromise={userPromise}>{children}</UserProvider>
        </body>
        </html>
    )
}
