"use client"

import type React from "react"

import Link from "next/link"
import { use, useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Home, LogOut, BarChart2, Users, Target, Lightbulb, Menu, X, Settings, Shield, Activity } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@/lib/auth/index"
import { signOut } from "@/app/(login)/actions"
import { useRouter, usePathname } from "next/navigation"

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
    return (
      <>
        <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-gray-900">
          Pricing
        </Link>
        <Button asChild className="rounded-full">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </>
    )
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer h-9 w-9">
          <AvatarImage alt={user.name || ""} />
          <AvatarFallback>
            {user.email
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
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
    <aside className="hidden md:flex flex-col w-64 bg-[#FEFAE0] border-r border-gray-200 h-screen">
      <div className="p-4">
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
          href="/dashboard/emissions"
          className={`flex items-center px-3 py-2 rounded-md ${
            isActive("/dashboard/emissions") ? "bg-[#606C38] text-white" : "text-gray-700 hover:bg-[#606C38]/10"
          }`}
        >
          <BarChart2 className="mr-3 h-5 w-5" />
          <span>Emissions</span>
        </Link>
        <Link
          href="/dashboard/targets"
          className={`flex items-center px-3 py-2 rounded-md ${
            isActive("/dashboard/targets") ? "bg-[#606C38] text-white" : "text-gray-700 hover:bg-[#606C38]/10"
          }`}
        >
          <Target className="mr-3 h-5 w-5" />
          <span>Reduction Targets</span>
        </Link>
        <Link
          href="/dashboard/initiatives"
          className={`flex items-center px-3 py-2 rounded-md ${
            isActive("/dashboard/initiatives") ? "bg-[#606C38] text-white" : "text-gray-700 hover:bg-[#606C38]/10"
          }`}
        >
          <Lightbulb className="mr-3 h-5 w-5" />
          <span>Initiatives</span>
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
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-end items-center">
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
          <Suspense fallback={<div className="h-9" />}>
            <UserMenu />
          </Suspense>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
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
              href="/dashboard/emissions"
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive("/dashboard/emissions") ? "bg-[#606C38] text-white" : "text-gray-700 hover:bg-[#606C38]/10"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BarChart2 className="mr-3 h-5 w-5" />
              <span>Emissions</span>
            </Link>
            <Link
              href="/dashboard/targets"
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive("/dashboard/targets") ? "bg-[#606C38] text-white" : "text-gray-700 hover:bg-[#606C38]/10"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Target className="mr-3 h-5 w-5" />
              <span>Reduction Targets</span>
            </Link>
            <Link
              href="/dashboard/initiatives"
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive("/dashboard/initiatives") ? "bg-[#606C38] text-white" : "text-gray-700 hover:bg-[#606C38]/10"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Lightbulb className="mr-3 h-5 w-5" />
              <span>Initiatives</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="md:hidden">
        <Header />
      </div>
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="hidden md:block">
            <Header />
          </div>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
