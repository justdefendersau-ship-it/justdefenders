// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\telemetry\ingest\route.ts
// Timestamp: 15 May 2026 07:20 Sydney
// ====================================================================

import {
  NextRequest,
  NextResponse
} from "next/server"

import {
  persistTelemetryRecord
} from "../../../../lib/telemetry/telemetryPersistence"

export async function POST(
  request: NextRequest
) {

  const body =
    await request.json()

  const record =
    await persistTelemetryRecord(

      body.vin ?? "UNKNOWN",

      {

        engineTemperature:
          body.engineTemperature,

        batteryVoltage:
          body.batteryVoltage,

        coolantLevel:
          body.coolantLevel,

        oilPressure:
          body.oilPressure,

        notes:
          body.notes
      }
    )

  return NextResponse.json({

    success: true,

    telemetry:
      record,

    timestamp:
      new Date()
        .toISOString()
  })
}