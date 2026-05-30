"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\OperationalStatusBar.tsx
//
// Timestamp:
// 28 May 2026 06:35 Sydney
//
// PURPOSE:
// Global operational command status bar.
// ====================================================================

export default function OperationalStatusBar(){

  const [
    runtimeHealth,
    setRuntimeHealth
  ] = useState("UNKNOWN")

  const [
    websocketLive,
    setWebsocketLive
  ] = useState(false)

  const [
    operationalStatus,
    setOperationalStatus
  ] = useState("AMBER")

  // ================================================================
  // LOAD
  // ================================================================

  async function load(){

    try {

      const response =
        await fetch(
          "/api/runtime/health"
        )

      const result =
        await response.json()

      setRuntimeHealth(

        result.health.runtimeHealthy

        ? "HEALTHY"

        : "DEGRADED"
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

    const websocket =

      new WebSocket(
        "ws://localhost:8090"
      )

    websocket.onopen = () => {

      setWebsocketLive(true)
    }

    websocket.onclose = () => {

      setWebsocketLive(false)
    }

    return () => {

      websocket.close()
    }

  },[])

  // ================================================================
  // PAGE
  // ================================================================

  return (

    <div
      className="
        sticky
        top-0
        z-50

        bg-black/95
        backdrop-blur

        border
        border-zinc-800

        rounded-2xl

        p-4
        mb-8
      "
    >

      <div
        className="
          grid
          grid-cols-4
          gap-4
        "
      >

        {/* ========================================================
            PLATFORM
        ======================================================== */}

        <div
          className="
            bg-zinc-900
            rounded-xl
            p-4
          "
        >

          <div
            className="
              text-xs
              text-zinc-400
              mb-2
            "
          >

            PLATFORM

          </div>

          <div
            className="
              text-xl
              font-bold
            "
          >

            JUSTDEFENDERS

          </div>

        </div>

        {/* ========================================================
            RUNTIME
        ======================================================== */}

        <div
          className="
            bg-zinc-900
            rounded-xl
            p-4
          "
        >

          <div
            className="
              text-xs
              text-zinc-400
              mb-2
            "
          >

            RUNTIME HEALTH

          </div>

          <div
            className={`
              text-xl
              font-bold

              ${
                runtimeHealth ===
                "HEALTHY"

                ? "text-green-400"

                : "text-red-400"
              }
            `}
          >

            {runtimeHealth}

          </div>

        </div>

        {/* ========================================================
            WEBSOCKET
        ======================================================== */}

        <div
          className="
            bg-zinc-900
            rounded-xl
            p-4
          "
        >

          <div
            className="
              text-xs
              text-zinc-400
              mb-2
            "
          >

            REALTIME STREAM

          </div>

          <div
            className={`
              text-xl
              font-bold

              ${
                websocketLive

                ? "text-green-400"

                : "text-red-400"
              }
            `}
          >

            {
              websocketLive
              ? "LIVE"
              : "OFFLINE"
            }

          </div>

        </div>

        {/* ========================================================
            STATUS
        ======================================================== */}

        <div
          className="
            bg-zinc-900
            rounded-xl
            p-4
          "
        >

          <div
            className="
              text-xs
              text-zinc-400
              mb-2
            "
          >

            OPERATIONAL STATUS

          </div>

          <div
            className="
              text-xl
              font-bold
              text-yellow-400
            "
          >

            {operationalStatus}

          </div>

        </div>

      </div>

    </div>
  )
}