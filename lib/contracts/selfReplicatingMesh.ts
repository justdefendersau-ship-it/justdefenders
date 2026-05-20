/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/selfReplicatingMesh.ts

   Timestamp:
   13 May 2026 19:00 (Sydney)

   PURPOSE:
   Self-replicating intelligence mesh contract
===================================================== */

export interface SelfReplicatingMeshContract {

  replicationId:string

  meshDomain:string

  replicationState?:

    | "learning"
    | "replicating"
    | "autonomous"
    | "critical"

  activeReplicationClusters?:number

  survivabilityLearningRate?:number

  autonomousExpansionIndex?:number

  aiReplicationConfidence?:number

  replicationThreats?:string[]

  autonomousReplicationActions?:string[]

  recursivePatterns?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
