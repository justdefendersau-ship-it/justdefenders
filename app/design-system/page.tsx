"use client";

import DashboardLayout
from "../../components/design-system/DashboardLayout"

import DashboardCard
from "../../components/design-system/DashboardCard"

import TopNavigation
from "../../components/design-system/TopNavigation"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\design-system\page.tsx
//
// Timestamp:
// 2026-05-08 10:30
//
// Purpose:
// - Design system validation page
// =====================================================

export default function DesignSystemPage(){

  return (

    <div>

      <TopNavigation />

      <DashboardLayout
        title="Unified Design System"
      >

        <DashboardCard
          title="Operational Health"
          alertType="success"
        >

          <div className="jd-metric">

            92%

          </div>

        </DashboardCard>

        <DashboardCard
          title="Expedition Alert"
          alertType="warning"
        >

          Cooling system inspection
          recommended before remote travel.

        </DashboardCard>

        <DashboardCard
          title="Critical Alert"
          alertType="critical"
        >

          Elevated coolant temperature
          detected during telemetry session.

        </DashboardCard>

      </DashboardLayout>

    </div>
  )
}
