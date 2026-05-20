import { NextResponse }
from "next/server"

import {
  EnterpriseReadinessRuntime
}
from "@/backend/enterprise-readiness/enterpriseReadinessRuntime"

const runtime =
new EnterpriseReadinessRuntime()

export async function GET(){

  const result =
  await runtime.validateEnterpriseReadiness()

  return NextResponse.json(
    result
  )
}
