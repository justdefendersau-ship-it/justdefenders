/* =====================================================
   JustDefenders ©
   File:
   /lib/engines/predictiveEscalationEngine.ts

   Timestamp:
   11 May 2026 16:45 (Sydney)

   PURPOSE:
   Predictive escalation intelligence
===================================================== */

export interface EscalationPrediction {

  probability:number

  severity:string

  response:string
}

export function predictEscalation(
  risk:number,
  activity:number,
  volatility:number
):EscalationPrediction{

  const probability =

    Math.min(
      100,
      Math.floor(
        (
          risk * 0.45
        ) +
        (
          activity * 0.35
        ) +
        (
          volatility * 0.20
        )
      )
    )

  let severity =
  "LOW"

  let response =
  "Continue passive monitoring."

  if(
    probability >= 90
  ){

    severity =
    "CRITICAL"

    response =
    "Immediate tactical intervention required."
  }
  else if(
    probability >= 75
  ){

    severity =
    "HIGH"

    response =
    "Escalate surveillance and intelligence ingestion."
  }
  else if(
    probability >= 50
  ){

    severity =
    "MODERATE"

    response =
    "Maintain elevated awareness posture."
  }

  return {

    probability,

    severity,

    response
  }
}
