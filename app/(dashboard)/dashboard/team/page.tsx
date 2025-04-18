"use client"

import { use } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useUser } from "@/lib/auth/index"
import { InviteTeamMember } from "../invite-team"
import { removeTeamMember } from "@/app/(login)/actions"
import { useActionState } from "react"
import type { User } from "@/lib/db/schema"

type ActionState = {
  error?: string
  success?: string
}

export default function TeamPage() {
  const { userPromise } = useUser()
  const user = use(userPromise)
  const [removeState, removeAction, isRemovePending] = useActionState<ActionState, FormData>(removeTeamMember, {
    error: "",
    success: "",
  })

  // This would normally come from a database query
  // For now, we'll use mock data based on the current user
  const teamMembers = [
    {
      id: 1,
      user: {
        id: user?.id || 1,
        name: user?.name || "Current User",
        email: user?.email || "user@example.com",
      },
      role: "owner",
    },
    {
      id: 2,
      user: {
        id: 2,
        name: "Team Member",
        email: "member@example.com",
      },
      role: "member",
    },
  ]

  const getUserDisplayName = (user: Pick<User, "id" | "name" | "email">) => {
    return user.name || user.email || "Unknown User"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#606C38]">Team Management</h1>
        <p className="text-gray-500 mt-1">Manage your team members and their permissions</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {teamMembers.map((member, index) => (
              <li key={member.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={`/placeholder-32px.png?height=32&width=32`}
                      alt={getUserDisplayName(member.user)}
                    />
                    <AvatarFallback>
                      {getUserDisplayName(member.user)
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{getUserDisplayName(member.user)}</p>
                    <p className="text-sm text-muted-foreground capitalize">{member.role}</p>
                  </div>
                </div>
                {index > 0 ? (
                  <form action={removeAction}>
                    <input type="hidden" name="memberId" value={member.id} />
                    <Button type="submit" variant="outline" size="sm" disabled={isRemovePending}>
                      {isRemovePending ? "Removing..." : "Remove"}
                    </Button>
                  </form>
                ) : null}
              </li>
            ))}
          </ul>
          {removeState?.error && <p className="text-red-500 mt-4">{removeState.error}</p>}
          {removeState?.success && <p className="text-green-500 mt-4">{removeState.success}</p>}
        </CardContent>
      </Card>

      <InviteTeamMember />
    </div>
  )
}
