"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\FederationCommandEngine.tsx
//
// Timestamp:
// 28 May 2026 20:45 Sydney
//
// PURPOSE:
// Distributed federation operational command engine.
// ====================================================================

export default function FederationCommandEngine(){

  const [
    federation,
    setFederation
  ] = useState<any[]>([])

  const [
    federationState,
    setFederationState
  ] = useState("SYNCHRONIZED")

  // ================================================================
// LOAD
// ================================================================

  async function evaluateFederation(){

    try {

      const response =
        await fetch(
          "/api/fose/state"
        )

      const result =
        await response.json()

      const survivability =
        result.state
        ?.survivabilityScore || 0

      const readiness =
        result.state
        ?.expeditionReadiness || 0

      const regions = [

        {
          region:
            "AUSTRALIA",

          survivability,

          readiness,

          operational:
            "STABLE"
        },

        {
          region:
            "NEW ZEALAND",

          survivability:
            survivability - 8,

          readiness:
            readiness - 5,

          operational:
            "MONITORING"
        },

        {
          region:
            "PACIFIC",

          survivability:
            survivability - 18,

          readiness:
            readiness - 15,

          operational:
            "ELEVATED"
        }
      ]

      setFederation(
        regions
      )

      // ============================================================
      // STATE
      // ============================================================

      if(
        survivability < 50
      ){

        setFederationState(
          "FRACTURED"
        )
      }

      else if(
        survivability < 70
      ){

        setFederationState(
          "DEGRADED"
        )
      }

      else if(
        readiness < 85
      ){

        setFederationState(
          "DISTRIBUTED"
        )
      }

      else {

        setFederationState(
          "SYNCHRONIZED"
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

    evaluateFederation()

    const interval =

      setInterval(
        evaluateFederation,
        5000
      )

    return () =>
      clearInterval(interval)

  },[])

  // ================================================================
  // COLORS
  // ================================================================

  function getStateColor(){

    switch(federationState){

      case "FRACTURED":

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

      case "DISTRIBUTED":

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

  function getRegionColor(
    operational:string
  ){

    switch(operational){

      case "ELEVATED":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "MONITORING":

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

        ${getStateColor()}
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

            FEDERATION COMMAND ENGINE

          </div>

          <div
            className="
              text-5xl
              font-black
            "
          >

            {federationState}

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

          FEDERATION ACTIVE

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
          federation.map(

            (
              region,
              index
            ) => (

              <div

                key={index}

                className={`
                  border
                  rounded-2xl
                  p-5

                  ${getRegionColor(
                    region.operational
                  )}
                `}
              >

                <div
                  className="
                    text-2xl
                    font-black
                    mb-4
                  "
                >

                  {region.region}

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
                    Survivability
                  </span>

                  <span>
                    {region.survivability}%
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
                    Readiness
                  </span>

                  <span>
                    {region.readiness}%
                  </span>

                </div>

                <div
                  className="
                    text-xs
                    font-bold
                    opacity-90
                  "
                >

                  {region.operational}

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}