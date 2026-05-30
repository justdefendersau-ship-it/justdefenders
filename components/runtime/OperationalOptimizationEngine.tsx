"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\OperationalOptimizationEngine.tsx
//
// Timestamp:
// 28 May 2026 18:00 Sydney
//
// PURPOSE:
// Autonomous operational optimization engine.
// ====================================================================

export default function OperationalOptimizationEngine(){

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

      let optimizationState =
        "MAXIMIZED"

      let strategy =
        "Operational efficiency optimized"

      let recommendation =
        "Maintain expedition equilibrium"

      // ============================================================
      // CRITICAL
      // ============================================================

      if(

        survivability < 55

        ||

        alerts >= 7

      ){

        optimizationState =
          "CRITICAL RECOVERY"

        strategy =
          "Emergency optimization intervention active"

        recommendation =
          "Reduce operational load immediately"
      }

      // ============================================================
      // BALANCING
      // ============================================================

      else if(

        survivability < 75

        ||

        readiness < 75

      ){

        optimizationState =
          "BALANCING"

        strategy =
          "Adaptive survivability balancing active"

        recommendation =
          "Redistribute deployment exposure"
      }

      // ============================================================
      // TUNING
      // ============================================================

      else if(

        !runtime.runtime
        ?.predictiveRuntime

        ||

        operational < 85

      ){

        optimizationState =
          "TUNING"

        strategy =
          "Operational tuning optimization active"

        recommendation =
          "Optimize mission efficiency allocation"
      }

      setOptimization({

        optimizationState,
        strategy,
        recommendation,

        optimizationIndex:

          Math.round(

            (
              readiness +
              survivability +
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
        5000
      )

    return () =>
      clearInterval(interval)

  },[])

  if(!optimization){

    return null
  }

  // ================================================================
  // COLOR
  // ================================================================

  function getColor(){

    switch(optimization.optimizationState){

      case "CRITICAL RECOVERY":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "BALANCING":

        return `
          border-orange-500
          bg-orange-950
          text-orange-300
        `

      case "TUNING":

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

            OPERATIONAL OPTIMIZATION ENGINE

          </div>

          <div
            className="
              text-5xl
              font-black
            "
          >

            {optimization.optimizationState}

          </div>

          <div
            className="
              mt-3
              text-sm
            "
          >

            {optimization.strategy}

          </div>

          <div
            className="
              mt-2
              text-xs
              opacity-80
            "
          >

            {optimization.recommendation}

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