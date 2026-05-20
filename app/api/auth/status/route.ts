// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\auth\status\route.ts
// Timestamp: 14 May 2026 22:00 Sydney
// ====================================================================

import {
  NextRequest,
  NextResponse
} from "next/server"

import {
  validateRuntimeToken
} from "../../../../lib/auth/runtimeAuth"

export async function GET(
  request: NextRequest
) {

  const authHeader =
    request.headers.get(
      "authorization"
    )

  const token =
    authHeader?.replace(
      "Bearer ",
      ""
    )

  const validation =
    validateRuntimeToken(
      token
    )

  return NextResponse.json({

    success: true,

    authentication:
      validation
  })
}