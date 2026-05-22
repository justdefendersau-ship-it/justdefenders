/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\harvesters\performance.ts
 *
 * Timestamp:
 * 21 May 2026 16:42 Sydney
 *
 * PURPOSE:
 * Federation Performance Tracking
 *
 * STRATEGY:
 * PASS 25B — Federation Timeout + Performance Protection
 *
 * ============================================================
 */

// ============================================================
// TYPES
// ============================================================

interface SupplierPerformance {

  supplier: string

  responseTime: number

  timestamp: string
}

// ============================================================
// STATE
// ============================================================

const supplierPerformance:
  SupplierPerformance[] = []

// ============================================================
// TRACK
// ============================================================

export function trackSupplierPerformance(

  supplier: string,

  responseTime: number

){

  supplierPerformance.push({

    supplier,

    responseTime,

    timestamp:
      new Date()
        .toISOString()
  })

  // ==========================================================
  // LIMIT HISTORY
  // ==========================================================

  if (
    supplierPerformance.length > 200
  ) {

    supplierPerformance.shift()
  }
}

// ============================================================
// GET
// ============================================================

export function getSupplierPerformance(){

  return supplierPerformance
}