"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MegaMenu } from "@/components/navigation/mega-menu"
import { Search, Menu, ArrowUp, Twitter, Facebook, Instagram, Linkedin, Sun, Moon } from "lucide-react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const menuItems = [
  {
    section: "Latest News",
    items: [
      { title: "AI & Machine Learning", href: "/ai" },
      { title: "Cybersecurity", href: "/cybersecurity" },
      { title: "Blockchain & Crypto", href: "/blockchain" },
      { title: "Space Tech", href: "/space-tech" },
    ],
  },
  {
    section: "Companies",
    items: [
      { title: "Apple", href: "/companies/apple" },
      { title: "Google", href: "/companies/google" },
      { title: "Microsoft", href: "/companies/microsoft" },
      { title: "Tesla", href: "/companies/tesla" },
    ],
  },
  {
    section: "Analysis",
    items: [
      { title: "Market Trends", href: "/analysis/market-trends" },
      { title: "Industry Reports", href: "/analysis/reports" },
      { title: "Expert Opinions", href: "/analysis/expert-opinions" },
      { title: "Future Predictions", href: "/analysis/predictions" },
    ],
  },
  {
    section: "Resources",
    items: [
      { title: "Tech Guides", href: "/guides" },
      { title: "Newsletters", href: "/newsletters" },
      { title: "Events", href: "/events" },
      { title: "Podcasts", href: "/podcasts" },
    ],
  },
]

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Add state for dark mode
  const [isDarkMode, setIsDarkMode] = useState(false)
  // Add state for back to top button
  const [showBackToTop, setShowBackToTop] = useState(false)
  // Add state for reading progress
  const [readingProgress, setReadingProgress] = useState(0)

  // Add effect for dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // Add effect for reading progress and back to top button
  useEffect(() => {
    const updateReadingProgress = () => {
      const currentProgress = window.scrollY
      const scrollHeight = document.body.scrollHeight - window.innerHeight
      if (scrollHeight) {
        setReadingProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100)
      }
    }

    // Add effect for back to top button
    const updateBackToTopVisibility = () => {
      setShowBackToTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", updateReadingProgress)
    window.addEventListener("scroll", updateBackToTopVisibility)

    return () => {
      window.removeEventListener("scroll", updateReadingProgress)
      window.removeEventListener("scroll", updateBackToTopVisibility)
    }
  }, [])

  // Add function for back to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          {/* Reading Progress Bar */}
          <div className="reading-progress-bar" style={{ width: `${readingProgress}%` }}></div>

          {/* Breaking News Ticker */}
          <div className="ticker-wrapper py-2 bg-red-50 border-y border-red-100 dark:bg-red-900/20 dark:border-red-900/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center">
                <Badge variant="destructive" className="mr-3 whitespace-nowrap">
                  Breaking
                </Badge>
                <div className="overflow-hidden">
                  <div className="ticker-content">
                    NVIDIA announces new AI chips with 2x performance • Apple's WWDC reveals major iOS updates • SpaceX
                    successfully launches Starship • Google unveils Gemini 2.0 with enhanced capabilities
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <header className="border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button className="md:hidden p-2 mr-2 text-gray-700 dark:text-gray-300">
                    <Menu className="h-6 w-6" />
                  </button>
                  <Link href="/" className="font-bold text-2xl dark:text-white">
                    Tech<span className="text-primary">Pulse</span>
                  </Link>
                </div>

                <nav className="hidden md:flex space-x-6 mx-6">
                  <MegaMenu items={menuItems} />
                  <Link
                    href="/reviews"
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  >
                    Reviews
                  </Link>
                  <Link
                    href="/ai"
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  >
                    AI
                  </Link>
                  <Link
                    href="/startups"
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  >
                    Startups
                  </Link>
                  <Link
                    href="/apps"
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  >
                    Apps
                  </Link>
                  <Link
                    href="/gear"
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  >
                    Gear
                  </Link>
                </nav>

                <div className="flex items-center space-x-4">
                  <div className="relative hidden md:block w-64">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search articles..."
                      className="pl-8 h-9 w-full dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                  <Button size="sm" className="hidden md:block bg-primary text-white hover:bg-primary/90">
                    Subscribe
                  </Button>
                  <button
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                  >
                    {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </button>
                  <button className="md:hidden p-2">
                    <Search className="h-5 w-5 dark:text-gray-300" />
                  </button>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 dark:bg-gray-900">{children}</main>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <Link href="/" className="font-bold text-2xl mb-4 block">
                    Tech<span className="text-primary">Pulse</span>
                  </Link>
                  <p className="text-gray-400 mb-4">
                    Your source for the latest technology news, reviews, and insights.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-4 text-lg">Categories</h3>
                  <ul className="space-y-2">
                    {["Tech News", "Reviews", "AI", "Startups", "Apps", "Gear", "Security", "Enterprise"].map(
                      (category, index) => (
                        <li key={index}>
                          <Link href="#" className="text-gray-400 hover:text-white">
                            {category}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-4 text-lg">Company</h3>
                  <ul className="space-y-2">
                    {[
                      "About Us",
                      "Contact",
                      "Careers",
                      "Advertise",
                      "Ethics Policy",
                      "Privacy Policy",
                      "Terms of Service",
                    ].map((link, index) => (
                      <li key={index}>
                        <Link href="#" className="text-gray-400 hover:text-white">
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-4 text-lg">Subscribe</h3>
                  <p className="text-gray-400 mb-4">Get the latest tech news delivered to your inbox.</p>
                  <div className="space-y-3">
                    <Input placeholder="Your email address" className="bg-gray-800 border-gray-700 text-white" />
                    <Button className="w-full bg-primary text-white hover:bg-primary/90">Subscribe</Button>
                  </div>
                </div>
              </div>
              <div className="pt-8 border-t border-gray-800 text-sm text-gray-400">
                <p>© 2023 TechPulse. All rights reserved.</p>
              </div>
            </div>
          </footer>

          {/* Back to Top Button */}
          <button className={`back-to-top ${showBackToTop ? "visible" : ""}`} onClick={scrollToTop}>
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </body>
    </html>
  )
}

