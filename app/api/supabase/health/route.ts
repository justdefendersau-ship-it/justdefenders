// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\supabase\health\route.ts
// Timestamp: 14 May 2026 23:30 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  getServerSupabaseClient
} from "../../../../lib/services/supabase/serverClient"

export async function GET() {

  const client =
    getServerSupabaseClient()

  return NextResponse.json({

    success: true,

    supabase: {

      configured:
        Boolean(client),

      operational:
        Boolean(client)
    },

    timestamp:
      new Date()
        .toISOString()
  })
}