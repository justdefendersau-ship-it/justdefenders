"use client"

import ProductionLayout from
"../../components/layout/ProductionLayout"

import ProductionCard from
"../../components/production/ProductionCard"

export default function MobileSOC(){

  return (

    <ProductionLayout

      title="Mobile SOC"

      subtitle="Field Operations + Voice + Scanning"

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
          title="Voice Sessions"
          value="18"
          status="ACTIVE"
          subtitle="Operational Voice AI"
        />

        <ProductionCard
          title="VIN Scans"
          value="84"
          status="LIVE"
          subtitle="Mobile Operations"
        />

        <ProductionCard
          title="Offline Workflows"
          value="12"
          status="SYNCED"
          subtitle="Field Operations"
        />

        <ProductionCard
          title="Expedition Alerts"
          value="2"
          status="LOW"
          subtitle="Operational Telemetry"
        />

      </div>

    </ProductionLayout>
  )
}