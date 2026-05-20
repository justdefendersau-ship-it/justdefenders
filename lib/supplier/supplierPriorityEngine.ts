// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\supplier\supplierPriorityEngine.ts
// Timestamp: 15 May 2026 15:50 Sydney
// ====================================================================

import {
  getDashboardSupabaseClient
} from "../dashboard/dashboardSupabaseClient"

export async function getAustralianSuppliers() {

  const supabase =
    getDashboardSupabaseClient()

  if (!supabase) {

    return []
  }

  const response =
    await supabase

      .from(
        "suppliers"
      )

      .select(`
        id,
        name,
        country,
        rating
      `)

      .or(
        "country.eq.Australia,country.eq.AU"
      )

      .order(
        "rating",
        {
          ascending:
            false
        }
      )

      .limit(25)

  if (response.error) {

    throw response.error
  }

  return response.data ?? []
}