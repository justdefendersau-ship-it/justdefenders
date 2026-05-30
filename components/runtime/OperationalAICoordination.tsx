"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\OperationalAICoordination.tsx
//
// Timestamp:
// 28 May 2026 15:15 Sydney
//
// PURPOSE:
// Operational AI coordination engine.
// ====================================================================

export default function OperationalAICoordination(){

  const [
    ai,
    setAI
  ] = useState<any>(null)

  // ================================================================
// LOAD
// ================================================================

  async function evaluateOperationalAI(){

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

      let cognition =
        "ANALYTICAL"

      let advisory =
        "Operational posture stable"

      let recommendation =
        "Maintain expedition trajectory"

      // ============================================================
      // INTERVENTION
      // ============================================================

      if(

        survivability < 55

        ||

        readiness < 55

        ||

        alerts >= 7

      ){

        cognition =
          "INTERVENTION"

        advisory =
          "Critical survivability intervention required"

        recommendation =
          "Immediately reduce operational exposure"
      }

      // ============================================================
      // PRIORITIZING
      // ============================================================

      else if(

        alerts >= 4

        ||

        !runtime.runtime
        ?.predictiveRuntime

      ){

        cognition =
          "PRIORITIZING"

        advisory =
          "Threat prioritization escalation active"

        recommendation =
          "Rebalance fleet operational posture"
      }

      // ============================================================
      // OPTIMIZING
      // ============================================================

      else if(

        survivability < 80

        ||

        operational < 80

      ){

        cognition =
          "OPTIMIZING"

        advisory =
          "Operational optimization opportunities detected"

        recommendation =
          "Adjust deployment efficiency dynamically"
      }

      setAI({

        cognition,
        advisory,
        recommendation,

        intelligenceIndex:

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

    evaluateOperationalAI()

    const interval =

      setInterval(
        evaluateOperationalAI,
        5000
      )

    return () =>
      clearInterval(interval)

  },[])

  if(!ai){

    return null
  }

  // ================================================================
  // COLOR
  // ================================================================

  function getColor(){

    switch(ai.cognition){

      case "INTERVENTION":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "PRIORITIZING":

        return `
          border-orange-500
          bg-orange-950
          text-orange-300
        `

      case "OPTIMIZING":

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

            OPERATIONAL AI COORDINATION

          </div>

          <div
            className="
              text-5xl
              font-black
            "
          >

            {ai.cognition}

          </div>

          <div
            className="
              mt-3
              text-sm
            "
          >

            {ai.advisory}

          </div>

          <div
            className="
              mt-2
              text-xs
              opacity-80
            "
          >

            {ai.recommendation}

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

            AI INTELLIGENCE INDEX

          </div>

          <div
            className="
              text-6xl
              font-black
            "
          >

            {ai.intelligenceIndex}

          </div>

        </div>

      </div>

    </div>
  )
}