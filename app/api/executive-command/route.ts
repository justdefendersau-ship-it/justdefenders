/* =====================================================
   JustDefenders ©
   File:
   /app/api/executive-command/route.ts

   Timestamp:
   14 May 2026 16:15 (Sydney)

   PURPOSE:
   Executive strategic command dashboard API
===================================================== */

import {
  NextResponse
}
from "next/server"

import {
  generateDigitalTwin
}
from "@/server/digital-twin/realtimeDigitalTwinOperationsEngine"

import {
  runMissionSimulation
}
from "@/server/simulation/predictiveMissionSimulationFramework"

export async function GET(){

  return NextResponse.json({

    digitalTwin:
    generateDigitalTwin(),

    simulation:
    runMissionSimulation(),

    strategicStatus:
    "OPTIMAL"
  })
}
