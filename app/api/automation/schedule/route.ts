// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\automation\schedule\route.ts
// Timestamp: 15 May 2026 10:20 Sydney
// ====================================================================

import {
  NextRequest,
  NextResponse
} from "next/server"

import {
  scheduleAutomationTask
} from "../../../../lib/automation/automationEngine"

export async function POST(
  request: NextRequest
) {

  const body =
    await request.json()

  const task =
    scheduleAutomationTask(

      body.name ??
      "default-automation",

      body.schedule ??
      "daily"
    )

  return NextResponse.json({

    success: true,

    automation:
      task,

    timestamp:
      new Date()
        .toISOString()
  })
}