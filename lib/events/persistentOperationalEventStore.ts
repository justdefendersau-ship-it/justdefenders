// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\events\persistentOperationalEventStore.ts
//
// Timestamp:
// 27 May 2026 14:50 Sydney
//
// PURPOSE:
// Persistent operational event storage.
// ====================================================================

import fs
from "fs"

import path
from "path"

import {

  OperationalEvent

}
from "@/types/OperationalEvent"

// ====================================================================
// STORAGE FILE
// ====================================================================

const STORAGE_PATH =

  path.join(

    process.cwd(),

    "data",

    "operational-events.json"
  )

// ====================================================================
// ENSURE STORAGE
// ====================================================================

function ensureStorageExists(){

  const dir =
    path.dirname(
      STORAGE_PATH
    )

  if(
    !fs.existsSync(dir)
  ){

    fs.mkdirSync(
      dir,
      {
        recursive:true
      }
    )
  }

  if(
    !fs.existsSync(
      STORAGE_PATH
    )
  ){

    fs.writeFileSync(

      STORAGE_PATH,

      JSON.stringify(
        [],
        null,
        2
      )
    )
  }
}

// ====================================================================
// LOAD EVENTS
// ====================================================================

export function loadPersistentEvents():

  OperationalEvent[] {

  try {

    ensureStorageExists()

    const raw =
      fs.readFileSync(

        STORAGE_PATH,

        "utf-8"
      )

    return JSON.parse(
      raw
    )

  } catch(error){

    console.error(

      "LOAD EVENT STORE FAILURE:",

      error
    )

    return []
  }
}

// ====================================================================
// SAVE EVENT
// ====================================================================

export function persistOperationalEvent(

  event:OperationalEvent

){

  try {

    ensureStorageExists()

    const events =
      loadPersistentEvents()

    events.push(event)

    fs.writeFileSync(

      STORAGE_PATH,

      JSON.stringify(

        events,

        null,

        2
      )
    )

    console.log(

      "EVENT PERSISTED:",

      event.type
    )

  } catch(error){

    console.error(

      "PERSIST EVENT FAILURE:",

      error
    )
  }
}