"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/EnterpriseObservabilityDashboard.tsx

   Timestamp:
   14 May 2026 06:15 (Sydney)

   PURPOSE:
   Enterprise observability dashboard
===================================================== */

import React
from "react"

import {
  useMissionState
}
from "@/lib/state/useMissionState"

export default function EnterpriseObservabilityDashboard(){

  const {

    missionStatus,

    activeThreats,

    telemetryRate

  } =
  useMissionState()

  return (

    <div className="jd-observability-shell">

      <div className="jd-observability-title">

        ENTERPRISE OBSERVABILITY

      </div>

      <div className="jd-observability-grid">

        <div className="jd-observability-card">

          <span>Status</span>

          <strong>

            {missionStatus}

          </strong>

        </div>

        <div className="jd-observability-card">

          <span>Threats</span>

          <strong>

            {activeThreats}

          </strong>

        </div>

        <div className="jd-observability-card">

          <span>Telemetry</span>

          <strong>

            {telemetryRate}

          </strong>

        </div>

        <div className="jd-observability-card">

          <span>Federation</span>

          <strong>

            CONNECTED

          </strong>

        </div>

      </div>

    </div>
  )
}
