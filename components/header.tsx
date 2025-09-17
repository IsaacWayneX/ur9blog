"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, X, Search } from "lucide-react"

interface HeaderProps {
  labels: string[]
}

export function Header({ labels: categories }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-black shadow-sm border-b relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="UR9 Blog Logo" width={50} height={50} />
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">UR9 Blog</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 transition-all">
              Home
            </Link>
            <Link href="/blog" className="font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 transition-all">
              Blog
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/blog/category/${encodeURIComponent(category)}`}
                className="font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 transition-all"
              >
                {category}
              </Link>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2">
              <Input type="search" placeholder="Search..." className="w-48" />
              <Button size="sm" variant="ghost">
                <Search className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t bg-black">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 transition-all p-2 rounded hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 transition-all p-2 rounded hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>

              {/* Mobile Categories */}
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/blog/category/${encodeURIComponent(category)}`}
                  className="font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 transition-all p-2 rounded hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}

              {/* Mobile Search */}
              <div className="flex items-center gap-2 pt-4 px-2">
                <Input type="search" placeholder="Search..." className="flex-1" />
                <Button size="sm" variant="ghost">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

