/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\api\ueba\anomalies\route.ts
 *
 * Timestamp:
 * 24 May 2026 21:51 Sydney
 *
 * PURPOSE:
 * UEBA Anomalies Endpoint
 *
 * PASS 47.5
 * Persistent Deployment Infrastructure Layer
 *
 * ============================================================
 */

import {

  NextResponse

} from "next/server"

import {

  prisma

} from "@/lib/database/prisma"

export async function GET(){

  try {

    // ========================================================
    // TEMPORARY UEBA STABILIZATION
    // ========================================================

    void prisma

    const anomalies = [

      {

        id:
          "ueba-anomaly-001",

        entity:
          "Supplier Federation User Session",

        anomalyType:
          "BEHAVIOURAL_DEVIATION",

        severity:
          "LOW",

        confidence:
          0.91,

        description:
          "Minor behavioural deviation detected within supplier interaction telemetry.",

        detectedAt:
          new Date().toISOString()
      }
    ]

    return NextResponse.json({

      success: true,

      anomalies
    })

  } catch(error){

    console.error(

      "[UEBA_ANOMALIES_ERROR]",

      error
    )

    return NextResponse.json({

      success: false,

      error: "UEBA anomaly retrieval failure",

      anomalies: []
    })
  }
}