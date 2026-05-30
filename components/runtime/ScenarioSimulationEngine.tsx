"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\ScenarioSimulationEngine.tsx
//
// Timestamp:
// 28 May 2026 16:45 Sydney
//
// PURPOSE:
// Operational scenario simulation engine.
// ====================================================================

export default function ScenarioSimulationEngine(){

  const [
    simulation,
    setSimulation
  ] = useState<any[]>([])

  // ================================================================
// LOAD
// ================================================================

  async function runSimulation(){

    try {

      const response =
        await fetch(
          "/api/fose/state"
        )

      const result =
        await response.json()

      const readiness =
        result.state
        ?.expeditionReadiness || 0

      const survivability =
        result.state
        ?.survivabilityScore || 0

      const operational =
        result.state
        ?.operationalReadiness || 0

      const scenarios = [

        {
          scenario:
            "OPTIMAL",

          readiness:
            Math.min(
              100,
              readiness + 8
            ),

          survivability:
            Math.min(
              100,
              survivability + 6
            ),

          outcome:
            "Stable expedition projection"
        },

        {
          scenario:
            "DEGRADED",

          readiness:
            Math.max(
              0,
              readiness - 15
            ),

          survivability:
            Math.max(
              0,
              survivability - 18
            ),

          outcome:
            "Operational pressure accumulation"
        },

        {
          scenario:
            "CRITICAL FAILURE",

          readiness:
            Math.max(
              0,
              readiness - 35
            ),

          survivability:
            Math.max(
              0,
              survivability - 40
            ),

          outcome:
            "Mission survivability collapse risk"
        },

        {
          scenario:
            "RECOVERY PATH",

          readiness:
            Math.min(
              100,
              readiness + 12
            ),

          survivability:
            Math.min(
              100,
              survivability + 15
            ),

          outcome:
            "Mitigation recovery trajectory"
        }
      ]

      setSimulation(
        scenarios
      )

    } catch(error){

      console.error(error)
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    runSimulation()

    const interval =

      setInterval(
        runSimulation,
        5000
      )

    return () =>
      clearInterval(interval)

  },[])

  // ================================================================
  // COLOR
  // ================================================================

  function getColor(
    scenario:string
  ){

    switch(scenario){

      case "CRITICAL FAILURE":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "DEGRADED":

        return `
          border-orange-500
          bg-orange-950
          text-orange-300
        `

      case "RECOVERY PATH":

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
      className="
        border
        border-zinc-800
        rounded-2xl
        bg-zinc-900
        p-6
        mb-8
      "
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
              text-2xl
              font-black
            "
          >

            Scenario Simulation Engine

          </div>

          <div
            className="
              text-sm
              text-zinc-400
              mt-2
            "
          >

            Expedition survivability simulation runtime

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

          SIMULATION ACTIVE

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
          simulation.map(

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

                  ${getColor(
                    item.scenario
                  )}
                `}
              >

                <div
                  className="
                    text-xl
                    font-black
                    mb-4
                  "
                >

                  {item.scenario}

                </div>

                <div
                  className="
                    flex
                    justify-between
                    text-sm
                    mb-2
                  "
                >

                  <span>
                    Readiness
                  </span>

                  <span>
                    {item.readiness}%
                  </span>

                </div>

                <div
                  className="
                    flex
                    justify-between
                    text-sm
                    mb-4
                  "
                >

                  <span>
                    Survivability
                  </span>

                  <span>
                    {item.survivability}%
                  </span>

                </div>

                <div
                  className="
                    text-xs
                    opacity-80
                  "
                >

                  {item.outcome}

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}