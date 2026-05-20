// ====================================================================
// JustDefenders ©
// File: /frontend/lib/dashboard/dashboardSupabaseClient.ts
// Timestamp: 16 May 2026 16:45 Sydney
// ====================================================================

import {
  createClient
} from "@supabase/supabase-js"

let dashboardSupabaseInstance:
  ReturnType<
    typeof createClient
  > | null = null

export function
getDashboardSupabaseClient() {

  if (
    dashboardSupabaseInstance
  ) {

    return dashboardSupabaseInstance
  }

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL

  const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY

  if (
    !supabaseUrl ||
    !supabaseServiceKey
  ) {

    console.error(
      "Missing Supabase environment variables"
    )

    return null
  }

  dashboardSupabaseInstance =
    createClient(
      supabaseUrl,
      supabaseServiceKey,
      {

        auth: {

          persistSession: false
        }
      }
    )

  return dashboardSupabaseInstance
}

export const dashboardSupabase =
  getDashboardSupabaseClient()

export default
dashboardSupabase