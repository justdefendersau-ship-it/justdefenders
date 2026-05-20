// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\realtime\publish\route.ts
// Timestamp: 15 May 2026 07:05 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  publishRealtimeEvent
} from "../../../../lib/realtime/realtimeEventBus"

export async function POST() {

  const event =
    publishRealtimeEvent(

      "runtime.alert",

      {

        operational: true,

        message:
          "Realtime runtime operational"
      }
    )

  return NextResponse.json({

    success: true,

    event,

    timestamp:
      new Date()
        .toISOString()
  })
}