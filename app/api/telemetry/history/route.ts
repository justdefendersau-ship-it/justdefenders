// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\telemetry\history\route.ts
// Timestamp: 15 May 2026 07:20 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  getTelemetryRecords
} from "../../../../lib/telemetry/telemetryPersistence"

export async function GET() {

  return NextResponse.json({

    success: true,

    telemetry:
      getTelemetryRecords(),

    timestamp:
      new Date()
        .toISOString()
  })
}