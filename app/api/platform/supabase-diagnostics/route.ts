/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\api\platform\supabase-diagnostics\route.ts
 *
 * Timestamp:
 * 26 June 2026 08:18 Sydney
 *
 * PURPOSE:
 * Platform Supabase diagnostics endpoint.
 *
 * Wave 5B.3
 * Data Access Validation
 *
 * This endpoint validates:
 *  - Environment configuration
 *  - Server-side Supabase connectivity
 *  - Reference data accessibility
 *
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

    const result =
      await supabase

        .from("vehicle_configurations")

        .select("id", { count: "exact", head: true })

    return NextResponse.json({

      success: true,

      timestamp:
        new Date().toISOString(),

      environment: {

        supabaseUrlConfigured:
          !!process.env.NEXT_PUBLIC_SUPABASE_URL,

        anonKeyConfigured:
          !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

        serviceRoleConfigured:
          !!process.env.SUPABASE_SERVICE_ROLE_KEY

      },

      diagnostics: {

        table:
          "vehicle_configurations",

        accessible:
          result.error === null,

        rowCount:
          result.count,

        status:
          result.status,

        statusText:
          result.statusText,

        error:
          result.error

      }

    })

  }

  catch (err: any) {

    return NextResponse.json({

      success: false,

      error:
        err.message

    }, {

      status: 500

    })

  }

}