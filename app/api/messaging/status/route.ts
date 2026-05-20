import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    redisStreams:
    true,

    consumerGroups:
    true,

    replay:
    true,

    durableMessaging:
    true,

    timestamp:
    new Date().toISOString()
  })
}