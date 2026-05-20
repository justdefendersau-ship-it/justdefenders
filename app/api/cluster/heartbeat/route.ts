// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\cluster\heartbeat\route.ts
// Timestamp: 15 May 2026 10:40 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  performClusterHeartbeat
} from "../../../../lib/distributed/distributedRuntimeEngine"

export async function POST() {

  const heartbeat =
    performClusterHeartbeat()

  return NextResponse.json({

    success: heartbeat,

    cluster: {

      heartbeat:
        heartbeat
    },

    timestamp:
      new Date()
        .toISOString()
  })
}