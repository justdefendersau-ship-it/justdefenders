// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\internal-testing\page.tsx
// Timestamp: 14 May 2026 19:30 Sydney

"use client"

import React from "react"

interface InternalTestScenario {
  id: string
  scenario: string
  description: string
  status: "PASSED" | "FAILED" | "PENDING"
  confidence: number
}

export default function InternalTestingPage() {

  const scenarios: InternalTestScenario[] = [

    {
      id: "TEST-001",

      scenario:
        "VIN compatibility verification",

      description:
        "Validates compatibility intelligence against Defender Puma 2.2 VIN mappings.",

      status: "PASSED",

      confidence: 96
    },

    {
      id: "TEST-002",

      scenario:
        "Supplier confidence aggregation",

      description:
        "Tests supplier intelligence confidence weighting and historical match stability.",

      status: "PASSED",

      confidence: 93
    },

    {
      id: "TEST-003",

      scenario:
        "Telemetry anomaly detection",

      description:
        "Simulates boost-pressure irregularity detection pipeline.",

      status: "PENDING",

      confidence: 81
    }

  ]

  function getStatusColour(
    status: InternalTestScenario["status"]
  ): string {

    switch (status) {

      case "PASSED":
        return "#16a34a"

      case "FAILED":
        return "#dc2626"

      default:
        return "#f59e0b"
    }
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
          Internal Testing
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(340px,1fr))",
            gap: "20px"
          }}
        >

          {scenarios.map(
            (
              item: InternalTestScenario
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

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px"
                  }}
                >

                  <h2
                    style={{
                      color: "#ffffff",
                      margin: 0
                    }}
                  >
                    {item.scenario}
                  </h2>

                  <span
                    style={{
                      background:
                        getStatusColour(
                          item.status
                        ),

                      color: "#ffffff",

                      padding: "6px 10px",

                      borderRadius: "999px",

                      fontSize: "11px",

                      fontWeight: 700
                    }}
                  >
                    {item.status}
                  </span>

                </div>

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