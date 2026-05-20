// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\operations\executive-status\route.ts
// Timestamp: 15 May 2026 15:00 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  getDashboardOperationalMetrics
} from "../../../../lib/dashboard/dashboardLiveService"

export async function GET() {

  try {

    const executive =
      await getDashboardOperationalMetrics()

    return NextResponse.json({

      success: true,

      executive,

      timestamp:
        new Date()
          .toISOString()
    })

  } catch (error) {

    return NextResponse.json(

      {

        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unknown dashboard error"
      },

      {
        status: 500
      }
    )
  }
}