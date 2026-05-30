// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\runtime\runtimeCommandEngine.ts
//
// Timestamp:
// 28 May 2026 02:45 Sydney
//
// PURPOSE:
// Operational runtime command engine.
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

const COMMAND_PATH = path.join(

  process.cwd(),

  "data",

  "runtime",

  "runtimeCommand.json"
)

// ====================================================================
// TYPES
// ====================================================================

export interface RuntimeCommandState {

  safeMode:boolean

  degradedMode:boolean

  operationalLockdown:boolean

  telemetryEnabled:boolean

  notificationRuntime:boolean

  predictiveRuntime:boolean

  advisoryRuntime:boolean

  anomalyRuntime:boolean

  timestamp:string
}

// ====================================================================
// DEFAULT
// ====================================================================

const DEFAULT_STATE:
RuntimeCommandState = {

  safeMode:true,

  degradedMode:false,

  operationalLockdown:false,

  telemetryEnabled:true,

  notificationRuntime:true,

  predictiveRuntime:true,

  advisoryRuntime:true,

  anomalyRuntime:true,

  timestamp:
    new Date().toISOString()
}

// ====================================================================
// ENSURE
// ====================================================================

function ensureStorage(){

  const dir =
    path.dirname(COMMAND_PATH)

  if(!fs.existsSync(dir)){

    fs.mkdirSync(
      dir,
      {
        recursive:true
      }
    )
  }

  if(!fs.existsSync(COMMAND_PATH)){

    safeJsonSave(
      COMMAND_PATH,
      DEFAULT_STATE
    )
  }
}

// ====================================================================
// LOAD
// ====================================================================

export function loadRuntimeCommandState():

RuntimeCommandState {

  ensureStorage()

  return safeJsonLoad(

    COMMAND_PATH,

    DEFAULT_STATE
  )
}

// ====================================================================
// SAVE
// ====================================================================

export function saveRuntimeCommandState(

  state:
  RuntimeCommandState

){

  ensureStorage()

  safeJsonSave(

    COMMAND_PATH,

    state
  )
}