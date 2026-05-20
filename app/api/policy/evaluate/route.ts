import {
  NextRequest,
  NextResponse
}
from "next/server"

import {
  PolicyEngineRuntime
}
from "@/backend/policy-engine/policyDecisionRuntime"

const runtime =
new PolicyEngineRuntime()

export async function POST(
  request:NextRequest
){

  const body =
  await request.json()

  const result =
  await runtime.evaluatePolicy(
    body
  )

  return NextResponse.json(
    result
  )
}
