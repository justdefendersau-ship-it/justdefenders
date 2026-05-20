// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\diagnostic-intelligence\page.tsx
// Timestamp: 14 May 2026 19:00 Sydney

"use client"

import React from "react"

interface DiagnosticFault {
  id: string
  faultCode: string
  description: string
  severity: "LOW" | "MEDIUM" | "HIGH"
  recommendation: string
  confidence: number
}

export default function DiagnosticIntelligencePage() {

  const diagnostics: DiagnosticFault[] = [

    {
      id: "FAULT-001",

      faultCode: "P0299",

      description:
        "Turbocharger underboost condition detected",

      severity: "HIGH",

      recommendation:
        "Inspect intercooler hoses, turbo actuator, and boost leak integrity.",

      confidence: 91
    },

    {
      id: "FAULT-002",

      faultCode: "P0101",

      description:
        "Mass airflow sensor performance anomaly",

      severity: "MEDIUM",

      recommendation:
        "Inspect MAF sensor contamination and intake flow restrictions.",

      confidence: 84
    }

  ]

  function getSeverityColour(
    severity: DiagnosticFault["severity"]
  ): string {

    switch (severity) {

      case "HIGH":
        return "#dc2626"

      case "MEDIUM":
        return "#f59e0b"

      default:
        return "#16a34a"
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
          Diagnostic Intelligence
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(340px,1fr))",
            gap: "20px"
          }}
        >

          {diagnostics.map(
            (
              item: DiagnosticFault
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
                    {item.faultCode}
                  </h2>

                  <span
                    style={{
                      background:
                        getSeverityColour(
                          item.severity
                        ),

                      color: "#ffffff",

                      padding: "6px 10px",

                      borderRadius: "999px",

                      fontSize: "11px",

                      fontWeight: 700
                    }}
                  >
                    {item.severity}
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
                    marginTop: "18px"
                  }}
                >

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
                    {item.recommendation}
                  </div>

                </div>

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