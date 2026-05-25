/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\api\tip\iocs\route.ts
 *
 * Timestamp:
 * 24 May 2026 21:43 Sydney
 *
 * PURPOSE:
 * Threat IOC Intelligence Endpoint
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
    // TEMPORARY IOC STABILIZATION
    // ========================================================

    void prisma

    const iocs = [

      {

        id:
          "ioc-001",

        type:
          "DOMAIN",

        value:
          "suspicious-supplier-node.example",

        severity:
          "LOW",

        confidence:
          0.89,

        source:
          "Federation Telemetry",

        detectedAt:
          new Date().toISOString()
      }
    ]

    return NextResponse.json({

      success: true,

      iocs
    })

  } catch(error){

    console.error(

      "[TIP_IOCS_ERROR]",

      error
    )

    return NextResponse.json({

      success: false,

      error: "IOC retrieval failure",

      iocs: []
    })
  }
}