/* =====================================================
   JustDefenders ©
   File:
   /lib/parts-intelligence/operationalAnalyticsEngine.ts

   Timestamp:
   11 May 2026 21:15 (Sydney)

   PURPOSE:
   Expedition operational analytics engine
===================================================== */

import {

  OperationalAnalyticsContract

}
from "../contracts/operationalAnalytics"

// =====================================================
// ANALYTICS DATA
// =====================================================

const analytics:
  OperationalAnalyticsContract[] = [

  {

    analyticsId:
      "ANALYTICS-001",

    analyticsType:
      "procurement",

    metricName:
      "Critical Parts Availability",

    metricValue:92,

    metricUnit:"%",

    operationalStatus:
      "healthy",

    reportingPeriod:
      "30d",

    supportingFactors:[

      "Strong supplier inventory",
      "Stable expedition demand"
    ],

    recommendedActions:[

      "Maintain current supplier allocations"
    ],

    lastCalculated:
      new Date().toISOString()
  },

  {

    analyticsId:
      "ANALYTICS-002",

    analyticsType:
      "fleet",

    metricName:
      "Fleet Expedition Readiness",

    metricValue:84,

    metricUnit:"%",

    operationalStatus:
      "warning",

    reportingPeriod:
      "30d",

    supportingFactors:[

      "Cooling inspections pending",
      "Inventory variability detected"
    ],

    recommendedActions:[

      "Prioritise fleet maintenance workflows"
    ],

    lastCalculated:
      new Date().toISOString()
  },

  {

    analyticsId:
      "ANALYTICS-003",

    analyticsType:
      "workshop",

    metricName:
      "Workshop Queue Load",

    metricValue:73,

    metricUnit:"%",

    operationalStatus:
      "healthy",

    reportingPeriod:
      "7d",

    supportingFactors:[

      "Balanced technician allocation"
    ],

    recommendedActions:[

      "Monitor pre-expedition booking surge"
    ],

    lastCalculated:
      new Date().toISOString()
  },

  {

    analyticsId:
      "ANALYTICS-004",

    analyticsType:
      "inventory",

    metricName:
      "Remote Touring Inventory Health",

    metricValue:67,

    metricUnit:"%",

    operationalStatus:
      "warning",

    reportingPeriod:
      "14d",

    supportingFactors:[

      "Wheel bearing stock declining"
    ],

    recommendedActions:[

      "Trigger procurement automation"
    ],

    lastCalculated:
      new Date().toISOString()
  }

]

// =====================================================
// GET ALL
// =====================================================

export function getOperationalAnalytics(){

  return analytics
}

// =====================================================
// HEALTHY
// =====================================================

export function getHealthyAnalytics(){

  return analytics.filter(

    item =>

      item.operationalStatus
      ===
      "healthy"
  )
}

// =====================================================
// WARNINGS
// =====================================================

export function getWarningAnalytics(){

  return analytics.filter(

    item =>

      item.operationalStatus
      ===
      "warning"
  )
}

// =====================================================
// CRITICAL
// =====================================================

export function getCriticalAnalytics(){

  return analytics.filter(

    item =>

      item.operationalStatus
      ===
      "critical"
  )
}

// =====================================================
// PLATFORM HEALTH
// =====================================================

export function getOperationalHealthScore(){

  const total =
    analytics.reduce(

      (
        sum,
        item
      )=>

        sum +
        item.metricValue,

      0
    )

  return Number(

    (
      total / analytics.length
    ).toFixed(0)
  )
}
