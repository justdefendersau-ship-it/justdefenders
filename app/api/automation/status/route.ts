// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\automation\status\route.ts
// Timestamp: 15 May 2026 10:20 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  getAutomationTasks
} from "../../../../lib/automation/automationEngine"

export async function GET() {

  return NextResponse.json({

    success: true,

    automation:
      getAutomationTasks(),

    timestamp:
      new Date()
        .toISOString()
  })
}