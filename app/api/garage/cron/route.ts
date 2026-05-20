// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\garage\cron\route.ts
// Timestamp: 15 May 2026 01:55 Sydney

import {
  NextResponse
} from "next/server"

export async function GET() {

  /**
   * Push notifications intentionally disabled
   * for build-safe deployment mode
   */
  return NextResponse.json({

    success: true,

    cron: "active",

    pushNotifications: false
  })
}