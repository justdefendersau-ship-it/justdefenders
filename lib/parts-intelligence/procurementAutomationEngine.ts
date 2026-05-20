/* =====================================================
   JustDefenders ©
   File:
   /lib/parts-intelligence/procurementAutomationEngine.ts

   Timestamp:
   11 May 2026 19:45 (Sydney)

   PURPOSE:
   Real-time procurement automation engine
===================================================== */

import {

  ProcurementAutomationContract

}
from "../contracts/procurementAutomation"

// =====================================================
// AUTOMATIONS
// =====================================================

const automations:
  ProcurementAutomationContract[] = [

  {

    automationId:
      "AUTO-001",

    workflowName:
      "Cape York Critical Cooling Watch",

    vehicleModel:
      "Defender Td5",

    route:
      "Cape York",

    monitoredPartNumbers:[

      "PCH119890",
      "ERR3340"
    ],

    automationStatus:
      "active",

    triggerType:
      "route_preparation",

    recommendedSupplier:
      "MR Automotive",

    recommendedAction:
      "Pre-order cooling spares before departure",

    automationConfidence:0.96,

    operationalPriority:
      "critical",

    lastEvaluation:
      new Date().toISOString(),

    notes:[

      "Expedition cooling reliability monitoring"
    ]
  },

  {

    automationId:
      "AUTO-002",

    workflowName:
      "Simpson Desert Bearing Inventory Watch",

    vehicleModel:
      "Defender Puma 2.2",

    route:
      "Simpson Desert",

    monitoredPartNumbers:[

      "RTC3429"
    ],

    automationStatus:
      "triggered",

    triggerType:
      "low_stock",

    recommendedSupplier:
      "British Off Road",

    recommendedAction:
      "Inventory level below operational threshold",

    automationConfidence:0.91,

    operationalPriority:
      "critical",

    lastEvaluation:
      new Date().toISOString(),

    notes:[

      "Bearing inventory escalation triggered"
    ]
  }

]

// =====================================================
// GET ALL
// =====================================================

export function getAllProcurementAutomations(){

  return automations
}

// =====================================================
// ACTIVE
// =====================================================

export function getActiveAutomations(){

  return automations.filter(

    item =>

      item.automationStatus
      ===
      "active"
  )
}

// =====================================================
// TRIGGERED
// =====================================================

export function getTriggeredAutomations(){

  return automations.filter(

    item =>

      item.automationStatus
      ===
      "triggered"
  )
}

// =====================================================
// CRITICAL
// =====================================================

export function getCriticalAutomations(){

  return automations.filter(

    item =>

      item.operationalPriority
      ===
      "critical"
  )
}

// =====================================================
// HEALTH SCORE
// =====================================================

export function getAutomationHealthScore(){

  const total =
    automations.length

  const healthy =
    automations.filter(

      item =>

        item.automationStatus
        !==
        "paused"
    ).length

  return Number(

    (
      healthy / total
    ).toFixed(2)
  )
}
