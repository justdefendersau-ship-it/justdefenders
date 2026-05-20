/* =====================================================
   JustDefenders ©
   File:
   /lib/parts-intelligence/supplierApiConnectorEngine.ts

   Timestamp:
   11 May 2026 18:15 (Sydney)

   PURPOSE:
   Supplier API connector abstraction engine
===================================================== */

import {

  SupplierApiIntegrationContract

}
from "../contracts/supplierApiIntegration"

// =====================================================
// CONNECTORS
// =====================================================

const supplierConnectors:
  SupplierApiIntegrationContract[] = [

  {

    supplierId:
      "SUP-001",

    supplierName:
      "MR Automotive",

    apiEnabled:false,

    inventorySyncSupported:false,

    pricingSyncSupported:false,

    orderSubmissionSupported:false,

    operationalStatus:
      "offline",

    notes:[

      "Manual integration currently required"
    ]
  },

  {

    supplierId:
      "SUP-002",

    supplierName:
      "British Off Road",

    apiEnabled:false,

    inventorySyncSupported:false,

    pricingSyncSupported:false,

    orderSubmissionSupported:false,

    operationalStatus:
      "offline"
  },

  {

    supplierId:
      "SUP-003",

    supplierName:
      "LR Direct",

    apiEnabled:true,

    inventorySyncSupported:true,

    pricingSyncSupported:true,

    orderSubmissionSupported:false,

    webhookSupport:false,

    authType:
      "api_key",

    syncFrequencyMinutes:30,

    operationalStatus:
      "active",

    lastSuccessfulSync:
      new Date().toISOString(),

    notes:[

      "External API architecture supported"
    ]
  }

]

// =====================================================
// GET ALL
// =====================================================

export function getSupplierConnectors(){

  return supplierConnectors
}

// =====================================================
// ACTIVE
// =====================================================

export function getActiveSupplierConnectors(){

  return supplierConnectors.filter(

    item =>

      item.operationalStatus
      ===
      "active"
  )
}

// =====================================================
// API ENABLED
// =====================================================

export function getApiEnabledSuppliers(){

  return supplierConnectors.filter(

    item =>

      item.apiEnabled === true
  )
}

// =====================================================
// INVENTORY SYNC
// =====================================================

export function getInventorySyncSuppliers(){

  return supplierConnectors.filter(

    item =>

      item.inventorySyncSupported
      ===
      true
  )
}

// =====================================================
// HEALTH
// =====================================================

export function getSupplierApiHealthScore(){

  const total =
    supplierConnectors.length

  const active =
    supplierConnectors.filter(

      item =>

        item.operationalStatus
        ===
        "active"
    ).length

  return Number(

    (
      active / total
    ).toFixed(2)
  )
}
