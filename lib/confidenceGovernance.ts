/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\confidenceGovernance.ts

   Timestamp:
   2026-05-07 17:00

   Purpose:
   - Confidence governance
   - Bad-data suppression
===================================================== */

// =====================================================
// VALIDATE
// =====================================================

export function validateConfidence(

  confidence:number

){

  // =====================================================
  // CLAMP
  // =====================================================

  if(confidence < 0){

    return 0
  }

  if(confidence > 1){

    return 1
  }

  return Number(
    confidence.toFixed(2)
  )
}

// =====================================================
// THRESHOLD
// =====================================================

export function shouldDisplayIntelligence(

  confidence:number

){

  return confidence >= 0.45
}
