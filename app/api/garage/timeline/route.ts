// ====================================================================
// JustDefenders ©
// File: /frontend/app/api/garage/timeline/route.ts
// Timestamp: 16 May 2026 17:05 Sydney
// ====================================================================

import {
  NextResponse
} from "next/server"

import {
  dashboardSupabase
} from "@/lib/dashboard/dashboardSupabaseClient"

export async function GET() {

  try {

    if (!dashboardSupabase) {

      return NextResponse.json(
        {
          error:
            "Supabase unavailable"
        },
        {
          status: 503
        }
      )
    }

    // ============================================================
    // HEALTH HISTORY
    // ============================================================

    const {
      data: healthHistory
    } = await dashboardSupabase
      .from("vehicle_health_history")
      .select("*")
      .order(
        "recorded_at",
        {
          ascending: false
        }
      )
      .limit(20)

    // ============================================================
    // FAULT HISTORY
    // ============================================================

    const {
      data: faultHistory
    } = await dashboardSupabase
      .from("vin_history")
      .select("*")
      .order(
        "created_at",
        {
          ascending: false
        }
      )
      .limit(20)

    // ============================================================
    // FAILURE PREDICTIONS
    // ============================================================

    const {
      data: predictiveFailures
    } = await dashboardSupabase
      .from("vin_failure_predictions")
      .select("*")
      .order(
        "probability",
        {
          ascending: false
        }
      )
      .limit(10)

    // ============================================================
    // TIMELINE EVENTS
    // ============================================================

    const timeline = [

      ...(healthHistory || []).map(
        (
          item: any
        ) => ({

          type:
            "HEALTH",

          timestamp:
            item.recorded_at,

          title:
            "Vehicle health score updated",

          detail:
            `Health score: ${item.health_score}`,

          severity:
            item.health_score >= 80
              ? "GOOD"
              : item.health_score >= 60
                ? "WARNING"
                : "CRITICAL"
        })
      ),

      ...(faultHistory || []).map(
        (
          item: any
        ) => ({

          type:
            "FAULT",

          timestamp:
            item.created_at,

          title:
            "Fault history event",

          detail:
            item.fault,

          severity:
            "WARNING"
        })
      ),

      ...(predictiveFailures || []).map(
        (
          item: any
        ) => ({

          type:
            "PREDICTIVE",

          timestamp:
            item.created_at,

          title:
            "Predicted component failure",

          detail:
            `${item.predicted_part} (${Math.round(Number(item.probability) * 100)}%)`,

          severity:
            Number(item.probability) > 0.7
              ? "CRITICAL"
              : "WARNING"
        })
      )
    ]

    // ============================================================
    // SORT CHRONOLOGY
    // ============================================================

    timeline.sort(
      (
        a,
        b
      ) =>
        new Date(
          b.timestamp
        ).getTime() -
        new Date(
          a.timestamp
        ).getTime()
    )

    return NextResponse.json({

      timeline:
        timeline.slice(0, 40)
    })

  } catch (error: any) {

    console.error(
      "Timeline API failure",
      error
    )

    return NextResponse.json(
      {
        error:
          "Timeline unavailable"
      },
      {
        status: 500
      }
    )
  }
}
