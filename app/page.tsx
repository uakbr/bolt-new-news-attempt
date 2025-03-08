import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  Bookmark,
  Share2,
  ChevronRight,
  Zap,
  Award,
  TrendingUp,
  Bell,
  BarChart2,
  Shield,
  Rocket,
  LinkIcon,
} from "lucide-react"
import { fetchAllRSSFeeds, categorizeArticles, type RSSItem } from "@/lib/rss-fetch"

// Helper function to format date
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch (e) {
    return dateString
  }
}

// Helper function to estimate read time
function estimateReadTime(content?: string): number {
  if (!content) return 3 // Default read time
  const words = content.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200)) // Assuming 200 words per minute reading speed
}

// Article card component
function ArticleCard({ article }: { article: RSSItem }) {
  return (
    <div className="enhanced-card bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm">
      <div className="relative aspect-[3/2] w-full">
        <Image
          src={`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(article.source)}`}
          alt={article.title}
          width={300}
          height={200}
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <Badge className="mb-2 bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-200 border-none">
          {article.source}
        </Badge>
        <h3 className="font-bold mb-2 line-clamp-2 dark:text-white">{article.title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{formatDate(article.pubDate)}</span>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{estimateReadTime(article.content)} min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function Home() {
  // Fetch RSS feeds
  const articles = await fetchAllRSSFeeds()

  // Categorize articles
  const categorized = categorizeArticles(articles)

  return (
    <>
      {/* Hero Section - Featured Article */}
      <section className="bg-white dark:bg-gray-900 py-6 md:py-10 border-b dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 animate-fade-in">
              <div className="flex space-x-2 mb-4">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">Breaking News</Badge>
                <span className="trending-badge flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> Trending
                </span>
              </div>
              <h1 className="headline-xl mb-4 dark:text-white">
                {categorized.all[0]?.title || "Apple Unveils Revolutionary AI Features in iOS 18 at WWDC"}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                {categorized.all[0]?.contentSnippet ||
                  "The tech giant's latest software update introduces groundbreaking AI capabilities that will transform how users interact with their devices, promising enhanced productivity and creativity."}
              </p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                <div className="flex items-center mr-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=32&width=32"
                      alt="Author"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <span>{categorized.all[0]?.creator || categorized.all[0]?.source || "Sarah Johnson"}</span>
                </div>
                <span className="mr-4">{formatDate(categorized.all[0]?.pubDate || new Date().toString())}</span>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{estimateReadTime(categorized.all[0]?.content)} min read</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-primary text-white hover:bg-primary/90" asChild>
                  <Link href={categorized.all[0]?.link || "#"} target="_blank">
                    Read Full Article
                  </Link>
                </Button>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <Bookmark className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 animate-fade-in">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/placeholder.svg?height=450&width=800"
                  alt={categorized.all[0]?.title || "Featured Article"}
                  width={800}
                  height={450}
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">Featured</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section with Tabs */}
      <section className="py-10 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="headline-md dark:text-white">Trending Now</h2>
            <Link href="#" className="text-primary flex items-center text-sm font-medium">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 bg-white dark:bg-gray-700 p-1 rounded-lg">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="tech">Tech</TabsTrigger>
              <TabsTrigger value="ai">AI</TabsTrigger>
              <TabsTrigger value="gadgets">Gadgets</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {categorized.all.slice(1, 5).map((article, index) => (
                  <ArticleCard key={index} article={article} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tech" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {categorized.tech.length > 0 ? (
                  categorized.tech.slice(0, 4).map((article, index) => <ArticleCard key={index} article={article} />)
                ) : (
                  <div className="p-12 text-center text-gray-500 dark:text-gray-400 col-span-4">
                    No tech articles found. Please check back later.
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="ai" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {categorized.ai.length > 0 ? (
                  categorized.ai.slice(0, 4).map((article, index) => <ArticleCard key={index} article={article} />)
                ) : (
                  <div className="p-12 text-center text-gray-500 dark:text-gray-400 col-span-4">
                    No AI articles found. Please check back later.
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="gadgets" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {categorized.gadgets.length > 0 ? (
                  categorized.gadgets.slice(0, 4).map((article, index) => <ArticleCard key={index} article={article} />)
                ) : (
                  <div className="p-12 text-center text-gray-500 dark:text-gray-400 col-span-4">
                    No gadget articles found. Please check back later.
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="business" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {categorized.business.length > 0 ? (
                  categorized.business
                    .slice(0, 4)
                    .map((article, index) => <ArticleCard key={index} article={article} />)
                ) : (
                  <div className="p-12 text-center text-gray-500 dark:text-gray-400 col-span-4">
                    No business articles found. Please check back later.
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="py-10 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="headline-md mb-6 dark:text-white">Featured Topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                title: "Artificial Intelligence",
                image: "/placeholder.svg?height=200&width=300",
                articles: categorized.ai.length,
                icon: <Zap className="h-5 w-5" />,
              },
              {
                title: "Cybersecurity",
                image: "/placeholder.svg?height=200&width=300",
                articles: 38,
                icon: <Shield className="h-5 w-5" />,
              },
              {
                title: "Blockchain",
                image: "/placeholder.svg?height=200&width=300",
                articles: 25,
                icon: <LinkIcon className="h-5 w-5" />,
              },
              {
                title: "Space Tech",
                image: "/placeholder.svg?height=200&width=300",
                articles: 19,
                icon: <Rocket className="h-5 w-5" />,
              },
            ].map((topic, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden group enhanced-card">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10"></div>
                <Image
                  src={topic.image || "/placeholder.svg"}
                  alt={topic.title}
                  width={300}
                  height={200}
                  className="object-cover h-40 w-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 p-4 z-20 w-full">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-primary/80 rounded-full flex items-center justify-center mr-2">
                      {topic.icon}
                    </div>
                    <h3 className="text-white font-bold">{topic.title}</h3>
                  </div>
                  <p className="text-white/80 text-sm">{topic.articles} articles</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Section - New */}
      <section className="py-10 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Award className="h-6 w-6 mr-2 text-primary" />
              <h2 className="headline-md dark:text-white">Editor's Picks</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md enhanced-card">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <div className="relative h-full">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt={categorized.all[5]?.title || "Editorial Feature"}
                        width={600}
                        height={400}
                        className="object-cover h-full w-full"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-white">Editor's Choice</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:w-1/2">
                    <h3 className="headline-sm mb-4 dark:text-white">
                      {categorized.all[5]?.title || "The Ethical Dilemmas of AI: Where Do We Draw the Line?"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {categorized.all[5]?.contentSnippet ||
                        "As artificial intelligence becomes increasingly integrated into our daily lives, we must confront the ethical questions it raises. From privacy concerns to algorithmic bias, the challenges are complex and multifaceted."}
                    </p>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Author"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">
                          {categorized.all[5]?.creator || categorized.all[5]?.source || "Dr. Robert Chen"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {categorized.all[5]?.source || "AI Ethics Specialist"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                      <span className="mr-4">{formatDate(categorized.all[5]?.pubDate || new Date().toString())}</span>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{estimateReadTime(categorized.all[5]?.content)} min read</span>
                      </div>
                    </div>
                    <Button className="bg-primary text-white hover:bg-primary/90" asChild>
                      <Link href={categorized.all[5]?.link || "#"} target="_blank">
                        Read Full Article
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-4">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md h-full">
                <h3 className="font-bold text-lg mb-4 dark:text-white">Tech Insights</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <BarChart2 className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1 dark:text-white">Tech Market Trends</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        The tech sector has seen a 15% growth in Q2 2023, with AI companies leading the charge.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Bell className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1 dark:text-white">Upcoming Events</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Mark your calendar for the Global Tech Summit on July 15-17, featuring industry leaders.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <TrendingUp className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1 dark:text-white">Emerging Technologies</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Quantum computing and brain-computer interfaces are poised to disrupt multiple industries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

