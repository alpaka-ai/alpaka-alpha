"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LeafIcon } from "lucide-react"

interface CustomAvatarProps {
  name: string
  email?: string
  imageUrl?: string
  size?: "sm" | "md" | "lg"
  showLeafIcon?: boolean
}

export function CustomAvatar({ name, email, imageUrl, size = "md", showLeafIcon = false }: CustomAvatarProps) {
  // Get initials from name or email
  const getInitials = () => {
    if (name && name.trim() !== "") {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }

    if (email) {
      return email.split("@")[0].slice(0, 2).toUpperCase()
    }

    return "AL" // Alpaka default
  }

  // Size classes
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  }

  return (
    <div className="relative">
      <Avatar className={`border-2 border-[#DDA15E] ${sizeClasses[size]}`}>
        {imageUrl && <AvatarImage src={imageUrl || "/placeholder.svg"} alt={name} />}
        <AvatarFallback className="bg-[#FEFAE0] text-[#606C38] font-semibold">{getInitials()}</AvatarFallback>
      </Avatar>

      {showLeafIcon && (
        <div className="absolute -bottom-1 -right-1 bg-[#606C38] rounded-full p-0.5">
          <LeafIcon className="h-3 w-3 text-[#FEFAE0]" />
        </div>
      )}
    </div>
  )
}
