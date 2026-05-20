// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\stream\aggregate\route.ts
// Timestamp: 15 May 2026 03:00 Sydney

import {
  NextResponse
} from "next/server"

export async function GET() {

  return NextResponse.json({

    success: true,

    aggregation: {

      streams: 0,

      events: 0,

      anomalies: 0
    },

    mode: "build-safe"
  })
}