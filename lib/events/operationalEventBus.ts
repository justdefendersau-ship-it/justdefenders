// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\lib\events\operationalEventBus.ts
//
// Timestamp:
// 27 May 2026 14:55 Sydney
//
// PURPOSE:
// Unified operational event bus.
// ====================================================================

import {
  OperationalEvent
}
from "@/types/OperationalEvent"

import {

  persistOperationalEvent,

  loadPersistentEvents

}
from "./persistentOperationalEventStore"

// ====================================================================
// MEMORY BUS
// ====================================================================

const operationalEvents:
  OperationalEvent[] =

    loadPersistentEvents()

// ====================================================================
// EMIT EVENT
// ====================================================================

export function emitOperationalEvent(

  event:OperationalEvent

){

  operationalEvents.push(event)

  persistOperationalEvent(
    event
  )

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