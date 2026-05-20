import {
  NextRequest,
  NextResponse
}
from "next/server"

import {
  IdentityFederationRuntime
}
from "@/backend/identity/identityFederationRuntime"

const runtime =
new IdentityFederationRuntime()

export async function POST(
  request:NextRequest
){

  const body =
  await request.json()

  const result =
  await runtime.verifyIdentity(
    body.username
  )

  return NextResponse.json(
    result
  )
}
