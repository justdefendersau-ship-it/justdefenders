// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\ai-operations\page.tsx
// Timestamp: 14 May 2026 17:00 Sydney

"use client"

import React from "react"

interface DiagnosticInsight {
  likelyFault: string
  confidence: number
  recommendation: string
}

interface AIInsightCardProps {
  title: string
  confidence: number
  recommendation: string
}

function AIInsightCard({
  title,
  confidence,
  recommendation
}: AIInsightCardProps) {

  return (

    <div
      style={{
        background: "#0f172a",
        borderRadius: "18px",
        padding: "24px",
        border: "1px solid rgba(255,255,255,0.08)",
        marginBottom: "18px"
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px"
        }}
      >

        <h2
          style={{
            color: "#ffffff",
            margin: 0,
            fontSize: "20px",
            fontWeight: 700
          }}
        >
          {title}
        </h2>

        <div
          style={{
            background: "#1d4ed8",
            color: "#ffffff",
            padding: "6px 12px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 700
          }}
        >
          {confidence}%
        </div>

      </div>

      <p
        style={{
          color: "#cbd5e1",
          margin: 0,
          lineHeight: 1.6
        }}
      >
        {recommendation}
      </p>

    </div>

  )
}

export default function AIOperationsPage() {

  const diagnostics: DiagnosticInsight = {

    likelyFault:
      "Turbocharger boost pressure irregularity",

    confidence: 87,

    recommendation:
      "Inspect boost hoses, MAP sensor readings, and intercooler integrity before long-range touring."
  }

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
          maxWidth: "1100px",
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
          AI Operations Centre
        </h1>

        <AIInsightCard
          title={diagnostics.likelyFault}
          confidence={diagnostics.confidence}
          recommendation={diagnostics.recommendation}
        />

      </div>

    </main>

  )
}