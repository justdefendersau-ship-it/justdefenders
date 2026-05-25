/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\intelligence\operationalReadinessEngine.ts
 *
 * Timestamp:
 * 23 May 2026 15:06 Sydney
 *
 * PURPOSE:
 * Operational Readiness Scoring Engine
 *
 * STRATEGY:
 * PASS 34C — Operational Readiness Scoring
 *
 * OBJECTIVES:
 * - unified operational readiness intelligence
 * - expedition survivability scoring
 * - procurement resilience analysis
 * - tactical deployment confidence
 * - predictive operational scoring
 * - Defender expedition intelligence
 *
 * ============================================================
 */

import {

  DefenderVehicleProfile

} from "@/lib/vin/vinDecoder"

import {

  PredictiveMaintenanceAssessment

} from "@/lib/intelligence/predictiveMaintenanceEngine"

import {

  FailureCorrelationAssessment

} from "@/lib/intelligence/failurePatternCorrelationEngine"

import {

  SupplierReliabilityProfile

} from "@/lib/intelligence/supplierReliabilityEngine"

// ============================================================
// TYPES
// ============================================================

export interface OperationalReadinessAssessment {

  readinessScore: number

  expeditionReadiness: number

  procurementResilience: number

  operationalConfidence: number

  survivabilityScore: number

  deploymentStatus:
    "READY"
    |
    "CAUTION"
    |
    "HIGH_RISK"
    |
    "CRITICAL"

  deploymentRecommendation: string

  tacticalSummary: string

  readinessFactors: {

    supplierStrength: number

    maintenanceRisk: number

    escalationRisk: number

    expeditionRisk: number

    vehicleCapability: number
  }
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

      ) => total + value,

      0
    ) / values.length
  )
}

// ============================================================
// VEHICLE CAPABILITY
// ============================================================

function calculateVehicleCapability(

  profile:
    DefenderVehicleProfile

){

  let capability =
    profile.expeditionScore

  // ==========================================================
  // ENGINE
  // ==========================================================

  if (

    profile.engine === "300Tdi"

  ){

    capability += 6
  }

  if (

    profile.engine === "Td5"

  ){

    capability += 4
  }

  if (

    profile.engine.includes("Puma")

  ){

    capability += 2
  }

  // ==========================================================
  // BODY
  // ==========================================================

  if (

    profile.body.includes("110")

  ){

    capability += 5
  }

  // ==========================================================
  // DRIVETRAIN
  // ==========================================================

  if (

    profile.drivetrain === "4WD"

  ){

    capability += 4
  }

  return clamp(

    capability,

    1,
    99
  )
}

// ============================================================
// PROCUREMENT RESILIENCE
// ============================================================

function calculateProcurementResilience(

  suppliers:
    SupplierReliabilityProfile[]

){

  if (

    suppliers.length === 0

  ){

    return 45
  }

  const tacticalRanks =
    suppliers.map(

      supplier =>

        supplier.tacticalRank
    )

  const reliability =
    suppliers.map(

      supplier =>

        supplier.reliabilityScore
    )

  const latency =
    suppliers.map(

      supplier =>

        clamp(

          100 -
          supplier.averageLatency / 10,

          1,
          99
        )
    )

  return clamp(

    Math.round(

      (
        average(
          tacticalRanks
        ) * 0.45
      ) +

      (
        average(
          reliability
        ) * 0.35
      ) +

      (
        average(
          latency
        ) * 0.20
      )
    ),

    1,
    99
  )
}

// ============================================================
// DEPLOYMENT STATUS
// ============================================================

function determineDeploymentStatus(

  readiness: number

):

  OperationalReadinessAssessment["deploymentStatus"]{

  if (

    readiness >= 85

  ){

    return "READY"
  }

  if (

    readiness >= 70

  ){

    return "CAUTION"
  }

  if (

    readiness >= 55

  ){

    return "HIGH_RISK"
  }

  return "CRITICAL"
}

// ============================================================
// DEPLOYMENT RECOMMENDATION
// ============================================================

function buildRecommendation(

  status:
    OperationalReadinessAssessment["deploymentStatus"]

){

  switch(status){

    case "READY":

      return `
Remote expedition deployment approved.
Operational survivability confidence high.
Procurement federation healthy.
`.trim()

    case "CAUTION":

      return `
Moderate operational risks detected.
Preventative maintenance recommended before remote deployment.
`.trim()

    case "HIGH_RISK":

      return `
Operational degradation indicators detected.
High-priority preventative maintenance required.
`.trim()

    case "CRITICAL":

      return `
Critical operational risk escalation detected.
Remote expedition deployment NOT recommended.
`.trim()
  }
}

// ============================================================
// SUMMARY
// ============================================================

