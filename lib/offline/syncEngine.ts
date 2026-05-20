/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\offline\syncEngine.ts

   Timestamp:
   2026-05-09 18:00

   Purpose:
   - Deferred operational sync
   - Expedition field sync
===================================================== */

// =====================================================
// QUEUE OFFLINE ACTION
// =====================================================

export function queueOfflineAction(

  action:any

){

  try {

    const existing =

      JSON.parse(

        localStorage.getItem(
          "jd_sync_queue"
        ) || "[]"
      )

    existing.push({

      ...action,

      queuedAt:
        new Date().toISOString()
    })

    localStorage.setItem(

      "jd_sync_queue",

      JSON.stringify(existing)
    )

    return true

  } catch(err){

    console.error(
      "SYNC_QUEUE_FAILED",
      err
    )

    return false
  }
}

// =====================================================
// GET QUEUED ACTIONS
// =====================================================

export function getQueuedActions(){

  return JSON.parse(

    localStorage.getItem(
      "jd_sync_queue"
    ) || "[]"
  )
}
