/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\mobile\services\obdService.ts

   Timestamp:
   2026-05-07 19:00

   Purpose:
   - ELM327 Bluetooth foundations
   - Live telemetry streaming
===================================================== */

import {
  BleManager
} from "react-native-ble-plx"

// =====================================================
// MANAGER
// =====================================================

const manager =
  new BleManager()

// =====================================================
// SCAN
// =====================================================

export async function scanForOBD(){

  console.log(
    "Scanning for ELM327 adapters..."
  )

  manager.startDeviceScan(

    null,

    null,

    (error,device)=>{

      if(error){

        console.error(error)

        return
      }

      if(device){

        console.log(

          "DEVICE:",

          device.name
        )
      }
    }
  )
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
