// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\runtime\runtimeEventBus.ts
//
// Timestamp:
// 28 May 2026 05:15 Sydney
//
// PURPOSE:
// Operational runtime event bus.
// ====================================================================

import fs from "fs"
import path from "path"

import {

  safeJsonLoad,

  safeJsonSave

}
from "@/lib/runtime/runtimeRecoveryEngine"

import {

  broadcastRuntimeEvent

}
from "@/lib/runtime/websocketRuntime"

// ====================================================================
// STORAGE
// ====================================================================

const EVENT_PATH = path.join(

  process.cwd(),

  "data",

  "events",

  "runtimeEvents.json"
)

// ====================================================================
// TYPES
// ====================================================================

export interface RuntimeEvent {

  id:string

  type:string

  source:string

  payload:any

  timestamp:string
}

// ====================================================================
// ENSURE
// ====================================================================

function ensureStorage(){

  const dir =
    path.dirname(EVENT_PATH)

  if(!fs.existsSync(dir)){

    fs.mkdirSync(
      dir,
      {
        recursive:true
      }
    )
  }

  if(!fs.existsSync(EVENT_PATH)){

    safeJsonSave(
      EVENT_PATH,
      []
    )
  }
}

// ====================================================================
// LOAD
// ====================================================================

export function loadRuntimeEvents():

RuntimeEvent[] {

  ensureStorage()

  return safeJsonLoad(

    EVENT_PATH,

    []
  )
}

// ====================================================================
// SAVE
// ====================================================================

export function saveRuntimeEvents(

  events:
  RuntimeEvent[]

){

  ensureStorage()

  safeJsonSave(

    EVENT_PATH,

    events
  )
}

// ====================================================================
// EMIT
// ====================================================================

export function emitRuntimeEvent(

  type:string,

  source:string,

  payload:any

){

  const events =

    loadRuntimeEvents()

  const event:
  RuntimeEvent = {

    id:
      crypto.randomUUID(),

    type,

    source,

    payload,

    timestamp:
      new Date().toISOString()
  }

  const updated = [

    event,

    ...events
  ]

  saveRuntimeEvents(
    updated
  )

  // ================================================================
  // WEBSOCKET BROADCAST
  // ================================================================

  broadcastRuntimeEvent(
    event
  )

  return event
}