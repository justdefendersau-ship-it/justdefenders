import {
  NextRequest,
  NextResponse
}
from "next/server"

import {
  SoarRuntime
}
from "@/backend/soar/soarRuntime"

const runtime =
new SoarRuntime()

export async function POST(
  request:NextRequest
){

  const body =
  await request.json()

  const result =
  await runtime.executeAutomation(

    body.playbook,

    body.incident
  )

  return NextResponse.json(
    result
  )
}
