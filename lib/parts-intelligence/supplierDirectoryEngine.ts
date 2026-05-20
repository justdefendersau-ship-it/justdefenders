/* =====================================================
   JustDefenders ©
   File:
   /lib/parts-intelligence/supplierDirectoryEngine.ts

   Timestamp:
   11 May 2026 15:15 (Sydney)

   PURPOSE:
   Supplier discovery and operational lookup
===================================================== */

import {

  supplierExpansionSeed

}
from "./supplierExpansionSeed"

// =====================================================
// ALL
// =====================================================

export function getAllSuppliers(){

  return supplierExpansionSeed
}

// =====================================================
// REGION
// =====================================================

export function getSuppliersByRegion(

  region:string

){

  return supplierExpansionSeed.filter(

    item =>

      item.region === region
  )
}

// =====================================================
// TOURING
// =====================================================

export function getTouringGradeSuppliers(){

  return supplierExpansionSeed.filter(

    item =>

      item.touringGrade === true
  )
}

// =====================================================
// OPERATIONAL FOCUS
// =====================================================

export function getSuppliersByFocus(

  focus:string

){

  return supplierExpansionSeed.filter(

    item =>

      item.operationalFocus?.includes(
        focus
      )
  )
}
