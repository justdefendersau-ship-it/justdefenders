import {
  NextRequest,
  NextResponse
}
from "next/server"

import {
  ThreatDetectionEngine
}
from "@/backend/detection-engine/threatDetectionEngine"

const engine =
new ThreatDetectionEngine()

export async function POST(
  request:NextRequest
){

  const telemetry =
  await request.json()

  const result =
  await engine.analyseTelemetry(
    telemetry
  )

  return NextResponse.json(
    result
  )
}
