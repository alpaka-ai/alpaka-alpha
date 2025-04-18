import type React from "react"
import { getUser } from "@/lib/db/queries"
import { redirect } from "next/navigation"
import { UserMenu } from "./header"

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold text-[#606C38] font-heading hidden lg:block">Alpaka</span>
          </div>
          <div className="flex items-center space-x-4">
            <UserMenu user={user} />
          </div>
        </div>
      </header>
      {children}
    </>
  )
}
