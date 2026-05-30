"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\PredictiveMissionOptimization.tsx
//
// Timestamp:
// 28 May 2026 18:10 Sydney
//
// PURPOSE:
// Predictive autonomous mission optimization engine.
// ====================================================================

export default function PredictiveMissionOptimization(){

  const [
    optimization,
    setOptimization
  ] = useState<any>(null)

  // ================================================================
// LOAD
// ================================================================

  async function evaluateOptimization(){

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

      let prediction =
        "OPTIMIZED"

      let forecast =
        "Mission survivability trajectory stable"

      let balancing =
        "Predictive expedition balancing active"

      // ============================================================
      // PREVENTION MODE
      // ============================================================

      if(

        survivability < 50

        ||

        alerts >= 8

      ){

        prediction =
          "PREVENTION MODE"

        forecast =
          "Predictive degradation prevention active"

        balancing =
          "Emergency survivability optimization engaged"
      }

      // ============================================================
      // ADAPTIVE OPTIMIZATION
      // ============================================================

      else if(

        survivability < 75

        ||

        readiness < 75

      ){

        prediction =
          "ADAPTIVE OPTIMIZATION"

        forecast =
          "Operational efficiency drift detected"

        balancing =
          "Adaptive predictive balancing enabled"
      }

      // ============================================================
      // STRATEGIC FORECASTING
      // ============================================================

      else if(

        !runtime.runtime
        ?.predictiveRuntime

        ||

        operational < 85

      ){

        prediction =
          "STRATEGIC FORECASTING"

        forecast =
          "Predictive mission tuning active"

        balancing =
          "Autonomous efficiency forecasting enabled"
      }

      setOptimization({

        prediction,
        forecast,
        balancing,

        optimizationIndex:

          Math.round(

            (
              survivability +
              readiness +
              operational
            ) / 3
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

    evaluateOptimization()

    const interval =

      setInterval(
        evaluateOptimization,
        4000
      )

    return () =>
      clearInterval(interval)

  },[])

  if(!optimization){

    return null
  }

  // ================================================================
  // COLORS
  // ================================================================

  function getColor(){

    switch(optimization.prediction){

      case "PREVENTION MODE":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "ADAPTIVE OPTIMIZATION":

        return `
          border-orange-500
          bg-orange-950
          text-orange-300
        `

      case "STRATEGIC FORECASTING":

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

            PREDICTIVE MISSION OPTIMIZATION

          </div>

          <div
            className="
              text-5xl
              font-black
            "
          >

            {optimization.prediction}

          </div>

          <div
            className="
              mt-3
              text-sm
            "
          >

            {optimization.forecast}

          </div>

          <div
            className="
              mt-2
              text-xs
              opacity-80
            "
          >

            {optimization.balancing}

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

            OPTIMIZATION INDEX

          </div>

          <div
            className="
              text-6xl
              font-black
            "
          >

            {optimization.optimizationIndex}

          </div>

        </div>

      </div>

    </div>
  )
}