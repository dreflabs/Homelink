"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { SearchHero } from "./SearchHero"
import { useTranslations } from "next-intl"

export function SearchHeroWrapper({ isCompact = false }: { isCompact?: boolean }) {
  const router = useRouter()
  const [intent, setIntent] = useState("beli")
  const t = useTranslations("SearchHero")

  const handleSearchSubmit = (query: string) => {
    const params = new URLSearchParams()
    if (query) params.set("q", query)
    params.set("intent", intent)
    router.push(`/search-result?${params.toString()}`)
  }

  if (isCompact) {
    return <SearchHero onSearchSubmit={handleSearchSubmit} isCompact={isCompact} />
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Intent Tabs */}
      <div className="flex bg-white/80 backdrop-blur-md p-1.5 rounded-full mb-6 border border-slate-200 shadow-sm relative z-10 w-fit">
        <button
          onClick={() => setIntent("beli")}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
            intent === "beli"
              ? "bg-slate-900 text-white shadow-md"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >{t("intent_buy")}</button>
        <button
          onClick={() => setIntent("sewa")}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
            intent === "sewa"
              ? "bg-slate-900 text-white shadow-md"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >{t("intent_rent")}</button>
        <button
          onClick={() => setIntent("jual")}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
            intent === "jual"
              ? "bg-slate-900 text-white shadow-md"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >{t("intent_sell")}</button>
      </div>

      <SearchHero onSearchSubmit={handleSearchSubmit} isCompact={isCompact} />
    </div>
  )
}
