import {
  NextRequest,
  NextResponse
}
from "next/server"

import {
  ZeroTrustRuntime
}
from "@/backend/zero-trust/zeroTrustRuntime"

const runtime =
new ZeroTrustRuntime()

export async function POST(
  request:NextRequest
){

  const body =
  await request.json()

  const result =
  await runtime.validateAccess(

    body.user,

    body.resource
  )

  return NextResponse.json(
    result
  )
}
