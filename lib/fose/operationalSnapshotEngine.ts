// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\fose\operationalSnapshotEngine.ts
//
// Timestamp:
// 28 May 2026 01:45 Sydney
//
// PURPOSE:
// Fleet operational snapshot engine.
// ====================================================================

import fs from "fs"
import path from "path"

import {

  safeJsonLoad,

  safeJsonSave

}
from "@/lib/runtime/runtimeRecoveryEngine"

// ====================================================================
// STORAGE
// ====================================================================

const SNAPSHOT_PATH = path.join(

  process.cwd(),

  "data",

  "operational-state",

  "fleetSnapshot.json"
)

// ====================================================================
// TYPES
// ====================================================================

export interface FleetOperationalSnapshot {

  timestamp:string

  operationalReadiness:number

  expeditionReadiness:number

  survivabilityScore:number

  operationalStatus:string

  maintenanceBurden:string

  failureExposure:string

  activeAlerts:number

  survivabilityAlerts:number
}

// ====================================================================
// ENSURE
// ====================================================================

function ensureSnapshotStorage(){

  const dir =
    path.dirname(SNAPSHOT_PATH)

  if(!fs.existsSync(dir)){

    fs.mkdirSync(
      dir,
      {
        recursive:true
      }
    )
  }

  if(!fs.existsSync(SNAPSHOT_PATH)){

    safeJsonSave(
      SNAPSHOT_PATH,
      {}
    )
  }
}

// ====================================================================
// SAVE
// ====================================================================

export function saveOperationalSnapshot(

  snapshot:
  FleetOperationalSnapshot

){

  ensureSnapshotStorage()

  safeJsonSave(

    SNAPSHOT_PATH,

    snapshot
  )
}

// ====================================================================
// LOAD
// ====================================================================

export function loadOperationalSnapshot():

FleetOperationalSnapshot | null {

  ensureSnapshotStorage()

  return safeJsonLoad(

    SNAPSHOT_PATH,

    null
  )
}