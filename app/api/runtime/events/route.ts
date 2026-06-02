// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\app\api\runtime\events\route.ts
//
// Timestamp:
// 02 June 2026 Sydney
//
// PURPOSE:
// Runtime event bus proxy API.
// Backend Runtime Control Plane Integration.
// ====================================================================

import {
  NextRequest,
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

        "http://127.0.0.1:8090/runtime/events",

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

      "EVENT BUS FAILURE:",

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

// ====================================================================
// POST
// ====================================================================

export async function POST(

  request:NextRequest

){

  try {

    const body =

      await request.json()

    const response =

      await fetch(

        "http://127.0.0.1:8090/runtime/events",

        {

          method:"POST",

          headers:{

            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify(body)
        }
      )

    const payload =

      await response.json()

    return NextResponse.json(
      payload
    )

  } catch(error:any){

    console.error(

      "EVENT EMIT FAILURE:",

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