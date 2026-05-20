"use client"

/* =====================================================
   JustDefenders ©
   File:
   /components/command-centre/RealMissionStatusPanel.tsx

   Timestamp:
   14 May 2026 04:15 (Sydney)

   PURPOSE:
   Live operational mission status panel
===================================================== */

import React
from "react"

import {
  useMissionState
}
from "@/lib/state/useMissionState"

import {
  useMissionSocket
}
from "@/hooks/useMissionSocket"

export default function RealMissionStatusPanel(){

  useMissionSocket()

  const {

    missionStatus,

    activeThreats,

    telemetryRate

  } =
  useMissionState()

  return (

    <div className="jd-live-status-shell">

      <div className="jd-live-title">

        LIVE MISSION STATUS

      </div>

      <div className="jd-live-card">

        <span>Status</span>

        <strong>

          {missionStatus}

        </strong>

      </div>

      <div className="jd-live-card">

        <span>Threats</span>

        <strong>

          {activeThreats}

        </strong>

      </div>

      <div className="jd-live-card">

        <span>Telemetry/sec</span>

        <strong>

          {telemetryRate}

        </strong>

      </div>

    </div>
  )
}
