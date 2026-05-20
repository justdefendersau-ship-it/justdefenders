// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\queue\status\route.ts
// Timestamp: 15 May 2026 06:25 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  getRuntimeQueue
} from "../../../../lib/queue/asyncQueueOrchestrator"

export async function GET() {

  return NextResponse.json({

    success: true,

    queue:
      getRuntimeQueue(),

    timestamp:
      new Date()
        .toISOString()
  })
}