"use client";

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/LiveMissionPulseBar.tsx

   Timestamp:
   12 May 2026 19:45 (Sydney)

   PURPOSE:
   Real-time live intelligence pulse bar
===================================================== */

import React from "react"

import {

  useLiveMissionState

}
from "../../hooks/useLiveMissionState"

// =====================================================
// COMPONENT
// =====================================================

export default function LiveMissionPulseBar(){

  const live =
    useLiveMissionState()

  return (

    <div className="jd-live-pulse-shell">

      <div className="jd-live-pulse-item">

        <div className="jd-live-label">

          NEURAL ACTIVITY

        </div>

        <div className="jd-live-value">

          {live.neuralActivity}%

        </div>

      </div>

      <div className="jd-live-pulse-item">

        <div className="jd-live-label">

          SURVIVABILITY

        </div>

        <div className="jd-live-value">

          {live.survivabilityPulse}%

        </div>

      </div>

      <div className="jd-live-pulse-item">

        <div className="jd-live-label">

          TELEMETRY

        </div>

        <div className="jd-live-value">

          {live.telemetryIntegrity}%

        </div>

      </div>

      <div className="jd-live-pulse-item">

        <div className="jd-live-label">

          GOVERNANCE

        </div>

        <div className="jd-live-value">

          {live.autonomousGovernance}%

        </div>

      </div>

      <div className="jd-live-pulse-item">

        <div className="jd-live-label">

          DIGITAL TWIN

        </div>

        <div className="jd-live-value">

          {live.digitalTwinSynchronisation}%

        </div>

      </div>

    </div>
  )
}
