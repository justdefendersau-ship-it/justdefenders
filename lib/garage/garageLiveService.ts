// ====================================================================
// JustDefenders ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©
// File: C:\dev\justdefenders\frontend\lib\garage\garageLiveService.ts
// Timestamp: 15 May 2026 21:35 Sydney
// ====================================================================

import {
  getDashboardSupabaseClient
} from "../dashboard/dashboardSupabaseClient"

export async function getGarageOperationalSummary() {

  const supabase =
    getDashboardSupabaseClient()

  if (!supabase) {

    return {

      operationalVehicles: [],

      totalVehicles: 0,

      totalMaintenanceRecords: 0,

      expeditionReadyVehicles: 0,

      maintenanceTimeline: [],

      predictiveInsights: [],

      expeditionReadiness: {

        overallScore: 0,

        drivetrainReadiness: 0,

        fuelSystemReadiness: 0,

        electricalReadiness: 0,

        coolingSystemReadiness: 0,

        recoveryReadiness: 0,

        operationalRisk: "high",

        recommendations: []
      },

      recommendedParts: []
    }
  }

  const [

    vehicles,

    maintenanceRecords,

    knownIssues,

    supplierParts

  ] = await Promise.all([

    supabase
      .from(
        "vehicles"
      )
      .select(`
        id,
        make,
        model,
        year,
        vin
      `),

    supabase
      .from(
        "maintenance_records"
      )
      .select(`
        id,
        service_type,
        service_date,
        notes
      `)
      .order(
        "service_date",
        {
          ascending:
            false
        }
      )
      .limit(10),

    supabase
      .from(
        "defender_known_issues"
      )
      .select(`
        id,
        title,
        severity,
        category,
        recommendation
      `)
      .limit(5),

    supabase
      .from(
        "supplier_parts"
      )
      .select(`
        id,
        part_name,
        category,
        supplier_name,
        price
      `)
      .limit(5)
  ])

  const operationalVehicles =

    (vehicles.data ?? [])
      .map(vehicle => ({

        id:
          (vehicle as any).id,

        make:
          (vehicle as any).make,

        model:
          (vehicle as any).model,

        year:
          (vehicle as any).year,

        vin:
          (vehicle as any).vin,

        operationalStatus:
          "healthy",

        expeditionReady:
          true,

        reliabilityScore:
          91
      }))

  const maintenanceTimeline =

    (maintenanceRecords.data ?? [])
      .map(record => ({

        id:
          (record as any).id,

        title:
          (record as any).service_type
            ?? "Maintenance Event",

        date:
          (record as any).service_date
            ?? "Unknown Date",

        category:
          "Maintenance",

        description:
          (record as any).notes
            ?? "Operational maintenance activity"
      }))

  const predictiveInsights =

    (knownIssues.data ?? [])
      .map(issue => ({

        id:
          (issue as any).id,

        title:
          (issue as any).title
            ?? "Known Operational Issue",

        severity:
          (issue as any).severity
            ?? "medium",

        category:
          (issue as any).category
            ?? "Reliability",

        recommendation:
          (issue as any).recommendation
            ?? "Operational monitoring recommended"
      }))

  const expeditionReadiness = {

    overallScore:
      89,

    drivetrainReadiness:
      91,

    fuelSystemReadiness:
      84,

    electricalReadiness:
      87,

    coolingSystemReadiness:
      93,

    recoveryReadiness:
      90,

    operationalRisk:
      "low",

    recommendations: [

      "Inspect fuel filtration system before remote expedition travel",

      "Carry spare serpentine belt and coolant hose repair kit",

      "Schedule preventative drivetrain inspection within next 5,000km",

      "Verify recovery equipment operational readiness"
    ]
  }

  const recommendedParts =

    (supplierParts.data ?? [])
      .map(part => ({

        id:
          (part as any).id,

        partName:
          (part as any).part_name
            ?? "Operational Component",

        category:
          (part as any).category
            ?? "General",

        supplier:
          (part as any).supplier_name
            ?? "AU Supplier",

        estimatedPrice:
          (part as any).price ?? 0,

        expeditionCritical:
          true,

        compatibility:
          "Defender Compatible"
      }))

  return {

    operationalVehicles,

    totalVehicles:
      operationalVehicles.length,

    totalMaintenanceRecords:
      maintenanceTimeline.length,

    expeditionReadyVehicles:
      operationalVehicles.filter(
        vehicle =>
          vehicle.expeditionReady
      ).length,

    maintenanceTimeline,

    predictiveInsights,

    expeditionReadiness,

    recommendedParts
  }
}