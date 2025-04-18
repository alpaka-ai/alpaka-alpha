"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, ClipboardList } from "lucide-react"
import Link from "next/link"

// Mock data for project executions
const projects = [
  {
    id: 1,
    title: "Implementation of Adjusting Recycling Pickup Schedule for Hotel at 2307 Michael Lake Apt. 264",
    company: "Scott, Hansen and Owens Roofing Materials",
  },
  {
    id: 2,
    title: "Implementation of Adjusting Recycling Pickup Schedule for Warehouse at 9724 Miller Harbor Suite 551",
    company: "Beck-Stanley Geothermal Systems, Gibson LLC",
  },
  {
    id: 3,
    title:
      "Implementation of Developing Sustainable Transportation Plans for Hayes, Ramirez and Anderson Campus in Ashleymouth, DC, USA",
    company: "Scott, Hansen and Owens Roofing Materials",
  },
  {
    id: 4,
    title:
      "Implementation of Enhancing Energy Efficiency in Residential Complex HVAC Systems at 47056 Lisa Trace Suite 594",
    company: "Thomas-Rice Windows and Doors, Buchanan Inc",
  },
  {
    id: 5,
    title:
      "Implementation of Implementing Renewable Energy Solutions for Residential Complex in Pattersonmouth, ID, USA",
    company: "Small-Lin Electrical Systems, Hampton-Patel",
  },
  {
    id: 6,
    title: "Implementation of Implementing Green Roofing Solutions for Warehouse in East Juliefurt, AZ, USA",
    company: "Ray-Park Energy Storage Systems, Coleman LLC",
  },
  {
    id: 7,
    title:
      "Implementation of Developing Sustainable Transportation Plans for Dunn, Salazar and Holt Campus in Amandatown, WY, USA",
    company: "Gibson and Sons Flooring Solutions, Walters Inc",
  },
  {
    id: 8,
    title: "Implementation of Optimizing Waste Management Processes for Commercial Complex in West Robertside, NV, USA",
    company: "Scott, Hansen and Owens Roofing Materials",
  },
]

export default function ProjectExecutionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.company.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#606C38]">Project Executions</h1>
          <p className="text-gray-500 mt-1">Track and manage your carbon reduction projects</p>
        </div>
        <Button asChild className="bg-[#606C38] hover:bg-[#4d5a2d]">
          <Link href="/dashboard/project-executions/new">
            <Plus className="h-4 w-4 mr-2" />
            Create New Project Execution
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Projects</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search projects..."
                  className="pl-8 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
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
          <CardDescription>View and manage all project executions</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredProjects.length > 0 ? (
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
                      Company
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-[#606C38]">{project.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.company}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <ClipboardList className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
              <Button asChild className="mt-4 bg-[#606C38] hover:bg-[#4d5a2d]">
                <Link href="/dashboard/project-executions/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Project Execution
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
