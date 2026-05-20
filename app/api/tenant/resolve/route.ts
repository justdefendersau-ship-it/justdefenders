// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\tenant\resolve\route.ts
// Timestamp: 15 May 2026 11:45 Sydney
// ====================================================================

import {
  NextRequest,
  NextResponse
} from "next/server"

import {
  resolveTenant
} from "../../../../lib/tenant/tenantOrchestrationEngine"

export async function POST(
  request: NextRequest
) {

  const body =
    await request.json()

  const tenant =
    resolveTenant(

      body.slug ?? ""
    )

  return NextResponse.json({

    success: true,

    tenant,

    timestamp:
      new Date()
        .toISOString()
  })
}