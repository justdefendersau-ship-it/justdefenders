import { NextResponse }
from "next/server"

import {

  normaliseCSVRow,

  validateInventoryRow

}
from "../../../lib/csvIngestionEngine"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\api\csv-ingestion\route.ts
//
// Timestamp:
// 2026-05-08 08:00
//
// Purpose:
// - CSV ingestion API
// =====================================================

export async function POST(
  req:Request
){

  try {

    const body =
      await req.json()

    const rows =
      body.rows || []

    const processed =

      rows.map((r:any)=>{

        const normalised =

          normaliseCSVRow(r)

        const validation =

          validateInventoryRow(
            normalised
          )

        return {

          normalised,

          validation
        }
      })

    return NextResponse.json({

      success:true,

      processed
    })

  } catch(err){

    console.error(
      "CSV INGESTION ERROR:",
      err
    )

    return NextResponse.json({

      success:false

    }, {
      status:500
    })
  }
}
