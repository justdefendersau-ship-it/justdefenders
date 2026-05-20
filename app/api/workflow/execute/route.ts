// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\workflow\execute\route.ts
// Timestamp: 15 May 2026 08:35 Sydney
// ====================================================================

import {
  NextRequest,
  NextResponse
} from "next/server"

import {
  executeWorkflow
} from "../../../../lib/workflow/workflowOrchestrationEngine"

export async function POST(
  request: NextRequest
) {

  const body =
    await request.json()

  const workflow =
    await executeWorkflow(

      body.workflow ??
      "default-workflow"
    )

  return NextResponse.json({

    success: true,

    workflow,

    timestamp:
      new Date()
        .toISOString()
  })
}