import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, BarChart3, Users, Lightbulb } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#FEFAE0]">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#606C38] font-heading">
                Measure, Trace, Reduce Carbon Emissions
              </h1>
              <p className="text-lg text-gray-700 md:text-xl">
                Alpaka helps real estate organizations manage Scope 3 emissions across their property supply chains with
                powerful vendor management, emissions tracking, and data-driven reduction recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-[#606C38] hover:bg-[#4d5a2d] text-white">
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button asChild variant="outline" className="border-[#DDA15E] text-[#DDA15E] hover:bg-[#DDA15E]/10">
                  <Link href="/auth/signup">Create Account</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/carbon-dashboard-overview.png"
                alt="Alpaka Dashboard Preview"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#606C38] mb-4 font-heading">Comprehensive Carbon Management</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our platform provides end-to-end solutions for managing your organization's carbon footprint
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border-[#FEFAE0] hover:border-[#DDA15E] transition-colors">
              <div className="h-12 w-12 rounded-full bg-[#606C38]/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-[#606C38]" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#606C38] font-heading">Vendor Management</h3>
              <p className="text-gray-700">
                Centralize and manage vendor data across your entire real estate portfolio with our intuitive interface.
              </p>
            </Card>
            <Card className="p-6 border-[#FEFAE0] hover:border-[#DDA15E] transition-colors">
              <div className="h-12 w-12 rounded-full bg-[#606C38]/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-[#606C38]" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#606C38] font-heading">Emissions Tracking</h3>
              <p className="text-gray-700">
                Gain complete visibility into your carbon footprint with traceable, verifiable emissions data.
              </p>
            </Card>
            <Card className="p-6 border-[#FEFAE0] hover:border-[#DDA15E] transition-colors">
              <div className="h-12 w-12 rounded-full bg-[#606C38]/10 flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-[#606C38]" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#606C38] font-heading">Reduction Opportunities</h3>
              <p className="text-gray-700">
                Leverage smart, data-driven recommendations to identify and implement carbon reduction strategies.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="w-full py-12 md:py-24 bg-[#606C38]/5">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image src="/carbon-reduction-analysis.png" alt="Cost Savings Analysis" fill className="object-cover" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-[#606C38] font-heading">
                Economic Benefits with Sustainability Outcomes
              </h2>
              <p className="text-lg text-gray-700">
                Alpaka doesn't just help you meet sustainability goals—it drives real economic value. Our customers
                typically see:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-[#DDA15E] shrink-0 mt-0.5" />
                  <span>15-20% reduction in operational costs through optimized vendor selection</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-[#DDA15E] shrink-0 mt-0.5" />
                  <span>30% improvement in emissions data accuracy and reporting efficiency</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-[#DDA15E] shrink-0 mt-0.5" />
                  <span>Significant competitive advantage in markets with increasing ESG requirements</span>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild className="bg-[#DDA15E] hover:bg-[#c48f53] text-white">
                  <Link href="/auth/signup">Start Reducing Emissions Today</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#606C38] mb-4 font-heading">
              Trusted by Leading Real Estate Organizations
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 border-[#FEFAE0]">
              <p className="italic text-gray-700 mb-4">
                "Alpaka has transformed how we manage our Scope 3 emissions. The platform's intuitive interface and
                powerful analytics have helped us identify significant cost-saving opportunities while reducing our
                carbon footprint."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#606C38]/10"></div>
                <div>
                  <p className="font-bold text-[#606C38]">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Sustainability Director, Global Properties Inc.</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 border-[#FEFAE0]">
              <p className="italic text-gray-700 mb-4">
                "The vendor management capabilities alone have saved us countless hours of manual work. The emissions
                tracking and reduction recommendations provide actionable insights that deliver real business value."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#606C38]/10"></div>
                <div>
                  <p className="font-bold text-[#606C38]">Michael Chen</p>
                  <p className="text-sm text-gray-600">COO, Urban Development Partners</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-[#FEFAE0]">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-[#606C38] mb-4 font-heading">
            Ready to Transform Your Carbon Management?
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Join the growing number of real estate organizations using Alpaka to drive economic value while achieving
            sustainability goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-[#606C38] hover:bg-[#4d5a2d] text-white">
              <Link href="/auth/signup">Create Your Account</Link>
            </Button>
            <Button asChild variant="outline" className="border-[#DDA15E] text-[#DDA15E] hover:bg-[#DDA15E]/10">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
