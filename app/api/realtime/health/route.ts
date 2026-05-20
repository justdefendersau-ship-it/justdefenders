import { NextResponse }
from "next/server"

export async function GET(){

  return NextResponse.json({

    operational:true,

    websocket:true,

    telemetry:true,

    timestamp:new Date()
  })
}
