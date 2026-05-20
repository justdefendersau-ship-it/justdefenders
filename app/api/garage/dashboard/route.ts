// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\garage\dashboard\route.ts
// Timestamp: 15 May 2026 16:05 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  getGarageOperationalSummary
} from "../../../../lib/garage/garageLiveService"

export async function GET() {

  try {

    const garage =
      await getGarageOperationalSummary()

    return NextResponse.json({

      success: true,

      garage,

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
            : "Unknown garage error"
      },

      {
        status: 500
      }
    )
  }
}