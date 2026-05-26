// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\mobile\services\events\operationalEventBus.ts
//
// Timestamp:
// 27 May 2026 22:15 Sydney
//
// PURPOSE:
// Mobile operational event bus.
// ====================================================================

export interface OperationalEvent {

  id:string

  timestamp:string

  type:string

  severity:string

  source:string

  title:string

  description:string

  telemetry?:any
}

// ====================================================================
// MEMORY BUS
// ====================================================================

const operationalEvents:
  OperationalEvent[] = []

// ====================================================================
// EMIT EVENT
// ====================================================================

export function emitOperationalEvent(

  event:OperationalEvent

){

  operationalEvents.push(event)

  console.log(

    "[MOBILE EVENT]",

    event.type,

    event.title
  )
}

// ====================================================================
// GET EVENTS
// ====================================================================

export function getOperationalEvents(){

  return operationalEvents
}