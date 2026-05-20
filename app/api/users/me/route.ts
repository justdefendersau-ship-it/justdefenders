import {
  NextRequest,
  NextResponse
}
from "next/server"

import {
  authenticateRequest
}
from "@/backend/middleware/authMiddleware"

export async function GET(
  request:NextRequest
){

  const user =
  await authenticateRequest(
    request
  )

  return NextResponse.json({

    user
  })
}
