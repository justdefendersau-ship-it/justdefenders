/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\api\vehicles\route.ts
 *
 * Timestamp:
 * 24 June 2026 19:20 Sydney
 *
 * PURPOSE:
 * Vehicle Configuration API
 *
 * Wave 5B.2
 * Platform Validation
 *
 * CHANGE SUMMARY:
 * - Migrated to the centralised server-side Supabase client.
 * - Removed direct createClient() construction.
 * - Established the standard API access pattern.
 * ============================================================
 */

import { NextResponse } from "next/server"

import {
  getSupabaseServerClient
} from "@/lib/supabase/server"

export async function GET() {

  try {

    const supabase =
      getSupabaseServerClient()

    const { data, error } =
      await supabase

        .from(
          "vehicle_configurations"
        )

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

    return NextResponse.json(

      {

        success: true,

        data:
          data ?? []

      }

    )

  }

  catch (err: any) {

    return NextResponse.json(

      {

        success: false,

        error:
          err?.message ??
          "Unexpected server error."

      },

      {

        status: 500

      }

    )

  }

}