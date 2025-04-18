"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, BarChart2 } from "lucide-react"

export default function EmissionsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // This would be replaced with actual data from your database
  const emissions: any[] = []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#606C38]">Emissions</h1>
          <p className="text-gray-500 mt-1">Track and manage your carbon emissions data</p>
        </div>
        <Button asChild className="bg-[#606C38] hover:bg-[#4d5a2d]">
          <Link href="/dashboard/emissions/new">
            <Plus className="h-4 w-4 mr-2" />
            Record Emissions
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Emissions Data</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search emissions..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <CardDescription>View and manage all your emissions entries</CardDescription>
        </CardHeader>
        <CardContent>
          {emissions.length > 0 ? (
            <div className="grid gap-4">
              {/* Emissions list would go here */}
              <p>Emissions list</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <BarChart2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900">No emissions data yet</h3>
              <p className="mt-1 text-gray-500">Start tracking your carbon footprint</p>
              <Button asChild className="mt-4 bg-[#606C38] hover:bg-[#4d5a2d]">
                <Link href="/dashboard/emissions/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Record Emissions
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
