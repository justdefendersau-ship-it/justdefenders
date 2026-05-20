/* =====================================================
   JustDefenders ©
   File:
   /lib/parts-intelligence/procurementPersistenceEngine.ts

   Timestamp:
   11 May 2026 16:45 (Sydney)

   PURPOSE:
   Procurement workflow persistence engine
===================================================== */

import {

  ProcurementPersistenceContract

}
from "../contracts/procurementPersistence"

// =====================================================
// IN-MEMORY STORE
// =====================================================

const savedWorkflows:
  ProcurementPersistenceContract[] = []

// =====================================================
// CREATE
// =====================================================

export function saveWorkflow({

  workflowName,
  workflowType,
  vehicleModel,
  route,
  partNumbers,
  supplierIds = [],
  estimatedTotal = 0,
  notes = []

}:any){

  const workflow:
    ProcurementPersistenceContract = {

      id:
        "WORKFLOW-" +
        Date.now(),

      workflowName,

      workflowType,

      vehicleModel,

      route,

      partNumbers,

      supplierIds,

      status:
        "draft",

      estimatedTotal,

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),

      notes
    }

  savedWorkflows.push(
    workflow
  )

  return workflow
}

// =====================================================
// GET ALL
// =====================================================

export function getSavedWorkflows(){

  return savedWorkflows
}

// =====================================================
// GET BY TYPE
// =====================================================

export function getWorkflowsByType(

  workflowType:string

){

  return savedWorkflows.filter(

    item =>

      item.workflowType === workflowType
  )
}

// =====================================================
// UPDATE STATUS
// =====================================================

export function updateWorkflowStatus({

  workflowId,
  status

}:any){

  const workflow =
    savedWorkflows.find(

      item =>

        item.id === workflowId
    )

  if(!workflow){

    return null
  }

  workflow.status = status

  workflow.updatedAt =
    new Date().toISOString()

  return workflow
}

// =====================================================
// DELETE
// =====================================================

export function deleteWorkflow(

  workflowId:string

){

  const index =
    savedWorkflows.findIndex(

      item =>

        item.id === workflowId
    )

  if(index === -1){

    return false
  }

  savedWorkflows.splice(
    index,
    1
  )

  return true
}
