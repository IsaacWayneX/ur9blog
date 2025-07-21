interface BlogPost {
  id: string
  slug: string
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
  categories?: string[]
  image?: string
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
    slug: "unveiling-the-majestic-beauty-of-mount-fuji",
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
    categories: ["Travel", "Japan", "Mountains"],
  },
  {
    id: "2",
    slug: "mountains-and-boat-a-perfect-harmony",
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
    categories: ["Travel", "Nature", "Photography"],
  },
  {
    id: "3",
    slug: "unveiling-the-timeless-charm-of-old-street-buildings",
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
    categories: ["Architecture", "History", "Urban"],
  },
  {
    id: "4",
    slug: "whispering-trees-and-the-enchanting-moon",
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
    categories: ["Nature", "Poetry", "Night Photography"],
  },
  {
    id: "5",
    slug: "the-pulse-of-the-city-unfolds-on-the-fast-lanes",
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
    categories: ["Urban", "City Life", "Transportation"],
  },
  {
    id: "6",
    slug: "a-cosmic-adventure-underneath-the-starlit-canopy",
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
    categories: ["Space", "Astronomy", "Science"],
  },
]

// Utility to fetch from Blogger public JSON feed and map to BlogPost[]
export async function fetchBloggerFeedPosts(): Promise<BlogPost[]> {
  const FEED_URL = "https://ur9group.blogspot.com/feeds/posts/default?alt=json";
  function extractFirstImage(html: string): string | undefined {
    const match = html.match(/<img[^>]+src=["']([^"'>]+)["']/i);
    if (!match) return undefined;
    let url = match[1];
    // Ensure absolute URL
    if (url && url.startsWith("//")) url = "https:" + url;
    if (url && url.startsWith("/")) url = "https://ur9group.blogspot.com" + url;
    return url;
  }
  function extractSlugFromUrl(url: string): string {
    try {
      const u = new URL(url);
      // Blogger post URLs are like /2024/06/the-role-of-smart-technology.html
      // We'll use the last segment without .html
      const parts = u.pathname.split("/").filter(Boolean);
      let last = parts[parts.length - 1] || "";
      if (last.endsWith(".html")) last = last.replace(/\.html$/, "");
      return last;
    } catch {
      return url;
    }
  }
  try {
    const response = await fetch(FEED_URL, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error("Failed to fetch Blogger feed");
    const data = await response.json();
    if (!data.feed || !Array.isArray(data.feed.entry)) return [];
    return data.feed.entry.map((entry: any) => {
      const content = entry.content?.$t || "";
      const altLink = entry.link?.find((l: any) => l.rel === "alternate")?.href || "#";
      return {
        id: entry.id?.$t || entry.id || entry.published?.$t || Math.random().toString(),
        slug: extractSlugFromUrl(altLink),
        title: entry.title?.$t || "Untitled",
        content,
        published: entry.published?.$t || "",
        updated: entry.updated?.$t || "",
        url: altLink,
        author: {
          id: entry.author?.[0]?.name?.$t || "",
          displayName: entry.author?.[0]?.name?.$t || "",
          url: entry.author?.[0]?.uri?.$t || "",
          image: { url: "/placeholder-user.jpg" },
        },
        categories: (entry.category || []).map((cat: any) => cat.term),
        image: extractFirstImage(content),
      };
    });
  } catch (e) {
    console.error("Error fetching Blogger feed:", e);
    return [];
  }
}

// Update getBlogPosts to use the new fetch function
export async function getBlogPosts(): Promise<BlogPost[]> {
  // Use the Blogger public feed for now
  const posts = await fetchBloggerFeedPosts();
  if (posts.length > 0) return posts;
  // fallback to mock data for development
  return mockPosts.map((post) => ({ ...post, categories: post.categories }));
}

// Update getBlogPost to fetch by slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
}

// Update getLabels to getCategories and use categories
export async function getCategories(): Promise<string[]> {
  const posts = await getBlogPosts();
  const categories = Array.from(new Set(posts.flatMap((post) => post.categories || [])));
  return categories.sort();
}

// For backward compatibility, export getLabels as getCategories
export { getCategories as getLabels };

// Update mockPosts to include slug for dev/demo
mockPosts.forEach((post) => {
  if (!post.slug) {
    post.slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
});
