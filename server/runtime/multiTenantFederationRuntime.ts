/* =====================================================
   JustDefenders ©
   File:
   /server/runtime/multiTenantFederationRuntime.ts

   Timestamp:
   14 May 2026 10:15 (Sydney)

   PURPOSE:
   Real multi-tenant federation runtime
===================================================== */

export interface TenantRuntime {

  tenantId:string

  federationRegion:string

  runtimeStatus:string
}

const tenants:TenantRuntime[] = [

  {

    tenantId:"PACIFIC-001",

    federationRegion:"PACIFIC",

    runtimeStatus:"CONNECTED"
  },

  {

    tenantId:"ATLANTIC-001",

    federationRegion:"ATLANTIC",

    runtimeStatus:"CONNECTED"
  }
]

export function getFederationTenants(){

  return tenants
}
