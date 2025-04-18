import type React from "react"
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This is a nested layout that should only handle the content area
  // and not interfere with the header or sidebar
  return <>{children}</>
}
