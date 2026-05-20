/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\server\ux\tenant-governance.js
===================================================== */

class TenantGovernance {

  constructor(){

    this.tenants = []
  }

  onboard(tenant){

    this.tenants.push({

      ...tenant,

      onboardedAt:
      new Date().toISOString()
    })
  }

  getAll(){

    return this.tenants
  }
}

module.exports =
new TenantGovernance()