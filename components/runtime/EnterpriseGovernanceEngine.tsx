"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\EnterpriseGovernanceEngine.tsx
//
// Timestamp:
// 28 May 2026 17:15 Sydney
//
// PURPOSE:
// Enterprise operational governance engine.
// ====================================================================

export default function EnterpriseGovernanceEngine(){

  const [
    governance,
    setGovernance
  ] = useState<any>(null)

  // ================================================================
// LOAD
// ================================================================

  async function evaluateGovernance(){

    try {

      const [

        runtimeResponse,

        eventsResponse,

        stateResponse

      ] = await Promise.all([

        fetch("/api/runtime/command"),

        fetch("/api/runtime/events"),

        fetch("/api/fose/state")
      ])

      const runtime =
        await runtimeResponse.json()

      const events =
        await eventsResponse.json()

      const state =
        await stateResponse.json()

      const alerts =

        (events.events || [])

        .filter(

          (event:any) =>

            event.type ===
            "RUNTIME_ALERT"
        )

        .length

      const survivability =
        state.state
        ?.survivabilityScore || 0

      let posture =
        "COMPLIANT"

      let governanceState =
        "Enterprise governance posture healthy"

      let authorization =
        "Operational command authority unrestricted"

      // ============================================================
      // ESCALATED
      // ============================================================

      if(

        survivability < 50

        ||

        alerts >= 8

      ){

        posture =
          "ESCALATED"

        governanceState =
          "Executive governance escalation active"

        authorization =
          "Operational authority escalation required"
      }

      // ============================================================
      // RESTRICTED
      // ============================================================

      else if(

        !runtime.runtime
        ?.predictiveRuntime

        ||

        !runtime.runtime
        ?.telemetryRuntime

      ){

        posture =
          "RESTRICTED"

        governanceState =
          "Operational governance restrictions active"

        authorization =
          "Command authority constrained"
      }

      // ============================================================
      // REVIEW
      // ============================================================

      else if(

        survivability < 75

        ||

        alerts >= 4

      ){

        posture =
          "REVIEW"

        governanceState =
          "Governance review posture active"

        authorization =
          "Operational audit review recommended"
      }

      setGovernance({

        posture,
        governanceState,
        authorization,

        governanceIndex:

          Math.round(

            (
              survivability +
              state.state
              ?.operationalReadiness
            ) / 2
          )
      })

    } catch(error){

      console.error(error)
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    evaluateGovernance()

    const interval =

      setInterval(
        evaluateGovernance,
        5000
      )

    return () =>
      clearInterval(interval)

  },[])

  if(!governance){

    return null
  }

  // ================================================================
  // COLOR
  // ================================================================

  function getColor(){

    switch(governance.posture){

      case "ESCALATED":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "RESTRICTED":

        return `
          border-orange-500
          bg-orange-950
          text-orange-300
        `

      case "REVIEW":

        return `
          border-yellow-500
          bg-yellow-950
          text-yellow-300
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

            ENTERPRISE GOVERNANCE ENGINE

          </div>

          <div
            className="
              text-5xl
              font-black
            "
          >

            {governance.posture}

          </div>

          <div
            className="
              mt-3
              text-sm
            "
          >

            {governance.governanceState}

          </div>

          <div
            className="
              mt-2
              text-xs
              opacity-80
            "
          >

            {governance.authorization}

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

            GOVERNANCE INDEX

          </div>

          <div
            className="
              text-6xl
              font-black
            "
          >

            {governance.governanceIndex}

          </div>

        </div>

      </div>

    </div>
  )
}