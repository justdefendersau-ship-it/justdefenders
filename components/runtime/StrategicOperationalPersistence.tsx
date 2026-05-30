"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\StrategicOperationalPersistence.tsx
//
// Timestamp:
// 28 May 2026 18:40 Sydney
//
// PURPOSE:
// Strategic operational persistence engine.
// ====================================================================

export default function StrategicOperationalPersistence(){

  const [
    persistence,
    setPersistence
  ] = useState<any>(null)

  // ================================================================
// LOAD
// ================================================================

  async function evaluatePersistence(){

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

      let continuity =
        "PERSISTENT"

      let orchestration =
        "Operational continuity stable"

      let cognition =
        "Strategic persistence maintained"

      // ============================================================
      // CRITICAL CONTINUITY
      // ============================================================

      if(

        survivability < 45

        ||

        alerts >= 8

      ){

        continuity =
          "CRITICAL CONTINUITY"

        orchestration =
          "Emergency continuity orchestration active"

        cognition =
          "Survivability persistence stabilization engaged"
      }

      // ============================================================
      // ADAPTIVE CONTINUITY
      // ============================================================

      else if(

        survivability < 70

        ||

        readiness < 70

      ){

        continuity =
          "ADAPTIVE CONTINUITY"

        orchestration =
          "Adaptive continuity balancing active"

        cognition =
          "Operational persistence refinement enabled"
      }

      // ============================================================
      // STRATEGIC PERSISTENCE
      // ============================================================

      else if(

        !runtime.runtime
        ?.predictiveRuntime

        ||

        operational < 85

      ){

        continuity =
          "STRATEGIC PERSISTENCE"

        orchestration =
          "Strategic operational continuity active"

        cognition =
          "Recursive persistence optimization enabled"
      }

      setPersistence({

        continuity,
        orchestration,
        cognition,

        persistenceIndex:

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

    evaluatePersistence()

    const interval =

      setInterval(
        evaluatePersistence,
        4000
      )

    return () =>
      clearInterval(interval)

  },[])

  if(!persistence){

    return null
  }

  // ================================================================
  // COLORS
  // ================================================================

  function getColor(){

    switch(persistence.continuity){

      case "CRITICAL CONTINUITY":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "ADAPTIVE CONTINUITY":

        return `
          border-orange-500
          bg-orange-950
          text-orange-300
        `

      case "STRATEGIC PERSISTENCE":

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

            STRATEGIC OPERATIONAL PERSISTENCE

          </div>

          <div
            className="
              text-5xl
              font-black
            "
          >

            {persistence.continuity}

          </div>

          <div
            className="
              mt-3
              text-sm
            "
          >

            {persistence.orchestration}

          </div>

          <div
            className="
              mt-2
              text-xs
              opacity-80
            "
          >

            {persistence.cognition}

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

            PERSISTENCE INDEX

          </div>

          <div
            className="
              text-6xl
              font-black
            "
          >

            {persistence.persistenceIndex}

          </div>

        </div>

      </div>

    </div>
  )
}