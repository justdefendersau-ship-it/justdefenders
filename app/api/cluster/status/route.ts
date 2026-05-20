// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\cluster\status\route.ts
// Timestamp: 15 May 2026 10:40 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  getDistributedNodes
} from "../../../../lib/distributed/distributedRuntimeEngine"

export async function GET() {

  return NextResponse.json({

    success: true,

    cluster: {

      operational: true,

      nodes:
        getDistributedNodes()
    },

    timestamp:
      new Date()
        .toISOString()
  })
}