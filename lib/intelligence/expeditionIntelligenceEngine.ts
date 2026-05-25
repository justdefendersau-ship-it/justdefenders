/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\intelligence\expeditionIntelligenceEngine.ts
 *
 * Timestamp:
 * 23 May 2026 13:00 Sydney
 *
 * PURPOSE:
 * Expedition Intelligence Layer
 *
 * STRATEGY:
 * PASS 34D — Expedition Intelligence Layer
 *
 * OBJECTIVES:
 * - expedition survivability intelligence
 * - remote deployment readiness analysis
 * - critical spare prioritization
 * - regional procurement resilience
 * - operational expedition scoring
 * - tactical deployment intelligence
 *
 * ============================================================
 */

import {

  DefenderVehicleProfile

} from "@/lib/vin/vinDecoder"

import {

  OperationalReadinessAssessment

} from "@/lib/intelligence/operationalReadinessEngine"

import {

  FailureCorrelationAssessment

} from "@/lib/intelligence/failurePatternCorrelationEngine"

import {

  SupplierReliabilityProfile

} from "@/lib/intelligence/supplierReliabilityEngine"

// ============================================================
// TYPES
// ============================================================

export interface ExpeditionSpareItem {

  category: string

  part: string

  priority:
    "CRITICAL"
    |
    "HIGH"
    |
    "MEDIUM"
    |
    "LOW"

  rationale: string
}

export interface ExpeditionDeploymentPack {

  title: string

  description: string

  items:
    ExpeditionSpareItem[]
}

export interface ExpeditionIntelligenceAssessment {

  expeditionScore: number

  survivabilityIndex: number

  remoteDeploymentConfidence: number

  procurementCoverage: number

  logisticsRisk: number

  deploymentRecommendation: string

  operationalSummary: string

  criticalWarnings: string[]

  recommendedPacks:
    ExpeditionDeploymentPack[]
}

// ============================================================
// HELPERS
// ============================================================

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

function average(

  values: number[]

){

  if (

    values.length === 0

  ){

    return 0
  }

  return Math.round(

    values.reduce(

      (

        total,
        value

      ) =>

        total + value,

      0
    ) / values.length
  )
}

// ============================================================
// SPARE PACKS
// ============================================================

function build300TdiPack():

  ExpeditionDeploymentPack{

  return {

    title:
      "300Tdi Expedition Survivability Pack",

    description:
      "Critical remote-area operational support package for 300Tdi deployment.",

    items: [

      {

        category: "Cooling",

        part: "Radiator Hoses",

        priority: "CRITICAL",

        rationale:
          "Cooling-system survivability critical for remote operation."
      },

      {

        category: "Cooling",

        part: "Water Pump",

        priority: "HIGH",

        rationale:
          "Known expedition failure point."
      },

      {

        category: "Engine",

        part: "Timing Belt Kit",

        priority: "CRITICAL",

        rationale:
          "Operational engine survivability component."
      },

      {

        category: "Fuel",

        part: "Fuel Filter Set",

        priority: "HIGH",

        rationale:
          "Fuel contamination resilience."
      },

      {

        category: "Electrical",

        part: "Glow Plug Set",

        priority: "MEDIUM",

        rationale:
          "Cold-start expedition reliability."
      }
    ]
  }
}

function buildTd5Pack():

  ExpeditionDeploymentPack{

  return {

    title:
      "Td5 Expedition Electronics Pack",

    description:
      "Remote deployment electrical resilience package.",

    items: [

      {

        category: "Electrical",

        part: "Injector Harness",

        priority: "CRITICAL",

        rationale:
          "Oil migration operational risk mitigation."
      },

      {

        category: "Electrical",

        part: "Crank Sensor",

        priority: "HIGH",

        rationale:
          "Remote no-start mitigation."
      },

      {

        category: "Cooling",

        part: "Coolant Hose Set",

        priority: "HIGH",

        rationale:
          "Thermal survivability protection."
      },

      {

        category: "Fuel",

        part: "Fuel Pressure Regulator Kit",

        priority: "HIGH",

        rationale:
          "Known Td5 operational weakness."
      }
    ]
  }
}

function buildPumaPack():

  ExpeditionDeploymentPack{

  return {

    title:
      "Puma Boost-System Operational Pack",

    description:
      "Boost-system survivability and expedition deployment pack.",

    items: [

      {

        category: "Turbo",

        part: "Intercooler Hose Kit",

        priority: "CRITICAL",

        rationale:
          "High-frequency operational degradation point."
      },

      {

        category: "Turbo",

        part: "Turbo Hose Clamps",

        priority: "HIGH",

        rationale:
          "Boost containment integrity."
      },

      {

        category: "Drivetrain",

        part: "Clutch Slave Cylinder",

        priority: "HIGH",

        rationale:
          "Remote drivability survivability."
      },

      {

        category: "Fuel",

        part: "Fuel Filter",

        priority: "MEDIUM",

        rationale:
          "Expedition fuel resilience."
      }
    ]
  }
}

