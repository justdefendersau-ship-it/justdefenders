/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\intelligence\predictiveMaintenanceEngine.ts
 *
 * Timestamp:
 * 23 May 2026 14:26 Sydney
 *
 * PURPOSE:
 * Predictive Maintenance Failure Detection Engine
 *
 * STRATEGY:
 * PASS 34B — Predictive Maintenance Failure Detection
 *
 * OBJECTIVES:
 * - operational failure forecasting
 * - expedition vulnerability analysis
 * - Defender-specific failure intelligence
 * - tactical maintenance prediction
 * - procurement anomaly detection
 * - predictive operational awareness
 *
 * ============================================================
 */

import {

  DefenderVehicleProfile

} from "@/lib/vin/vinDecoder"

import {

  ProcurementMemoryRecord

} from "@/contexts/ServiceIntelligenceContext"

// ============================================================
// TYPES
// ============================================================

export interface PredictiveMaintenanceAlert {

  id: string

  severity:
    "LOW"
    |
    "MEDIUM"
    |
    "HIGH"
    |
    "CRITICAL"

  category:
    "ENGINE"
    |
    "COOLING"
    |
    "DRIVETRAIN"
    |
    "ELECTRICAL"
    |
    "TURBO"
    |
    "FUEL"
    |
    "EXPEDITION"

  title: string

  description: string

  recommendation: string

  confidence: number

  expeditionImpact: number
}

export interface PredictiveMaintenanceAssessment {

  alerts:
    PredictiveMaintenanceAlert[]

  maintenanceRiskScore: number

  expeditionRiskScore: number

  operationalConfidence: number
}

// ============================================================
// HELPERS
// ============================================================

function countMatches(

  history:
    ProcurementMemoryRecord[],

  keywords: string[]

){

  return history.filter(record =>

    keywords.some(keyword =>

      record.query
        .toLowerCase()
        .includes(
          keyword.toLowerCase()
        )
    )
  ).length
}

function clamp(

  value: number,

  min: number,

  max: number

){

  return Math.max(

    min,

    Math.min(
      value,
      max
    )
  )
}

// ============================================================
// TD5
// ============================================================

function analyzeTd5(

  history:
    ProcurementMemoryRecord[]

):

  PredictiveMaintenanceAlert[]{

  const alerts:
    PredictiveMaintenanceAlert[] = []

  // ==========================================================
  // INJECTOR HARNESS
  // ==========================================================

  const injectorActivity =
    countMatches(

      history,

      [

        "injector",
        "loom",
        "ecu",
        "oil migration"
      ]
    )

  if (

    injectorActivity >= 2

  ){

    alerts.push({

      id: "td5-injector-loom",

      severity: "HIGH",

      category: "ELECTRICAL",

      title:
        "Td5 Injector Harness Contamination Risk",

      description:
        "Repeated injector/ECU procurement activity indicates possible oil migration risk.",

      recommendation:
        "Inspect injector harness and ECU red plug for oil contamination.",

      confidence: 91,

      expeditionImpact: 84
    })
  }

  // ==========================================================
  // COOLING
  // ==========================================================

  const coolantActivity =
    countMatches(

      history,

      [

        "coolant",
        "hose",
        "radiator",
        "water pump"
      ]
    )

  if (

    coolantActivity >= 3

  ){

    alerts.push({

      id: "td5-cooling-risk",

      severity: "HIGH",

      category: "COOLING",

      title:
        "Td5 Cooling System Vulnerability",

      description:
        "Repeated cooling-related procurement activity detected.",

      recommendation:
        "Perform preventative cooling system overhaul before expedition deployment.",

      confidence: 88,

      expeditionImpact: 92
    })
  }

  return alerts
}

// ============================================================
// PUMA
// ============================================================

function analyzePuma(

  history:
    ProcurementMemoryRecord[]

):

  PredictiveMaintenanceAlert[]{

  const alerts:
    PredictiveMaintenanceAlert[] = []

  // ==========================================================
  // BOOST SYSTEM
  // ==========================================================

  const boostActivity =
    countMatches(

      history,

      [

        "intercooler",
        "boost",
        "turbo hose",
        "turbo"
      ]
    )

  if (

    boostActivity >= 2

  ){

    alerts.push({

      id: "puma-boost-system",

      severity: "HIGH",

      category: "TURBO",

      title:
        "Puma Boost System Degradation Risk",

      description:
        "Repeated turbo/intercooler procurement behavior detected.",

      recommendation:
        "Inspect intercooler hoses, clamps, and turbo plumbing before remote operation.",

      confidence: 89,

      expeditionImpact: 90
    })
  }

  // ==========================================================
  // CLUTCH HYDRAULICS
  // ==========================================================

  const clutchActivity =
    countMatches(

      history,

      [

        "clutch",
        "slave cylinder",
        "master cylinder"
      ]
    )

  if (

    clutchActivity >= 2

  ){

    alerts.push({

      id: "puma-clutch-hydraulics",

      severity: "MEDIUM",

      category: "DRIVETRAIN",

      title:
        "Puma Clutch Hydraulic Wear Pattern",

      description:
        "Repeated clutch hydraulic procurement activity detected.",

      recommendation:
        "Inspect clutch hydraulics and fluid system before long-range travel.",

      confidence: 82,

      expeditionImpact: 73
    })
  }

  return alerts
}

