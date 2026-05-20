import { NextResponse }
from "next/server"

import {
  CostOptimisationRuntime
}
from "@/backend/cost-optimisation/costOptimisationRuntime"

const runtime =
new CostOptimisationRuntime()

export async function GET(){

  const result =
  await runtime.evaluateCosts()

  return NextResponse.json(
    result
  )
}
