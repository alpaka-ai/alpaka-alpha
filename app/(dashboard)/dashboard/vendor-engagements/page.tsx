"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Send, Paperclip } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for vendor engagements
const engagements = [
  {
    id: 1,
    vendor: "Jones-Waters Insulation Providers",
    project:
      "Implementation of Scheduling Bulk Procurement of Cleaning Supplies for 31 Warehouses in Priceborough, UT, USA",
    created: "Jul 28, 2024",
    status: "active",
  },
  {
    id: 2,
    vendor: "Edwards, Martin and Brown Plumbing Systems",
    project:
      "Implementation of Implementing Smart Water Management for Landscaping at Project #85820, Port Brentville, MS, USA",
    created: "Jul 28, 2024",
    status: "active",
  },
  {
    id: 3,
    vendor: "Wheeler-Barry Solar Panel Providers",
    project:
      "Implementation of Scheduling Bulk Procurement of Cleaning Supplies for 31 Warehouses in Priceborough, UT, USA",
    created: "Jul 28, 2024",
    status: "active",
  },
]

// Mock data for chat messages
const messages = [
  {
    id: 1,
    sender: "Gary Bean",
    content: "Making any progress on the containers?",
    timestamp: "Jul 28, 2024, 06:18 PM",
    isCurrentUser: false,
  },
  {
    id: 2,
    sender: "Jacob Molz",
    content:
      "We found a vendor that can provide compostable containers that meet our emission standards and budget. They have sugarcane or plant fiber containers. Plant fiber is more cost effective, but may not hold up to saucy foods. We're getting samples to test them.",
    timestamp: "Jul 28, 2024, 06:18 PM",
    isCurrentUser: true,
  },
  {
    id: 3,
    sender: "Jacob Molz",
    content:
      "Did our test and we'll definitely need to go with sugarcane. It's manufactured state-side, so that helps too. It's a little higher in emissions than the plant fiber containers, but still way less than the plastic utensils we've been using.",
    timestamp: "Jul 28, 2024, 06:18 PM",
    isCurrentUser: true,
  },
  {
    id: 4,
    sender: "Gary Bean",
    content: "That's great! Can you please share their vendor info once your contract is finalized?",
    timestamp: "Jul 28, 2024, 06:18 PM",
    isCurrentUser: false,
  },
  {
    id: 5,
    sender: "Jacob Molz",
    content: "Just finalized our contract for the compostable containers. Uploading the new vendor data now.",
    timestamp: "Jul 30, 2024, 06:09 PM",
    isCurrentUser: true,
  },
  {
    id: 6,
    sender: "Jacob Molz",
    content: "Here's the confirmation attached. It's syncing in Alpaka now!",
    timestamp: "Jul 30, 2024, 06:09 PM",
    isCurrentUser: true,
    attachment: {
      name: "alpaka-vendor-data-confirmation.rtf",
      url: "#",
    },
  },
]

export default function VendorEngagementsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [activeEngagement, setActiveEngagement] = useState(engagements[0])

  const filteredEngagements = engagements.filter((engagement) => {
    const matchesSearch =
      engagement.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      engagement.project.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the message to the server
    setNewMessage("")
  }

  return (
    <div className="flex h-[calc(100vh-12rem)] gap-6">
      {/* Engagements List */}
      <div className="w-1/3 flex flex-col">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#606C38]">Vendor Engagements</h1>
          <Button className="bg-[#606C38] hover:bg-[#4d5a2d]">Start New Engagement Chat</Button>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search engagement chats..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="All Chats" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Chats</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <div className="mt-4 flex-1 overflow-auto space-y-2">
          {filteredEngagements.map((engagement) => (
            <div
              key={engagement.id}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                activeEngagement.id === engagement.id ? "bg-[#606C38] text-white" : "bg-white hover:bg-gray-100 border"
              }`}
              onClick={() => setActiveEngagement(engagement)}
            >
              <div className="flex justify-between items-start">
                <h3
                  className={`font-medium ${activeEngagement.id === engagement.id ? "text-white" : "text-[#606C38]"}`}
                >
                  {engagement.vendor}
                </h3>
                <Badge
                  className={
                    activeEngagement.id === engagement.id ? "bg-white text-[#606C38]" : "bg-[#606C38] text-white"
                  }
                >
                  {engagement.status}
                </Badge>
              </div>
              <p
                className={`text-sm mt-1 truncate ${activeEngagement.id === engagement.id ? "text-white/80" : "text-gray-500"}`}
              >
                {engagement.project}
              </p>
              <p
                className={`text-xs mt-2 ${activeEngagement.id === engagement.id ? "text-white/70" : "text-gray-400"}`}
              >
                Created: {engagement.created}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-2/3 flex flex-col bg-white rounded-lg border">
        {/* Chat Header */}
        <div className="p-4 border-b">
          <div className="text-lg font-medium text-[#606C38]">Vendor: {activeEngagement.vendor}</div>
          <div className="text-sm text-gray-500 mt-1">Project: {activeEngagement.project}</div>
          <div className="text-xs text-gray-400 mt-1">Started: July 28, 2024</div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] ${
                  message.isCurrentUser
                    ? "bg-[#606C38] text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg"
                    : "bg-gray-100 text-gray-800 rounded-tl-lg rounded-tr-lg rounded-br-lg"
                } p-3`}
              >
                <div className="flex items-center mb-1">
                  <span className="font-medium text-sm">{message.sender}</span>
                  <span className="text-xs ml-2 opacity-70">{message.timestamp}</span>
                </div>
                <p className="text-sm">{message.content}</p>
                {message.attachment && (
                  <div className="mt-2 p-2 bg-white/20 rounded flex items-center text-sm">
                    <Paperclip className="h-3 w-3 mr-2" />
                    <a href={message.attachment.url} className="underline">
                      {message.attachment.name}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="icon" className="rounded-full">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type your message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" className="rounded-full bg-[#606C38] hover:bg-[#4d5a2d]">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
