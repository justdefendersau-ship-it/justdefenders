/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\database\prisma.ts
 *
 * Timestamp:
 * 23 May 2026 21:34 Sydney
 *
 * PURPOSE:
 * Persistent Operational Database Layer
 *
 * STRATEGY:
 * PASS 42 — Persistent Data & Operational Database Layer
 *
 * OBJECTIVES:
 * - PostgreSQL persistence
 * - Prisma operational ORM
 * - durable operational telemetry
 * - persistent procurement intelligence
 * - enterprise fleet persistence
 * - operational analytics durability
 *
 * ============================================================
 */

import {

  PrismaClient

} from "@prisma/client"

import {

  productionConfig

} from "@/lib/infrastructure/productionConfig"

// ============================================================
// GLOBAL
// ============================================================

declare global {

  // eslint-disable-next-line no-var
  var prisma:
    PrismaClient
    |
    undefined
}

// ============================================================
// LOGGING
// ============================================================

const logLevels:

  (
    "query"
    |
    "info"
    |
    "warn"
    |
    "error"
  )[] =

  productionConfig.debugMode

  ?

  [

    "query",
    "info",
    "warn",
    "error"
  ]

  :

  [

    "warn",
    "error"
  ]

// ============================================================
// PRISMA
// ============================================================

export const prisma =

  global.prisma

  ||

  new PrismaClient({

    log:
      logLevels,

    errorFormat:
      "pretty"
  })

// ============================================================
// GLOBAL CACHE
// ============================================================

if (

  productionConfig.environment !== "production"

){

  global.prisma = prisma
}

// ============================================================
// DATABASE HEALTH
// ============================================================

export interface DatabaseHealthResult {

  connected: boolean

  latencyMs: number

  timestamp: string

  environment: string

  databaseConfigured: boolean

  error?: string
}

// ============================================================
// HEALTH CHECK
// ============================================================

export async function checkDatabaseHealth():

  Promise<DatabaseHealthResult>{

  const start =
    performance.now()

  try {

    // ========================================================
    // QUERY
    // ========================================================

    await prisma.$queryRaw`
      SELECT 1
    `

    // ========================================================
    // LATENCY
    // ========================================================

    const latencyMs =
      Math.round(

        performance.now() - start
      )

    // ========================================================
    // RESULT
    // ========================================================

    return {

      connected:
        true,

      latencyMs,

      timestamp:
        new Date().toISOString(),

      environment:
        productionConfig.environment,

      databaseConfigured:
        !!productionConfig.databaseUrl
    }

  } catch (

    error

  ){

    // ========================================================
    // FAILURE
    // ========================================================

    return {

      connected:
        false,

      latencyMs:
        Math.round(

          performance.now() - start
        ),

      timestamp:
        new Date().toISOString(),

      environment:
        productionConfig.environment,

      databaseConfigured:
        !!productionConfig.databaseUrl,

      error:
        error instanceof Error

        ?

        error.message

        :

        "Unknown database error"
    }
  }
}

// ============================================================
// CONNECTION
// ============================================================

export async function connectDatabase(){

  try {

    await prisma.$connect()

    console.log(

      "[DATABASE_CONNECTED]",

      {

        environment:
          productionConfig.environment,

        timestamp:
          new Date().toISOString()
      }
    )

  } catch (

    error

  ){

    console.error(

      "[DATABASE_CONNECTION_ERROR]",

      error
    )

    throw error
  }
}

// ============================================================
// DISCONNECT
// ============================================================

export async function disconnectDatabase(){

  try {

    await prisma.$disconnect()

    console.log(

      "[DATABASE_DISCONNECTED]",

      {

        timestamp:
          new Date().toISOString()
      }
    )

  } catch (

    error

  ){

    console.error(

      "[DATABASE_DISCONNECT_ERROR]",

      error
    )
  }
}

// ============================================================
// TELEMETRY LOG
// ============================================================

export interface OperationalTelemetryEvent {

  category:
    "FEDERATION"
    |
    "EXPEDITION"
    |
    "MAINTENANCE"
    |
    "READINESS"
    |
    "FLEET"

