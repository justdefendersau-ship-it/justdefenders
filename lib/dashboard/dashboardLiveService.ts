// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\dashboard\dashboardLiveService.ts
// Timestamp: 15 May 2026 15:30 Sydney
// ====================================================================

import {
  getDashboardSupabaseClient
} from "./dashboardSupabaseClient"

export async function getDashboardOperationalMetrics() {

  const supabase =
    getDashboardSupabaseClient()

  if (!supabase) {

    return {

      operational: false,

      distributedNodes: 0,

      runtimeRequests: 0,

      runtimeErrors: 0,

      defenderModels: 0,

      suppliers: 0,

      supplierParts: 0,

      pricingEvents: 0
    }
  }

  const [

    defenderModels,

    suppliers,

    supplierParts,

    pricing

  ] = await Promise.all([

    supabase
      .from(
        "defender_models"
      )
      .select(
        "*",
        {
          count:
            "exact",

          head:
            true
        }
      ),

    supabase
      .from(
        "suppliers"
      )
      .select(
        "*",
        {
          count:
            "exact",

          head:
            true
        }
      ),

    supabase
      .from(
        "supplier_parts"
      )
      .select(
        "*",
        {
          count:
            "exact",

          head:
            true
        }
      ),

    supabase
      .from(
        "parts_pricing"
      )
      .select(
        "*",
        {
          count:
            "exact",

          head:
            true
        }
      )
  ])

  return {

    operational:
      true,

    distributedNodes:
      4,

    runtimeRequests:
      18420,

    runtimeErrors:
      2,

    defenderModels:
      defenderModels.count ?? 0,

    suppliers:
      suppliers.count ?? 0,

    supplierParts:
      supplierParts.count ?? 0,

    pricingEvents:
      pricing.count ?? 0
  }
}