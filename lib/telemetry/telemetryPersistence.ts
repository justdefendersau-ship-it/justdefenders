// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\telemetry\telemetryPersistence.ts
// Timestamp: 15 May 2026 07:20 Sydney
// ====================================================================

import {
  VehicleTelemetryRecord,
  createTelemetryRecord
} from "./telemetryRecords"

import {
  publishRealtimeEvent
} from "../realtime/realtimeEventBus"

import {
  logInfo
} from "../logging/runtimeLogger"

const telemetryStore:
VehicleTelemetryRecord[] = []

export async function persistTelemetryRecord(
  vin: string,
  data: Partial<VehicleTelemetryRecord>
): Promise<VehicleTelemetryRecord> {

  const record =
    createTelemetryRecord(
      vin,
      data
    )

  telemetryStore.push(
    record
  )

  publishRealtimeEvent(

    "telemetry.received",

    {

      vin,

      telemetryId:
        record.id
    }
  )

  logInfo(
    "telemetry-persistence",
    "Telemetry persisted",
    {

      vin,

      telemetryId:
        record.id
    }
  )

  return record
}

export function getTelemetryRecords():
VehicleTelemetryRecord[] {

  return telemetryStore.slice(
    -250
  )
}