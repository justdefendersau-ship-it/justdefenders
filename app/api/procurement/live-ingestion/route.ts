/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\app\api\procurement\live-ingestion\route.ts
 *
 * Timestamp:
 * 17 May 2026 23:05 Sydney
 *
 * PURPOSE:
 * Live Procurement Ingestion API
 *
 * STRATEGY:
 * Supplier federation + ingestion orchestration
 * ============================================================
 */

import {
  NextResponse
} from "next/server"

import {
  executeLiveSupplierIngestion
} from "@/lib/procurement/liveSupplierIngestionEngine"

// ============================================================
// POST
// ============================================================

export async function POST(
  request: Request
){

  try {

    // ========================================================
    // BODY
    // ========================================================

    const body =
      await request.json()

    // ========================================================
    // VALIDATION
    // ========================================================

    if(
      !body.query
    ){

      return NextResponse.json({

        success: false,

        error:
          "Missing procurement ingestion query"

      },{

        status: 400
      })
    }

    // ========================================================
    // INGESTION
    // ========================================================

    const ingestion =
      await executeLiveSupplierIngestion({

        query:
          body.query,

        country:
          body.country || "AU",

        internationalEnabled:
          body.internationalEnabled ?? false,

        expeditionCritical:
          body.expeditionCritical ?? true,

        oemPriority:
          body.oemPriority ?? true
      })

    // ========================================================
    // RESPONSE
    // ========================================================

    return NextResponse.json({

      success: true,

      ingestion
    })

  } catch(error){

    // ========================================================
    // ERROR
    // ========================================================

    console.error(
      "LIVE_PROCUREMENT_INGESTION_ERROR",
      error
    )

    return NextResponse.json({

      success: false,

      error:
        "Operational supplier ingestion failed"

    },{

      status: 500
    })
  }
}