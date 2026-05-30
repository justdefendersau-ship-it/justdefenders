"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\MissionControlEngine.tsx
//
// Timestamp:
// 28 May 2026 11:00 Sydney
//
// PURPOSE:
// Mission operational coordination engine.
// ====================================================================

export default function MissionControlEngine(){

  const [
    mission,
    setMission
  ] = useState<any>(null)

  // ================================================================
  // LOAD
  // ================================================================

  async function evaluateMissionState(){

    try {

      const [

        threatResponse,

        stateResponse,

        runtimeResponse

      ] = await Promise.all([

        fetch("/api/runtime/events"),

        fetch("/api/fose/state"),

        fetch("/api/runtime/command")
      ])

      const threat =
        await threatResponse.json()

      const state =
        await stateResponse.json()

      const runtime =
        await runtimeResponse.json()

      const alerts =

        (threat.events || [])

        .filter(

          (event:any) =>

            event.type ===
            "RUNTIME_ALERT"
        )

        .length

      let phase =
        "STANDBY"

      let posture =
        "STABLE"

      // ============================================================
      // CRITICAL
      // ============================================================

      if(

        state.state
        ?.survivabilityScore < 60

        ||

        alerts >= 5

      ){

        phase =
          "CRITICAL"

        posture =
          "MISSION JEOPARDY"
      }

      // ============================================================
      // DEGRADED
      // ============================================================

      else if(

        state.state
        ?.operationalReadiness < 70

        ||

        !runtime.runtime
        ?.predictiveRuntime

      ){

        phase =
          "DEGRADED"

        posture =
          "TACTICAL DEGRADATION"
      }

      // ============================================================
      // RECOVERY
      // ============================================================

      else if(

        runtime.runtime
        ?.safeMode
      ){

        phase =
          "RECOVERY"

        posture =
          "AUTONOMOUS MITIGATION"
      }

      // ============================================================
      // DEPLOYED
      // ============================================================

      else {

        phase =
          "DEPLOYED"

        posture =
          "MISSION ACTIVE"
      }

      setMission({

        phase,
        posture,
        alerts,

        readiness:
          state.state
          ?.expeditionReadiness
      })

    } catch(error){

      console.error(error)
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    evaluateMissionState()

    const interval =

      setInterval(
        evaluateMissionState,
        5000
      )

    return () =>
      clearInterval(interval)

  },[])

  if(!mission){

    return null
  }

  // ================================================================
  // COLOR
  // ================================================================

  function getColor(){

    switch(mission.phase){

      case "CRITICAL":

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

      case "RECOVERY":

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

            MISSION CONTROL ENGINE

          </div>

          <div
            className="
              text-5xl
              font-black
            "
          >

            {mission.phase}

          </div>

          <div
            className="
              mt-3
              text-sm
            "
          >

            {mission.posture}

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

            EXPEDITION READINESS

          </div>

          <div
            className="
              text-6xl
              font-black
            "
          >

            {mission.readiness}%

          </div>

        </div>

      </div>

    </div>
  )
}