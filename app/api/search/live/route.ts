/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\api\search\live\route.ts
 *
 * Timestamp:
 * 21 May 2026 16:42 Sydney
 *
 * PURPOSE:
 * Unified Procurement Federation API
 *
 * STRATEGY:
 * PASS 25B — Federation Timeout + Performance Protection
 *
 * ============================================================
 */

import {
  NextRequest,
  NextResponse
} from "next/server"

import {
  searchRepco
} from "@/lib/harvesters/repco"

import {
  searchBurson
} from "@/lib/harvesters/burson"

import {
  searchSupercheap
} from "@/lib/harvesters/supercheap"

import {
  withRetry
} from "@/lib/harvesters/withRetry"

import {
  withTimeout
} from "@/lib/harvesters/withTimeout"

import {
  markSupplierHealthy,
  markSupplierFailure,
  getSupplierHealth
} from "@/lib/harvesters/health"

import {
  trackSupplierPerformance,
  getSupplierPerformance
} from "@/lib/harvesters/performance"

// ============================================================
// GET
// ============================================================

export async function GET(

  request: NextRequest

){

  const federationStart =
    Date.now()

  try {

    const query =

      request.nextUrl
        .searchParams
        .get("q")

      || ""

    // ========================================================
    // SUPPLIER EXECUTION
    // ========================================================

    const federationResults =
      await Promise.allSettled([

        // ====================================================
        // REPCO
        // ====================================================

        withRetry(async () => {

          const start =
            Date.now()

          const data =
            await withTimeout(

              () => searchRepco(query),

              2500,

              "Repco"
            )

          trackSupplierPerformance(

            "Repco",

            Date.now() - start
          )

          markSupplierHealthy(
            "Repco"
          )

          return data
        }),

        // ====================================================
        // BURSON
        // ====================================================

        withRetry(async () => {

          const start =
            Date.now()

          const data =
            await withTimeout(

              () => searchBurson(query),

              2500,

              "Burson"
            )

          trackSupplierPerformance(

            "Burson",

            Date.now() - start
          )

          markSupplierHealthy(
            "Burson"
          )

          return data
        }),

        // ====================================================
        // SUPERCHEAP
        // ====================================================

        withRetry(async () => {

          const start =
            Date.now()

          const data =
            await withTimeout(

              () => searchSupercheap(query),

              2500,

              "Supercheap"
            )

          trackSupplierPerformance(

            "Supercheap",

            Date.now() - start
          )

          markSupplierHealthy(
            "Supercheap"
          )

          return data
        })
      ])

    // ========================================================
    // MERGE RESULTS
    // ========================================================

    const products = []

    for (

      const result
      of federationResults

    ){

      if (
        result.status === "fulfilled"
      ) {

        products.push(
          ...result.value
        )

      } else {

        console.error(

          "FEDERATION SUPPLIER FAILURE",

          result.reason
        )
      }
    }

    // ========================================================
    // HEALTH FAILURES
    // ========================================================

    if (
      federationResults[0].status === "rejected"
    ) {

      markSupplierFailure(
        "Repco"
      )
    }

    if (
      federationResults[1].status === "rejected"
    ) {

      markSupplierFailure(
        "Burson"
      )
    }

    if (
      federationResults[2].status === "rejected"
    ) {

      markSupplierFailure(
        "Supercheap"
      )
    }

    // ========================================================
    // SORT
    // ========================================================

    products.sort(

      (
        a,
        b
      ) =>

        b.procurementScore
        -
        a.procurementScore
    )

    // ========================================================
    // PERFORMANCE
    // ========================================================

    const federationDuration =
      Date.now()
      -
      federationStart

    console.log(

      "FEDERATION RESPONSE",

      {

        duration:
          federationDuration,

        supplierCount: 3,

        productCount:
          products.length
      }
    )

    // ========================================================
    // RESPONSE
    // ========================================================

    return NextResponse.json({

      success: true,

      federation: true,

      supplierCount: 3,

      federationDuration,

      productCount:
        products.length,

      supplierHealth:
        getSupplierHealth(),

      supplierPerformance:
        getSupplierPerformance(),

      products
    })

  } catch (

    err

  ) {

    console.error(

      "PROCUREMENT FEDERATION FAILURE",

      err
    )

    return NextResponse.json(

      {

        success: false,

        products: []
      },

      {
        status: 500
      }
    )
  }
}