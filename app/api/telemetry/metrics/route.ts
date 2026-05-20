// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\telemetry\metrics\route.ts
// Timestamp: 15 May 2026 01:05 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  getRuntimeMetrics
} from "../../../../lib/telemetry/runtimeMetrics"

export async function GET() {

  return NextResponse.json({

    success: true,

    telemetry:
      getRuntimeMetrics(),

    timestamp:
      new Date()
        .toISOString()
  })
}