// ============================================================
// 300TDI
// ============================================================

function analyze300Tdi(

  history:
    ProcurementMemoryRecord[]

):

  PredictiveMaintenanceAlert[]{

  const alerts:
    PredictiveMaintenanceAlert[] = []

  // ==========================================================
  // COOLING
  // ==========================================================

  const coolingActivity =
    countMatches(

      history,

      [

        "coolant",
        "radiator",
        "water pump",
        "hose",
        "thermostat"
      ]
    )

  if (

    coolingActivity >= 2

  ){

    alerts.push({

      id: "300tdi-cooling-risk",

      severity: "HIGH",

      category: "COOLING",

      title:
        "300Tdi Cooling System Vulnerability",

      description:
        "Cooling system procurement behavior suggests emerging operational risk.",

      recommendation:
        "Inspect radiator, thermostat, hoses, and water pump before expedition deployment.",

      confidence: 94,

      expeditionImpact: 96
    })
  }

  // ==========================================================
  // TIMING BELT
  // ==========================================================

  const timingActivity =
    countMatches(

      history,

      [

        "timing belt",
        "idler",
        "tensioner"
      ]
    )

  if (

    timingActivity >= 1

  ){

    alerts.push({

      id: "300tdi-timing-risk",

      severity: "CRITICAL",

      category: "ENGINE",

      title:
        "300Tdi Timing Belt Service Risk",

      description:
        "Timing belt procurement activity detected for expedition platform vehicle.",

      recommendation:
        "Validate timing kit installation integrity and service interval immediately.",

      confidence: 95,

      expeditionImpact: 99
    })
  }

  return alerts
}

// ============================================================
// MAIN ENGINE
// ============================================================

export function buildPredictiveMaintenanceAssessment(

  profile:
    DefenderVehicleProfile
    |
    null,

  history:
    ProcurementMemoryRecord[]

):

  PredictiveMaintenanceAssessment{

  // ==========================================================
  // EMPTY
  // ==========================================================

  if (

    !profile

  ){

    return {

      alerts: [],

      maintenanceRiskScore: 0,

      expeditionRiskScore: 0,

      operationalConfidence: 0
    }
  }

  // ==========================================================
  // ALERTS
  // ==========================================================

  let alerts:
    PredictiveMaintenanceAlert[] = []

  // ==========================================================
  // ENGINE FAMILY
  // ==========================================================

  if (

    profile.engine === "Td5"

  ){

    alerts = [

      ...alerts,

      ...analyzeTd5(
        history
      )
    ]
  }

  if (

    profile.engine.includes("Puma")

  ){

    alerts = [

      ...alerts,

      ...analyzePuma(
        history
      )
    ]
  }

  if (

    profile.engine === "300Tdi"

  ){

    alerts = [

      ...alerts,

      ...analyze300Tdi(
        history
      )
    ]
  }

  // ==========================================================
  // RISK SCORING
  // ==========================================================

  let maintenanceRiskScore = 0

  alerts.forEach(alert => {

    if (

      alert.severity === "CRITICAL"

    ){

      maintenanceRiskScore += 28
    }

    if (

      alert.severity === "HIGH"

    ){

      maintenanceRiskScore += 18
    }

    if (

      alert.severity === "MEDIUM"

    ){

      maintenanceRiskScore += 10
    }

    if (

      alert.severity === "LOW"

    ){

      maintenanceRiskScore += 4
    }
  })

  maintenanceRiskScore =
    clamp(

      maintenanceRiskScore,

      0,
      99
    )

  // ==========================================================
  // EXPEDITION
  // ==========================================================

  const expeditionRiskScore =
    clamp(

      Math.round(

        alerts.reduce(

          (

            total,
            alert

          ) =>

            total
            +
            alert.expeditionImpact,

          0
        ) /

        Math.max(
          alerts.length,
          1
        )
      ),

      0,
      99
    )

  // ==========================================================
  // CONFIDENCE
  // ==========================================================

  const operationalConfidence =
    clamp(

      100
      -
      maintenanceRiskScore,

      1,
      99
    )

  // ==========================================================
  // SORT
  // ==========================================================

  alerts.sort(

    (

      a,
      b

    ) =>

      b.confidence -
      a.confidence
  )

  // ==========================================================
  // RETURN
  // ==========================================================

  return {

    alerts,

    maintenanceRiskScore,

    expeditionRiskScore,

    operationalConfidence
  }
}