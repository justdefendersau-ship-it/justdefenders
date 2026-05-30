"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\SelfEvolvingOperationalLearning.tsx
//
// Timestamp:
// 28 May 2026 17:55 Sydney
//
// PURPOSE:
// Self-evolving operational intelligence engine.
// ====================================================================

export default function SelfEvolvingOperationalLearning(){

  const [
    learning,
    setLearning
  ] = useState<any>(null)

  // ================================================================
// LOAD
// ================================================================

  async function evaluateLearning(){

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

      let evolution =
        "ADAPTIVE LEARNING"

      let cognition =
        "Operational intelligence evolving normally"

      let adaptation =
        "Recursive survivability learning active"

      // ============================================================
      // RECURSIVE ESCALATION
      // ============================================================

      if(

        survivability < 45

        ||

        alerts >= 8

      ){

        evolution =
          "RECURSIVE ESCALATION"

        cognition =
          "Emergency adaptive cognition active"

        adaptation =
          "Autonomous mitigation learning accelerating"
      }

      // ============================================================
      // STRATEGIC ADAPTATION
      // ============================================================

      else if(

        survivability < 70

        ||

        readiness < 70

      ){

        evolution =
          "STRATEGIC ADAPTATION"

        cognition =
          "Adaptive operational learning active"

        adaptation =
          "Strategic survivability refinement enabled"
      }

      // ============================================================
      // COGNITIVE TUNING
      // ============================================================

      else if(

        !runtime.runtime
        ?.predictiveRuntime

        ||

        operational < 85

      ){

        evolution =
          "COGNITIVE TUNING"

        cognition =
          "Operational cognition tuning active"

        adaptation =
          "Adaptive optimization learning enabled"
      }

      setLearning({

        evolution,
        cognition,
        adaptation,

        learningIndex:

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

    evaluateLearning()

    const interval =

      setInterval(
        evaluateLearning,
        4000
      )

    return () =>
      clearInterval(interval)

  },[])

  if(!learning){

    return null
  }

  // ================================================================
  // COLORS
  // ================================================================

  function getColor(){

    switch(learning.evolution){

      case "RECURSIVE ESCALATION":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "STRATEGIC ADAPTATION":

        return `
          border-orange-500
          bg-orange-950
          text-orange-300
        `

      case "COGNITIVE TUNING":

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

            SELF-EVOLVING OPERATIONAL LEARNING

          </div>

          <div
            className="
              text-5xl
              font-black
            "
          >

            {learning.evolution}

          </div>

          <div
            className="
              mt-3
              text-sm
            "
          >

            {learning.cognition}

          </div>

          <div
            className="
              mt-2
              text-xs
              opacity-80
            "
          >

            {learning.adaptation}

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

            LEARNING INDEX

          </div>

          <div
            className="
              text-6xl
              font-black
            "
          >

            {learning.learningIndex}

          </div>

        </div>

      </div>

    </div>
  )
}