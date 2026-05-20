// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\environment\audit\route.ts
// Timestamp: 15 May 2026 00:10 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  auditEnvironment
} from "../../../../lib/config/environmentGovernance"

export async function GET() {

  const audit =
    auditEnvironment()

  return NextResponse.json({

    success: true,

    environment:
      audit,

    timestamp:
      new Date()
        .toISOString()
  })
}