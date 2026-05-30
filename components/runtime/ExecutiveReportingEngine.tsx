"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\ExecutiveReportingEngine.tsx
//
// Timestamp:
// 28 May 2026 20:00 Sydney
//
// PURPOSE:
// Executive operational reporting engine.
// ====================================================================

export default function ExecutiveReportingEngine(){

  const [
    report,
    setReport
  ] = useState<any>(null)

  // ================================================================
// LOAD
// ================================================================

  async function generateExecutiveReport(){

    try {

      const [

        stateResponse,

        eventsResponse,

        governanceResponse

      ] = await Promise.all([

        fetch("/api/fose/state"),

        fetch("/api/runtime/events"),

        fetch("/api/runtime/command")
      ])

      const state =
        await stateResponse.json()

      const events =
        await eventsResponse.json()

      const governance =
        await governanceResponse.json()

      const survivability =
        state.state
        ?.survivabilityScore || 0

      const readiness =
        state.state
        ?.expeditionReadiness || 0

      const operational =
        state.state
        ?.operationalReadiness || 0

      const alerts =

        (events.events || [])

        .filter(

          (event:any) =>

            event.type ===
            "RUNTIME_ALERT"
        )

        .length

      let posture =
        "STABLE"

      let executiveSummary =
        "Operational posture healthy"

      let governanceState =
        "Enterprise governance stable"

      // ============================================================
      // ELEVATED
      // ============================================================

      if(

        survivability < 60

        ||

        alerts >= 6

      ){

        posture =
          "ELEVATED"

        executiveSummary =
          "Operational survivability pressure increasing"

        governanceState =
          "Executive review recommended"
      }

      // ============================================================
      // CRITICAL
      // ============================================================

      if(

        survivability < 45

        ||

        alerts >= 9

      ){

        posture =
          "CRITICAL"

        executiveSummary =
          "Operational degradation escalation active"

        governanceState =
          "Executive intervention required"
      }

      setReport({

        posture,
        executiveSummary,
        governanceState,

        operationalIndex:

          Math.round(

            (
              survivability +
              readiness +
              operational
            ) / 3
          ),

        totalAlerts:
          alerts,

        predictiveRuntime:

          governance.runtime
          ?.predictiveRuntime
            ? "ACTIVE"
            : "DISABLED"
      })

    } catch(error){

      console.error(error)
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    generateExecutiveReport()

    const interval =

      setInterval(
        generateExecutiveReport,
        5000
      )

    return () =>
      clearInterval(interval)

  },[])

  if(!report){

    return null
  }

  // ================================================================
  // COLOR
  // ================================================================

  function getColor(){

    switch(report.posture){

      case "CRITICAL":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "ELEVATED":

        return `
          border-orange-500
          bg-orange-950
          text-orange-300
        `

      default:

        return `
          border-green-500
          bg-green-950
          text-green-300
        `
    }
  }

  // ================================================================
  // PAGE
  // ================================================================

  return (

    <div
      className={`
        border
        rounded-2xl
        p-6
        mb-8

        ${getColor()}
      `}
    >

      <div
        className="
          flex
          items-center
          justify-between
          mb-6
        "
      >

        <div>

          <div
            className="
              text-sm
              opacity-80
              mb-2
            "
          >

            EXECUTIVE REPORTING ENGINE

          </div>

          <div
            className="
              text-5xl
              font-black
            "
          >

            {report.posture}

          </div>

          <div
            className="
              mt-3
              text-sm
            "
          >

            {report.executiveSummary}

          </div>

          <div
            className="
              mt-2
              text-xs
              opacity-80
            "
          >

            {report.governanceState}

          </div>

        </div>

        <div
          className="
            text-right
          "
        >

          <div
            className="
              text-xs
              opacity-70
              mb-2
            "
          >

            OPERATIONAL INDEX

          </div>

          <div
            className="
              text-6xl
              font-black
            "
          >

            {report.operationalIndex}

          </div>

        </div>

      </div>

      <div
        className="
          grid
          grid-cols-3
          gap-4
        "
      >

        <div
          className="
            border
            border-zinc-800
            rounded-xl
            bg-black/40
            p-4
          "
        >

          <div
            className="
              text-xs
              opacity-70
            "
          >

            ACTIVE ALERTS

          </div>

          <div
            className="
              text-3xl
              font-black
              mt-2
            "
          >

            {report.totalAlerts}

          </div>

        </div>

        <div
          className="
            border
            border-zinc-800
            rounded-xl
            bg-black/40
            p-4
          "
        >

          <div
            className="
              text-xs
              opacity-70
            "
          >

            PREDICTIVE RUNTIME

          </div>

          <div
            className="
              text-xl
              font-black
              mt-3
            "
          >

            {report.predictiveRuntime}

          </div>

        </div>

        <div
          className="
            border
            border-zinc-800
            rounded-xl
            bg-black/40
            p-4
          "
        >

          <div
            className="
              text-xs
              opacity-70
            "
          >

            GOVERNANCE

          </div>

          <div
            className="
              text-xl
              font-black
              mt-3
            "
          >

            {report.posture}

          </div>

        </div>

      </div>

    </div>
  )
}