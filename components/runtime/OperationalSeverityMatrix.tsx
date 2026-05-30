"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\OperationalSeverityMatrix.tsx
//
// Timestamp:
// 28 May 2026 08:10 Sydney
//
// PURPOSE:
// Tactical operational severity matrix.
// ====================================================================

export default function OperationalSeverityMatrix(){

  const [
    matrix,
    setMatrix
  ] = useState<any[]>([])

  // ================================================================
  // LOAD
  // ================================================================

  async function loadMatrix(){

    try {

      const response =
        await fetch(
          "/api/runtime/command"
        )

      const result =
        await response.json()

      const runtime =
        result.runtime

      const data = [

        {
          name:"Telemetry Runtime",
          enabled:
            runtime.telemetryRuntime,
          severity:
            runtime.telemetryRuntime
            ? "LOW"
            : "HIGH"
        },

        {
          name:"Predictive Runtime",
          enabled:
            runtime.predictiveRuntime,
          severity:
            runtime.predictiveRuntime
            ? "LOW"
            : "MEDIUM"
        },

        {
          name:"Notification Runtime",
          enabled:
            runtime.notificationRuntime,
          severity:
            runtime.notificationRuntime
            ? "LOW"
            : "CRITICAL"
        },

        {
          name:"Anomaly Runtime",
          enabled:
            runtime.anomalyRuntime,
          severity:
            runtime.anomalyRuntime
            ? "LOW"
            : "HIGH"
        },

        {
          name:"Advisory Runtime",
          enabled:
            runtime.advisoryRuntime,
          severity:
            runtime.advisoryRuntime
            ? "LOW"
            : "MEDIUM"
        }
      ]

      setMatrix(data)

    } catch(error){

      console.error(error)
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    loadMatrix()

    const interval =

      setInterval(
        loadMatrix,
        5000
      )

    return () =>

      clearInterval(interval)

  },[])

  // ================================================================
  // COLORS
  // ================================================================

  function getColor(
    severity:string
  ){

    switch(severity){

      case "LOW":

        return `
          border-green-500
          bg-green-950
          text-green-300
        `

      case "MEDIUM":

        return `
          border-yellow-500
          bg-yellow-950
          text-yellow-300
        `

      case "HIGH":

        return `
          border-orange-500
          bg-orange-950
          text-orange-300
        `

      case "CRITICAL":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      default:

        return `
          border-zinc-700
          bg-zinc-900
          text-white
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
          text-2xl
          font-black
          mb-6
        "
      >

        Operational Severity Matrix

      </div>

      <div
        className="
          grid
          grid-cols-5
          gap-4
        "
      >

        {
          matrix.map(

            (
              item,
              index
            ) => (

              <div

                key={index}

                className={`
                  border
                  rounded-xl
                  p-5

                  ${getColor(
                    item.severity
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

                  {item.name}

                </div>

                <div
                  className="
                    text-2xl
                    font-black
                  "
                >

                  {item.severity}

                </div>

                <div
                  className="
                    text-xs
                    mt-3
                  "
                >

                  {
                    item.enabled
                    ? "ACTIVE"
                    : "DISABLED"
                  }

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}