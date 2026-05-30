"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\PredictiveStrategicForecast.tsx
//
// Timestamp:
// 28 May 2026 13:30 Sydney
//
// PURPOSE:
// Predictive strategic operational intelligence engine.
// ====================================================================

export default function PredictiveStrategicForecast(){

  const [
    forecast,
    setForecast
  ] = useState<any>(null)

  // ================================================================
// LOAD
// ================================================================

  async function evaluateForecast(){

    try {

      const [

        stateResponse,

        eventsResponse,

        runtimeResponse

      ] = await Promise.all([

        fetch("/api/fose/state"),

        fetch("/api/runtime/events"),

        fetch("/api/runtime/command")
      ])

      const state =
        await stateResponse.json()

      const events =
        await eventsResponse.json()

      const runtime =
        await runtimeResponse.json()

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

      // ============================================================
      // TRAJECTORY SCORE
      // ============================================================

      let trajectory =

        Math.round(

          (
            readiness +
            survivability +
            operational
          ) / 3
        )

      // ============================================================
      // PENALTIES
      // ============================================================

      trajectory -=
        alerts * 3

      if(
        !runtime.runtime
        ?.predictiveRuntime
      ){

        trajectory -= 10
      }

      if(
        !runtime.runtime
        ?.telemetryRuntime
      ){

        trajectory -= 15
      }

      // ============================================================
      // STATE
      // ============================================================

      let posture =
        "ASCENDING"

      let projection =
        "Operational trajectory improving"

      if(trajectory < 50){

        posture =
          "COLLAPSE RISK"

        projection =
          "Critical survivability collapse trajectory detected"
      }

      else if(trajectory < 70){

        posture =
          "DECLINING"

        projection =
          "Operational degradation forecast detected"
      }

      else if(trajectory < 85){

        posture =
          "STABLE"

        projection =
          "Sustainable operational trajectory"
      }

      setForecast({

        posture,
        projection,
        trajectory
      })

    } catch(error){

      console.error(error)
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    evaluateForecast()

    const interval =

      setInterval(
        evaluateForecast,
        5000
      )

    return () =>
      clearInterval(interval)

  },[])

  if(!forecast){

    return null
  }

  // ================================================================
  // COLOR
  // ================================================================

  function getColor(){

    switch(forecast.posture){

      case "COLLAPSE RISK":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "DECLINING":

        return `
          border-orange-500
          bg-orange-950
          text-orange-300
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

            PREDICTIVE STRATEGIC FORECAST

          </div>

          <div
            className="
              text-5xl
              font-black
            "
          >

            {forecast.posture}

          </div>

          <div
            className="
              mt-3
              text-sm
            "
          >

            {forecast.projection}

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

            TRAJECTORY INDEX

          </div>

          <div
            className="
              text-6xl
              font-black
            "
          >

            {forecast.trajectory}

          </div>

        </div>

      </div>

    </div>
  )
}