/* =====================================================
   JustDefenders ©
   File:
   /lib/engines/aiConsensusDecisionEngine.ts

   Timestamp:
   12 May 2026 01:30 (Sydney)

   PURPOSE:
   AI consensus decision federation
===================================================== */

export interface ConsensusResult {

  agreement:number

  recommendation:string

  federationState:string
}

export function executeConsensusEvaluation(

  telemetry:number,

  volatility:number,

  escalation:number

):ConsensusResult{

  const agreement =

    Math.min(
      100,
      Math.floor(
        telemetry * 0.40 +
        volatility * 0.30 +
        escalation * 0.30
      )
    )

  if(
    agreement >= 90
  ){

    return {

      agreement,

      recommendation:
      "Consensus escalation approved.",

      federationState:
      "CRITICAL"
    }
  }

  if(
    agreement >= 70
  ){

    return {

      agreement,

      recommendation:
      "Federation consensus stabilised.",

      federationState:
      "HIGH"
    }
  }

  return {

    agreement,

    recommendation:
    "Continue passive intelligence monitoring.",

    federationState:
    "MODERATE"
  }
}
