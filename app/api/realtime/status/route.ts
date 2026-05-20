// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\realtime\status\route.ts
// Timestamp: 15 May 2026 07:05 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  getRealtimeEvents
} from "../../../../lib/realtime/realtimeEventBus"

export async function GET() {

  return NextResponse.json({

    success: true,

    realtime: {

      operational: true,

      recentEvents:
        getRealtimeEvents()
    },

    timestamp:
      new Date()
        .toISOString()
  })
}