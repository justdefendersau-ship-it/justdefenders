// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\analytics\dashboard\route.ts
// Timestamp: 15 May 2026 09:40 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  generateRuntimeAnalytics
} from "../../../../lib/analytics/runtimeAnalyticsEngine"

export async function GET() {

  return NextResponse.json({

    success: true,

    analytics:
      generateRuntimeAnalytics(),

    timestamp:
      new Date()
        .toISOString()
  })
}