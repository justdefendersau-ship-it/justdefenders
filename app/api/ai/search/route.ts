import {
  NextRequest,
  NextResponse
}
from "next/server"

import {
  semanticSearch
}
from "@/backend/semantic-search/semanticSearchRuntime"

export async function POST(
  request:NextRequest
){

  const body =
  await request.json()

  const result =
  await semanticSearch(
    body.query
  )

  return NextResponse.json(
    result
  )
}
