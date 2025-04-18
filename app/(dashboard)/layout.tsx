"use client"

import type React from "react"

import Link from "next/link"
import { use, useState, Suspense } from "react"
import {
  Home,
  LogOut,
  MessageSquare,
  Lightbulb,
  Menu,
  X,
  Settings,
  Shield,
  Activity,
  Users,
  ClipboardList,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@/lib/auth/index"
import { signOut } from "@/app/(login)/actions"
import { useRouter, usePathname } from "next/navigation"
import { CustomAvatar } from "@/components/ui/custom-avatar"

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { userPromise } = useUser()
  const user = use(userPromise)
  const router = useRouter()

  async function handleSignOut() {
    await signOut()
    router.refresh()
    router.push("/")
  }

  if (!user) {
    return null
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <CustomAvatar name={user?.name || ""} email={user?.email || ""} size="md" showLeafIcon={true} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-medium">{user.name || "User"}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/dashboard" className="flex w-full items-center">
              <Home className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/dashboard/team" className="flex w-full items-center">
              <Users className="mr-2 h-4 w-4" />
              <span>Team</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/dashboard/general" className="flex w-full items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>General</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/dashboard/activity" className="flex w-full items-center">
              <Activity className="mr-2 h-4 w-4" />
              <span>Activity</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/dashboard/security" className="flex w-full items-center">
              <Shield className="mr-2 h-4 w-4" />
              <span>Security</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <form action={handleSignOut} className="w-full">
          <button type="submit" className="flex w-full">
            <DropdownMenuItem className="w-full flex-1 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#FEFAE0] border-r border-gray-200 h-screen fixed left-0 top-0">
      <div className="p-4 flex justify-center">
        <Link href="/dashboard" className="flex items-center">
          <span className="text-xl font-bold text-[#606C38] font-heading">Alpaka</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        <Link
          href="/dashboard"
          className={`flex items-center px-3 py-2 rounded-md ${
            isActive("/dashboard") &&
            !pathname.includes("/dashboard/general") &&
            !pathname.includes("/dashboard/activity") &&
            !pathname.includes("/dashboard/security") &&
            !pathname.includes("/dashboard/team")
              ? "bg-[#606C38] text-white"
              : "text-gray-700 hover:bg-[#606C38]/10"
          }`}
        >
          <Home className="mr-3 h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/dashboard/vendors"
          className={`flex items-center px-3 py-2 rounded-md ${
            isActive("/dashboard/vendors") ? "bg-[#606C38] text-white" : "text-gray-700 hover:bg-[#606C38]/10"
          }`}
        >
          <Users className="mr-3 h-5 w-5" />
          <span>Vendors</span>
        </Link>
        <Link
          href="/dashboard/reduction-opportunities"
          className={`flex items-center px-3 py-2 rounded-md ${
            isActive("/dashboard/reduction-opportunities")
              ? "bg-[#606C38] text-white"
              : "text-gray-700 hover:bg-[#606C38]/10"
          }`}
        >
          <Lightbulb className="mr-3 h-5 w-5" />
          <span>Reduction Opportunities</span>
        </Link>
        <Link
          href="/dashboard/project-executions"
          className={`flex items-center px-3 py-2 rounded-md ${
            isActive("/dashboard/project-executions")
              ? "bg-[#606C38] text-white"
              : "text-gray-700 hover:bg-[#606C38]/10"
          }`}
        >
          <ClipboardList className="mr-3 h-5 w-5" />
          <span>Project Executions</span>
        </Link>
        <Link
          href="/dashboard/vendor-engagements"
          className={`flex items-center px-3 py-2 rounded-md ${
            isActive("/dashboard/vendor-engagements")
              ? "bg-[#606C38] text-white"
              : "text-gray-700 hover:bg-[#606C38]/10"
          }`}
        >
          <MessageSquare className="mr-3 h-5 w-5" />
          <span>Vendor Engagements</span>
        </Link>
      </nav>
    </aside>
  )
}

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <header className="border-b border-gray-200 bg-white fixed top-0 right-0 left-0 md:left-64 z-10 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
        <div className="md:hidden">
          <Link href="/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-[#606C38] font-heading">Alpaka</span>
          </Link>
        </div>
        <div className="flex items-center">
          <button
            className="md:hidden mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <Suspense fallback={<div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse" />}>
            <UserMenu />
          </Suspense>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 absolute w-full bg-white shadow-lg">
          <nav className="flex flex-col p-4 space-y-2">
            <Link
              href="/dashboard"
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive("/dashboard") &&
                !pathname.includes("/dashboard/general") &&
                !pathname.includes("/dashboard/activity") &&
                !pathname.includes("/dashboard/security") &&
                !pathname.includes("/dashboard/team")
                  ? "bg-[#606C38] text-white"
                  : "text-gray-700 hover:bg-[#606C38]/10"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="mr-3 h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/vendors"
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive("/dashboard/vendors") ? "bg-[#606C38] text-white" : "text-gray-700 hover:bg-[#606C38]/10"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Users className="mr-3 h-5 w-5" />
              <span>Vendors</span>
            </Link>
            <Link
              href="/dashboard/reduction-opportunities"
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive("/dashboard/reduction-opportunities")
                  ? "bg-[#606C38] text-white"
                  : "text-gray-700 hover:bg-[#606C38]/10"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Lightbulb className="mr-3 h-5 w-5" />
              <span>Reduction Opportunities</span>
            </Link>
            <Link
              href="/dashboard/project-executions"
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive("/dashboard/project-executions")
                  ? "bg-[#606C38] text-white"
                  : "text-gray-700 hover:bg-[#606C38]/10"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ClipboardList className="mr-3 h-5 w-5" />
              <span>Project Executions</span>
            </Link>
            <Link
              href="/dashboard/vendor-engagements"
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive("/dashboard/vendor-engagements")
                  ? "bg-[#606C38] text-white"
                  : "text-gray-700 hover:bg-[#606C38]/10"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MessageSquare className="mr-3 h-5 w-5" />
              <span>Vendor Engagements</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Header />
        <main className="pt-16 p-6">{children}</main>
      </div>
    </div>
  )
}
