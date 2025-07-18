import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getBlogPost, getBlogPosts } from "@/lib/blogger"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.id,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.content?.substring(0, 160).replace(/<[^>]*>/g, "") || "",
    openGraph: {
      title: post.title,
      description: post.content?.substring(0, 160).replace(/<[^>]*>/g, "") || "",
      type: "article",
      publishedTime: post.published,
      authors: [post.author?.displayName || "Admin"],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>

          {/* Article Header */}
          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-64 md:h-96">
              <Image src="https://images.unsplash.com/photo-1612441804231-77a36b284856?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW91bnRhaW4lMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D" alt={post.title} fill className="object-cover" />
            </div>

            <div className="p-8">
              {/* Labels */}
              <div className="flex items-center gap-2 mb-4">
                {post.labels?.map((label) => (
                  <Badge key={label} variant="secondary" className="text-yellow-600">
                    <Link href={`/blog/category/${encodeURIComponent(label)}`}>{label}</Link>
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

              {/* Meta Info */}
              <div className="flex items-center gap-6 text-gray-500 mb-8 pb-8 border-b">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{post.author?.displayName || "Admin"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {new Date(post.published).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-yellow-600 prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              />
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
