/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\workflowValidationEngine.ts

   Timestamp:
   2026-05-09 13:00

   Purpose:
   - Operational workflow validation
   - Pilot readiness scoring
===================================================== */

export function calculatePilotReadiness(

  workflows:any[]

){

  const total =
    workflows.length

  const completed =

    workflows.filter(

      w => w.status === "COMPLETE"

    ).length

  const failed =

    workflows.filter(

      w => w.status === "FAILED"

    ).length

  const score =

    total > 0
    ? Math.round(
        (completed / total) * 100
      )
    : 0

  return {

    total,

    completed,

    failed,

    score
  }
}
