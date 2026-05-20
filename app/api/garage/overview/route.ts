// ====================================================================
// JustDefenders ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©
// File: /frontend/app/api/garage/overview/route.ts
// Timestamp: 16 May 2026 16:35 Sydney
// ====================================================================



import {
  NextResponse
} from "next/server"



import {
  dashboardSupabase
} from "../../../../lib/dashboard/dashboardSupabaseClient"

function determineGeneration(
  year?: number
) {

  if (!year) {

    return {

      generation:
        "UNKNOWN",

      telemetry:
        "UNKNOWN",

      operationalProfile:
        "Unknown operational platform",

      expeditionBase:
        70
    }
  }

  if (year < 1998) {

    return {

      generation:
        "CLASSIC DEFENDER",

      telemetry:
        "MECHANICAL",

      operationalProfile:
        "Mechanical expedition platform",

      expeditionBase:
        95
    }
  }

  if (
    year >= 1998 &&
    year <= 2002
  ) {

    return {

      generation:
        "EARLY TD5",

      telemetry:
        "LIMITED ECU",

      operationalProfile:
        "Early electronic diesel platform",

      expeditionBase:
        86
    }
  }

  if (
    year >= 2003 &&
    year <= 2007
  ) {

    return {

      generation:
        "ADVANCED TD5",

      telemetry:
        "PARTIAL ECU",

      operationalProfile:
        "Advanced Td5 expedition platform",

      expeditionBase:
        89
    }
  }

  if (
    year >= 2007 &&
    year <= 2011
  ) {

    return {

      generation:
        "PUMA 2.4",

      telemetry:
        "FULL ECU",

      operationalProfile:
        "High telemetry operational platform",

      expeditionBase:
        82
    }
  }

  return {

    generation:
      "PUMA 2.2",

    telemetry:
      "FULL ECU",

    operationalProfile:
      "Full operational intelligence platform",

    expeditionBase:
      84
  }
}

export async function GET() {

  try {

    if (!dashboardSupabase) {

      return NextResponse.json(
        {
          error: "Supabase unavailable"
        },
        {
          status: 503
        }
      )
    }

    // ============================================================
    // ACTIVE VEHICLE
    // ============================================================

    const {
      data: activeVehicle
    } = await dashboardSupabase
      .from("vehicles")
      .select("*")
      .limit(1)
      .single()

    // ============================================================
    // GENERATION
    // ============================================================

    const generation =
      determineGeneration(
        (activeVehicle as any)?.year
      )

    // ============================================================
    // COUNTS
    // ============================================================

    const {
      count: maintenanceCount
    } = await dashboardSupabase
      .from("vehicle_health_history")
      .select("*", {
        count: "exact",
        head: true
      })

    const {
      count: telemetryCount
    } = await dashboardSupabase
      .from("telemetry")
      .select("*", {
        count: "exact",
        head: true
      })

    const {
      data: predictiveFailures
    } = await dashboardSupabase
      .from("vin_failure_predictions")
      .select("*")
      .limit(10)

    // ============================================================
    // READINESS ENGINE
    // ============================================================

    let expeditionReadiness =
      generation.expeditionBase

    if (
      maintenanceCount &&
      maintenanceCount > 500
    ) {

      expeditionReadiness += 3
    }

    if (
      predictiveFailures &&
      predictiveFailures.length > 5
    ) {

      expeditionReadiness -= 8
    }

    if (
      telemetryCount &&
      telemetryCount > 250
    ) {

      expeditionReadiness += 2
    }

    if (
      expeditionReadiness > 99
    ) {

      expeditionReadiness = 99
    }

    // ============================================================
    // RISK ENGINE
    // ============================================================

    let operationalRisk =
      "LOW"

    if (
      predictiveFailures &&
      predictiveFailures.length >= 3
    ) {

      operationalRisk =
        "MEDIUM"
    }

    if (
      predictiveFailures &&
      predictiveFailures.length >= 6
    ) {

      operationalRisk =
        "HIGH"
    }

    // ============================================================
    // RESPONSE
    // ============================================================

    return NextResponse.json({

      generation:
        generation.generation,

      telemetryCapability:
        generation.telemetry,

      operationalProfile:
        generation.operationalProfile,

      expeditionReadiness,

      operationalRisk,

      maintenanceHistory:
        maintenanceCount || 0,

      telemetryDensity:
        telemetryCount || 0,

      predictiveEvents:
        predictiveFailures?.length || 0
    })

  } catch (error: any) {

    console.error(
      "Expedition readiness failure",
      error
    )

    return NextResponse.json(
      {
        error:
          "Expedition intelligence unavailable"
      },
      {
        status: 500
      }
    )
  }
}