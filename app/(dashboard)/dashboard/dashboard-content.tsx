"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Lightbulb, ClipboardList, MessageSquare, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { User } from "@/lib/db/schema"

export function DashboardContent({ user }: { user: User }) {
  // Get a display name that prioritizes the user's name, then falls back to email username
  const displayName = user?.name || (user?.email ? user.email.split("@")[0] : "User")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#606C38]">Welcome back, {displayName}</h1>
        <p className="text-gray-500 mt-1">Here's an overview of your carbon emissions management</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vendor Data Processing</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82% Error</div>
            <p className="text-xs text-gray-500 mt-1">18% Syncing, 0% Synced</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <Lightbulb className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">$48,947,730</div>
            <p className="text-xs text-gray-500 mt-1">From reduction opportunities</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <ClipboardList className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-500 mt-1">Project executions in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vendor Engagements</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500 mt-1">Active conversations</p>
          </CardContent>
        </Card>
      </div>

      {/* Hot Spots Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hot Spots: Areas To Prioritize Now</CardTitle>
          <CardDescription>High-impact opportunities for carbon reduction</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-l-4 border-[#606C38] pl-4 py-2">
            <h3 className="font-medium">Consolidating IT Equipment Deliveries for Mixed-Use Development</h3>
            <p className="text-sm text-gray-500">at Grimes-Shields Campus, Deniseton, NJ, USA - 459,019 tCO2e</p>
          </div>
          <div className="border-l-4 border-[#606C38] pl-4 py-2">
            <h3 className="font-medium">Coordinating Sustainable Catering Services for Annual Conference</h3>
            <p className="text-sm text-gray-500">
              at Garcia LLC Convention Center, Burnsmouth, IL, USA - 382,220 tCO2e
            </p>
          </div>
          <div className="border-l-4 border-[#606C38] pl-4 py-2">
            <h3 className="font-medium">Scheduling Bulk Procurement of Cleaning Supplies for 31 Warehouses</h3>
            <p className="text-sm text-gray-500">in Priceborough, UT, USA - 159,262 tCO2e</p>
          </div>
          <div className="border-l-4 border-[#606C38] pl-4 py-2">
            <h3 className="font-medium">Adjusting Recycling Pickup Schedule for Hotel</h3>
            <p className="text-sm text-gray-500">at 4181 Stephen Cliffs Suite 785 - 127,203 tCO2e</p>
          </div>
        </CardContent>
      </Card>

      {/* Onboarding Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Complete Onboarding Tasks</CardTitle>
          <CardDescription>Get started with Alpaka by completing these initial tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="bg-[#606C38] hover:bg-[#4d5a2d]">View Tasks</Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your carbon emissions data</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link
              href="/dashboard/vendors"
              className="flex items-center p-3 rounded-lg bg-[#FEFAE0] hover:bg-[#FEFAE0]/80 transition-colors"
            >
              <Users className="h-5 w-5 mr-3 text-[#606C38]" />
              <div className="flex-1">
                <div className="font-medium">Manage Vendors</div>
                <div className="text-sm text-gray-500">View and update vendor data</div>
              </div>
              <ArrowRight className="h-5 w-5 text-[#606C38]" />
            </Link>
            <Link
              href="/dashboard/reduction-opportunities"
              className="flex items-center p-3 rounded-lg bg-[#FEFAE0] hover:bg-[#FEFAE0]/80 transition-colors"
            >
              <Lightbulb className="h-5 w-5 mr-3 text-[#606C38]" />
              <div className="flex-1">
                <div className="font-medium">Explore Reduction Opportunities</div>
                <div className="text-sm text-gray-500">Discover AI-driven recommendations</div>
              </div>
              <ArrowRight className="h-5 w-5 text-[#606C38]" />
            </Link>
            <Link
              href="/dashboard/project-executions"
              className="flex items-center p-3 rounded-lg bg-[#FEFAE0] hover:bg-[#FEFAE0]/80 transition-colors"
            >
              <ClipboardList className="h-5 w-5 mr-3 text-[#606C38]" />
              <div className="flex-1">
                <div className="font-medium">Track Project Executions</div>
                <div className="text-sm text-gray-500">Monitor progress on active projects</div>
              </div>
              <ArrowRight className="h-5 w-5 text-[#606C38]" />
            </Link>
            <Link
              href="/dashboard/vendor-engagements"
              className="flex items-center p-3 rounded-lg bg-[#FEFAE0] hover:bg-[#FEFAE0]/80 transition-colors"
            >
              <MessageSquare className="h-5 w-5 mr-3 text-[#606C38]" />
              <div className="flex-1">
                <div className="font-medium">Engage with Vendors</div>
                <div className="text-sm text-gray-500">Communicate about projects and opportunities</div>
              </div>
              <ArrowRight className="h-5 w-5 text-[#606C38]" />
            </Link>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Emission Reduction Data</CardTitle>
              <CardDescription>Past actuals + forecast</CardDescription>
            </CardHeader>
            <CardContent className="h-[150px] flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p>Emission reduction chart will appear here</p>
                <p className="text-sm mt-1">Showing historical and projected reductions</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost Reduction Data</CardTitle>
              <CardDescription>Past actuals + forecast</CardDescription>
            </CardHeader>
            <CardContent className="h-[150px] flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p>Cost reduction chart will appear here</p>
                <p className="text-sm mt-1">Showing historical and projected savings</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
