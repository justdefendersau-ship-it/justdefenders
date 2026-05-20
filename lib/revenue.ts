/**
 * =====================================================
 * JustDefenders ©
 * File: lib/revenue.ts
 * Purpose: Expected revenue calculation (EPC)
 * =====================================================
 */

const stats: Record<string, {
  clicks:number,
  conversions:number
}> = {}

export function recordClick(supplier:string){
  if(!stats[supplier]){
    stats[supplier] = { clicks:0, conversions:0 }
  }
  stats[supplier].clicks++
}

export function recordConversion(supplier:string){
  if(!stats[supplier]){
    stats[supplier] = { clicks:0, conversions:0 }
  }
  stats[supplier].conversions++
}

export function getConversionRate(supplier:string){

  const s = stats[supplier]
  if(!s || s.clicks === 0) return 0.05 // baseline guess

  return s.conversions / s.clicks
}

export function getEPC(supplier:string, price:number, commission:number){

  const cr = getConversionRate(supplier)

  return cr * price * commission
}