/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\supplierPartnerEngine.ts

   Timestamp:
   2026-05-08 09:00

   Purpose:
   - Supplier partner management
   - Onboarding lifecycle
===================================================== */

// =====================================================
// STATUS
// =====================================================

export const PARTNER_STATUS = {

  pending:
    "Pending Review",

  approved:
    "Approved",

  onboarding:
    "Onboarding",

  active:
    "Active",

  suspended:
    "Suspended"
}

// =====================================================
// HEALTH SCORE
// =====================================================

export function calculatePartnerHealth({

  responseRate,

  inventoryFreshness,

  leadAcceptance

}:any){

  let score = 0

  score += responseRate * 0.4

  score += inventoryFreshness * 0.3

  score += leadAcceptance * 0.3

  return Number(
    score.toFixed(2)
  )
}

// =====================================================
// PRIORITY
// =====================================================

export function determinePartnerPriority({

  emergencyFulfilment,

  localPresence,

  inventoryCoverage

}:any){

  let priority = 0

  if(emergencyFulfilment){

    priority += 40
  }

  if(localPresence){

    priority += 35
  }

  priority += inventoryCoverage

  return priority
}
