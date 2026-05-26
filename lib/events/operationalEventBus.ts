// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\lib\events\operationalEventBus.ts
//
// Timestamp:
// 26 May 2026 23:25 Sydney
//
// PURPOSE:
// Unified operational event bus.
//
// IMPORTANT:
// Central operational intelligence runtime.
// ====================================================================

import {
  OperationalEvent
}
from "@/types/OperationalEvent"

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

    "[EVENT BUS]",

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

// ====================================================================
// FILTER EVENTS
// ====================================================================

export function getEventsByType(

  type:string

){

  return operationalEvents.filter(
    event =>
      event.type === type
  )
}

// ====================================================================
// CLEAR EVENTS
// ====================================================================

export function clearOperationalEvents(){

  operationalEvents.length = 0
}