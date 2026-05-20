/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\app\api\ai\chat\route.ts

   Timestamp:
   12 May 2026 00:15 (Sydney)

   PURPOSE:
   Enterprise AI federation API
===================================================== */

import {
  NextResponse
}
from "next/server"

import {
  generateEnterpriseCompletion
}
from "@/backend/providers/openAiFederationRuntime"

export async function POST(

  request:Request

){

  const body =
  await request.json()

  const response =
  await generateEnterpriseCompletion(

    body.prompt
  )

  return NextResponse.json({

    response
  })
}
