/* =====================================================
   JustDefenders ©
   File:
   /lib/parts-intelligence/expeditionOperationalEconomicsEngine.ts

   Timestamp:
   12 May 2026 12:15 (Sydney)

   PURPOSE:
   Expedition operational economics intelligence engine
===================================================== */

import {

  ExpeditionOperationalEconomicsContract

}
from "../contracts/expeditionOperationalEconomics"

// =====================================================
// ECONOMIC MODELS
// =====================================================

const economics:
  ExpeditionOperationalEconomicsContract[] = [

  {

    economicsId:
      "ECONOMICS-001",

    expeditionRegion:
      "Cape York",

    economicState:
      "elevated",

    projectedFuelCostAud:4820,

    projectedRecoveryCostAud:3100,

    projectedLogisticsCostAud:2700,

    projectedMaintenanceCostAud:3600,

    operationalEfficiencyIndex:78,

    survivabilityCostPressure:62,

    financialRiskProbability:31,

    economicThreats:[

      "Wet-season fuel escalation",

      "River recovery equipment wear"
    ],

    optimisationStrategies:[

      "Reduce convoy idle time",

      "Optimise recovery deployment scheduling"
    ],

    operationalTradeoffs:[

      "Higher redundancy improves survivability but increases logistics cost"
    ],

    aiEconomicForecast:[

      "Operational costs likely to increase under prolonged wet conditions"
    ],

    synchronisedAt:
      new Date().toISOString()
  },

  {

    economicsId:
      "ECONOMICS-002",

    expeditionRegion:
      "Simpson Desert",

    economicState:
      "critical",

    projectedFuelCostAud:6930,

    projectedRecoveryCostAud:4200,

    projectedLogisticsCostAud:5100,

    projectedMaintenanceCostAud:4800,

    operationalEfficiencyIndex:69,

    survivabilityCostPressure:81,

    financialRiskProbability:54,

    economicThreats:[

      "Extreme fuel burn variability",

      "Sand-load maintenance escalation"
    ],

    optimisationStrategies:[

      "Reduce convoy payload mass",

      "Increase predictive tyre management"
    ],

    operationalTradeoffs:[

      "Reduced payload lowers fuel cost but limits recovery reserves"
    ],

    aiEconomicForecast:[

      "Fuel volatility driving escalating survivability expenditure"
    ],

    synchronisedAt:
      new Date().toISOString()
  },

  {

    economicsId:
      "ECONOMICS-003",

    expeditionRegion:
      "Canning Stock Route",

    economicState:
      "unsustainable",

    projectedFuelCostAud:11200,

    projectedRecoveryCostAud:14800,

    projectedLogisticsCostAud:12900,

    projectedMaintenanceCostAud:9400,

    operationalEfficiencyIndex:41,

    survivabilityCostPressure:97,

    financialRiskProbability:83,

    economicThreats:[

      "Extreme isolation logistics inflation",

      "Catastrophic recovery exposure",

      "Critical spare inventory burn rate"
    ],

    optimisationStrategies:[

      "Downgrade expedition operational scope",

      "Escalate survivability-first logistics prioritisation",

      "Reduce environmental operational exposure"
    ],

    operationalTradeoffs:[

      "Survivability preservation significantly increases operating expenditure"
    ],

    aiEconomicForecast:[

      "Current mission economics approaching operational unsustainability"
    ],

    synchronisedAt:
      new Date().toISOString()
  }

]

// =====================================================
// GET ALL
// =====================================================

export function getOperationalEconomics(){

  return economics
}

// =====================================================
// UNSUSTAINABLE
// =====================================================

export function getUnsustainableEconomics(){

  return economics.filter(

    item =>

      item.economicState
      ===
      "unsustainable"
  )
}

// =====================================================
// CRITICAL
// =====================================================

export function getCriticalEconomics(){

  return economics.filter(

    item =>

      item.economicState
      ===
      "critical"
  )
}

// =====================================================
// ECONOMIC INDEX
// =====================================================

export function getOperationalEconomicsIndex(){

  const total =
    economics.reduce(

      (
        sum,
        item
      )=>

        sum +
        (
          item.operationalEfficiencyIndex || 0
        ),

      0
    )

  return Number(

    (
      total / economics.length
    ).toFixed(0)
  )
}