function buildSummary(

  readiness: number,

  procurement: number,

  survivability: number

){

  if (

    readiness >= 85

  ){

    return `
Operational platform stable with strong expedition survivability and resilient procurement coverage.
`.trim()
  }

  if (

    readiness >= 70

  ){

    return `
Moderate operational concerns detected. Expedition readiness acceptable with preventative servicing.
`.trim()
  }

  if (

    readiness >= 55

  ){

    return `
Operational degradation emerging. Expedition survivability reduced without intervention.
`.trim()
  }

  return `
Critical operational instability detected. Immediate remediation required before deployment.
`.trim()
}

// ============================================================
// ENGINE
// ============================================================

export function buildOperationalReadinessAssessment(

  profile:
    DefenderVehicleProfile
    |
    null,

  predictiveMaintenance:
    PredictiveMaintenanceAssessment,

  failureCorrelation:
    FailureCorrelationAssessment,

  suppliers:
    SupplierReliabilityProfile[]

):

  OperationalReadinessAssessment{

  // ==========================================================
  // EMPTY
  // ==========================================================

  if (

    !profile

  ){

    return {

      readinessScore: 0,

      expeditionReadiness: 0,

      procurementResilience: 0,

      operationalConfidence: 0,

      survivabilityScore: 0,

      deploymentStatus: "CRITICAL",

      deploymentRecommendation:
        "No operational vehicle profile loaded.",

      tacticalSummary:
        "Operational readiness unavailable.",

      readinessFactors: {

        supplierStrength: 0,

        maintenanceRisk: 0,

        escalationRisk: 0,

        expeditionRisk: 0,

        vehicleCapability: 0
      }
    }
  }

  // ==========================================================
  // VEHICLE
  // ==========================================================

  const vehicleCapability =
    calculateVehicleCapability(
      profile
    )

  // ==========================================================
  // PROCUREMENT
  // ==========================================================

  const procurementResilience =
    calculateProcurementResilience(
      suppliers
    )

  // ==========================================================
  // MAINTENANCE
  // ==========================================================

  const maintenanceRisk =
    predictiveMaintenance
      .maintenanceRiskScore

  // ==========================================================
  // ESCALATION
  // ==========================================================

  const escalationRisk =
    failureCorrelation
      .overallEscalationRisk

  // ==========================================================
  // EXPEDITION
  // ==========================================================

  const expeditionRisk =
    failureCorrelation
      .expeditionFailureProbability

  // ==========================================================
  // READINESS
  // ==========================================================

  const readinessScore =
    clamp(

      Math.round(

        (
          vehicleCapability * 0.30
        ) +

        (
          procurementResilience * 0.25
        ) +

        (
          (100 - maintenanceRisk) * 0.20
        ) +

        (
          (100 - escalationRisk) * 0.15
        ) +

        (
          (100 - expeditionRisk) * 0.10
        )
      ),

      1,
      99
    )

  // ==========================================================
  // EXPEDITION READINESS
  // ==========================================================

  const expeditionReadiness =
    clamp(

      Math.round(

        (
          vehicleCapability * 0.45
        ) +

        (
          procurementResilience * 0.20
        ) +

        (
          (100 - expeditionRisk) * 0.35
        )
      ),

      1,
      99
    )

  // ==========================================================
  // SURVIVABILITY
  // ==========================================================

  const survivabilityScore =
    clamp(

      Math.round(

        (
          expeditionReadiness * 0.45
        ) +

        (
          procurementResilience * 0.30
        ) +

        (
          (100 - escalationRisk) * 0.25
        )
      ),

      1,
      99
    )

  // ==========================================================
  // CONFIDENCE
  // ==========================================================

  const operationalConfidence =
    clamp(

      Math.round(

        (
          readinessScore * 0.40
        ) +

        (
          survivabilityScore * 0.35
        ) +

        (
          procurementResilience * 0.25
        )
      ),

      1,
      99
    )

  // ==========================================================
  // STATUS
  // ==========================================================

  const deploymentStatus =
    determineDeploymentStatus(
      readinessScore
    )

  // ==========================================================
  // RECOMMENDATION
  // ==========================================================

  const deploymentRecommendation =
    buildRecommendation(
      deploymentStatus
    )

  // ==========================================================
  // SUMMARY
  // ==========================================================

  const tacticalSummary =
    buildSummary(

      readinessScore,

      procurementResilience,

      survivabilityScore
    )

  // ==========================================================
  // RETURN
  // ==========================================================

  return {

    readinessScore,

    expeditionReadiness,

    procurementResilience,

    operationalConfidence,

    survivabilityScore,

    deploymentStatus,

    deploymentRecommendation,

    tacticalSummary,

    readinessFactors: {

      supplierStrength:
        procurementResilience,

      maintenanceRisk,

      escalationRisk,

      expeditionRisk,

      vehicleCapability
    }
  }
}