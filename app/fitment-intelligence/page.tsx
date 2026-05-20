// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\fitment-intelligence\page.tsx
// Timestamp: 14 May 2026 19:20 Sydney

"use client"

import React, {
  useState
} from "react"

interface FitmentItem {
  id: string
  partNumber: string
  description: string
  compatibleVehicle: string
  confidence: number
}

export default function FitmentIntelligencePage() {

  const [vehicle, setVehicle] =
    useState<string>(
      "Land Rover Defender Puma 2.2"
    )

  const [fitment, setFitment] =
    useState<FitmentItem[]>([
      {
        id: "FIT-001",

        partNumber: "TIMKEN-SET37",

        description:
          "Heavy Duty Wheel Bearing Kit",

        compatibleVehicle:
          "Land Rover Defender Puma 2.2",

        confidence: 95
      }
    ])

  function loadFitmentData(): void {

    const fitmentData: {
      fitment: FitmentItem
      vehicle: string
    } = {

      fitment: {

        id: "FIT-002",

        partNumber: "ARB-SNORKEL-110",

        description:
          "Safari Snorkel System",

        compatibleVehicle:
          "Land Rover Defender 110",

        confidence: 91
      },

      vehicle:
        "Land Rover Defender 110"
    }

    setFitment([
      fitmentData.fitment
    ])

    setVehicle(
      fitmentData.vehicle
    )
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

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px"
          }}
        >

          <h1
            style={{
              color: "#ffffff",
              fontSize: "36px",
              fontWeight: 800,
              margin: 0
            }}
          >
            Fitment Intelligence
          </h1>

          <button
            onClick={loadFitmentData}
            style={{
              background: "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              padding: "12px 18px",
              cursor: "pointer",
              fontWeight: 700
            }}
          >
            Refresh Fitment
          </button>

        </div>

        <div
          style={{
            background: "#0f172a",
            borderRadius: "18px",
            padding: "24px",
            marginBottom: "24px",
            border:
              "1px solid rgba(255,255,255,0.08)"
          }}
        >

          <div
            style={{
              color: "#94a3b8",
              fontSize: "13px",
              marginBottom: "8px"
            }}
          >
            Active Vehicle
          </div>

          <div
            style={{
              color: "#ffffff",
              fontSize: "22px",
              fontWeight: 700
            }}
          >
            {vehicle}
          </div>

        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(340px,1fr))",
            gap: "20px"
          }}
        >

          {fitment.map(
            (
              item: FitmentItem
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
                  {item.partNumber}
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
                    Compatible Vehicle:
                  </strong>
                  {" "}
                  {item.compatibleVehicle}
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