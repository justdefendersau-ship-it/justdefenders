/**
 * =====================================================
 * JustDefenders ©
 * File: lib/supplierPerformance.ts
 * Timestamp: 2026-05-06 15:40
 * Purpose: Supplier performance tracking + adaptive trust
 * =====================================================
 */

type SupplierStats = {
  supplier: string
  clicks: number
  conversions: number
  revenue: number
  trust: number
}

const stats: Record<string, SupplierStats> = {}

function getSupplier(supplier: string): SupplierStats {

  if (!stats[supplier]) {
    stats[supplier] = {
      supplier,
      clicks: 0,
      conversions: 0,
      revenue: 0,
      trust: 0.5 // baseline
    }
  }

  return stats[supplier]
}

export function recordClick(supplier: string) {
  const s = getSupplier(supplier)
  s.clicks += 1
  updateTrust(s)
}

export function recordConversion(supplier: string, revenue: number) {
  const s = getSupplier(supplier)
  s.conversions += 1
  s.revenue += revenue
  updateTrust(s)
}

function updateTrust(s: SupplierStats) {

  const ctr = s.clicks > 0 ? s.conversions / s.clicks : 0
  const revenueScore = s.revenue / (s.clicks + 1)

  // weighted trust calculation
  s.trust =
    Math.min(
      1,
      0.4 + (ctr * 0.4) + (revenueScore * 0.2)
    )
}

export function getTrust(supplier: string): number {
  return getSupplier(supplier).trust
}

export function getStats(){
  return stats
}