// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\admin\revenue-trend\route.ts
// Timestamp: 15 May 2026 01:05 Sydney

import {
  NextResponse
} from "next/server"

export async function GET() {

  /**
   * Prevent build-time Supabase failures
   */
  const supabaseUrl =
    process.env
      .NEXT_PUBLIC_SUPABASE_URL

  const supabaseKey =
    process.env
      .NEXT_PUBLIC_SUPABASE_KEY

  /**
   * Environment validation
   */
  if (
    !supabaseUrl ||
    !supabaseKey
  ) {

    return NextResponse.json({

      success: true,

      warning:
        "Supabase environment variables not configured",

      revenueTrend: [

        {
          month: "Jan",
          revenue: 0
        },

        {
          month: "Feb",
          revenue: 0
        },

        {
          month: "Mar",
          revenue: 0
        }

      ]
    })
  }

  /**
   * Production placeholder
   */
  return NextResponse.json({

    success: true,

    revenueTrend: [

      {
        month: "Jan",
        revenue: 12500
      },

      {
        month: "Feb",
        revenue: 18400
      },

      {
        month: "Mar",
        revenue: 23600
      }

    ]
  })
}