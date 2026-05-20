import { NextResponse }
from "next/server"

import {
  ComplianceRuntime
}
from "@/backend/compliance/complianceRuntime"

const runtime =
new ComplianceRuntime()

export async function GET(){

  const result =
  await runtime.evaluateFramework(
    "ISO27001"
  )

  return NextResponse.json(
    result
  )
}
