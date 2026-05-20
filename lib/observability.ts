/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\observability.ts

   Timestamp:
   2026-05-07 17:00

   Purpose:
   - Centralised observability
   - Error tracing
   - Operational telemetry
===================================================== */

import { createClient }
from "@supabase/supabase-js"

// =====================================================
// SUPABASE
// =====================================================

const supabase =
  createClient(

    process.env.NEXT_PUBLIC_SUPABASE_URL || "",

    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  )

// =====================================================
// LOG EVENT
// =====================================================

export async function logEvent({

  category,

  severity,

  message,

  metadata

}:any){

  try {

    console.log(

      "[OBSERVABILITY]",

      severity,

      category,

      message
    )

    const {

      error

    } = await supabase

      .from("platform_logs")

      .insert({

        category,

        severity,

        message,

        metadata,

        created_at:
          new Date().toISOString()
      })

    if(error){

      console.error(
        "LOG STORE ERROR:",
        error
      )
    }

  } catch(err){

    console.error(
      "OBSERVABILITY FAILURE:",
      err
    )
  }
}
