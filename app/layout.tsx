import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ClientLayout from "./client"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TechPulse - Latest Technology News, Reviews, and Insights",
  description:
    "Stay updated with the latest technology news, product reviews, and insights on AI, startups, apps, and more.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}



import './globals.css'