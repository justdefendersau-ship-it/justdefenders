/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\api\search\live\route.ts
 *
 * Timestamp:
 * 24 May 2026 14:11 Sydney
 *
 * PURPOSE:
 * Tactical Live Search API
 *
 * TEMPORARY STABILIZATION PATCH
 *
 * ============================================================
 */

import {

  NextResponse

} from "next/server"

// ============================================================
// GET
// ============================================================

export async function GET(){

  return NextResponse.json({

    success: true,

    mode: "stabilized",

    suppliers: [

      {

        supplierId: "repco",

        supplierName: "Repco",

        health: "HEALTHY",

        latencyMs: 241
      },

      {

        supplierId: "burson",

        supplierName: "Burson Auto Parts",

        health: "HEALTHY",

        latencyMs: 318
      },

      {

        supplierId: "lrdirect",

        supplierName: "LR Direct",

        health: "DEGRADED",

        latencyMs: 611
      }
    ],

    timestamp:
      new Date().toISOString()
  })
}