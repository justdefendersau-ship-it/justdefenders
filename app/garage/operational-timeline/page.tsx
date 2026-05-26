// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\garage\operational-timeline\page.tsx
//
// Timestamp:
// 26 May 2026 20:40 Sydney
//
// PURPOSE:
// Operational vehicle lifecycle intelligence page.
// ====================================================================

"use client"

import CanonicalDashboardShell
from "@/components/layout/CanonicalDashboardShell"

import VehicleOperationalTimeline
from "@/components/garage/VehicleOperationalTimeline"

import ExpeditionReadinessPanel
from "@/components/garage/ExpeditionReadinessPanel"

import AdaptiveMaintenancePanel
from "@/components/garage/AdaptiveMaintenancePanel"

import ServiceIntervalSettingsPanel
from "@/components/garage/ServiceIntervalSettingsPanel"

import OperationalExpiryPanel
from "@/components/garage/OperationalExpiryPanel"

import PredictiveOperationalPanel
from "@/components/garage/PredictiveOperationalPanel"

export default function OperationalTimelinePage(){

  return (

    <CanonicalDashboardShell

      title="Operational Timeline"

      subtitle="
        Longitudinal operational intelligence,
        adaptive survivability analysis,
        predictive maintenance forecasting,
        and expedition readiness doctrine.
      "
    >

      <VehicleOperationalTimeline />

      <ExpeditionReadinessPanel />

      <AdaptiveMaintenancePanel />

      <ServiceIntervalSettingsPanel />

      <OperationalExpiryPanel />

      <PredictiveOperationalPanel />

    </CanonicalDashboardShell>
  )
}