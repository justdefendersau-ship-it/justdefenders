// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\app\api\runtime\health\route.ts
//
// Timestamp:
// 02 June 2026 Sydney
//
// PURPOSE:
// Runtime health proxy API.
// Backend Runtime Control Plane Integration.
// ====================================================================

import {
  NextResponse
}
from "next/server"

// ====================================================================
// GET
// ====================================================================

export async function GET(){

  try {

const response =

  await fetch(

    "http://127.0.0.1:8090/runtime/health",

    {
      cache: "no-store"
    }
  )

const payload =

  await response.json()

return NextResponse.json(
  payload
)

  } catch(error:any){

    console.error(

      "RUNTIME HEALTH PROXY FAILURE:",

      error
    )

    return NextResponse.json(

      {

        success:false,

        error:
          error.message
      },

      {
        status:500
      }
    )
  }
}