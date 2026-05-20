// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\workflow\status\route.ts
// Timestamp: 15 May 2026 08:35 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  getWorkflowHistory
} from "../../../../lib/workflow/workflowOrchestrationEngine"

export async function GET() {

  return NextResponse.json({

    success: true,

    workflows:
      getWorkflowHistory(),

    timestamp:
      new Date()
        .toISOString()
  })
}