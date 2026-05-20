/* =====================================================
   JustDefenders ©
   File:
   /lib/parts-intelligence/commercialPartnerIntegrationEngine.ts

   Timestamp:
   11 May 2026 23:30 (Sydney)

   PURPOSE:
   Commercial partner orchestration engine
===================================================== */

import {

  CommercialPartnerIntegrationContract

}
from "../contracts/commercialPartnerIntegration"

// =====================================================
// PARTNERS
// =====================================================

const partners:
  CommercialPartnerIntegrationContract[] = [

  {

    partnerId:
      "PARTNER-001",

    partnerName:
      "MR Automotive",

    partnerType:
      "workshop",

    operationalRegions:[

      "QLD",
      "NSW"
    ],

    integrationStatus:
      "active",

    affiliateEnabled:true,

    apiIntegrationEnabled:false,

    expeditionPrograms:[

      "Cape York",
      "Simpson Desert"
    ],

    revenueSharePercentage:8,

    operationalConfidence:0.97,

    commercialNotes:[

      "High expedition reputation"
    ],

    lastUpdated:
      new Date().toISOString()
  },

  {

    partnerId:
      "PARTNER-002",

    partnerName:
      "British Off Road",

    partnerType:
      "supplier",

    operationalRegions:[

      "QLD"
    ],

    integrationStatus:
      "active",

    affiliateEnabled:true,

    apiIntegrationEnabled:false,

    expeditionPrograms:[

      "Cape York",
      "Victorian High Country"
    ],

    revenueSharePercentage:6,

    operationalConfidence:0.91,

    commercialNotes:[

      "Strong Defender inventory"
    ],

    lastUpdated:
      new Date().toISOString()
  },

  {

    partnerId:
      "PARTNER-003",

    partnerName:
      "LR Direct",

    partnerType:
      "supplier",

    operationalRegions:[

      "UK",
      "Global"
    ],

    integrationStatus:
      "active",

    affiliateEnabled:true,

    apiIntegrationEnabled:true,

    expeditionPrograms:[

      "Global Expedition Support"
    ],

    revenueSharePercentage:5,

    operationalConfidence:0.89,

    commercialNotes:[

      "API-capable supplier integration"
    ],

    lastUpdated:
      new Date().toISOString()
  }

]

// =====================================================
// GET ALL
// =====================================================

export function getCommercialPartners(){

  return partners
}

// =====================================================
// ACTIVE
// =====================================================

export function getActiveCommercialPartners(){

  return partners.filter(

    item =>

      item.integrationStatus
      ===
      "active"
  )
}

// =====================================================
// AFFILIATES
// =====================================================

export function getAffiliatePartners(){

  return partners.filter(

    item =>

      item.affiliateEnabled === true
  )
}

// =====================================================
// API ENABLED
// =====================================================

export function getApiEnabledCommercialPartners(){

  return partners.filter(

    item =>

      item.apiIntegrationEnabled === true
  )
}

// =====================================================
// COMMERCIAL HEALTH
// =====================================================

export function getCommercialOperationsHealth(){

  const total =
    partners.reduce(

      (
        sum,
        item
      )=>

        sum +
        (item.operationalConfidence || 0),

      0
    )

  return Number(

    (
      total / partners.length
    ).toFixed(2)
  )
}
