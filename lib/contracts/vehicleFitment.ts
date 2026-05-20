/* =====================================================
   JustDefenders ©
   Vehicle Fitment Contract
===================================================== */

export interface VehicleFitmentContract {

  id: string

  vehicleModel: string

  productionStartYear: number

  productionEndYear: number

  engineVariants: string[]

  gearboxVariants: string[]

  axleVariants?: string[]

  vinPrefixes?: string[]

  compatibleParts: string[]

  exportMarkets?: string[]

  militaryVariants?: boolean

  fitmentConfidence?: number

  notes?: string[]
}
