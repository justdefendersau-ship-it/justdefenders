// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\platform\health\route.ts
// Timestamp: 15 May 2026 09:40 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  generateRuntimeAnalytics
} from "../../../../lib/analytics/runtimeAnalyticsEngine"

export async function GET() {

  const analytics =
    generateRuntimeAnalytics()

  return NextResponse.json({

    success: true,

    health: {

      operational:
        analytics.health.operational,

      status:
        analytics.health.status
    },

    services:
      analytics.services,

    runtime:
      analytics.runtime,

    timestamp:
      new Date()
        .toISOString()
  })
}