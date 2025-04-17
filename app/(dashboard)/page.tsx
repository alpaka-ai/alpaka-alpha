import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Building2, Leaf } from "lucide-react"
import Link from "next/link"
import { Terminal } from "./terminal"

export default function HomePage() {
  return (
      <main>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-['Chau_Philomene_One']">
                  Measure, Trace, Reduce
                  <span className="block text-[#606C38]">Carbon Emissions</span>
                </h1>
                <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Alpaka empowers real estate organizations to manage Scope 3 carbon emissions across property supply
                  chains, with features for vendor management, emissions tracking, reduction opportunities - all using actual data.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg rounded-full bg-[#606C38] hover:bg-[#4a5429] text-white" asChild>
                    <Link href="/sign-in">
                      Sign In
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                      size="lg"
                      variant="outline"
                      className="text-lg rounded-full border-[#DDA15E] text-[#DDA15E] hover:bg-[#DDA15E]/10"
                      asChild
                  >
                    <Link href="/sign-up">Create Account</Link>
                  </Button>
                </div>
              </div>
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <Terminal />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#FEFAE0] w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              <div>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#606C38] text-white">
                  <Building2 className="h-6 w-6" />
                </div>
                <div className="mt-5">
                  <h2 className="text-lg font-medium text-gray-900 font-['Chau_Philomene_One']">Vendor Management</h2>
                  <p className="mt-2 text-base text-gray-600">
                    Manage vendor data, track data syncing status, and control user access to vendor information across
                    your real estate portfolio.
                  </p>
                </div>
              </div>

              <div className="mt-10 lg:mt-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#606C38] text-white">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div className="mt-5">
                  <h2 className="text-lg font-medium text-gray-900 font-['Chau_Philomene_One']">Emissions Tracking</h2>
                  <p className="mt-2 text-base text-gray-600">
                    Gain deep visibility into your properties' carbon footprint with traceable, tamper-proof emissions
                    data for every step in your value chain.
                  </p>
                </div>
              </div>

              <div className="mt-10 lg:mt-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#606C38] text-white">
                  <Leaf className="h-6 w-6" />
                </div>
                <div className="mt-5">
                  <h2 className="text-lg font-medium text-gray-900 font-['Chau_Philomene_One']">
                    Reduction Opportunities
                  </h2>
                  <p className="mt-2 text-base text-gray-600">
                    Receive AI-powered recommendations to drive carbon reductions in your supply chain, with estimated
                    costs and potential savings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl font-['Chau_Philomene_One']">
                  Ready to reduce your carbon footprint?
                </h2>
                <p className="mt-3 max-w-3xl text-lg text-gray-600">
                  Join leading real estate organizations using Alpaka to measure, trace, and reduce their Scope 3 carbon
                  emissions while saving time, reducing risk, and boosting profitability.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
                <Button size="lg" className="text-lg rounded-full bg-[#DDA15E] hover:bg-[#c48a4a] text-white" asChild>
                  <Link href="/sign-up">
                    Get Started
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
  )
}
