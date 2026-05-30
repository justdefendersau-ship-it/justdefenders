// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\app\api\cvil\route.ts
//
// Timestamp:
// 27 May 2026 18:10 Sydney
//
// PURPOSE:
// Canonical Vehicle Intelligence API.
// ====================================================================

import {
  NextResponse
}
from "next/server"

import {

  buildCanonicalVehicleIntelligence

}
from "@/lib/cvil/canonicalVehicleIntelligenceEngine"

// ====================================================================
// GET
// ====================================================================

export async function GET(){

  try {

    const intelligence =

      buildCanonicalVehicleIntelligence()

    return NextResponse.json({

      success:true,

      intelligence
    })

  } catch(error:any){

    console.error(
      "CVIL FAILURE:",
      error
    )

    return NextResponse.json({

      success:false,

      error:
        error.message

    },{
      status:500
    })
  }
}