// ============================================================
// PACK SELECTION
// ============================================================

function buildExpeditionPacks(

  profile:
    DefenderVehicleProfile

){

  const packs:
    ExpeditionDeploymentPack[] = []

  if (

    profile.engine === "300Tdi"

  ){

    packs.push(
      build300TdiPack()
    )
  }

  if (

    profile.engine === "Td5"

  ){

    packs.push(
      buildTd5Pack()
    )
  }

  if (

    profile.engine.includes("Puma")

  ){

    packs.push(
      buildPumaPack()
    )
  }

  return packs
}

// ============================================================
// ENGINE
// ============================================================

export function buildExpeditionIntelligenceAssessment(

  profile:
    DefenderVehicleProfile
    |
    null,

  readiness:
    OperationalReadinessAssessment,

  failureCorrelation:
    FailureCorrelationAssessment,

  suppliers:
    SupplierReliabilityProfile[]

):

  ExpeditionIntelligenceAssessment{

  // ==========================================================
  // EMPTY
  // ==========================================================

  if (

    !profile

  ){

    return {

      expeditionScore: 0,

      survivabilityIndex: 0,

      remoteDeploymentConfidence: 0,

      procurementCoverage: 0,

      logisticsRisk: 0,

      deploymentRecommendation:
        "No operational vehicle loaded.",

      operationalSummary:
        "Expedition intelligence unavailable.",

      criticalWarnings: [],

      recommendedPacks: []
    }
  }

  // ==========================================================
  // PROCUREMENT
  // ==========================================================

  const supplierCoverage =
    average(

      suppliers.map(

        supplier =>

          supplier.operationalConfidence
      )
    )

  // ==========================================================
  // LOGISTICS
  // ==========================================================

  const logisticsRisk =
    clamp(

      Math.round(

        100
        -
        supplierCoverage
      ),

      1,
      99
    )

  // ==========================================================
  // EXPEDITION SCORE
  // ==========================================================

  const expeditionScore =
    clamp(

      Math.round(

        (
          readiness.expeditionReadiness * 0.40
        ) +

        (
          readiness.procurementResilience * 0.25
        ) +

        (
          failureCorrelation.operationalSurvivability * 0.35
        )
      ),

      1,
      99
    )

  // ==========================================================
  // SURVIVABILITY
  // ==========================================================

  const survivabilityIndex =
    clamp(

      Math.round(

        (
          readiness.survivabilityScore * 0.50
        ) +

        (
          expeditionScore * 0.30
        ) +

        (
          supplierCoverage * 0.20
        )
      ),

      1,
      99
    )

  // ==========================================================
  // DEPLOYMENT
  // ==========================================================

  const remoteDeploymentConfidence =
    clamp(

      Math.round(

        (
          expeditionScore * 0.40
        ) +

        (
          survivabilityIndex * 0.40
        ) +

        (
          (100 - logisticsRisk) * 0.20
        )
      ),

      1,
      99
    )

  // ==========================================================
  // WARNINGS
  // ==========================================================

  const criticalWarnings:
    string[] = []

  if (

    failureCorrelation
      .overallEscalationRisk >= 70

  ){

    criticalWarnings.push(
      "Operational degradation escalation detected."
    )
  }

  if (

    failureCorrelation
      .expeditionFailureProbability >= 75

  ){

    criticalWarnings.push(
      "High expedition failure probability identified."
    )
  }

  if (

    logisticsRisk >= 60

  ){

    criticalWarnings.push(
      "Regional procurement logistics resilience weak."
    )
  }

  // ==========================================================
  // RECOMMENDATION
  // ==========================================================

  let deploymentRecommendation =
    ""

  if (

    remoteDeploymentConfidence >= 85

  ){

    deploymentRecommendation =
      "Remote expedition deployment approved with strong operational survivability."

  } else if (

    remoteDeploymentConfidence >= 70

  ){

    deploymentRecommendation =
      "Operational platform suitable for moderate expedition deployment with preventative maintenance."

  } else if (

    remoteDeploymentConfidence >= 55

  ){

    deploymentRecommendation =
      "Operational risk elevated. Preventative servicing required before remote deployment."

  } else {

    deploymentRecommendation =
      "Remote expedition deployment NOT recommended due to operational survivability concerns."
  }

  // ==========================================================
  // SUMMARY
  // ==========================================================

  const operationalSummary =
    `
Expedition survivability intelligence active for ${profile.platform}.
Operational readiness, procurement resilience, supplier federation health,
and predictive maintenance telemetry consolidated into expedition deployment scoring.
`.replace(/\s+/g, " ").trim()

  // ==========================================================
  // RETURN
  // ==========================================================

  return {

    expeditionScore,

    survivabilityIndex,

    remoteDeploymentConfidence,

    procurementCoverage:
      supplierCoverage,

    logisticsRisk,

    deploymentRecommendation,

    operationalSummary,

    criticalWarnings,

    recommendedPacks:
      buildExpeditionPacks(
        profile
      )
  }
}