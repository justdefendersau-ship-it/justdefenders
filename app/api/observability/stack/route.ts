import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    prometheus:
    true,

    grafana:
    true,

    loki:
    true,

    tempo:
    true,

    distributedObservability:
    true,

    timestamp:
    new Date().toISOString()
  })
}