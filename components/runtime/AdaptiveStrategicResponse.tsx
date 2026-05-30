"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\AdaptiveStrategicResponse.tsx
//
// Timestamp:
// 28 May 2026 14:00 Sydney
//
// PURPOSE:
// Adaptive strategic operational intelligence engine.
// ====================================================================

export default function AdaptiveStrategicResponse(){

  const [
    adaptive,
    setAdaptive
  ] = useState<any>(null)

  // ================================================================
  // LOAD
  // ================================================================

  async function evaluateAdaptiveState(){

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

      const alerts =

        (events.events || [])

        .filter(

          (event:any) =>

            event.type ===
            "RUNTIME_ALERT"
        )

        .length

      let posture =
        "OPTIMIZED"

      let strategy =
        "Operational posture fully optimized"

      let adaptation =
        "No adaptive mitigation required"

      // ============================================================
      // CONTINGENCY
      // ============================================================

      if(

        survivability < 55

        ||

        readiness < 55

        ||

        alerts >= 6

      ){

        posture =
          "CONTINGENCY"

        strategy =
          "Mission continuity protection active"

        adaptation =
          "Autonomous contingency coordination engaged"
      }

      // ============================================================
      // CONSERVATION
      // ============================================================

      else if(

        survivability < 70

        ||

        readiness < 70

      ){

        posture =
          "CONSERVATION"

        strategy =
          "Survivability preservation strategy active"

        adaptation =
          "Adaptive deployment conservation enabled"
      }

      // ============================================================
      // ADAPTING
      // ============================================================

      else if(

        !runtime.runtime
        ?.predictiveRuntime

        ||

        alerts >= 3

      ){

        posture =
          "ADAPTING"

        strategy =
          "Adaptive mitigation strategy active"

        adaptation =
          "Dynamic operational balancing enabled"
      }

      setAdaptive({

        posture,
        strategy,
        adaptation,

        adaptiveIndex:

          Math.round(

            (
              readiness +
              survivability
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

    evaluateAdaptiveState()

    const interval =

      setInterval(
        evaluateAdaptiveState,
        5000
      )

    return () =>
      clearInterval(interval)

  },[])

  if(!adaptive){

    return null
  }

  // ================================================================
  // COLOR
  // ================================================================

  function getColor(){

    switch(adaptive.posture){

      case "CONTINGENCY":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "CONSERVATION":

        return `
          border-orange-500
          bg-orange-950
          text-orange-300
        `

      case "ADAPTING":

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

            ADAPTIVE STRATEGIC RESPONSE

          </div>

          <div
            className="
              text-5xl
              font-black
            "
          >

            {adaptive.posture}

          </div>

          <div
            className="
              mt-3
              text-sm
            "
          >

            {adaptive.strategy}

          </div>

          <div
            className="
              mt-2
              text-xs
              opacity-80
            "
          >

            {adaptive.adaptation}

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

            ADAPTIVE INDEX

          </div>

          <div
            className="
              text-6xl
              font-black
            "
          >

            {adaptive.adaptiveIndex}

          </div>

        </div>

      </div>

    </div>
  )
}