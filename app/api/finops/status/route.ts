import { NextResponse }
from "next/server"

import {
  evaluateFinOpsFederation
}
from "@/backend/finops/enterpriseFinOpsRuntime"

export async function GET(){

  return NextResponse.json(
    evaluateFinOpsFederation()
  )
}
