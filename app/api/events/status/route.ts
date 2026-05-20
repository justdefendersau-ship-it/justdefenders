import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    eventBus:
    "ACTIVE",

    asyncOrchestration:
    true,

    replay:
    true,

    distributedReady:
    true,

    timestamp:
    new Date().toISOString()
  })
}