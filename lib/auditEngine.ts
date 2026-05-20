/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\auditEngine.ts

   Timestamp:
   2026-05-07 17:00

   Purpose:
   - Audit logging
   - Governance tracking
===================================================== */

import { createClient }
from "@supabase/supabase-js"

const supabase =
  createClient(

    process.env.NEXT_PUBLIC_SUPABASE_URL || "",

    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  )

// =====================================================
// AUDIT
// =====================================================

export async function audit({

  actor,

  action,

  entity,

  entityId,

  metadata

}:any){

  try {

    await supabase

      .from("audit_logs")

      .insert({

        actor,

        action,

        entity,

        entity_id:
          entityId,

        metadata,

        created_at:
          new Date().toISOString()
      })

  } catch(err){

    console.error(
      "AUDIT FAILURE:",
      err
    )
  }
}
