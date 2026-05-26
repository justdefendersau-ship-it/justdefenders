// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\garage\operational-timeline\page.tsx
//
// Timestamp:
// 26 May 2026 17:10 Sydney
//
// PURPOSE:
// Operational vehicle lifecycle timeline page.
// ====================================================================

"use client"

import VehicleOperationalTimeline
from "@/components/garage/VehicleOperationalTimeline"

import CanonicalDashboardShell
from "@/components/layout/CanonicalDashboardShell"

export default function OperationalTimelinePage(){

  return (

    <CanonicalDashboardShell

      title="
        Operational Timeline
      "

      subtitle="
        Longitudinal vehicle operational history,
        maintenance lifecycle intelligence,
        and expedition readiness chronology.
      "
    >

      <VehicleOperationalTimeline />

    </CanonicalDashboardShell>
  )
}