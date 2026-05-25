/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\intelligence\failurePatternCorrelationEngine.ts
 *
 * Timestamp:
 * 23 May 2026 14:48 Sydney
 *
 * PURPOSE:
 * Failure Pattern Correlation Intelligence Engine
 *
 * STRATEGY:
 * PASS 34B.1 — Failure Pattern Correlation Engine
 *
 * OBJECTIVES:
 * - adaptive operational learning
 * - behavioral maintenance intelligence
 * - Defender failure correlation analysis
 * - expedition survivability modeling
 * - procurement behavior intelligence
 * - operational failure escalation analysis
 *
 * ============================================================
 */

import {

  ProcurementMemoryRecord

} from "@/contexts/ServiceIntelligenceContext"

import {

  DefenderVehicleProfile

} from "@/lib/vin/vinDecoder"

import {

  SupplierReliabilityProfile

} from "@/lib/intelligence/supplierReliabilityEngine"

// ============================================================
// TYPES
// ============================================================

export interface FailureCorrelationSignal {

  id: string

  title: string

  category:
    "ENGINE"
    |
    "COOLING"
    |
    "TURBO"
    |
    "DRIVETRAIN"
    |
    "ELECTRICAL"
    |
    "EXPEDITION"

  severity:
    "LOW"
    |
    "MEDIUM"
    |
    "HIGH"
    |
    "CRITICAL"

  confidence: number

  escalationProbability: number

  operationalImpact: number

  expeditionRisk: number

  evidence: string[]

  recommendation: string
}

export interface FailureCorrelationAssessment {

  signals:
    FailureCorrelationSignal[]

  overallEscalationRisk: number

  expeditionFailureProbability: number

