/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\harvesters\health.ts
 *
 * Timestamp:
 * 21 May 2026 16:24 Sydney
 *
 * PURPOSE:
 * Federation Health Tracking
 *
 * STRATEGY:
 * PASS 25A — Federation Resilience Layer
 *
 * ============================================================
 */

// ============================================================
// TYPES
// ============================================================

interface SupplierHealth {

  supplier: string

  healthy: boolean

  lastSuccess?: string

  lastFailure?: string
}

// ============================================================
// STATE
// ============================================================

const supplierHealth =
  new Map<string, SupplierHealth>()

// ============================================================
// MARK SUCCESS
// ============================================================

export function markSupplierHealthy(

  supplier: string

){

  supplierHealth.set(

    supplier,

    {

      supplier,

      healthy: true,

      lastSuccess:
        new Date()
          .toISOString()
    }
  )
}

// ============================================================
// MARK FAILURE
// ============================================================

export function markSupplierFailure(

  supplier: string

){

  supplierHealth.set(

    supplier,

    {

      supplier,

      healthy: false,

      lastFailure:
        new Date()
          .toISOString()
    }
  )
}

// ============================================================
// GET HEALTH
// ============================================================

export function getSupplierHealth(){

  return Array.from(

    supplierHealth.values()
  )
}