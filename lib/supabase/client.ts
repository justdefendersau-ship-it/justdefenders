/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\supabase\client.ts
 *
 * Timestamp:
 * 21 May 2026 10:52 Sydney
 *
 * PURPOSE:
 * Supabase Browser Client
 *
 * STRATEGY:
 * PASS 17A — Authentication Foundation
 *
 * ============================================================
 */

import {
  createClient
} from "@supabase/supabase-js"

// ============================================================
// ENVIRONMENT
// ============================================================

const supabaseUrl =
  process.env
    .NEXT_PUBLIC_SUPABASE_URL!

const supabaseAnonKey =
  process.env
    .NEXT_PUBLIC_SUPABASE_ANON_KEY!

// ============================================================
// CLIENT
// ============================================================

export const supabase =
  createClient(

    supabaseUrl,

    supabaseAnonKey
  )