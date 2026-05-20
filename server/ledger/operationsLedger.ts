/* =====================================================
   JustDefenders ©
   File:
   /server/ledger/operationsLedger.ts

   Timestamp:
   14 May 2026 08:15 (Sydney)

   PURPOSE:
   Persistent event-sourced operations ledger
===================================================== */

import fs
from "fs"

const ledgerPath =
"./server/ledger/operations-ledger.json"

export interface LedgerEvent {

  id:string

  type:string

  timestamp:number

  payload:any
}

export function appendLedgerEvent(

  event:LedgerEvent

){

  let ledger:any[] = []

  if(
    fs.existsSync(ledgerPath)
  ){

    ledger =
    JSON.parse(

      fs.readFileSync(
        ledgerPath,
        "utf8"
      )
    )
  }

  ledger.push(event)

  fs.writeFileSync(

    ledgerPath,

    JSON.stringify(
      ledger,
      null,
      2
    )
  )
}

export function readLedger(){

  if(
    !fs.existsSync(ledgerPath)
  ){

    return []
  }

  return JSON.parse(

    fs.readFileSync(
      ledgerPath,
      "utf8"
    )
  )
}
