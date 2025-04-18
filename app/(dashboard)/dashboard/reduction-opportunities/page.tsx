"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Lightbulb } from "lucide-react"
import Link from "next/link"

// Mock data for reduction opportunities
const opportunities = [
  {
    id: 1,
    title: "Adjusting Recycling Pickup Schedule for Hotel at 2307 Michael Lake Apt. 264",
    estimatedCost: "$6,132,243",
    estimatedSavings: "$3,122,826",
    estimatedEmissionReduction: "226,145 tCO2e",
    scope3Category: "Fuel & Energy",
  },
  {
    id: 2,
    title: "Adjusting Recycling Pickup Schedule for Warehouse at 9724 Miller Harbor Suite 551",
    estimatedCost: "$8,805,488",
    estimatedSavings: "$2,293,125",
    estimatedEmissionReduction: "159,145 tCO2e",
    scope3Category: "Fuel & Energy",
  },
  {
    id: 3,
    title: "Developing Sustainable Transportation Plans for Hayes, Ramirez and Anderson Campus in Ashleymouth, DC, USA",
    estimatedCost: "$5,392,352",
    estimatedSavings: "$2,886,552",
    estimatedEmissionReduction: "40,216 tCO2e",
    scope3Category: "Use of Sold Products",
  },
  {
    id: 4,
    title: "Enhancing Energy Efficiency in Residential Complex HVAC Systems at 47056 Lisa Trace Suite 594",
    estimatedCost: "$4,684,461",
    estimatedSavings: "$4,122,333",
    estimatedEmissionReduction: "183,841 tCO2e",
    scope3Category: "Purchased Goods",
  },
  {
    id: 5,
    title: "Implementing Renewable Energy Solutions for Residential Complex in Pattersonmouth, ID, USA",
    estimatedCost: "$2,443,604",
    estimatedSavings: "$2,878,079",
    estimatedEmissionReduction: "416,566 tCO2e",
    scope3Category: "Waste from Operations",
  },
  {
    id: 6,
    title: "Implementing Green Roofing Solutions for Warehouse in East Juliefurt, AZ, USA",
    estimatedCost: "$1,294,947",
    estimatedSavings: "$4,110,095",
    estimatedEmissionReduction: "100,552 tCO2e",
    scope3Category: "Fuel & Energy",
  },
  {
    id: 7,
    title: "Developing Sustainable Transportation Plans for Dunn, Salazar and Holt Campus in Amandatown, WY, USA",
    estimatedCost: "$229,379",
    estimatedSavings: "$19,525",
    estimatedEmissionReduction: "461,725 tCO2e",
    scope3Category: "Upstream Transportation",
  },
  {
    id: 8,
    title: "Optimizing Waste Management Processes for Commercial Complex in West Robertside, NV, USA",
    estimatedCost: "$9,620,010",
    estimatedSavings: "$4,854,758",
    estimatedEmissionReduction: "30,502 tCO2e",
    scope3Category: "Fuel & Energy",
  },
]

const ONE_MILLION = 1000000

export default function ReductionOpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [costRangeFilter, setCostRangeFilter] = useState("all")

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#606C38]">Reduction Opportunities</h1>
          <p className="text-gray-500 mt-1">AI-driven guidance on specific reduction opportunities</p>
        </div>
        <div className="flex space-x-2">
          <Button asChild className="bg-[#606C38] hover:bg-[#4d5a2d]">
            <Link href="/dashboard/reduction-opportunities/new">
              <Plus className="h-4 w-4 mr-2" />
              Add New Opportunity
            </Link>
          </Button>
          <Button variant="outline">Generate New Opportunities</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Opportunities</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search opportunities..."
                  className="pl-8 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={costRangeFilter} onValueChange={setCostRangeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Cost Ranges" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cost Ranges</SelectItem>
                  <SelectItem value="low">Low Cost (&lt; $1M)</SelectItem>
                  <SelectItem value="medium">Medium Cost ($1M - $5M)</SelectItem>
                  <SelectItem value="high">High Cost (&gt; $5M)</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="10">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="10 per page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="20">20 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <CardDescription>View and manage all reduction opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredOpportunities.length > 0 ? (
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Estimated Cost
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Estimated Savings
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Estimated Emission Reduction
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Scope 3 Category
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOpportunities.map((opportunity) => (
                    <tr key={opportunity.id} className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-[#606C38]">{opportunity.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{opportunity.estimatedCost}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                        {opportunity.estimatedSavings}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {opportunity.estimatedEmissionReduction}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {opportunity.scope3Category}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Lightbulb className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900">No opportunities found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
              <Button className="mt-4 bg-[#606C38] hover:bg-[#4d5a2d]">Generate New Opportunities</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
