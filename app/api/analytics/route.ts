/* =====================================================
   JustDefenders ©
   File:
   /app/api/analytics/route.ts

   Timestamp:
   14 May 2026 10:15 (Sydney)

   PURPOSE:
   Live operational analytics API
===================================================== */

import {
  NextResponse
}
from "next/server"

import {
  generateOperationalAnalytics
}
from "@/server/analytics/liveOperationalAnalyticsPipeline"

export async function GET(){

  return NextResponse.json(

    generateOperationalAnalytics()
  )
}
