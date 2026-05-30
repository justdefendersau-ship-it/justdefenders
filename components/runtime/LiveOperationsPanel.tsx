import LiveRuntimeEventStream
from "@/components/runtime/LiveRuntimeEventStream"

import FleetOperationalStateCard
from "@/components/fose/FleetOperationalStateCard"

import PredictiveOperationalForecastCard
from "@/components/fose/PredictiveOperationalForecastCard"

import AdaptiveOperationalRiskCard
from "@/components/fose/AdaptiveOperationalRiskCard"

import OperationalAdvisoryDashboard
from "@/components/fose/OperationalAdvisoryDashboard"

import OperationalAnomalyDashboard
from "@/components/fose/OperationalAnomalyDashboard"

import OperationalNotificationDashboard
from "@/components/notifications/OperationalNotificationDashboard"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\LiveOperationsPanel.tsx
//
// Timestamp:
// 28 May 2026 07:10 Sydney
//
// PURPOSE:
// Central live operations panel.
// ====================================================================

export default function LiveOperationsPanel(){

  return (

    <div
      className="
        space-y-8
      "
    >

      <LiveRuntimeEventStream />

      <FleetOperationalStateCard />

      <PredictiveOperationalForecastCard />

      <AdaptiveOperationalRiskCard />

      <OperationalAdvisoryDashboard />

      <OperationalAnomalyDashboard />

      <OperationalNotificationDashboard />

    </div>
  )
}