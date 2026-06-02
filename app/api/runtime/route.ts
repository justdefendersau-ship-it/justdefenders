// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\app\api\runtime\command\route.ts
//
// Timestamp:
// 02 June 2026 Sydney
//
// PURPOSE:
// Runtime command proxy API.
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

        "http://127.0.0.1:8090/runtime/command",

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

      "COMMAND LOAD FAILURE:",

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

        "http://127.0.0.1:8090/runtime/command",

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

      "COMMAND UPDATE FAILURE:",

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