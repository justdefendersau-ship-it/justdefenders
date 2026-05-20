/* =====================================================
   JustDefenders ©
   File:
   /server/compliance/operationalAuditService.ts

   Timestamp:
   14 May 2026 08:15 (Sydney)

   PURPOSE:
   Operational audit & compliance layer
===================================================== */

import fs
from "fs"

const auditPath =
"./server/compliance/audit-log.json"

export function appendAuditLog(

  entry:any

){

  let audit:any[] = []

  if(
    fs.existsSync(auditPath)
  ){

    audit =
    JSON.parse(

      fs.readFileSync(
        auditPath,
        "utf8"
      )
    )
  }

  audit.push({

    ...entry,

    timestamp:Date.now()
  })

  fs.writeFileSync(

    auditPath,

    JSON.stringify(
      audit,
      null,
      2
    )
  )
}
