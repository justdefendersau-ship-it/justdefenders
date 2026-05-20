/**
 * =====================================================
 * JustDefenders ©
 * File: lib/commission.ts
 * Timestamp: 2026-05-06 16:20
 * Purpose: Commission model per supplier
 * =====================================================
 */

export function getCommissionRate(supplier:string){

  // realistic placeholder rates
  if(supplier === "Paddock Spares") return 0.08
  if(supplier === "All Four x 4 Spares") return 0.06

  return 0.05
}