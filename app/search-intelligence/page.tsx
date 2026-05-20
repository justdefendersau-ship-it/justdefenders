// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\search-intelligence\page.tsx
// Timestamp: 14 May 2026 20:40 Sydney

"use client"

import React, {
  useState
} from "react"

interface SearchResultItem {
  id: string
  description: string
  supplier: string
  compatibility: string
  confidence: number
}

export default function SearchIntelligencePage() {

  const [query] =
    useState<string>(
      "Defender expedition upgrades"
    )

  const [results] =
    useState<SearchResultItem[]>([
      {
        id: "SEARCH-001",

        description:
          "Heavy duty wheel bearing expedition upgrade kit",

        supplier:
          "Timken",

        compatibility:
          "Land Rover Defender Puma 2.2",

        confidence: 95
      },

      {
        id: "SEARCH-002",

        description:
          "Safari snorkel intake protection system",

        supplier:
          "ARB",

        compatibility:
          "Land Rover Defender 110",

        confidence: 92
      },

      {
        id: "SEARCH-003",

        description:
          "Long-range overland suspension touring package",

        supplier:
          "Bilstein",

        compatibility:
          "Land Rover Defender 90/110",

        confidence: 90
      }

    ])

  return (

    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        padding: "32px"
      }}
    >

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >

        <h1
          style={{
            color: "#ffffff",
            fontSize: "36px",
            fontWeight: 800,
            marginBottom: "12px"
          }}
        >
          Search Intelligence
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "32px"
          }}
        >
          Active query:
          {" "}
          {query}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(340px,1fr))",
            gap: "20px"
          }}
        >

          {results.map(
            (
              item: SearchResultItem
            ) => (

              <div
                key={item.id}
                style={{
                  background: "#0f172a",
                  borderRadius: "18px",
                  padding: "24px",
                  border:
                    "1px solid rgba(255,255,255,0.08)"
                }}
              >

                <h2
                  style={{
                    color: "#ffffff",
                    marginTop: 0,
                    marginBottom: "12px"
                  }}
                >
                  {item.description}
                </h2>

                <div
                  style={{
                    color: "#cbd5e1",
                    marginBottom: "10px"
                  }}
                >
                  <strong>
                    Supplier:
                  </strong>
                  {" "}
                  {item.supplier}
                </div>

                <div
                  style={{
                    color: "#cbd5e1",
                    marginBottom: "10px"
                  }}
                >
                  <strong>
                    Compatibility:
                  </strong>
                  {" "}
                  {item.compatibility}
                </div>

                <div
                  style={{
                    color: "#93c5fd",
                    fontWeight: 700
                  }}
                >
                  Confidence:
                  {" "}
                  {item.confidence}%
                </div>

              </div>

            )
          )}

        </div>

      </div>

    </main>

  )
}