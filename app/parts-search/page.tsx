// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\parts-search\page.tsx
// Timestamp: 14 May 2026 20:10 Sydney

"use client"

import React, {
  useState
} from "react"

interface PartSearchItem {
  id: string
  part: string
  description: string
  compatibility: string
  supplier: string
  confidence: number
}

export default function PartsSearchPage() {

  const [search] =
    useState<string>("Defender")

  const [results] =
    useState<PartSearchItem[]>([
      {
        id: "PART-001",

        part:
          "TIMKEN-SET37",

        description:
          "Heavy duty wheel bearing kit",

        compatibility:
          "Land Rover Defender Puma 2.2",

        supplier:
          "Timken",

        confidence: 95
      },

      {
        id: "PART-002",

        part:
          "ARB-SNORKEL-110",

        description:
          "Safari snorkel intake system",

        compatibility:
          "Land Rover Defender 110",

        supplier:
          "ARB",

        confidence: 92
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
          Parts Search
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "32px"
          }}
        >
          Active search:
          {" "}
          {search}
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
              item: PartSearchItem
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
                  {item.part}
                </h2>

                <p
                  style={{
                    color: "#cbd5e1",
                    lineHeight: 1.6
                  }}
                >
                  {item.description}
                </p>

                <div
                  style={{
                    marginTop: "18px",
                    color: "#ffffff"
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
                    marginTop: "10px",
                    color: "#ffffff"
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
                    marginTop: "14px",
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