"use client"

import React, { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface SearchHeroProps {
  onSearchSubmit: (query: string) => void
  isCompact?: boolean
}

const PLACEHOLDERS = [
  "Cari rumah di BSD...",
  "Rumah 2 Miliar di Jaksel...",
  "Apartemen dekat MRT...",
  "Villa di Bali dengan kolam renang...",
]

export function SearchHero({ onSearchSubmit, isCompact = false }: SearchHeroProps) {
  const [query, setQuery] = useState("")
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  // Typing effect logic
  useEffect(() => {
    if (isFocused || query.length > 0) return // Stop typing when focused or has input

    const currentPlaceholder = PLACEHOLDERS[placeholderIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && displayText === currentPlaceholder) {
      // Wait before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText === "") {
      // Move to next string
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length)
      }, 500)
    } else {
      // Typing or deleting
      const nextDelay = isDeleting ? 30 : 50
      timeout = setTimeout(() => {
        setDisplayText((prev) => 
          isDeleting 
            ? prev.slice(0, -1) 
            : currentPlaceholder.slice(0, prev.length + 1)
        )
      }, nextDelay)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, placeholderIndex, isFocused, query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearchSubmit(query.trim())
    }
  }

  if (isCompact) {
    return (
      <form onSubmit={handleSubmit} className="relative flex-1 max-w-2xl mx-auto w-full">
        <div className="relative flex items-center w-full">
          <Search 
            className={`absolute left-4 w-5 h-5 transition-colors ${isFocused ? "text-blue-700" : "text-muted-foreground"}`} 
            aria-hidden="true" 
            strokeWidth={1.5}
          />
          <input
            type="text"
            className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-full text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Cari properti..."
            aria-label="Cari properti"
          />
        </div>
      </form>
    )
  }

  return (
    <div className="w-full relative z-10 px-4 md:px-0">
      <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
        <div className="relative flex items-center w-full rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2">
          <div className="relative flex-1 flex items-center h-14 md:h-16 pl-4 md:pl-6">
            <Search 
              className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${isFocused ? "text-blue-700" : "text-muted-foreground"}`} 
              aria-hidden="true" 
              strokeWidth={1.5}
            />
            <div className="relative w-full h-full flex items-center ml-3">
              <input
                type="text"
                className="w-full h-full bg-transparent text-slate-900 text-lg md:text-xl focus:outline-none z-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                aria-label="Cari properti"
              />
              {/* Fake animated placeholder */}
              {!query && (
                <div className="absolute inset-y-0 left-0 flex items-center text-slate-400 text-lg md:text-xl pointer-events-none whitespace-nowrap overflow-hidden">
                  {isFocused ? "Ketik apa saja..." : displayText}
                  {!isFocused && <span className="w-0.5 h-6 bg-slate-400 ml-1 animate-pulse"></span>}
                </div>
              )}
            </div>
          </div>
          <Button 
            type="submit" 
            className="h-12 md:h-14 px-8 rounded-full bg-blue-700 hover:bg-blue-800 text-white font-semibold text-base md:text-lg transition-colors flex-shrink-0"
          >
            Cari
          </Button>
        </div>
      </form>
    </div>
  )
}
