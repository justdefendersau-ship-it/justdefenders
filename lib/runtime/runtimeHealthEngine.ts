// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\runtime\runtimeHealthEngine.ts
//
// Timestamp:
// 28 May 2026 02:15 Sydney
//
// PURPOSE:
// Operational runtime health engine.
// ====================================================================

import fs from "fs"
import path from "path"

// ====================================================================
// TYPES
// ====================================================================

export interface RuntimeSubsystemHealth {

  subsystem:string

  healthy:boolean

  details:string
}

export interface RuntimeHealthStatus {

  timestamp:string

  runtimeHealthy:boolean

  degradedMode:boolean

  subsystemCount:number

  healthySubsystems:number

  unhealthySubsystems:number

  subsystems:
    RuntimeSubsystemHealth[]
}

// ====================================================================
// VALIDATION
// ====================================================================

function validateFile(

  filePath:string,

  label:string

):RuntimeSubsystemHealth {

  const exists =
    fs.existsSync(filePath)

  return {

    subsystem:label,

    healthy:exists,

    details:exists
      ? "ACTIVE"
      : "MISSING"
  }
}

// ====================================================================
// HEALTH
// ====================================================================

export function generateRuntimeHealth():

RuntimeHealthStatus {

  const checks = [

    validateFile(

      path.join(

        process.cwd(),

        "data",

        "notifications",

        "notifications.json"
      ),

      "Notification Store"
    ),

    validateFile(

      path.join(

        process.cwd(),

        "data",

        "operational-state",

        "fleetSnapshot.json"
      ),

      "Operational Snapshot Store"
    )
  ]

  const healthySubsystems =

    checks.filter(
      check => check.healthy
    ).length

  const unhealthySubsystems =

    checks.length -
    healthySubsystems

  return {

    timestamp:
      new Date().toISOString(),

    runtimeHealthy:
      unhealthySubsystems === 0,

    degradedMode:
      unhealthySubsystems > 0,

    subsystemCount:
      checks.length,

    healthySubsystems,

    unhealthySubsystems,

    subsystems:
      checks
  }
}