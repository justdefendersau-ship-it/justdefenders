/* =====================================================
   JustDefenders ©
   File:
   /server/discovery/distributedServiceRegistry.ts

   Timestamp:
   14 May 2026 12:15 (Sydney)

   PURPOSE:
   Distributed service discovery registry
===================================================== */

export interface ServiceNode {

  id:string

  service:string

  endpoint:string

  status:string
}

const registry:ServiceNode[] = [

  {

    id:"NODE-001",

    service:"MISSION_RUNTIME",

    endpoint:"ws://localhost:8090",

    status:"HEALTHY"
  },

  {

    id:"NODE-002",

    service:"AI_CORRELATION",

    endpoint:"http://localhost:8081",

    status:"HEALTHY"
  }
]

export function getServiceRegistry(){

  return registry
}