  severity:
    "INFO"
    |
    "WARNING"
    |
    "CRITICAL"

  message: string

  metadata?:
    Record<
      string,
      unknown
    >
}

// ============================================================
// TELEMETRY
// ============================================================

export async function logOperationalTelemetry(

  event:
    OperationalTelemetryEvent

){

  // ==========================================================
  // DEVELOPMENT
  // ==========================================================

  if (

    productionConfig.debugMode

  ){

    console.log(

      "[OPERATIONAL_TELEMETRY]",

      {

        ...event,

        timestamp:
          new Date().toISOString()
      }
    )
  }

  // ==========================================================
  // TODO
  // ==========================================================
  // Future Prisma persistence:
  //
  // await prisma.operationalTelemetry.create({
  //
  //   data: {
  //
  //     category: event.category,
  //     severity: event.severity,
  //     message: event.message,
  //     metadata: JSON.stringify(event.metadata || {})
  //   }
  // })
  //
  // ==========================================================
}

// ============================================================
// PROCUREMENT PERSISTENCE
// ============================================================

export interface ProcurementPersistenceRecord {

  supplier: string

  partNumber: string

  description: string

  price: number

  latencyMs: number

  vehicleVin?: string

  vehiclePlatform?: string
}

// ============================================================
// PROCUREMENT
// ============================================================

export async function persistProcurementTelemetry(

  record:
    ProcurementPersistenceRecord

){

  console.log(

    "[PROCUREMENT_PERSISTENCE]",

    {

      ...record,

      timestamp:
        new Date().toISOString()
    }
  )

  // ==========================================================
  // TODO
  // ==========================================================
  // Future Prisma persistence:
  //
  // await prisma.procurementTelemetry.create({
  //
  //   data: {
  //
  //     supplier: record.supplier,
  //     partNumber: record.partNumber,
  //     description: record.description,
  //     price: record.price,
  //     latencyMs: record.latencyMs,
  //     vehicleVin: record.vehicleVin,
  //     vehiclePlatform: record.vehiclePlatform
  //   }
  // })
  //
  // ==========================================================
}

// ============================================================
// FLEET PERSISTENCE
// ============================================================

export interface FleetPersistenceRecord {

  fleetId: string

  vehicleCount: number

  readinessScore: number

  survivabilityScore: number

  deploymentConfidence: number
}

// ============================================================
// FLEET
// ============================================================

export async function persistFleetTelemetry(

  record:
    FleetPersistenceRecord

){

  console.log(

    "[FLEET_PERSISTENCE]",

    {

      ...record,

      timestamp:
        new Date().toISOString()
    }
  )

  // ==========================================================
  // TODO
  // ==========================================================
  // Future Prisma persistence:
  //
  // await prisma.fleetTelemetry.create({
  //
  //   data: {
  //
  //     fleetId: record.fleetId,
  //     vehicleCount: record.vehicleCount,
  //     readinessScore: record.readinessScore,
  //     survivabilityScore: record.survivabilityScore,
  //     deploymentConfidence: record.deploymentConfidence
  //   }
  // })
  //
  // ==========================================================
}

// ============================================================
// READINESS HISTORY
// ============================================================

export interface OperationalReadinessRecord {

  vin: string

  readinessScore: number

  survivabilityScore: number

  maintenanceRisk: number

  expeditionConfidence: number
}

// ============================================================
// READINESS
// ============================================================

export async function persistOperationalReadiness(

  record:
    OperationalReadinessRecord

){

  console.log(

    "[READINESS_PERSISTENCE]",

    {

      ...record,

      timestamp:
        new Date().toISOString()
    }
  )

  // ==========================================================
  // TODO
  // ==========================================================
  // Future Prisma persistence:
  //
  // await prisma.operationalReadinessHistory.create({
  //
  //   data: {
  //
  //     vin: record.vin,
  //     readinessScore: record.readinessScore,
  //     survivabilityScore: record.survivabilityScore,
  //     maintenanceRisk: record.maintenanceRisk,
  //     expeditionConfidence: record.expeditionConfidence
  //   }
  // })
  //
  // ==========================================================
}