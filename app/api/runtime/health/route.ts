// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\app\api\runtime\health\route.ts
//
// Timestamp:
// 28 May 2026 02:20 Sydney
//
// PURPOSE:
// Runtime health monitoring API.
// ====================================================================

import {
  NextResponse
}
from "next/server"

import {

  generateRuntimeHealth

}
from "@/lib/runtime/runtimeHealthEngine"

// ====================================================================
// GET
// ====================================================================

export async function GET(){

  try {

    const health =

      generateRuntimeHealth()

    return NextResponse.json({

      success:true,

      health
    })

  } catch(error:any){

    console.error(
      "RUNTIME HEALTH FAILURE:",
      error
    )

    return NextResponse.json({

      success:false,

      error:error.message

    },{
      status:500
    })
  }
}