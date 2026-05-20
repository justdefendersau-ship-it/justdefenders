/* =====================================================
   JustDefenders ©
   File:
   /app/api/strategic-intelligence/route.ts

   Timestamp:
   14 May 2026 14:15 (Sydney)

   PURPOSE:
   Strategic operations intelligence API
===================================================== */

import {
  NextResponse
}
from "next/server"

import {
  orchestrateAIInference
}
from "@/server/ai/advancedAIInferenceOrchestration"

export async function GET(){

  const intelligence =
  await orchestrateAIInference()

  return NextResponse.json(
    intelligence
  )
}
