/* =====================================================
   JustDefenders ©
   File:
   /lib/engines/threatCorrelationEngine.ts

   Timestamp:
   11 May 2026 18:15 (Sydney)

   PURPOSE:
   Autonomous threat correlation
===================================================== */

export interface ThreatCorrelation {

  correlationId:string

  confidence:number

  severity:string

  recommendation:string
}

export function correlateThreats(

  telemetry:number[],

  volatility:number,

  escalation:number

):ThreatCorrelation{

  const aggregate =

    telemetry.reduce(
      (
        total,
        value
      )=>
        total + value,
      0
    )

  const confidence =

    Math.min(
      100,
      Math.floor(
        (
          aggregate / telemetry.length
        ) * 0.55 +
        volatility * 0.25 +
        escalation * 0.20
      )
    )

  let severity =
  "LOW"

  let recommendation =
  "Passive observation."

  if(
    confidence >= 90
  ){

    severity =
    "CRITICAL"

    recommendation =
    "Deploy rapid federation response."
  }
  else if(
    confidence >= 75
  ){

    severity =
    "HIGH"

    recommendation =
    "Escalate command oversight."
  }
  else if(
    confidence >= 55
  ){

    severity =
    "MODERATE"

    recommendation =
    "Increase telemetry collection."
  }

  return {

    correlationId:
    crypto.randomUUID(),

    confidence,

    severity,

    recommendation
  }
}
