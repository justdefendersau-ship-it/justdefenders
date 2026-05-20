/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\supplierOperations.ts

   Timestamp:
   2026-05-08 07:00

   Purpose:
   - Supplier operations intelligence
   - Inventory ingestion
   - Lead tracking
===================================================== */

// =====================================================
// TYPES
// =====================================================

export type Supplier = {

  id:string

  name:string

  country:string

  state:string

  priority:number

  emergencyFulfilment:boolean

  supportsDefender:boolean

  inventoryFeed:boolean
}

// =====================================================
// PRIORITISE
// =====================================================

export function prioritiseSuppliers(

  suppliers:Supplier[]

){

  return suppliers.sort(

    (a,b)=>

      b.priority - a.priority
  )
}

// =====================================================
// INVENTORY HEALTH
// =====================================================

export function calculateInventoryHealth(

  stock:number

){

  if(stock > 25){

    return "healthy"
  }

  if(stock > 5){

    return "limited"
  }

  return "critical"
}

// =====================================================
// LEAD SCORE
// =====================================================

export function calculateLeadValue({

  urgency,

  proximity,

  availability

}:any){

  let score = 0

  score += urgency * 0.4

  score += proximity * 0.3

  score += availability * 0.3

  return Number(
    score.toFixed(2)
  )
}
