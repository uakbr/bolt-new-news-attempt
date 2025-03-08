import Parser from "rss-parser"

const parser = new Parser()

type CustomFeed = {
  title: string
  description: string
  link: string
}

type CustomItem = {
  title: string
  link: string
  content: string
  contentSnippet: string
  pubDate: string
  creator?: string
  categories?: string[]
}

export async function fetchRSSFeeds() {
  const techFeeds = [
    "https://feeds.feedburner.com/TechCrunch",
    "https://www.theverge.com/rss/index.xml",
    "https://www.wired.com/feed/rss",
    "https://feeds.arstechnica.com/arstechnica/index",
  ]

  try {
    const feedPromises = techFeeds.map((feed) => parser.parseURL(feed))
    const feeds = await Promise.all(feedPromises)

    const articles = feeds.flatMap((feed) =>
      feed.items.map((item) => ({
        title: item.title,
        link: item.link,
        content: item.content,
        contentSnippet: item.contentSnippet,
        pubDate: item.pubDate,
        creator: item.creator,
        categories: item.categories,
        source: feed.title,
      })),
    )

    // Sort by date
    articles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())

    return articles
  } catch (error) {
    console.error("Error fetching RSS feeds:", error)
    return []
  }
}

