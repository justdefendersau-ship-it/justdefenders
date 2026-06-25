/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\api\vehicles\route.ts
 *
 * Timestamp:
 * 26 June 2026 08:18 Sydney
 *
 * PURPOSE:
 * Vehicle Configuration API
 *
 * Wave 5B.4
 * Vehicle API Validation
 *
 * CHANGE SUMMARY
 * ------------------------------------------------------------
 * Temporary engineering validation.
 *
 * Instead of returning every column from every record,
 * this endpoint returns the first five records using
 * only known business fields.
 *
 * This validates:
 *
 *  • Server-side Supabase connectivity
 *  • Query execution
 *  • JSON serialisation
 *  • Reference data accessibility
 *
 * This is a temporary validation build and will be
 * replaced during Wave 5C.
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

    const {
      data,
      error
    } =
      await supabase

        .from(
          "vehicle_configurations"
        )

        .select(
          "id, model, engine, year"
        )

        .order(
          "year",
          {
            ascending: true
          }
        )

        .limit(5)

    if (error) {

      console.error(
        "Vehicle API Error:",
        error
      )

      return NextResponse.json(

        {

          success: false,

          error:
            error.message

        },

        {

          status: 500

        }

      )

    }

    return NextResponse.json(

      {

        success: true,

        diagnostics: {

          returnedRows:
            data?.length ?? 0,

          query:
            "vehicle_configurations",

          validation:
            "Wave 5B.4"

        },

        data:
          data ?? []

      }

    )

  }

  catch (err: any) {

    console.error(
      "Vehicle API Exception:",
      err
    )

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