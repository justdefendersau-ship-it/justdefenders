// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\app\api\fose\advisories\route.ts
//
// Timestamp:
// 27 May 2026 17:25 Sydney
//
// PURPOSE:
// Operational advisory intelligence API.
// ====================================================================

import {
  NextResponse
}
from "next/server"

import {

  generateOperationalAdvisories

}
from "@/lib/fose/expeditionAdvisoryEngine"

// ====================================================================
// GET
// ====================================================================

export async function GET(){

  try {

    const advisories =

      generateOperationalAdvisories()

    return NextResponse.json({

      success:true,

      total:
        advisories.length,

      advisories
    })

  } catch(error:any){

    console.error(
      "ADVISORY FAILURE:",
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