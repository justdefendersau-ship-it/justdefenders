// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\mobile-app\page.tsx
// Timestamp: 14 May 2026 19:40 Sydney

"use client"

import React from "react"

interface MobileCapability {
  id: string
  type: string
  description: string
  status: "ACTIVE" | "BETA" | "PLANNED"
}

export default function MobileAppPage() {

  const capabilities: MobileCapability[] = [

    {
      id: "MOB-001",

      type:
        "Offline Telemetry",

      description:
        "Capture and synchronise telemetry data during remote touring without connectivity.",

      status: "ACTIVE"
    },

    {
      id: "MOB-002",

      type:
        "VIN Scan Intelligence",

      description:
        "Rapid VIN recognition and vehicle intelligence synchronisation.",

      status: "ACTIVE"
    },

    {
      id: "MOB-003",

      type:
        "Expedition Route Sync",

      description:
        "Synchronise expedition workflows and route-based fitment intelligence.",

      status: "BETA"
    },

    {
      id: "MOB-004",

      type:
        "Predictive Failure Alerts",

      description:
        "AI-driven predictive maintenance alerts for touring vehicles.",

      status: "PLANNED"
    }

  ]

  function getStatusColour(
    status: MobileCapability["status"]
  ): string {

    switch (status) {

      case "ACTIVE":
        return "#16a34a"

      case "BETA":
        return "#f59e0b"

      default:
        return "#2563eb"
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
          Mobile App Platform
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(340px,1fr))",
            gap: "20px"
          }}
        >

          {capabilities.map(
            (
              item: MobileCapability
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

                  <strong
                    style={{
                      color: "#ffffff",
                      fontSize: "18px"
                    }}
                  >
                    {item.type}
                  </strong>

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
                    lineHeight: 1.6,
                    margin: 0
                  }}
                >
                  {item.description}
                </p>

              </div>

            )
          )}

        </div>

      </div>

    </main>

  )
}