"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\RuntimeCommandDashboard.tsx
//
// Timestamp:
// 28 May 2026 03:15 Sydney
//
// PURPOSE:
// Runtime command dashboard.
// ====================================================================

export default function RuntimeCommandDashboard(){

  const [
    state,
    setState
  ] = useState<any>(null)

  // ================================================================
  // LOAD
  // ================================================================

  async function loadState(){

    try {

      const response =
        await fetch(
          "/api/runtime/command"
        )

      const result =
        await response.json()

      setState(
        result.commandState
      )

    } catch(error){

      console.error(
        error
      )
    }
  }

  // ================================================================
  // TOGGLE
  // ================================================================

  async function toggle(

    key:string,

    value:boolean

  ){

    try {

      await fetch(

        "/api/runtime/command",

        {
          method:"POST",

          headers:{
            "Content-Type":
              "application/json"
          },

          body:JSON.stringify({

            [key]:
              !value
          })
        }
      )

      loadState()

    } catch(error){

      console.error(
        error
      )
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    loadState()

  },[])

  // ================================================================
  // LOADING
  // ================================================================

  if(!state){

    return (

      <div
        className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-2xl
          p-6
        "
      >

        Loading runtime controls...

      </div>
    )
  }

  // ================================================================
  // CARD
  // ================================================================

  function renderToggle(

    label:string,

    key:string

  ){

    return (

      <button

        onClick={() =>

          toggle(
            key,
            state[key]
          )
        }

        className={`
          rounded-xl
          p-4
          border
          transition-all

          ${
            state[key]

            ? `
              border-green-500
              bg-green-950
            `

            : `
              border-red-500
              bg-red-950
            `
          }
        `}
      >

        <div
          className="
            font-bold
            mb-2
          "
        >

          {label}

        </div>

        <div>

          {state[key]
            ? "ENABLED"
            : "DISABLED"}

        </div>

      </button>
    )
  }

  // ================================================================
  // PAGE
  // ================================================================

  return (

    <div
      className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-6
      "
    >

      <div
        className="
          text-2xl
          font-bold
          mb-8
        "
      >

        Runtime Command Layer

      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-4
        "
      >

        {renderToggle(
          "Safe Mode",
          "safeMode"
        )}

        {renderToggle(
          "Degraded Mode",
          "degradedMode"
        )}

        {renderToggle(
          "Operational Lockdown",
          "operationalLockdown"
        )}

        {renderToggle(
          "Telemetry Runtime",
          "telemetryEnabled"
        )}

        {renderToggle(
          "Notification Runtime",
          "notificationRuntime"
        )}

        {renderToggle(
          "Predictive Runtime",
          "predictiveRuntime"
        )}

        {renderToggle(
          "Advisory Runtime",
          "advisoryRuntime"
        )}

        {renderToggle(
          "Anomaly Runtime",
          "anomalyRuntime"
        )}

      </div>

    </div>
  )
}