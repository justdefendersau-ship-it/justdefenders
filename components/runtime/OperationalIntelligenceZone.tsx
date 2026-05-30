import HistoricalOperationalTrendDashboard
from "@/components/fose/HistoricalOperationalTrendDashboard"

import VehicleOperationalTimeline
from "@/components/garage/VehicleOperationalTimeline"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\OperationalIntelligenceZone.tsx
//
// Timestamp:
// 28 May 2026 07:15 Sydney
//
// PURPOSE:
// Historical operational intelligence zone.
// ====================================================================

export default function OperationalIntelligenceZone(){

  return (

    <div
      className="
        space-y-8
      "
    >

      <div
        className="
          text-3xl
          font-black
          tracking-tight
        "
      >

        Historical Operational Intelligence

      </div>

      <HistoricalOperationalTrendDashboard />

      <VehicleOperationalTimeline />

    </div>
  )
}