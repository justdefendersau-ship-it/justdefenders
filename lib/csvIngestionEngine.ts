/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\csvIngestionEngine.ts

   Timestamp:
   2026-05-08 08:00

   Purpose:
   - CSV ingestion
   - Inventory mapping
   - Feed normalisation
===================================================== */

// =====================================================
// NORMALISE CSV
// =====================================================

export function normaliseCSVRow(

  row:any

){

  return {

    supplier:
      row.Supplier || "",

    partNumber:
      row.PartNumber || "",

    description:
      row.Description || "",

    quantity:
      Number(row.Quantity || 0),

    price:
      Number(row.Price || 0),

    location:
      row.Location || "",

    updatedAt:
      new Date().toISOString()
  }
}

// =====================================================
// VALIDATE
// =====================================================

export function validateInventoryRow(

  row:any

){

  const errors:any[] = []

  if(!row.partNumber){

    errors.push(
      "Missing part number"
    )
  }

  if(row.quantity < 0){

    errors.push(
      "Invalid quantity"
    )
  }

  if(row.price < 0){

    errors.push(
      "Invalid price"
    )
  }

  return {

    valid:
      errors.length === 0,

    errors
  }
}
