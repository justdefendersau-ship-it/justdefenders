"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\RuntimeStatusCommandCenter.tsx
//
// Timestamp:
// 28 May 2026 04:00 Sydney
//
// PURPOSE:
// Runtime status command center.
// ====================================================================

export default function RuntimeStatusCommandCenter(){

  const [
    health,
    setHealth
  ] = useState<any>(null)

  const [
    commands,
    setCommands
  ] = useState<any>(null)

  // ================================================================
  // LOAD
  // ================================================================

  async function load(){

    try {

      // ============================================================
      // HEALTH
      // ============================================================

      const healthResponse =
        await fetch(
          "/api/runtime/health"
        )

      const healthResult =
        await healthResponse.json()

      setHealth(
        healthResult.health
      )

      // ============================================================
      // COMMANDS
      // ============================================================

      const commandResponse =
        await fetch(
          "/api/runtime/command"
        )

      const commandResult =
        await commandResponse.json()

      setCommands(
        commandResult.commandState
      )

    } catch(error){

      console.error(error)
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    load()

    const interval =

      setInterval(
        load,
        5000
      )

    return () =>

      clearInterval(interval)

  },[])

  // ================================================================
  // LOADING
  // ================================================================

  if(
    !health ||
    !commands
  ){

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

        Loading runtime command center...

      </div>
    )
  }

  // ================================================================
  // STATUS
  // ================================================================

  const runtimeHealthy =
    health.runtimeHealthy

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
          text-3xl
          font-bold
          mb-8
        "
      >

        Runtime Status Command Center

      </div>

      {/* ==========================================================
          STATUS
      ========================================================== */}

      <div
        className="
          grid
          grid-cols-4
          gap-4
          mb-8
        "
      >

        <div
          className="
            bg-black
            rounded-xl
            p-4
          "
        >

          <div className="text-sm mb-2">
            Runtime Health
          </div>

          <div
            className={`
              text-3xl
              font-bold

              ${
                runtimeHealthy
                ? "text-green-400"
                : "text-red-400"
              }
            `}
          >

            {runtimeHealthy
              ? "HEALTHY"
              : "DEGRADED"}

          </div>

        </div>

        <div
          className="
            bg-black
            rounded-xl
            p-4
          "
        >

          <div className="text-sm mb-2">
            Safe Mode
          </div>

          <div
            className="
              text-3xl
              font-bold
              text-yellow-400
            "
          >

            {commands.safeMode
              ? "ACTIVE"
              : "OFF"}

          </div>

        </div>

        <div
          className="
            bg-black
            rounded-xl
            p-4
          "
        >

          <div className="text-sm mb-2">
            Lockdown
          </div>

          <div
            className={`
              text-3xl
              font-bold

              ${
                commands.operationalLockdown
                ? "text-red-500"
                : "text-green-400"
              }
            `}
          >

            {commands.operationalLockdown
              ? "LOCKED"
              : "OPEN"}

          </div>

        </div>

        <div
          className="
            bg-black
            rounded-xl
            p-4
          "
        >

          <div className="text-sm mb-2">
            Subsystems
          </div>

          <div
            className="
              text-3xl
              font-bold
            "
          >

            {
              health.healthySubsystems
            }

            /

            {
              health.subsystemCount
            }

          </div>

        </div>

      </div>

      {/* ==========================================================
          SUBSYSTEMS
      ========================================================== */}

      <div
        className="
          grid
          grid-cols-2
          gap-4
        "
      >

        {
          health.subsystems.map(

            (
              subsystem:any,
              index:number
            ) => (

              <div

                key={index}

                className={`
                  rounded-xl
                  p-4
                  border

                  ${
                    subsystem.healthy

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

                  {subsystem.subsystem}

                </div>

                <div>

                  {subsystem.details}

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}