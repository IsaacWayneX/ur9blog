"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Menu, X, Search, ChevronDown } from "lucide-react"

interface HeaderProps {
  labels: string[]
}

export function Header({ labels }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // Group categories by type for better organization
  const categorizedLabels = {
    "Travel & Places": labels.filter((label) =>
      ["Travel", "Japan", "Mountains", "Nature", "Photography"].includes(label),
    ),
    "Technology & Science": labels.filter((label) => ["Technology", "Science", "Space", "Astronomy"].includes(label)),
    "Lifestyle & Culture": labels.filter((label) =>
      ["Lifestyle", "Architecture", "History", "Urban", "Poetry", "City Life"].includes(label),
    ),
    Other: labels.filter(
      (label) =>
        ![
          "Travel",
          "Japan",
          "Mountains",
          "Nature",
          "Photography",
          "Technology",
          "Science",
          "Space",
          "Astronomy",
          "Lifestyle",
          "Architecture",
          "History",
          "Urban",
          "Poetry",
          "City Life",
        ].includes(label),
    ),
  }

  // Filter out empty categories
  const filteredCategories = Object.entries(categorizedLabels).filter(([_, labels]) => labels.length > 0)

  return (
    <header className="bg-white shadow-sm border-b relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent"
          >
            UR9 Blog
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-yellow-600 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-yellow-600 transition-colors">
              Blog
            </Link>

            {/* Categories with Hover Cards */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown("categories")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-yellow-600 transition-colors">
                Categories
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Desktop Hover Card */}
              <div
                className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[800px] transition-all duration-200 z-[9999] ${
                  activeDropdown === "categories" ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <Card className="shadow-xl border border-yellow-200 bg-white">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-3 gap-8">
                      {filteredCategories.map(([categoryName, categoryLabels]) => (
                        <div key={categoryName}>
                          <h4 className="font-semibold text-black mb-4 text-sm uppercase tracking-wide border-b border-gray-200 pb-2">
                            {categoryName}
                          </h4>
                          <div className="space-y-2">
                            {categoryLabels.map((label) => (
                              <Link
                                key={label}
                                href={`/blog/category/${encodeURIComponent(label)}`}
                                className="block text-sm text-gray-600 hover:text-yellow-600 transition-colors p-2 rounded hover:bg-yellow-50"
                              >
                                {label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
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
          <div className="lg:hidden py-4 border-t bg-white">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-gray-700 hover:text-yellow-600 transition-colors p-2 rounded hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-yellow-600 transition-colors p-2 rounded hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>

              {/* Mobile Categories Dropdown */}
              {filteredCategories.map(([categoryName, categoryLabels]) => (
                <MobileCategoryDropdown
                  key={categoryName}
                  categoryName={categoryName}
                  labels={categoryLabels}
                  onLinkClick={() => setIsMenuOpen(false)}
                />
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

function MobileCategoryDropdown({
  categoryName,
  labels,
  onLinkClick,
}: {
  categoryName: string
  labels: string[]
  onLinkClick: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-gray-700 hover:text-yellow-600 transition-colors p-2 rounded hover:bg-gray-50"
      >
        <span>{categoryName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="ml-4 mt-2 space-y-1">
          {labels.map((label) => (
            <Link
              key={label}
              href={`/blog/category/${encodeURIComponent(label)}`}
              className="block text-sm text-gray-600 hover:text-yellow-600 transition-colors p-2 rounded hover:bg-yellow-50"
              onClick={onLinkClick}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
