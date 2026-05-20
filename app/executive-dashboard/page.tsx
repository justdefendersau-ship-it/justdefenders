"use client"

import ProductionLayout from
"../../components/layout/ProductionLayout"

import ProductionCard from
"../../components/production/ProductionCard"

export default function ExecutiveDashboard(){

  return (

    <ProductionLayout

      title="Executive Command"

      subtitle="Commercial + Operational Intelligence"

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
          title="Operational Trust"
          value="96%"
          status="STABLE"
          subtitle="Operational Telemetry"
        />

        <ProductionCard
          title="Supplier Availability"
          value="94%"
          status="ACTIVE"
          subtitle="Commercial Network"
        />

        <ProductionCard
          title="Workflow Completion"
          value="93%"
          status="OPTIMAL"
          subtitle="Workshop Operations"
        />

        <ProductionCard
          title="AI Recommendation Trust"
          value="95%"
          status="HIGH"
          subtitle="Operational AI"
        />

      </div>

    </ProductionLayout>
  )
}