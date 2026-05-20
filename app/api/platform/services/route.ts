// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\platform\services\route.ts
// Timestamp: 15 May 2026 08:55 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  generateServiceReport
} from "../../../../lib/platform/serviceConsolidation"

export async function GET() {

  return NextResponse.json({

    success: true,

    platform:
      generateServiceReport(),

    timestamp:
      new Date()
        .toISOString()
  })
}