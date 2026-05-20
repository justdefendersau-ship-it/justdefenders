"use client";

import DashboardLayout
from "../../components/design-system/DashboardLayout"

import TopNavigation
from "../../components/design-system/TopNavigation"

import OperationalHeader
from "../../components/design-system/OperationalHeader"

import ObservabilityCard
from "../../components/observability/ObservabilityCard"

import WorkflowAnalyticsCard
from "../../components/observability/WorkflowAnalyticsCard"

import SearchAnalyticsCard
from "../../components/observability/SearchAnalyticsCard"

import SupplierAnalyticsCard
from "../../components/observability/SupplierAnalyticsCard"

import {

  buildOperationalMetrics

}
from "../../lib/telemetryEngine"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\observability\page.tsx
//
// Timestamp:
// 2026-05-09 15:00
//
// Purpose:
// - Platform observability dashboard
// - Operational analytics
// =====================================================

export default function ObservabilityPage(){

  const metrics =

    buildOperationalMetrics([

      {
        category:"search"
      },

      {
        category:"search"
      },

      {
        category:"mobile"
      },

      {
        category:"failure"
      }
    ])

  return (

    <div>

      <TopNavigation />

      <DashboardLayout
        title=""
      >

        <OperationalHeader

          title="Operational Observability"

          subtitle="Platform telemetry and intelligence analytics"

        />

        <ObservabilityCard
          metrics={metrics}
        />

        <WorkflowAnalyticsCard />

        <SearchAnalyticsCard />

        <SupplierAnalyticsCard />

      </DashboardLayout>

    </div>
  )
}
