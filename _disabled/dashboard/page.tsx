"use client"

import PartsPanel from "../components/PartsPanel"

function Card({ title, children }) {
  return (
    <div style={{
      background: "#fff",
      padding: 16,
      borderRadius: 12,
      boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
    }}>
      <h3 style={{ marginBottom: 10 }}>{title}</h3>
      {children || <div style={{ color: "#888" }}>Coming soon</div>}
    </div>
  )
}

export default function Dashboard() {
  return (
    <div style={{
      padding: 20,
      background: "#f4f6f8",
      minHeight: "100vh"
    }}>

      {/* NEW HEADER */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>JustDefenders Dashboard</h1>
        <div style={{ color: "#666" }}>
          Vehicle Intelligence & Parts Ecosystem
        </div>
      </div>

      {/* GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16
      }}>

        {/* Top Row */}
        <Card title="Fleet Overview" />
        <Card title="Alerts" />
        <Card title="Quick Actions" />

        {/* Middle Row */}
        <Card title="Vehicles" />
        <Card title="Activity" />
        <Card title="Network" />

        {/* Parts Intelligence (PRIMARY FEATURE) */}
        <div style={{ gridColumn: "span 3" }}>
          <PartsPanel />
        </div>

      </div>

    </div>
  )
}
