import {
  NextRequest,
  NextResponse
}
from "next/server"

import {
  PlaybookRuntime
}
from "@/backend/playbooks/playbookRuntime"

const runtime =
new PlaybookRuntime()

export async function POST(
  request:NextRequest
){

  const body =
  await request.json()

  const result =
  await runtime.executePlaybook(

    body.playbook,

    body.incident
  )

  return NextResponse.json(
    result
  )
}
