// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\expedition-workflows\page.tsx
// Timestamp: 14 May 2026 19:10 Sydney

"use client"

import React from "react"

interface ExpeditionKit {
  id: string
  name: string
  route: string
  vehicle: string
  description: string
  confidence: number
  recommendedParts: string[]
}

export default function ExpeditionWorkflowsPage() {

  const expeditionKits: ExpeditionKit[] = [

    {
      id: "KIT-001",

      name:
        "Cape York Remote Touring Kit",

      route:
        "Cape York",

      vehicle:
        "Land Rover Defender 110",

      description:
        "Optimised for remote tropical expedition conditions including river crossings and corrugations.",

      confidence: 94,

      recommendedParts: [
        "Safari Snorkel",
        "Heavy Duty Suspension",
        "All Terrain Tyres",
        "Dual Battery System"
      ]
    },

    {
      id: "KIT-002",

      name:
        "Simpson Desert Expedition Kit",

      route:
        "Simpson Desert",

      vehicle:
        "Land Rover Defender Puma 2.2",

      description:
        "Long-range desert touring workflow with recovery and thermal management optimisation.",

      confidence: 91,

      recommendedParts: [
        "Long Range Fuel Tank",
        "Sand Recovery Boards",
        "Heavy Duty Cooling System",
        "Tyre Pressure Monitoring"
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
            fontSize: "36px",
            fontWeight: 800,
            marginBottom: "32px"
          }}
        >
          Expedition Workflows
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(340px,1fr))",
            gap: "20px"
          }}
        >

          {expeditionKits.map(
            (
              kit: ExpeditionKit
            ) => (

              <div
                key={kit.id}
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
                  {kit.name}
                </h2>

                <p
                  style={{
                    color: "#93c5fd",
                    marginBottom: "8px",
                    fontWeight: 700
                  }}
                >
                  {kit.route}
                </p>

                <p
                  style={{
                    color: "#cbd5e1",
                    marginBottom: "16px"
                  }}
                >
                  {kit.description}
                </p>

                <div
                  style={{
                    color: "#ffffff",
                    marginBottom: "14px"
                  }}
                >
                  <strong>
                    Vehicle:
                  </strong>
                  {" "}
                  {kit.vehicle}
                </div>

                <div
                  style={{
                    color: "#93c5fd",
                    fontWeight: 700,
                    marginBottom: "16px"
                  }}
                >
                  Confidence:
                  {" "}
                  {kit.confidence}%
                </div>

                <div>

                  <div
                    style={{
                      color: "#94a3b8",
                      fontSize: "13px",
                      marginBottom: "10px"
                    }}
                  >
                    Recommended Parts
                  </div>

                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: "18px",
                      color: "#cbd5e1"
                    }}
                  >

                    {kit.recommendedParts.map(
                      (
                        part: string,
                        idx: number
                      ) => (

                        <li
                          key={idx}
                          style={{
                            marginBottom: "6px"
                          }}
                        >
                          {part}
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