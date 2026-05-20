/* =====================================================
   JustDefenders ©
   File:
   /server/knowledge/persistentMissionKnowledgeGraph.ts

   Timestamp:
   14 May 2026 14:15 (Sydney)

   PURPOSE:
   Persistent mission knowledge graph
===================================================== */

export interface KnowledgeNode {

  id:string

  entity:string

  relationships:string[]
}

const graph:KnowledgeNode[] = [

  {

    id:"NODE-001",

    entity:"PACIFIC_MISSION",

    relationships:[

      "THREAT_CLUSTER_A",

      "AI_AGENT_001"
    ]
  }
]

export function getMissionKnowledgeGraph(){

  return graph
}
