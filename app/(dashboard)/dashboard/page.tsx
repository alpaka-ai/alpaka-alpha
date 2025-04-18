"use client"

import { use } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, Users, Target, Lightbulb } from "lucide-react"
import Link from "next/link"
import { useUser } from "@/lib/auth/index"

export default function DashboardPage() {
  const { userPromise } = useUser()
  const user = use(userPromise)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#606C38]">Welcome back, {user?.name || "User"}</h1>
        <p className="text-gray-500 mt-1">Here's an overview of your carbon emissions management</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-gray-500 mt-1">Across all properties</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Emissions</CardTitle>
            <BarChart2 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0 tCO₂e</div>
            <p className="text-xs text-gray-500 mt-1">Year to date</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Targets</CardTitle>
            <Target className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-gray-500 mt-1">Reduction targets</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Initiatives</CardTitle>
            <Lightbulb className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-gray-500 mt-1">Active initiatives</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with managing your carbon emissions</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link
              href="/dashboard/vendors/new"
              className="flex items-center p-3 rounded-lg bg-[#FEFAE0] hover:bg-[#FEFAE0]/80 transition-colors"
            >
              <Users className="h-5 w-5 mr-3 text-[#606C38]" />
              <div>
                <div className="font-medium">Add a Vendor</div>
                <div className="text-sm text-gray-500">Register a new vendor in your supply chain</div>
              </div>
            </Link>
            <Link
              href="/dashboard/emissions/new"
              className="flex items-center p-3 rounded-lg bg-[#FEFAE0] hover:bg-[#FEFAE0]/80 transition-colors"
            >
              <BarChart2 className="h-5 w-5 mr-3 text-[#606C38]" />
              <div>
                <div className="font-medium">Record Emissions</div>
                <div className="text-sm text-gray-500">Add new emission data from your vendors</div>
              </div>
            </Link>
            <Link
              href="/dashboard/targets/new"
              className="flex items-center p-3 rounded-lg bg-[#FEFAE0] hover:bg-[#FEFAE0]/80 transition-colors"
            >
              <Target className="h-5 w-5 mr-3 text-[#606C38]" />
              <div>
                <div className="font-medium">Set Reduction Target</div>
                <div className="text-sm text-gray-500">Define your carbon reduction goals</div>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emissions Trend</CardTitle>
            <CardDescription>Your carbon footprint over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center text-gray-500">
              <BarChart2 className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>No emissions data available yet</p>
              <p className="text-sm mt-1">Add vendors and record emissions to see your trends</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
