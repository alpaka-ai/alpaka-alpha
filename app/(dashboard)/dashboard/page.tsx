import { redirect } from "next/navigation"
import { getUser } from "@/lib/db/queries"
import { DashboardContent } from "./dashboard-content"

export default async function DashboardPage() {
  const user = await getUser()

  if (!user) {
    redirect("/sign-in")
  }

  return <DashboardContent user={user} />
}
