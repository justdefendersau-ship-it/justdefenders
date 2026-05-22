/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\api\observability\federation\route.ts
 *
 * Timestamp:
 * 21 May 2026 17:08 Sydney
 *
 * PURPOSE:
 * Federation Observability API
 *
 * STRATEGY:
 * PASS 26 — Production Observability Console
 *
 * ============================================================
 */

import {
  NextResponse
} from "next/server"

import {
  getSupplierHealth
} from "@/lib/harvesters/health"

import {
  getSupplierPerformance
} from "@/lib/harvesters/performance"

// ============================================================
// GET
// ============================================================

export async function GET(){

  try {

    return NextResponse.json({

      success: true,

      timestamp:
        new Date()
          .toISOString(),

      supplierHealth:
        getSupplierHealth(),

      supplierPerformance:
        getSupplierPerformance()
    })

  } catch (

    err

  ) {

    console.error(

      "OBSERVABILITY FAILURE",

      err
    )

    return NextResponse.json(

      {

        success: false
      },

      {
        status: 500
      }
    )
  }
}