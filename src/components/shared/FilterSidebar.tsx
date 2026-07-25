"use client"

import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

export function FilterSidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "")
  const [city, setCity] = useState(searchParams.get("city") || "")
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const params = new URLSearchParams(searchParams.toString())
    
    if (minPrice) params.set("minPrice", minPrice)
    else params.delete("minPrice")
    
    if (maxPrice) params.set("maxPrice", maxPrice)
    else params.delete("maxPrice")
    
    if (city) params.set("city", city)
    else params.delete("city")
    
    if (bedrooms) params.set("bedrooms", bedrooms)
    else params.delete("bedrooms")

    // Reset to page 1 on new filter
    params.delete("cursor")
    
    router.push(`/search-result?${params.toString()}`)
  }

  const clearFilters = () => {
    setMinPrice("")
    setMaxPrice("")
    setCity("")
    setBedrooms("")
    
    const params = new URLSearchParams(searchParams.toString())
    params.delete("minPrice")
    params.delete("maxPrice")
    params.delete("city")
    params.delete("bedrooms")
    params.delete("cursor")
    
    router.push(`/search-result?${params.toString()}`)
  }

  return (
    <div className="w-full bg-slate-50 rounded-2xl p-6 border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">Filter</h2>
        <button 
          type="button" 
          onClick={clearFilters}
          className="text-sm font-medium text-blue-700 hover:text-blue-800 transition-colors"
        >
          Reset
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* City Filter */}
        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium text-slate-700">
            Kota
          </label>
          <select 
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            <option value="">Semua Kota</option>
            <option value="Jakarta Selatan">Jakarta Selatan</option>
            <option value="Jakarta Pusat">Jakarta Pusat</option>
            <option value="Tangerang">Tangerang</option>
            <option value="Tangerang Selatan">Tangerang Selatan</option>
            <option value="Bali">Bali</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Rentang Harga
          </label>
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              placeholder="Min" 
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
            <span className="text-slate-400">-</span>
            <input 
              type="number" 
              placeholder="Max" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>
        </div>

        {/* Bedrooms Filter */}
        <div className="space-y-2">
          <label htmlFor="bedrooms" className="text-sm font-medium text-slate-700">
            Kamar Tidur
          </label>
          <select 
            id="bedrooms"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            <option value="">Semua</option>
            <option value="1">1+ Kamar</option>
            <option value="2">2+ Kamar</option>
            <option value="3">3+ Kamar</option>
            <option value="4">4+ Kamar</option>
            <option value="5">5+ Kamar</option>
          </select>
        </div>

        <Button type="submit" className="w-full h-11 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-medium">
          Terapkan Filter
        </Button>
      </form>
    </div>
  )
}
