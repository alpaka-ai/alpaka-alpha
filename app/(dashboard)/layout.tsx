"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Users,
  Settings,
  Shield,
  Activity,
  Home,
  Lightbulb,
  ClipboardList,
  MessageSquare,
  BarChart3,
} from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Main navigation items
  const mainNavItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/vendors", icon: Users, label: "Vendors" },
    { href: "/dashboard/emissions", icon: BarChart3, label: "Emissions" },
    { href: "/dashboard/reduction-opportunities", icon: Lightbulb, label: "Reduction Opportunities" },
    { href: "/dashboard/project-executions", icon: ClipboardList, label: "Project Executions" },
    { href: "/dashboard/vendor-engagements", icon: MessageSquare, label: "Vendor Engagements" },
  ]

  // Settings navigation items
  const settingsNavItems = [
    { href: "/dashboard/team", icon: Users, label: "Team" },
    { href: "/dashboard/general", icon: Settings, label: "General" },
    { href: "/dashboard/activity", icon: Activity, label: "Activity" },
    { href: "/dashboard/security", icon: Shield, label: "Security" },
  ]

  // Determine if we're on a settings page
  const isSettingsPage =
    pathname.includes("/dashboard/team") ||
    pathname.includes("/dashboard/general") ||
    pathname.includes("/dashboard/activity") ||
    pathname.includes("/dashboard/security")

  // Choose which navigation items to display
  const navItems = isSettingsPage ? settingsNavItems : mainNavItems

  return (
    <div className="flex h-[calc(100vh-68px)]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#FEFAE0] border-r border-gray-200 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {/* Main Navigation Section */}
          <div className="mb-6">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Main</h3>
            {mainNavItems.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={`w-full justify-start ${
                    pathname === item.href
                      ? "bg-[#606C38] text-white hover:bg-[#606C38]/90"
                      : "text-gray-700 hover:bg-[#606C38]/10"
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Settings Navigation Section */}
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Settings</h3>
            {settingsNavItems.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={`w-full justify-start ${
                    pathname === item.href
                      ? "bg-[#606C38] text-white hover:bg-[#606C38]/90"
                      : "text-gray-700 hover:bg-[#606C38]/10"
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  )
}
