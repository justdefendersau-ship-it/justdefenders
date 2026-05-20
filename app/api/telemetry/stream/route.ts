/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\app\api\telemetry\stream\route.ts

   Timestamp:
   12 May 2026 02:15 (Sydney)

   PURPOSE:
   Enterprise telemetry federation API
===================================================== */

import {
  NextResponse
}
from "next/server"

import {
  streamOperationalTelemetry
}
from "@/backend/streaming/distributedTelemetryStreaming"

export async function POST(

  request:Request

){

  const payload =
  await request.json()

  await streamOperationalTelemetry(
    payload
  )

  return NextResponse.json({

    streamed:true
  })
}
