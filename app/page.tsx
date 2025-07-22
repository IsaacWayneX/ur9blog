import Link from "next/link"
import Image from "next/image"
import { getBlogPosts, getLabels } from "@/lib/blogger"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"

export default async function HomePage() {
  const posts = await getBlogPosts()
  const categories = await getLabels()

  const featuredPost = posts[0]
  const topStories = posts.slice(1, 4)
  const recentPosts = posts.slice(4, 8)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          {/* <p className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent font-medium mb-4">
            Our Blog
          </p> */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Stories & News</h1>
          {/* <p className="text-gray-600 max-w-2xl mx-auto">
            Explore breathtaking landscapes, iconic landmarks, and hidden gems around the globe
          </p> */}
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Post */}
            {featuredPost && (
              <Card className="mb-8 overflow-hidden">
                <div className="relative h-64 md:h-80">
                  <Image
                    src={featuredPost.image || "https://images.unsplash.com/photo-1612441804231-77a36b284856?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW91bnRhaW4lMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {featuredPost.categories?.slice(0, 2).map((category) => (
                      <Badge key={category} variant="secondary" className="text-yellow-600">
                        <Link href={`/blog/category/${encodeURIComponent(category)}`}>{category}</Link>
                      </Badge>
                    ))}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    <Link href={`/blog/${featuredPost.slug}`} className="hover:text-yellow-600 transition-colors">
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{featuredPost.author?.displayName || "Admin"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(featuredPost.published).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div
                    className="text-gray-600 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: featuredPost.content?.substring(0, 200) + "..." || "",
                    }}
                  />
                </CardContent>
              </Card>
            )}

            {/* Recent Posts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {recentPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={post.image || "https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnRhaW4lMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {post.categories?.slice(0, 1).map((category) => (
                        <Badge key={category} variant="outline" className="text-xs">
                          <Link href={`/blog/category/${encodeURIComponent(category)}`}>{category}</Link>
                        </Badge>
                      ))}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-yellow-600 transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{post.author?.displayName || "Admin"}</span>
                      <span>•</span>
                      <span>{new Date(post.published).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Top Stories</h3>
              <div className="space-y-4">
                {topStories.map((post, index) => (
                  <div key={post.id} className="flex gap-3">
                    <span className="text-2xl font-bold text-yellow-600 flex-shrink-0">{index + 1}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                        <Link href={`/blog/${post.slug}`} className="hover:text-yellow-600 transition-colors">
                          {post.title}
                        </Link>
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{post.author?.displayName || "Admin"}</span>
                        <span>•</span>
                        <span>{new Date(post.published).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 relative flex-shrink-0">
                      <Image
                        src={post.image || "https://images.unsplash.com/photo-1604223190546-a43e4c7f29d7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW4lMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D"}
                        alt={post.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Categories */}
            <Card className="p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge key={category} variant="outline" className="hover:bg-yellow-100 transition-colors">
                    <Link href={`/blog/category/${encodeURIComponent(category)}`}>{category}</Link>
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
