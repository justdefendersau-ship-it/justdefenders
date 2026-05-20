import {
  NextRequest,
  NextResponse
}
from "next/server"

import {
  IncidentEngine
}
from "@/backend/incidents/incidentEngine"

const engine =
new IncidentEngine()

export async function POST(
  request:NextRequest
){

  const body =
  await request.json()

  const incident =
  await engine.createIncident(

    body.severity,

    body.title,

    body.telemetry
  )

  return NextResponse.json(
    incident
  )
}
