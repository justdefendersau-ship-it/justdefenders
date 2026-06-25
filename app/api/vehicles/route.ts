/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\api\vehicles\route.ts
 *
 * Timestamp:
 * 24 June 2026 18:35 Sydney
 *
 * PURPOSE:
 * Vehicle Configuration API
 *
 * Wave 5A Platform Recovery Complete
 *
 * NOTES:
 * - Runtime diagnostics removed.
 * - Production recovery baseline.
 * - Uses frontend Supabase runtime configuration.
 * ============================================================
 */

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {

  try {

    const supabase = createClient(

      process.env.NEXT_PUBLIC_SUPABASE_URL!,

      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    )

    const { data, error } = await supabase
      .from("vehicle_configurations")
      .select("*")

    if (error) {

      return NextResponse.json(

        {
          success: false,
          error: error.message
        },

        {
          status: 500
        }

      )

    }

    return NextResponse.json({

      success: true,

      data: data ?? []

    })

  }
  catch (err: any) {

    return NextResponse.json(

      {
        success: false,
        error: err?.message ?? "Unexpected server error."
      },

      {
        status: 500
      }

    )

  }

}