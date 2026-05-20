// JustDefenders ©
// File: C:\dev\justdefenders\frontend\lib\logic\compatibilityEngine.ts
// Timestamp: 14 May 2026 22:10 Sydney

export interface CompatibilityVehicle {

  engine?: string

  year?: number

  model?: string
}

export interface CompatibilityPart {

  partNumber?: string

  compatibleEngines?: string[]

  compatibleYears?: number[]

  compatibleModels?: string[]
}

export interface CompatibilityResult {

  compatible: boolean

  scoreBoost: number

  reasons: string[]
}

export function evaluateCompatibility(
  part: CompatibilityPart,
  vehicle: CompatibilityVehicle
): CompatibilityResult {

  /**
   * Safety fallback
   */
  if (
    !vehicle ||
    !vehicle.engine ||
    !vehicle.year
  ) {

    return {

      compatible: true,

      scoreBoost: 0,

      reasons: [
        "Vehicle data incomplete"
      ]
    }
  }

  let scoreBoost = 0

  const reasons: string[] = []

  /**
   * Engine compatibility
   */
  if (
    part.compatibleEngines?.includes(
      vehicle.engine
    )
  ) {

    scoreBoost += 15

    reasons.push(
      "Engine compatibility confirmed"
    )
  }

  /**
   * Year compatibility
   */
  if (
    part.compatibleYears?.includes(
      vehicle.year
    )
  ) {

    scoreBoost += 10

    reasons.push(
      "Model year compatibility confirmed"
    )
  }

  /**
   * Vehicle model compatibility
   */
  if (
    vehicle.model &&
    part.compatibleModels?.includes(
      vehicle.model
    )
  ) {

    scoreBoost += 20

    reasons.push(
      "Vehicle model compatibility confirmed"
    )
  }

  return {

    compatible:
      scoreBoost > 0,

    scoreBoost,

    reasons
  }
}