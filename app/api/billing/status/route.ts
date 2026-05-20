// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\billing\status\route.ts
// Timestamp: 15 May 2026 12:30 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  getInvoices
} from "../../../../lib/billing/billingOrchestrationEngine"

export async function GET() {

  return NextResponse.json({

    success: true,

    invoices:
      getInvoices(),

    timestamp:
      new Date()
        .toISOString()
  })
}