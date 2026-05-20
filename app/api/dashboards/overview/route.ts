import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    platform:"ONLINE",

    telemetryEvents:18452,

    activeAlerts:27,

    criticalIncidents:3,

    uebaRiskEntities:12,

    aiOperations:144,

    distributedStreams:true,

    redisRuntime:true,

    timestamp:
    new Date().toISOString()
  })
}