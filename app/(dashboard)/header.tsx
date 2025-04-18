"use client"

import Link from "next/link"
import { useState } from "react"
import { LogOut, Settings, Shield, Activity, Users } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/app/(login)/actions"
import { useRouter } from "next/navigation"
import { CustomAvatar } from "@/components/ui/custom-avatar"
import type { User } from "@/lib/db/schema"

export function UserMenu({ user }: { user: User }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  async function handleSignOut() {
    await signOut()
    router.refresh()
    router.push("/")
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <CustomAvatar name={user.name || ""} email={user.email || ""} size="md" showLeafIcon={true} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-medium">{user.name || user.email.split("@")[0]}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/dashboard" className="flex w-full items-center">
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
