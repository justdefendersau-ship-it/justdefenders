/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\api\detections\rules\route.ts
 *
 * Timestamp:
 * 24 May 2026 19:33 Sydney
 *
 * PURPOSE:
 * Tactical Detection Rules Endpoint
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
    // TEMPORARY DETECTION RULE STABILIZATION
    // ========================================================

    void prisma

    const rules = [

      {

        id:
          "rule-001",

        name:
          "Federation Latency Threshold",

        category:
          "FEDERATION",

        severity:
          "MEDIUM",

        enabled:
          true,

        description:
          "Detects abnormal supplier federation response latency.",

        createdAt:
          new Date().toISOString()
      }
    ]

    return NextResponse.json({

      success: true,

      rules
    })

  } catch(error){

    console.error(

      "[DETECTION_RULES_ERROR]",

      error
    )

    return NextResponse.json({

      success: false,

      error: "Detection rules retrieval failure",

      rules: []
    })
  }
}