// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\catalogue-intelligence\page.tsx
// Timestamp: 14 May 2026 18:10 Sydney

"use client"

import React from "react"

interface CatalogueProduct {
  id: string
  partNumber: string
  description: string
  manufacturer: string
  confidence: number
  compatibility: string[]
}

export default function CatalogueIntelligencePage() {

  const products: CatalogueProduct[] = [

    {
      id: "PART-001",

      partNumber: "TIMKEN-SET37",

      description: "Heavy Duty Wheel Bearing Kit",

      manufacturer: "Timken",

      confidence: 94,

      compatibility: [
        "Defender 90",
        "Defender 110",
        "Defender Puma 2.2"
      ]
    },

    {
      id: "PART-002",

      partNumber: "ARB-INTK-001",

      description: "Safari Snorkel Kit",

      manufacturer: "ARB",

      confidence: 90,

      compatibility: [
        "Defender 90",
        "Defender 110"
      ]
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
            fontSize: "34px",
            fontWeight: 800,
            marginBottom: "32px"
          }}
        >
          Catalogue Intelligence
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "20px"
          }}
        >

          {products.map(
            (
              product: CatalogueProduct
            ) => (

              <div
                key={product.id}
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
                  {product.description}
                </h2>

                <p
                  style={{
                    color: "#cbd5e1",
                    marginBottom: "8px"
                  }}
                >
                  Part Number:
                  {" "}
                  {product.partNumber}
                </p>

                <p
                  style={{
                    color: "#cbd5e1",
                    marginBottom: "8px"
                  }}
                >
                  Manufacturer:
                  {" "}
                  {product.manufacturer}
                </p>

                <p
                  style={{
                    color: "#93c5fd",
                    fontWeight: 700
                  }}
                >
                  Confidence:
                  {" "}
                  {product.confidence}%
                </p>

                <div
                  style={{
                    marginTop: "16px"
                  }}
                >

                  <div
                    style={{
                      color: "#94a3b8",
                      marginBottom: "8px",
                      fontSize: "13px"
                    }}
                  >
                    Compatibility
                  </div>

                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: "18px",
                      color: "#cbd5e1"
                    }}
                  >

                    {product.compatibility.map(
                      (
                        vehicle: string,
                        idx: number
                      ) => (

                        <li key={idx}>
                          {vehicle}
                        </li>

                      )
                    )}

                  </ul>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </main>

  )
}