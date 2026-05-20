import { NextResponse }
from "next/server"

import {
  PerformanceRuntime
}
from "@/backend/performance/performanceRuntime"

const runtime =
new PerformanceRuntime()

export async function GET(){

  const metrics =
  await runtime.evaluatePerformance()

  return NextResponse.json(
    metrics
  )
}
