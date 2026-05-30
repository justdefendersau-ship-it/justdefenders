"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\LiveRuntimeEventStream.tsx
//
// Timestamp:
// 28 May 2026 06:05 Sydney
//
// PURPOSE:
// Live websocket runtime event stream.
// ====================================================================

export default function LiveRuntimeEventStream(){

  const [
    events,
    setEvents
  ] = useState<any[]>([])

  const [
    connected,
    setConnected
  ] = useState(false)

  // ================================================================
  // INITIAL LOAD
  // ================================================================

  async function loadEvents(){

    try {

      const response =
        await fetch(
          "/api/runtime/events"
        )

      const result =
        await response.json()

      setEvents(
        result.events || []
      )

    } catch(error){

      console.error(
        error
      )
    }
  }

  // ================================================================
  // WEBSOCKET
  // ================================================================

  useEffect(() => {

    loadEvents()

    const websocket =

      new WebSocket(

        "ws://localhost:8090"
      )

    websocket.onopen = () => {

      console.log(
        "WebSocket connected"
      )

      setConnected(true)
    }

    websocket.onclose = () => {

      console.log(
        "WebSocket disconnected"
      )

      setConnected(false)
    }

    websocket.onmessage = (

      message

    ) => {

      try {

        const event =
          JSON.parse(
            message.data
          )

        // ==========================================================
        // IGNORE CONNECT EVENT
        // ==========================================================

        if(
          event.type ===
          "RUNTIME_CONNECTED"
        ){

          return
        }

        // ==========================================================
        // LIVE INSERT
        // ==========================================================

        setEvents(

          current => [

            event,

            ...current
          ]
        )

      } catch(error){

        console.error(
          "WebSocket parse failure:",
          error
        )
      }
    }

    return () => {

      websocket.close()
    }

  },[])

  // ================================================================
  // CARD COLOR
  // ================================================================

  function getColor(type:string){

    switch(type){

      case "RUNTIME_ALERT":
        return `
          border-red-500
          bg-red-950
        `

      case "RUNTIME_RECOVERY":
        return `
          border-green-500
          bg-green-950
        `

      case "RUNTIME_WARNING":
        return `
          border-yellow-500
          bg-yellow-950
        `

      default:
        return `
          border-zinc-700
          bg-black
        `
    }
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
          flex
          justify-between
          items-center
          mb-8
        "
      >

        <div
          className="
            text-2xl
            font-bold
          "
        >

          Live Runtime Event Stream

        </div>

        <div
          className={`
            px-4
            py-2
            rounded-full
            text-sm
            font-bold

            ${
              connected

              ? `
                bg-green-950
                border
                border-green-500
                text-green-400
              `

              : `
                bg-red-950
                border
                border-red-500
                text-red-400
              `
            }
          `}
        >

          {
            connected
            ? "LIVE"
            : "OFFLINE"
          }

        </div>

      </div>

      <div
        className="
          space-y-4
          max-h-[700px]
          overflow-y-auto
        "
      >

        {
          events.length === 0 && (

            <div
              className="
                text-zinc-400
              "
            >

              No runtime events detected.

            </div>
          )
        }

        {
          events.map(

            (
              event,
              index
            ) => (

              <div

                key={index}

                className={`
                  rounded-xl
                  border
                  p-4

                  ${getColor(event.type)}
                `}
              >

                <div
                  className="
                    flex
                    justify-between
                    mb-3
                  "
                >

                  <div
                    className="
                      font-bold
                      text-lg
                    "
                  >

                    {event.type}

                  </div>

                  <div
                    className="
                      text-xs
                      text-zinc-400
                    "
                  >

                    {new Date(
                      event.timestamp
                    ).toLocaleString()}

                  </div>

                </div>

                <div
                  className="
                    text-sm
                    mb-2
                  "
                >

                  Source:
                  {" "}
                  {event.source}

                </div>

                <pre
                  className="
                    text-xs
                    whitespace-pre-wrap
                    text-zinc-300
                  "
                >

                  {
                    JSON.stringify(
                      event.payload,
                      null,
                      2
                    )
                  }

                </pre>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}