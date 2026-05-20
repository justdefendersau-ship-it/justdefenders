/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\data\mockOperationalData.ts
 *
 * Timestamp:
 * 17 May 2026 08:50 Sydney
 *
 * PURPOSE:
 * Centralised Tactical Operational Mock Intelligence
 * ============================================================
 */

// ============================================================
// PROCUREMENT RESULTS
// ============================================================

export const mockParts = [

  {
    partNumber: "ERR3340",

    description:
      "Oil Filter",

    keyword:
      "filter",

    compatibility: [
      "300Tdi",
      "Td5"
    ],

    recommendationRibbon:
      "BEST OVERALL",

    operationalSummary: {

      bestPrice:
        "$9.90",

      fastestDelivery:
        "2 Days",

      touringGrade:
        "Yes",

      supplierCount:
        2
    }
  },

  {
    partNumber: "RTC3429",

    description:
      "Front Wheel Bearing Kit",

    keyword:
      "bearing",

    compatibility: [
      "300Tdi",
      "County"
    ],

    recommendationRibbon:
      "REMOTE AREA READY",

    operationalSummary: {

      bestPrice:
        "$129",

      fastestDelivery:
        "1 Day",

      touringGrade:
        "Yes",

      supplierCount:
        1
    }
  },

  {
    partNumber:
      "PCH119890",

    description:
      "Cooling Hose Kit",

    keyword:
      "cooling hose",

    compatibility: [
      "Td5",
      "Puma 2.2"
    ],

    recommendationRibbon:
      "CRITICAL SPARE",

    operationalSummary: {

      bestPrice:
        "$189",

      fastestDelivery:
        "Same Day",

      touringGrade:
        "Yes",

      supplierCount:
        3
    }
  }
]

// ============================================================
// TELEMETRY
// ============================================================

export const telemetryData = [

  { day: "Mon", value: 68 },

  { day: "Tue", value: 72 },

  { day: "Wed", value: 70 },

  { day: "Thu", value: 82 },

  { day: "Fri", value: 88 },

  { day: "Sat", value: 92 },

  { day: "Sun", value: 94 }
]

// ============================================================
// OPERATIONAL INSIGHTS
// ============================================================

export const operationalInsights = [

  {
    title:
      "AI Procurement Recommendation",

    description:
      "Defender Direct AU currently provides the highest expedition readiness score for Td5 cooling systems."
  },

  {
    title:
      "Operational Advisory",

    description:
      "Remote-area touring demand has increased lead times for wheel bearing kits by 18%."
  },

  {
    title:
      "Readiness Status",

    description:
      "Current expedition preparation score exceeds recommended touring threshold."
  },

  {
    title:
      "Logistics Update",

    description:
      "Queensland supplier routing currently delivering fastest east-coast expedition dispatch."
  }
]

// ============================================================
// PROCUREMENT MATRIX
// ============================================================

export const supplierMatrix = [

  {
    supplier:
      "Defender Direct AU",

    logistics:
      "Sydney",

    price:
      "$129",

    eta:
      "1 Day",

    fitment:
      "98%",

    readiness:
      "High",

    ai:
      "Recommended"
  },

  {
    supplier:
      "Outback Rover Parts",

    logistics:
      "Melbourne",

    price:
      "$138",

    eta:
      "3 Days",

    fitment:
      "94%",

    readiness:
      "Medium",

    ai:
      "Stable"
  },

  {
    supplier:
      "Remote Touring Supply",

    logistics:
      "Brisbane",

    price:
      "$141",

    eta:
      "2 Days",

    fitment:
      "96%",

    readiness:
      "High",

    ai:
      "Expedition Grade"
  }
]