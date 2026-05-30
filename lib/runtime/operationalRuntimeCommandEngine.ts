// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\runtime\operationalRuntimeCommandEngine.ts
//
// Timestamp:
// 28 May 2026 02:40 Sydney
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

const COMMAND_STATE_PATH = path.join(

  process.cwd(),

  "data",

  "runtime",

  "runtimeCommandState.json"
)

// ====================================================================
// TYPES
// ====================================================================

export interface RuntimeCommandState {

  timestamp:string

  runtimeMode:string

  telemetryEnabled:boolean

  degradedMode:boolean

  lockdownEnabled:boolean

  expeditionMode:boolean
}

// ====================================================================
// ENSURE
// ====================================================================

function ensureStorage(){

  const dir =
    path.dirname(COMMAND_STATE_PATH)

  if(!fs.existsSync(dir)){

    fs.mkdirSync(
      dir,
      {
        recursive:true
      }
    )
  }

  if(!fs.existsSync(COMMAND_STATE_PATH)){

    safeJsonSave(

      COMMAND_STATE_PATH,

      {

        timestamp:
          new Date().toISOString(),

        runtimeMode:"SAFE_MODE",

        telemetryEnabled:false,

        degradedMode:false,

        lockdownEnabled:false,

        expeditionMode:false
      }
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

    COMMAND_STATE_PATH,

    {

      timestamp:
        new Date().toISOString(),

      runtimeMode:"SAFE_MODE",

      telemetryEnabled:false,

      degradedMode:false,

      lockdownEnabled:false,

      expeditionMode:false
    }
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

    COMMAND_STATE_PATH,

    state
  )
}