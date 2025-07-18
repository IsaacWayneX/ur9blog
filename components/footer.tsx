import Link from "next/link"
import { Linkedin, Facebook, Instagram, Music } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              UR9 Blog
            </h3>
            <p className="text-gray-400">Sharing stories, insights, and adventures from around the world.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-yellow-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-yellow-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-yellow-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-yellow-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/blog/category/Travel" className="hover:text-yellow-400 transition-colors">
                  Travel
                </Link>
              </li>
              <li>
                <Link href="/blog/category/Technology" className="hover:text-yellow-400 transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/blog/category/Lifestyle" className="hover:text-yellow-400 transition-colors">
                  Lifestyle
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors p-2 rounded-full hover:bg-gray-800"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors p-2 rounded-full hover:bg-gray-800"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors p-2 rounded-full hover:bg-gray-800"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors p-2 rounded-full hover:bg-gray-800"
                aria-label="TikTok"
              >
                <Music className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 UR9 Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
