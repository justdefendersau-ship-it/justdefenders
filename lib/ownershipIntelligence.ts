/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\ownershipIntelligence.ts

   Timestamp:
   2026-05-09 09:05

   Purpose:
   - Ownership intelligence
   - Predictive operational insights
===================================================== */

// =====================================================
// BUILD INSIGHTS
// =====================================================

export function buildOwnershipInsights({

  maintenance,

  fuel

}:any){

  const insights:any[] = []

  if(maintenance.length > 5){

    insights.push({

      type:"maintenance",

      message:
        "Vehicle has strong maintenance history."
    })
  }

  if(fuel.average > 13){

    insights.push({

      type:"fuel",

      message:
        "Fuel consumption elevated above touring baseline."
    })
  }

  return insights
}
