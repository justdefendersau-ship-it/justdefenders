// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\lib\events\timelineFusionEngine.ts
//
// Timestamp:
// 27 May 2026 00:10 Sydney
//
// PURPOSE:
// Unified timeline fusion engine.
//
// IMPORTANT:
// Merges operational intelligence streams
// into one longitudinal chronology.
// ====================================================================

import {
  OperationalEvent
}
from "@/types/OperationalEvent"

import {
  getOperationalEvents
}
from "./operationalEventBus"

// ====================================================================
// FUSED TIMELINE EVENT
// ====================================================================

export interface TimelineFusionEvent {

  id:string

  timestamp:string

  type:string

  severity:string

  source:string

  title:string

  description:string
}

// ====================================================================
// BUILD TIMELINE
// ====================================================================

export function buildFusedTimeline():

  TimelineFusionEvent[] {

  const operationalEvents =
    getOperationalEvents()

  const fusedTimeline =
    operationalEvents.map(
      (
        event:OperationalEvent
      ) => ({

        id:
          event.id,

        timestamp:
          event.timestamp,

        type:
          event.type,

        severity:
          event.severity,

        source:
          event.source,

        title:
          event.title,

        description:
          event.description
      })
    )

  // ================================================================
  // SORT CHRONOLOGY
  // ================================================================

  fusedTimeline.sort(
    (
      a,
      b
    ) =>

      new Date(
        b.timestamp
      ).getTime()

      -

      new Date(
        a.timestamp
      ).getTime()
  )

  return fusedTimeline
}