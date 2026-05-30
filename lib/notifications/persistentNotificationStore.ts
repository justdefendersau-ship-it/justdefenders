// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\notifications\persistentNotificationStore.ts
//
// Timestamp:
// 28 May 2026 01:15 Sydney
//
// PURPOSE:
// Persistent operational notification store.
// ====================================================================

import fs from "fs"
import path from "path"

import {

  OperationalNotification

}
from "@/types/OperationalNotification"

import {

  safeJsonLoad,

  safeJsonSave

}
from "@/lib/runtime/runtimeRecoveryEngine"

// ====================================================================
// STORAGE
// ====================================================================

const STORAGE_PATH = path.join(

  process.cwd(),

  "data",

  "notifications",

  "notifications.json"
)

// ====================================================================
// ENSURE
// ====================================================================

function ensureStorage(){

  const dir =
    path.dirname(STORAGE_PATH)

  if(!fs.existsSync(dir)){

    fs.mkdirSync(
      dir,
      {
        recursive:true
      }
    )
  }

  if(!fs.existsSync(STORAGE_PATH)){

    safeJsonSave(
      STORAGE_PATH,
      []
    )
  }
}

// ====================================================================
// LOAD
// ====================================================================

export function loadNotifications():

OperationalNotification[] {

  ensureStorage()

  return safeJsonLoad(

    STORAGE_PATH,

    []
  )
}

// ====================================================================
// SAVE
// ====================================================================

export function saveNotifications(

  notifications:
  OperationalNotification[]

){

  ensureStorage()

  safeJsonSave(

    STORAGE_PATH,

    notifications
  )
}

// ====================================================================
// APPEND
// ====================================================================

export function appendNotifications(

  newNotifications:
  OperationalNotification[]

){

  const existing =

    loadNotifications()

  const updated = [

    ...newNotifications,

    ...existing

  ]

  saveNotifications(
    updated
  )

  return updated
}