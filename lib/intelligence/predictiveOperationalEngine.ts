/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\intelligence\predictiveOperationalEngine.ts
 *
 * Timestamp:
 * 23 May 2026 11:52 Sydney
 *
 * PURPOSE:
 * Predictive Operational Intelligence Engine
 *
 * STRATEGY:
 * PASS 34 — Predictive Operational Intelligence
 *
 * OBJECTIVES:
 * - predictive maintenance intelligence
 * - procurement risk forecasting
 * - supplier reliability intelligence
 * - operational readiness scoring
 * - expedition survivability analysis
 * - tactical Defender operational AI
 *
 * ============================================================
 */

import {

  ProcurementMemoryRecord

} from "@/contexts/ServiceIntelligenceContext"

import {

  DefenderVehicleProfile

} from "@/lib/vin/vinDecoder"

// ============================================================
// TYPES
// ============================================================

export interface PredictiveRisk {

  id: string

  category:
    "COOLING"
    |
    "FUEL"
    |
    "DRIVETRAIN"
    |
    "ELECTRICAL"
    |
    "SUPPLY_CHAIN"
    |
    "ENGINE"

  severity:
    "LOW"
    |
    "MEDIUM"
    |
    "HIGH"
    |
    "CRITICAL"

  title: string

  description: string

  recommendation: string

  confidence: number
}

export interface SupplierReliability {

  supplier: string

  usageCount: number

  reliabilityScore: number

  operationalPreference: boolean
}

export interface OperationalReadiness {

  readinessScore: number

  expeditionScore: number

  maintenanceConfidence: number

  procurementResilience: number

  riskLevel:
    "LOW"
    |
    "MEDIUM"
    |
    "HIGH"
    |
    "CRITICAL"
}

export interface PredictiveOperationalIntelligence {

  predictiveRisks:
    PredictiveRisk[]

  supplierReliability:
    SupplierReliability[]

  operationalReadiness:
    OperationalReadiness
}

// ============================================================
// HELPERS
// ============================================================

function countSearchOccurrences(

  history:
    ProcurementMemoryRecord[],

  keyword: string

){

  return history.filter(

    item =>

      item.query
        .toLowerCase()
        .includes(
          keyword.toLowerCase()
        )

  ).length
}

// ============================================================
// SUPPLIER RELIABILITY
// ============================================================

function buildSupplierReliability(

  history:
    ProcurementMemoryRecord[]

):

  SupplierReliability[]{

  const supplierMap:
    Record<
      string,
      number
    > = {}

  history.forEach(record => {

    if (

      !record.supplier

    ){

      return
    }

    supplierMap[
      record.supplier
    ] =

      (
        supplierMap[
          record.supplier
        ] || 0
      ) + 1
  })

  return Object.entries(
    supplierMap
  )

    .map(

      ([supplier, usageCount]) => ({

        supplier,

        usageCount,

        reliabilityScore:
          Math.min(
            60 + usageCount * 5,
            99
          ),

        operationalPreference:
          usageCount >= 3
}))
    .sort(

      (

        a,
        b

      ) =>

        b.reliabilityScore -
        a.reliabilityScore
    )
}

// ============================================================
// PREDICTIVE RISKS
// ============================================================

