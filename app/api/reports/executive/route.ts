import { NextResponse }
from "next/server"

import {
  ExecutiveReportingRuntime
}
from "@/backend/executive-reporting/executiveReportingRuntime"

const runtime =
new ExecutiveReportingRuntime()

export async function GET(){

  const report =
  await runtime.generateExecutiveReport()

  return NextResponse.json(
    report
  )
}
