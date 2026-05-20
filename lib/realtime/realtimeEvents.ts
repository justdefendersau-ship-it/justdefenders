// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\realtime\realtimeEvents.ts
// Timestamp: 15 May 2026 07:05 Sydney
// ====================================================================

export type RuntimeRealtimeEventType =

  | "vehicle.updated"
  | "telemetry.received"
  | "supplier.updated"
  | "runtime.alert"
  | "queue.completed"
  | "predictive.generated"

export interface RuntimeRealtimeEvent<T = unknown> {

  id: string

  type: RuntimeRealtimeEventType

  createdAt: string

  payload: T
}

export function createRealtimeEvent<T>(
  type: RuntimeRealtimeEventType,
  payload: T
): RuntimeRealtimeEvent<T> {

  return {

    id:

      "evt-" +

      Math.random()
        .toString(36)
        .substring(2, 10),

    type,

    createdAt:
      new Date()
        .toISOString(),

    payload
  }
}