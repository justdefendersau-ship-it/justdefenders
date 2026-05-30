"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\OperationalHeatmap.tsx
//
// Timestamp:
// 28 May 2026 09:30 Sydney
//
// PURPOSE:
// Tactical operational pressure heatmap.
// ====================================================================

export default function OperationalHeatmap(){

  const [
    zones,
    setZones
  ] = useState<any[]>([])

  // ================================================================
  // LOAD
  // ================================================================

  async function loadHeatmap(){

    try {

      const [

        runtimeResponse,

        stateResponse,

        eventsResponse

      ] = await Promise.all([

        fetch("/api/runtime/command"),

        fetch("/api/fose/state"),

        fetch("/api/runtime/events")
      ])

      const runtime =
        await runtimeResponse.json()

      const state =
        await stateResponse.json()

      const events =
        await eventsResponse.json()

      const alertCount =

        (events.events || [])

        .filter(

          (event:any) =>

            event.type ===
            "RUNTIME_ALERT"
        )

        .length

      const warningCount =

        (events.events || [])

        .filter(

          (event:any) =>

            event.type ===
            "RUNTIME_WARNING"
        )

        .length

      const heatmap = [

        {
          zone:"Telemetry",
          intensity:
            runtime.runtime
            ?.telemetryRuntime

            ? warningCount * 10

            : 90
        },

        {
          zone:"Predictive",
          intensity:
            runtime.runtime
            ?.predictiveRuntime

            ? alertCount * 10

            : 85
        },

        {
          zone:"Maintenance",
          intensity:
            state.state
            ?.overdueServices * 20
        },

        {
          zone:"Survivability",
          intensity:
            100 -
            state.state
            ?.survivabilityScore
        },

        {
          zone:"Expedition",
          intensity:
            100 -
            state.state
            ?.expeditionReadiness
        }
      ]

      setZones(heatmap)

    } catch(error){

      console.error(error)
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    loadHeatmap()

    const interval =

      setInterval(
        loadHeatmap,
        5000
      )

    return () =>
      clearInterval(interval)

  },[])

  // ================================================================
  // COLOR
  // ================================================================

  function getColor(
    intensity:number
  ){

    if(intensity >= 80){

      return `
        bg-red-600
        border-red-400
      `
    }

    if(intensity >= 60){

      return `
        bg-orange-500
        border-orange-300
      `
    }

    if(intensity >= 40){

      return `
        bg-yellow-500
        border-yellow-300
      `
    }

    return `
      bg-green-600
      border-green-300
    `
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
          text-2xl
          font-black
          mb-6
        "
      >

        Operational Pressure Heatmap

      </div>

      <div
        className="
          grid
          grid-cols-5
          gap-4
        "
      >

        {
          zones.map(

            (
              zone,
              index
            ) => (

              <div

                key={index}

                className={`
                  rounded-2xl
                  border
                  p-5
                  text-white

                  ${getColor(
                    zone.intensity
                  )}
                `}
              >

                <div
                  className="
                    text-sm
                    opacity-80
                    mb-3
                  "
                >

                  {zone.zone}

                </div>

                <div
                  className="
                    text-5xl
                    font-black
                  "
                >

                  {
                    Math.min(
                      100,
                      Math.round(
                        zone.intensity
                      )
                    )
                  }

                </div>

                <div
                  className="
                    text-xs
                    mt-3
                    opacity-70
                  "
                >

                  PRESSURE

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}