import {
  NextResponse
}
from "next/server"

export async function GET(){

  return NextResponse.json({

    tracing:
    "ACTIVE",

    metrics:
    true,

    correlation:
    true,

    distributedObservability:
    true,

    timestamp:
    new Date().toISOString()
  })
}