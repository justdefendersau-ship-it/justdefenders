"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\FleetCoordinationMatrix.tsx
//
// Timestamp:
// 28 May 2026 11:30 Sydney
//
// PURPOSE:
// Fleet operational coordination matrix.
// ====================================================================

export default function FleetCoordinationMatrix(){

  const [
    fleet,
    setFleet
  ] = useState<any[]>([])

  // ================================================================
  // LOAD
  // ================================================================

  async function loadFleet(){

    try {

      const response =
        await fetch(
          "/api/fose/state"
        )

      const result =
        await response.json()

      const base =
        result.state

      const vehicles = [

        {
          vehicle:
            "Defender-Alpha",

          readiness:
            base.expeditionReadiness,

          survivability:
            base.survivabilityScore,

          status:
            determineStatus(
              base.expeditionReadiness,
              base.survivabilityScore
            )
        },

        {
          vehicle:
            "Defender-Bravo",

          readiness:
            Math.max(
              40,
              base.expeditionReadiness - 8
            ),

          survivability:
            Math.max(
              45,
              base.survivabilityScore - 5
            ),

          status:
            determineStatus(
              base.expeditionReadiness - 8,
              base.survivabilityScore - 5
            )
        },

        {
          vehicle:
            "Defender-Charlie",

          readiness:
            Math.min(
              100,
              base.expeditionReadiness + 6
            ),

          survivability:
            Math.min(
              100,
              base.survivabilityScore + 4
            ),

          status:
            determineStatus(
              base.expeditionReadiness + 6,
              base.survivabilityScore + 4
            )
        }
      ]

      setFleet(
        vehicles
      )

    } catch(error){

      console.error(error)
    }
  }

  // ================================================================
  // STATUS
  // ================================================================

  function determineStatus(
    readiness:number,
    survivability:number
  ){

    if(
      readiness < 60
      ||
      survivability < 60
    ){

      return "CRITICAL"
    }

    if(
      readiness < 75
      ||
      survivability < 75
    ){

      return "DEGRADED"
    }

    return "READY"
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    loadFleet()

    const interval =

      setInterval(
        loadFleet,
        5000
      )

    return () =>
      clearInterval(interval)

  },[])

  // ================================================================
  // COLOR
  // ================================================================

  function getColor(
    status:string
  ){

    switch(status){

      case "CRITICAL":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "DEGRADED":

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

        <div
          className="
            text-2xl
            font-black
          "
        >

          Fleet Coordination Matrix

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

          FLEET ACTIVE

        </div>

      </div>

      <div
        className="
          grid
          grid-cols-3
          gap-4
        "
      >

        {
          fleet.map(

            (
              vehicle,
              index
            ) => (

              <div

                key={index}

                className={`
                  border
                  rounded-2xl
                  p-5

                  ${getColor(
                    vehicle.status
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

                  {vehicle.vehicle}

                </div>

                <div
                  className="
                    flex
                    justify-between
                    mb-3
                    text-sm
                  "
                >

                  <span>
                    Readiness
                  </span>

                  <span>
                    {vehicle.readiness}%
                  </span>

                </div>

                <div
                  className="
                    flex
                    justify-between
                    mb-5
                    text-sm
                  "
                >

                  <span>
                    Survivability
                  </span>

                  <span>
                    {vehicle.survivability}%
                  </span>

                </div>

                <div
                  className="
                    text-xs
                    font-bold
                    tracking-wide
                  "
                >

                  {vehicle.status}

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}