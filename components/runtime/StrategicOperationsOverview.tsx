"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\StrategicOperationsOverview.tsx
//
// Timestamp:
// 28 May 2026 12:30 Sydney
//
// PURPOSE:
// Strategic operational oversight engine.
// ====================================================================

export default function StrategicOperationsOverview(){

  const [
    strategy,
    setStrategy
  ] = useState<any>(null)

  // ================================================================
  // LOAD
  // ================================================================

  async function evaluateStrategicPosture(){

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
        "SUSTAINED"

      let forecast =
        "Operational outlook stable"

      // ============================================================
      // UNSUSTAINABLE
      // ============================================================

      if(

        survivability < 55

        ||

        readiness < 55

        ||

        alerts >= 6

      ){

        posture =
          "UNSUSTAINABLE"

        forecast =
          "Mission sustainability compromised"
      }

      // ============================================================
      // ATTRITION
      // ============================================================

      else if(

        survivability < 70

        ||

        readiness < 70

      ){

        posture =
          "ATTRITION"

        forecast =
          "Survivability degradation accumulating"
      }

      // ============================================================
      // STRESSED
      // ============================================================

      else if(

        !runtime.runtime
        ?.predictiveRuntime

        ||

        alerts >= 3

      ){

        posture =
          "STRESSED"

        forecast =
          "Elevated operational pressure detected"
      }

      setStrategy({

        posture,
        forecast,
        readiness,
        survivability
      })

    } catch(error){

      console.error(error)
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    evaluateStrategicPosture()

    const interval =

      setInterval(
        evaluateStrategicPosture,
        5000
      )

    return () =>
      clearInterval(interval)

  },[])

  if(!strategy){

    return null
  }

  // ================================================================
  // COLOR
  // ================================================================

  function getColor(){

    switch(strategy.posture){

      case "UNSUSTAINABLE":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "ATTRITION":

        return `
          border-orange-500
          bg-orange-950
          text-orange-300
        `

      case "STRESSED":

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

            STRATEGIC OPERATIONS OVERVIEW

          </div>

          <div
            className="
              text-5xl
              font-black
            "
          >

            {strategy.posture}

          </div>

          <div
            className="
              mt-3
              text-sm
            "
          >

            {strategy.forecast}

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

            STRATEGIC READINESS

          </div>

          <div
            className="
              text-6xl
              font-black
            "
          >

            {
              Math.round(
                (
                  strategy.readiness +
                  strategy.survivability
                ) / 2
              )
            }%

          </div>

        </div>

      </div>

    </div>
  )
}