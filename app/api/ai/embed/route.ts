import {
  NextRequest,
  NextResponse
}
from "next/server"

import {
  generateEmbedding
}
from "@/backend/embedding-services/embeddingRuntime"

export async function POST(
  request:NextRequest
){

  const body =
  await request.json()

  const embedding =
  await generateEmbedding(
    body.text
  )

  return NextResponse.json({

    embedding
  })
}
