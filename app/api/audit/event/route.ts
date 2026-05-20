// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\audit\event\route.ts
// Timestamp: 15 May 2026 09:20 Sydney
// ====================================================================

import {
  NextRequest,
  NextResponse
} from "next/server"

import {
  persistAuditEvent
} from "../../../../lib/audit/auditPersistence"

export async function POST(
  request: NextRequest
) {

  const body =
    await request.json()

  const event =
    persistAuditEvent(

      body.source ??
      "unknown",

      body.action ??
      "unknown-action",

      body.severity ??
      "info",

      body.metadata
    )

  return NextResponse.json({

    success: true,

    audit:
      event,

    timestamp:
      new Date()
        .toISOString()
  })
}