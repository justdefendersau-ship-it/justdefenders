// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\runtime\features\route.ts
// Timestamp: 15 May 2026 00:40 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  listRuntimeFeatures
} from "../../../../lib/runtime/featureGovernance"

export async function GET() {

  return NextResponse.json({

    success: true,

    features:
      listRuntimeFeatures(),

    timestamp:
      new Date()
        .toISOString()
  })
}