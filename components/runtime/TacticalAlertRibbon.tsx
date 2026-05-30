"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\TacticalAlertRibbon.tsx
//
// Timestamp:
// 28 May 2026 07:45 Sydney
//
// PURPOSE:
// Tactical operational alert ribbon.
// ====================================================================

export default function TacticalAlertRibbon(){

  const [
    alerts,
    setAlerts
  ] = useState<any[]>([])

  // ================================================================
  // LOAD
  // ================================================================

  async function loadAlerts(){

    try {

      const response =
        await fetch(
          "/api/runtime/events"
        )

      const result =
        await response.json()

      const tacticalAlerts =

        (result.events || [])

        .filter(

          (event:any) =>

            event.type ===
            "RUNTIME_ALERT"

            ||

            event.type ===
            "RUNTIME_WARNING"
        )

        .slice(0,5)

      setAlerts(
        tacticalAlerts
      )

    } catch(error){

      console.error(error)
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    loadAlerts()

    const websocket =

      new WebSocket(
        "ws://localhost:8090"
      )

    websocket.onmessage = (

      message

    ) => {

      try {

        const event =
          JSON.parse(
            message.data
          )

        if(

          event.type ===
          "RUNTIME_ALERT"

          ||

          event.type ===
          "RUNTIME_WARNING"
        ){

          setAlerts(

            current => [

              event,

              ...current
            ].slice(0,5)
          )
        }

      } catch(error){

        console.error(error)
      }
    }

    return () => {

      websocket.close()
    }

  },[])

  // ================================================================
  // COLOR
  // ================================================================

  function getColor(
    type:string
  ){

    switch(type){

      case "RUNTIME_ALERT":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "RUNTIME_WARNING":

        return `
          border-yellow-500
          bg-yellow-950
          text-yellow-300
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
        mb-8
        space-y-3
      "
    >

      {
        alerts.map(

          (
            alert,
            index
          ) => (

            <div

              key={index}

              className={`
                border
                rounded-xl
                px-5
                py-4

                flex
                items-center
                justify-between

                ${getColor(alert.type)}
              `}
            >

              <div>

                <div
                  className="
                    text-sm
                    font-black
                    tracking-wide
                  "
                >

                  {alert.type}

                </div>

                <div
                  className="
                    text-sm
                    mt-1
                  "
                >

                  {
                    alert.payload
                    ?.message
                  }

                </div>

              </div>

              <div
                className="
                  text-xs
                  opacity-70
                "
              >

                {alert.source}

              </div>

            </div>
          )
        )
      }

    </div>
  )
}