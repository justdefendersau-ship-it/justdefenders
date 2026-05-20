// JustDefenders ©
// File: C:\dev\justdefenders\frontend\components\AlertsPanel.tsx
// Timestamp: 14 May 2026 21:30 Sydney

"use client"

import React, {
  useEffect,
  useState
} from "react"

interface AlertItem {
  id: string
  title: string
  severity: "LOW" | "MEDIUM" | "HIGH"
  timestamp: string
}

interface AlertsPanelProps {
  activeVin: string
}

export default function AlertsPanel({
  activeVin
}: AlertsPanelProps) {

  const [alerts, setAlerts] =
    useState<AlertItem[]>([])

  function generateDemoAlerts():
  AlertItem[] {

    return [

      {
        id: "ALT-001",

        title:
          `Boost pressure anomaly detected for ${activeVin}`,

        severity: "HIGH",

        timestamp:
          new Date().toISOString()
      },

      {
        id: "ALT-002",

        title:
          "Scheduled maintenance interval approaching",

        severity: "MEDIUM",

        timestamp:
          new Date().toISOString()
      }

    ]
  }

  useEffect(() => {

    if (!activeVin) {
      return
    }

    const generatedAlerts =
      generateDemoAlerts()

    setAlerts(generatedAlerts)

  }, [activeVin])

  function getSeverityColour(
    severity: AlertItem["severity"]
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
          marginBottom: "20px"
        }}
      >
        Alerts Panel
      </h2>

      {alerts.length === 0 && (

        <p
          style={{
            color: "#94a3b8"
          }}
        >
          No active alerts.
        </p>

      )}

      {alerts.map(
        (
          alert: AlertItem
        ) => (

          <div
            key={alert.id}
            style={{
              background: "#111827",
              borderRadius: "14px",
              padding: "16px",
              marginBottom: "14px",
              borderLeft:
                `4px solid ${getSeverityColour(alert.severity)}`
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px"
              }}
            >

              <strong
                style={{
                  color: "#ffffff"
                }}
              >
                {alert.title}
              </strong>

              <span
                style={{
                  color:
                    getSeverityColour(alert.severity),
                  fontSize: "12px",
                  fontWeight: 700
                }}
              >
                {alert.severity}
              </span>

            </div>

            <div
              style={{
                color: "#94a3b8",
                fontSize: "12px"
              }}
            >
              {new Date(
                alert.timestamp
              ).toLocaleString()}
            </div>

          </div>

        )
      )}

    </div>

  )
}