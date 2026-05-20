// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\predictiveOwnership.ts
// Timestamp: 14 May 2026 22:40 Sydney

export type DefenderGeneration =
  | "Puma"
  | "TD5"
  | "300Tdi"

export interface PredictiveOwnershipInput {

  generation: DefenderGeneration

  currentKm: number
}

export interface PredictiveOwnershipInsight {

  category: string

  dueAtKm: number

  status: "OK" | "DUE_SOON" | "OVERDUE"

  recommendation: string
}

interface ServiceIntervalConfig {

  [key: string]: number
}

const SERVICE_INTERVALS:
Record<
  DefenderGeneration,
  ServiceIntervalConfig
> = {

  Puma: {

    oilServiceKm: 10000,

    gearboxOilKm: 40000,

    coolingInspectionKm: 30000,

    clutchRiskKm: 160000
  },

  TD5: {

    oilServiceKm: 10000,

    injectorHarnessKm: 80000,

    fuelRegulatorKm: 120000,

    coolingInspectionKm: 30000
  },

  "300Tdi": {

    oilServiceKm: 5000,

    timingBeltKm: 80000,

    coolingInspectionKm: 25000,

    turboInspectionKm: 120000
  }
}

export function generatePredictiveInsights(
  input: PredictiveOwnershipInput
): PredictiveOwnershipInsight[] {

  const {
    generation,
    currentKm
  } = input

  const config =
    SERVICE_INTERVALS[generation]

  if (!config) {

    return []
  }

  return Object.entries(config).map(
    (
      [
        category,
        dueAtKm
      ]
    ): PredictiveOwnershipInsight => {

      let status:
        | "OK"
        | "DUE_SOON"
        | "OVERDUE" = "OK"

      if (
        currentKm >= dueAtKm
      ) {

        status = "OVERDUE"

      } else if (
        currentKm >=
        dueAtKm - 10000
      ) {

        status = "DUE_SOON"
      }

      return {

        category,

        dueAtKm,

        status,

        recommendation:
          `Inspect ${category} service interval at ${dueAtKm}km`
      }
    }
  )
}