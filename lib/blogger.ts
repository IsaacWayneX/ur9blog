interface BlogPost {
  id: string
  title: string
  content: string
  published: string
  updated: string
  url: string
  author: {
    id: string
    displayName: string
    url: string
    image: {
      url: string
    }
  }
  labels?: string[]
}

interface BloggerResponse {
  items: BlogPost[]
}

const BLOGGER_API_KEY = process.env.BLOGGER_API_KEY
const BLOGGER_BLOG_ID = process.env.BLOGGER_BLOG_ID

if (!BLOGGER_API_KEY || !BLOGGER_BLOG_ID) {
  console.warn("Blogger API credentials not found. Using mock data.")
}

// Mock data for development/demo purposes
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Unveiling The Majestic Beauty Of Mount Fuji",
    content: `<p>A Journey To Japan's Iconic Symbol And Natural Wonder. Discover The Rich History, Breathtaking Landscapes, And Cultural Significance Of This Iconic Landmark.</p>
    <p>Mount Fuji stands as one of Japan's most recognizable symbols, attracting millions of visitors each year. This majestic volcano, with its perfectly symmetrical cone shape, has inspired artists, poets, and travelers for centuries.</p>
    <p>The mountain's cultural significance extends far beyond its physical beauty. It has been considered sacred by the Japanese people for over a thousand years, and climbing it is seen as a spiritual journey.</p>`,
    published: "2024-01-24T10:00:00Z",
    updated: "2024-01-24T10:00:00Z",
    url: "#",
    author: {
      id: "1",
      displayName: "John Smith",
      url: "#",
      image: { url: "/placeholder.svg?height=40&width=40" },
    },
    labels: ["Travel", "Japan", "Mountains"],
  },
  {
    id: "2",
    title: "Mountains and Boat: A Perfect Harmony",
    content: `<p>Exploring the serene beauty where mountains meet water, creating breathtaking landscapes that inspire wanderlust.</p>
    <p>There's something magical about the combination of towering peaks and tranquil waters. Whether it's a mountain lake reflecting snow-capped summits or a coastal range meeting the ocean, these landscapes offer some of the most spectacular views on Earth.</p>`,
    published: "2024-01-24T08:00:00Z",
    updated: "2024-01-24T08:00:00Z",
    url: "#",
    author: {
      id: "1",
      displayName: "John Smith",
      url: "#",
      image: { url: "/placeholder.svg?height=40&width=40" },
    },
    labels: ["Travel", "Nature", "Photography"],
  },
  {
    id: "3",
    title: "Unveiling the Timeless Charm of Old Street Buildings",
    content: `<p>Step back in time as we explore the architectural wonders and historical significance of vintage street buildings.</p>
    <p>Old street buildings tell stories of bygone eras, each brick and beam holding memories of the past. These architectural treasures offer glimpses into different periods of history, showcasing various building styles and cultural influences.</p>`,
    published: "2024-01-24T06:00:00Z",
    updated: "2024-01-24T06:00:00Z",
    url: "#",
    author: {
      id: "1",
      displayName: "John Smith",
      url: "#",
      image: { url: "/placeholder.svg?height=40&width=40" },
    },
    labels: ["Architecture", "History", "Urban"],
  },
  {
    id: "4",
    title: "Whispering Trees and the Enchanting Moon",
    content: `<p>Discover the mystical connection between nature's giants and our celestial companion in this poetic exploration.</p>
    <p>Under the moonlight, trees take on an ethereal quality, their branches reaching toward the sky like ancient guardians. This magical interplay between earth and sky has inspired countless stories and legends throughout human history.</p>`,
    published: "2024-01-24T04:00:00Z",
    updated: "2024-01-24T04:00:00Z",
    url: "#",
    author: {
      id: "1",
      displayName: "John Smith",
      url: "#",
      image: { url: "/placeholder.svg?height=40&width=40" },
    },
    labels: ["Nature", "Poetry", "Night Photography"],
  },
  {
    id: "5",
    title: "The Pulse of the City Unfolds on the Fast Lanes",
    content: `<p>Experience the rhythm and energy of urban life through the bustling highways and city streets.</p>
    <p>City highways are the arteries of modern urban life, carrying the lifeblood of commerce, culture, and human connection. The constant flow of traffic tells the story of a city's heartbeat, its dreams and ambitions.</p>`,
    published: "2024-01-15T10:00:00Z",
    updated: "2024-01-15T10:00:00Z",
    url: "#",
    author: {
      id: "2",
      displayName: "Christina Wu",
      url: "#",
      image: { url: "/placeholder.svg?height=40&width=40" },
    },
    labels: ["Urban", "City Life", "Transportation"],
  },
  {
    id: "6",
    title: "A Cosmic Adventure Underneath the Starlit Canopy",
    content: `<p>Join us on a celestial journey through the cosmos, exploring the wonders of the night sky and the mysteries of space.</p>
    <p>The night sky has always been humanity's first window into the cosmos. From ancient astronomers to modern space explorers, we've been captivated by the stars, planets, and galaxies that surround us.</p>`,
    published: "2024-01-17T10:00:00Z",
    updated: "2024-01-17T10:00:00Z",
    url: "#",
    author: {
      id: "3",
      displayName: "Alex Whitney",
      url: "#",
      image: { url: "/placeholder.svg?height=40&width=40" },
    },
    labels: ["Space", "Astronomy", "Science"],
  },
]

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!BLOGGER_API_KEY || !BLOGGER_BLOG_ID) {
    // Return mock data for development
    return mockPosts
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/blogger/v3/blogs/${BLOGGER_BLOG_ID}/posts?key=${BLOGGER_API_KEY}`,
      { next: { revalidate: 60 } },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch posts")
    }

    const data: BloggerResponse = await response.json()
    return data.items || []
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return mockPosts // Fallback to mock data
  }
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  if (!BLOGGER_API_KEY || !BLOGGER_BLOG_ID) {
    // Return mock data for development
    return mockPosts.find((post) => post.id === id) || null
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/blogger/v3/blogs/${BLOGGER_BLOG_ID}/posts/${id}?key=${BLOGGER_API_KEY}`,
      { next: { revalidate: 60 } },
    )

    if (!response.ok) {
      return null
    }

    const post: BlogPost = await response.json()
    return post
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return mockPosts.find((post) => post.id === id) || null
  }
}

export async function getLabels(): Promise<string[]> {
  const posts = await getBlogPosts()
  const labels = Array.from(new Set(posts.flatMap((post) => post.labels || [])))
  return labels.sort()
}
