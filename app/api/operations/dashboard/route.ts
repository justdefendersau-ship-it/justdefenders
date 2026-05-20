// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\operations\dashboard\route.ts
// Timestamp: 15 May 2026 11:00 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  generateOperationsDashboard
} from "../../../../lib/operations/operationsDashboardEngine"

export async function GET() {

  return NextResponse.json({

    success: true,

    dashboard:
      generateOperationsDashboard(),

    timestamp:
      new Date()
        .toISOString()
  })
}