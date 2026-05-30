"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\DynamicThreatIntelligence.tsx
//
// Timestamp:
// 28 May 2026 19:15 Sydney
//
// PURPOSE:
// Dynamic realtime threat cognition engine.
// ====================================================================

export default function DynamicThreatIntelligence(){

  const [
    threat,
    setThreat
  ] = useState<any>(null)

  // ================================================================
// LOAD
// ================================================================

  async function evaluateThreats(){

    try {

      const [

        eventsResponse,

        stateResponse,

        runtimeResponse

      ] = await Promise.all([

        fetch("/api/runtime/events"),

        fetch("/api/fose/state"),

        fetch("/api/runtime/command")
      ])

      const events =
        await eventsResponse.json()

      const state =
        await stateResponse.json()

      const runtime =
        await runtimeResponse.json()

      const alerts =

        (events.events || [])

        .filter(

          (event:any) =>

            event.type ===
            "RUNTIME_ALERT"
        )

      const alertCount =
        alerts.length

      const survivability =
        state.state
        ?.survivabilityScore || 0

      const readiness =
        state.state
        ?.expeditionReadiness || 0

      let cognition =
        "STABLE"

      let escalation =
        "Threat posture stable"

      let trajectory =
        "No escalation trajectory detected"

      // ============================================================
      // CRITICAL
      // ============================================================

      if(

        alertCount >= 8

        ||

        survivability < 50

      ){

        cognition =
          "CRITICAL ESCALATION"

        escalation =
          "Rapid threat escalation detected"

        trajectory =
          "Operational survivability degradation accelerating"
      }

      // ============================================================
      // EVOLVING
      // ============================================================

      else if(

        alertCount >= 4

        ||

        readiness < 70

      ){

        cognition =
          "EVOLVING"

        escalation =
          "Adaptive threat evolution active"

        trajectory =
          "Operational pressure trajectory increasing"
      }

      // ============================================================
      // MONITORING
      // ============================================================

      else if(

        !runtime.runtime
        ?.predictiveRuntime

      ){

        cognition =
          "MONITORING"

        escalation =
          "Threat cognition monitoring active"

        trajectory =
          "Potential escalation vectors identified"
      }

      setThreat({

        cognition,
        escalation,
        trajectory,

        threatIndex:

          Math.round(

            (
              survivability +
              readiness
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

    evaluateThreats()

    const interval =

      setInterval(
        evaluateThreats,
        4000
      )

    return () =>
      clearInterval(interval)

  },[])

  if(!threat){

    return null
  }

  // ================================================================
  // COLOR
  // ================================================================

  function getColor(){

    switch(threat.cognition){

      case "CRITICAL ESCALATION":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "EVOLVING":

        return `
          border-orange-500
          bg-orange-950
          text-orange-300
        `

      case "MONITORING":

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

            DYNAMIC THREAT INTELLIGENCE

          </div>

          <div
            className="
              text-5xl
              font-black
            "
          >

            {threat.cognition}

          </div>

          <div
            className="
              mt-3
              text-sm
            "
          >

            {threat.escalation}

          </div>

          <div
            className="
              mt-2
              text-xs
              opacity-80
            "
          >

            {threat.trajectory}

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

            THREAT INDEX

          </div>

          <div
            className="
              text-6xl
              font-black
            "
          >

            {threat.threatIndex}

          </div>

        </div>

      </div>

    </div>
  )
}