import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { fetchAllRSSFeeds } from "@/lib/rss-fetch"
import { Brain, Cpu, Network, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "AI News & Analysis | TechPulse",
  description: "Latest artificial intelligence news, breakthroughs, applications, and expert analysis.",
}

export default async function AIPage() {
  const articles = await fetchAllRSSFeeds()
  const aiArticles = articles
    .filter(
      (article) =>
        article.title?.toLowerCase().includes("ai") ||
        article.title?.toLowerCase().includes("artificial intelligence") ||
        article.contentSnippet?.toLowerCase().includes("ai") ||
        article.contentSnippet?.toLowerCase().includes("artificial intelligence") ||
        article.categories?.some(
          (cat) => cat?.toLowerCase().includes("ai") || cat?.toLowerCase().includes("artificial intelligence"),
        ),
    )
    .slice(0, 12)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Artificial Intelligence News & Insights</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Stay updated with the latest breakthroughs, applications, and developments in AI technology
            </p>
          </div>
        </div>
      </section>

      {/* Key Areas Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Key Areas in AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Machine Learning",
                icon: Brain,
                description: "Advanced algorithms that enable systems to learn and improve from experience",
              },
              {
                title: "Neural Networks",
                icon: Network,
                description: "Deep learning architectures inspired by human brain networks",
              },
              {
                title: "Computer Vision",
                icon: Cpu,
                description: "AI systems that can understand and process visual information",
              },
              {
                title: "Natural Language",
                icon: Sparkles,
                description: "AI that can understand, interpret, and generate human language",
              },
            ].map((area, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-sm">
                <area.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-bold mb-2">{area.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest AI News */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Latest AI News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiArticles.map((article, index) => (
              <article
                key={index}
                className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video">
                  <Image
                    src={`/placeholder.svg?height=200&width=400&text=AI+News+${index + 1}`}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{article.source}</Badge>
                    <span className="text-sm text-gray-500">{new Date(article.pubDate).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-bold mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{article.contentSnippet}</p>
                  <Link href={article.link} target="_blank">
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

