"use client"

import Link from "next/link"
import Image from "next/image"
import { useActionState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { signIn, signUp } from "./actions"
import type { ActionState } from "@/lib/auth/middleware"

export function Login({ mode = "signin" }: { mode?: "signin" | "signup" }) {
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect")
  const priceId = searchParams.get("priceId")
  const inviteId = searchParams.get("inviteId")
  const [state, formAction, pending] = useActionState<ActionState, FormData>(mode === "signin" ? signIn : signUp, {
    error: "",
  })

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FEFAE0]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="relative w-24 h-24 overflow-hidden rounded-full border-4 border-[#606C38]">
            <Image src="/carbon-dashboard-overview.png" alt="Alpaka" fill className="object-cover" priority />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-[#606C38] font-heading">
          {mode === "signin" ? "Sign in to Alpaka" : "Create your Alpaka account"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {mode === "signin" ? "Manage your carbon emissions" : "Start reducing your carbon footprint today"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-[#DDA15E]/20">
          <form className="space-y-6" action={formAction}>
            <input type="hidden" name="redirect" value={redirect || ""} />
            <input type="hidden" name="priceId" value={priceId || ""} />
            <input type="hidden" name="inviteId" value={inviteId || ""} />
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </Label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={state.email}
                  required
                  maxLength={50}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#606C38] focus:border-[#606C38]"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  defaultValue={state.password}
                  required
                  minLength={8}
                  maxLength={100}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#606C38] focus:border-[#606C38]"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {state?.error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {state.error}
              </div>
            )}

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#606C38] hover:bg-[#4d5a2d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#606C38]"
                disabled={pending}
              >
                {pending ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Loading...
                  </>
                ) : mode === "signin" ? (
                  "Sign in"
                ) : (
                  "Sign up"
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {mode === "signin" ? "New to Alpaka?" : "Already have an account?"}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href={`${mode === "signin" ? "/sign-up" : "/sign-in"}${
                  redirect ? `?redirect=${redirect}` : ""
                }${priceId ? `&priceId=${priceId}` : ""}`}
                className="w-full flex justify-center py-2 px-4 border border-[#DDA15E] rounded-md shadow-sm text-sm font-medium text-[#DDA15E] bg-white hover:bg-[#DDA15E]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DDA15E]"
              >
                {mode === "signin" ? "Create an account" : "Sign in to existing account"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-600">
        <p>
          By using Alpaka, you agree to our{" "}
          <Link href="/terms" className="font-medium text-[#DDA15E] hover:text-[#c48f53]">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="font-medium text-[#DDA15E] hover:text-[#c48f53]">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
