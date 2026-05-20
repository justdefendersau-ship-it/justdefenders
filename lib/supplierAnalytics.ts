/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\supplierAnalytics.ts

   Timestamp:
   2026-05-08 08:00

   Purpose:
   - Supplier analytics
   - Operational intelligence
===================================================== */

// =====================================================
// ANALYTICS
// =====================================================

export function buildSupplierAnalytics({

  inventory,

  leads

}:any){

  const totalInventory =

    inventory.reduce(

      (sum:number,item:any)=>

        sum + item.quantity,

      0
    )

  const totalLeadValue =

    leads.reduce(

      (sum:number,item:any)=>

        sum + item.value,

      0
    )

  return {

    inventoryItems:
      inventory.length,

    totalInventory,

    leadCount:
      leads.length,

    totalLeadValue:
      Number(
        totalLeadValue.toFixed(2)
      )
  }
}