function buildPredictiveRisks(

  profile:
    DefenderVehicleProfile,

  history:
    ProcurementMemoryRecord[]

):

  PredictiveRisk[]{

  const risks:
    PredictiveRisk[] = []

  // ==========================================================
  // COOLING SYSTEM
  // ==========================================================

  const coolantSearches =
    countSearchOccurrences(

      history,

      "coolant"
    )

  const hoseSearches =
    countSearchOccurrences(

      history,

      "hose"
    )

  const waterPumpSearches =
    countSearchOccurrences(

      history,

      "water pump"
    )

  if (

    coolantSearches +
    hoseSearches +
    waterPumpSearches >= 3

  ){

    risks.push({

      id: "cooling-risk",

      category: "COOLING",

      severity: "HIGH",

      title:
        "Cooling System Operational Risk",

      description:
        "Repeated cooling-related procurement activity detected.",

      recommendation:
        "Recommend preventative cooling system service before expedition deployment.",

      confidence: 92
    })
  }

  // ==========================================================
  // TD5 ELECTRICAL
  // ==========================================================

  if (

    profile.engine === "Td5"

  ){

    const injectorSearches =
      countSearchOccurrences(

        history,

        "injector"
      )

    if (

      injectorSearches >= 2

    ){

      risks.push({

        id: "td5-electrical",

        category: "ELECTRICAL",

        severity: "HIGH",

        title:
          "Injector Harness Reliability Risk",

        description:
          "Injector-related procurement behavior detected repeatedly.",

        recommendation:
          "Inspect ECU contamination and injector loom integrity.",

        confidence: 88
      })
    }
  }

  // ==========================================================
  // PUMA TURBO
  // ==========================================================

  if (

    profile.engine.includes("Puma")

  ){

    const turboSearches =
      countSearchOccurrences(

        history,

        "turbo"
      )

    const intercoolerSearches =
      countSearchOccurrences(

        history,

        "intercooler"
      )

    if (

      turboSearches +
      intercoolerSearches >= 2

    ){

      risks.push({

        id: "puma-boost-system",

        category: "ENGINE",

        severity: "MEDIUM",

        title:
          "Boost System Service Pattern Detected",

        description:
          "Repeated turbo/intercooler procurement activity observed.",

        recommendation:
          "Inspect boost hoses and intercooler integrity before remote operation.",

        confidence: 84
      })
    }
  }

  // ==========================================================
  // SUPPLY CHAIN
  // ==========================================================

  if (

    history.length >= 10

  ){

    risks.push({

      id: "supply-chain-load",

      category: "SUPPLY_CHAIN",

      severity: "MEDIUM",

      title:
        "High Operational Procurement Activity",

      description:
        "Sustained procurement activity suggests increased operational maintenance demand.",

      recommendation:
        "Pre-stage critical expedition inventory and consumables.",

      confidence: 78
    })
  }

  return risks
}

// ============================================================
// READINESS
// ============================================================

function buildOperationalReadiness(

  profile:
    DefenderVehicleProfile,

  risks:
    PredictiveRisk[],

  reliability:
    SupplierReliability[]

):

  OperationalReadiness{

  let readiness =
    profile.expeditionScore

  // ==========================================================
  // RISK PENALTIES
  // ==========================================================

  risks.forEach(risk => {

    if (

      risk.severity === "CRITICAL"

    ){

      readiness -= 18
    }

    if (

      risk.severity === "HIGH"

    ){

      readiness -= 10
    }

    if (

      risk.severity === "MEDIUM"

    ){

      readiness -= 5
    }
  })

  // ==========================================================
  // RELIABILITY BONUS
  // ==========================================================

  if (

    reliability.length >= 3

  ){

    readiness += 5
  }

  readiness =
    Math.max(
      40,
      Math.min(
        readiness,
        99
      )
    )

  // ==========================================================
  // RISK LEVEL
  // ==========================================================

  let riskLevel:
    OperationalReadiness["riskLevel"]

  if (

    readiness >= 90

  ){

    riskLevel = "LOW"

  } else if (

    readiness >= 75

  ){

    riskLevel = "MEDIUM"

  } else if (

    readiness >= 60

  ){

    riskLevel = "HIGH"

  } else {

    riskLevel = "CRITICAL"
  }

  return {

    readinessScore:
      readiness,

    expeditionScore:
      profile.expeditionScore,

    maintenanceConfidence:
      profile.fitmentConfidence,

    procurementResilience:
      Math.min(
        60 + reliability.length * 5,
        99
      ),

    riskLevel
  }
}

// ============================================================
// ENGINE
// ============================================================

export function buildPredictiveOperationalIntelligence(

  profile:
    DefenderVehicleProfile
    |
    null,

  history:
    ProcurementMemoryRecord[]

):

  PredictiveOperationalIntelligence{

  // ==========================================================
  // EMPTY
  // ==========================================================

  if (

    !profile

  ){

    return {

      predictiveRisks: [],

      supplierReliability: [],

      operationalReadiness: {

        readinessScore: 0,

        expeditionScore: 0,

        maintenanceConfidence: 0,

        procurementResilience: 0,

        riskLevel: "LOW"
      }
    }
  }

  // ==========================================================
  // BUILD
  // ==========================================================

  const supplierReliability =
    buildSupplierReliability(
      history
    )

  const predictiveRisks =
    buildPredictiveRisks(

      profile,
      history
    )

  const operationalReadiness =
    buildOperationalReadiness(

      profile,
      predictiveRisks,
      supplierReliability
    )

  // ==========================================================
  // RETURN
  // ==========================================================

  return {

    predictiveRisks,

    supplierReliability,

    operationalReadiness
  }
}