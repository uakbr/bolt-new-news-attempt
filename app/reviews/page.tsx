import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { fetchAllRSSFeeds } from "@/lib/rss-fetch"
import { Star, ThumbsUp, ThumbsDown } from "lucide-react"

export const metadata: Metadata = {
  title: "Tech Reviews | TechPulse",
  description: "In-depth reviews of the latest gadgets, software, and tech products.",
}

export default async function ReviewsPage() {
  const articles = await fetchAllRSSFeeds()
  const reviewArticles = articles
    .filter(
      (article) =>
        article.title?.toLowerCase().includes("review") ||
        article.contentSnippet?.toLowerCase().includes("review") ||
        article.categories?.some((cat) => cat?.toLowerCase().includes("review")),
    )
    .slice(0, 9)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Expert Tech Reviews</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Comprehensive, unbiased reviews of the latest technology products
            </p>
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Featured Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "iPhone 15 Pro Max",
                rating: 4.8,
                image: "/placeholder.svg?height=300&width=400&text=iPhone+15+Pro+Max",
                pros: ["Exceptional camera system", "Powerful A17 Pro chip", "Premium build quality"],
                cons: ["Premium price", "Heavy weight", "USB-C transition"],
              },
              {
                title: "Samsung Galaxy S24 Ultra",
                rating: 4.7,
                image: "/placeholder.svg?height=300&width=400&text=Galaxy+S24+Ultra",
                pros: ["Advanced AI features", "Excellent display", "S Pen functionality"],
                cons: ["Expensive", "Large size", "Similar design to S23"],
              },
              {
                title: "MacBook Pro M3 Max",
                rating: 4.9,
                image: "/placeholder.svg?height=300&width=400&text=MacBook+Pro+M3",
                pros: ["Incredible performance", "Outstanding battery life", "Beautiful display"],
                cons: ["High price tag", "Limited ports", "No Face ID"],
              },
            ].map((review, index) => (
              <div key={index} className="bg-card rounded-lg overflow-hidden shadow-lg">
                <div className="relative aspect-[4/3]">
                  <Image src={review.image || "/placeholder.svg"} alt={review.title} fill className="object-cover" />
                  <div className="absolute top-4 right-4 bg-black/70 text-white rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{review.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{review.title}</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                        <span className="font-medium">Pros</span>
                      </div>
                      <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                        {review.pros.map((pro, i) => (
                          <li key={i}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <ThumbsDown className="h-4 w-4 text-red-500" />
                        <span className="font-medium">Cons</span>
                      </div>
                      <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                        {review.cons.map((con, i) => (
                          <li key={i}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Button className="w-full mt-6">Read Full Review</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Reviews */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Latest Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviewArticles.map((article, index) => (
              <article
                key={index}
                className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video">
                  <Image
                    src={`/placeholder.svg?height=200&width=400&text=Review+${index + 1}`}
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
                      Read Review
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Review Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Smartphones", count: 45 },
              { title: "Laptops", count: 32 },
              { title: "Gaming", count: 28 },
              { title: "Audio", count: 24 },
              { title: "Smart Home", count: 19 },
              { title: "Wearables", count: 21 },
              { title: "Cameras", count: 15 },
              { title: "Software", count: 37 },
            ].map((category, index) => (
              <Link
                key={index}
                href={`/reviews/${category.title.toLowerCase()}`}
                className="bg-card rounded-lg p-6 text-center hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold mb-2">{category.title}</h3>
                <p className="text-sm text-gray-500">{category.count} reviews</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

