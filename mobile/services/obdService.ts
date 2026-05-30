/* =====================================================
   JustDefenders©
   File:
   C:\dev\justdefenders\frontend\mobile\services\obdService.ts

   Timestamp:
   2026-05-27 20:45 Sydney

   Purpose:
   - ELM327 Bluetooth foundations
   - Live telemetry streaming
   - Runtime configuration integration
===================================================== */

import {

  RuntimeConfiguration

}
from "../../lib/runtime/runtimeConfiguration"

// =====================================================
// SAFE MODE
// =====================================================

export async function scanForOBD(){

  // ===================================================
  // SAFE MODE
  // ===================================================

  if(
    RuntimeConfiguration.safeMode
  ){

    console.log(
      "SAFE MODE: Simulated ELM327 connection"
    )

    return
  }

  // ===================================================
  // REAL TELEMETRY
  // ===================================================

  console.log(
    "REAL ELM327 MODE ENABLED"
  )

  // REAL IMPLEMENTATION
  // COMING NEXT PHASE
}

// =====================================================
// MOCK TELEMETRY
// =====================================================

export function getMockTelemetry(){

  return {

    coolantTemp:
      96,

    batteryVoltage:
      13.8,

    rpm:
      2200,

    speed:
      82,

    boost:
      12
  }
}