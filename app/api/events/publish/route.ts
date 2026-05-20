import {
  NextRequest,
  NextResponse
}
from "next/server"

import {
  streamEvent
}
from "@/backend/event-streaming/eventStreamingRuntime"

export async function POST(
  request:NextRequest
){

  const body =
  await request.json()

  await streamEvent(

    body.topic,

    body.payload
  )

  return NextResponse.json({

    success:true
  })
}
