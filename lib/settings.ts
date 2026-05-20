/**
 * =====================================================
 * JustDefenders ©
 * File: lib/settings.ts
 * Timestamp: 2026-05-06 16:05
 * Purpose: Global controls (bandit + scoring weights)
 * =====================================================
 */

export const settings = {
  banditEnabled: true,
  weights: {
    price: 0.4,
    trust: 0.4,
    delivery: 0.2
  }
}

export function resetSettings(){
  settings.banditEnabled = true
  settings.weights = { price: 0.4, trust: 0.4, delivery: 0.2 }
}