/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\inventoryIngestion.ts

   Timestamp:
   2026-05-08 07:00

   Purpose:
   - Supplier inventory ingestion
   - Feed normalisation
===================================================== */

// =====================================================
// NORMALISE
// =====================================================

export function normaliseInventory(

  raw:any

){

  return {

    supplier:
      raw.supplier || "",

    partNumber:
      raw.part_number || "",

    quantity:
      Number(raw.qty || 0),

    price:
      Number(raw.price || 0),

    updatedAt:
      new Date().toISOString()
  }
}
