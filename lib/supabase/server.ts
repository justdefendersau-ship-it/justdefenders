/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\supabase\server.ts
 *
 * Timestamp:
 * 24 June 2026 19:05 Sydney
 *
 * PURPOSE:
 * Centralised server-side Supabase client.
 *
 * Wave 5B.1
 * Platform Validation
 *
 * NOTES:
 * - Server-side database access only.
 * - Browser code continues using client.ts.
 * - Centralises runtime validation.
 * ============================================================
 */

import { createClient } from "@supabase/supabase-js"

// ============================================================
// SERVER CLIENT
// ============================================================

export function getSupabaseServerClient() {

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL

  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl) {

    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not configured."
    )

  }

  if (!supabaseAnonKey) {

    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured."
    )

  }

  return createClient(

    supabaseUrl,

    supabaseAnonKey

  )

}