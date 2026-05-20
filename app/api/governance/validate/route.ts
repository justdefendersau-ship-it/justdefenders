// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\governance\validate\route.ts
// Timestamp: 15 May 2026 10:00 Sydney
// ====================================================================

import {
  NextRequest,
  NextResponse
} from "next/server"

import {
  validatePolicyAccess
} from "../../../../lib/governance/policyGovernanceEngine"

export async function POST(
  request: NextRequest
) {

  const body =
    await request.json()

  const allowed =
    validatePolicyAccess(

      body.policyId ??
      ""
    )

  return NextResponse.json({

    success: true,

    allowed,

    timestamp:
      new Date()
        .toISOString()
  })
}