import Link from "next/link"
import Image from "next/image"
import { getBlogPosts, getLabels } from "@/lib/blogger"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CategoryPageProps {
  params: {
    label: string
  }
}

export async function generateStaticParams() {
  const categories = await getLabels()
  return categories.map((category) => ({
    label: encodeURIComponent(category),
  }))
}

export async function generateMetadata(props: CategoryPageProps) {
  const { params } = await props
  const decodedLabel = decodeURIComponent(params.label)

  return {
    title: `${decodedLabel} - Blog Category`,
    description: `Explore all blog posts in the ${decodedLabel} category.`,
  }
}

export default async function CategoryPage(props: CategoryPageProps) {
  const { params } = await props
  const decodedLabel = decodeURIComponent(params.label)
  const allPosts = await getBlogPosts()
  const posts = allPosts.filter((post) => post.categories?.includes(decodedLabel))

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>

          {/* Category Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Category: {decodedLabel}</h1>
            <p className="text-gray-600">
              {posts.length} post{posts.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={post.image || "https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnRhaW4lMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D"} alt={post.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {post.categories?.slice(0, 2).map((category) => (
                      <Badge key={category} variant="secondary" className="text-yellow-600">
                        <Link href={`/blog/category/${encodeURIComponent(category)}`}>{category}</Link>
                      </Badge>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-yellow-600 transition-colors">
                      {post.title}
                    </Link>
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
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
