/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\mobile\services\offlineStorage.ts

   Timestamp:
   2026-05-07 19:00

   Purpose:
   - Offline field mode
   - Emergency data persistence
===================================================== */

const offlineStore:any = {}

// =====================================================
// SAVE
// =====================================================

export function saveOffline(

  key:string,

  value:any

){

  offlineStore[key] = value
}

// =====================================================
// GET
// =====================================================

export function getOffline(
  key:string
){

  return offlineStore[key] || null
}
