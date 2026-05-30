"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\MissionReplayEngine.tsx
//
// Timestamp:
// 28 May 2026 18:45 Sydney
//
// PURPOSE:
// Operational mission replay + forensic engine.
// ====================================================================

export default function MissionReplayEngine(){

  const [
    replay,
    setReplay
  ] = useState<any[]>([])

  const [
    mode,
    setMode
  ] = useState("LIVE")

  // ================================================================
// LOAD
// ================================================================

  async function loadReplay(){

    try {

      const response =
        await fetch(
          "/api/runtime/events"
        )

      const result =
        await response.json()

      const events =
        result.events || []

      const replayEvents =

        events.map(

          (
            event:any,
            index:number
          ) => ({

            id:
              event.id || index,

            timestamp:
              event.timestamp,

            type:
              event.type,

            source:
              event.source,

            severity:
              event.payload
              ?.severity || "NORMAL",

            message:
              event.payload
              ?.message || "Operational event"
          })
        )

      setReplay(
        replayEvents
      )

      // ============================================================
      // MODE
      // ============================================================

      if(
        replayEvents.length >= 8
      ){

        setMode(
          "FORENSIC"
        )
      }

      else if(
        replayEvents.length >= 4
      ){

        setMode(
          "TIMELINE ANALYSIS"
        )
      }

      else if(
        replayEvents.length >= 1
      ){

        setMode(
          "PLAYBACK"
        )
      }

      else {

        setMode(
          "LIVE"
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

    loadReplay()

    const interval =

      setInterval(
        loadReplay,
        4000
      )

    return () =>
      clearInterval(interval)

  },[])

  // ================================================================
  // COLORS
  // ================================================================

  function getColor(){

    switch(mode){

      case "FORENSIC":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "TIMELINE ANALYSIS":

        return `
          border-orange-500
          bg-orange-950
          text-orange-300
        `

      case "PLAYBACK":

        return `
          border-cyan-500
          bg-cyan-950
          text-cyan-300
        `

      default:

        return `
          border-green-500
          bg-green-950
          text-green-300
        `
    }
  }

  function getSeverityColor(
    severity:string
  ){

    switch(severity){

      case "HIGH":

        return "text-red-400"

      case "MEDIUM":

        return "text-yellow-300"

      default:

        return "text-green-400"
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

            MISSION REPLAY ENGINE

          </div>

          <div
            className="
              text-4xl
              font-black
            "
          >

            {mode}

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

          REPLAY ACTIVE

        </div>

      </div>

      <div
        className="
          space-y-4
          max-h-[420px]
          overflow-y-auto
        "
      >

        {
          replay.length === 0
          && (

            <div
              className="
                text-sm
                opacity-70
              "
            >

              Awaiting operational replay data...

            </div>
          )
        }

        {
          replay.map(

            (
              event,
              index
            ) => (

              <div

                key={index}

                className="
                  border
                  border-zinc-800
                  rounded-xl
                  bg-black/40
                  p-4
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-2
                  "
                >

                  <div
                    className="
                      font-bold
                    "
                  >

                    {event.type}

                  </div>

                  <div
                    className={`
                      text-xs
                      font-bold

                      ${getSeverityColor(
                        event.severity
                      )}
                    `}
                  >

                    {event.severity}

                  </div>

                </div>

                <div
                  className="
                    text-sm
                    opacity-90
                    mb-2
                  "
                >

                  {event.message}

                </div>

                <div
                  className="
                    text-[10px]
                    opacity-60
                    flex
                    justify-between
                  "
                >

                  <span>
                    {event.source}
                  </span>

                  <span>
                    {
                      new Date(
                        event.timestamp
                      ).toLocaleTimeString()
                    }
                  </span>

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}