// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\predictive\analyze\route.ts
// Timestamp: 15 May 2026 08:00 Sydney
// ====================================================================

import {
  NextRequest,
  NextResponse
} from "next/server"

import {
  generatePredictiveInsights
} from "../../../../lib/predictive/predictiveEngine"

export async function POST(
  request: NextRequest
) {

  const body =
    await request.json()

  const insights =
    await generatePredictiveInsights({

      vin:
        body.vin ?? "UNKNOWN",

      mileage:
        body.mileage,

      engine:
        body.engine,

      model:
        body.model
    })

  return NextResponse.json({

    success: true,

    insights,

    timestamp:
      new Date()
        .toISOString()
  })
}