/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\supabase\server.ts
 *
 * Timestamp:
 * 24 June 2026 19:45 Sydney
 *
 * PURPOSE:
 * Centralised server-side Supabase clients.
 *
 * Wave 5B.3
 * Platform Validation
 *
 * CLIENTS
 * ------------------------------------------------------------
 * getSupabaseServerClient()
 *   Standard application client (Anon / RLS)
 *
 * getSupabaseAdminClient()
 *   Administrative client (Service Role)
 *
 * NOTES
 * ------------------------------------------------------------
 * Browser code MUST continue using:
 *
 *   lib/supabase/client.ts
 *
 * API routes MUST NOT instantiate createClient()
 * directly.
 * ============================================================
 */

import {
  createClient
} from "@supabase/supabase-js"

// ============================================================
// STANDARD SERVER CLIENT
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

// ============================================================
// ADMIN CLIENT
// ============================================================

export function getSupabaseAdminClient() {

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl) {

    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not configured."
    )

  }

  if (!serviceRoleKey) {

    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not configured."
    )

  }

  return createClient(

    supabaseUrl,

    serviceRoleKey,

    {

      auth: {

        autoRefreshToken: false,

        persistSession: false

      }

    }

  )

}