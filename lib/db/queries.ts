import { desc, and, eq, isNull } from "drizzle-orm"
import { executeQuery } from "./drizzle"
import { activityLogs, teamMembers, teams, users } from "./schema"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth/session"

export async function getUser() {
  try {
    const sessionCookie = (await cookies()).get("session")
    if (!sessionCookie || !sessionCookie.value) {
      return null
    }

    const sessionData = await verifyToken(sessionCookie.value)
    if (!sessionData || !sessionData.user || typeof sessionData.user.id !== "number") {
      return null
    }

    if (new Date(sessionData.expires) < new Date()) {
      return null
    }

    return await executeQuery(async (db) => {
      const results = await db
        .select()
        .from(users)
        .where(and(eq(users.id, sessionData.user.id), isNull(users.deletedAt)))
        .limit(1)

      return results.length > 0 ? results[0] : null
    })
  } catch (error) {
    console.error("Error getting user:", error)
    return null
  }
}

export async function getTeamByStripeCustomerId(customerId: string) {
  try {
    return await executeQuery(async (db) => {
      const results = await db.select().from(teams).where(eq(teams.stripeCustomerId, customerId)).limit(1)

      return results.length > 0 ? results[0] : null
    })
  } catch (error) {
    console.error("Error getting team by Stripe customer ID:", error)
    return null
  }
}

export async function updateTeamSubscription(
  teamId: number,
  subscriptionData: {
    stripeSubscriptionId: string | null
    stripeProductId: string | null
    planName: string | null
    subscriptionStatus: string
  },
) {
  try {
    await executeQuery(async (db) => {
      await db
        .update(teams)
        .set({
          ...subscriptionData,
          updatedAt: new Date(),
        })
        .where(eq(teams.id, teamId))
    })
  } catch (error) {
    console.error("Error updating team subscription:", error)
    throw error
  }
}

export async function getUserWithTeam(userId: number) {
  try {
    return await executeQuery(async (db) => {
      const results = await db
        .select({
          user: users,
          teamId: teamMembers.teamId,
        })
        .from(users)
        .leftJoin(teamMembers, eq(users.id, teamMembers.userId))
        .where(eq(users.id, userId))
        .limit(1)

      return results.length > 0 ? results[0] : null
    })
  } catch (error) {
    console.error("Error getting user with team:", error)
    return null
  }
}

export async function getActivityLogs() {
  try {
    const user = await getUser()
    if (!user) {
      throw new Error("User not authenticated")
    }

    return await executeQuery(async (db) => {
      return await db
        .select({
          id: activityLogs.id,
          action: activityLogs.action,
          timestamp: activityLogs.timestamp,
          ipAddress: activityLogs.ipAddress,
          userName: users.name,
        })
        .from(activityLogs)
        .leftJoin(users, eq(activityLogs.userId, users.id))
        .where(eq(activityLogs.userId, user.id))
        .orderBy(desc(activityLogs.timestamp))
        .limit(10)
    })
  } catch (error) {
    console.error("Error getting activity logs:", error)
    return []
  }
}

export async function getTeamForUser(userId: number) {
  try {
    return await executeQuery(async (db) => {
      // Use a simpler query approach to avoid potential issues
      const teamMembersData = await db.select().from(teamMembers).where(eq(teamMembers.userId, userId)).limit(1)

      if (teamMembersData.length === 0) {
        return null
      }

      const teamId = teamMembersData[0].teamId
      const teamData = await db.select().from(teams).where(eq(teams.id, teamId)).limit(1)

      if (teamData.length === 0) {
        return null
      }

      // Get team members
      const allTeamMembers = await db
        .select({
          teamMember: teamMembers,
          user: {
            id: users.id,
            name: users.name,
            email: users.email,
          },
        })
        .from(teamMembers)
        .leftJoin(users, eq(teamMembers.userId, users.id))
        .where(eq(teamMembers.teamId, teamId))

      // Construct the team data with members
      return {
        ...teamData[0],
        teamMembers: allTeamMembers.map((tm) => ({
          ...tm.teamMember,
          user: tm.user,
        })),
      }
    })
  } catch (error) {
    console.error("Error getting team for user:", error)
    return null
  }
}
