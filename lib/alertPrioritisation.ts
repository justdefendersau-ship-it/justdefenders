/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\alertPrioritisation.ts

   Timestamp:
   2026-05-07 20:00

   Purpose:
   - Alert prioritisation
   - Operational importance ranking
===================================================== */

// =====================================================
// PRIORITISE
// =====================================================

export function prioritiseAlerts(

  alerts:any[]

){

  const severityRank:any = {

    critical:4,

    high:3,

    medium:2,

    low:1
  }

  return alerts.sort(

    (a,b)=>

      severityRank[
        b.severity
      ] -

      severityRank[
        a.severity
      ]
  )
}
