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

export async function generateMetadata(props: BlogPostPageProps) {
  const { params } = await props
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

export default async function BlogPostPage(props: BlogPostPageProps) {
  const { params } = await props
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-80 md:h-[420px] lg:h-[500px] flex items-end">
        <Image
          src={post.image || "https://images.unsplash.com/photo-1612441804231-77a36b284856?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW91bnRhaW4lMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D"}
          alt={post.title}
          fill
          className="object-cover object-center z-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
        {/* Floating Back Button */}
        <div className="absolute top-6 left-6 z-20">
          <Button variant="secondary" size="icon" asChild className="rounded-full shadow-lg bg-white/80 hover:bg-white">
            <Link href="/blog">
              <ArrowLeft className="w-5 h-5 text-gray-800" />
            </Link>
          </Button>
        </div>
        {/* Hero Content */}
        <div className="relative z-20 p-8 pb-10 w-full max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories?.map((category) => (
              <Badge key={category} variant="secondary" className="text-white bg-yellow-600/90 hover:bg-yellow-700/90 text-sm px-3 py-1 rounded-full shadow">
                <Link href={`/blog/category/${encodeURIComponent(category)}`}>{category}</Link>
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-white/90 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author?.displayName || "Admin"}</span>
            </div>
            <span className="hidden md:inline">•</span>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.published).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="w-full flex justify-center -mt-10 pb-16 relative z-30">
        <div className="w-[80vw] max-w-5xl bg-white rounded-2xl shadow-md p-8 md:p-12 border border-gray-100">
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-yellow-600 prose-strong:text-gray-900 prose-img:rounded-xl prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />
          {/* Author Box */}
          <div className="flex items-center gap-4 mt-12 pt-8 border-t border-gray-100">
            <Image
              src={post.author?.image?.url || "/placeholder-user.jpg"}
              alt={post.author?.displayName || "Author"}
              width={48}
              height={48}
              className="rounded-full border border-gray-200 shadow-sm"
            />
            <div>
              <div className="font-semibold text-gray-900">{post.author?.displayName || "Admin"}</div>
              <div className="text-xs text-gray-500">Published {new Date(post.published).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
