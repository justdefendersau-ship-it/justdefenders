/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\api\oem\recommendations\route.ts
 *
 * Timestamp:
 * 21 May 2026 22:08 Sydney
 *
 * PURPOSE:
 * OEM Procurement Recommendations API
 *
 * STRATEGY:
 * PASS 27C — OEM Cross-Reference Intelligence
 *
 * ============================================================
 */

import {

  NextResponse

} from "next/server"

import {

  getExpeditionRecommendations,
  getTradePriorityParts

} from "@/lib/oem/crossReferenceEngine"

export async function GET(){

  try {

    return NextResponse.json({

      success: true,

      expeditionRecommendations:
        getExpeditionRecommendations(),

      tradePriorityParts:
        getTradePriorityParts()
    })

  } catch (error){

    console.error(

      "OEM RECOMMENDATION FAILURE",
      error
    )

    return NextResponse.json(

      {

        success: false,

        error:
          "Recommendation engine failure"
      },

      {

        status: 500
      }
    )
  }
}