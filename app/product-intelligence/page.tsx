// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\product-intelligence\page.tsx
// Timestamp: 14 May 2026 20:20 Sydney

"use client"

import React from "react"

interface ProductIntelligenceItem {
  id: string
  description: string
  supplier: string
  confidence: number
  compatibility: string
}

interface ProductCardProps {
  title: string
  supplier: string
  confidence: number
  compatibility: string
}

function ProductCard({
  title,
  supplier,
  confidence,
  compatibility
}: ProductCardProps) {

  return (

    <div
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
        {title}
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
        {supplier}
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
        {compatibility}
      </div>

      <div
        style={{
          color: "#93c5fd",
          fontWeight: 700
        }}
      >
        Confidence:
        {" "}
        {confidence}%
      </div>

    </div>

  )
}

export default function ProductIntelligencePage() {

  const products: ProductIntelligenceItem[] = [

    {
      id: "PROD-001",

      description:
        "Heavy duty expedition wheel bearing kit",

      supplier:
        "Timken",

      confidence: 95,

      compatibility:
        "Land Rover Defender Puma 2.2"
    },

    {
      id: "PROD-002",

      description:
        "Safari snorkel intake protection system",

      supplier:
        "ARB",

      confidence: 92,

      compatibility:
        "Land Rover Defender 110"
    },

    {
      id: "PROD-003",

      description:
        "Long-range touring suspension package",

      supplier:
        "Bilstein",

      confidence: 90,

      compatibility:
        "Land Rover Defender 90/110"
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
          Product Intelligence
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(340px,1fr))",
            gap: "20px"
          }}
        >

          {products.map(
            (
              item: ProductIntelligenceItem,
              index: number
            ) => (

              <ProductCard
                key={index}
                title={item.description}
                supplier={item.supplier}
                confidence={item.confidence}
                compatibility={item.compatibility}
              />

            )
          )}

        </div>

      </div>

    </main>

  )
}