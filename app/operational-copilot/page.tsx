// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\operational-copilot\page.tsx
// Timestamp: 14 May 2026 20:00 Sydney

"use client"

import React from "react"

interface OperationalCopilotContext {
  id: string
  vehicle: string
  mission: string
  operationalStatus: string
  recommendation: string
  confidence: number
}

export default function OperationalCopilotPage() {

  const copilot: OperationalCopilotContext = {

    id: "COPILOT-001",

    vehicle:
      "Land Rover Defender Puma 2.2",

    mission:
      "Simpson Desert Expedition",

    operationalStatus:
      "READY",

    recommendation:
      "Inspect cooling system integrity and confirm recovery gear inventory before departure.",

    confidence: 93
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
            fontSize: "36px",
            fontWeight: 800,
            marginBottom: "32px"
          }}
        >
          Operational Copilot
        </h1>

        <div
          style={{
            background: "#0f172a",
            borderRadius: "20px",
            padding: "28px",
            border:
              "1px solid rgba(255,255,255,0.08)"
          }}
        >

          <div
            style={{
              display: "grid",
              gap: "18px"
            }}
          >

            <p
              style={{
                color: "#cbd5e1",
                margin: 0
              }}
            >
              <strong>
                Vehicle:
              </strong>
              {" "}
              {copilot.vehicle}
            </p>

            <p
              style={{
                color: "#cbd5e1",
                margin: 0
              }}
            >
              <strong>
                Mission:
              </strong>
              {" "}
              {copilot.mission}
            </p>

            <p
              style={{
                color: "#ffffff",
                margin: 0
              }}
            >
              <strong>
                Operational Status:
              </strong>
              {" "}
              {copilot.operationalStatus}
            </p>

            <div>

              <div
                style={{
                  color: "#94a3b8",
                  fontSize: "13px",
                  marginBottom: "8px"
                }}
              >
                Recommendation
              </div>

              <div
                style={{
                  color: "#ffffff",
                  lineHeight: 1.7
                }}
              >
                {copilot.recommendation}
              </div>

            </div>

            <div
              style={{
                color: "#93c5fd",
                fontWeight: 700
              }}
            >
              Confidence:
              {" "}
              {copilot.confidence}%
            </div>

          </div>

        </div>

      </div>

    </main>

  )
}