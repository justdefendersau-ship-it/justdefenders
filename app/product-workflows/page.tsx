// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\product-workflows\page.tsx
// Timestamp: 14 May 2026 20:30 Sydney

"use client"

import React from "react"

interface ProductWorkflowItem {
  id: string
  fault: string
  recommendation: string
  supplier: string
  confidence: number
}

export default function ProductWorkflowsPage() {

  const workflows: ProductWorkflowItem[] = [

    {
      id: "WF-001",

      fault:
        "Turbocharger underboost condition",

      recommendation:
        "Inspect intercooler hoses and replace degraded boost pipe clamps.",

      supplier:
        "Allisport",

      confidence: 93
    },

    {
      id: "WF-002",

      fault:
        "Wheel bearing thermal instability",

      recommendation:
        "Upgrade to heavy-duty Timken bearing assemblies before expedition deployment.",

      supplier:
        "Timken",

      confidence: 95
    },

    {
      id: "WF-003",

      fault:
        "Dust ingestion risk during desert operations",

      recommendation:
        "Install sealed snorkel intake system with cyclonic pre-cleaner.",

      supplier:
        "Safari",

      confidence: 90
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
          Product Workflows
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(340px,1fr))",
            gap: "20px"
          }}
        >

          {workflows.map(
            (
              item: ProductWorkflowItem
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
                  {item.fault}
                </h2>

                <p
                  style={{
                    color: "#cbd5e1",
                    lineHeight: 1.6
                  }}
                >
                  {item.recommendation}
                </p>

                <div
                  style={{
                    marginTop: "18px",
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