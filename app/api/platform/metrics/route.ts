import {
  NextResponse
}
from "next/server"

const metrics =
require("../../../../server/observability/metrics-registry")

export async function GET(){

  return NextResponse.json({

    metrics:
    metrics.getAll(),

    timestamp:
    new Date().toISOString()
  })
}