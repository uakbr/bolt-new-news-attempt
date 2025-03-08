// Real RSS feed fetcher using native fetch API instead of https.get

export interface RSSItem {
  title: string
  link: string
  content?: string
  contentSnippet?: string
  pubDate: string
  creator?: string
  categories?: string[]
  source: string
}

export interface RSSFeed {
  title: string
  description?: string
  link: string
  items: RSSItem[]
}

// Helper function to parse XML
function extractValue(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>(.*?)<\/${tag}>`, "s")
  const match = xml.match(regex)
  return match ? match[1].trim() : ""
}

function extractCDATA(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[(.*?)\\]\\]><\/${tag}>`, "s")
  const match = xml.match(regex)
  return match ? match[1].trim() : extractValue(xml, tag)
}

function extractCategories(xml: string): string[] {
  const regex = /<category>(.*?)<\/category>/g
  const categories: string[] = []
  let match

  while ((match = regex.exec(xml)) !== null) {
    categories.push(match[1].trim())
  }

  return categories
}

// Parse an RSS item
function parseRSSItem(itemXml: string, sourceName: string): RSSItem {
  return {
    title: extractCDATA(itemXml, "title"),
    link: extractValue(itemXml, "link"),
    content: extractCDATA(itemXml, "content:encoded") || extractCDATA(itemXml, "description"),
    contentSnippet: extractCDATA(itemXml, "description"),
    pubDate: extractValue(itemXml, "pubDate"),
    creator: extractValue(itemXml, "dc:creator"),
    categories: extractCategories(itemXml),
    source: sourceName,
  }
}

// Parse an RSS feed
function parseRSSFeed(xml: string, sourceName: string): RSSFeed {
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  const items: RSSItem[] = []
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    items.push(parseRSSItem(match[1], sourceName))
  }

  return {
    title: extractValue(xml, "title"),
    description: extractValue(xml, "description"),
    link: extractValue(xml, "link"),
    items,
  }
}

// Fetch and parse an RSS feed
async function fetchRSSFeed(url: string, sourceName: string): Promise<RSSFeed> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; TechPulseBot/1.0; +https://techpulse.example.com)",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`)
    }

    const xml = await response.text()
    return parseRSSFeed(xml, sourceName)
  } catch (error) {
    console.error(`Error fetching RSS feed from ${url}:`, error)
    return {
      title: sourceName,
      link: url,
      items: [],
    }
  }
}

export async function fetchAllRSSFeeds() {
  const techFeeds = [
    { url: "https://feeds.feedburner.com/TechCrunch", name: "TechCrunch" },
    { url: "https://www.theverge.com/rss/index.xml", name: "The Verge" },
    { url: "https://www.wired.com/feed/rss", name: "Wired" },
    { url: "https://feeds.arstechnica.com/arstechnica/index", name: "Ars Technica" },
  ]

  try {
    const feedPromises = techFeeds.map((feed) => fetchRSSFeed(feed.url, feed.name))
    const feeds = await Promise.all(feedPromises)

    // Flatten all items from all feeds
    const allArticles = feeds.flatMap((feed) => feed.items)

    // Sort by date (newest first)
    allArticles.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime()
      const dateB = new Date(b.pubDate).getTime()
      return dateB - dateA
    })

    return allArticles
  } catch (error) {
    console.error("Error fetching RSS feeds:", error)
    // Fallback to mock data if real feeds fail
    const { fetchMockRSSFeeds } = await import("./mock-rss")
    return fetchMockRSSFeeds()
  }
}

// Categorize articles by topic
export function categorizeArticles(articles: RSSItem[]) {
  const tech = articles
    .filter((article) => !isAIArticle(article) && !isGadgetArticle(article) && !isBusinessArticle(article))
    .slice(0, 8)

  const ai = articles.filter((article) => isAIArticle(article)).slice(0, 8)
  const gadgets = articles.filter((article) => isGadgetArticle(article)).slice(0, 8)
  const business = articles.filter((article) => isBusinessArticle(article)).slice(0, 8)

  return {
    all: articles.slice(0, 8),
    tech,
    ai,
    gadgets,
    business,
  }
}

// Helper functions to categorize articles
function isAIArticle(article: RSSItem): boolean {
  const aiKeywords = [
    "ai",
    "artificial intelligence",
    "machine learning",
    "neural network",
    "deep learning",
    "gpt",
    "llm",
    "chatgpt",
  ]

  return containsKeywords(article, aiKeywords)
}

function isGadgetArticle(article: RSSItem): boolean {
  const gadgetKeywords = [
    "iphone",
    "android",
    "smartphone",
    "laptop",
    "headphone",
    "earbuds",
    "tablet",
    "watch",
    "wearable",
    "gadget",
    "device",
    "hardware",
  ]

  return containsKeywords(article, gadgetKeywords)
}

function isBusinessArticle(article: RSSItem): boolean {
  const businessKeywords = [
    "business",
    "startup",
    "funding",
    "ipo",
    "acquisition",
    "merger",
    "stock",
    "investor",
    "venture capital",
    "ceo",
    "revenue",
    "profit",
  ]

  return containsKeywords(article, businessKeywords)
}

function containsKeywords(article: RSSItem, keywords: string[]): boolean {
  const text = `${article.title} ${article.contentSnippet} ${article.categories?.join(" ") || ""}`.toLowerCase()

  return keywords.some((keyword) => text.includes(keyword))
}

