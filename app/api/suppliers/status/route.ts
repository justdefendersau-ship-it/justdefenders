import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    defender:true,

    sentinel:true,

    microsoft365:true,

    sysmon:true,

    wef:true,

    threatIntel:true,

    liveTelemetry:true,

    timestamp:
    new Date().toISOString()
  })
}