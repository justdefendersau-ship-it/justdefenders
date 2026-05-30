"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\OperationalCognitiveMemory.tsx
//
// Timestamp:
// 28 May 2026 17:40 Sydney
//
// PURPOSE:
// Operational cognitive persistence engine.
// ====================================================================

export default function OperationalCognitiveMemory(){

  const [
    memory,
    setMemory
  ] = useState<any[]>([])

  const [
    cognition,
    setCognition
  ] = useState("LEARNING")

  // ================================================================
// LOAD
// ================================================================

  async function evaluateMemory(){

    try {

      const [

        eventsResponse,

        stateResponse

      ] = await Promise.all([

        fetch("/api/runtime/events"),

        fetch("/api/fose/state")
      ])

      const events =
        await eventsResponse.json()

      const state =
        await stateResponse.json()

      const survivability =
        state.state
        ?.survivabilityScore || 0

      const readiness =
        state.state
        ?.expeditionReadiness || 0

      const operational =
        state.state
        ?.operationalReadiness || 0

      const alertEvents =

        (events.events || [])

        .filter(

          (event:any) =>

            event.type ===
            "RUNTIME_ALERT"
        )

      const memoryPatterns = [

        {
          pattern:
            "SURVIVABILITY TREND",

          value:
            survivability,

          status:

            survivability < 60
              ? "DEGRADING"
              : "STABLE"
        },

        {
          pattern:
            "READINESS HISTORY",

          value:
            readiness,

          status:

            readiness < 70
              ? "PRESSURED"
              : "HEALTHY"
        },

        {
          pattern:
            "ALERT RECURSION",

          value:
            alertEvents.length,

          status:

            alertEvents.length >= 5
              ? "RECURRING"
              : "NOMINAL"
        },

        {
          pattern:
            "OPERATIONAL MEMORY",

          value:
            operational,

          status:

            operational < 75
              ? "VOLATILE"
              : "OPTIMAL"
        }
      ]

      setMemory(
        memoryPatterns
      )

      // ============================================================
      // COGNITION
      // ============================================================

      if(
        alertEvents.length >= 8
      ){

        setCognition(
          "ESCALATION MEMORY"
        )
      }

      else if(
        survivability < 65
      ){

        setCognition(
          "ADAPTIVE LEARNING"
        )
      }

      else {

        setCognition(
          "LEARNING"
        )
      }

    } catch(error){

      console.error(error)
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    evaluateMemory()

    const interval =

      setInterval(
        evaluateMemory,
        5000
      )

    return () =>
      clearInterval(interval)

  },[])

  // ================================================================
  // COLORS
  // ================================================================

  function getHeaderColor(){

    switch(cognition){

      case "ESCALATION MEMORY":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "ADAPTIVE LEARNING":

        return `
          border-orange-500
          bg-orange-950
          text-orange-300
        `

      default:

        return `
          border-cyan-500
          bg-cyan-950
          text-cyan-300
        `
    }
  }

  function getPatternColor(
    status:string
  ){

    switch(status){

      case "DEGRADING":

      case "PRESSURED":

      case "RECURRING":

      case "VOLATILE":

        return `
          border-red-500
          bg-red-950
          text-red-300
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

        ${getHeaderColor()}
      `}
    >

      <div
        className="
          flex
          items-center
          justify-between
          mb-6
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

            OPERATIONAL COGNITIVE MEMORY

          </div>

          <div
            className="
              text-5xl
              font-black
            "
          >

            {cognition}

          </div>

        </div>

        <div
          className="
            px-4
            py-2
            rounded-full
            border
            border-cyan-500
            bg-cyan-950
            text-cyan-300
            text-sm
            font-bold
          "
        >

          MEMORY ACTIVE

        </div>

      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-4
        "
      >

        {
          memory.map(

            (
              item,
              index
            ) => (

              <div

                key={index}

                className={`
                  border
                  rounded-2xl
                  p-5

                  ${getPatternColor(
                    item.status
                  )}
                `}
              >

                <div
                  className="
                    text-lg
                    font-black
                    mb-4
                  "
                >

                  {item.pattern}

                </div>

                <div
                  className="
                    text-4xl
                    font-black
                    mb-3
                  "
                >

                  {item.value}

                </div>

                <div
                  className="
                    text-xs
                    font-bold
                    opacity-90
                  "
                >

                  {item.status}

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}