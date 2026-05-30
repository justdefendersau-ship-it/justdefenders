"use client"

import {
  useEffect,
  useState
}
from "react"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\ActiveIncidentResponse.tsx
//
// Timestamp:
// 28 May 2026 10:00 Sydney
//
// PURPOSE:
// Tactical incident response engine.
// ====================================================================

export default function ActiveIncidentResponse(){

  const [
    incidents,
    setIncidents
  ] = useState<any[]>([])

  // ================================================================
  // LOAD
  // ================================================================

  async function loadIncidents(){

    try {

      const response =
        await fetch(
          "/api/runtime/events"
        )

      const result =
        await response.json()

      const operationalIncidents =

        (result.events || [])

        .filter(

          (event:any) =>

            event.type ===
            "RUNTIME_ALERT"

            ||

            event.type ===
            "RUNTIME_WARNING"
        )

        .slice(0,6)

        .map(

          (
            incident:any,
            index:number
          ) => ({

            id:index,

            severity:

              incident.type ===
              "RUNTIME_ALERT"

              ? "HIGH"

              : "MEDIUM",

            status:

              incident.type ===
              "RUNTIME_ALERT"

              ? "ACTIVE"

              : "MONITORING",

            source:
              incident.source,

            message:
              incident.payload
              ?.message,

            timestamp:
              incident.timestamp
          })
        )

      setIncidents(
        operationalIncidents
      )

    } catch(error){

      console.error(error)
    }
  }

  // ================================================================
  // INIT
  // ================================================================

  useEffect(() => {

    loadIncidents()

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

          loadIncidents()
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
    severity:string
  ){

    switch(severity){

      case "HIGH":

        return `
          border-red-500
          bg-red-950
          text-red-300
        `

      case "MEDIUM":

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

          Active Incident Response

        </div>

        <div
          className="
            px-4
            py-2
            rounded-full
            bg-red-950
            border
            border-red-500
            text-red-300
            text-sm
            font-bold
          "
        >

          {incidents.length}
          {" "}
          ACTIVE INCIDENTS

        </div>

      </div>

      <div
        className="
          space-y-4
        "
      >

        {
          incidents.map(

            incident => (

              <div

                key={incident.id}

                className={`
                  border
                  rounded-xl
                  p-5

                  ${getColor(
                    incident.severity
                  )}
                `}
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-3
                  "
                >

                  <div
                    className="
                      font-black
                      text-lg
                    "
                  >

                    {incident.source}

                  </div>

                  <div
                    className="
                      text-xs
                      opacity-70
                    "
                  >

                    {incident.status}

                  </div>

                </div>

                <div
                  className="
                    text-sm
                  "
                >

                  {incident.message}

                </div>

                <div
                  className="
                    text-xs
                    mt-3
                    opacity-70
                  "
                >

                  {
                    new Date(
                      incident.timestamp
                    ).toLocaleString()
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