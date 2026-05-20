// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\platform\readiness\route.ts
// Timestamp: 15 May 2026 06:45 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  generatePlatformReport
} from "../../../../lib/platform/platformConsolidation"

export async function GET() {

  return NextResponse.json({

    success: true,

    readiness:
      generatePlatformReport(),

    timestamp:
      new Date()
        .toISOString()
  })
}