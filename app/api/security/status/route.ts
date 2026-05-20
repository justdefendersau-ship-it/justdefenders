// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\security\status\route.ts
// Timestamp: 15 May 2026 13:00 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  getSecurityPolicies
} from "../../../../lib/security/securityGovernanceEngine"

export async function GET() {

  return NextResponse.json({

    success: true,

    security: {

      operational: true,

      policies:
        getSecurityPolicies()
    },

    timestamp:
      new Date()
        .toISOString()
  })
}