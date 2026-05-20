import {
  NextRequest,
  NextResponse
}
from "next/server"

import {
  orchestrateAiWorkflow
}
from "@/backend/ai-orchestration/aiOrchestrationRuntime"

export async function POST(
  request:NextRequest
){

  const body =
  await request.json()

  const result =
  await orchestrateAiWorkflow(
    body.prompt
  )

  return NextResponse.json(
    result
  )
}
