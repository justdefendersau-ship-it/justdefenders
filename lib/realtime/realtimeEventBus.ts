// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\realtime\realtimeEventBus.ts
// Timestamp: 15 May 2026 07:05 Sydney
// ====================================================================

import {
  RuntimeRealtimeEvent,
  RuntimeRealtimeEventType,
  createRealtimeEvent
} from "./realtimeEvents"

import {
  logInfo
} from "../logging/runtimeLogger"

type RuntimeEventHandler =
(
  event: RuntimeRealtimeEvent
) => void

const handlers:
Map<
  RuntimeRealtimeEventType,
  RuntimeEventHandler[]
> = new Map()

const runtimeEvents:
RuntimeRealtimeEvent[] = []

export function subscribeToRealtimeEvent(
  type: RuntimeRealtimeEventType,
  handler: RuntimeEventHandler
) {

  const existing =
    handlers.get(type) ?? []

  existing.push(
    handler
  )

  handlers.set(
    type,
    existing
  )
}

export function publishRealtimeEvent<T>(
  type: RuntimeRealtimeEventType,
  payload: T
): RuntimeRealtimeEvent<T> {

  const event =
    createRealtimeEvent(
      type,
      payload
    )

  runtimeEvents.push(
    event
  )

  const listeners =
    handlers.get(type) ?? []

  listeners.forEach(
    handler =>
      handler(event)
  )

  logInfo(
    "realtime-event-bus",
    "Realtime event published",
    {

      type:
        event.type,

      eventId:
        event.id
    }
  )

  return event
}

export function getRealtimeEvents():
RuntimeRealtimeEvent[] {

  return runtimeEvents.slice(
    -100
  )
}