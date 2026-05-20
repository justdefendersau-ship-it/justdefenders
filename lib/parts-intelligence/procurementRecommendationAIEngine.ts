/* =====================================================
   JustDefenders ©
   File:
   /lib/parts-intelligence/procurementRecommendationAIEngine.ts

   Timestamp:
   11 May 2026 22:00 (Sydney)

   PURPOSE:
   Expedition procurement recommendation AI engine
===================================================== */

import {

  ProcurementRecommendationAIContract

}
from "../contracts/procurementRecommendationAI"

// =====================================================
// RECOMMENDATIONS
// =====================================================

const recommendations:
  ProcurementRecommendationAIContract[] = [

  {

    recommendationId:
      "REC-001",

    vehicleModel:
      "Defender Td5",

    expeditionRoute:
      "Cape York",

    recommendedParts:[

      "PCH119890",
      "ERR3340",
      "RTC3429"
    ],

    recommendedSupplier:
      "MR Automotive",

    recommendationReasoning:[

      "Cooling systems highly stressed on OTT crossings",

      "Expedition-grade supplier confidence high",

      "Wheel bearing exposure elevated during water crossings"
    ],

    operationalPriority:
      "critical",

    procurementConfidence:0.96,

    readinessImpact:0.94,

    estimatedBudget:1240,

    recommendationStatus:
      "recommended",

    generatedAt:
      new Date().toISOString()
  },

  {

    recommendationId:
      "REC-002",

    vehicleModel:
      "Defender Puma 2.2",

    expeditionRoute:
      "Simpson Desert",

    recommendedParts:[

      "RTC3429",
      "ERR3340"
    ],

    recommendedSupplier:
      "British Off Road",

    recommendationReasoning:[

      "Bearing loads elevated during desert dune operations",

      "Inventory availability currently stable",

      "Remote expedition reliability prioritised"
    ],

    operationalPriority:
      "recommended",

    procurementConfidence:0.89,

    readinessImpact:0.87,

    estimatedBudget:860,

    recommendationStatus:
      "recommended",

    generatedAt:
      new Date().toISOString()
  }

]

// =====================================================
// GET ALL
// =====================================================

export function getProcurementRecommendations(){

  return recommendations
}

// =====================================================
// CRITICAL
// =====================================================

export function getCriticalRecommendations(){

  return recommendations.filter(

    item =>

      item.operationalPriority
      ===
      "critical"
  )
}

// =====================================================
// BY ROUTE
// =====================================================

export function getRecommendationsByRoute(

  route:string

){

  return recommendations.filter(

    item =>

      item.expeditionRoute
      ===
      route
  )
}

// =====================================================
// CONFIDENCE
// =====================================================

export function getAverageRecommendationConfidence(){

  const total =
    recommendations.reduce(

      (
        sum,
        item
      )=>

        sum +
        (item.procurementConfidence || 0),

      0
    )

  return Number(

    (
      total / recommendations.length
    ).toFixed(2)
  )
}
