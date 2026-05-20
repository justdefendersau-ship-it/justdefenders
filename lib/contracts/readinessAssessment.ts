/* =====================================================
   JustDefenders ©
   Readiness Assessment Contract
===================================================== */

import {

  OperationalIntelligenceContract

}
from "./operationalIntelligence"

export interface ReadinessAssessmentContract
extends OperationalIntelligenceContract {

  readinessScore: number

  verifiedSystems?: string[]

  missingSystems?: string[]

  operationalWarnings?: string[]

  advisoryItems?: string[]
}
