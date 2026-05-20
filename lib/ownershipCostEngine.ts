/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\ownershipCostEngine.ts

   Timestamp:
   2026-05-09 12:15

   Purpose:
   - Ownership operational cost intelligence
===================================================== */

export function calculateOwnershipCosts(

  costs:any[]

){

  let total = 0

  const grouped:any = {}

  costs.forEach((c:any)=>{

    const value =
      Number(c.cost || 0)

    total += value

    if(!grouped[c.type]){

      grouped[c.type] = 0
    }

    grouped[c.type] += value
  })

  return {

    total,

    grouped
  }
}
