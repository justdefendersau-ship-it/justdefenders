"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\ExecutiveCommandOverview.tsx
//
// Timestamp:
// 28 May 2026 13:00 Sydney
//
// PURPOSE:
// Executive operational intelligence engine.
// ====================================================================

export default function ExecutiveCommandOverview(){

  const [
    executive,
    setExecutive
  ] = useState<any>(null)

  // ================================================================
  // LOAD
  // ================================================================

  async function evaluateExecutiveState(){

    try {

      const [

        stateResponse,

        runtimeResponse,

        eventsResponse

      ] = await Promise.all([

        fetch("/api/fose/state"),

        fetch("/api/runtime/command"),

        fetch("/api/runtime/events")
      ])

      const state =
        await stateResponse.json()

      const runtime =
        await runtimeResponse.json()

      const events =
        await eventsResponse.json()

      const readiness =
        state.state
        ?.expeditionReadiness || 0

      const survivability =
        state.state
        ?.survivabilityScore || 0

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

      const strategicIndex =

        Math.round(

          (
            readiness +
            survivability +
            operational
          ) / 3
        )

      let posture =
        "DOMINANT"

      let advisory =
        "Operational superiority maintained"

      // ============================================================
      // CRITICAL
      // ============================================================

      if(

        strategicIndex < 55

        ||

        alerts >= 7

      ){

        posture =
          "CRITICAL"

        advisory =
          "Command sustainability threatened"
      }

      // ============================================================
      // PRESSURED
      // ============================================================

      else if(

        strategicIndex < 70

        ||

        !runtime.runtime
        ?.predictiveRuntime

      ){

        posture =
          "PRESSURED"

        advisory =
          "Elevated strategic operational exposure"
      }

      // ============================================================
      // STABLE
      // ============================================================

      else if(
        strategicIndex < 85
      ){

        posture =
          "STABLE"

        advisory =
          "Sustainable expedition posture"
      }

      setExecutive({

        posture,
        advisory,
        strategicIndex,
        alerts
      })

    } catch(error){

      console.error(error)
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    evaluateExecutiveState()

    const interval =

      setInterval(
        evaluateExecutiveState,
        5000
      )

    return () =>
      clearInterval(interval)

  },[])

  if(!executive){

    return null
  }

  // ================================================================
  // COLOR
  // ================================================================

  function getColor(){

    switch(executive.posture){

      case "CRITICAL":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "PRESSURED":

        return `
          border-yellow-500
          bg-yellow-950
          text-yellow-300
        `

      case "STABLE":

        return `
          border-cyan-500
          bg-cyan-950
          text-cyan-300
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

            EXECUTIVE COMMAND OVERVIEW

          </div>

          <div
            className="
              text-5xl
              font-black
            "
          >

            {executive.posture}

          </div>

          <div
            className="
              mt-3
              text-sm
            "
          >

            {executive.advisory}

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

            STRATEGIC INDEX

          </div>

          <div
            className="
              text-6xl
              font-black
            "
          >

            {executive.strategicIndex}

          </div>

        </div>

      </div>

    </div>
  )
}