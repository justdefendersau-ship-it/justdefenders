// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\audit\history\route.ts
// Timestamp: 15 May 2026 09:20 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  getAuditEvents
} from "../../../../lib/audit/auditPersistence"

export async function GET() {

  return NextResponse.json({

    success: true,

    audit:
      getAuditEvents(),

    timestamp:
      new Date()
        .toISOString()
  })
}