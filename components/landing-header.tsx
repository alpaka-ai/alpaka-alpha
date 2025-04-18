"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-[#606C38] font-heading">Alpaka</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-[#606C38] transition-colors">
            Features
          </Link>
          <Link href="#benefits" className="text-sm font-medium hover:text-[#606C38] transition-colors">
            Benefits
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:text-[#606C38] transition-colors">
            Testimonials
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-[#606C38] transition-colors">
            About Us
          </Link>
        </nav>
        <div className="hidden md:flex gap-4">
          <Button asChild variant="outline" className="border-[#DDA15E] text-[#DDA15E] hover:bg-[#DDA15E]/10">
            <a href="/sign-in">Sign In</a>
          </Button>
          <Button asChild className="bg-[#606C38] hover:bg-[#4d5a2d] text-white">
            <a href="/sign-up">Create Account</a>
          </Button>
        </div>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden p-4 bg-white border-t">
          <nav className="flex flex-col gap-4">
            <Link href="#features" className="text-sm font-medium hover:text-[#606C38] transition-colors">
              Features
            </Link>
            <Link href="#benefits" className="text-sm font-medium hover:text-[#606C38] transition-colors">
              Benefits
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-[#606C38] transition-colors">
              Testimonials
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-[#606C38] transition-colors">
              About Us
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Button
                asChild
                variant="outline"
                className="border-[#DDA15E] text-[#DDA15E] hover:bg-[#DDA15E]/10 w-full"
              >
                <a href="/sign-in">Sign In</a>
              </Button>
              <Button asChild className="bg-[#606C38] hover:bg-[#4d5a2d] text-white w-full">
                <a href="/sign-up">Create Account</a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
