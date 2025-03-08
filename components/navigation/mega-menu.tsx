"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface MenuItem {
  title: string
  href: string
  description?: string
}

interface MegaMenuProps {
  items: {
    section: string
    items: MenuItem[]
  }[]
}

export function MegaMenu({ items }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={menuRef} className="relative">
      <button
        className="flex items-center space-x-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Tech News</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "transform rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-screen max-w-screen-xl bg-white dark:bg-gray-800 shadow-lg rounded-b-lg mt-2 p-6 z-50">
          <div className="grid grid-cols-4 gap-6">
            {items.map((section, index) => (
              <div key={index} className="space-y-3">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{section.section}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                      {item.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Featured</h3>
              <div className="flex items-start space-x-3">
                <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=64&width=64"
                    alt="Featured"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">The Future of Quantum Computing</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    How quantum computers will revolutionize technology
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

