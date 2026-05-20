// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\tenant\status\route.ts
// Timestamp: 15 May 2026 11:45 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  getTenantProfiles
} from "../../../../lib/tenant/tenantOrchestrationEngine"

export async function GET() {

  return NextResponse.json({

    success: true,

    tenants:
      getTenantProfiles(),

    timestamp:
      new Date()
        .toISOString()
  })
}