  operationalSurvivability: number
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

function countKeywords(

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

function supplierReliabilityAverage(

  suppliers:
    SupplierReliabilityProfile[]

){

  if (

    suppliers.length === 0

  ){

    return 50
  }

  return Math.round(

    suppliers.reduce(

      (

        total,
        supplier

      ) =>

        total
        +
        supplier.reliabilityScore,

      0
    ) / suppliers.length
  )
}

// ============================================================
// TD5
// ============================================================

function correlateTd5(

  history:
    ProcurementMemoryRecord[],

  supplierProfiles:
    SupplierReliabilityProfile[]

):

  FailureCorrelationSignal[]{

  const signals:
    FailureCorrelationSignal[] = []

  // ==========================================================
  // INJECTOR LOOM
  // ==========================================================

  const injector =
    countKeywords(

      history,

      [

        "injector",
        "ecu",
        "loom",
        "oil migration"
      ]
    )

  if (

    injector >= 3

  ){

    signals.push({

      id: "td5-injector-correlation",

      title:
        "Td5 Injector Loom Escalation Pattern",

      category: "ELECTRICAL",

      severity: "HIGH",

      confidence:
        clamp(
          70 + injector * 5,
          0,
          99
        ),

      escalationProbability:
        clamp(
          68 + injector * 4,
          0,
          99
        ),

      operationalImpact: 84,

      expeditionRisk: 88,

      evidence: [

        "Repeated injector procurement activity",

        "ECU-related operational behavior detected",

        "Pattern consistent with loom contamination escalation"
      ],

      recommendation:
        "Inspect injector harness, ECU red plug, and fuel system before expedition deployment."
    })
  }

  return signals
}

// ============================================================
// PUMA
// ============================================================

function correlatePuma(

  history:
    ProcurementMemoryRecord[],

  supplierProfiles:
    SupplierReliabilityProfile[]

):

  FailureCorrelationSignal[]{

  const signals:
    FailureCorrelationSignal[] = []

  // ==========================================================
  // BOOST SYSTEM
  // ==========================================================

  const boost =
    countKeywords(

      history,

      [

        "turbo",
        "boost",
        "intercooler",
        "hose",
        "egr"
      ]
    )

  if (

    boost >= 3

  ){

    signals.push({

      id: "puma-boost-correlation",

      title:
        "Puma Boost System Degradation Escalation",

      category: "TURBO",

      severity: "HIGH",

      confidence:
        clamp(
          72 + boost * 4,
          0,
          99
        ),

      escalationProbability:
        clamp(
          70 + boost * 4,
          0,
          99
        ),

      operationalImpact: 86,

      expeditionRisk: 91,

      evidence: [

        "Repeated turbo/intercooler procurement detected",

        "Boost-system maintenance behavior escalation",

        "Pattern consistent with remote-operation degradation risk"
      ],

      recommendation:
        "Inspect intercooler plumbing, boost hoses, clamps, and EGR contamination immediately."
    })
  }

  // ==========================================================
  // CLUTCH SYSTEM
  // ==========================================================

  const clutch =
    countKeywords(

      history,

      [

        "clutch",
        "slave cylinder",
        "master cylinder"
      ]
    )

  if (

    clutch >= 2

  ){

    signals.push({

      id: "puma-clutch-correlation",

      title:
        "Puma Clutch Hydraulic Fatigue Pattern",

      category: "DRIVETRAIN",

      severity: "MEDIUM",

      confidence:
        clamp(
          64 + clutch * 5,
          0,
          99
        ),

      escalationProbability:
        clamp(
          58 + clutch * 6,
          0,
          99
        ),

      operationalImpact: 70,

      expeditionRisk: 74,

      evidence: [

        "Repeated clutch hydraulic procurement activity",

        "Operational wear pattern emerging"
      ],

      recommendation:
        "Inspect clutch hydraulic integrity and fluid contamination before remote deployment."
    })
  }

  return signals
}

// ============================================================
// 300TDI
// ============================================================

function correlate300Tdi(

  history:
    ProcurementMemoryRecord[],

  supplierProfiles:
    SupplierReliabilityProfile[]

):

  FailureCorrelationSignal[]{

  const signals:
    FailureCorrelationSignal[] = []

  // ==========================================================
  // COOLING
  // ==========================================================

  const cooling =
    countKeywords(

      history,

      [

        "coolant",
        "radiator",
        "thermostat",
        "water pump",
        "hose"
      ]
    )

  if (

    cooling >= 3

  ){

    signals.push({

      id: "300tdi-cooling-correlation",

      title:
        "300Tdi Cooling Failure Escalation Pattern",

      category: "COOLING",

      severity: "CRITICAL",

      confidence:
        clamp(
          82 + cooling * 3,
          0,
          99
        ),

      escalationProbability:
        clamp(
          80 + cooling * 3,
          0,
          99
        ),

      operationalImpact: 95,

      expeditionRisk: 98,

      evidence: [

        "Repeated cooling system procurement activity",

        "Pattern consistent with expedition overheating escalation",

        "Operational survivability degradation detected"
      ],

      recommendation:
        "Perform full cooling-system validation before expedition deployment."
    })
  }

  return signals
}

// ============================================================
// MAIN ENGINE
// ============================================================

export function buildFailureCorrelationAssessment(

  profile:
    DefenderVehicleProfile
    |
    null,

  history:
    ProcurementMemoryRecord[],

  supplierProfiles:
    SupplierReliabilityProfile[]

):

  FailureCorrelationAssessment{

  // ==========================================================
  // EMPTY
  // ==========================================================

  if (

    !profile

  ){

    return {

      signals: [],

      overallEscalationRisk: 0,

      expeditionFailureProbability: 0,

      operationalSurvivability: 0
    }
  }

  // ==========================================================
  // SIGNALS
  // ==========================================================

  let signals:
    FailureCorrelationSignal[] = []

  // ==========================================================
  // ENGINE FAMILY
  // ==========================================================

  if (

    profile.engine === "Td5"

  ){

    signals = [

      ...signals,

      ...correlateTd5(

        history,
        supplierProfiles
      )
    ]
  }

  if (

    profile.engine.includes("Puma")

  ){

    signals = [

      ...signals,

      ...correlatePuma(

        history,
        supplierProfiles
      )
    ]
  }

  if (

    profile.engine === "300Tdi"

  ){

    signals = [

      ...signals,

      ...correlate300Tdi(

        history,
        supplierProfiles
      )
    ]
  }

  // ==========================================================
  // SORT
  // ==========================================================

  signals.sort(

    (

      a,
      b

    ) =>

      b.confidence -
      a.confidence
  )

  // ==========================================================
  // OVERALL
  // ==========================================================

  const overallEscalationRisk =
    clamp(

      Math.round(

        signals.reduce(

          (

            total,
            signal

          ) =>

            total
            +
            signal.escalationProbability,

          0
        ) /

        Math.max(
          signals.length,
          1
        )
      ),

      0,
      99
    )

  // ==========================================================
  // EXPEDITION
  // ==========================================================

  const expeditionFailureProbability =
    clamp(

      Math.round(

        signals.reduce(

          (

            total,
            signal

          ) =>

            total
            +
            signal.expeditionRisk,

          0
        ) /

        Math.max(
          signals.length,
          1
        )
      ),

      0,
      99
    )

  // ==========================================================
  // SURVIVABILITY
  // ==========================================================

  const supplierReliability =
    supplierReliabilityAverage(
      supplierProfiles
    )

  const operationalSurvivability =
    clamp(

      Math.round(

        (
          supplierReliability * 0.35
        ) +

        (
          (100 - overallEscalationRisk) * 0.40
        ) +

        (
          (100 - expeditionFailureProbability) * 0.25
        )
      ),

      1,
      99
    )

  // ==========================================================
  // RETURN
  // ==========================================================

  return {

    signals,

    overallEscalationRisk,

    expeditionFailureProbability,

    operationalSurvivability
  }
}