// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\app\api\intelligence\route.ts
//
// Timestamp:
// 27 May 2026 18:35 Sydney
//
// PURPOSE:
// Unified operational intelligence API.
// ====================================================================

import {
  NextResponse
}
from "next/server"

import {

  getUnifiedOperationalIntelligence

}
from "@/lib/cvil/unifiedOperationalIntelligenceGateway"

// ====================================================================
// GET
// ====================================================================

export async function GET(){

  try {

    const intelligence =

      getUnifiedOperationalIntelligence()

    return NextResponse.json({

      success:true,

      intelligence
    })

  } catch(error:any){

    console.error(
      "INTELLIGENCE GATEWAY FAILURE:",
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