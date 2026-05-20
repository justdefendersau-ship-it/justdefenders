/* =====================================================
   JustDefenders ©
   File:
   /lib/realtime/liveTelemetryEngine.ts

   Timestamp:
   12 May 2026 20:30 (Sydney)

   PURPOSE:
   Real-time telemetry visualisation engine
===================================================== */

export interface LiveTelemetryState {

  coolantTemp:number

  gearboxTemp:number

  oilPressure:number

  batteryVoltage:number

  fuelEfficiency:number

  tyrePressure:number

  engineLoad:number

  turboBoost:number
}

// =====================================================
// TELEMETRY GENERATOR
// =====================================================

export function generateTelemetry():
LiveTelemetryState {

  return {

    coolantTemp:
      Math.floor(
        82 + Math.random() * 18
      ),

    gearboxTemp:
      Math.floor(
        70 + Math.random() * 30
      ),

    oilPressure:
      Math.floor(
        45 + Math.random() * 25
      ),

    batteryVoltage:
      Number(
        (
          13.2 + Math.random() * 1.1
        ).toFixed(1)
      ),

    fuelEfficiency:
      Math.floor(
        9 + Math.random() * 8
      ),

    tyrePressure:
      Math.floor(
        24 + Math.random() * 14
      ),

    engineLoad:
      Math.floor(
        35 + Math.random() * 60
      ),

    turboBoost:
      Math.floor(
        8 + Math.random() * 18
      )
  }
}
