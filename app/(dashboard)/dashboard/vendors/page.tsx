"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, AlertCircle, CheckCircle, RefreshCw, XCircle } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// Mock data for vendors
const vendors = [
  {
    id: 1,
    name: "Robinson, Valenzuela and Allen Building Maintenance",
    syncStatus: "error",
    lastUpdate: "2024-07-28 22:18",
    dataAvailableFrom: "-",
  },
  {
    id: 2,
    name: "Rice LLC Elevator Services",
    syncStatus: "error",
    lastUpdate: "2024-07-28 22:18",
    dataAvailableFrom: "2024-07-17",
  },
  {
    id: 3,
    name: "Berry, Rangel and Taylor Cleaning Services",
    syncStatus: "error",
    lastUpdate: "2024-07-28 22:18",
    dataAvailableFrom: "2024-07-04",
  },
  {
    id: 4,
    name: "Smith LLC Renewable Energy",
    syncStatus: "error",
    lastUpdate: "2024-07-28 22:18",
    dataAvailableFrom: "2024-06-11",
  },
  {
    id: 5,
    name: "Young and Sons Flooring Solutions",
    syncStatus: "error",
    lastUpdate: "2024-07-28 22:18",
    dataAvailableFrom: "-",
  },
  {
    id: 6,
    name: "Humphrey-Garrett Geothermal Systems",
    syncStatus: "inactive",
    lastUpdate: "2024-07-28 22:18",
    dataAvailableFrom: "-",
    dataSharingPreferences: "Financial ✓ Operational",
    assuranceProvider: "Cantu-Grimes",
    dataAccessStatus: "Denied",
  },
]

const SyncStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "pending":
      return (
        <Badge className="bg-amber-500 hover:bg-amber-600">
          <AlertCircle className="h-3 w-3 mr-1" /> Pending
        </Badge>
      )
    case "syncing":
      return (
        <Badge className="bg-blue-500 hover:bg-blue-600">
          <RefreshCw className="h-3 w-3 mr-1 animate-spin" /> Syncing
        </Badge>
      )
    case "synced":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <CheckCircle className="h-3 w-3 mr-1" /> Synced
        </Badge>
      )
    case "error":
      return (
        <Badge className="bg-red-500 hover:bg-red-600">
          <XCircle className="h-3 w-3 mr-1" /> Error
        </Badge>
      )
    case "inactive":
      return <Badge className="bg-gray-500 hover:bg-gray-600">Inactive</Badge>
    default:
      return <Badge className="bg-gray-500 hover:bg-gray-600">Unknown</Badge>
  }
}

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || vendor.syncStatus === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#606C38]">Vendors</h1>
          <p className="text-gray-500 mt-1">Manage your supply chain vendors and their emissions data</p>
        </div>
        <Button asChild className="bg-[#606C38] hover:bg-[#4d5a2d]">
          <Link href="/dashboard/vendors/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Vendor
          </Link>
        </Button>
      </div>

      {/* Sync Status Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-l-4 border-amber-500">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-bold">0%</p>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <AlertCircle className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-blue-500">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Syncing</p>
                <p className="text-2xl font-bold">18%</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <RefreshCw className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-green-500">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Synced</p>
                <p className="text-2xl font-bold">0%</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-red-500">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Error</p>
                <p className="text-2xl font-bold">82%</p>
              </div>
              <div className="bg-red-100 p-2 rounded-full">
                <XCircle className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Vendors</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search vendors..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="syncing">Syncing</SelectItem>
                  <SelectItem value="synced">Synced</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">Reset Filters</Button>
            </div>
          </div>
          <CardDescription>View and manage all your registered vendors</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredVendors.length > 0 ? (
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Vendor
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Sync Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Last Update
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Data Available From
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVendors.map((vendor) => (
                    <tr key={vendor.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <SyncStatusBadge status={vendor.syncStatus} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.lastUpdate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.dataAvailableFrom}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/vendors/${vendor.id}`}>View</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900">No vendors found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
              <Button asChild className="mt-4 bg-[#606C38] hover:bg-[#4d5a2d]">
                <Link href="/dashboard/vendors/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Vendor
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
