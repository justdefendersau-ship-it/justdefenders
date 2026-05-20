/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\app\api\mesh\health\route.ts

   Timestamp:
   12 May 2026 04:15 (Sydney)

   PURPOSE:
   Enterprise service mesh health federation API
===================================================== */

import {
  NextResponse
}
from "next/server"

import {
  evaluateServiceMeshFederation
}
from "@/backend/service-mesh/enterpriseServiceMeshRuntime"

export async function GET(){

  return NextResponse.json(

    evaluateServiceMeshFederation()
  )
}
