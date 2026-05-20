import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    operationalHealth:"STABLE",

    activeIncidents:4,

    telemetryPerMinute:1822,

    aiConfidence:94,

    executiveRisk:"MODERATE",

    timestamp:
    new Date().toISOString()
  })
}