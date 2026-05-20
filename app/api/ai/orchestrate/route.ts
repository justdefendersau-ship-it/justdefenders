// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\ai\orchestrate\route.ts
// Timestamp: 15 May 2026 08:15 Sydney
// ====================================================================

import {
  NextRequest,
  NextResponse
} from "next/server"

import {
  executeAiOrchestration
} from "../../../../lib/ai/aiOrchestrationEngine"

export async function POST(
  request: NextRequest
) {

  const body =
    await request.json()

  const result =
    await executeAiOrchestration({

      task:
        body.task,

      vin:
        body.vin,

      payload:
        body.payload
    })

  return NextResponse.json({

    success: true,

    orchestration:
      result,

    timestamp:
      new Date()
        .toISOString()
  })
}