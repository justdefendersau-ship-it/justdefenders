import {
  NextRequest,
  NextResponse
}
from "next/server"

import {
  UbaRuntime
}
from "@/backend/uba/ubaRuntime"

const runtime =
new UbaRuntime()

export async function POST(
  request:NextRequest
){

  const body =
  await request.json()

  const result =
  await runtime.analyseBehaviour(

    body.username,

    body.activity
  )

  return NextResponse.json(
    result
  )
}
