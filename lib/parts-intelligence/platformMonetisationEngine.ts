/* =====================================================
   JustDefenders ©
   File:
   /lib/parts-intelligence/platformMonetisationEngine.ts

   Timestamp:
   12 May 2026 00:15 (Sydney)

   PURPOSE:
   Revenue intelligence and monetisation engine
===================================================== */

import {

  PlatformMonetisationContract

}
from "../contracts/platformMonetisation"

// =====================================================
// MONETISATION DATA
// =====================================================

const monetisation:
  PlatformMonetisationContract[] = [

  {

    monetisationId:
      "MON-001",

    revenueStreamType:
      "affiliate",

    operationalRegion:
      "Australia",

    monthlyRevenue:12840,

    monthlyTransactions:214,

    conversionRate:8.4,

    operationalHealth:
      "healthy",

    topPartners:[

      "MR Automotive",
      "British Off Road",
      "LR Direct"
    ],

    growthPercentage:12.6,

    operationalInsights:[

      "Expedition procurement conversions rising",

      "Cape York preparation workflows performing strongly"
    ],

    recommendedActions:[

      "Expand supplier integrations",

      "Increase route-aware recommendations"
    ],

    calculatedAt:
      new Date().toISOString()
  },

  {

    monetisationId:
      "MON-002",

    revenueStreamType:
      "enterprise",

    operationalRegion:
      "Australia",

    monthlyRevenue:22400,

    monthlyTransactions:12,

    conversionRate:18.2,

    operationalHealth:
      "healthy",

    topPartners:[

      "Northern Expedition Operations"
    ],

    growthPercentage:21.4,

    operationalInsights:[

      "Enterprise fleet adoption increasing"
    ],

    recommendedActions:[

      "Expand enterprise command tooling"
    ],

    calculatedAt:
      new Date().toISOString()
  },

  {

    monetisationId:
      "MON-003",

    revenueStreamType:
      "subscription",

    operationalRegion:
      "Global",

    monthlyRevenue:6840,

    monthlyTransactions:164,

    conversionRate:5.8,

    operationalHealth:
      "warning",

    topPartners:[

      "Global Expedition Users"
    ],

    growthPercentage:4.2,

    operationalInsights:[

      "Subscription churn slightly elevated"
    ],

    recommendedActions:[

      "Improve onboarding workflows"
    ],

    calculatedAt:
      new Date().toISOString()
  }

]

// =====================================================
// GET ALL
// =====================================================

export function getPlatformMonetisation(){

  return monetisation
}

// =====================================================
// HEALTHY
// =====================================================

export function getHealthyRevenueStreams(){

  return monetisation.filter(

    item =>

      item.operationalHealth
      ===
      "healthy"
  )
}

// =====================================================
// TOTAL REVENUE
// =====================================================

export function getTotalMonthlyRevenue(){

  return monetisation.reduce(

    (
      sum,
      item
    )=>

      sum +
      (item.monthlyRevenue || 0),

    0
  )
}

// =====================================================
// AVERAGE CONVERSION
// =====================================================

export function getAverageConversionRate(){

  const total =
    monetisation.reduce(

      (
        sum,
        item
      )=>

        sum +
        (item.conversionRate || 0),

      0
    )

  return Number(

    (
      total / monetisation.length
    ).toFixed(1)
  )
}
