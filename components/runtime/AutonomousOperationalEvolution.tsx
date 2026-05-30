"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\AutonomousOperationalEvolution.tsx
//
// Timestamp:
// 28 May 2026 18:25 Sydney
//
// PURPOSE:
// Autonomous operational evolution engine.
// ====================================================================

export default function AutonomousOperationalEvolution(){

  const [
    evolution,
    setEvolution
  ] = useState<any>(null)

  // ================================================================
// LOAD
// ================================================================

  async function evaluateEvolution(){

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

      let evolutionState =
        "AUTONOMOUS EVOLUTION"

      let cognition =
        "Operational intelligence evolving continuously"

      let adaptation =
        "Recursive strategic refinement active"

      // ============================================================
      // EMERGENCY EVOLUTION
      // ============================================================

      if(

        survivability < 45

        ||

        alerts >= 8

      ){

        evolutionState =
          "EMERGENCY EVOLUTION"

        cognition =
          "Critical autonomous evolution engaged"

        adaptation =
          "Emergency survivability adaptation accelerating"
      }

      // ============================================================
      // STRATEGIC EVOLUTION
      // ============================================================

      else if(

        survivability < 70

        ||

        readiness < 70

      ){

        evolutionState =
          "STRATEGIC EVOLUTION"

        cognition =
          "Adaptive operational evolution active"

        adaptation =
          "Strategic survivability evolution enabled"
      }

      // ============================================================
      // COGNITIVE REFINEMENT
      // ============================================================

      else if(

        !runtime.runtime
        ?.predictiveRuntime

        ||

        operational < 85

      ){

        evolutionState =
          "COGNITIVE REFINEMENT"

        cognition =
          "Recursive cognition refinement active"

        adaptation =
          "Autonomous optimization evolution enabled"
      }

      setEvolution({

        evolutionState,
        cognition,
        adaptation,

        evolutionIndex:

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

    evaluateEvolution()

    const interval =

      setInterval(
        evaluateEvolution,
        4000
      )

    return () =>
      clearInterval(interval)

  },[])

  if(!evolution){

    return null
  }

  // ================================================================
  // COLORS
  // ================================================================

  function getColor(){

    switch(evolution.evolutionState){

      case "EMERGENCY EVOLUTION":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "STRATEGIC EVOLUTION":

        return `
          border-orange-500
          bg-orange-950
          text-orange-300
        `

      case "COGNITIVE REFINEMENT":

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

            AUTONOMOUS OPERATIONAL EVOLUTION

          </div>

          <div
            className="
              text-5xl
              font-black
            "
          >

            {evolution.evolutionState}

          </div>

          <div
            className="
              mt-3
              text-sm
            "
          >

            {evolution.cognition}

          </div>

          <div
            className="
              mt-2
              text-xs
              opacity-80
            "
          >

            {evolution.adaptation}

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

            EVOLUTION INDEX

          </div>

          <div
            className="
              text-6xl
              font-black
            "
          >

            {evolution.evolutionIndex}

          </div>

        </div>

      </div>

    </div>
  )
}