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
  const labels = await getLabels()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Blog Posts</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover our latest stories, insights, and adventures</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Posts Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="block group">
                  <Card className="overflow-hidden cursor-pointer bg-white">
                    <div className="relative h-48">
                      <Image src="https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnRhaW4lMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D" alt={post.title} fill className="object-cover transition-transform duration-200 group-hover:scale-105" />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {post.labels?.slice(0, 2).map((label) => (
                          <Badge key={label} variant="secondary" className="text-yellow-600">
                            <Link href={`/blog/category/${encodeURIComponent(label)}`}>{label}</Link>
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
                      <div
                        className="text-gray-600 line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: post.content?.substring(0, 150) + "..." || "",
                        }}
                      />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {labels.map((label) => (
                  <Link
                    key={label}
                    href={`/blog/category/${encodeURIComponent(label)}`}
                    className="block p-2 rounded hover:bg-yellow-50 transition-colors"
                  >
                    {label}
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
