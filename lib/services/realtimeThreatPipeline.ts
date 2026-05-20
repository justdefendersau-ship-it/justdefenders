/* =====================================================
   JustDefenders ©
   File:
   /lib/services/realtimeThreatPipeline.ts

   Timestamp:
   14 May 2026 08:15 (Sydney)

   PURPOSE:
   Real-time threat correlation pipeline
===================================================== */

import {
  correlateThreats
}
from "./aiThreatCorrelationEngine"

export async function processThreatPipeline(

  telemetry:any

){

  const correlation =
  correlateThreats({

    severity:
    telemetry.severity,

    telemetry:
    telemetry.telemetry,

    escalation:
    telemetry.escalation,

    volatility:
    telemetry.volatility
  })

  return {

    received:true,

    correlation
  }
}
