/* =====================================================
   JustDefenders ©
   Workshop Intelligence Contract
===================================================== */

import {

  OperationalIntelligenceContract

}
from "./operationalIntelligence"

export interface WorkshopIntelligenceContract
extends OperationalIntelligenceContract {

  labourHours?: number

  specialToolsRequired?: string[]

  workshopComplexity?:

    | "basic"
    | "intermediate"
    | "advanced"

  commonCompanionRepairs?: string[]

  technicianNotes?: string[]
}
