// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\services\supabase\serverClient.ts
// Timestamp: 14 May 2026 23:40 Sydney
// ====================================================================

import {
  createClient,
  SupabaseClient
} from "@supabase/supabase-js"

import {
  runtimeConfig
} from "../../config/runtimeConfig"

let cachedClient:
SupabaseClient | null =
null

export function getServerSupabaseClient():
SupabaseClient | null {

  if (
    runtimeConfig.buildSafeMode
  ) {

    console.warn(
      "Build safe mode enabled"
    )

    return null
  }

  if (
    !runtimeConfig.supabaseUrl ||
    !runtimeConfig.supabaseAnonKey
  ) {

    console.warn(
      "Supabase configuration missing"
    )

    return null
  }

  if (cachedClient) {

    return cachedClient
  }

  cachedClient =
    createClient(
      runtimeConfig.supabaseUrl,
      runtimeConfig.supabaseAnonKey
    )

  return cachedClient
}