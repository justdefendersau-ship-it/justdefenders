// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\logging\health\route.ts
// Timestamp: 14 May 2026 23:00 Sydney
// ====================================================================

import {
  NextRequest,
  NextResponse
} from "next/server"

import {
  logInfo
} from "../../../../lib/logging/runtimeLogger"

export async function GET(
  request: NextRequest
) {

  logInfo(
    "logging-health-endpoint",
    "Logging health endpoint executed",
    {

      path:
        request.nextUrl.pathname
    }
  )

  return NextResponse.json({

    success: true,

    logging:
      "operational",

    timestamp:
      new Date()
        .toISOString()
  })
}