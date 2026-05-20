/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/realExpeditionHardwareIntegration.ts

   Timestamp:
   13 May 2026 00:15 (Sydney)

   PURPOSE:
   Real expedition hardware integration contract
===================================================== */

export interface RealExpeditionHardwareIntegrationContract {

  hardwareId:string

  hardwareType:string

  hardwareVendor:string

  integrationState?:

    | "connected"
    | "synchronising"
    | "degraded"
    | "offline"

  telemetryIntegrity?:number

  signalLatencyMs?:number

  signalStrength?:number

  survivabilityPriority?:number

  autonomousRecoveryReadiness?:number

  hardwareThreats?:string[]

  integrationActions?:string[]

  telemetryChannels?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
