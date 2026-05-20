/* =====================================================
   JustDefenders ©
   File:
   /lib/services/federationEventBus.ts

   Timestamp:
   11 May 2026 18:15 (Sydney)

   PURPOSE:
   Enterprise federation event bus
===================================================== */

import EventEmitter
from "eventemitter3"

export const federationEventBus =
new EventEmitter()

export function publishEvent(

  event:string,

  payload:any

){

  federationEventBus.emit(
    event,
    payload
  )
}

export function subscribeEvent(

  event:string,

  callback:(payload:any)=>void

){

  federationEventBus.on(
    event,
    callback
  )

  return ()=>{

    federationEventBus.off(
      event,
      callback
    )
  }
}
