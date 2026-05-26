/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\mobile\services\offlineSyncService.ts

   Timestamp:
   2026-05-26 22:00 Sydney

   Purpose:
   - Offline telemetry persistence
   - Expedition operational continuity
   - Deferred sync queue
===================================================== */

import AsyncStorage
from "@react-native-async-storage/async-storage"

// =====================================================
// TYPES
// =====================================================

export interface OfflineEvent {

  id:string

  timestamp:string

  type:string

  payload:any
}

// =====================================================
// STORAGE KEY
// =====================================================

const STORAGE_KEY =
  "JD_OFFLINE_EVENTS"

// =====================================================
// LOAD EVENTS
// =====================================================

export async function loadOfflineEvents(){

  try {

    const raw =
      await AsyncStorage.getItem(
        STORAGE_KEY
      )

    if(!raw){
      return []
    }

    return JSON.parse(raw)

  } catch(error){

    console.error(
      "Offline load failure",
      error
    )

    return []
  }
}

// =====================================================
// SAVE EVENT
// =====================================================

export async function saveOfflineEvent(

  type:string,

  payload:any

){

  try {

    const existing =
      await loadOfflineEvents()

    const event:OfflineEvent = {

      id:
        Date.now().toString(),

      timestamp:
        new Date().toISOString(),

      type,

      payload
    }

    existing.push(event)

    await AsyncStorage.setItem(

      STORAGE_KEY,

      JSON.stringify(existing)
    )

    console.log(
      "Offline event stored"
    )

  } catch(error){

    console.error(
      "Offline save failure",
      error
    )
  }
}

// =====================================================
// CLEAR EVENTS
// =====================================================

export async function clearOfflineEvents(){

  await AsyncStorage.removeItem(
    STORAGE_KEY
  )
}

// =====================================================
// MOCK SYNC
// =====================================================

export async function syncOfflineEvents(){

  const events =
    await loadOfflineEvents()

  console.log(

    "SYNCING EVENTS:",

    events.length
  )

  // ===================================================
  // FUTURE:
  // - upload telemetry
  // - upload scans
  // - upload survivability alerts
  // - upload fuel events
  // ===================================================

  return {

    success:true,

    synced:
      events.length
  }
}