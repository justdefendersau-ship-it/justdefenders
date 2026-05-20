/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\predictiveMaintenanceEngine.ts

   Timestamp:
   2026-05-09 12:15

   Purpose:
   - Predictive maintenance clustering
   - Operational risk intelligence
===================================================== */

// =====================================================
// CLUSTER ANALYSIS
// =====================================================

export function buildMaintenanceClusters(

  history:any[]

){

  const clusters:any[] = []

  const descriptions =
    history.map(
      h => h.description?.toLowerCase() || ""
    )

  // ===================================================
  // COOLING SYSTEM
  // ===================================================

  const coolingCount =

    descriptions.filter(

      d =>

        d.includes("coolant") ||
        d.includes("radiator") ||
        d.includes("hose") ||
        d.includes("viscous") ||
        d.includes("expansion tank")

    ).length

  if(coolingCount >= 2){

    clusters.push({

      type:"cooling",

      severity:"warning",

      message:
        "Repeated cooling-system maintenance detected.",

      recommendation:
        "Review hoses, expansion tank, viscous fan and radiator before remote-area travel."
    })
  }

  // ===================================================
  // DRIVELINE
  // ===================================================

  const drivelineCount =

    descriptions.filter(

      d =>

        d.includes("driveline") ||
        d.includes("propshaft") ||
        d.includes("gearbox") ||
        d.includes("transfer") ||
        d.includes("diff")

    ).length

  if(drivelineCount >= 2){

    clusters.push({

      type:"driveline",

      severity:"warning",

      message:
        "Repeated driveline maintenance detected.",

      recommendation:
        "Inspect transfer case, spline wear and driveline backlash."
    })
  }

  // ===================================================
  // FUEL SYSTEM
  // ===================================================

  const fuelCount =

    descriptions.filter(

      d =>

        d.includes("fuel") ||
        d.includes("injector") ||
        d.includes("pressure regulator")

    ).length

  if(fuelCount >= 2){

    clusters.push({

      type:"fuel",

      severity:"info",

      message:
        "Fuel-system maintenance history detected.",

      recommendation:
        "Monitor fuel pressure regulator, injector loom and pump performance."
    })
  }

  return clusters
}
