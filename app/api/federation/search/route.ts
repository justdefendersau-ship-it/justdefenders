// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\federation\search\route.ts
// Timestamp: 15 May 2026 07:35 Sydney
// ====================================================================

import {
  NextRequest,
  NextResponse
} from "next/server"

import {
  executeSupplierFederation
} from "../../../../lib/federation/supplierFederationEngine"

export async function POST(
  request: NextRequest
) {

  const body =
    await request.json()

  const results =
    await executeSupplierFederation({

      query:
        body.query ?? "",

      vehicle:
        body.vehicle,

      vin:
        body.vin
    })

  return NextResponse.json({

    success: true,

    count:
      results.length,

    results,

    timestamp:
      new Date()
        .toISOString()
  })
}