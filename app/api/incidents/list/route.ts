import { NextResponse }
from "next/server"

import {
  IncidentEngine
}
from "@/backend/incidents/incidentEngine"

const engine =
new IncidentEngine()

export async function GET(){

  const incidents =
  await engine.getIncidents()

  return NextResponse.json(
    incidents
  )
}
