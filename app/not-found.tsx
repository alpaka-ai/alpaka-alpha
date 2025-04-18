import Link from "next/link"
import { LeafIcon, SearchIcon } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh] bg-[#FEFAE0]/50">
      <div className="max-w-md space-y-8 p-4 text-center">
        <div className="flex justify-center">
          <div className="relative">
            <LeafIcon className="size-20 text-[#606C38] animate-bounce" />
            <SearchIcon className="size-10 text-[#DDA15E] absolute -bottom-2 -right-2 transform rotate-12" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-[#606C38] tracking-tight font-heading">
          404: Carbon Footprint Not Found
        </h1>
        <p className="text-base text-gray-700">
          Oops! This page seems to have gone carbon-neutral... a bit too literally. It has completely disappeared from
          our emissions tracking system!
        </p>
        <div className="bg-white p-4 rounded-lg border border-[#DDA15E]/30 shadow-sm">
          <p className="text-sm text-gray-600 italic">
            "We've calculated that this missing page has saved approximately 0.00042 tons of CO₂ emissions.
            Unfortunately, that's not how carbon reduction is supposed to work."
          </p>
        </div>
        <Link
          href="/"
          className="max-w-48 mx-auto flex justify-center py-2 px-4 border border-[#606C38] rounded-full shadow-sm text-sm font-medium text-white bg-[#606C38] hover:bg-[#606C38]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DDA15E]"
        >
          Reduce Your Footprint & Go Home
        </Link>
      </div>
    </div>
  )
}
