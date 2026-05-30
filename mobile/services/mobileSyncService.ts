// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\mobile\services\mobileSyncService.ts
//
// Timestamp:
// 27 May 2026 10:20 Sydney
//
// PURPOSE:
// Cross-platform operational synchronization.
// ====================================================================

import {

  getOperationalEvents

}
from "./events/operationalEventBus"

// ====================================================================
// CONFIG
// ====================================================================

const API_URL =

  "http://192.168.4.76:8081"

// ====================================================================
// SYNC
// ====================================================================

export async function syncOperationalEvents(){

  try {

    const events =
      getOperationalEvents()

    console.log(

      "SYNCING EVENTS:",

      events.length
    )

    const response =
      await fetch(

        `${API_URL}/api/mobile/sync-events`,

        {

          method:"POST",

          headers:{
            "Content-Type":
              "application/json"
          },

          body:JSON.stringify({

            events
          })
        }
      )

    // ===============================================================
    // RAW RESPONSE
    // ===============================================================

    const raw =
      await response.text()

    console.log(
      "RAW SYNC RESPONSE:",
      raw
    )

    // ===============================================================
    // SAFE JSON PARSE
    // ===============================================================

    try {

      const result =
        JSON.parse(raw)

      console.log(
        "SYNC RESULT:",
        result
      )

      return result

    } catch(parseError){

      console.error(
        "SYNC PARSE FAILURE:",
        parseError
      )

      return null
    }

  } catch(error){

    console.error(

      "SYNC FAILURE:",

      error
    )
  }
}