/**
 * =====================================================
 * JustDefenders ©
 * File: lib/bandit.ts
 * Timestamp: 2026-05-06 15:25
 * Purpose: Revenue-aware Thompson Sampling bandit
 * =====================================================
 */

type Arm = {
  supplier: string
  alpha: number
  beta: number
  revenue: number
  trials: number
}

const arms: Record<string, Arm[]> = {}

function getArms(part: string, suppliers: string[]): Arm[] {

  if (!arms[part]) {
    arms[part] = suppliers.map(s => ({
      supplier: s,
      alpha: 1,
      beta: 1,
      revenue: 0,
      trials: 0
    }))
  }

  return arms[part]
}

function sampleBeta(alpha: number, beta: number): number {
  return Math.random() * (alpha / (alpha + beta))
}

export function selectSupplier(part: string, options: any[]) {

  const suppliers = options.map(o => o.supplier)
  const banditArms = getArms(part, suppliers)

  let best: any = null
  let bestScore = -1

  for (const arm of banditArms) {

    // Combine exploration + revenue bias
    const explore = sampleBeta(arm.alpha, arm.beta)
    const revenueBias = arm.revenue / (arm.trials + 1)

    const score = explore + revenueBias

    if (score > bestScore) {
      bestScore = score
      best = arm.supplier
    }
  }

  return best
}

export function updateBandit(
  part: string,
  supplier: string,
  revenue: number
) {

  const banditArms = arms[part]
  if (!banditArms) return

  const arm = banditArms.find(a => a.supplier === supplier)
  if (!arm) return

  arm.trials += 1
  arm.revenue += revenue

  if (revenue > 0) {
    arm.alpha += 1
  } else {
    arm.beta += 1
  }
}