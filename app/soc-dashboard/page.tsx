"use client"

import ProductionLayout from
"../../components/layout/ProductionLayout"

import ProductionCard from
"../../components/production/ProductionCard"

export default function SOCDashboard(){

  return (

    <ProductionLayout

      title="SOC Operations"

      subtitle="Live Operational Telemetry"

    >

      <div
        style={{

          display:"grid",

          gridTemplateColumns:
          "repeat(auto-fit,minmax(280px,1fr))",

          gap:"18px"
        }}
      >

        <ProductionCard
          title="Operational Events"
          value="128"
          status="LIVE"
          subtitle="Real-Time Telemetry"
        />

        <ProductionCard
          title="Expedition Alerts"
          value="4"
          status="MONITORING"
          subtitle="Remote Operations"
        />

        <ProductionCard
          title="AI Diagnostic Sessions"
          value="42"
          status="ACTIVE"
          subtitle="Operational Copilot"
        />

        <ProductionCard
          title="Supplier Disruptions"
          value="1"
          status="LOW"
          subtitle="Commercial Awareness"
        />

      </div>

    </ProductionLayout>
  )
}