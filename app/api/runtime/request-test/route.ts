// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\runtime\request-test\route.ts
// Timestamp: 14 May 2026 23:55 Sydney
// ====================================================================

import {
  NextRequest,
  NextResponse
} from "next/server"

import {
  createRequestContext,
  calculateRequestDuration
} from "../../../../lib/runtime/requestGovernance"

export async function GET(
  request: NextRequest
) {

  const context =
    createRequestContext(
      request
    )

  const duration =
    calculateRequestDuration(
      context
    )

  return NextResponse.json({

    success: true,

    request: {

      requestId:
        context.requestId,

      method:
        context.method,

      path:
        context.path,

      duration
    }
  })
}