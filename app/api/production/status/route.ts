import { NextResponse }
from "next/server"

import {
  evaluateProductionReadiness
}
from "@/backend/production-readiness/enterpriseReadinessRuntime"

export async function GET(){

  return NextResponse.json(
    evaluateProductionReadiness()
  )
}
