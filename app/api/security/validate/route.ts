// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\security\validate\route.ts
// Timestamp: 15 May 2026 13:00 Sydney
// ====================================================================

import {
  NextRequest,
  NextResponse
} from "next/server"

import {
  validateAccessLevel
} from "../../../../lib/security/securityGovernanceEngine"

export async function POST(
  request: NextRequest
) {

  const body =
    await request.json()

  const allowed =
    validateAccessLevel(

      body.required ??
      "user",

      body.provided ??
      "user"
    )

  return NextResponse.json({

    success: true,

    allowed,

    timestamp:
      new Date()
        .toISOString()
  })
}