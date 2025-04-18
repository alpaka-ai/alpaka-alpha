import Link from "next/link"
import { Facebook, Twitter, Linkedin, Mail, Phone } from "lucide-react"

export function LandingFooter() {
  return (
    <footer className="w-full bg-[#606C38] text-white">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold font-heading">Alpaka</span>
            </Link>
            <p className="text-sm text-[#FEFAE0]/80">
              Helping real estate organizations measure, trace, and reduce carbon emissions across their property supply
              chains.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-[#DDA15E] transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-[#DDA15E] transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-[#DDA15E] transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 font-heading">Platform</h3>
            <ul className="space-y-2">
              <li>
                <a href="/dashboard/vendors" className="text-sm hover:text-[#DDA15E] transition-colors">
                  Vendor Management
                </a>
              </li>
              <li>
                <a href="/dashboard/reduction-opportunities" className="text-sm hover:text-[#DDA15E] transition-colors">
                  Reduction Opportunities
                </a>
              </li>
              <li>
                <a href="/dashboard/project-executions" className="text-sm hover:text-[#DDA15E] transition-colors">
                  Project Executions
                </a>
              </li>
              <li>
                <a href="/dashboard/vendor-engagements" className="text-sm hover:text-[#DDA15E] transition-colors">
                  Vendor Engagements
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 font-heading">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:text-[#DDA15E] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm hover:text-[#DDA15E] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-[#DDA15E] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-sm hover:text-[#DDA15E] transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 font-heading">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#DDA15E]" />
                <Link href="mailto:info@alpaka.ai" className="text-sm hover:text-[#DDA15E] transition-colors">
                  info@alpaka.ai
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#DDA15E]" />
                <Link href="tel:+1234567890" className="text-sm hover:text-[#DDA15E] transition-colors">
                  +1 (234) 567-890
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm text-[#FEFAE0]/60">
          <p>© {new Date().getFullYear()} Alpaka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
