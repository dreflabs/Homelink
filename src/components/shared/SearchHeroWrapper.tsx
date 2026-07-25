"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { SearchHero } from "./SearchHero"

export function SearchHeroWrapper({ isCompact = false }: { isCompact?: boolean }) {
  const router = useRouter()

  const handleSearchSubmit = (query: string) => {
    const params = new URLSearchParams()
    if (query) params.set("q", query)
    router.push(`/search-result?${params.toString()}`)
  }

  return <SearchHero onSearchSubmit={handleSearchSubmit} isCompact={isCompact} />
}
