"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\OperationalThreatCorrelation.tsx
//
// Timestamp:
// 28 May 2026 09:00 Sydney
//
// PURPOSE:
// Tactical operational threat intelligence engine.
// ====================================================================

export default function OperationalThreatCorrelation(){

  const [
    threat,
    setThreat
  ] = useState<any>(null)

  // ================================================================
  // LOAD
  // ================================================================

  async function loadThreats(){

    try {

      const [

        runtimeResponse,

        stateResponse,

        eventsResponse

      ] = await Promise.all([

        fetch("/api/runtime/command"),

        fetch("/api/fose/state"),

        fetch("/api/runtime/events")
      ])

      const runtime =
        await runtimeResponse.json()

      const state =
        await stateResponse.json()

      const events =
        await eventsResponse.json()

      let score = 0

      // ============================================================
      // RUNTIME FACTORS
      // ============================================================

      if(
        !runtime.runtime
        ?.predictiveRuntime
      ){

        score += 20
      }

      if(
        !runtime.runtime
        ?.telemetryRuntime
      ){

        score += 30
      }

      // ============================================================
      // STATE FACTORS
      // ============================================================

      if(
        state.state
        ?.operationalReadiness < 70
      ){

        score += 20
      }

      if(
        state.state
        ?.survivabilityScore < 75
      ){

        score += 25
      }

      if(
        state.state
        ?.overdueServices > 2
      ){

        score += 15
      }

      // ============================================================
      // EVENT FACTORS
      // ============================================================

      const criticalAlerts =

        (events.events || [])

        .filter(

          (event:any) =>

            event.type ===
            "RUNTIME_ALERT"
        )

      score +=
        criticalAlerts.length * 5

      // ============================================================
      // LEVEL
      // ============================================================

      let level =
        "LOW"

      if(score >= 80){

        level =
          "CRITICAL"

      } else if(score >= 60){

        level =
          "HIGH"

      } else if(score >= 40){

        level =
          "MEDIUM"
      }

      // ============================================================
      // MESSAGE
      // ============================================================

      let message =
        "Operational posture stable"

      if(level === "CRITICAL"){

        message =
          "Critical expedition survivability exposure detected"
      }

      else if(level === "HIGH"){

        message =
          "High operational degradation risk detected"
      }

      else if(level === "MEDIUM"){

        message =
          "Elevated operational exposure detected"
      }

      setThreat({

        score,
        level,
        message
      })

    } catch(error){

      console.error(error)
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    loadThreats()

    const interval =

      setInterval(
        loadThreats,
        5000
      )

    return () =>
      clearInterval(interval)

  },[])

  if(!threat){

    return null
  }

  // ================================================================
  // COLORS
  // ================================================================

  function getColor(){

    switch(threat.level){

      case "LOW":

        return `
          border-green-500
          bg-green-950
          text-green-300
        `

      case "MEDIUM":

        return `
          border-yellow-500
          bg-yellow-950
          text-yellow-300
        `

      case "HIGH":

        return `
          border-orange-500
          bg-orange-950
          text-orange-300
        `

      case "CRITICAL":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      default:

        return `
          border-zinc-700
          bg-zinc-900
          text-white
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

            OPERATIONAL THREAT CORRELATION

          </div>

          <div
            className="
              text-4xl
              font-black
            "
          >

            {threat.level}

          </div>

          <div
            className="
              mt-3
              text-sm
            "
          >

            {threat.message}

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

            THREAT SCORE

          </div>

          <div
            className="
              text-6xl
              font-black
            "
          >

            {threat.score}

          </div>

        </div>

      </div>

    </div>
  )
}