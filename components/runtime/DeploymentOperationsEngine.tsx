"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\DeploymentOperationsEngine.tsx
//
// Timestamp:
// 28 May 2026 12:00 Sydney
//
// PURPOSE:
// Tactical deployment orchestration engine.
// ====================================================================

export default function DeploymentOperationsEngine(){

  const [
    deployments,
    setDeployments
  ] = useState<any[]>([])

  // ================================================================
  // LOAD
  // ================================================================

  async function loadDeployments(){

    try {

      const response =
        await fetch(
          "/api/fose/state"
        )

      const result =
        await response.json()

      const state =
        result.state

      const readiness =
        state.expeditionReadiness

      const deploymentMatrix = [

        {
          unit:"Defender-Alpha",
          region:"Northern Corridor",
          state:
            readiness >= 85
            ? "FORWARD"
            : "DEPLOYING",

          readiness:
            readiness
        },

        {
          unit:"Defender-Bravo",
          region:"Western Recovery Zone",
          state:
            readiness >= 70
            ? "STAGED"
            : "RECOVERY",

          readiness:
            readiness - 10
        },

        {
          unit:"Defender-Charlie",
          region:"Expedition Support",
          state:
            readiness >= 80
            ? "DEPLOYING"
            : "WITHDRAWN",

          readiness:
            readiness + 5
        }
      ]

      setDeployments(
        deploymentMatrix
      )

    } catch(error){

      console.error(error)
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    loadDeployments()

    const interval =

      setInterval(
        loadDeployments,
        5000
      )

    return () =>
      clearInterval(interval)

  },[])

  // ================================================================
  // COLORS
  // ================================================================

  function getColor(
    state:string
  ){

    switch(state){

      case "FORWARD":

        return `
          border-green-500
          bg-green-950
          text-green-300
        `

      case "DEPLOYING":

        return `
          border-cyan-500
          bg-cyan-950
          text-cyan-300
        `

      case "STAGED":

        return `
          border-yellow-500
          bg-yellow-950
          text-yellow-300
        `

      case "RECOVERY":

        return `
          border-orange-500
          bg-orange-950
          text-orange-300
        `

      default:

        return `
          border-red-500
          bg-red-950
          text-red-300
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

          Deployment Operations Engine

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

          DEPLOYMENT ACTIVE

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
          deployments.map(

            (
              deployment,
              index
            ) => (

              <div

                key={index}

                className={`
                  border
                  rounded-2xl
                  p-5

                  ${getColor(
                    deployment.state
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

                  {deployment.unit}

                </div>

                <div
                  className="
                    text-sm
                    mb-3
                  "
                >

                  {deployment.region}

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
                    Readiness
                  </span>

                  <span>
                    {deployment.readiness}%
                  </span>

                </div>

                <div
                  className="
                    text-xs
                    font-bold
                    tracking-wide
                  "
                >

                  {deployment.state}

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}