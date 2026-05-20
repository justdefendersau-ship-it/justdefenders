/* =====================================================
   JustDefenders ©
   Engine Response Contract
===================================================== */

export interface EngineResponse<T> {

  success: boolean

  generatedAt: string

  engineVersion: string

  confidence?: number

  data: T[]

  warnings?: string[]

  metadata?: Record<string, any>
}
