// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\dashboard-operations\page.tsx
// Timestamp: 14 May 2026 18:50 Sydney

"use client"

import React from "react"

interface DashboardOverview {
  suppliers: number
  vehicles: number
  telemetryFeeds: number
  activeAlerts: number
}

interface DashboardStatusCardProps {
  title: string
  value: number
  status: string
}

function DashboardStatusCard({
  title,
  value,
  status
}: DashboardStatusCardProps) {

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
            fontSize: "18px"
          }}
        >
          {title}
        </h2>

        <span
          style={{
            background: "#16a34a",
            color: "#ffffff",
            padding: "6px 10px",
            borderRadius: "999px",
            fontSize: "11px",
            fontWeight: 700
          }}
        >
          {status}
        </span>

      </div>

      <div
        style={{
          color: "#93c5fd",
          fontSize: "42px",
          fontWeight: 800
        }}
      >
        {value}
      </div>

    </div>

  )
}

export default function DashboardOperationsPage() {

  const overview: DashboardOverview = {

    suppliers: 42,

    vehicles: 318,

    telemetryFeeds: 126,

    activeAlerts: 7
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
          Dashboard Operations
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: "20px"
          }}
        >

          <DashboardStatusCard
            title="Suppliers"
            value={overview.suppliers}
            status="ACTIVE"
          />

          <DashboardStatusCard
            title="Vehicles"
            value={overview.vehicles}
            status="ONLINE"
          />

          <DashboardStatusCard
            title="Telemetry Feeds"
            value={overview.telemetryFeeds}
            status="LIVE"
          />

          <DashboardStatusCard
            title="Active Alerts"
            value={overview.activeAlerts}
            status="MONITORING"
          />

        </div>

      </div>

    </main>

  )
}