/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\vehicleSessionEngine.ts

   Timestamp:
   2026-05-07 18:00

   Purpose:
   - Vehicle session intelligence
   - Trip monitoring
===================================================== */

const activeSessions:any = {}

// =====================================================
// START SESSION
// =====================================================

export function startVehicleSession(

  vin:string

){

  activeSessions[vin] = {

    startedAt:
      new Date().toISOString(),

    telemetry:[],

    alerts:[]
  }

  return activeSessions[vin]
}

// =====================================================
// ADD TELEMETRY
// =====================================================

export function addTelemetry(

  vin:string,

  payload:any

){

  if(!activeSessions[vin]){

    startVehicleSession(vin)
  }

  activeSessions[vin]
    .telemetry
    .push({

      timestamp:
        new Date().toISOString(),

      payload
    })
}

// =====================================================
// GET SESSION
// =====================================================

export function getVehicleSession(

  vin:string

){

  return activeSessions[vin] || null
}
