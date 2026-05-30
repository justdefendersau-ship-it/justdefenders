"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\fose\FleetOperationalStateCard.tsx
//
// Timestamp:
// 27 May 2026 13:35 Sydney
//
// PURPOSE:
// Fleet Operational State Engine dashboard.
// ====================================================================

export default function FleetOperationalStateCard(){

  const [
    state,
    setState
  ] = useState<any>(null)

  // ================================================================
  // LOAD
  // ================================================================

  async function loadState(){

    try {

      const response =
        await fetch(

          "/api/fose/state"
        )

      const result =
        await response.json()

      setState(
        result.state
      )

    } catch(error){

      console.error(
        error
      )
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    loadState()

  },[])

  // ================================================================
  // LOADING
  // ================================================================

  if(!state){

    return (

      <div
        className="
          bg-zinc-900
          rounded-2xl
          p-6
          border
          border-zinc-800
        "
      >

        Loading FOSE...

      </div>
    )
  }

  // ================================================================
  // STATUS COLOUR
  // ================================================================

  function getStatusColour(){

    switch(
      state.operationalStatus
    ){

      case "GREEN":
        return "text-green-400"

      case "AMBER":
        return "text-yellow-400"

      case "RED":
        return "text-red-400"

      default:
        return "text-white"
    }
  }

  // ================================================================
  // PAGE
  // ================================================================

  return (

    <div
      className="
        bg-zinc-900
        rounded-2xl
        p-6
        border
        border-zinc-800
      "
    >

      <div
        className="
          text-2xl
          font-bold
          mb-6
        "
      >

        Fleet Operational State

      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-6
        "
      >

        <div>

          <div
            className="
              text-zinc-400
              text-sm
            "
          >

            Operational Readiness

          </div>

          <div
            className="
              text-4xl
              font-bold
              mt-2
            "
          >

            {state.operationalReadiness}%

          </div>

        </div>

        <div>

          <div
            className="
              text-zinc-400
              text-sm
            "
          >

            Expedition Readiness

          </div>

          <div
            className="
              text-4xl
              font-bold
              mt-2
            "
          >

            {state.expeditionReadiness}%

          </div>

        </div>

        <div>

          <div
            className="
              text-zinc-400
              text-sm
            "
          >

            Survivability Score

          </div>

          <div
            className="
              text-4xl
              font-bold
              mt-2
            "
          >

            {state.survivabilityScore}%

          </div>

        </div>

        <div>

          <div
            className="
              text-zinc-400
              text-sm
            "
          >

            Operational Status

          </div>

          <div
            className={`
              text-4xl
              font-bold
              mt-2
              ${getStatusColour()}
            `}
          >

            {state.operationalStatus}

          </div>

        </div>

      </div>

      {/* ============================================================
          DETAIL GRID
      ============================================================ */}

      <div
        className="
          mt-8
          grid
          grid-cols-2
          gap-4
          text-sm
        "
      >

        <div>

          Maintenance Burden:
          {" "}
          {state.maintenanceBurden}

        </div>

        <div>

          Failure Exposure:
          {" "}
          {state.failureExposure}

        </div>

        <div>

          Overdue Services:
          {" "}
          {state.overdueServices}

        </div>

        <div>

          Active Alerts:
          {" "}
          {state.activeAlerts}

        </div>

        <div>

          Maintenance Events:
          {" "}
          {state.maintenanceEvents}

        </div>

        <div>

          Survivability Alerts:
          {" "}
          {state.survivabilityAlerts}

        </div>

      </div>

    </div>
  )
}