/* =====================================================
   JustDefenders ©
   File:
   /lib/services/supabaseFederation.ts

   Timestamp:
   11 May 2026 15:15 (Sydney)

   PURPOSE:
   Enterprise backend federation
===================================================== */

import {
  createClient
}
from "@supabase/supabase-js"

const supabaseUrl =
process.env.NEXT_PUBLIC_SUPABASE_URL || ""

const supabaseAnonKey =
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase =
createClient(
  supabaseUrl,
  supabaseAnonKey
)
