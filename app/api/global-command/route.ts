/* =====================================================
   JustDefenders ©
   File:
   /app/api/global-command/route.ts

   Timestamp:
   14 May 2026 22:15 (Sydney)

   PURPOSE:
   Global federation command nexus API
===================================================== */

import {
  NextResponse
}
from "next/server"

import {
  evaluateConsensus
}
from "@/server/consensus/distributedConsensusCoordinationRuntime"

import {
  optimiseFederationRuntime
}
from "@/server/optimisation/adaptiveRuntimeOptimisationEngine"

export async function GET(){

  return NextResponse.json({

    consensus:
    evaluateConsensus(),

    optimisation:
    optimiseFederationRuntime(),

    commandStatus:
    "GLOBAL_OPERATIONAL"
  })
}
