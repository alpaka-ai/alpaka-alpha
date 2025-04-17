import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Chau_Philomene_One, Plus_Jakarta_Sans } from "next/font/google"
import { UserProvider } from "@/lib/auth"
import { getUser } from "@/lib/db/queries"

export const metadata: Metadata = {
    title: "Alpaka - Carbon Emission Management for Real Estate",
    description: "Measure, trace, and reduce Scope 3 carbon emissions across your real estate supply chain.",
}

export const viewport: Viewport = {
    maximumScale: 1,
}

const chauPhilomeneOne = Chau_Philomene_One({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-chau-philomene-one",
})

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta-sans",
})

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    const userPromise = getUser()

    return (
        <html
            lang="en"
            className={`bg-white dark:bg-gray-950 text-black dark:text-white ${plusJakartaSans.variable} ${chauPhilomeneOne.variable}`}
        >
        <body className="min-h-[100dvh] bg-gray-50 font-sans">
        <UserProvider userPromise={userPromise}>{children}</UserProvider>
        </body>
        </html>
    )
}
