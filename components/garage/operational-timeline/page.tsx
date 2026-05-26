// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\garage\operational-timeline\page.tsx
//
// Timestamp:
// 26 May 2026 17:55 Sydney
//
// PURPOSE:
// Operational vehicle lifecycle timeline page.
// ====================================================================

"use client"

import CanonicalDashboardShell
from "@/components/layout/CanonicalDashboardShell"

import VehicleOperationalTimeline
from "@/components/garage/VehicleOperationalTimeline"

import ExpeditionReadinessPanel
from "@/components/garage/ExpeditionReadinessPanel"

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

      <ExpeditionReadinessPanel />

    </CanonicalDashboardShell>
  )
}