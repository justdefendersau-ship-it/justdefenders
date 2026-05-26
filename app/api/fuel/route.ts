// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\api\fuel\route.ts
//
// Timestamp:
// 26 May 2026 15:10 Sydney
//
// PURPOSE:
// SAFE MODE fuel persistence API.
// ====================================================================

import {
  NextResponse
}
from "next/server"

// ============================================================
// MEMORY STORE
// ============================================================

let fuelHistory:any[] = []

// ============================================================
// GET
// ============================================================

export async function GET(){

  return NextResponse.json({

    success:true,

    history:fuelHistory
  })
}

// ============================================================
// POST
// ============================================================

export async function POST(
  req: Request
){

  try {

    const body =
      await req.json()

    const litres =
      Number(body.litres || 0)

    const odometer =
      Number(body.odometer || 0)

    const price =
      Number(body.price || 0)

    const source =
      body.source || "fuel_station"

    const entry = {

      id:
        Date.now().toString(),

      litres,

      odometer,

      price,

      source,

      timestamp:
        new Date().toISOString()
    }

    fuelHistory = [
      entry,
      ...fuelHistory
    ]

    // ========================================================
    // SIMPLE ANOMALY DETECTION
    // ========================================================

    let anomaly:any = null

    if(fuelHistory.length >= 2){

      const current =
        fuelHistory[0]

      const previous =
        fuelHistory[1]

      const kmDiff =
        current.odometer -
        previous.odometer

      if(
        kmDiff > 0 &&
        current.litres > 0
      ){

        const kmPerLitre =
          kmDiff /
          current.litres

        if(kmPerLitre < 5){

          anomaly = {

            level:"warn",

            message:
              "Fuel efficiency anomaly detected",

            value:
              kmPerLitre.toFixed(2)
          }
        }
      }
    }

    return NextResponse.json({

      success:true,

      entry,

      anomaly,

      history:fuelHistory
    })

  } catch(error:any){

    console.error(
      "Fuel API failure",
      error
    )

    return NextResponse.json({

      success:false,

      error:
        error?.message ||
        "Fuel persistence failure"

    },{
      status:500
    })
  }
}