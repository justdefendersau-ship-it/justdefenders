"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\AutonomousStrategicAutomation.tsx
//
// Timestamp:
// 28 May 2026 21:30 Sydney
//
// PURPOSE:
// Autonomous strategic automation engine.
// ====================================================================

export default function AutonomousStrategicAutomation(){

  const [
    automation,
    setAutomation
  ] = useState<any>(null)

  // ================================================================
// LOAD
// ================================================================

  async function evaluateAutomation(){

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

      let automationState =
        "AUTONOMOUS STABLE"

      let orchestration =
        "Strategic automation equilibrium maintained"

      let execution =
        "No intervention automation required"

      // ============================================================
      // EMERGENCY AUTOMATION
      // ============================================================

      if(

        survivability < 45

        ||

        alerts >= 8

      ){

        automationState =
          "EMERGENCY AUTOMATION"

        orchestration =
          "Autonomous survivability recovery active"

        execution =
          "Emergency mitigation chains executing"
      }

      // ============================================================
      // ADAPTIVE RECOVERY
      // ============================================================

      else if(

        survivability < 70

        ||

        readiness < 70

      ){

        automationState =
          "ADAPTIVE RECOVERY"

        orchestration =
          "Adaptive operational recovery active"

        execution =
          "Dynamic mitigation orchestration engaged"
      }

      // ============================================================
      // STRATEGIC TUNING
      // ============================================================

      else if(

        !runtime.runtime
        ?.predictiveRuntime

        ||

        operational < 85

      ){

        automationState =
          "STRATEGIC TUNING"

        orchestration =
          "Autonomous optimization tuning active"

        execution =
          "Strategic efficiency balancing enabled"
      }

      setAutomation({

        automationState,
        orchestration,
        execution,

        automationIndex:

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

    evaluateAutomation()

    const interval =

      setInterval(
        evaluateAutomation,
        4000
      )

    return () =>
      clearInterval(interval)

  },[])

  if(!automation){

    return null
  }

  // ================================================================
  // COLORS
  // ================================================================

  function getColor(){

    switch(automation.automationState){

      case "EMERGENCY AUTOMATION":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "ADAPTIVE RECOVERY":

        return `
          border-orange-500
          bg-orange-950
          text-orange-300
        `

      case "STRATEGIC TUNING":

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

            AUTONOMOUS STRATEGIC AUTOMATION

          </div>

          <div
            className="
              text-5xl
              font-black
            "
          >

            {automation.automationState}

          </div>

          <div
            className="
              mt-3
              text-sm
            "
          >

            {automation.orchestration}

          </div>

          <div
            className="
              mt-2
              text-xs
              opacity-80
            "
          >

            {automation.execution}

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

            AUTOMATION INDEX

          </div>

          <div
            className="
              text-6xl
              font-black
            "
          >

            {automation.automationIndex}

          </div>

        </div>

      </div>

    </div>
  )
}