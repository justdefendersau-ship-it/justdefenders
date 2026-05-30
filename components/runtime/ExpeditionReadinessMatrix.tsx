"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\ExpeditionReadinessMatrix.tsx
//
// Timestamp:
// 28 May 2026 08:35 Sydney
//
// PURPOSE:
// Expedition operational readiness matrix.
// ====================================================================

export default function ExpeditionReadinessMatrix(){

  const [
    readiness,
    setReadiness
  ] = useState<any>(null)

  // ================================================================
  // LOAD
  // ================================================================

  async function loadReadiness(){

    try {

      const response =
        await fetch(
          "/api/fose/state"
        )

      const result =
        await response.json()

      setReadiness(
        result.state
      )

    } catch(error){

      console.error(error)
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    loadReadiness()

    const interval =

      setInterval(
        loadReadiness,
        5000
      )

    return () =>
      clearInterval(interval)

  },[])

  if(!readiness){

    return null
  }

  // ================================================================
  // STATUS COLOR
  // ================================================================

  function getStatusColor(
    score:number
  ){

    if(score >= 80){

      return `
        border-green-500
        bg-green-950
        text-green-300
      `
    }

    if(score >= 60){

      return `
        border-yellow-500
        bg-yellow-950
        text-yellow-300
      `
    }

    return `
      border-red-500
      bg-red-950
      text-red-300
    `
  }

  // ================================================================
  // METRICS
  // ================================================================

  const metrics = [

    {
      title:"Operational Readiness",
      value:
        readiness.operationalReadiness
    },

    {
      title:"Expedition Readiness",
      value:
        readiness.expeditionReadiness
    },

    {
      title:"Survivability",
      value:
        readiness.survivabilityScore
    },

    {
      title:"Maintenance Exposure",
      value:
        100 -
        (
          readiness.overdueServices * 10
        )
    }
  ]

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

        Expedition Readiness Matrix

      </div>

      <div
        className="
          grid
          grid-cols-4
          gap-4
        "
      >

        {
          metrics.map(

            (
              metric,
              index
            ) => (

              <div

                key={index}

                className={`
                  border
                  rounded-xl
                  p-5

                  ${getStatusColor(
                    metric.value
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

                  {metric.title}

                </div>

                <div
                  className="
                    text-5xl
                    font-black
                  "
                >

                  {metric.value}%

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}