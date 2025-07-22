import Link from "next/link"
import Image from "next/image"
import { getBlogPosts, getLabels } from "@/lib/blogger"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"

export const metadata = {
  title: "All Blog Posts",
  description: "Explore all our blog posts about travel, technology, and more.",
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  const categories = await getLabels()

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Blog Posts</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover our latest stories, insights, and adventures</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Posts Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <div key={post.id}>
                  {/* Mobile: no card wrapper */}
                  <div className="block md:hidden mb-6">
                    <div className="relative h-48 w-full">
                      <Image src={post.image || "https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnRhaW4lMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D"} alt={post.title} fill className="object-cover object-center" />
                    </div>
                    <div className="w-[90vw] mx-auto py-4">
                      <div className="flex items-center gap-2 mb-2">
                        {post.categories?.slice(0, 2).map((category) => (
                          <Badge key={category} variant="secondary" className="text-yellow-600 text-xs">
                            <Link href={`/blog/category/${encodeURIComponent(category)}`}>{category}</Link>
                          </Badge>
                        ))}
                      </div>
                      <h2 className={`font-bold text-gray-900 mb-2 line-clamp-2 ${post.title.length > 50 ? "text-sm" : "text-lg"}`}>
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author?.displayName || "Admin"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.published).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="text-gray-600 line-clamp-3 mb-2" dangerouslySetInnerHTML={{ __html: post.content?.substring(0, 150) + "..." || "" }} />
                    </div>
                  </div>
                  {/* Desktop: card wrapper */}
                  <Link href={`/blog/${post.slug}`} className="hidden md:block group">
                    <Card className="overflow-hidden cursor-pointer bg-white">
                      <div className="relative h-48 w-full flex justify-center items-center">
                        <Image src={post.image || "https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnRhaW4lMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D"} alt={post.title} fill className="object-cover object-center transition-transform duration-200 group-hover:scale-105" />
                      </div>
                      <CardContent className="p-6 min-h-[220px] flex flex-col justify-between">
                        <div className="flex items-center gap-2 mb-3">
                          {post.categories?.slice(0, 2).map((category) => (
                            <Badge key={category} variant="secondary" className="text-yellow-600">
                              <Link href={`/blog/category/${encodeURIComponent(category)}`}>{category}</Link>
                            </Badge>
                          ))}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                          {post.title}
                        </h2>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{post.author?.displayName || "Admin"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.published).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.content?.substring(0, 150) + "..." || "" }} />
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/blog/category/${encodeURIComponent(category)}`}
                    className="block p-2 rounded hover:bg-yellow-50 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
