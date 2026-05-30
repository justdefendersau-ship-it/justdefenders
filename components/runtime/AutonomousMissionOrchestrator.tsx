"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\AutonomousMissionOrchestrator.tsx
//
// Timestamp:
// 28 May 2026 14:30 Sydney
//
// PURPOSE:
// Autonomous mission orchestration engine.
// ====================================================================

export default function AutonomousMissionOrchestrator(){

  const [
    orchestration,
    setOrchestration
  ] = useState<any>(null)

  // ================================================================
// LOAD
// ================================================================

  async function evaluateMissionOrchestration(){

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

      const orchestrationIndex =

        Math.round(

          (
            readiness +
            survivability +
            operational
          ) / 3
        )

      let posture =
        "SYNCHRONIZED"

      let coordination =
        "Autonomous mission coordination optimal"

      let action =
        "No intervention required"

      // ============================================================
      // EMERGENCY
      // ============================================================

      if(

        orchestrationIndex < 55

        ||

        alerts >= 7

      ){

        posture =
          "EMERGENCY ORCHESTRATION"

        coordination =
          "Mission continuity intervention active"

        action =
          "Autonomous survivability preservation engaged"
      }

      // ============================================================
      // PRESERVATION
      // ============================================================

      else if(

        survivability < 70

        ||

        readiness < 70

      ){

        posture =
          "PRESERVATION"

        coordination =
          "Expedition survivability balancing active"

        action =
          "Adaptive operational conservation enabled"
      }

      // ============================================================
      // BALANCING
      // ============================================================

      else if(

        !runtime.runtime
        ?.predictiveRuntime

        ||

        alerts >= 3

      ){

        posture =
          "BALANCING"

        coordination =
          "Dynamic deployment balancing active"

        action =
          "Fleet coordination mitigation enabled"
      }

      setOrchestration({

        posture,
        coordination,
        action,
        orchestrationIndex
      })

    } catch(error){

      console.error(error)
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    evaluateMissionOrchestration()

    const interval =

      setInterval(
        evaluateMissionOrchestration,
        5000
      )

    return () =>
      clearInterval(interval)

  },[])

  if(!orchestration){

    return null
  }

  // ================================================================
  // COLOR
  // ================================================================

  function getColor(){

    switch(orchestration.posture){

      case "EMERGENCY ORCHESTRATION":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "PRESERVATION":

        return `
          border-orange-500
          bg-orange-950
          text-orange-300
        `

      case "BALANCING":

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

            AUTONOMOUS MISSION ORCHESTRATOR

          </div>

          <div
            className="
              text-5xl
              font-black
            "
          >

            {orchestration.posture}

          </div>

          <div
            className="
              mt-3
              text-sm
            "
          >

            {orchestration.coordination}

          </div>

          <div
            className="
              mt-2
              text-xs
              opacity-80
            "
          >

            {orchestration.action}

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

            ORCHESTRATION INDEX

          </div>

          <div
            className="
              text-6xl
              font-black
            "
          >

            {orchestration.orchestrationIndex}

          </div>

        </div>

      </div>

    </div>
  )
}