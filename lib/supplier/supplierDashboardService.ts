// ====================================================================
// JustDefenders Â©
// File: C:\dev\justdefenders\frontend\lib\supplier\supplierDashboardService.ts
// Timestamp: 15 May 2026 22:05 Sydney
// ====================================================================

import {
  getDashboardSupabaseClient
} from "../dashboard/dashboardSupabaseClient"

export async function getSupplierOperationalDashboard() {

  const supabase =
    getDashboardSupabaseClient()

  if (!supabase) {

    return {

      suppliers: []
    }
  }

  const supplierData =
    await supabase

      .from(
        "suppliers"
      )

      .select(`
        id,
        name,
        country
      `)

      .limit(12)

  const suppliers =

    (supplierData.data ?? [])
      .map(supplier => ({

        id:
          (supplier as any).id,

        supplierName:
          (supplier as any).name
            ?? "Operational Supplier",

        region:
          (supplier as any).country
            ?? "AU",

        operationalStatus:
          "healthy",

        reliabilityScore:
          92,

        expeditionSupport:
          true,

        activeParts:
          Math.floor(
            Math.random() * 400
          ) + 50,

        averageResponseTime:
          "2.4 hrs"
      }))

  return {

    suppliers
  }
}