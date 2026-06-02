// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\app\api\runtime\features\route.ts
//
// Timestamp:
// 02 June 2026 13:15 Sydney
//
// PURPOSE:
// Runtime features proxy API.
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

        "http://127.0.0.1:8090/runtime/features",

        {
          cache:"no-store"
        }
      )

    const payload =

      await response.json()

    return NextResponse.json(
      payload
    )

  } catch(error:any){

    console.error(

      "FEATURES LOAD FAILURE:",

      error
    )

    return NextResponse.json(

      {

        success:false,

        error:error.message

      },

      {
        status:500
      }
    )
  }
}