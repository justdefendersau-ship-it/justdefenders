import {
  NextRequest,
  NextResponse
}
from "next/server"

import {
  ThreatHuntingRuntime
}
from "@/backend/threat-hunting/threatHuntingRuntime"

const runtime =
new ThreatHuntingRuntime()

export async function POST(
  request:NextRequest
){

  const body =
  await request.json()

  const result =
  await runtime.executeHunt(
    body.query
  )

  return NextResponse.json(
    result
  )
}
