import {
  NextRequest,
  NextResponse
}
from "next/server"

import {
  CaseService
}
from "@/backend/services/CaseService"

const service =
new CaseService()

export async function POST(
  request:NextRequest
){

  const body =
  await request.json()

  const result =
  await service.createCase(

    body.title,

    body.severity
  )

  return NextResponse.json(
    result
  )
}
