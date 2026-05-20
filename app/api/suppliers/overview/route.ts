// ====================================================================
// JustDefenders ©
// File: /frontend/app/api/suppliers/overview/route.ts
// Timestamp: 16 May 2026 17:40 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  dashboardSupabase
} from "@/lib/dashboard/dashboardSupabaseClient"

export async function GET() {

  try {

    if (!dashboardSupabase) {

      return NextResponse.json(
        {
          error:
            "Supabase unavailable"
        },
        {
          status: 503
        }
      )
    }

    // ============================================================
    // SUPPLIER COUNTS
    // ============================================================

    const {
      count: supplierCount
    } = await dashboardSupabase
      .from("suppliers")
      .select("*", {
        count: "exact",
        head: true
      })

    const {
      count: pricingCount
    } = await dashboardSupabase
      .from("parts_pricing")
      .select("*", {
        count: "exact",
        head: true
      })

    // ============================================================
    // SUPPLIER LOCATIONS
    // ============================================================

    const {
      data: supplierLocations
    } = await dashboardSupabase
      .from("supplier_locations")
      .select("*")
      .limit(50)

    // ============================================================
    // FAILURE STATS
    // ============================================================

    const {
      data: supplierFailures
    } = await dashboardSupabase
      .from("supplier_failure_stats")
      .select("*")
      .limit(20)

    // ============================================================
    // AU SUPPLIER PRIORITY
    // ============================================================

    const australianSuppliers =
      supplierLocations?.filter(
        (
          supplier: any
        ) =>
          supplier.country === "Australia"
      ) || []

    // ============================================================
    // PRICING STABILITY
    // ============================================================

    let pricingStability =
      "STABLE"

    if (
      pricingCount &&
      pricingCount > 10000
    ) {

      pricingStability =
        "HIGH DENSITY"
    }

    // ============================================================
    // RELIABILITY SCORE
    // ============================================================

    let supplierReliability =
      92

    if (
      supplierFailures &&
      supplierFailures.length > 10
    ) {

      supplierReliability =
        84
    }

    return NextResponse.json({

      supplierCount:
        supplierCount || 0,

      pricingDensity:
        pricingCount || 0,

      australianSuppliers:
        australianSuppliers.length,

      pricingStability,

      supplierReliability,

      expeditionCriticalSuppliers:
        supplierFailures?.length || 0
    })

  } catch (error: any) {

    console.error(
      "Supplier overview failure",
      error
    )

    return NextResponse.json(
      {
        error:
          "Supplier intelligence unavailable"
      },
      {
        status: 500
      }
    )
  }
}
