/* =====================================================
   JustDefenders ©
   File:
   /lib/engines/aiFederationMemoryEngine.ts

   Timestamp:
   11 May 2026 22:45 (Sydney)

   PURPOSE:
   AI federation memory persistence
===================================================== */

export interface FederationMemoryRecord {

  timestamp:string

  event:string

  severity:string
}

const federationMemory:
FederationMemoryRecord[] = []

export function storeFederationMemory(

  event:string,

  severity:string

){

  federationMemory.push({

    timestamp:
    new Date().toISOString(),

    event,

    severity
  })
}

export function getFederationMemory(){

  return federationMemory
}
