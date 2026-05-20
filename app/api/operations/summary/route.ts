import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    platform:
    "JustDefenders",

    status:
    "OPERATIONAL",

    tenants:3,

    analysts:12,

    activeIncidents:4,

    aiRuntime:"ONLINE",

    timestamp:
    new Date().toISOString()
  })
}