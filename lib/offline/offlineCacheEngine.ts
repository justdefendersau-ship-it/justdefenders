/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\offline\offlineCacheEngine.ts

   Timestamp:
   2026-05-09 18:00

   Purpose:
   - Offline operational caching
   - Expedition survivability
===================================================== */

// =====================================================
// SAVE CACHE
// =====================================================

export function saveOfflineCache(

  key:string,

  payload:any

){

  try {

    localStorage.setItem(

      key,

      JSON.stringify({

        cachedAt:
          new Date().toISOString(),

        payload
      })
    )

    return true

  } catch(err){

    console.error(
      "OFFLINE_CACHE_SAVE_FAILED",
      err
    )

    return false
  }
}

// =====================================================
// LOAD CACHE
// =====================================================

export function loadOfflineCache(

  key:string

){

  try {

    const raw =
      localStorage.getItem(key)

    if(!raw){

      return null
    }

    return JSON.parse(raw)

  } catch(err){

    console.error(
      "OFFLINE_CACHE_LOAD_FAILED",
      err
    )

    return null
  }
}

// =====================================================
// OFFLINE DETECTION
// =====================================================

export function isOfflineMode(){

  return !navigator.onLine
}
