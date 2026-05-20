/* =====================================================
   JustDefenders ©
   File:
   /lib/engines/autonomousDecisionMatrix.ts

   Timestamp:
   11 May 2026 19:45 (Sydney)

   PURPOSE:
   Autonomous AI decision federation
===================================================== */

export interface DecisionMatrixResult {

  action:string

  confidence:number

  urgency:string
}

export function evaluateDecisionMatrix(

  risk:number,

  volatility:number,

  escalation:number

):DecisionMatrixResult{

  const score =

    Math.floor(

      (
        risk * 0.45
      ) +

      (
        volatility * 0.30
      ) +

      (
        escalation * 0.25
      )
    )

  if(
    score >= 90
  ){

    return {

      action:
      "Deploy autonomous escalation federation.",

      confidence:99,

      urgency:"CRITICAL"
    }
  }

  if(
    score >= 70
  ){

    return {

      action:
      "Increase predictive surveillance.",

      confidence:92,

      urgency:"HIGH"
    }
  }

  return {

    action:
    "Maintain operational monitoring.",

    confidence:84,

    urgency:"MODERATE"
  }
}
