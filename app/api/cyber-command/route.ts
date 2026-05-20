/* =====================================================
   JustDefenders ©
   File:
   /app/api/cyber-command/route.ts

   Timestamp:
   15 May 2026 04:15 (Sydney)

   PURPOSE:
   Supreme cyber defence command nexus API
===================================================== */

import {
  NextResponse
}
from "next/server"

import {
  evaluateCyberDefenceMesh
}
from "@/server/cyber-defence/autonomousCyberDefenceMesh"

import {
  evaluateCyberResilience
}
from "@/server/cyber-resilience/predictiveCyberResilienceIntelligence"

export async function GET(){

  return NextResponse.json({

    cyber:
    evaluateCyberDefenceMesh(),

    resilience:
    evaluateCyberResilience(),

    cyberCommand:
    "ACTIVE"
  })
}
