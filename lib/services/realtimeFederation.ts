/* =====================================================
   JustDefenders ©
   File:
   /lib/services/realtimeFederation.ts

   Timestamp:
   11 May 2026 16:45 (Sydney)

   PURPOSE:
   Real-time federation telemetry
===================================================== */

"use client"

import { io }
from "socket.io-client"

export const federationSocket =
io(

  process.env.NEXT_PUBLIC_FEDERATION_SOCKET ||

  "http://localhost:4000",

  {

    transports:["websocket"],

    autoConnect:true
  }
)

export function subscribeToTelemetry(
  callback:(payload:any)=>void
){

  federationSocket.on(
    "telemetry",
    callback
  )

  return ()=>{

    federationSocket.off(
      "telemetry",
      callback
    )
  }
}
