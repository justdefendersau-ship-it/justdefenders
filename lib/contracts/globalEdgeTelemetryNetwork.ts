/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/globalEdgeTelemetryNetwork.ts

   Timestamp:
   13 May 2026 05:30 (Sydney)

   PURPOSE:
   Global edge telemetry network contract
===================================================== */

export interface GlobalEdgeTelemetryNetworkContract {

  edgeNodeId:string

  regionalZone:string

  nodeState?:

    | "optimal"
    | "adaptive"
    | "degraded"
    | "critical"

  activeConvoys?:number

  telemetryThroughput?:number

  edgeLatencyMs?:number

  survivabilityScore?:number

  aiMeshConfidence?:number

  telemetryThreats?:string[]

  autonomousActions?:string[]

  activeServices?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
