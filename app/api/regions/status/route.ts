/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\app\api\regions\status\route.ts

   Timestamp:
   12 May 2026 08:15 (Sydney)

   PURPOSE:
   Enterprise regional federation API
===================================================== */

import {
  NextResponse
}
from "next/server"

import {
  evaluateRegionalFederation
}
from "@/backend/regions/enterpriseRegionFederation"

export async function GET(){

  return NextResponse.json(

    evaluateRegionalFederation()
  )
}
