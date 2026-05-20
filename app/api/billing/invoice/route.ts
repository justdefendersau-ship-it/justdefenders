// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\billing\invoice\route.ts
// Timestamp: 15 May 2026 12:30 Sydney
// ====================================================================

import {
  NextRequest,
  NextResponse
} from "next/server"

import {
  createInvoice
} from "../../../../lib/billing/billingOrchestrationEngine"

export async function POST(
  request: NextRequest
) {

  const body =
    await request.json()

  const invoice =
    createInvoice(

      body.tenantId ??
      "tenant-jd-enterprise",

      body.amount ??
      0
    )

  return NextResponse.json({

    success: true,

    invoice,

    timestamp:
      new Date()
        .toISOString()
  })
}