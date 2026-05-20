// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\telemetry\telemetryRecords.ts
// Timestamp: 15 May 2026 07:20 Sydney
// ====================================================================

export interface VehicleTelemetryRecord {

  id: string

  vin: string

  recordedAt: string

  engineTemperature?: number

  batteryVoltage?: number

  coolantLevel?: number

  oilPressure?: number

  notes?: string
}

export function createTelemetryRecord(
  vin: string,
  data: Partial<VehicleTelemetryRecord>
): VehicleTelemetryRecord {

  return {

    id:

      "telemetry-" +

      Math.random()
        .toString(36)
        .substring(2, 10),

    vin,

    recordedAt:
      new Date()
        .toISOString(),

    engineTemperature:
      data.engineTemperature,

    batteryVoltage:
      data.batteryVoltage,

    coolantLevel:
      data.coolantLevel,

    oilPressure:
      data.oilPressure,

    notes:
      data.notes
  }
}