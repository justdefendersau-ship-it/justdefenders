/* =====================================================
   JustDefenders ©
   Live Telemetry Hook
===================================================== */

"use client"

import {
  useEffect,
  useState
}
from "react"

import {
  socket
}
from "../lib/socketClient"

export function useLiveTelemetry(){

  const [

    telemetry,

    setTelemetry

  ] = useState<any[]>([])

  useEffect(() => {

    socket.on(

      "telemetry.ingested",

      (payload) => {

        setTelemetry(

          current => [

            payload,

            ...current
          ].slice(0,25)
        )
      }
    )

    return () => {

      socket.off(
        "telemetry.ingested"
      )
    }

  }, [])

  return telemetry
}
