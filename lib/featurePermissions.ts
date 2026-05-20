/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\featurePermissions.ts

   Timestamp:
   2026-05-07 13:00

   Purpose:
   - Feature permissions
   - Grace period logic
   - Tiered intelligence access
===================================================== */

// =====================================================
// FEATURE ACCESS
// =====================================================

export function canAccessFeature(

  feature:string,

  user:any
){

  // =====================================================
  // GRACE PERIOD
  // =====================================================

  if(user?.gracePeriodActive){

    return true
  }

  // =====================================================
  // PREMIUM FEATURES
  // =====================================================

  const premium = [

    "predictive-maintenance",

    "touring-intelligence",

    "field-failure-intelligence",

    "advanced-community-insights"
  ]

  if(

    premium.includes(feature)

  ){

    return user?.membership === "premium"
  }

  return true
}
