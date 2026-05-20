// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\governance\status\route.ts
// Timestamp: 15 May 2026 10:00 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  getGovernancePolicies
} from "../../../../lib/governance/policyGovernanceEngine"

export async function GET() {

  return NextResponse.json({

    success: true,

    governance: {

      operational: true,

      policies:
        getGovernancePolicies()
    },

    timestamp:
      new Date()
        .toISOString()
  })
}