// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\types\OperationalEvent.ts
//
// Timestamp:
// 26 May 2026 23:10 Sydney
//
// PURPOSE:
// Unified operational event model.
//
// IMPORTANT:
// Canonical intelligence event structure.
// ====================================================================

export type OperationalEventType =

  | "TELEMETRY"
  | "SURVIVABILITY_ALERT"
  | "MAINTENANCE"
  | "PREDICTIVE_FAILURE"
  | "FUEL_EVENT"
  | "VIN_EVENT"
  | "BARCODE_SCAN"
  | "EXPEDITION_EVENT"
  | "SYSTEM_EVENT"

// ====================================================================
// EVENT SEVERITY
// ====================================================================

export type OperationalSeverity =

  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL"

// ====================================================================
// EVENT MODEL
// ====================================================================

export interface OperationalEvent {

  id:string

  timestamp:string

  type:
    OperationalEventType

  severity:
    OperationalSeverity

  source:string

  title:string

  description:string

  vehicleId?:string

  telemetry?:{

    coolantTemp?:number

    batteryVoltage?:number

    rpm?:number

    speed?:number

    boost?:number
  }

  maintenance?:{

    category?:string

    intervalKm?:number

    remainingKm?:number
  }

  predictive?:{

    probability?:number

    timeframe?:string
  }

  fuel?:{

    litres?:number

    pricePerLitre?:number

    location?:string
  }

  metadata?:Record<
    string,
    any
  >
}