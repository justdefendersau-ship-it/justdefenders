// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\platform\maturity\route.ts
// Timestamp: 15 May 2026 11:20 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  generateOperationalMaturityReport
} from "../../../../lib/platform/operationalMaturityConsolidation"

export async function GET() {

  return NextResponse.json({

    success: true,

    maturity:
      generateOperationalMaturityReport(),

    timestamp:
      new Date()
        .toISOString()
  })
}