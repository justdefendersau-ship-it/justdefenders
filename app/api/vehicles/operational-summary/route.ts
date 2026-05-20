// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\api\vehicles\operational-summary\route.ts
// Timestamp: 15 May 2026 15:40 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  getDashboardSupabaseClient
} from "../../../../lib/dashboard/dashboardSupabaseClient"

export async function GET() {

  try {

    const supabase =
      getDashboardSupabaseClient()

    if (!supabase) {

      return NextResponse.json({

        success: false,

        error:
          "Supabase unavailable"
      })
    }

    const vehicles =
      await supabase

        .from(
          "vehicles"
        )

        .select(`
          id,
          make,
          model,
          year,
          vin
        `)

        .limit(10)

    return NextResponse.json({

      success: true,

      operationalVehicles:
        vehicles.data ?? [],

      total:
        vehicles.data?.length ?? 0,

      timestamp:
        new Date()
          .toISOString()
    })

  } catch (error) {

    return NextResponse.json(

      {

        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unknown vehicle error"
      },

      {
        status: 500
      }
    )
  }
}