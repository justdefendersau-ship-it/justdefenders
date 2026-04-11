// ------------------------------------------------------
// File: app/parts/page.tsx
// Timestamp: 18 March 2026 10:40
// JustDefenders ©
//
// Smart Parts Search Page
// Ranked + Region Filtering + Live Database
// ------------------------------------------------------

"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

type Part = {
  id: string
  name: string
  category: string
  price?: number
  supplier?: string
  supplier_country?: string
  reliability_score?: number
}

export default function PartsPage() {

  const searchParams = useSearchParams()
  const component = searchParams.get("component")

  const [recommendations, setRecommendations] = useState<string[]>([])
  const [parts, setParts] = useState<Part[]>([])
  const [loading, setLoading] = useState(false)
  const [region, setRegion] = useState("all")

  // STEP 1 — Get recommended categories
  useEffect(() => {

    if (!component) return

    fetch(`/api/parts-recommendations?component=${component}`)
      .then(res => res.json())
      .then(data => {

        setRecommendations(data.recommendations || [])

      })

  }, [component])

  // STEP 2 — Fetch ranked parts from database
  useEffect(() => {

    if (recommendations.length === 0) return

    setLoading(true)

    const query = recommendations.join(",")

    fetch(`/api/parts-search?categories=${query}&region=${region}`)
      .then(res => res.json())
      .then(data => {

        if (Array.isArray(data)) {
          setParts(data)
        } else {
          setParts([])
        }

        setLoading(false)

      })
      .catch(() => {
        setParts([])
        setLoading(false)
      })

  }, [recommendations, region])

  return (

    <div className="p-6 text-white">

      <h1 className="text-2xl font-bold mb-4">
        Parts Search
      </h1>

      {component && (
        <div className="mb-4 text-green-400">
          Showing recommendations for: <strong>{component}</strong>
        </div>
      )}

      {/* Recommended Categories */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Recommended Categories</h2>

        <div className="flex flex-wrap gap-2">
          {recommendations.map((r, i) => (
            <span key={i} className="bg-zinc-800 px-3 py-1 rounded">
              {r}
            </span>
          ))}
        </div>
      </div>

      {/* Region Filter */}
      <div className="mb-6">

        <strong className="block mb-2">Supplier Region</strong>

        <div className="flex gap-2">

          <button
            onClick={() => setRegion("all")}
            className={`px-3 py-1 rounded ${
              region === "all" ? "bg-green-600" : "bg-zinc-800"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setRegion("domestic")}
            className={`px-3 py-1 rounded ${
              region === "domestic" ? "bg-green-600" : "bg-zinc-800"
            }`}
          >
            🇦🇺 Domestic
          </button>

          <button
            onClick={() => setRegion("global")}
            className={`px-3 py-1 rounded ${
              region === "global" ? "bg-green-600" : "bg-zinc-800"
            }`}
          >
            🌍 Global
          </button>

        </div>

      </div>

      {/* Loading */}
      {loading && (
        <div className="text-gray-400 mb-4">
          Loading parts...
        </div>
      )}

      {/* No Results */}
      {!loading && parts.length === 0 && (
        <div className="text-gray-500">
          No parts found for selected component.
        </div>
      )}

      {/* Parts List */}
      <div className="space-y-3">

        {parts.map((part) => (

          <div
            key={part.id}
            className="p-4 bg-zinc-900 rounded hover:bg-zinc-800"
          >
            <div className="font-semibold">{part.name}</div>

            <div className="text-sm text-gray-400">
              {part.category}
            </div>

            {part.supplier && (
              <div className="text-xs text-gray-500">
                Supplier: {part.supplier} ({part.supplier_country})
              </div>
            )}

            {part.reliability_score && (
              <div className="text-blue-400 text-xs">
                Reliability: {part.reliability_score}
              </div>
            )}

            {part.price && (
              <div className="text-green-400 mt-1">
                ${part.price}
              </div>
            )}

            {/* Premium Flag */}
            {part.price && part.price > 1000 && (
              <div className="text-yellow-400 text-xs">
                ⭐ Premium Option
              </div>
            )}

          </div>

        ))}

      </div>

    </div>

  )

}