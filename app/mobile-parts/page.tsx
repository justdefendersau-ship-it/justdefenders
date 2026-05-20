// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\mobile-parts\page.tsx
// Timestamp: 14 May 2026 19:50 Sydney

"use client"

import React from "react"

interface MobilePartItem {
  id: string
  part: string
  description: string
  compatibility: string
  confidence: number
}

export default function MobilePartsPage() {

  const parts: MobilePartItem[] = [

    {
      id: "PART-001",

      part:
        "TIMKEN-SET37",

      description:
        "Heavy duty wheel bearing kit optimised for expedition touring.",

      compatibility:
        "Land Rover Defender Puma 2.2",

      confidence: 95
    },

    {
      id: "PART-002",

      part:
        "ARB-SNORKEL-110",

      description:
        "Safari snorkel intake system for water crossing protection.",

      compatibility:
        "Land Rover Defender 110",

      confidence: 92
    },

    {
      id: "PART-003",

      part:
        "BILSTEIN-HD-4600",

      description:
        "Heavy duty touring suspension upgrade package.",

      compatibility:
        "Land Rover Defender 90/110",

      confidence: 89
    }

  ]

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
            marginBottom: "32px"
          }}
        >
          Mobile Parts Intelligence
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(340px,1fr))",
            gap: "20px"
          }}
        >

          {parts.map(
            (
              item: MobilePartItem
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