/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\app\api\compliance\audit\route.ts

   Timestamp:
   12 May 2026 06:15 (Sydney)

   PURPOSE:
   Enterprise compliance federation API
===================================================== */

import {
  NextResponse
}
from "next/server"

import {
  evaluateComplianceFederation
}
from "@/backend/compliance/enterpriseComplianceRuntime"

export async function GET(){

  return NextResponse.json(

    evaluateComplianceFederation()
  )
}
