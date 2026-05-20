// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\services\supabase\browserClient.ts
// Timestamp: 14 May 2026 21:25 Sydney
// PHASE 2A — FOUNDATION HARDENING
// STEP 3 — BROWSER SUPABASE SERVICE WRAPPER
// ====================================================================

"use client"

import {
  createClient,
  SupabaseClient
} from "@supabase/supabase-js"

import {
  runtimeConfig
} from "../../config/runtimeConfig"

let browserClient:
SupabaseClient | null =
null

export function getBrowserSupabaseClient():
SupabaseClient | null {

  if (
    !runtimeConfig.supabaseUrl ||
    !runtimeConfig.supabaseAnonKey
  ) {

    console.warn(
      "Browser Supabase configuration missing"
    )

    return null
  }

  if (browserClient) {

    return browserClient
  }

  browserClient =
    createClient(
      runtimeConfig.supabaseUrl,
      runtimeConfig.supabaseAnonKey
    )

  return browserClient
}
