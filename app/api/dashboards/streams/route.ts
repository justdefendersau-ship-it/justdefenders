import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    streams:true,

    streamDepth:1842,

    consumerGroups:4,

    replayable:true,

    backpressure:false,

    timestamp:
    new Date().toISOString()
  })
}