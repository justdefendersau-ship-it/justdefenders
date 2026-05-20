/* =====================================================
   JustDefenders ©
   File:
   /lib/contracts/expeditionKnowledgeGraph.ts

   Timestamp:
   13 May 2026 07:45 (Sydney)

   PURPOSE:
   Expedition knowledge graph contract
===================================================== */

export interface ExpeditionKnowledgeGraphContract {

  graphId:string

  entityType:string

  entityName:string

  federationState?:

    | "mapped"
    | "learning"
    | "correlating"
    | "critical"

  connectedEntities?:number

  survivabilityCorrelation?:number

  aiKnowledgeConfidence?:number

  terrainAssociations?:string[]

  componentAssociations?:string[]

  missionAssociations?:string[]

  autonomousInsights?:string[]

  neuralForecasts?:string[]

  synchronisedAt?:string
}
